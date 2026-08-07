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

async function waitForServer(maxAttempts = 60) {
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
  return spawn(
    "npx",
    ["wrangler", "pages", "dev", dist, "--port", String(port), "--log-level", "error"],
    {
      cwd: root,
      stdio: "ignore",
      detached: true,
      env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
    },
  );
}

async function stopWrangler(proc) {
  if (!proc?.pid) return;

  const kill = (signal) => {
    try {
      process.kill(-proc.pid, signal);
    } catch {
      try {
        proc.kill(signal);
      } catch {
        // processo já encerrado
      }
    }
  };

  kill("SIGTERM");
  await new Promise((r) => setTimeout(r, 1000));
  kill("SIGKILL");
}

let exitCode = 0;
const wrangler = startWrangler();

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

  const notFound = await fetch(`${baseUrl}/__404_prerender__`);
  if (notFound.status === 404) {
    writeFileSync(join(dist, "404.html"), await notFound.text());
    console.log("prerender: 404.html");
  }

  const routesPath = join(dist, "_routes.json");
  if (existsSync(routesPath)) {
    const routes = JSON.parse(readFileSync(routesPath, "utf8"));
    const exclude = new Set(routes.exclude ?? []);

    // _routes.json usa caminhos de URL da requisição, não caminhos de arquivo.
    for (const path of paths) {
      exclude.add(path);
    }
    exclude.add("/404.html");

    routes.exclude = [...exclude].sort();
    // Com HTML estático gerado, o Worker não precisa rodar em nenhuma rota.
    routes.include = [];

    writeFileSync(routesPath, `${JSON.stringify(routes, null, 2)}\n`);
    console.log("prerender: Worker desativado (include: [])");
    console.log(`prerender: ${paths.length} URLs na lista exclude`);
  }

  console.log("prerender-pages: concluído");
} catch (error) {
  console.error("prerender-pages:", error);
  exitCode = 1;
} finally {
  await stopWrangler(wrangler);
}

process.exit(exitCode);
