// Cloudflare Worker entry (Workers + static assets, 15 Oct 2026). The pages in /site are served as static assets and
// never run this code (free and unmetered); only /api/* and /go/* come here (run_worker_first in wrangler.toml). Each
// /api route reuses the Pages-style handler in /functions/api, so the same files work on Workers and on Pages.
// /go/KEY is the tracked link the Instagram DMs send (click counter, then a redirect to the resource).
import * as newsletter from "../functions/api/newsletter.js";
import * as partner from "../functions/api/partner.js";
import * as igWebhook from "../functions/api/ig-webhook.js";
import { handleGo, handleStats, cleanup } from "../lib/ig-autodm/core.mjs";

const ROUTES = { "/api/newsletter": newsletter, "/api/partner": partner, "/api/ig-webhook": igWebhook };

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname.replace(/\/+$/, "");
    if (path.startsWith("/go/") && request.method === "GET") return handleGo(request, env);
    if (path === "/api/autodm-stats" && request.method === "GET") return handleStats(request, env);
    const mod = ROUTES[path];
    if (!mod) return new Response("Not found", { status: 404 });
    const m = request.method.toUpperCase();
    const handler = mod["onRequest" + m[0] + m.slice(1).toLowerCase()] || mod.onRequest;
    if (!handler) return new Response("Method not allowed", { status: 405 });
    return handler({ request, env, params: {}, waitUntil: (p) => ctx.waitUntil(p) });
  },
  async scheduled(event, env, ctx) {  // daily: drop expired dedupe claims (keeps D1 small)
    ctx.waitUntil(cleanup(env));
  },
};
