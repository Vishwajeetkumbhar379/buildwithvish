// Open /.netlify/functions/newsletter-health to check the sign-up pipeline. Shows status codes only, never secrets or emails.
import { getStore } from "@netlify/blobs";
export const handler = async () => {
  const token = process.env.MAILERLITE_API_TOKEN, group = process.env.MAILERLITE_GROUP_ID;
  let mailerlite = 0;
  if (token) { try { const r = await fetch(`https://connect.mailerlite.com/api/groups${group ? "/" + group : ""}`, { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } }); mailerlite = r.status; } catch { mailerlite = -1; } }
  let last = null; try { last = await getStore("newsletter-diag").get("last", { type: "json" }); } catch {}
  return { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ tokenSet: !!token, groupSet: !!group, mailerliteGroupCheck: mailerlite, lastSignup: last }, null, 2) };
};
