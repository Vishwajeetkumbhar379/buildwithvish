/* ===== Build with Vish: app ===== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(pointer: fine)").matches;
  const EMAIL = "vishwajeetkumbhar379@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/vishwajeetkumbhar379";
  const GITHUB = "https://github.com/Vishwajeetkumbhar379";
  const PORTFOLIO = "#portfolio", PORTFOLIO_EXT = "https://vishkumbhar.netlify.app/";
  const PHOTO = "__VISH_PHOTO__", SELFHOST = !!window.BWV_SELFHOST;
  const GMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent("vishwajeetkumbhar379@gmail.com") + "&su=" + encodeURIComponent("Hi Vish (from Build with Vish)");
  const IC = {
    in: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-3.95z"/></svg>',
    gh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>',
    folio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18"/></svg>'
  };
  function connectHTML() {
    return `<div class="connect">
      <a class="cn" href="${PORTFOLIO}"><span class="ci">${IC.folio}</span><span><b>Portfolio</b><small>Work history, brands and tools I built</small></span><span class="ca">→</span></a>
      <a class="cn" href="${LINKEDIN}" target="_blank" rel="noopener"><span class="ci">${IC.in}</span><span><b>LinkedIn</b><small>Carousels and updates</small></span><span class="ca">↗</span></a>
      <div class="cn mailcn"><span class="ci">${IC.mail}</span><span><b>Email</b><small class="mono">${EMAIL}</small></span><span class="mailacts"><a class="pbtn" href="${GMAIL}" target="_blank" rel="noopener">Write in Gmail</a><button class="pbtn" type="button" data-copy="${EMAIL}">Copy</button></span></div>
      <a class="cn" href="${GITHUB}" target="_blank" rel="noopener"><span class="ci">${IC.gh}</span><span><b>GitHub</b><small>Open-source tools I built</small></span><span class="ca">↗</span></a>
    </div>`;
  }
  function openConnect() {
    const m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", "Connect with Vish");
    m.innerHTML = `<div class="modal-in cbox"><div class="modal-h"><h3>Connect with Vish</h3><button class="btn sm" type="button" data-close>Close</button></div><p class="small" style="margin-bottom:16px">Pick whatever's easiest. I reply to every message.</p>${connectHTML()}</div>`;
    const close = () => { m.remove(); document.removeEventListener("keydown", k); lockScroll(false); };
    const k = (e) => { if (e.key === "Escape") close(); };
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) close(); });
    $$("[data-copy]", m).forEach((b) => b.addEventListener("click", () => copy(b.dataset.copy, b)));
    document.addEventListener("keydown", k); document.body.appendChild(m); $("[data-close]", m).focus(); lockScroll(true);
  }
  const ALL = [...GUIDES, ...PROJECTS];
  const find = (s) => ALL.find((a) => a.slug === s);
  const TYPE = { built: ["Tool I built", "t-c"], guide: ["Guide", "t-p"], project: ["Project", "t-t"], prompts: ["Prompts", "t-p"], workflow: ["Workflow", "t-t"], creator: ["Creator marketing", "t-c"], career: ["Career", "t-c"] };
  const toolLabel = (id) => (TOOLS.find((t) => t.id === id) || {}).label || id;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const I = {
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    back: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4"/></svg>',
    out: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h7v7M13 3L4 12"/></svg>',
    search: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/></svg>',
    menu: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 7h14M3 13h14"/></svg>',
    moon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5z"/></svg>',
    sun: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="3.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4"/></svg>',
    save: '<svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 2h8v12l-4-3-4 3z"/></svg>'
  };

  /* ---------- small utils ---------- */
  let tt;
  function toast(m) { let t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); } t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => (t.hidden = true), 2200); }
  function copy(text, el) {
    const done = () => { toast("Copied"); if (el) { const o = el.innerHTML; el.classList.add("done"); el.textContent = "Copied"; setTimeout(() => { el.classList.remove("done"); el.innerHTML = o; }, 1500); } };
    const fb = () => { const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (e) {} ta.remove(); ok ? done() : toast("Select the text and copy it manually"); };
    try { navigator.clipboard.writeText(text).then(done, fb); } catch (e) { fb(); }
  }
  const isPreview = () => /claude|anthropic|usercontent/i.test(location.hostname) || location.protocol === "file:" || location.protocol === "blob:" || !location.hostname;
  function scramble(el, text, dur = 600) {
    if (!el) return; if (RM) { el.textContent = text; return; }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_-", st = performance.now();
    const tick = (n) => { const k = clamp((n - st) / dur); el.textContent = text.split("").map((c, i) => (c === " " || i / text.length < k ? c : chars[(Math.random() * chars.length) | 0])).join(""); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  /* ---------- theme (light pages) ---------- */
  const savedTheme = store.get("bwv-theme"); if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  const effTheme = () => document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  /* ---------- sound (engine in sound.js: generative cosmic-ocean score + UI kit) ---------- */
  const Sound = (() => {
    let eng = null, ctx = null, on = false, cur = 0, depth = 0, ducked = false;
    function boot() {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC || !window.SoundEngine) return false;
      try { ctx = new AC({ latencyHint: "interactive" }); eng = window.SoundEngine(ctx); } catch (e) { ctx = null; eng = null; return false; }
      eng.setChapter(cur); eng.setDepth(depth); return true;
    }
    const live = () => on && eng && !ducked;
    document.addEventListener("visibilitychange", () => { if (!eng || !on) return; ducked = document.hidden; eng.duck(ducked); });
    return {
      get on() { return on; },
      toggle() { if (!eng && !boot()) return false; on = !on; if (on) { if (ctx.state === "suspended") ctx.resume().catch(() => {}); eng.start(); } else eng.stop(); return on; },
      mute(m) { if (eng && on) eng.level(m ? 0.45 : 1); },
      chapter(i) { cur = i; if (eng) eng.setChapter(i); },
      depth(d) { if (Math.abs(d - depth) < 0.01) return; depth = d; if (eng) eng.setDepth(d); },
      scroll(v) { if (live()) eng.scroll(v); },
      thump() { if (live()) eng.splash(); },
      tick() { if (live()) eng.hover(); },
      click() { if (live()) eng.click(); },
      whoosh() { if (live()) eng.whoosh(); },
      riser(k) { if (live()) eng.riser(k); else if (eng && k === 0) eng.riser(0); },
      bloom() { if (live()) eng.bloom(); },
      chime() { if (live()) eng.chime(); },
      whale() { if (live()) eng.whale(true); },
      jelly() { if (live()) { eng.bubbles(6); eng.pluck(86 + [0, 2, 4, 7][(Math.random() * 4) | 0], eng.time + 0.02, 0.03, { ui: true }); } }
    };
  })();

  let lastPt = [innerWidth / 2, innerHeight / 2];
  function setSound(want) {
    const on = Sound.on === want ? want : Sound.toggle(); const b = $("#sound"), n = $("#nav-sound"); if (!b) return on;
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); $("#sound-l").textContent = on ? "Sound on" : "Sound off";
    if (n) { n.classList.toggle("on", on); n.setAttribute("aria-pressed", on); n.setAttribute("aria-label", on ? "Sound on. Turn sound off" : "Sound off. Turn sound on"); $(".snd-l", n).textContent = on ? "Sound on" : "Sound off"; }
    if (on && !homeOn) Sound.mute(true);
    return on;
  }

  /* ---------- XP: a light progress game (stored only in this browser) ---------- */
  const XP = (() => {
    const LV = [[0, "Curious"], [100, "Builder"], [300, "Maker"], [600, "Shipper"], [1000, "Architect"]];
    const WAYS = [["Travel through all six chapters", "5 each"], ["Hold to begin on the home page", "25"], ["Read a guide to the end", "10"], ["Tick a project step", "5"], ["Finish the tool finder", "20"], ["Copy a prompt", "10"], ["Open a carousel", "5"], ["Visit the portfolio", "15"], ["Finish a launch checklist", "40"], ["Spin a 3D piece by dragging it", "5"], ["Join Build Notes", "50"]];
    let pts = 0, got = {};
    try { pts = +(localStorage.getItem("bwv-xp") || 0) || 0; got = JSON.parse(localStorage.getItem("bwv-xp-got") || "{}") || {}; } catch (e) {}
    const lvl = () => { let i = 0; LV.forEach((l, k) => { if (pts >= l[0]) i = k; }); return i; };
    function paint() {
      const i = lvl(), lo = LV[i][0], hi = (LV[i + 1] || [lo + 1])[0], el = $("#xp-n"); if (!el) return;
      el.textContent = pts; $("#xp-l").textContent = LV[i][1]; $("#xp-ring").style.setProperty("--k", LV[i + 1] ? (pts - lo) / (hi - lo) : 1);
    }
    function add(key, n, at, quiet) {
      if (key && got[key]) return; if (key) got[key] = 1; const before = lvl(); pts += n;
      try { localStorage.setItem("bwv-xp", pts); localStorage.setItem("bwv-xp-got", JSON.stringify(got)); } catch (e) {}
      paint(); if (quiet) { const pill = $("#xp"); if (pill) { pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump"); } return; }
      const p = at || lastPt, f = document.createElement("div"); f.className = "xp-float"; f.textContent = "+" + n + " XP"; f.style.left = p[0] + "px"; f.style.top = p[1] + "px"; document.body.appendChild(f); setTimeout(() => f.remove(), 1400);
      const pill = $("#xp"); if (pill) { pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump"); }
      if (lvl() > before) { Sound.chime(); toast("Level up: " + LV[lvl()][1]); }
    }
    return { add, paint, LV, WAYS, get pts() { return pts; }, get lvl() { return lvl(); }, reset() { pts = 0; got = {}; try { localStorage.removeItem("bwv-xp"); localStorage.removeItem("bwv-xp-got"); } catch (e) {} paint(); } };
  })();
  function openXP() {
    const m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", "Your builder level");
    const i = XP.lvl;
    m.innerHTML = `<div class="modal-in cbox xpbox"><div class="modal-h"><h3>Your builder level</h3><button class="btn sm" type="button" data-close>Close</button></div>
      <p class="small" style="margin-bottom:18px">Earn XP by learning and building here. It's saved only in this browser. No account, no tracking.</p>
      <div class="xp-levels">${XP.LV.map((l, k) => `<div class="xl ${k <= i ? "on" : ""} ${k === i ? "xcur" : ""}"><b>${l[1]}</b><span>${l[0]} XP</span></div>`).join("")}</div>
      <p class="xp-now"><b>${XP.pts}</b> XP · ${XP.LV[i][1]}${XP.LV[i + 1] ? ` · ${XP.LV[i + 1][0] - XP.pts} to ${XP.LV[i + 1][1]}` : " · top level"}</p>
      <ul class="xp-ways">${XP.WAYS.map(([a, b]) => `<li><span>${a}</span><b>+${b}</b></li>`).join("")}</ul></div>`;
    const close = () => { m.remove(); document.removeEventListener("keydown", k); lockScroll(false); };
    const k = (e) => { if (e.key === "Escape") close(); };
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", k); document.body.appendChild(m); $("[data-close]", m).focus(); lockScroll(true);
  }

  /* ---------- forms ---------- */
  async function sendForm(name, data) {
    if (isPreview()) return { preview: true };
    try { const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ "form-name": name, ...data }).toString() }); return { ok: r.ok }; } catch (e) { return { ok: false }; }
  }
  const okEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((e || "").trim());
  function signup(id, glow) {
    return `<form class="signup" data-form="newsletter" novalidate><label class="sr" for="${id}">Email address</label>
      <div class="field"><input id="${id}" name="email" type="email" autocomplete="email" placeholder="you@email.com" required><button class="btn ${glow ? "glow" : "pri"}" type="submit">Get Build Notes</button></div>
      <p class="msg" aria-live="polite"></p><p class="small">Free, every Monday. You confirm by email first, and can leave with one click.</p></form>`;
  }
  document.addEventListener("submit", async (e) => {
    const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault();
    const msg = $(".msg", f), kind = f.dataset.form, data = Object.fromEntries(new FormData(f).entries());
    const err = (t) => { msg.className = "msg err"; msg.textContent = t; };
    if (kind === "newsletter" && !okEmail(data.email)) return err("Enter a full email address, like name@email.com.");
    if (kind === "partner" && (!data.name || !okEmail(data.email) || !data.message)) return err("Add your name, a valid email and a short message.");
    data.page = location.hash || "#home";
    const b = $("button[type=submit]", f); b.disabled = true; const r = await sendForm(kind, data); b.disabled = false;
    if ((r.ok || r.preview) && kind === "newsletter") XP.add("signup", 50, (() => { const b2 = b.getBoundingClientRect(); return [b2.left + b2.width / 2, b2.top]; })());
    if (r.ok) { msg.className = "msg ok"; msg.textContent = kind === "newsletter" ? "Almost there. Check your inbox and click the confirm link." : "Thanks. I'll reply within two working days."; f.reset(); toast(kind === "newsletter" ? "Check your inbox" : "Message sent"); }
    else if (r.preview) { msg.className = "msg ok"; msg.textContent = "Preview mode, so nothing was sent. This works on the live site."; }
    else err("That didn't go through. Email me instead: " + EMAIL);
  });

  /* ---------- shell ---------- */
  const NAV = [["guides", "Guides"], ["projects", "Projects"], ["carousels", "Carousels"], ["newsletter", "Newsletter"], ["portfolio", "Portfolio"], ["about", "About"]];
  function shell() {
    document.body.insertAdjacentHTML("afterbegin", `
      <a class="sr" href="#main">Skip to content</a>
      <div class="stage" id="stage" aria-hidden="true"><canvas id="gl"></canvas><div class="vignette"></div><div class="grain"></div></div>
      <div class="hud off" id="hud">
        <nav class="rail" aria-label="Chapters">${CHAPTERS.map((c, i) => `<button type="button" data-ch="${i}" aria-label="Chapter ${c.n}: ${c.name}"><i></i>${c.n}<span class="lb">${c.name}</span></button>`).join("")}</nav>
        <div class="readout" aria-hidden="true"><b id="ro-n">01</b><span>/06</span> <span id="ro-name">IDEA</span></div>
        <div class="bar" aria-hidden="true"><i id="ro-bar"></i></div>
        <div class="hint" id="hint" aria-hidden="true">SCROLL TO BUILD · DRAG TO SPIN<i></i></div>
        <div class="hud-btns"><button class="sound" id="daynight" type="button" aria-label="Switch between night and day"><span id="dn-i"></span><span id="dn-l">Day</span></button><button class="sound" id="sound" type="button" aria-pressed="false"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span id="sound-l">Sound off</span></button></div>
      </div>
      <div class="progress" id="prog" hidden></div>
      <header class="nav" id="nav"><div class="wrap">
        <a class="logo" href="#home" aria-label="Build with Vish, home"><i></i><span>Build with Vish</span></a>
        <ul class="links">${NAV.map(([h, l]) => `<li><a href="#${h}" data-nav="${h}">${l}</a></li>`).join("")}</ul>
        <div class="nav-tools">
          <button class="ibtn" id="theme" type="button" aria-label="Switch light or dark mode for reading pages"></button>
          <button class="xp-pill" type="button" id="xp" aria-label="Your builder level"><span class="xp-ring"><i id="xp-ring"></i></span><span id="xp-l">Curious</span><b id="xp-n">0</b></button><a class="btn pri sm" href="#newsletter" id="nav-cta">Get Build Notes</a>
          <button class="ibtn menu-btn" id="menu" type="button" aria-label="Open menu" aria-expanded="false">${I.menu}</button>
        </div></div></header>
      <main id="main" tabindex="-1"></main>
      <footer id="foot"><div class="wrap">
        <div class="fgrid">
          <div style="display:grid;gap:14px;align-content:start"><a class="logo" href="#home"><i></i><span>Build with Vish</span></a><p class="small" style="max-width:32em">Free step-by-step guides, prompts and projects for building things with AI. Made for people who don't code, by someone who didn't either.</p></div>
          <div><h4>Learn</h4><ul><li><a href="#start">Start here</a></li><li><a href="#guides">All guides</a></li><li><a href="#projects">Projects</a></li><li><a href="#tools">Find your AI tools</a></li><li><a href="#launch">Before you launch</a></li></ul></div>
          <div><h4>More</h4><ul><li><a href="#carousels">Carousels</a></li><li><a href="#newsletter">Build Notes</a></li><li><a href="#partner">Partner with me</a></li><li><a href="#about">About</a></li></ul></div>
          <div><h4>Connect</h4><ul><li><a href="${PORTFOLIO}">Portfolio</a></li><li><a href="${PORTFOLIO_EXT}Vishwajeet_Kumbhar_CV.pdf" target="_blank" rel="noopener">CV (PDF) ↗</a></li><li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ↗</a></li><li><a href="${GMAIL}" target="_blank" rel="noopener">Email via Gmail ↗</a></li><li><a href="${GITHUB}" target="_blank" rel="noopener">GitHub ↗</a></li><li><a href="#legal">Imprint and privacy</a></li></ul></div>
        </div>
        <div class="fbig" aria-hidden="true">Build with Vish</div>
        <div class="fine"><span>© 2026 Vishwajeet Kumbhar</span><a href="#legal">Imprint and privacy</a></div>
      </div></footer>
      <button class="sound snd-float" id="nav-sound" type="button" aria-pressed="false" aria-label="Sound off. Turn sound on"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="snd-l">Sound off</span></button>
      <div class="wipe" id="wipe" aria-hidden="true"><span class="wipe-w">Build with Vish</span></div>`);
    $("#theme").addEventListener("click", toggleTheme); $("#daynight").addEventListener("click", toggleTheme);
    matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => syncTheme());
    syncTheme();
    $("#menu").addEventListener("click", openMenu);
    $("#sound").addEventListener("click", () => setSound(!Sound.on)); $("#nav-sound").addEventListener("click", () => setSound(!Sound.on));
    $("#xp").addEventListener("click", openXP); XP.paint();
    // UI micro-sounds: a soft tick on hover, a click on press (only when sound is on)
    let lastTick = null;
    document.addEventListener("pointerover", (e) => { const el = e.target.closest && e.target.closest("a,button,.opt,.ptab"); if (el && el !== lastTick && FINE) Sound.tick(); lastTick = el; }, { passive: true });
    document.addEventListener("pointerdown", (e) => { if (e.target.closest && e.target.closest("a,button,.opt,.ptab")) Sound.click(); }, { passive: true });
    document.addEventListener("pointerdown", (e) => { lastPt = [e.clientX, e.clientY]; }, { passive: true, capture: true });
    $$(".hud .rail button").forEach((b) => b.addEventListener("click", () => { const el = $$(".chapter")[+b.dataset.ch]; if (el) goTo(el); }));
    cursor();
  }
  function syncTheme() {
    const day = effTheme() === "light";
    $("#theme").innerHTML = day ? I.moon : I.sun; $("#theme").setAttribute("aria-label", day ? "Switch to night mode" : "Switch to day mode");
    $("#dn-i").innerHTML = day ? I.moon : I.sun; $("#dn-l").textContent = day ? "Night" : "Day";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", day ? "#E6E0E8" : "#030308");
    if (glReady) window.Journey.setMode(day);
    if (window.DealScene && window.DealScene.ok) window.DealScene.setMode(day);
  }
  function toggleTheme() { const n = effTheme() === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-theme", n); store.set("bwv-theme", n); syncTheme(); }
  function openMenu() {
    const s = document.createElement("div"); s.className = "sheet";
    s.innerHTML = `<nav aria-label="Menu"><button class="ibtn" type="button" aria-label="Close menu" style="align-self:flex-end;margin-bottom:14px;background:transparent;color:inherit;border-color:rgba(236,235,245,.2)">✕</button>${[["home", "Home"], ["start", "Start here"], ...NAV, ["partner", "Partner"], ["tools", "AI tool finder"], ["launch", "Before you launch"]].map(([h, l], i) => `<a href="#${h}">${l}<small>${String(i + 1).padStart(2, "0")}</small></a>`).join("")}<button class="sheet-sound${Sound.on ? " on" : ""}" type="button" data-snd><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>${Sound.on ? "Sound on" : "Sound off"}</span></button></nav>`;
    const close = () => { s.remove(); $("#menu").setAttribute("aria-expanded", "false"); document.removeEventListener("keydown", k); };
    const k = (e) => { if (e.key === "Escape") close(); };
    s.addEventListener("click", (e) => { const sb = e.target.closest("[data-snd]"); if (sb) { const on = setSound(!Sound.on); sb.classList.toggle("on", on); sb.lastChild.textContent = on ? "Sound on" : "Sound off"; return; } if (e.target === s || e.target.closest("button,a")) close(); });
    document.addEventListener("keydown", k); document.body.appendChild(s); $("#menu").setAttribute("aria-expanded", "true"); $("a", s).focus();
  }
  function cursor() {
    if (!FINE || RM) return;
    const d = document.createElement("div"), r = document.createElement("div"); d.className = "cur"; r.className = "cur-ring"; document.body.append(d, r);
    let x = -100, y = -100, rx = x, ry = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; const big = e.target.closest && e.target.closest("a,button,.opt,.ptab,input,select,textarea,.track"); const h3 = homeOn && glReady && !big && window.Journey.hover; r.classList.toggle("big", !!big || !!h3); const inJ = homeOn && !big && !h3 && e.target.closest && e.target.closest("#journey") && !e.target.closest(".panel"); r.dataset.l = h3 === "carousel" ? "Open" : h3 === "prompt" ? "Try" : inJ ? "Drag" : ""; r.classList.toggle("lbl", !!inJ && !big && !h3); }, { passive: true });
    (function loop() { rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; r.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  }
  document.addEventListener("pointerout", (e) => { const t = e.target.closest && e.target.closest(".tilt"); if (t && !t.contains(e.relatedTarget)) { t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg"); t.classList.remove("tilting"); } });
  document.addEventListener("pointermove", (e) => { const t = e.target.closest && e.target.closest(".tilt"); if (t && FINE && !RM) { const b = t.getBoundingClientRect(); t.style.setProperty("--rx", (((e.clientY - b.top) / b.height - 0.5) * -7).toFixed(2) + "deg"); t.style.setProperty("--ry", (((e.clientX - b.left) / b.width - 0.5) * 7).toFixed(2) + "deg"); t.classList.add("tilting"); }
    const c = e.target.closest && e.target.closest(".ccard,.bcard,.pf-d,.bt"); if (!c) return; const b = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - b.left + "px"); c.style.setProperty("--my", e.clientY - b.top + "px"); }, { passive: true });

  /* ---------- reusable pieces ---------- */
  const typePill = (a) => { const [l, c] = TYPE[a.type]; return `<span class="pill ${c}">${l}</span>`; };
  const toolPills = (a) => a.tools.map((t) => `<span class="pill tool">${toolLabel(t)}</span>`).join("");
  const card = (a) => `<a class="card" href="#read-${a.slug}"><div class="chipline">${typePill(a)}${toolPills(a)}</div><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p><div class="foot"><span>${a.type === "project" ? a.mins + " min build" : a.mins + " min read"} / ${a.level}</span><span>${I.arrow.replace("<svg", '<svg width="14" height="14"')}</span></div></a>`;
  const ccard = (a) => `<a class="ccard" href="#read-${a.slug}"><span class="tag">${TYPE[a.type][0]}</span><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p><div class="meta"><span>${a.type === "project" ? a.mins + " MIN BUILD" : a.mins + " MIN READ"}</span><span class="go">${I.arrow}</span></div></a>`;
  const issueCard = (i) => `<a class="issue" href="#${i.slug}"><span class="no">#${i.n}</span><h3>${esc(i.title)}</h3><ol>${i.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><span class="rd">READ ONLINE</span></a>`;
  const splitWords = (t) => t.split(" ").map((w, i) => `<span class="cw" style="--i:${i}">${esc(w)}</span>`).join(" ");
  const splitChars = (t) => { let i = 0; return t.split(" ").map((w) => `<span class="wd">${w.split("").map((c) => `<span class="ch" style="--i:${i++}">${esc(c)}</span>`).join("")}</span>`).join(" "); };

  /* ---------- carousels ---------- */
  function slideHTML(cv, s, i, n) {
    const top = `<div class="top"><div class="handle"><i>VK</i><div><b>Vish Kumbhar</b><span>Build with Vish</span></div></div><span class="count">${i + 1}/${n}</span></div>`;
    let body = "";
    if (s.k === "cover") body = `<div class="sc"><span class="badge">${esc(s.badge)}</span><h4>${esc(s.title)}</h4><p class="sub">${esc(s.sub)}</p></div><span class="emo" aria-hidden="true">${s.emoji || ""}</span>`;
    else if (s.k === "point") body = `<div class="sc ${s.tint === "t" ? "t" : s.tint === "c" ? "c" : ""}"><span class="num">${esc(s.n)}</span><p class="pt">${esc(s.title)}</p><p class="bd">${esc(s.body)}</p></div><span class="emo" aria-hidden="true">${s.emoji || ""}</span>`;
    else if (s.k === "list") body = `<div class="sc t"><p class="pt">${esc(s.title)}</p><ul>${s.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
    else body = `<div class="sc c"><p class="save">${I.save} Save this</p><h4>${esc(s.title)}</h4><p class="bd">${esc(s.q)}</p></div>`;
    const foot = `<div class="foot"><span>${i === 0 ? "<b>Swipe</b> to read" : esc(cv.title)}</span><span>${i === n - 1 ? "buildwithvish" : "→"}</span></div>`;
    return `<div class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}">${top}${body}${foot}</div>`;
  }
  function deckHTML(cv) {
    return `<div class="deck" data-deck="${cv.slug}"><div class="track" tabindex="0" aria-label="${esc(cv.title)} carousel, use arrow keys">${cv.slides.map((s, i) => slideHTML(cv, s, i, cv.slides.length)).join("")}</div>
      <div class="deck-ui"><button class="btn sm ghost" type="button" data-dir="-1" aria-label="Previous slide">${I.back}</button><button class="btn sm ghost" type="button" data-dir="1" aria-label="Next slide">${I.arrow}</button><span class="dots">${cv.slides.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</span><span class="cnt">1 / ${cv.slides.length}</span></div></div>`;
  }
  function bindDeck(root) {
    $$(".deck", root).forEach((dk) => {
      const tr = $(".track", dk), slides = $$(".slide", tr), dots = $$(".dots i", dk), cnt = $(".cnt", dk);
      const idx = () => { const c = tr.scrollLeft + tr.clientWidth / 2; let best = 0, bd = 1e9; slides.forEach((s, i) => { const m = s.offsetLeft + s.offsetWidth / 2, d = Math.abs(m - c); if (d < bd) { bd = d; best = i; } }); return best; };
      const go = (i) => { i = clamp(i, 0, slides.length - 1); const s = slides[i]; tr.scrollTo({ left: s.offsetLeft - (tr.clientWidth - s.offsetWidth) / 2, behavior: RM ? "auto" : "smooth" }); };
      const upd = () => { const i = idx(); dots.forEach((d, k) => d.classList.toggle("on", k === i)); cnt.textContent = `${i + 1} / ${slides.length}`; };
      tr.addEventListener("scroll", () => requestAnimationFrame(upd), { passive: true });
      $$("[data-dir]", dk).forEach((b) => b.addEventListener("click", () => go(idx() + +b.dataset.dir)));
      tr.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(idx() + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(idx() - 1); } });
      let down = false, sx = 0, sl = 0, moved = false;
      tr.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = tr.scrollLeft; tr.classList.add("drag"); });
      addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; tr.scrollLeft = sl - dx; });
      addEventListener("pointerup", () => { if (!down) return; down = false; tr.classList.remove("drag"); go(idx()); });
      tr.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    });
  }
  function openDeck(slug) {
    const cv = CAROUSELS.find((c) => c.slug === slug); if (!cv) return; setTimeout(() => XP.add("deck-" + slug, 5), 400);
    const m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", cv.title);
    m.innerHTML = `<div class="modal-in"><div class="modal-h"><h3>${esc(cv.title)}</h3><div style="display:flex;gap:8px"><a class="btn sm" href="#read-${cv.link}">Read the guide</a><button class="btn sm" type="button" data-close>Close</button></div></div>${deckHTML(cv)}</div>`;
    const close = () => { m.remove(); document.removeEventListener("keydown", k); lockScroll(false); };
    const k = (e) => { if (e.key === "Escape") close(); };
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]") || e.target.closest("a[href^='#read']")) close(); });
    document.addEventListener("keydown", k); document.body.appendChild(m); bindDeck(m); $(".track", m).focus(); lockScroll(true);
  }

  /* ---------- prompt builder ---------- */
  let pIdx = 0; const pVals = {};
  function promptBuilder(host) {
    if (!host) return;
    const p = PLAY[pIdx];
    host.innerHTML = `<div class="ptabs" role="tablist" aria-label="Prompt tasks">${PLAY.map((x, i) => `<button class="ptab" role="tab" type="button" aria-selected="${i === pIdx}" data-i="${i}"><b>${esc(x.label)}</b><span>${esc(x.hint)}</span></button>`).join("")}</div>
      <div class="pad" role="tabpanel"><div class="head"><i></i><i></i><i></i><span style="margin-left:8px">prompt.txt</span></div><div class="fields">${p.fields.map((f) => `<label for="pf-${p.id}-${f.k}">${esc(f.label)}<input id="pf-${p.id}-${f.k}" data-k="${f.k}" placeholder="${esc(f.ph)}" value="${esc(pVals[p.id + f.k] || "")}"></label>`).join("")}</div>
      <pre id="pout"></pre><div class="acts"><button class="btn pri sm" type="button" id="pcopy">Copy prompt</button><a class="btn sm" id="pclaude" target="_blank" rel="noopener">Open in Claude ${I.out}</a><a class="btn sm" id="pgpt" target="_blank" rel="noopener">Open in ChatGPT ${I.out}</a></div></div>`;
    $$(".ptab", host).forEach((t) => t.addEventListener("click", () => { pIdx = +t.dataset.i; promptBuilder(host); }));
    const plain = () => p.text.replace(/\{(\w+)\}/g, (_, k) => (pVals[p.id + k] || "").trim() || "[" + p.fields.find((f) => f.k === k).label.toLowerCase() + "]");
    const draw = () => { $("#pout", host).innerHTML = esc(p.text).replace(/\{(\w+)\}/g, (_, k) => `<mark>${esc((pVals[p.id + k] || "").trim() || "[" + p.fields.find((f) => f.k === k).label.toLowerCase() + "]")}</mark>`); const q = encodeURIComponent(plain()); $("#pclaude", host).href = "https://claude.ai/new?q=" + q; $("#pgpt", host).href = "https://chatgpt.com/?q=" + q; };
    $$(".fields input", host).forEach((inp) => inp.addEventListener("input", () => { pVals[p.id + inp.dataset.k] = inp.value; draw(); }));
    $("#pcopy", host).addEventListener("click", (e) => { copy(plain(), e.currentTarget); XP.add("copy-" + p.id, 10); });
    draw();
  }

  /* ---------- quiz ---------- */
  let qStep = 0, qAns = [];
  function quiz(host) {
    if (!host) return;
    const bar = `<div class="qsteps" aria-hidden="true">${QUIZ.map((_, i) => `<i class="${i <= qStep ? "on" : ""}"></i>`).join("")}</div>`;
    if (qStep < QUIZ.length) {
      const q = QUIZ[qStep];
      host.innerHTML = `${bar}<p class="small mono">QUESTION ${qStep + 1} OF ${QUIZ.length}</p><h3>${esc(q.q)}</h3><div class="opts">${q.a.map(([l, v]) => `<button class="opt" type="button" data-v="${v}">${esc(l)}</button>`).join("")}</div>`;
      $$(".opt", host).forEach((b) => b.addEventListener("click", () => { qAns.push(b.dataset.v); qStep++; quiz(host); $(".opt", host)?.focus(); }));
    } else {
      const picks = stackFor(qAns), g = find(QUIZ_GUIDE[qAns[3]] || "claude-from-zero"); setTimeout(() => XP.add("quiz", 20), 300);
      host.innerHTML = `${bar}<h3>Your starter stack</h3><div class="picks">${picks.map((k, i) => { const s = STACK[k]; return `<div class="pick" style="--i:${i}"><span class="lm">${s.name[0]}</span><div><a href="${s.url}" target="_blank" rel="noopener">${s.name}</a><p>${esc(s.why)}</p></div></div>`; }).join("")}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto"><a class="btn pri sm" href="#read-${g.slug}">Start with: ${esc(g.title.split(":")[0])}</a><button class="btn sm" type="button" id="qagain">Start over</button></div>`;
      $("#qagain", host).addEventListener("click", () => { qStep = 0; qAns = []; quiz(host); });
    }
  }
  function stackFor([want, home, setup, win]) {
    const s = new Set();
    s.add(home === "google" ? "gemini" : home === "ms" ? "copilot" : "claude");
    s.add(home === "mobile" ? "chatgpt" : home === "google" || home === "ms" ? "claude" : "chatgpt");
    if (want === "build" || win === "build") s.add("netlify");
    if (want === "write" || win === "write") s.add("canva");
    if ((want === "admin" || win === "admin") && setup !== "zero") s.add("zapier");
    if (want === "learn" || win === "learn") s.add("notion");
    if (s.size < 4 && setup === "connect") s.add("zapier");
    return Array.from(s).slice(0, 4);
  }

  /* ---------- calculator ---------- */
  function calc(slot) {
    slot.outerHTML = `<div class="calc" id="calc"><div class="ins">
      <label for="c-b"><span>Campaign budget <output id="o-b"></output></span><input id="c-b" type="range" min="2000" max="100000" step="1000" value="20000"></label>
      <label for="c-c"><span>Creators <output id="o-c"></output></span><input id="c-c" type="range" min="1" max="60" value="10"></label>
      <label for="c-r"><span>Average reach per post <output id="o-r"></output></span><input id="c-r" type="range" min="2000" max="500000" step="1000" value="60000"></label>
      <label for="c-e"><span>Engagement rate <output id="o-e"></output></span><input id="c-e" type="range" min="0.5" max="12" step="0.1" value="4"></label></div>
      <div class="outs"><div class="o"><b id="r1"></b><span>Total reach</span></div><div class="o"><b id="r2"></b><span>Engagements</span></div><div class="o"><b id="r3"></b><span>CPM, per 1,000 reached</span></div><div class="o"><b id="r4"></b><span>Cost per engagement</span></div></div></div>`;
    const nf = (n, d = 0) => n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
    const u = () => { const b = +$("#c-b").value, c = +$("#c-c").value, r = +$("#c-r").value, e = +$("#c-e").value, reach = c * r, eng = reach * e / 100;
      $("#o-b").textContent = "€" + nf(b); $("#o-c").textContent = c; $("#o-r").textContent = nf(r); $("#o-e").textContent = e.toFixed(1) + "%";
      $("#r1").textContent = nf(reach); $("#r2").textContent = nf(Math.round(eng)); $("#r3").textContent = "€" + nf(b / reach * 1000, 2); $("#r4").textContent = "€" + nf(b / eng, 2); };
    $$("#calc input").forEach((i) => i.addEventListener("input", u)); u();
  }

  /* ---------- prose enhancement ---------- */
  function enhance(root) {
    $$("pre.prompt", root).forEach((pre) => {
      const t = pre.textContent.trim(), q = encodeURIComponent(t), box = document.createElement("div"), lab = pre.dataset.label; box.className = "pbox";
      box.innerHTML = `<div class="bar"><span${lab ? ' class="lab"' : ""}>${lab ? esc(lab) : "PROMPT"}</span><div><button class="pbtn" type="button">Copy</button><a class="pbtn" href="https://claude.ai/new?q=${q}" target="_blank" rel="noopener">Claude ${I.out}</a><a class="pbtn" href="https://chatgpt.com/?q=${q}" target="_blank" rel="noopener">ChatGPT ${I.out}</a></div></div>`;
      pre.replaceWith(box); box.appendChild(pre); $("button", box).addEventListener("click", (e) => { copy(t, e.currentTarget); XP.add("copy-" + t.length + "-" + t.slice(0, 12), 10); });
    });
    const s = $(".calc-slot", root); if (s) calc(s);
    const page = (location.hash.match(/^#read-([a-z0-9-]+)/) || [])[1] || "page";
    $$("ul.checklist", root).forEach((ul, k) => {
      const key = "bwv-cl-" + page + "-" + k, items = $$(":scope > li", ul); let st = [];
      try { st = JSON.parse(store.get(key) || "[]"); } catch (e) { st = []; }
      const prog = document.createElement("p"); prog.className = "cl-prog"; prog.setAttribute("aria-live", "polite"); ul.after(prog);
      const upd = () => { prog.textContent = `${st.length} of ${items.length} done`; };
      items.forEach((li, i) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "ck"; b.setAttribute("aria-label", "Mark done: " + li.textContent.trim().slice(0, 80));
        const set = (on) => { li.dataset.done = on; b.setAttribute("aria-pressed", on); };
        const tog = () => { const on = !st.includes(i); st = on ? [...st, i] : st.filter((x) => x !== i); set(on); store.set(key, JSON.stringify(st)); upd();
          if (on) { XP.add("cl-" + page + "-" + k + "-" + i, 2); if (st.length === items.length) { toast("Action plan done"); Sound.chime(); } } };
        li.prepend(b); set(st.includes(i));
        b.addEventListener("click", (e) => { e.stopPropagation(); tog(); });
        li.addEventListener("click", (e) => { if (e.target.closest("a,button")) return; tog(); });
      });
      upd();
    });
  }
  /* long guides live in their own files on the live site and load on demand */
  const bodyReq = {};
  function loadBody(a) {
    if (!a || !a.ext || a.body) return Promise.resolve();
    if (!bodyReq[a.slug]) bodyReq[a.slug] = fetch("g/" + a.slug + ".html?v=" + (window.BWV_V || "1"), { credentials: "same-origin", signal: (window.AbortSignal && AbortSignal.timeout) ? AbortSignal.timeout(15000) : undefined })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then((t) => { if (/^\s*<!doctype/i.test(t)) throw new Error("not a guide"); return t; })
      .then((t) => { a.body = t; })
      .catch((e) => { delete bodyReq[a.slug]; throw e; });
    return bodyReq[a.slug];
  }
  document.addEventListener("pointerover", (e) => { const l = e.target.closest && e.target.closest('a[href^="#read-"]'); if (l) loadBody(find(l.getAttribute("href").slice(6))).catch(() => {}); }, { passive: true });

  /* ================= VIEWS ================= */
  function vHome() {
    const starts = ALL.filter((a) => a.start).sort((a, b) => a.rank - b.rank).slice(0, 6);
    const nBuilt = ALL.filter((a) => a.type === "built").length, nProj = ALL.filter((a) => a.type === "project").length;
    const link = (s) => { const a = find(s); return `<li><a href="#read-${a.slug}"><span>${esc(a.title)}</span><i>${a.type === "project" ? a.mins + " min build" : a.mins + " min read"}</i></a></li>`; };
    const chapter = (c, i) => `<div class="chapter" id="ch-${c.id}" data-i="${i}"><div class="wrap"><div class="panel${i === 0 ? " hero-panel" : ""}">
        <div class="idx"><b>${c.n}</b><span></span>${c.name}</div>
        ${i === 0 ? `<h1 class="hero-title" aria-label="Build with Vish"><span class="ht1">Build</span><span class="ht2">with Vish</span></h1><p class="hero-sub">${esc(c.title)}</p>` : `<h2 aria-label="${esc(c.title)}"><span aria-hidden="true">${splitWords(c.title)}</span></h2>`}
        <p>${esc(c.body)}</p>
        ${c.links.length ? `<ul class="ch-links">${c.links.map(link).join("")}</ul>` : ""}
        ${i === 0 ? `<div class="hold-row"><button class="hold" id="hold" type="button" aria-label="Press and hold to begin the journey"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="hb" cx="32" cy="32" r="29"/><circle class="hf" cx="32" cy="32" r="29"/></svg><span class="hold-dot" aria-hidden="true"></span></button><span class="hold-l"><b>Press and hold</b><span>to begin the journey</span></span></div>` : ""}
        ${i === 5 ? `<div class="cine-form">${signup("j-email", true)}</div>` : `<div class="ctas">${c.cta.map(([l, h], k) => `<a class="btn ${k ? "" : "pri"}" href="${h}">${l}</a>`).join("")}</div>`}
      </div></div></div>`;
    return `<section class="journey" id="journey" aria-label="Six chapters of building with AI">${CHAPTERS.map(chapter).join("")}</section>
    <div class="after" id="after">
      <section class="statement"><div class="wrap"><p class="big-reveal" data-reveal>AI is the most useful tool most people never learned to use properly. Build with Vish is the free, step by step fix: plain words, prompts that work, and projects you can actually finish.</p></div></section>
      <section><div class="wrap"><div class="bento">
        <a class="bt b-start" href="#start"><span class="tag">START HERE</span><h3>New to AI? Three steps, in order.</h3><p>Pick one AI, set it up properly, then build your first thing. About an hour in total.</p><span class="bnum" aria-hidden="true">1 2 3</span><span class="bgo">Start the path ${I.arrow}</span></a>
        <a class="bt b-car" href="#carousels"><span class="tag">CAROUSELS</span><h3>One idea per slide.</h3><div class="bslide">${slideHTML(CAROUSELS[0], CAROUSELS[0].slides[0], 0, CAROUSELS[0].slides.length)}</div></a>
        <a class="bt" href="#guides"><span class="bbig">${ALL.length}</span><h3>Free guides and projects</h3><span class="bgo">Browse ${I.arrow}</span></a>
        <a class="bt" href="#projects"><span class="bbig">${nProj}</span><h3>Step-by-step builds</h3><span class="bgo">See projects ${I.arrow}</span></a>
        <a class="bt" href="#carousels"><span class="bbig">${CAROUSELS.length}</span><h3>Swipeable carousels</h3><span class="bgo">Swipe ${I.arrow}</span></a>
        <a class="bt" href="#newsletter"><span class="bbig">Mon</span><h3>Build Notes, every week</h3><span class="bgo">Read issues ${I.arrow}</span></a>
        <a class="bt b-wide" href="#guides-built"><span class="tag">TOOLS I BUILT</span><h3>${nBuilt} tools from five years of creator marketing, and how they work.</h3><span class="bgo">See the tools ${I.arrow}</span></a>
        <a class="bt b-wide" href="#tools"><span class="tag">AI TOOL FINDER</span><h3>Four questions. The AI tools you actually need.</h3><span class="bgo">Find yours ${I.arrow}</span></a>
      </div></div></section>
      <section id="home-play"><div class="wrap"><div class="sh"><div><h2>Fill two blanks. Get a prompt that fits.</h2><p class="lead">Pick a task, add your details, then copy it or open it straight in Claude or ChatGPT.</p></div></div><div class="play" id="play"></div></div></section>
      <section><div class="wrap"><div class="sh"><div><h2>Where most people start.</h2></div><a class="btn" href="#guides">All ${ALL.length}</a></div><div class="ccards">${starts.map(ccard).join("")}</div></div></section>
      <section id="home-quiz"><div class="wrap quiz"><div style="display:grid;gap:16px;align-content:start"><h2 class="sh2">Not sure which AI tools you need?</h2><p class="lead">Four questions, about a minute. A short stack with a reason for each tool. No email needed.</p></div><div class="qcard" id="quiz" aria-live="polite"></div></div></section>
      <section><div class="wrap"><div class="sh"><div><h2>Read the latest issues.</h2><p class="lead">One guide, one prompt, one thing to try.</p></div><a class="btn" href="#newsletter">Full archive</a></div><div class="issues">${ISSUES.slice(0, 3).map(issueCard).join("")}</div></div></section>
      <section id="home-connect"><div class="wrap"><div class="sh"><div><h2>Say hi, or see my other work.</h2><p class="lead">Questions about a guide, an idea to build together, or a role you're hiring for.</p></div></div>${connectHTML()}</div></section>
      <section style="padding-top:0"><div class="wrap"><div class="bigcta"><div style="display:grid;gap:18px"><h2>Get Build Notes.</h2><p class="lead">One guide, one prompt, one thing to try. Free.</p></div>${signup("cta-email", true)}</div></div></section>
    </div>`;
  }
  function vStart() {
    const L = (s) => { const a = find(s); return `<li><a href="#read-${a.slug}"><span>${esc(a.title)}</span>${I.arrow.replace("<svg", '<svg width="14" height="14"')}</a></li>`; };
    return `<div class="wrap pg"><div class="phead"><h1>New to AI? Start here.</h1><p class="lead">Three steps, in order. By the end you'll have one AI set up properly and one thing you built yourself.</p></div>
      <div class="path">
        <div class="pstep"><span class="pn">1</span><h3>Pick your AI</h3><p class="small">You only need one to start.</p><ul>${L("pick-your-ai-by-job")}<li><a href="#tools"><span>Take the 1-minute tool finder</span>${I.arrow.replace("<svg", '<svg width="14" height="14"')}</a></li></ul></div>
        <div class="pstep"><span class="pn">2</span><h3>Set it up properly</h3><p class="small">Twenty minutes that make every answer better.</p><ul>${L("claude-from-zero")}${L("chatgpt-from-zero")}${L("brief-ai-like-an-agency")}</ul></div>
        <div class="pstep"><span class="pn">3</span><h3>Build your first thing</h3><p class="small">Finish one project end to end.</p><ul>${L("ai-about-me-folder")}${L("build-website-no-code")}${L("linkedin-carousel-with-ai")}</ul></div>
      </div>
      <a class="launch-band" href="#launch"><div><h3>Before you share it: run the launch check.</h3><p>19 security checks and 17 legal ones, in plain words, with a prompt that makes your AI do the checking.</p></div><span class="btn pri">Open the checklist ${I.arrow}</span></a>
      <div class="sec"><h2 class="h">Then keep this close.</h2><div class="grid">${["one-line-follow-ups", "everyday-life-prompts", "ai-privacy-settings"].map((s) => card(find(s))).join("")}</div></div>
      <div class="endcta"><h3>Want one of these every Monday?</h3>${signup("st-email")}</div></div>`;
  }

  let lib = { type: "all", tool: "all", sort: "rec", q: "", shown: 12 };
  function vGuides(preset) {
    if (preset) lib = { ...lib, type: preset, shown: 12 };
    const st = ["claude-from-zero", "build-website-no-code", "everyday-life-prompts"].map(find);
    const tints = ["t-p", "t-t", "t-c"];
    return `<div class="wrap pg"><div class="phead"><h1>Every free guide, prompt and project.</h1><p class="lead">${ALL.length} resources, all free. Filter by what you want to do or the AI you use.</p></div>
      <h2 class="mono small" style="margin-bottom:14px;font-weight:500">NEW HERE? START WITH THESE THREE</h2>
      <div class="starters">${st.map((a, i) => `<a class="scard ${tints[i]}" href="#read-${a.slug}"><span class="pill tool" style="align-self:flex-start;border-color:currentColor;color:inherit">${TYPE[a.type][0]}</span><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p><div class="meta"><span>${a.mins} MIN</span><span>${I.arrow.replace("<svg", '<svg width="16" height="16"')}</span></div><span class="big" aria-hidden="true" data-n="0${i + 1}"></span></a>`).join("")}</div>
      <div class="filters"><div class="frow"><label class="search">${I.search}<span class="sr">Search guides</span><input id="lq" type="search" placeholder="Search guides, prompts, projects" value="${esc(lib.q)}" autocomplete="off"></label>
        <label class="sr" for="ltool">AI tool</label><select class="sel" id="ltool">${TOOLS.map((t) => `<option value="${t.id}" ${t.id === lib.tool ? "selected" : ""}>${t.label}</option>`).join("")}</select>
        <label class="sr" for="lsort">Sort</label><select class="sel" id="lsort"><option value="rec">Recommended</option><option value="quick">Quickest first</option><option value="az">A to Z</option></select></div>
        <div class="frow"><div class="chips" role="group" aria-label="Filter by type">${TYPES.map((t) => `<button class="fchip" type="button" data-t="${t.id}" aria-pressed="${t.id === lib.type}">${t.label}</button>`).join("")}</div><span class="count" id="lcount" style="margin-left:auto"></span></div></div>
      <div class="grid" id="lgrid"></div><div class="more" id="lmore"></div></div>`;
  }
  function bindGuides() {
    const grid = $("#lgrid"), more = $("#lmore"), cnt = $("#lcount");
    $("#lsort").value = lib.sort;
    const draw = () => {
      const q = lib.q.toLowerCase().trim();
      let list = ALL.filter((a) => (lib.type === "all" || a.type === lib.type) && (lib.tool === "all" || a.tools.includes(lib.tool) || (lib.tool !== "multi" && a.tools.includes("multi"))) && (!q || (a.title + " " + a.excerpt + " " + a.type).toLowerCase().includes(q)));
      list.sort(lib.sort === "quick" ? (a, b) => a.mins - b.mins : lib.sort === "az" ? (a, b) => a.title.localeCompare(b.title) : (a, b) => (a.rank + (a.type === "project" ? 0.5 : 0)) - (b.rank + (b.type === "project" ? 0.5 : 0)));
      cnt.textContent = `SHOWING ${Math.min(lib.shown, list.length)} OF ${list.length}`;
      grid.innerHTML = list.length ? list.slice(0, lib.shown).map(card).join("") : `<div class="empty">Nothing matches that yet. Try a shorter word, or <a class="link" href="#partner">suggest a guide</a>.</div>`;
      more.innerHTML = list.length > lib.shown ? `<button class="btn" type="button" id="lm">Show more</button>` : "";
      const b = $("#lm"); if (b) b.addEventListener("click", () => { lib.shown += 12; draw(); });
    };
    $("#lq").addEventListener("input", (e) => { lib.q = e.target.value; lib.shown = 12; draw(); });
    $("#ltool").addEventListener("change", (e) => { lib.tool = e.target.value; draw(); });
    $("#lsort").addEventListener("change", (e) => { lib.sort = e.target.value; draw(); });
    $$(".fchip").forEach((b) => b.addEventListener("click", () => { lib.type = b.dataset.t; lib.shown = 12; $$(".fchip").forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
    draw();
  }

  function related(a) {
    const same = ALL.filter((x) => x.slug !== a.slug && (x.type === a.type || x.tools.some((t) => a.tools.includes(t))));
    return same.sort((x, y) => (x.type === a.type ? 0 : 1) - (y.type === a.type ? 0 : 1) || x.rank - y.rank).slice(0, 3);
  }
  function vRead(a) {
    const head = `<a class="back" href="#${a.type === "project" ? "projects" : "guides"}">${I.back} ${a.type === "project" ? "All projects" : "All guides"}</a>
      <div class="chipline">${typePill(a)}${toolPills(a)}</div><h1>${esc(a.title)}</h1><p class="exc">${esc(a.excerpt)}</p>
      <div class="meta-row"><span class="by"><span class="av">VK</span>Vish Kumbhar</span><span>${a.type === "project" ? a.mins + " min build" : a.mins + " min read"}</span><span>${a.level}</span><span class="sp"><button class="pbtn" type="button" id="share">Copy link</button></span></div>`;
    const tail = `<div class="endcta"><h3>Get one like this every Monday.</h3>${signup("rd-email")}</div><div class="keep"><h3>KEEP READING</h3><div class="grid">${related(a).map(card).join("")}</div></div>`;
    if (a.type === "project") {
      const done = getDone(a.slug);
      return `<div class="wrap pg"><div class="art"><div class="art-main">${head}
        <div class="youbuild"><b>WHAT YOU'LL BUILD</b><p>${esc(a.youbuild)}</p></div>${a.intro ? `<div class="prose intro-proj">${a.intro}</div>` : ""}
        <div class="pstats"><div><span>TIME</span><b>~${a.mins} min</b></div><div><span>LEVEL</span><b>${a.level}</b></div><div><span>COST</span><b>${esc(a.cost)}</b></div><div><span>STEPS</span><b>${a.steps.length}</b></div></div>
        <div class="need"><h2 style="font-size:1.1rem;font-weight:600">You need</h2><ul>${a.need.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></div>
        <ol class="steps">${a.steps.map((s, i) => `<li class="step ${done.includes(i) ? "done" : ""}" id="step-${i + 1}" data-i="${i}"><div class="step-h"><span class="step-n">${i + 1}</span><h2 style="margin:0;font-size:1.1rem">${esc(s.t)}</h2><button class="check" type="button" aria-pressed="${done.includes(i)}">${done.includes(i) ? "Done" : "Mark done"}</button></div><div class="step-b prose">${s.d}</div></li>`).join("")}</ol>
        <div class="win" id="win" ${done.length === a.steps.length ? "" : "hidden"}><h3>You built it.</h3><p>Before you share it, run the <a class="link" href="#launch">launch checklist</a>. Then tag me on LinkedIn. I'd love to see it.</p></div>
        <div class="prose" style="margin-top:24px">${a.after || ""}</div>${tail}</div>
        <aside class="toc" aria-label="Steps">${`<h4>STEPS</h4>` + a.steps.map((s, i) => `<a href="#step-${i + 1}" data-toc="step-${i + 1}">${i + 1}. ${esc(s.t)}</a>`).join("")}</aside></div></div>
        <div class="ring" id="ring" aria-live="polite"><svg viewBox="0 0 36 36" aria-hidden="true"><circle class="bgc" cx="18" cy="18" r="15"/><circle class="fg" cx="18" cy="18" r="15" stroke-dasharray="94.25" stroke-dashoffset="94.25"/></svg><span id="ring-t"></span></div>`;
    }
    return `<div class="wrap pg"><div class="art"><div class="art-main">${head}<details class="toc-m"><summary>On this page</summary><nav id="tocm"></nav></details><div class="prose" id="prose">${a.body}</div>${tail}</div><aside class="toc" id="toc" aria-label="On this page"></aside></div></div>`;
  }
  const getDone = (s) => { try { return JSON.parse(store.get("bwv-steps-" + s) || "[]"); } catch (e) { return []; } };
  function bindRead(a) {
    const sh = $("#share"); if (sh) sh.addEventListener("click", (e) => copy(location.href, e.currentTarget));
    if (a.type === "project") {
      let done = getDone(a.slug);
      const ring = () => { const k = done.length / a.steps.length; $("#ring .fg").style.strokeDashoffset = 94.25 * (1 - k); $("#ring-t").textContent = `${done.length} of ${a.steps.length} steps`; $("#win").hidden = done.length !== a.steps.length; };
      $$(".step").forEach((li) => $(".check", li).addEventListener("click", (e) => {
        const i = +li.dataset.i, on = !done.includes(i); done = on ? [...done, i] : done.filter((x) => x !== i); store.set("bwv-steps-" + a.slug, JSON.stringify(done));
        li.classList.toggle("done", on); e.currentTarget.setAttribute("aria-pressed", on); e.currentTarget.textContent = on ? "Done" : "Mark done"; ring();
        if (on) XP.add("step-" + a.slug + "-" + i, 5);
        if (on && done.length === a.steps.length) { confetti(); toast("Project complete"); Sound.chime(); }
      }));
      ring(); spy($$(".toc a"));
      return;
    }
    const hs = $$("#prose h2"); hs.forEach((h, i) => (h.id = "s-" + (i + 1)));
    const links = hs.map((h, i) => `<a href="#s-${i + 1}" data-toc="s-${i + 1}">${esc(h.textContent)}</a>`).join("");
    if (hs.length) { $("#toc").innerHTML = `<h4>ON THIS PAGE (${hs.length})</h4>` + links; $("#tocm").innerHTML = links; } else { $("#toc").remove(); $(".toc-m").remove(); }
    spy($$("#toc a"));
    // reading to the end earns XP
    const end = $("#prose"); if (end) { const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { XP.add("read-" + a.slug, 10, [innerWidth / 2, innerHeight * 0.7]); io.disconnect(); } }), { rootMargin: "0px 0px -10% 0px" }); const s = document.createElement("i"); s.className = "endmark"; end.appendChild(s); io.observe(s); cleanups.push(() => io.disconnect()); }
  }
  function spy(links) {
    if (!links.length) return;
    links.concat($$("#tocm a")).forEach((l) => l.addEventListener("click", (e) => { e.preventDefault(); const t = document.getElementById(l.dataset.toc || l.getAttribute("href").slice(1)); if (t) goTo(t); const d = l.closest("details"); if (d) d.open = false; }));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) links.forEach((l) => l.classList.toggle("on", l.dataset.toc === en.target.id)); }), { rootMargin: "-20% 0px -70% 0px" });
    links.forEach((l) => { const t = document.getElementById(l.dataset.toc); if (t) io.observe(t); });
    cleanups.push(() => io.disconnect());
  }
  function confetti() {
    if (RM) return; const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    const x = c.getContext("2d"), W = (c.width = innerWidth), H = (c.height = innerHeight), cols = ["#7F77DD", "#2FB57E", "#F08A5D", "#FFC24D", "#5B52C9"];
    const ps = Array.from({ length: 140 }, () => ({ x: W / 2, y: H * 0.6, vx: (Math.random() - 0.5) * 14, vy: -8 - Math.random() * 10, r: Math.random() * 6.28, s: 4 + Math.random() * 6, c: cols[(Math.random() * 5) | 0] }));
    const st = performance.now(); (function f(n) { x.clearRect(0, 0, W, H); ps.forEach((p) => { p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += 0.1; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); }); if (n - st < 2200) requestAnimationFrame(f); else c.remove(); })(st);
  }

  function vProjects() {
    const ps = PROJECTS.slice().sort((a, b) => a.rank - b.rank);
    return `<div class="wrap pg"><div class="phead"><h1>Build it yourself. Step by step.</h1><p class="lead">Each project ends with something real: a live website, a working form, an assistant that knows you. Tick off steps as you go. Your progress stays in your browser.</p></div>
      <div class="rules" style="margin-bottom:36px"><div><b>No code</b><p>If a step needs code, AI writes it and I show you where it goes.</p></div><div><b>Free to start</b><p>Every project works on free plans unless it says otherwise.</p></div><div><b>Checkable steps</b><p>Mark each step done. Come back any time.</p></div><div><b>Real result</b><p>You finish with something you can share.</p></div></div>
      <div class="grid">${ps.map(card).join("")}</div></div>`;
  }
  function vCarousels() {
    return `<div class="wrap pg"><div class="phead"><h1>Swipe, save, steal the structure.</h1><p class="lead">Short visual guides, one idea per slide. Tap any cover to read it. Want to make your own? <a class="link" href="#read-linkedin-carousel-with-ai">Here's the exact process</a>.</p></div>
      <div class="cgrid">${CAROUSELS.map((cv) => `<button class="cthumb" type="button" data-open="${cv.slug}">${slideHTML(cv, cv.slides[0], 0, cv.slides.length)}<b>${esc(cv.title)}</b><span>${cv.slides.length} SLIDES</span></button>`).join("")}</div></div>`;
  }
  function vNewsletter() {
    return `<div class="wrap pg"><div class="two" style="padding-block:clamp(40px,7vw,96px) 0;align-items:end"><div class="phead" style="padding:0"><h1>Build Notes.</h1><p class="lead">One useful email every Monday. Five minutes to read, something you can try the same day.</p></div>${signup("nl-email")}</div>
      <div class="rules" style="margin-block:48px"><div><b>One guide</b><p>A step-by-step walkthrough you can finish that week.</p></div><div><b>One prompt</b><p>Copy-ready, tested on real work.</p></div><div><b>One thing to try</b><p>Small enough to do before lunch.</p></div><div><b>Zero hype</b><p>No "this changes everything". Just what works.</p></div></div>
      <h2 class="h" style="font-family:var(--f-display);font-weight:600;font-size:var(--s2);letter-spacing:-.04em;margin-bottom:18px">Read past issues online</h2>
      <div class="issues light">${ISSUES.map(issueCard).join("")}</div></div>`;
  }
  function vIssue(i) {
    return `<div class="wrap pg"><div class="art"><div class="art-main"><a class="back" href="#newsletter">${I.back} All issues</a><div class="chipline"><span class="pill t-p">Build Notes #${i.n}</span></div><h1>${esc(i.title)}</h1><p class="exc">${esc(i.teaser)}</p>
      <div class="meta-row"><span class="by"><span class="av">VK</span>Vish Kumbhar</span><span>Inside: ${i.items.length} things</span></div>
      <div class="prose">${i.body}</div><div class="endcta"><h3>Get the next issue in your inbox.</h3>${signup("is-email")}</div></div><aside class="toc"><h4>INSIDE THIS ISSUE</h4>${i.items.map((x) => `<a>${esc(x)}</a>`).join("")}</aside></div></div>`;
  }
  function vTools() {
    return `<div class="wrap pg light"><div class="phead"><h1>Which AI tools do you actually need?</h1><p class="lead">Four questions. A short stack with a reason for each, and the guide to start with. No email needed.</p></div>
      <div class="quiz" style="margin-bottom:64px"><div class="qcard" id="quiz" aria-live="polite"></div><div style="display:grid;gap:14px;align-content:start"><h2 style="font-size:1.2rem;font-weight:600">How I choose tools</h2><p class="lead">One main assistant you learn properly, plus one or two tools that live where your work already happens. Everything else is optional.</p><p><a class="link" href="#read-pick-your-ai-by-job">Read the full comparison</a></p></div></div>
      <h2 class="h" style="font-family:var(--f-display);font-weight:600;font-size:var(--s2);letter-spacing:-.04em;margin-bottom:18px">What I use every day</h2>
      <div class="daily">${DAILY.map((d) => { const s = STACK[d.k]; return `<a href="${s.url}" target="_blank" rel="noopener"><span class="lm">${s.name[0]}</span><div><b>${s.name}</b><p>${esc(d.use)}</p></div>${I.out.replace("<svg", '<svg width="14" height="14"')}</a>`; }).join("")}</div></div>`;
  }
  function vPartner() {
    return `<div class="wrap pg"><div class="phead"><h1>Help people build with your tool.</h1><p class="lead">I write step-by-step guides and carousels that people actually finish. If you make a tool I'd use, let's show people how.</p></div>
      <div class="pk">
        <div class="pkg"><span class="pill t-t">Most useful</span><h3>Sponsored build guide</h3><p>A full step-by-step project built with your tool, published in the library and linked from Build Notes.</p></div>
        <div class="pkg"><span class="pill t-p">Newsletter</span><h3>Build Notes feature</h3><p>Your tool as the "one thing to try" in an issue, with a real use case, not a press release.</p></div>
        <div class="pkg"><span class="pill t-c">Social</span><h3>Carousel series</h3><p>A short series of swipeable how-to carousels for LinkedIn, in the house style.</p></div>
        <div class="pkg"><span class="pill tool">Teams</span><h3>Workshop</h3><p>A hands-on session for your team or community: prompting, no-code workflows, building with AI.</p></div>
      </div>
      <div class="sec"><h2 class="h">How I work</h2><div class="rules"><div><b>Used, not just tested</b><p>I only feature tools I've used on real work for at least two weeks.</p></div><div><b>Always labelled</b><p>Every partnership is clearly marked, in line with EU ad rules.</p></div><div><b>Honest steps</b><p>If something is hard or costs money, the guide says so.</p></div><div><b>You see it first</b><p>You can check facts before it goes live. I keep the final edit.</p></div></div></div>
      <div class="two" style="padding-bottom:20px"><div style="display:grid;gap:16px;align-content:start"><h2 class="h" style="margin:0">Why work with me</h2><p class="lead">Before I built with AI, I spent five years on the brand side of 850+ creator deals. Clear briefs, honest reporting and deadlines that hold are second nature.</p><p class="lead">Build with Vish launched in October 2026. Early partners help shape the formats and get founding rates.</p><div class="copyline"><code>${EMAIL}</code><button class="pbtn" type="button" data-copy="${EMAIL}">Copy email</button></div></div>
        <form class="form" data-form="partner" novalidate>
          <label for="pa-n">Name<input id="pa-n" name="name" autocomplete="name" required></label><label for="pa-e">Email<input id="pa-e" name="email" type="email" autocomplete="email" required></label>
          <label for="pa-c">Company or tool<input id="pa-c" name="company" autocomplete="organization"></label>
          <label for="pa-t">Interested in<select id="pa-t" name="topic"><option>Sponsored build guide</option><option>Build Notes feature</option><option>Carousel series</option><option>Workshop</option><option>Something else</option></select></label>
          <label class="full" for="pa-m">Message<textarea id="pa-m" name="message" rows="5" required placeholder="What does your tool do, and who is it for?"></textarea></label>
          <div class="full" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><button class="btn pri" type="submit">Send</button><p class="msg" aria-live="polite"></p></div></form></div></div>`;
  }
  function vAbout() {
    return `<div class="wrap pg"><div class="phead"><h1>Hi, I'm Vish.</h1><p class="lead">I build things with AI and write down exactly how, so you can too. I'm not an engineer. That's the point.</p></div>
      <div class="two"><div class="story">
        <div><b>MUMBAI</b><h3>Five years in creator marketing</h3><p>Agency life: briefs, contracts, reports and 850+ creator deals. I learned what makes instructions easy to follow, because creators skip anything that isn't.</p></div>
        <div><b>2025</b><h3>Moved to Germany</h3><p>An MBA in Offenburg and a new market with new rules. Lots of learning from zero, again.</p></div>
        <div><b>THE SWITCH</b><h3>Started building with AI</h3><p>Tired of doing the same work by hand, I started building tools with Claude: a website, assistants, automations. No coding background.</p></div>
        <div><b>NOW</b><h3>Build with Vish</h3><p>Every guide here is something I built or use myself, written the way I'd explain it to a friend.</p></div>
      </div><div style="display:grid;gap:18px;align-content:start"><figure class="about-photo tilt"><img src="${PHOTO}" alt="Vishwajeet Kumbhar, smiling, in a cream jacket" width="880" height="1100" decoding="async"></figure><div class="hi" style="background:var(--surface);border-color:var(--line)"><div><h3 style="color:var(--ink)">The short version</h3><p style="color:var(--muted)">Creator marketer turned AI builder. Based in Germany. Writes plain steps for people who don't code.</p></div></div>
        <p class="lead">Looking for my CV and work history? That lives on my <a class="link" href="${PORTFOLIO}">portfolio</a>.</p>
        ${connectHTML()}</div></div>
      <div class="sec"><div class="endcta" style="margin:0"><h3>Follow along every Monday.</h3>${signup("ab-email")}</div></div></div>`;
  }
  /* ---------- before you launch: interactive security + legal checklists ---------- */
  let launchTab = "security";
  const lcDone = () => { try { return JSON.parse(store.get("bwv-launch") || "[]"); } catch (e) { return []; } };
  const CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';
  function lcPrompt(k, it) {
    return k === "security"
      ? `Act as a careful security reviewer for this project. Check one thing: "${it.t}". ${it.how} Explain what you find in plain English, then fix it safely and tell me exactly what you changed.`
      : `Review my website or app for one thing: "${it.t}". ${it.how} Tell me plainly what is missing, draft the exact wording or change I need, and flag anything a lawyer should look at.`;
  }
  function lcAudit(k) {
    const L = LAUNCH[k];
    return (k === "security"
      ? "Act as a careful security reviewer for this project. Go through this checklist one item at a time. For each: say PASS, FAIL or NOT SURE, explain why in one plain sentence, and for every FAIL propose the safest fix. Do not change code until I approve the plan.\n\n"
      : "Review my website or app against this legal checklist (I am in the EU). For each item: say OK, MISSING or NOT SURE, explain why in one plain sentence, and draft the wording or change I need. Flag anything a lawyer should check.\n\n")
      + L.items.map((it, i) => `${i + 1}. ${it.t}. ${it.how}`).join("\n");
  }
  function vLaunch() {
    const tot = LAUNCH.security.items.length + LAUNCH.legal.items.length;
    return `<div class="wrap pg launch"><div class="phead"><h1>Before you launch.</h1><p class="lead">Two checklists for anything you built with AI: ${LAUNCH.security.items.length} security checks and ${LAUNCH.legal.items.length} legal ones. Tick them off as you go. Your progress stays in this browser.</p></div>
      <div class="lc-bar"><div class="seg" role="tablist" aria-label="Checklist">${["security", "legal"].map((k) => `<button role="tab" type="button" data-k="${k}" aria-selected="${k === launchTab}">${LAUNCH[k].label}<span class="seg-n" data-n="${k}"></span></button>`).join("")}<i class="seg-pill" aria-hidden="true"></i></div>
        <div class="lc-prog" aria-live="polite"><svg viewBox="0 0 36 36" class="lc-ring" aria-hidden="true"><circle cx="18" cy="18" r="15.5" class="bg"/><circle cx="18" cy="18" r="15.5" class="fg" id="lc-fg"/></svg><div><b id="lc-count">0 / ${tot}</b><span>checks done</span></div></div>
        <button class="btn sm" type="button" id="lc-copy">Copy the full audit prompt</button></div>
      <p class="lc-intro" id="lc-intro"></p>
      <ol class="lc-list" id="lc-list"></ol>
      <p class="small lc-note">Not legal advice. If real money or personal data is involved, have a lawyer check your terms and privacy policy.</p></div>`;
  }
  function bindLaunch() {
    let done = lcDone();
    const tot = LAUNCH.security.items.length + LAUNCH.legal.items.length, C = 97.4;
    const paint = () => {
      const n = done.length; $("#lc-count").textContent = `${n} / ${tot}`; $("#lc-fg").style.strokeDashoffset = C * (1 - n / tot);
      ["security", "legal"].forEach((k) => { const it = LAUNCH[k].items, d = it.filter((x) => done.includes(x.id)).length; $(`[data-n="${k}"]`).textContent = `${d}/${it.length}`; });
    };
    const draw = () => {
      const L = LAUNCH[launchTab]; $("#lc-intro").textContent = L.intro;
      $$(".seg button").forEach((b) => b.setAttribute("aria-selected", b.dataset.k === launchTab));
      $(".seg").dataset.k = launchTab;
      $("#lc-list").innerHTML = L.items.map((it, i) => `<li class="lc-item${done.includes(it.id) ? " done" : ""}" data-id="${it.id}" style="--i:${i}">
        <button class="lc-check" type="button" aria-pressed="${done.includes(it.id)}" aria-label="Mark done: ${esc(it.t)}">${CHECK}</button>
        <details><summary><span class="lc-n">${String(i + 1).padStart(2, "0")}</span><span class="lc-t">${esc(it.t)}</span><span class="lc-chev" aria-hidden="true"></span></summary>
        <div class="lc-body"><p><b>Why it matters.</b> ${esc(it.why)}</p><p><b>How to check.</b> ${esc(it.how)}</p><button class="pbtn" type="button" data-p="${it.id}">Copy a prompt for your AI</button></div></details></li>`).join("");
      $$(".lc-check").forEach((b) => b.addEventListener("click", () => {
        const li = b.closest(".lc-item"), id = li.dataset.id, on = !done.includes(id);
        done = on ? [...done, id] : done.filter((x) => x !== id); store.set("bwv-launch", JSON.stringify(done));
        li.classList.toggle("done", on); b.setAttribute("aria-pressed", on); paint();
        const L2 = LAUNCH[launchTab].items; if (on && L2.every((x) => done.includes(x.id))) { const r = b.getBoundingClientRect(); XP.add("launch-" + launchTab, 40, [r.left, r.top]); confetti(); toast(LAUNCH[launchTab].label + " checklist complete"); Sound.chime(); }
      }));
      $$("[data-p]").forEach((b) => b.addEventListener("click", () => { const it = L.items.find((x) => x.id === b.dataset.p); copy(lcPrompt(launchTab, it), b); }));
      paint();
    };
    $$(".seg button").forEach((b) => b.addEventListener("click", () => { if (launchTab === b.dataset.k) return; launchTab = b.dataset.k; draw(); }));
    $("#lc-copy").addEventListener("click", (e) => copy(lcAudit(launchTab), e.currentTarget));
    draw();
  }

  /* ---------- portfolio ---------- */
  function vPortfolio() {
    const F = FOLIO;
    const bcard = ([n, st, d, slug, tech], i) => { const a = find(slug); return `<a class="bcard rv" style="--d:${(i % 3) * 80}ms" href="${a ? "#read-" + slug : GITHUB}"${a ? "" : ' target="_blank" rel="noopener"'}><span class="bst ${st === "Built" ? "" : "live"}">${st === "Built" ? "" : "<i></i>"}${esc(st)}</span><h3>${esc(n)}</h3><p>${esc(d)}</p><span class="btech">${esc(tech)}</span><span class="bgo2">${a ? "How it works" : "GitHub"} ${I.arrow}</span></a>`; };
    return `<div class="pf">
      <section class="pf-hero"><div class="wrap pf-hero-grid"><div class="pf-hero-text">
        <div class="pf-top rv"><span class="pf-avail"><i></i>Open to roles · ${esc(F.status.split(".")[1].trim())}</span></div>
        <h1 class="pf-name" aria-label="Vishwajeet Kumbhar"><span class="pf-l1" aria-hidden="true">${splitChars("Vishwajeet")}</span><span class="pf-l2" aria-hidden="true">${splitChars("Kumbhar")}</span></h1>
        <div class="pf-sub"><p class="pf-head rv">${esc(F.headline)}</p><p class="lead rv" style="--d:120ms">${esc(F.intro)}</p>
        <div class="ctas rv" style="--d:220ms"><a class="btn pri" href="${F.cv}" target="_blank" rel="noopener">Download CV ${I.out}</a><a class="btn" href="${GMAIL}" target="_blank" rel="noopener">Email me</a><a class="btn" href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ${I.out}</a></div></div>
      </div><figure class="pf-photo tilt" id="pf-photo"><img src="${PHOTO}" alt="Vishwajeet Kumbhar" width="880" height="1100" decoding="async"><canvas aria-hidden="true"></canvas><figcaption>Offenburg, Germany</figcaption></figure></div></section>
      <section class="pf-deals"><div class="wrap">
        <div class="deals rv" id="deals"><canvas id="deal-gl"></canvas><div class="dlabs" id="dlabs" aria-hidden="true"></div>
          <div class="deals-cap"><h2>Nine brands.<br>One way of working.</h2><p class="small">Every dot is one creator deal, grouped around the brands I worked with. Drag to spin, hover a brand. Cluster sizes are illustrative.</p></div>
          <span class="deals-hint" aria-hidden="true">DRAG TO SPIN</span></div>
        <ul class="pf-stats">${F.stats.map(([n, sfx, l], i) => `<li class="rv" style="--d:${i * 70}ms"><b data-count="${n}" data-suf="${sfx}">0${sfx}</b><span>${esc(l)}</span></li>`).join("")}</ul>
      </div></section>
      <section class="statement"><div class="wrap"><p class="big-reveal" data-reveal>Five years of creator deals, client teams and campaign reports. Now I build the AI tools that make that work faster, and write down how.</p></div></section>
      <section><div class="wrap"><div class="sh"><div><h2>Five disciplines, one person.</h2></div></div>
        <div class="pf-disc">${F.disciplines.map(([t, d], i) => `<div class="pf-d rv" style="--d:${i * 70}ms"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div></div></section>
      <section><div class="wrap"><div class="sh"><div><h2>Seven years, most recent first.</h2></div><a class="btn" href="${F.cv}" target="_blank" rel="noopener">Full CV ${I.out}</a></div>
        <ol class="tl" id="tl"><span class="tl-line" aria-hidden="true"><i></i></span>${F.exp.map((e) => `<li class="tl-i"><span class="tl-dot" aria-hidden="true"></span><span class="tl-when mono">${esc(e.when)}</span><div class="tl-c"><h3>${esc(e.role)}</h3><p class="tl-org">${esc(e.org)}</p><ul>${e.pts.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></li>`).join("")}</ol></div></section>
      <section class="pf-brands" aria-label="Brands I worked with"><div class="marquee"><div class="mq">${[0, 1].map((k) => `<div class="mq-row"${k ? ' aria-hidden="true"' : ""}>${F.brands.map((b) => `<span>${esc(b)}</span><i>✦</i>`).join("")}</div>`).join("")}</div></div></section>
      <section><div class="wrap"><div class="sh"><div><h2>How I run a creator program.</h2><p class="lead">Five stages, the same every time, so nothing gets missed.</p></div></div>
        <div class="pb">${F.playbook.map(([t, d], i) => `<div class="pb-s rv" style="--d:${i * 90}ms"><span class="pb-n">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div></div></section>
      <section><div class="wrap"><div class="sh"><div><h2>${F.built.length} tools, built for real marketing work.</h2><p class="lead">Each one solves a problem I had in agency life. Tap one to read how it works.</p></div><a class="btn" href="${GITHUB}" target="_blank" rel="noopener">GitHub ${I.out}</a></div>
        <div class="pf-built">${F.built.map(bcard).join("")}</div>
        <div class="thesis rv"><p>“${esc(F.thesis)}”</p><span class="small">Master's thesis · Hochschule Offenburg · 2026 to 2027, in progress</span></div></div></section>
      <section><div class="wrap pf-three">
        <div class="rv"><h3 class="pf-colh">Education</h3><ul class="pf-list">${F.edu.map(([a, b, c]) => `<li><h3>${esc(a)}</h3><p>${esc(b)}</p><span class="mono small">${esc(c)}</span></li>`).join("")}</ul></div>
        <div class="rv" style="--d:100ms"><h3 class="pf-colh">Languages</h3><ul class="pf-langs">${F.langs.map(([a, b, n]) => `<li><div><b>${esc(a)}</b><span>${esc(b)}</span></div><span class="lbar"><i style="--w:${n}%"></i></span></li>`).join("")}</ul></div>
        <div class="rv" style="--d:200ms"><h3 class="pf-colh">Volunteering</h3><ul class="pf-list">${F.vol.map(([a, b, c]) => `<li><h3>${esc(a)}</h3><span class="mono small">${esc(b)}</span><p>${esc(c)}</p></li>`).join("")}</ul></div>
      </div></section>
      <section><div class="wrap"><div class="bigcta pf-cta"><div style="display:grid;gap:18px"><h2>Let's work together.</h2><p class="lead">${esc(F.status)}</p><div class="chips pf-roles">${F.open.map((r) => `<span class="pill tool">${esc(r)}</span>`).join("")}</div></div>
        <div class="pf-acts"><a class="btn pri" href="${GMAIL}" target="_blank" rel="noopener">Write in Gmail ${I.out}</a><button class="btn" type="button" data-copy="${EMAIL}">Copy email</button><a class="btn" href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ${I.out}</a><a class="btn" href="${F.cv}" target="_blank" rel="noopener">CV (PDF) ${I.out}</a><a class="link small" href="${F.site}" target="_blank" rel="noopener">Classic portfolio site ↗</a></div></div></div></section>
    </div>`;
  }
  function bindPortfolio() {
    XP.add("portfolio", 15, [innerWidth / 2, innerHeight * 0.3]);
    // fade-up reveals
    // checked on scroll (not only IntersectionObserver) so a fast flick can never skip a block and leave it hidden
    const rvs = $$(".pf .rv"); const rvCheck = () => { const lim = innerHeight * 0.92; for (let i = rvs.length - 1; i >= 0; i--) if (rvs[i].getBoundingClientRect().top < lim) { rvs[i].classList.add("in"); rvs.splice(i, 1); } if (!rvs.length) removeEventListener("scroll", rvCheck); };
    addEventListener("scroll", rvCheck, { passive: true }); rvCheck(); setTimeout(rvCheck, 300); cleanups.push(() => removeEventListener("scroll", rvCheck));
    requestAnimationFrame(() => $(".pf-name").classList.add("in"));
    const fig = $("#pf-photo"), pfx = window.PhotoFX && window.PhotoFX.mount(fig);
    if (pfx) { fig.classList.add("gl"); const po = new IntersectionObserver((es) => es.forEach((en) => (en.isIntersecting ? pfx.start() : pfx.stop()))); po.observe(fig); cleanups.push(() => { po.disconnect(); pfx.dispose(); }); }
    const settle = setTimeout(() => { const n = $(".pf-name"); if (n) n.classList.add("settled"); }, 2600); cleanups.push(() => clearTimeout(settle));
    // count-up stats
    const cio = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return; cio.unobserve(en.target); const el = en.target, n = +el.dataset.count, sfx = el.dataset.suf, st = performance.now(), dur = RM ? 1 : 1600;
      (function t(now) { const k = clamp((now - st) / dur), v = Math.round(n * (1 - Math.pow(1 - k, 4))); el.textContent = v + sfx; if (k < 1) requestAnimationFrame(t); })(st);
    }), { threshold: 0.6 });
    $$("[data-count]").forEach((el) => cio.observe(el)); cleanups.push(() => cio.disconnect());
    // timeline line scrubs with scroll; items light up as the line reaches them
    const tl = $("#tl");
    if (window.gsap && window.ScrollTrigger && !RM) {
      gsap.fromTo(".tl-line i", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 65%", end: "bottom 65%", scrub: 0.4 } });
      $$(".tl-i", tl).forEach((li) => ScrollTrigger.create({ trigger: li, start: "top 66%", onEnter: () => { li.classList.add("on"); Sound.tick(); }, onLeaveBack: () => li.classList.remove("on") }));
    } else { $(".tl-line i").style.transform = "none"; $$(".tl-i", tl).forEach((li) => li.classList.add("on")); }
    // the 3D deal map, running only while visible
    const DS = window.DealScene, cv = $("#deal-gl");
    if (DS && DS.init(cv, $("#dlabs"), FOLIO.brands, effTheme() === "light")) {
      const vio = new IntersectionObserver((es) => es.forEach((en) => (en.isIntersecting ? DS.start() : DS.stop())));
      vio.observe(cv); cleanups.push(() => { vio.disconnect(); DS.stop(); });
    } else $("#deals").classList.add("nogl");
  }

  function vLegal() {
    const fonts = SELFHOST
      ? "<p><b>No third-party requests.</b> Fonts (Geist, under the SIL Open Font License) and code libraries are served from this site itself. Your browser does not contact Google, a CDN or any tracker when you visit.</p>"
      : "<p><b>Preview note.</b> This preview loads fonts from Google Fonts and code libraries from public CDNs. The live site serves everything from its own server.</p>";
    return `<div class="wrap pg"><div class="art"><div class="art-main"><h1>Imprint and privacy</h1><div class="prose">
      <h2>Imprint (Impressum)</h2><p>Responsible for this website under § 5 DDG:<br>Vishwajeet Kumbhar<br>Offenburg, Germany<br>Email: ${EMAIL}</p>
      <h2>Privacy</h2>
      <p><b>What I collect.</b> Only what you send me: your email address when you join Build Notes, and your name, email and message when you use the partner form. Nothing else is collected.</p>
      <p><b>Where it lives.</b> Form entries are stored by my hosting provider, Netlify, Inc. (hosting and form storage). Newsletter sign-ups are passed to MailerLite (UAB MailerLite, Vilnius, Lithuania, EU), which sends Build Notes. These are the only companies that process your data for this site. I don't sell or share it, and I don't use it to train AI.</p>
      <p><b>Emails.</b> After you sign up you get one email asking you to confirm. Nothing else is sent until you click it (double opt-in). Then you get a short welcome series and Build Notes every Monday. Every email has an unsubscribe link that works with one click.</p>
      <p><b>No tracking, no cookies.</b> No analytics, no advertising pixels and no cookies, so there is no cookie banner. A few settings you choose are kept only in your own browser's storage: light or dark mode, your builder level, which project steps and launch checks you ticked, and (for this visit only) that you've seen the welcome screen. You can clear them at any time in your browser settings.</p>
      ${fonts}
      <p><b>Your rights.</b> Under the GDPR you can ask for a copy of your data, a correction, or its deletion. Email me and I'll reply within 30 days. You can also complain to a data protection authority.</p>
      <h2>Licences and credits</h2><p>Fonts: Geist and Geist Mono (SIL Open Font License). Code: Three.js (MIT), GSAP (GreenSock standard no-charge licence), Lenis (MIT). The 3D scenes, sound and illustrations are generated in code for this site. The portrait is my own photo.</p>
      <h2>Content</h2><p>All guides, prompts, carousels, checklists and newsletter issues are my own work. Product names belong to their owners and are mentioned only to explain how to use them. Nothing here is legal or financial advice.</p></div></div></div></div>`;
  }

  /* ================= SMOOTH SCROLL + REVEALS ================= */
  let lenis = null;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  function setupSmooth() {
    if (RM || !window.Lenis) return;
    try { lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true }); } catch (e) { lenis = null; return; } document.documentElement.style.scrollBehavior = "auto";
    lenis.on("scroll", (e) => { if (window.ScrollTrigger) ScrollTrigger.update(); if (homeOn && glReady) window.Journey.velocity(e.velocity); Sound.scroll(e.velocity * 10); });
    (function tick(t) { lenis.raf(t); requestAnimationFrame(tick); })(performance.now());
  }
  function goTo(el) { if (!el) return; if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.4 }); else el.scrollIntoView({ behavior: RM ? "auto" : "smooth" }); }
  const lockScroll = (on) => { if (lenis) on ? lenis.stop() : lenis.start(); };
  function reveals(root) {
    $$("[data-reveal]", root).forEach((el) => {
      if (!el.dataset.split) { el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="rw">${esc(w)}</span>`).join(" "); el.dataset.split = "1"; }
      const ws = $$(".rw", el);
      if (RM || !window.gsap || !window.ScrollTrigger) { ws.forEach((w) => (w.style.opacity = 1)); return; }
      gsap.fromTo(ws, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.5 } });
    });
  }
  function killTriggers() { if (window.ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill()); }

  /* ================= HOME MOTION ================= */
  let glReady = false, homeOn = false, lastCh = -1;
  function homeInit() {
    const cv = $("#gl"), stage = $("#stage");
    if (!glReady) {
      glReady = !!(window.Journey && window.Journey.init(cv, effTheme() === "light"));
      if (!glReady && !$(".fallback", stage)) stage.insertAdjacentHTML("afterbegin", '<div class="fallback"></div>');
    }
    homeOn = true; stage.style.opacity = 1; stage.hidden = false; $("#hud").classList.remove("off");
    if (glReady) window.Journey.start();
    Sound.mute(false); lastCh = -1; onScroll();
    promptBuilder($("#play")); quiz($("#quiz")); bindDeck($("#after")); bindHold();
    const j = $("#journey");
    // drag the empty space to spin the chapter's 3D piece; a real drag never counts as a click
    let drag = null, dragMoved = 0;
    const dmove = (e) => { if (!drag || !glReady) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; dragMoved += Math.abs(dx) + Math.abs(dy); window.Journey.drag(dx / innerWidth, dy / innerHeight); if (dragMoved > 60) XP.add("spin", 5); };
    const dup = () => { drag = null; document.body.classList.remove("dragging"); };
    j.addEventListener("pointerdown", (e) => { if (e.button > 0 || e.target.closest("a,button,input,form,.panel")) return; drag = { x: e.clientX, y: e.clientY }; dragMoved = 0; if (e.pointerType === "mouse") document.body.classList.add("dragging"); });
    addEventListener("pointermove", dmove, { passive: true }); addEventListener("pointerup", dup); addEventListener("pointercancel", dup);
    cleanups.push(() => { removeEventListener("pointermove", dmove); removeEventListener("pointerup", dup); removeEventListener("pointercancel", dup); });
    j.addEventListener("click", (e) => { if (dragMoved > 8 || e.target.closest("a,button,input,form,.panel")) return; setPtr(e); Sound.thump(); if (!glReady) return; const pk = window.Journey.click(); if (pk && pk.kind === "carousel") openDeck(pk.data); else if (pk && pk.kind === "prompt") goTo(document.getElementById("home-play")); });
    magnet();
  }
  // Why Zero-style living type: the hero letters lean away from the cursor and spring back
  function magnet() {
    const h = $(".hero-title"); if (!h || !FINE || RM || h.dataset.mag) return; h.dataset.mag = "1";
    $$(".ht1, .ht2", h).forEach((s) => { s.innerHTML = s.textContent.split("").map((c) => `<span class="mc">${c === " " ? "&nbsp;" : esc(c)}</span>`).join(""); });
    const cs = $$(".mc", h).map((el) => ({ el, x: 0, y: 0, r: 0, vx: 0, vy: 0 }));
    let mx = -9999, my = -9999, raf = 0;
    const mv = (e) => { mx = e.clientX; my = e.clientY; };
    addEventListener("pointermove", mv, { passive: true });
    (function loop() {
      raf = requestAnimationFrame(loop);
      if (!homeOn || scrollY > innerHeight * 0.9) return;
      cs.forEach((c) => {
        const b = c.el.getBoundingClientRect(), cx = b.left + b.width / 2 - c.x, cy = b.top + b.height / 2 - c.y, dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy) || 1, R = 200;
        let tx = 0, ty = 0, tr = 0; if (d < R) { const f = Math.pow(1 - d / R, 2); tx = (dx / d) * f * 28; ty = (dy / d) * f * 22; tr = (dx / d) * f * 9; }
        c.vx = (c.vx + (tx - c.x) * 0.14) * 0.74; c.vy = (c.vy + (ty - c.y) * 0.14) * 0.74; c.x += c.vx; c.y += c.vy; c.r += (tr - c.r) * 0.16;
        c.el.style.transform = `translate(${c.x.toFixed(2)}px,${c.y.toFixed(2)}px) rotate(${c.r.toFixed(2)}deg)`;
      });
    })();
    cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); });
  }
  function bindHold() {
    const b = $("#hold"); if (!b) return; const ring = $(".hf", b), C = 182.2;
    let k = 0, held = false, raf = 0, last = 0, done = false, pressT = 0, k0 = 0;
    const fire = () => {
      done = true; held = false; raf = 0; last = 0; Sound.riser(0); b.classList.remove("held"); b.classList.add("done");
      if (glReady) window.Journey.burst(); Sound.bloom();
      const r = b.getBoundingClientRect(); XP.add("hold", 25, [r.left + r.width / 2, r.top]);
      setTimeout(() => goTo($$(".chapter")[1]), 380);
      setTimeout(() => { done = false; k = 0; ring.style.strokeDashoffset = C; b.style.setProperty("--k", 0); b.classList.remove("done"); if (glReady) window.Journey.charge(0); }, 2200);
    };
    const step = (n) => {
      const dt = Math.min(0.5, Math.max(0, (n - (last || n)) / 1000)); last = n;
      k = held ? clamp(k0 + (n - pressT) / 1250) : clamp(k - dt * 1.8); ring.style.strokeDashoffset = C * (1 - k); b.style.setProperty("--k", k);
      if (glReady) window.Journey.charge(k); Sound.riser(k);
      if (k >= 1) return fire();
      if (k > 0 || held) raf = requestAnimationFrame(step); else { raf = 0; last = 0; }
    };
    const press = () => { if (done) return; held = true; pressT = performance.now(); k0 = k; b.classList.add("held"); if (!raf) { last = pressT; raf = requestAnimationFrame(step); } };
    const rel = () => { if (held && !done && k0 + (performance.now() - pressT) / 1250 >= 1) { k = 1; cancelAnimationFrame(raf); raf = 0; fire(); return; } if (held) k = clamp(k0 + (performance.now() - pressT) / 1250); held = false; b.classList.remove("held"); };
    b.addEventListener("pointerdown", (e) => { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) {} press(); });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((ev) => b.addEventListener(ev, rel));
    b.addEventListener("keydown", (e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); press(); } });
    b.addEventListener("keyup", (e) => { if (e.key === " " || e.key === "Enter") rel(); });
    b.addEventListener("contextmenu", (e) => e.preventDefault());
    cleanups.push(() => { cancelAnimationFrame(raf); Sound.riser(0); });
  }
  function gate() {
    let seen = false; try { seen = sessionStorage.getItem("bwv-gate") === "1"; } catch (e) {}
    if (seen) return;
    const g = document.createElement("div"); g.className = "gate"; g.setAttribute("role", "dialog"); g.setAttribute("aria-modal", "true"); g.setAttribute("aria-label", "Welcome to Build with Vish");
    g.innerHTML = `<div class="gate-in">
      <span class="gate-k">FREE AI GUIDES · PROMPTS · PROJECTS</span>
      <h2 class="gate-w" aria-label="Build with Vish">${"Build with Vish".split("").map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("")}</h2>
      <p class="gate-s">A short journey through building with AI. Best with headphones.</p>
      <div class="gate-b"><button class="gbtn on" type="button" data-s="1"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>Enter with sound</button><button class="gbtn" type="button" data-s="0">Enter without sound</button></div>
      <span class="gate-f">You can switch sound on or off any time, bottom right.</span></div>`;
    const go = (snd) => { try { sessionStorage.setItem("bwv-gate", "1"); } catch (e) {} if (snd) setSound(true); g.classList.add("out"); lockScroll(false); if (glReady && window.Journey.pulse) window.Journey.pulse(); setTimeout(() => g.remove(), 1200); $("#main").focus({ preventScroll: true }); };
    $$(".gbtn", g).forEach((b) => b.addEventListener("click", () => go(b.dataset.s === "1")));
    document.body.appendChild(g); lockScroll(true); $(".gbtn", g).focus({ preventScroll: true });
    setTimeout(() => g.classList.add("ready"), 2200); // safety: never leave the wordmark hidden on very slow devices
  }
  function homeOff() { homeOn = false; if (glReady) window.Journey.stop(); $("#stage").hidden = true; $("#hud").classList.add("off"); Sound.mute(true); document.body.classList.remove("past"); }
  function setPtr(e) { if (homeOn && glReady) window.Journey.pointer((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1), true); }
  addEventListener("pointermove", setPtr, { passive: true }); addEventListener("pointerdown", setPtr, { passive: true });
  document.addEventListener("pointerleave", () => { if (homeOn && glReady) window.Journey.pointer(9, 9, false); });
  let lastY = 0, lastYv = 0;
  function onScroll() {
    const y = scrollY, nav = $("#nav");
    if (y > 240 && y > lastY + 4 && !$(".sheet")) nav.classList.add("hide"); else if (y < lastY - 4 || y < 240) nav.classList.remove("hide");
    lastY = y;
    const pr = $("#prog"); if (!pr.hidden) { const m = document.documentElement.scrollHeight - innerHeight; pr.style.width = (m > 0 ? (y / m) * 100 : 0) + "%"; }
    if (!homeOn) return;
    const j = $("#journey"); if (!j) return;
    const r = j.getBoundingClientRect(), chs = $$(".chapter", j), vc = innerHeight / 2;
    const cs = chs.map((el) => { const b = el.getBoundingClientRect(); return b.top + b.height / 2; });
    let f = 0; if (vc >= cs[cs.length - 1]) f = cs.length - 1; else if (vc > cs[0]) { for (let k = 0; k < cs.length - 1; k++) if (vc >= cs[k] && vc < cs[k + 1]) { f = k + (vc - cs[k]) / (cs[k + 1] - cs[k]); break; } }
    const p = f / (cs.length - 1);
    if (glReady) window.Journey.progress(p);
    const ch = Math.round(p * (CHAPTERS.length - 1));
    $("#ro-bar").style.height = p * 100 + "%";
    Sound.depth(clamp((p - 0.05) / 0.95));
    if (!lenis && glReady) { window.Journey.velocity(y - lastYv); Sound.scroll((y - lastYv) * 10); } lastYv = y;
    $("#hint").style.opacity = y > 40 ? 0 : 1;
    const past = r.bottom < innerHeight * 0.55; document.body.classList.toggle("past", past); $("#hud").classList.toggle("off", past);
    const fade = clamp(r.bottom / innerHeight); $("#stage").style.opacity = 0.15 + fade * 0.85;
    if (glReady) { if (fade <= 0.02) window.Journey.stop(); else window.Journey.start(); }
    if (ch !== lastCh) {
      lastCh = ch; const c = CHAPTERS[ch];
      $("#ro-n").textContent = c.n; scramble($("#ro-name"), c.name.toUpperCase());
      $$(".hud .rail button").forEach((b, i) => (i === ch ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
      $$(".chapter").forEach((el, i) => el.classList.toggle("on", i === ch));
      Sound.chapter(ch); if (ch > 0) XP.add("ch-" + ch, 5, null, true);
    }
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  function loader() {
    const l = document.createElement("div"); l.className = "loader"; l.setAttribute("aria-hidden", "true");
    l.innerHTML = `<div class="lw">${"Build with Vish".split("").map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div><div class="lb"><i id="lbi"></i></div><div class="lp" id="ln">0</div>`;
    document.body.appendChild(l);
    const st = performance.now(), dur = RM ? 200 : 1700; let finished = false;
    return new Promise((res) => {
      (function t(n) { const k = clamp((n - st) / dur), v = Math.round((1 - Math.pow(1 - k, 3)) * 100); $("#ln", l).textContent = v; $("#lbi", l).style.transform = `scaleX(${v / 100})`; if (k < 1) requestAnimationFrame(t); else if (!finished) { finished = true; res(); l.classList.add("done"); setTimeout(() => l.remove(), 1300); } })(st);
    });
  }

  /* ================= ROUTER ================= */
  const cleanups = [];
  let firstRoute = true, curKey = null;
  async function route() {
    const raw = (location.hash || "#home").slice(1) || "home";
    if (raw.startsWith("c-")) { if (curKey !== "carousels") { history.replaceState(null, "", "#carousels"); await render("carousels"); } openDeck(raw.slice(2)); return; }
    if ((raw === "home-play" || raw === "home-quiz" || raw === "home-connect") && curKey === "home") { goTo(document.getElementById(raw)); return; }
    if (/^s-\d+$|^step-\d+$/.test(raw)) return;
    if (raw.startsWith("read-")) loadBody(find(raw.slice(5))).catch(() => {});
    const doWipe = !firstRoute && !RM;
    if (doWipe) { const w = $("#wipe"); w.style.setProperty("--x", lastPt[0] + "px"); w.style.setProperty("--y", lastPt[1] + "px"); w.classList.remove("go"); void w.offsetWidth; w.classList.add("go"); Sound.whoosh(); setTimeout(() => w.classList.remove("go"), 1150); await new Promise((r) => setTimeout(r, 480)); }
    await render(raw);
  }
  async function render(raw) {
    cleanups.splice(0).forEach((f) => f()); killTriggers();
    let key = raw, html, after = null, isHome = false, prog = false, scrollTo = null;
    if (raw === "home" || raw === "home-play" || raw === "home-quiz" || raw === "home-connect") { key = "home"; isHome = true; html = vHome(); if (raw !== "home") scrollTo = raw; }
    else if (raw === "start") html = vStart();
    else if (raw === "guides" || raw.startsWith("guides-")) { key = "guides"; const t = raw.slice(7); html = vGuides(TYPES.some((x) => x.id === t) ? t : null); after = bindGuides; }
    else if (raw.startsWith("read-") && find(raw.slice(5))) {
      const a = find(raw.slice(5)); key = a.type === "project" ? "projects" : "guides";
      let ok = true; try { await loadBody(a); } catch (e) { ok = false; }
      if (ok) { html = vRead(a); after = () => bindRead(a); prog = true; document.title = a.title + " | Build with Vish"; }
      else { html = `<div class="wrap pg"><div class="phead"><h1>This guide didn't load.</h1><p class="lead">Probably a connection hiccup. Check you're online, then try again.</p><p style="margin-top:20px"><button class="btn pri" type="button" id="retry">Try again</button> <a class="btn" href="#guides">All guides</a></p></div></div>`; after = () => $("#retry").addEventListener("click", () => render(raw)); }
    }
    else if (raw.startsWith("issue-") && ISSUES.find((i) => i.slug === raw)) { key = "newsletter"; html = vIssue(ISSUES.find((i) => i.slug === raw)); prog = true; }
    else if (raw === "projects") html = vProjects();
    else if (raw === "carousels") { html = vCarousels(); after = () => $$("[data-open]").forEach((b) => b.addEventListener("click", () => openDeck(b.dataset.open))); }
    else if (raw === "newsletter") html = vNewsletter();
    else if (raw === "tools") { html = vTools(); after = () => quiz($("#quiz")); }
    else if (raw === "partner") html = vPartner();
    else if (raw === "about") html = vAbout();
    else if (raw === "portfolio") { html = vPortfolio(); after = bindPortfolio; }
    else if (raw === "launch") { html = vLaunch(); after = bindLaunch; }
    else if (raw === "legal") html = vLegal();
    else { key = "home"; isHome = true; html = vHome(); }
    if (!prog) document.title = isHome ? "Build with Vish" : (NAV.find((n) => n[0] === key) || [0, key === "start" ? "Start here" : key === "tools" ? "AI tool finder" : key === "partner" ? "Partner" : key === "launch" ? "Before you launch" : "Imprint"])[1] + " | Build with Vish";
    curKey = key;
    const main = $("#main");
    document.body.classList.toggle("cine", isHome);
    main.className = isHome ? "" : "page";
    main.innerHTML = html;
    $$(".links a").forEach((a) => (a.dataset.nav === key ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    $("#prog").hidden = !prog; $("#prog").style.width = 0;
    enhance(main);
    $$("[data-copy]", main).forEach((b) => b.addEventListener("click", () => copy(b.dataset.copy, b)));
    if (after) after();
    reveals(main);
    if (isHome) {
      if (firstRoute && !RM) { $("#stage").hidden = false; const ld = loader(); await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 30))); homeInit(); await ld; setTimeout(gate, 950); }
      else { homeInit(); if (firstRoute) gate(); }
    } else homeOff();
    if (!firstRoute && !raw.startsWith("home-")) { const m = $("#main"); if (m) m.focus({ preventScroll: true }); } // keyboard and screen-reader users land on the new page
    firstRoute = false;
    if (scrollTo) requestAnimationFrame(() => { const el = document.getElementById(scrollTo); if (!el) return; if (lenis) lenis.scrollTo(el, { immediate: true, offset: -20 }); else el.scrollIntoView({ behavior: "auto" }); });
    else scrollTo0();
    $("#nav").classList.remove("hide");
  }
  function scrollTo0() { if (lenis) { lenis.scrollTo(0, { immediate: true }); return; } const b = document.documentElement.style.scrollBehavior; document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, 0); document.documentElement.style.scrollBehavior = b; }
  addEventListener("hashchange", route);
  shell(); setupSmooth(); route();
})();
