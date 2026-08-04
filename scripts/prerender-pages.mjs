/**
 * Pré-renderiza rotas HTML após o build para que o Cloudflare Pages sirva
 * arquivos estáticos sem invocar o Worker (economia de cota).
 */
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const port = 8788;
const baseUrl = `http://127.0.0.1:${port}`;

if (!existsSync(join(dist, "_worker.js"))) {
  console.log("prerender-pages: dist/_worker.js não encontrado — pulando.");
  process.exit(0);
}

const sitemapPath = join(dist, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  console.error("prerender-pages: sitemap.xml não encontrado em dist/");
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, "utf8");
const paths = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => {
      const path = m[1].replace(/\/$/, "") || "/";
      return path;
    }),
  ),
];

function routeToFile(path) {
  if (path === "/") return join(dist, "index.html");
  return join(dist, path.slice(1), "index.html");
}

async function waitForServer(maxAttempts = 90) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`${baseUrl}/`);
      if (res.ok) return;
    } catch {
      // servidor ainda subindo
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Wrangler pages dev não respondeu a tempo");
}

function startWrangler() {
  return spawn("npx", ["wrangler", "pages", "dev", dist, "--port", String(port), "--log-level", "error"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
  });
}

const wrangler = startWrangler();
let stderr = "";

wrangler.stderr?.on("data", (chunk) => {
  stderr += chunk.toString();
});

try {
  await waitForServer();

  for (const path of paths) {
    const res = await fetch(`${baseUrl}${path}`);
    if (!res.ok) {
      throw new Error(`Falha ao pré-renderizar ${path}: HTTP ${res.status}`);
    }
    const html = await res.text();
    const out = routeToFile(path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    console.log(`prerender: ${path}`);
  }

  const routesPath = join(dist, "_routes.json");
  if (existsSync(routesPath)) {
    const routes = JSON.parse(readFileSync(routesPath, "utf8"));
    const exclude = new Set(routes.exclude ?? []);
    for (const path of paths) {
      exclude.add(path === "/" ? "/index.html" : `${path}/index.html`);
    }
    routes.exclude = [...exclude].sort();
    writeFileSync(routesPath, `${JSON.stringify(routes, null, 2)}\n`);
    console.log(`prerender: ${paths.length} rotas adicionadas ao _routes.json exclude`);
  }
} catch (error) {
  if (stderr) console.error(stderr);
  throw error;
} finally {
  wrangler.kill("SIGTERM");
}
