// Old Netlify entry point (Netlify deploys are paused). The live webhook is Cloudflare: functions/api/ig-webhook.js.
import { handle } from "../../../lib/ig-autodm/core.mjs";
export default (req: Request) => handle(req, process.env);
