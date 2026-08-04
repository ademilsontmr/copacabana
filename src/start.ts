import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const response = await next();
    // Cache na borda para rotas SSR (fallback) — reduz invocações do Worker.
    if (
      response instanceof Response &&
      response.ok &&
      (response.headers.get("content-type") ?? "").includes("text/html") &&
      !response.headers.has("cache-control")
    ) {
      const headers = new Headers(response.headers);
      headers.set(
        "Cache-Control",
        "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      );
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return response;
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));
