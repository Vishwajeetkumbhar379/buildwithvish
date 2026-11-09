/* Build with Vish: interactive pieces.
   1. Real tool icons everywhere, and a home screen of the apps Vish works with (iPhone-style glass dock).
   2. The logo wall: calm grey until touched, then colour; tap to flip for the story.
   3. Services: a 3D swipe stack and an Apple-style compare table (prices are placeholders).
   4. "Built with AI": green code rain, a 3D ring of the eleven tools, a GitHub-style grid and the Creator Fit Scorer to try. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sfx = (k) => { if (window.bwvSfx) window.bwvSfx(k); };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ICON = window.BWV_ICONS || {}, MARK = window.BWV_BRANDMARKS || {};
  const page = () => document.body.dataset.page || 'home';

  /* ---------- 1. icons on the existing app tiles and the tools ticker ---------- */
  const realIcon = (i, n) => { if (ICON[n]) { i.innerHTML = ICON[n] + (/Code|Codex/.test(n) ? '<em aria-hidden="true">&gt;_</em>' : ''); i.classList.add('real'); i.style.background = ''; } };
  $$('.tapp').forEach((t) => { const n = (t.querySelector('span') || {}).textContent; const i = t.querySelector('i'); if (i && n) realIcon(i, n.trim()); });
  $$('[data-marq="tools"] b').forEach((b) => { const i = b.querySelector('i'); if (i) realIcon(i, b.textContent.trim()); });

  /* the home screen */
  const USE = {
    'Meta Business Suite': 'Scheduling and the inbox for brand pages.', 'Meta Ads Manager': 'Paid social, judged on CPA and ROAS.', 'Google Ads': 'Search and YouTube campaigns.',
    'LinkedIn Ads': 'B2B campaigns and lead forms.', 'Google Analytics': 'Site and campaign reporting.', 'HubSpot': 'CRM, pipelines and email.', 'Zoho': 'CRM for client accounts.',
    'Google Sheets': 'Trackers, budgets and creator lists.', 'Canva': 'Social posts, decks and carousels.', 'Figma': 'Mock-ups and page layouts.', 'WordPress': 'Websites and blogs.',
    'Microsoft Office': 'Documents for clients who live in Office.', 'Excel': 'Campaign maths and reports.', 'PowerPoint': 'Client decks and reviews.', 'Slack': 'Team chat across time zones.',
    'Google Workspace': 'Docs, Drive and Meet.', 'Claude': 'Writing, research and analysis.', 'Claude Code': 'Building my AI tools.', 'ChatGPT': 'Second opinions and images.', 'Codex': 'Code reviews and quick builds.'
  };
  const ios = $('#iosHome');
  if (ios) {
    const AI = ['Claude', 'Claude Code', 'ChatGPT', 'Codex'], APPS = Object.keys(USE).filter((n) => !AI.includes(n));
    const ic = (n) => `${ICON[n] || ''}${/Code|Codex/.test(n) ? '<em aria-hidden="true">&gt;_</em>' : ''}`;
    const app = (n) => `<button type="button" class="iph-app-i" data-app="${esc(n)}" aria-label="Open ${esc(n)}"><i>${ic(n)}</i><span>${esc(n.replace('Microsoft ', '').replace('Google ', 'G. ').replace('Meta Business Suite', 'Business Suite').replace('Meta Ads Manager', 'Ads Manager'))}</span></button>`;
    ios.querySelector('.iph-grid').innerHTML = APPS.map(app).join('');
    ios.querySelector('.iph-dock').innerHTML = AI.map(app).join('');
    const scr = ios.querySelector('.iph-scr'), view = ios.querySelector('.iph-app'), cap = $('.iph-cap');
    const close = () => { if (view.hidden || view.classList.contains('closing')) return; view.classList.add('closing'); sfx('click'); setTimeout(() => { view.hidden = true; view.classList.remove('closing'); }, 300); };
    ios.addEventListener('click', (e) => {
      if (e.target.closest('[data-iaclose]') || e.target.closest('.iph-home')) { close(); return; }
      const b = e.target.closest('.iph-app-i'); if (!b) return;
      const n = b.dataset.app, sr = scr.getBoundingClientRect(), br = b.querySelector('i').getBoundingClientRect();
      view.style.setProperty('--ox', ((br.left + br.width / 2 - sr.left) / sr.width * 100).toFixed(1) + '%');
      view.style.setProperty('--oy', ((br.top + br.height / 2 - sr.top) / sr.height * 100).toFixed(1) + '%');
      view.innerHTML = `<span class="ia-i">${ic(n)}</span><h3>${esc(n)}</h3><span class="ia-k">What I use it for</span><p>${esc(USE[n])}</p><button type="button" class="ia-x" data-iaclose>Close</button>`;
      view.hidden = false; view.classList.remove('closing'); view.style.animation = 'none'; void view.offsetWidth; view.style.animation = ''; sfx('pop');
      if (cap) cap.innerHTML = `<b>${esc(n)}</b> · ${esc(USE[n])}`;
    });
    // the phone leans toward the pointer or finger, and back
    const wrap = ios.parentElement;
    const lean = (e) => { const r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; ios.style.setProperty('--ry', (x * 18 - 4).toFixed(2) + 'deg'); ios.style.setProperty('--rx', (-y * 12 + 2).toFixed(2) + 'deg'); };
    if (!RM) { wrap.addEventListener('pointermove', lean, { passive: true }); wrap.addEventListener('pointerdown', lean, { passive: true }); wrap.addEventListener('pointerleave', () => { ios.style.removeProperty('--ry'); ios.style.removeProperty('--rx'); }); }
  }

  /* ---------- 2. brands, in big type: each lights up as it passes the middle of the screen; tap for the story ---------- */
  const WALL = [
    ['Philips', 'Health and consumer tech', '#0B5ED7'], ['L’Oréal', 'Beauty', '#B08A4A'], ['Universal Pictures', 'Film', '#1F3C88'],
    ['Bumble', 'Dating and friendship app', '#E0A800'], ['Vans', 'Footwear and streetwear', '#C8102E'], ['Unilever (HUL)', 'Consumer goods', '#1F36C7'],
    ['Lakmé', 'Beauty', '#C2185B'], ['Tata', 'Consumer brands', '#486AAE'], ['Raymond', 'Menswear', '#7A1F2B']
  ];
  const bl = $('#brandList');
  if (bl) {
    bl.innerHTML = WALL.map(([n, cat, col], k) => `<button type="button" class="bl-r" style="--bc:${col}" aria-expanded="false"><span class="bl-h"><span class="bl-i">${String(k + 1).padStart(2, '0')}</span><span class="bl-n">${esc(n)}<i class="bl-dot" aria-hidden="true"></i></span><span class="bl-c">${esc(cat)}</span><span class="bl-p" aria-hidden="true">+</span></span><span class="bl-x"><span><span class="bl-s"><span><b>What</b>Creator campaigns I worked on at an agency, as an employee.</span><span><b>Sector</b>${esc(cat)}</span></span></span></span></button>`).join('');
    const rows = $$('.bl-r', bl);
    bl.addEventListener('click', (e) => { const r = e.target.closest('.bl-r'); if (!r) return; const on = r.getAttribute('aria-expanded') !== 'true'; rows.forEach((x) => x.setAttribute('aria-expanded', String(x === r && on))); sfx(on ? 'pop' : 'click'); });
    let lit = null, raf = 0;
    const light = () => { raf = 0; if (!bl.closest('.page.on')) return; const mid = innerHeight * .5; let best = null, bd = 1e9; rows.forEach((r) => { const b = r.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) return; const d = Math.abs(b.top + Math.min(b.height, 120) / 2 - mid); if (d < bd) { bd = d; best = r; } }); if (bd > innerHeight * .3) best = null; if (best !== lit) { if (lit) lit.classList.remove('lit'); lit = best; if (lit) lit.classList.add('lit'); } };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(light); }, { passive: true });
    light();
  }

  /* ---------- 3a. services: the 3D swipe stack ---------- */
  const S6 = window.BWV_S6 || [], IT = window.BWV_SVCIT || [];
  const stack = $('#svcStack');
  if (stack && S6.length) {
    const TONES = ['t-mid', 't-plum', 't-bone', 't-forest', 't-champ', 't-ink'];
    const box = stack.querySelector('.swst-cards'), num = stack.querySelector('.swst-n');
    box.innerHTML = S6.map(([t, d, get, from], i) => `<article class="sw-c ${TONES[i % 6]}" data-i="${i}"><span class="sw-n">${String(i + 1).padStart(2, '0')} / 06</span><h3>${esc(t)}</h3><p class="sw-it">${esc(IT[i] || '')}</p><p class="sw-d">${esc(d)}</p><ul>${get.map((g) => `<li>${esc(g)}</li>`).join('')}</ul><span class="sw-f"><span>${esc(from)}</span><a href="#packages">See packages →</a></span></article>`).join('');
    const cards = $$('.sw-c', box); let top = 0, drag = null;
    const lay = (dx = 0) => cards.forEach((c, i) => {
      const d = (i - top + 6) % 6;
      if (d === 0) c.style.transform = `translate3d(${dx}px,0,0) rotate(${(dx * .045).toFixed(2)}deg) rotateY(${(dx * .03).toFixed(2)}deg)`;
      else c.style.transform = `translate3d(0,${d * 16}px,${-d * 60}px) scale(${1 - d * .05}) rotateX(${d * 2}deg)`;
      c.style.zIndex = String(10 - d); c.style.opacity = d > 3 ? '0' : '1'; c.classList.toggle('top', d === 0);
      c.setAttribute('aria-hidden', String(d !== 0));
    });
    const go = (dir) => {
      const c = cards[top]; c.classList.add('fling'); c.style.transform = `translate3d(${dir * 130}%,-4%,0) rotate(${dir * 14}deg)`; c.style.opacity = '0'; sfx('whoosh');
      setTimeout(() => { c.classList.remove('fling'); top = (top + (dir > 0 ? 1 : 5)) % 6; num.textContent = `${String(top + 1).padStart(2, '0')} / 06`; lay(); }, RM ? 0 : 280);
    };
    lay();
    box.addEventListener('pointerdown', (e) => { const c = e.target.closest('.sw-c.top'); if (!c || e.target.closest('a')) return; drag = { x: e.clientX, y: e.clientY, dx: 0 }; c.classList.add('drag'); c.setPointerCapture(e.pointerId); });
    box.addEventListener('pointermove', (e) => { if (!drag) return; drag.dx = e.clientX - drag.x; if (Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)) lay(drag.dx); });
    const up = () => { if (!drag) return; const dx = drag.dx; drag = null; cards[top].classList.remove('drag'); if (Math.abs(dx) > 80) go(dx < 0 ? 1 : -1); else lay(); };
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
    stack.addEventListener('click', (e) => { const b = e.target.closest('[data-sw]'); if (b) go(+b.dataset.sw); });
  }

  /* ---------- 3b. services: compare two or three packages ---------- */
  const PK = window.BWV_PK, cmp = $('#cmp');
  if (cmp && PK) {
    const ALL = Object.entries(PK).flatMap(([k, [svc, list]]) => list.map((p, j) => ({ id: k + j, svc, n: p[0], m: p[1], w: p[2], items: p[3], time: p[4] })));
    const opts = Object.entries(PK).map(([k, [svc, list]]) => `<optgroup label="${esc(svc)}">${list.map((p, j) => `<option value="${k}${j}">${esc(p[0])}</option>`).join('')}</optgroup>`).join('');
    let pick = ['ic0', 'ic1', 'ai0'];
    const tick = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    const draw = () => {
      cmp.innerHTML = pick.map((id, c) => { const p = ALL.find((x) => x.id === id) || ALL[0]; return `<div class="cmp-col" data-c="${c}">
        <label class="cmp-sel"><span class="sr">Package ${c + 1}</span><select data-c="${c}">${opts.replace(`value="${p.id}"`, `value="${p.id}" selected`)}</select></label>
        <p class="cmp-svc">${esc(p.svc)}</p><h3>${esc(p.n)}</h3><p class="cmp-w">${esc(p.w)}</p>
        <p class="cmp-pr">${esc(window.BWV_PRICEOF ? window.BWV_PRICEOF(p.id) : '')}</p><a class="btn btn-hard acc" href="#contact" data-topic="${esc(p.svc)}">Ask about this</a>
        <dl><dt>Type</dt><dd>${p.m ? 'Monthly' : 'One-time'}</dd><dt>Time</dt><dd>${esc(p.time)}</dd><dt>Included</dt><dd><ul>${p.items.map((x) => `<li>${tick}${esc(x)}</li>`).join('')}</ul></dd></dl></div>`; }).join('');
    };
    draw();
    cmp.addEventListener('change', (e) => { const s = e.target.closest('select'); if (!s) return; pick[+s.dataset.c] = s.value; draw(); sfx('tick'); });
  }

  /* ---------- 4. Built with AI ---------- */
  const GH = 'https://github.com/Vishwajeetkumbhar379';
  const TOOLS = [
    ['creator-fit-scorer', 'Creator Fit Scorer', 'Ranks creators against a brief with reasons for every score, then drafts the outreach.', 'Claude', 1],
    ['campaign-report-autopilot', 'Campaign Report Autopilot', 'Builds the client report every Monday with a scale, keep, test or cut call per creator.', 'Claude', 0],
    ['creator-contract-checker', 'Creator Contract Checker', 'Flags the clauses that cost money and drafts a polite negotiation email.', 'Claude', 0],
    ['client-health-score', 'Client Health Score', 'Scores every account on results, relationship, delivery and payments, then suggests next steps.', 'Claude', 1],
    ['ad-performance-copilot', 'Ad Performance Copilot', 'Finds wasted spend across Meta, Google and LinkedIn Ads and suggests a budget shift.', 'Claude', 1],
    ['marketing-attribution-lab', 'Marketing Attribution Lab', 'Six attribution models side by side, so creator and brand work get the credit they earn.', 'Any AI', 1],
    ['growth-experiment-lab', 'Growth Experiment Lab', 'Tells you if B really beat A, how long to run a test, and what to test next.', 'Any AI', 1],
    ['creator-brief-mcp', 'Creator Brief MCP', 'Plugs campaign maths, briefs and ad-label checks per market straight into Claude.', 'Claude', 0],
    ['linkedin-carousel-studio', 'LinkedIn Carousel Studio', 'Outline in, on-brand carousel out: slides and a LinkedIn-ready PDF in one locked style.', 'Claude', 0],
    ['job-search-agent', 'Job Search Agent', 'Twice a day it finds roles, scores the fit with evidence and drafts a tailored application.', 'Claude', 1],
    ['claude-skills-i-use', 'Claude Skills I use', 'Saved processes for applications, carousels, creator shortlists and humanising text.', 'Claude', 0]
  ];
  const repoOf = (t) => (t[0] === 'claude-skills-i-use' ? 'claude-skills' : t[0]);
  const url = (t) => `${GH}/${repoOf(t)}`;

  // code rain, for the AI page intro and the home teaser
  const CH = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01{}[]<>=+*/$#;:'.split('');
  const rains = [];
  function rain(cv, dense) {
    const x = cv.getContext('2d'); const st = { cv, x, W: 0, H: 0, fs: 16, drops: [], vis: false, last: 0, dense };
    st.size = () => { const d = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight; if (!w || !h || (w === st.W && h === st.H)) return; st.W = w; st.H = h; cv.width = w * d; cv.height = h * d; x.setTransform(d, 0, 0, d, 0, 0); st.fs = w < 600 ? 13 : 16; st.drops = Array.from({ length: Math.ceil(w / st.fs) }, () => Math.random() * -h / st.fs); x.fillStyle = '#040806'; x.fillRect(0, 0, w, h); };
    st.draw = (t) => {
      if (t - st.last < 55) return; st.last = t; st.size();
      x.fillStyle = 'rgba(4,8,6,.13)'; x.fillRect(0, 0, st.W, st.H); x.font = `500 ${st.fs}px "Martian Mono", ui-monospace, monospace`;
      st.drops.forEach((y, i) => { if (!dense && i % 2) return; const c = CH[(Math.random() * CH.length) | 0], py = y * st.fs; x.fillStyle = Math.random() < .05 ? '#DFFFEA' : '#22C55E'; x.fillText(c, i * st.fs, py); if (py > st.H && Math.random() > .972) st.drops[i] = 0; st.drops[i] = st.drops[i] + 1; });
    };
    if (window.IntersectionObserver) new IntersectionObserver(([e]) => { st.vis = e.isIntersecting; }).observe(cv); else st.vis = true;
    rains.push(st); return st;
  }
  $$('canvas[data-rain]').forEach((c) => rain(c, c.dataset.rain === 'dense'));
  (function loop(t) { requestAnimationFrame(loop); if (RM) return; rains.forEach((r) => { if (r.vis && r.cv.closest('.page.on')) r.draw(t); }); })(0);
  if (RM) rains.forEach((r) => { r.size(); for (let k = 0; k < 40; k++) r.draw(k * 60); });

  // the typed headline
  const typed = $('#mxType');
  function typeIt() {
    if (!typed) return; const full = typed.dataset.text; clearInterval(typed._t);
    if (RM) { typed.textContent = full; return; }
    let n = 0; typed.textContent = ''; typed._t = setInterval(() => { n++; typed.textContent = full.slice(0, n); if (n % 4 === 0) sfx('tick'); if (n >= full.length) clearInterval(typed._t); }, 46);
  }

  // the ring of eleven
  const ring = $('#ring3d');
  if (ring) {
    const rin = ring.querySelector('.r3-in'), N = TOOLS.length, step = 360 / N;
    rin.innerHTML = TOOLS.map((t, i) => `<a class="r3-c" href="#ai" data-i="${i}" draggable="false"><span class="r3-n">${String(i + 1).padStart(2, '0')}</span><b>${esc(t[1])}</b><span class="r3-d">${esc(t[2])}</span><span class="r3-t">${esc(t[3])} · open source</span></a>`).join('');
    const cards = $$('.r3-c', rin);
    let ang = 0, vel = .1, drag = null, front = -1, moved = false, R = 0;
    const layout = () => { const w = cards[0].offsetWidth || 220; R = Math.round(w / (2 * Math.tan(Math.PI / N)) + 26); cards.forEach((c, i) => { c.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`; }); };
    layout(); addEventListener('resize', layout);
    ring.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, a: ang, lx: e.clientX, t: performance.now() }; moved = false; ring.classList.add('grab'); });
    addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 6) moved = true; ang = drag.a + dx * .28; vel = (e.clientX - drag.lx) * .28; drag.lx = e.clientX; }, { passive: true });
    addEventListener('pointerup', () => { if (drag) { drag = null; ring.classList.remove('grab'); } });
    ring.addEventListener('click', (e) => { if (moved) { e.preventDefault(); return; } const c = e.target.closest('.r3-c'); if (!c) return; e.preventDefault(); const g = document.getElementById('gh-' + TOOLS[+c.dataset.i][0]); if (g) { g.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); g.classList.remove('flash'); void g.offsetWidth; g.classList.add('flash'); } });
    let vis = false; if (window.IntersectionObserver) new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(ring);
    (function spin() {
      requestAnimationFrame(spin); if (!vis || page() !== 'ai') return;
      if (!drag) { vel += ((RM ? 0 : -.12) - vel) * .03; ang += vel; }
      rin.style.transform = `translateZ(${-R}px) rotateY(${ang.toFixed(2)}deg)`;
      let best = 0, bd = 999;
      cards.forEach((c, i) => { const rel = ((i * step + ang) % 360 + 540) % 360 - 180, a = Math.abs(rel); if (a < bd) { bd = a; best = i; } c.style.opacity = (a > 100 ? .14 : 1 - a / 150).toFixed(3); c.classList.toggle('front', a < step / 2); });
      if (best !== front) { if (front >= 0 && Math.abs(vel) > .3) sfx('tick'); front = best; }
    })();
  }

  // the GitHub-style grid
  const gh = $('#ghGrid');
  if (gh) {
    const book = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.71 1.71.75.75 0 0 1-1.07 1.05A2.5 2.5 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.71A2.5 2.5 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.09a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>';
    gh.innerHTML = TOOLS.map((t) => `<a class="gh-c" id="gh-${t[0]}" href="${url(t)}" target="_blank" rel="noopener"><span class="gh-h">${book}<span class="gh-r"><b>${esc(repoOf(t))}</b></span><span class="gh-pub">Public</span></span><span class="gh-d">${esc(t[2])}</span><span class="gh-m"><span><i style="background:${t[3] === 'Claude' ? '#D97757' : '#2F9E6B'}"></i>${esc(t[3])}</span><span>Sample data</span></span></a>`).join('');
  }

  // try it live: the Creator Fit Scorer, with made-up creators
  const fit = $('#fitLive');
  if (fit) {
    const C = [
      { n: 'Creator A', niche: 'Beauty', aud: { Germany: 61, UK: 14, India: 6 }, er: 4.1, cons: .9, flag: '' },
      { n: 'Creator B', niche: 'Fitness', aud: { Germany: 48, UK: 20, India: 4 }, er: 3.2, cons: .8, flag: '' },
      { n: 'Creator C', niche: 'Food', aud: { Germany: 9, UK: 22, India: 58 }, er: 5.6, cons: .7, flag: '' },
      { n: 'Creator D', niche: 'Tech', aud: { Germany: 35, UK: 30, India: 12 }, er: 2.1, cons: .95, flag: '' },
      { n: 'Creator E', niche: 'Beauty', aud: { Germany: 22, UK: 41, India: 9 }, er: 6.3, cons: .6, flag: 'Swearing in recent captions' },
      { n: 'Creator F', niche: 'Fitness', aud: { Germany: 18, UK: 12, India: 51 }, er: 3.9, cons: .85, flag: '' }
    ];
    const NICHES = ['Beauty', 'Fitness', 'Food', 'Tech'], MKTS = ['Germany', 'UK', 'India'];
    const B = { niche: 'Beauty', mkt: 'Germany', er: 3, safe: true };
    fit.innerHTML = `<div class="fit-brief"><p class="fit-k">The brief</p>
      <div class="fit-row"><span>Niche</span><div class="chips" data-f="niche">${NICHES.map((x) => `<button type="button" class="chip" aria-pressed="${x === B.niche}" data-v="${x}">${x}</button>`).join('')}</div></div>
      <div class="fit-row"><span>Market</span><div class="chips" data-f="mkt">${MKTS.map((x) => `<button type="button" class="chip" aria-pressed="${x === B.mkt}" data-v="${x}">${x}</button>`).join('')}</div></div>
      <div class="fit-row"><label for="fitEr">Target engagement <b id="fitErV">3.0%</b></label><input id="fitEr" type="range" min="1" max="6" step=".5" value="3"></div>
      <label class="fit-sw"><input type="checkbox" id="fitSafe" checked> Brand-safety filter on</label>
      <p class="fit-note">Six made-up creators. The scoring rules are the same idea as the open-source tool, simplified.</p></div>
      <ol class="fit-out" aria-live="polite"></ol>`;
    const out = $('.fit-out', fit);
    out.innerHTML = C.map((c) => `<li data-n="${c.n}"><div class="fo-h"><span class="fo-av">${c.n.slice(-1)}</span><span><b>${c.n}</b><span>${c.niche} · made up</span></span><span class="fo-s">0</span></div><div class="fo-bar"><i></i></div><ul class="fo-r"></ul></li>`).join('');
    const score = (c) => {
      const r = [], nf = c.niche === B.niche ? 1 : 0, share = c.aud[B.mkt] || 0, erK = Math.min(1.2, c.er / B.er);
      r.push([nf ? '+' : '-', nf ? `Niche matches ${B.niche.toLowerCase()}` : `${c.niche} creator, the brief is ${B.niche.toLowerCase()}`]);
      r.push([share >= 30 ? '+' : '-', `${share}% of the audience in ${B.mkt}`]);
      r.push([c.er >= B.er ? '+' : '-', `Engagement ${c.er.toFixed(1)}% against a ${B.er.toFixed(1)}% target`]);
      if (c.cons < .7) r.push(['-', 'Posts irregularly']);
      let s = 40 * nf + 30 * Math.min(1, share / 50) + 20 * Math.min(1, erK) + 10 * c.cons;
      if (c.flag && B.safe) { s -= 25; r.push(['-', c.flag]); }
      return { s: Math.max(0, Math.round(s)), r };
    };
    const run = () => {
      const res = C.map((c) => ({ c, ...score(c) })).sort((a, b) => b.s - a.s);
      res.forEach((x, k) => {
        const li = out.querySelector(`[data-n="${x.c.n}"]`); li.style.order = k; li.classList.toggle('best', k === 0);
        const sEl = li.querySelector('.fo-s'), from = +sEl.textContent || 0, t0 = performance.now();
        const anim = (t) => { const e = Math.min(1, (t - t0) / 500); sEl.textContent = Math.round(from + (x.s - from) * e); if (e < 1 && !RM) requestAnimationFrame(anim); else sEl.textContent = x.s; };
        requestAnimationFrame(anim);
        li.querySelector('.fo-bar i').style.width = x.s + '%';
        li.querySelector('.fo-r').innerHTML = x.r.map(([p, t]) => `<li class="${p === '+' ? 'pos' : 'neg'}">${esc(t)}</li>`).join('');
      });
    };
    fit.addEventListener('click', (e) => { const b = e.target.closest('[data-f] .chip'); if (!b) return; const f = b.parentElement.dataset.f; B[f] = b.dataset.v; $$('.chip', b.parentElement).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); sfx('tick'); run(); });
    $('#fitEr', fit).addEventListener('input', (e) => { B.er = +e.target.value; $('#fitErV').textContent = B.er.toFixed(1) + '%'; run(); });
    $('#fitSafe', fit).addEventListener('change', (e) => { B.safe = e.target.checked; sfx('tick'); run(); });
    run();
  }

  // the home teaser lists three tools
  const aiHome = $('#aiHomeList');
  if (aiHome) aiHome.innerHTML = TOOLS.slice(0, 3).map((t) => `<a href="#ai"><span>${esc(t[1])}</span><span class="aih-d">${esc(t[2])}</span></a>`).join('');

  // when the AI page opens: type the headline again
  const onRoute = () => { if (page() === 'ai') setTimeout(typeIt, 450); };
  addEventListener('hashchange', () => setTimeout(onRoute, 480)); onRoute();
})();

/* touch: on iPad and phones, cards lean toward the finger and press in; a scroll cancels it */
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const SEL = '[data-tilt], .gh-c, .aih-list a, .svc-c, .pcard, .fit-out > li, .cmp-col, .r3-c';
  let el = null;
  const set = (e) => {
    const r = el.getBoundingClientRect(), px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    el.style.setProperty('--ry', ((px - .5) * 8).toFixed(2) + 'deg'); el.style.setProperty('--rx', ((.5 - py) * 8).toFixed(2) + 'deg');
    el.style.setProperty('--mx', (px * 100).toFixed(1) + '%'); el.style.setProperty('--my', (py * 100).toFixed(1) + '%'); el.style.setProperty('--sheen', 1);
  };
  addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; const t = e.target.closest(SEL); if (!t || t.closest('#ring3d') && !t.classList.contains('front')) return; el = t; el.classList.remove('touch-out'); el.classList.add('touch-t'); set(e); }, { passive: true });
  addEventListener('pointermove', (e) => { if (el && e.pointerType !== 'mouse') set(e); }, { passive: true });
  const rel = () => { if (!el) return; const t = el; el = null; t.classList.remove('touch-t'); t.classList.add('touch-out'); t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg'); t.style.setProperty('--sheen', 0); setTimeout(() => t.classList.remove('touch-out'), 460); };
  addEventListener('pointerup', rel, { passive: true }); addEventListener('pointercancel', rel, { passive: true });
})();
