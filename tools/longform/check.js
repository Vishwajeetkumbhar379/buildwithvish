#!/usr/bin/env node
// Lint a long-form page. Usage: node check.js SLUG [SLUG...]   (or "all")
const fs = require("fs"), path = require("path");
const D = __dirname, OUT = path.join(D, "out"), SEED = path.join(D, "seed");
const slugs = fs.readFileSync(path.join(D, "slugs.txt"), "utf8").split("\n").map((l) => l.split(" ")[0]).filter(Boolean).map((s) => s.replace("#read-", ""));
const ISSUES = ["issue-1", "issue-2", "issue-3", "issue-4", "issue-5", "issue-6"];
const OK_HASH = new Set(["start", "guides", "projects", "carousels", "newsletter", "tools", "launch", "about", "partner", "legal", "portfolio", ...slugs.map((s) => "read-" + s), ...ISSUES]);
const BANNED = ["delve", "game-changer", "game changer", "unlock", "unleash", "supercharge", "seamless", "leverag", "robust", "elevate", "harness", "empower", "revolutionis", "revolutioniz", "cutting-edge", "landscape", "realm", "tapestry", "fast-paced world", "whether you're a", "it's important to note", "let's dive", "dive in", "buckle up", "secret sauce", "mavgpt", "maverick", "lorem", "ipsum", "offenburg", "hochschule"];
const TAGS = { p: [null, "note"], h2: [null], h3: [null], ul: [null, "checklist"], ol: [null], li: [null], b: [null], i: [null], code: [null], kbd: [null], a: [null, "link"], pre: ["prompt"], div: ["tldr", "glance", "callout tip", "callout warn", "callout vish", "table-wrap", "cheat", "compare", "bad", "good", "calc-slot"], table: [null], thead: [null], tbody: [null], tr: [null], th: [null], td: [null], details: ["faq"], summary: [null], strong: [null], em: [null], br: [null], span: [null] };
const TARGET = { pillar: [5500, 8500], guide: [2200, 3800], workflow: [2200, 3800], creator: [2200, 3800], career: [2200, 3800], prompts: [2500, 4500], built: [1000, 1800], project: [2000, 3600], issue: [600, 1000] };
const PILLARS = ["claude-from-zero", "chatgpt-from-zero", "gemini-inside-google"];
const words = (h) => h.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").split(/\s+/).filter((w) => /[A-Za-z0-9€£$]/.test(w)).length;

function lintHtml(html, where, errs, warn, state) {
  if (/[—–]/.test(html)) { const m = html.match(/.{0,30}[—–].{0,30}/); errs.push(`${where}: em/en dash found: "${m && m[0]}"`); }
  const low = html.toLowerCase();
  BANNED.forEach((b) => { if (low.includes(b)) { const i = low.indexOf(b); errs.push(`${where}: banned word "${b}" in "…${html.slice(Math.max(0, i - 30), i + 30).replace(/\n/g, " ")}…"`); } });
  const re = /<\/?([a-zA-Z0-9]+)([^>]*)>/g; let m; const stack = [];
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase(), attrs = m[2], close = m[0][1] === "/";
    if (!TAGS[tag]) { errs.push(`${where}: tag <${tag}> not allowed (escape < > & inside prompts)`); continue; }
    if (close) { const top = stack.pop(); if (top !== tag) { errs.push(`${where}: </${tag}> closes <${top}> (unbalanced)`); if (top) stack.push(top); } continue; }
    if (tag !== "br") stack.push(tag);
    const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || null;
    if (!TAGS[tag].includes(cls)) errs.push(`${where}: <${tag} class="${cls}"> not allowed`);
    if (/style=|onclick|onerror|<script/i.test(attrs)) errs.push(`${where}: inline style/handler not allowed`);
    if (tag === "a") {
      const href = (attrs.match(/href="([^"]*)"/) || [])[1] || "";
      if (href.startsWith("#")) { if (!OK_HASH.has(href.slice(1))) errs.push(`${where}: broken internal link ${href}`); else state.internal++; }
      else if (/^https?:\/\//.test(href)) { if (!/target="_blank"/.test(attrs) || !/rel="noopener"/.test(attrs)) errs.push(`${where}: external link needs target="_blank" rel="noopener": ${href}`); state.external.push(href); }
      else if (/^mailto:/.test(href)) {} else errs.push(`${where}: odd href "${href}"`);
    }
    if (tag === "pre") {
      const lab = (attrs.match(/data-label="([^"]*)"/) || [])[1];
      if (!lab) errs.push(`${where}: prompt without data-label`);
      else { const n = +(lab.match(/^Prompt (\d+) · ./) || [])[1]; if (!n) errs.push(`${where}: label must look like "Prompt 3 · Name": ${lab}`); else { if (n !== state.pn + 1) errs.push(`${where}: prompt numbering jumps from ${state.pn} to ${n}`); state.pn = n; } }
      const end = html.indexOf("</pre>", m.index); const inner = html.slice(m.index + m[0].length, end);
      if (/<[a-zA-Z\/]/.test(inner)) errs.push(`${where}: raw tag inside prompt (escape it): ${inner.slice(0, 60)}`);
      if (words(inner) < 12) warn.push(`${where}: very short prompt (${words(inner)} words): ${inner.slice(0, 50)}`);
      re.lastIndex = end; // skip prompt body
    }
  }
  if (stack.length) errs.push(`${where}: unclosed tags: ${stack.join(",")}`);
  if (/<h1/i.test(html) || /<img/i.test(html)) errs.push(`${where}: no h1/img allowed`);
  // bare text directly in the fragment root
  if (!/^(body|intro|after|step\d+)$/.test(where)) return;
  const root = html.replace(/<(pre|p|h2|h3|ul|ol|div|details|table)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, "").trim();
  if (root.length > 3) warn.push(`${where}: text outside block elements? "${root.slice(0, 80)}"`);
}

