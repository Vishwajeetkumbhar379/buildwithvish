// Cloudflare Pages Function: https://buildwithvvish.com/api/ig-webhook (Meta webhook for Instagram comments).
import { handle } from "../../lib/ig-autodm/core.mjs";
export const onRequest = (ctx) => handle(ctx.request, ctx.env);
