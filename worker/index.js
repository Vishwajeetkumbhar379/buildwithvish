// Cloudflare Worker entry (Workers + static assets, 15 Oct 2026). The pages in /site are served as static assets and
// never run this code (free and unmetered); only /api/* comes here (run_worker_first in wrangler.toml). Each route
// reuses the Pages-style handler in /functions/api, so the same files work on Workers and on Pages.
import * as newsletter from "../functions/api/newsletter.js";
import * as partner from "../functions/api/partner.js";
import * as igWebhook from "../functions/api/ig-webhook.js";

const ROUTES = { "/api/newsletter": newsletter, "/api/partner": partner, "/api/ig-webhook": igWebhook };

export default {
  async fetch(request, env, ctx) {
    const mod = ROUTES[new URL(request.url).pathname.replace(/\/+$/, "")];
    if (!mod) return new Response("Not found", { status: 404 });
    const m = request.method.toUpperCase();
    const handler = mod["onRequest" + m[0] + m.slice(1).toLowerCase()] || mod.onRequest;
    if (!handler) return new Response("Method not allowed", { status: 405 });
    return handler({ request, env, params: {}, waitUntil: (p) => ctx.waitUntil(p) });
  },
};