function check(slug) {
  const errs = [], warn = [], state = { pn: 0, internal: 0, external: [] };
  const seedF = path.join(SEED, slug + ".json"); const seed = fs.existsSync(seedF) ? JSON.parse(fs.readFileSync(seedF, "utf8")) : { type: ISSUES.includes(slug) ? "issue" : "?" };
  const type = PILLARS.includes(slug) ? "pillar" : seed.type;
  let total = 0;
  if (type === "project") {
    const f = path.join(OUT, slug + ".json"); if (!fs.existsSync(f)) return { slug, errs: ["missing " + f], warn, total: 0 };
    let p; try { p = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { return { slug, errs: ["invalid JSON: " + e.message], warn, total: 0 }; }
    ["title", "excerpt", "youbuild", "need", "mins", "cost", "intro", "steps", "after"].forEach((k) => { if (p[k] === undefined) errs.push("missing field " + k); });
    if (!Array.isArray(p.steps) || p.steps.length < 6 || p.steps.length > 10) errs.push("steps must be 6 to 10");
    if (!Array.isArray(p.need)) errs.push("need must be an array");
    ["title", "excerpt", "youbuild", "cost"].forEach((k) => { if (typeof p[k] === "string") lintHtml(p[k].replace(/[<>]/g, ""), k, errs, warn, state); });
    (p.need || []).forEach((n, i) => lintHtml(String(n).replace(/[<>]/g, ""), "need" + i, errs, warn, state));
    lintHtml(p.intro || "", "intro", errs, warn, state); total += words(p.intro || "");
    (p.steps || []).forEach((s, i) => { lintHtml(s.t || "", "step" + (i + 1) + ".t", errs, warn, state); lintHtml(s.d || "", "step" + (i + 1), errs, warn, state); const w = words(s.d || ""); total += w; if (w < 150) warn.push(`step ${i + 1} short (${w} words)`); });
    lintHtml(p.after || "", "after", errs, warn, state); total += words(p.after || "");
  } else {
    const f = path.join(OUT, slug + ".html"), mf = path.join(OUT, slug + ".meta.json");
    if (!fs.existsSync(f)) return { slug, errs: ["missing " + f], warn, total: 0 };
    const html = fs.readFileSync(f, "utf8"); lintHtml(html, "body", errs, warn, state); total = words(html);
    if (!fs.existsSync(mf)) errs.push("missing meta.json"); else { try { const mm = JSON.parse(fs.readFileSync(mf, "utf8")); if (!mm.title) errs.push("meta.title missing"); if (type === "issue") { if (!mm.teaser || !Array.isArray(mm.items)) errs.push("issue meta needs teaser + items"); } else if (!mm.excerpt) errs.push("meta.excerpt missing"); lintHtml(JSON.stringify(mm).replace(/[<>]/g, ""), "meta", errs, warn, state); } catch (e) { errs.push("meta invalid JSON"); } }
    if (type !== "issue" && type !== "built") {
      if (!/class="tldr"/.test(html)) errs.push("missing In short box (div.tldr)");
      if (!/class="checklist"/.test(html)) errs.push("missing action plan (ul.checklist)");
      if (!/class="faq"/.test(html)) errs.push("missing FAQs (details.faq)");
      if (!/class="cheat"/.test(html)) warn.push("no cheat sheet (div.cheat)");
    }
  }
  const [lo, hi] = TARGET[type] || [0, 1e9];
  if (total < lo) errs.push(`too short: ${total} words (target ${lo} to ${hi})`); else if (total > hi) warn.push(`long: ${total} words (target ${lo} to ${hi})`);
  if (type !== "issue" && state.internal < 2) warn.push(`only ${state.internal} internal links`);
  return { slug, type, total, prompts: state.pn, errs, warn, external: state.external };
}

let args = process.argv.slice(2); if (args[0] === "all") args = [...slugs, ...ISSUES];
let bad = 0;
for (const s of args) {
  const r = check(s); if (r.errs.length) bad++;
  console.log(`\n== ${s} (${r.type}) ${r.total} words, ${r.prompts || 0} prompts: ${r.errs.length ? "FAIL" : "PASS"}`);
  r.errs.forEach((e) => console.log("  ERROR " + e)); r.warn.forEach((w) => console.log("  warn  " + w));
  if (r.external && r.external.length) console.log("  external links: " + r.external.length);
}
process.exitCode = bad ? 1 : 0;
