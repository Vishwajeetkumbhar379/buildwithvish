/* Build with Vish 2.0 prototype: the Journey.
   It starts on a maps-style street view of Mumbai (stylised; places are approximate). Scroll, swipe or tap Next stop.
   At the take-off the map zooms out to the real Earth, a small plane flies the great circle to Germany, the camera
   dives back down and the map of Offenburg takes over. A year counter, a short voice note from Vish on every stop
   (only when tapped) and a quiet sound for each moment. */
(() => {
  'use strict';
  const root = document.querySelector('[data-jmap="journey"]'); if (!root) return;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sfx = (k) => { if (window.bwvSfx) window.bwvSfx(k); };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const P = 'jm0';
  const svg = root.querySelector('.jm-svg'), card = root.querySelector('.jm-card'), dots = root.querySelector('.jm-dots'), whenEl = root.querySelector('.jm-when');
  const sticky = root.querySelector('.jm-sticky'), earthHost = root.querySelector('.jm-earth'), space = root.querySelector('.jm-space'), note = root.querySelector('.jm-note'), yearEl = root.querySelector('.jy-n'), hint = root.querySelector('.jm-hint');
  let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  /* ---------- the stops ---------- */
  const S = [
    { sc: 'mum', x: 1460, y: 960, z: 900, kind: 'edu', when: '2017 to 2020', where: 'Navi Mumbai', t: 'Pillai College', role: 'Bachelor of Mass Media, Journalism and Advertising', head: 'Where it started.', story: 'Three years of advertising, journalism and media studies. The first time I saw how a brief turns into a campaign.', chips: ['BMM', 'Advertising', 'Journalism'] },
    { sc: 'mum', x: 1790, y: 470, z: 1000, kind: 'trek', when: '2019 to 2022', where: 'Sahyadri hills', t: 'What’s Next?', role: 'Founder', head: 'My own small company.', story: 'A trekking and travel start-up I ran alongside college and my first jobs: planning, budgets, logistics and the marketing that filled the trips.', chips: ['Founder', 'Budgets', 'Logistics'] },
    { sc: 'mum', x: 560, y: 720, z: 760, kind: 'work', when: '01/2021 to 07/2021', where: 'Mumbai', t: 'FashionTV India', role: 'Social Media Marketing Executive', head: 'First full-time role.', story: 'Social media for a fashion media brand: content, posting and reporting.', chips: ['Social media', 'Content'] },
    { sc: 'mum', x: 640, y: 520, z: 760, kind: 'work', when: '07/2021 to 06/2022', where: 'Mumbai', t: 'White Rivers Media', role: 'Influencer Marketing Executive', head: 'Into creator marketing.', story: 'Where I started working with creators every day: outreach, briefs and campaign tracking.', chips: ['Outreach', 'Briefs', 'Tracking'] },
    { sc: 'mum', x: 230, y: 560, z: 1300, kind: 'remote', when: '06/2022 to 04/2023', where: 'Remote', t: 'Pollen (Zoo Media)', role: 'Senior Influencer Marketing Executive', head: 'More creators, bigger brands.', story: 'Creator campaigns for brand accounts, from the shortlist to the final report. A remote role for a Mumbai agency.', chips: ['Campaigns', 'Brand accounts', 'Remote'] },
    { sc: 'mum', x: 230, y: 560, z: 1300, kind: 'remote', when: '04/2023 to 01/2024', where: 'Remote', t: 'Pollen (Zoo Media)', role: 'Marketing Manager, Influencer Marketing and Client Servicing', head: 'Promoted within 10 months.', story: 'Client servicing on top of campaigns: the main point of contact for brand accounts. Still remote.', chips: ['Promotion', 'Client servicing', 'Remote'] },
    { sc: 'mum', x: 230, y: 560, z: 1300, kind: 'remote', when: '01/2024 to 07/2025', where: 'Remote', t: 'Illuminati Media', role: 'Senior Marketing Manager, Influencer Marketing and Client Servicing', head: '20+ accounts, a team of twelve.', story: 'Creator campaigns across 20+ brand accounts, budgets of €60k to €120k per campaign, and a 12-person team. Fully remote.', chips: ['20+ accounts', '12 people', '€60k to €120k'], link: ['View case study', '#case'] },
    { sc: 'globe', x: 230, y: 560, z: 1300, kind: 'fly', when: '2025', where: 'Remote to Germany', t: 'Take-off', role: 'Mumbai to Offenburg, about 6,600 km', head: 'A new chapter, in Germany.', story: 'I left agency life to study how AI is changing marketing work, at an MBA on the edge of the Black Forest.', chips: ['Relocation', 'New country'] },
    { sc: 'off', x: 7060, y: 560, z: 820, kind: 'edu', when: '10/2025 to early 2027', where: 'Offenburg', t: 'Hochschule Offenburg', role: 'MBA, International Business Consulting', head: 'Back to studying, on purpose.', story: 'My thesis looks at how AI marketing tools change the way marketers actually work.', chips: ['MBA', 'Thesis on AI'] },
    { sc: 'off', x: 7130, y: 610, z: 560, kind: 'work', when: '01/2026 to now', where: 'Offenburg', t: 'Black Forest Business School', role: 'Marketing Analytics and Content Manager, Working Student', head: 'Marketing again, with data.', story: 'Analytics and content for the business school, alongside the MBA.', chips: ['Analytics', 'Content'], link: ['Read the About page', '#about'] }
  ];
  const KIND = { edu: ['#3A2A5E', 'M'], trek: ['#2FA36B', 'T'], work: ['#F07A3A', 'W'], up: ['#F07A3A', '↑'], remote: ['#B8914E', ''], fly: ['#B8914E', ''] };

  /* ---------- draw the map ---------- */
  const defs = el('defs', {}, svg);
  const world = el('g', {}, svg);
  // Mumbai scene (0..2000 x 0..1300)
  const mum = el('g', { class: 'sc-mum' }, world);
  el('rect', { x: -2000, y: -1500, width: 6000, height: 4300, class: 'mp-water' }, mum);
  const landD = 'M2400 -400 L820 -400 L820 0 C760 120 700 200 640 260 C560 340 520 420 470 520 C420 620 400 760 360 860 C320 960 300 1080 330 1200 L380 1700 L2400 1700 Z';
  el('clipPath', { id: P + 'Land' }, defs).appendChild(el('path', { d: landD }));
  el('path', { d: landD, class: 'mp-land' }, mum);
  const mg = el('g', { 'clip-path': `url(#${P}Land)` }, mum);
  el('path', { d: 'M1500 300 C1650 200 1900 260 2100 380 C2250 470 2250 640 2080 700 C1900 760 1700 700 1580 600 C1460 500 1400 380 1500 300 Z', class: 'mp-park' }, mg);
  el('path', { d: 'M840 40 C960 0 1080 60 1100 160 C1110 250 1010 300 920 280 C830 260 780 120 840 40 Z', class: 'mp-park' }, mg);
  el('path', { d: 'M1250 700 C1320 660 1400 690 1400 760 C1400 820 1320 840 1270 810 C1220 780 1210 730 1250 700 Z', class: 'mp-park' }, mg);
  const grid = (g, x0, y0, x1, y1, step, ang, cls) => { const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = Math.hypot(x1 - x0, y1 - y0); let d = ''; for (let k = -R; k <= R; k += step) { const j = (rnd() - .5) * step * .3; d += `M${cx + (k + j) * c - R * s} ${cy + (k + j) * s + R * c}L${cx + (k + j) * c + R * s} ${cy + (k + j) * s - R * c}`; d += `M${cx - R * c - (k + j) * s} ${cy - R * s + (k + j) * c}L${cx + R * c - (k + j) * s} ${cy + R * s + (k + j) * c}`; } el('path', { d, class: cls }, g); };
  grid(mg, 300, 0, 1000, 1300, 46, 14, 'mp-st');
  grid(mg, 1000, 0, 2400, 1300, 70, -8, 'mp-st');
  const roads = ['M480 1250 C520 1000 560 800 620 600 C680 420 760 260 860 60', 'M560 1300 C640 1060 700 840 760 640 C820 460 900 300 1020 120', 'M760 640 C900 620 1080 640 1240 700 C1400 760 1560 880 1700 1000 C1820 1100 1980 1150 2200 1160'];
  roads.forEach((d) => { el('path', { d, class: 'mp-rd-c' }, mg); el('path', { d, class: 'mp-rd' }, mg); });
  const hw = 'M1180 -50 C1200 200 1230 420 1300 600 C1380 820 1560 1000 1800 1080 C2000 1140 2200 1200 2400 1250';
  el('path', { d: hw, class: 'mp-hw-c' }, mg); el('path', { d: hw, class: 'mp-hw' }, mg);
  el('path', { d: 'M880 1700 C900 1300 960 1060 940 900 C920 760 980 600 1060 430 C1090 380 1120 340 1160 300 L1190 320 C1150 360 1120 400 1092 450 C1020 610 960 760 980 900 C1000 1060 960 1300 940 1700 Z', class: 'mp-water' }, mum);
  const LBL = [];
  const lbl = (g, x, y, t, cls = 'mp-lbl') => { const w = el('g', { transform: `translate(${x} ${y})` }, g); el('text', { x: 0, y: 0, class: cls, 'text-anchor': 'middle' }, w).appendChild(document.createTextNode(t)); LBL.push([w, x, y]); };
  lbl(mum, 180, 900, 'Arabian Sea', 'mp-lbl mp-wl'); lbl(mum, 520, 980, 'MUMBAI', 'mp-lbl mp-city'); lbl(mum, 1420, 1180, 'NAVI MUMBAI', 'mp-lbl mp-city'); lbl(mum, 1840, 330, 'Sahyadri hills', 'mp-lbl mp-pl');
  // Offenburg scene (6000..8000 x 0..1300)
  const off = el('g', { class: 'sc-off' }, world);
  el('rect', { x: 5500, y: -500, width: 3000, height: 2300, class: 'mp-land' }, off);
  el('path', { d: 'M7350 -300 C7500 100 7400 400 7520 700 C7620 950 7550 1200 7700 1600 L8600 1600 L8600 -300 Z', class: 'mp-forest' }, off);
  grid(off, 6600, 300, 7400, 900, 40, 6, 'mp-st');
  const rhine = 'M6380 -300 C6300 100 6460 300 6380 560 C6300 820 6440 1050 6360 1600';
  el('path', { d: rhine, class: 'mp-river' }, off);
  el('path', { d: 'M8200 820 C7900 800 7600 740 7300 700 C7100 670 6900 660 6700 640 C6600 630 6480 600 6400 580', class: 'mp-river mp-river-s' }, off);
  const a5 = 'M6760 -300 C6740 200 6780 600 6750 1000 C6730 1300 6760 1500 6750 1700';
  el('path', { d: a5, class: 'mp-hw-c' }, off); el('path', { d: a5, class: 'mp-hw' }, off);
  const b33 = 'M6750 620 C6950 640 7150 660 7350 700 C7600 750 7900 800 8300 840';
  el('path', { d: b33, class: 'mp-rd-c' }, off); el('path', { d: b33, class: 'mp-rd' }, off);
  el('path', { d: 'M7060 -300 C7050 100 7060 400 7080 700 C7090 1000 7070 1300 7080 1700', class: 'mp-rd-c' }, off); el('path', { d: 'M7060 -300 C7050 100 7060 400 7080 700 C7090 1000 7070 1300 7080 1700', class: 'mp-rd' }, off);
  lbl(off, 6200, 520, 'FRANCE', 'mp-lbl mp-city'); lbl(off, 6230, 420, 'Strasbourg', 'mp-lbl mp-pl'); lbl(off, 6460, 980, 'Rhine', 'mp-lbl mp-wl'); lbl(off, 7000, 760, 'OFFENBURG', 'mp-lbl mp-city'); lbl(off, 7820, 420, 'Black Forest', 'mp-lbl mp-pl');

  // the route
  // the route: Mumbai stops in order, then the flight, then Offenburg
  const routeM = 'M1460 960 C1600 800 1700 640 1790 470 C1600 520 1300 600 1060 640 C900 680 700 720 560 720 C590 650 610 590 640 520 C520 470 360 500 230 560';
  const routeO = 'M7060 -300 C7060 100 7060 400 7060 560 C7085 580 7110 595 7130 610';
  const mkRoute = (d, g) => { el('path', { d, class: 'mp-route-c' }, g); const p = el('path', { d, class: 'mp-route' }, g); const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; return { p, L }; };
  const RM_ = mkRoute(routeM, mum), RO_ = mkRoute(routeO, off);
  const puck = el('g', { class: 'mp-puck' }, world); el('circle', { r: 30, class: 'mp-puck-h' }, puck); el('circle', { r: 15, class: 'mp-puck-b' }, puck); el('path', { d: 'M-7 6 L0 -9 L7 6 L0 2 Z', class: 'mp-puck-a' }, puck);
  // pins
  const pins = S.map((s, i) => {
    if (s.kind === 'fly' || (i > 0 && S[i - 1].x === s.x && S[i - 1].y === s.y)) return null;
    if (s.kind === 'remote') {
      const g = el('g', { class: 'mp-pin mp-remote', transform: `translate(${s.x} ${s.y})` }, world);
      [0, 1].forEach((k) => el('circle', { r: 26, class: 'mp-ping', style: `animation-delay:${k * 1.2}s` }, g));
      el('circle', { r: 26, fill: KIND.remote[0], class: 'mp-pin-c' }, g);
      el('path', { d: 'M-11 2a16 16 0 0 1 22 0M-6.5 7a9 9 0 0 1 13 0', class: 'mp-sig' }, g); el('circle', { cx: 0, cy: 11, r: 2.6, fill: '#fff' }, g);
      el('text', { x: 38, y: 9, class: 'mp-lbl mp-pin-l' }, g).appendChild(document.createTextNode('Remote \u00B7 2022 to 2025'));
      g.addEventListener('click', () => jump(i)); return g;
    }
    const g = el('g', { class: 'mp-pin', transform: `translate(${s.x} ${s.y})`, tabindex: '-1' }, world);
    el('circle', { r: 26, fill: KIND[s.kind][0], class: 'mp-pin-c' }, g);
    el('text', { y: 8, 'text-anchor': 'middle', class: 'mp-pin-t' }, g).appendChild(document.createTextNode(KIND[s.kind][1]));
    el('text', { x: 38, y: 9, class: 'mp-lbl mp-pin-l' }, g).appendChild(document.createTextNode(s.t + ' \u00B7 ' + (s.when.match(/\d{4}/) || [''])[0]));
    g.addEventListener('click', () => jump(i)); return g;
  });

  /* ---------- camera ---------- */
  let cam = { x: S[0].x, y: S[0].y, z: 2400 }, cur = -1, anim = 0, fadeT = 0, zoomK = 1, routeSc = 'mum';
  const view = () => {
    const r = { width: svg.parentElement.clientWidth, height: svg.parentElement.clientHeight }; if (!r.width || !r.height) return;
    const w = cam.z * zoomK, h = w * r.height / Math.max(1, r.width);
    const wide = r.width > 760, cw = wide ? Math.min(420, r.width * .36) : 0, ch = !wide ? r.height * .42 : 0;
    const ox = wide ? -(cw / r.width) * w * .5 : 0, oy = wide ? 0 : (ch / r.height) * h * .5;
    svg.setAttribute('viewBox', `${cam.x + ox - w / 2} ${cam.y + oy - h / 2} ${w} ${h}`);
    const k = Math.max(.32, Math.min(1.7, w / 1500)).toFixed(3);
    pins.forEach((g, i) => { if (g) g.setAttribute('transform', `translate(${S[i].x} ${S[i].y}) scale(${k})`); });
    LBL.forEach(([g, x, y]) => g.setAttribute('transform', `translate(${x} ${y}) scale(${k})`));
  };
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const scenes = (sc) => ['mum', 'off'].forEach((n) => world.querySelector('.sc-' + n).classList.toggle('dim', n !== sc));
  function moveTo(i, done) {
    cancelAnimationFrame(anim); clearTimeout(fadeT);
    const s = S[i];
    if (s.kind === 'fly') { done(); return; } // the scroll drives the globe
    const prev = cur >= 0 ? S[cur] : null, from = { ...cam }, to = { x: s.x, y: s.y, z: s.z };
    const fromFly = !!prev && prev.kind === 'fly', sameScene = !!prev && (prev.sc === s.sc || fromFly);
    const rFrom = routeProg(cur), rTo = routeProg(i);
    if (RM) { cam = to; routeSc = s.sc; scenes(s.sc); setRoute(rTo); view(); done(); return; }
    if (!sameScene) { svg.classList.add('fade'); fadeT = setTimeout(() => { cam = { x: to.x, y: to.y, z: to.z * 2.2 }; routeSc = s.sc; scenes(s.sc); setRoute(rTo); view(); svg.classList.remove('fade'); go({ ...cam }, false); }, 260); }
    else { routeSc = s.sc; scenes(s.sc); go(from, !fromFly); }
    function go(f, arc) {
      const t0 = performance.now(), D = 950;
      const step = (t) => { const k = Math.min(1, (t - t0) / D), e = ease(k), lift = arc ? Math.sin(k * Math.PI) * .25 : 0; cam = { x: f.x + (to.x - f.x) * e, y: f.y + (to.y - f.y) * e, z: (f.z + (to.z - f.z) * e) * (1 + lift) }; setRoute(sameScene ? lerpRoute(rFrom, rTo, e) : rTo); view(); if (k < 1) anim = requestAnimationFrame(step); else done(); };
      anim = requestAnimationFrame(step);
    }
  }
  // route progress per stop: [Mumbai fraction, Offenburg fraction]
  const nearest = (o, x, y) => { let best = 0, bd = 1e12; for (let l = 0; l <= o.L; l += o.L / 500) { const q = o.p.getPointAtLength(l), d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd) { bd = d; best = l; } } return best / o.L; };
  const MPOS = S.slice(0, 7).map((s, i) => (i <= 3 ? nearest(RM_, s.x, s.y) : 1)), O8 = nearest(RO_, S[8].x, S[8].y);
  function routeProg(i) { if (i < 0) return [0, 0]; if (i <= 6) return [MPOS[i], 0]; if (i === 7) return [1, 0]; return [1, i === 8 ? O8 : 1]; }
  const lerpRoute = (a, b, e) => a.map((v, k) => v + (b[k] - v) * e);
  function setRoute(r) {
    RM_.p.style.strokeDashoffset = RM_.L * (1 - r[0]); RO_.p.style.strokeDashoffset = RO_.L * (1 - r[1]);
    const o = routeSc === 'off' ? RO_ : RM_, f = routeSc === 'off' ? r[1] : r[0];
    const pt = o.p.getPointAtLength(o.L * f), a = o.p.getPointAtLength(Math.max(0, o.L * f - 2)), b = o.p.getPointAtLength(Math.min(o.L, o.L * f + 2));
    const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + 90, sc = 2.4 * (cam.z / 900);
    puck.style.display = '';
    puck.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${ang.toFixed(1)}) scale(${Math.max(.6, Math.min(3.2, sc)).toFixed(2)})`);
  }

  /* ---------- the year ---------- */
  const yearOf = (s) => +(s.when.match(/\d{4}/) || [2025])[0];
  let yShown = yearOf(S[0]), yT = 0;
  function yearTo(y) {
    clearInterval(yT); if (!yearEl || y === yShown) return;
    const dir = Math.sign(y - yShown);
    const tick = () => { yShown += dir; yearEl.textContent = yShown; yearEl.classList.remove('roll'); void yearEl.offsetWidth; yearEl.classList.add('roll'); sfx('tick'); if (yShown === y) clearInterval(yT); };
    if (RM) { yShown = y; yearEl.textContent = y; return; }
    tick(); if (yShown !== y) yT = setInterval(tick, 150);
  }

  /* ---------- voice notes, only when tapped ---------- */
  const vo = new Audio(); vo.preload = 'none'; let voFor = -1;
  const voBtn = () => card.querySelector('[data-jvoice]');
  const voState = (on) => { const b = voBtn(); if (b) { b.classList.toggle('on', on); b.querySelector('span').textContent = on ? 'Playing · tap to stop' : 'Hear it from Vish'; } };
  vo.addEventListener('ended', () => voState(false)); vo.addEventListener('pause', () => voState(false)); vo.addEventListener('play', () => voState(true));
  function voice() { if (!vo.paused && voFor === cur) { vo.pause(); return; } voFor = cur; vo.src = `audio/j${cur}.mp3`; vo.currentTime = 0; vo.play().catch(() => {}); }

  /* ---------- the place card ---------- */
  function fill(i) {
    const s = S[i];
    card.classList.toggle('fly', s.kind === 'fly');
    card.innerHTML = `<div class="jc-grab" aria-hidden="true"></div>
      <div class="jc-hd"><span class="jc-ic" style="background:${KIND[s.kind][0]}">${s.kind === 'fly' ? '✈' : s.kind === 'remote' ? '◎' : esc(KIND[s.kind][1])}</span><span><b>${esc(s.t)}</b><span>${esc(s.when)} · ${esc(s.where)}</span></span><span class="jc-n">${String(i + 1).padStart(2, '0')} / ${S.length}</span></div>
      <p class="jc-role">${esc(s.role)}</p>
      <h2 class="jc-h">${esc(s.head)}</h2>
      <p class="jc-p">${esc(s.story)}</p>
      <button type="button" class="jc-voice" data-jvoice><i aria-hidden="true"><b></b><b></b><b></b></i><span>Hear it from Vish</span></button>
      
      <div class="jc-chips">${s.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
      <div class="jc-act">${s.link ? `<a class="btn btn-hard" href="${s.link[1]}">${esc(s.link[0])}</a>` : ''}<button type="button" class="btn-mono" data-jstep="-1" ${i === 0 ? 'disabled' : ''} aria-label="Previous stop">‹</button><button type="button" class="btn-mono" data-jstep="1" ${i === S.length - 1 ? 'disabled' : ''} aria-label="Next stop">Next stop ›</button></div>`;
  }
  function show(i) {
    if (i === cur) return;
    const prev = cur;
    vo.pause();
    card.classList.remove('open'); card.classList.add('shut');
    pins.forEach((p, k) => p && p.classList.toggle('on', k === i || (k < i && S[k].x === S[i].x && S[k].y === S[i].y && S[i].kind !== 'fly')));
    if (dots) [...dots.children].forEach((d, k) => { d.setAttribute('aria-current', String(k === i)); d.classList.toggle('done', k < i); });
    if (whenEl) whenEl.textContent = `${S[i].when} · ${S[i].where}`;
    yearTo(yearOf(S[i]));
    moveTo(i, () => { fill(i); card.classList.remove('shut'); void card.offsetWidth; card.classList.add('open'); });
    cur = i; if (prev >= 0 && S[i].kind !== 'fly') sfx('whoosh');
    if (i > 0 && hint) hint.classList.add('gone');
  }
  if (dots) { dots.innerHTML = S.map((s, i) => `<button type="button" aria-label="Stop ${i + 1}: ${esc(s.t)}"></button>`).join(''); dots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) jump([...dots.children].indexOf(b)); }); }
  card.addEventListener('click', (e) => { const b = e.target.closest('[data-jstep]'); if (b) jump(cur + +b.dataset.jstep); if (e.target.closest('[data-jvoice]')) voice(); });
  const zb = (k, f) => { const b = root.querySelector(`[data-jz="${k}"]`); if (b) b.addEventListener('click', f); };
  zb('in', () => { zoomK = Math.max(.45, zoomK / 1.35); view(); }); zb('out', () => { zoomK = Math.min(2.6, zoomK * 1.35); view(); }); zb('reset', () => { zoomK = 1; view(); });

  /* ---------- scroll: one screen per stop, three for the flight ---------- */
  const N = S.length, FI = S.findIndex((s) => s.kind === 'fly');
  const WT = S.map((s) => (s.kind === 'fly' ? 3 : 1)), U = WT.reduce((a, b) => a + b, 0), ST = WT.map((_, i) => WT.slice(0, i).reduce((a, b) => a + b, 0));
  const docTop = (e) => { let y = 0; while (e) { y += e.offsetTop; e = e.offsetParent; } return y; };
  const span = () => Math.max(1, root.offsetHeight - innerHeight);
  let gl = 0;
  function glide(y) {
    cancelAnimationFrame(gl);
    if (RM) { scrollTo({ top: y, behavior: 'instant' }); return; }
    const y0 = scrollY, dy = y - y0, unit = span() / U, u0 = (y0 - docTop(root)) / unit, u1 = (y - docTop(root)) / unit;
    const crosses = Math.min(u0, u1) < ST[FI] + WT[FI] && Math.max(u0, u1) > ST[FI];
    const D = clamp(500 + Math.abs(u1 - u0) * 380 + (crosses ? 900 : 0), 500, 3200), t0 = performance.now();
    const st = (t) => { const k = Math.min(1, (t - t0) / D); scrollTo({ top: y0 + dy * ease(k), behavior: 'instant' }); if (k < 1) gl = requestAnimationFrame(st); };
    gl = requestAnimationFrame(st);
  }
  ['wheel', 'touchstart'].forEach((ev) => addEventListener(ev, () => cancelAnimationFrame(gl), { passive: true }));
  function jump(i) {
    i = Math.max(0, Math.min(N - 1, i | 0));
    const u = ST[i] + (i === FI ? WT[i] * .62 : .5);
    glide(docTop(root) + span() * u / U);
  }
  window.jmGo = jump;

  /* ---------- the globe step ---------- */
  let E = null, eTried = false, globing = false, lastQ = 0;
  const earth = () => { if (!eTried) { eTried = true; E = window.bwvEarth ? window.bwvEarth(earthHost) : null; } return E; };
  const MOMENTS = [[.08, 'swell'], [.24, 'plane'], [.79, 'land'], [.93, 'chime']];
  function area() {
    const W = sticky.clientWidth, H = sticky.clientHeight;
    if (W <= 760) { const top = 70, bot = Math.min(H - 90, card.offsetTop - 10); return { cx: W / 2, cy: (top + bot) / 2, m: Math.min(W - 24, bot - top) }; }
    const left = card.offsetLeft + card.offsetWidth + 12, top = 70, bot = H - 110;
    return { cx: (left + W) / 2, cy: (top + bot) / 2, m: Math.min(W - left - 24, bot - top) };
  }
  function globeAt(q) {
    cancelAnimationFrame(anim); clearTimeout(fadeT); svg.classList.remove('fade');
    const e = earth(), op = e ? ss(.04, .16, q) * (1 - ss(.86, .97, q)) : 0;
    if (e) e.set(q, op, area());
    earthHost.style.opacity = op.toFixed(3); earthHost.style.visibility = op > .003 ? 'visible' : 'hidden';
    space.style.opacity = op.toFixed(3);
    svg.style.opacity = (1 - op).toFixed(3); svg.style.visibility = op > .995 ? 'hidden' : '';
    root.classList.toggle('globing', op > .02); root.classList.toggle('night', op > .5);
    if (note) note.textContent = op > .5 ? 'Earth: NASA Blue Marble and Black Marble imagery' : 'Stylised map. Places are approximate.';
    puck.style.display = 'none';
    // the street map zooms out under the globe, and the Offenburg map waits under the landing
    if (q < .5 || !e) {
      const sc = q < .5 ? 'mum' : 'off';
      routeSc = sc; scenes(sc);
      cam = sc === 'mum' ? { x: 230, y: 560, z: 1300 * Math.pow(7, ss(0, .2, q)) } : { x: 7060, y: 560, z: 820 * Math.pow(7, 1 - ss(.84, 1, q)) };
      RM_.p.style.strokeDashoffset = 0; RO_.p.style.strokeDashoffset = RO_.L;
    } else { routeSc = 'off'; scenes('off'); cam = { x: 7060, y: 560, z: 820 * Math.pow(7, 1 - ss(.84, 1, q)) }; RM_.p.style.strokeDashoffset = 0; RO_.p.style.strokeDashoffset = RO_.L; }
    view();
    if (!RM) MOMENTS.forEach(([th, k]) => { if (lastQ < th && q >= th) sfx(k); });
    lastQ = q;
  }
  function endGlobe(after) {
    globeAt(after ? 1 : 0);
    globing = false; lastQ = after ? 1 : 0;
    svg.style.opacity = ''; svg.style.visibility = ''; root.classList.remove('globing', 'night');
  }
  function onScroll() {
    if (document.body.dataset.page !== 'journey') return;
    const u = clamp((scrollY - docTop(root)) / span() * U, 0, U - 1e-4);
    let i = 0; while (i < N - 1 && u >= ST[i + 1]) i++;
    if (i === FI) { globing = true; globeAt(clamp((u - ST[FI]) / WT[FI])); }
    else if (globing) endGlobe(i > FI);
    if (i !== cur) show(i);
  }
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  addEventListener('resize', () => { view(); onScroll(); });
  addEventListener('keydown', (e) => { if (document.body.dataset.page !== 'journey' || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return; if (e.key === 'ArrowRight') jump(cur + 1); if (e.key === 'ArrowLeft') jump(cur - 1); });

  /* ---------- swipe to the next or previous stop ---------- */
  let sw = null;
  sticky.addEventListener('pointerdown', (e) => { if (e.button > 0) return; sw = { x: e.clientX, y: e.clientY, t: performance.now() }; }, { passive: true });
  sticky.addEventListener('pointermove', (e) => { if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y; if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) card.style.translate = `${(dx * .22).toFixed(1)}px 0`; }, { passive: true });
  const swEnd = (e, ok) => {
    if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y, dt = performance.now() - sw.t; sw = null; card.style.translate = '';
    if (ok && dt < 900 && Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.3) { if (hint) hint.classList.add('gone'); jump(cur + (dx < 0 ? 1 : -1)); }
  };
  sticky.addEventListener('pointerup', (e) => swEnd(e, true), { passive: true });
  sticky.addEventListener('pointercancel', (e) => swEnd(e, false), { passive: true });

  // first view when the Journey page opens
  const start = () => {
    if (document.body.dataset.page !== 'journey') { vo.pause(); return; }
    earth();
    if (globing) endGlobe(false);
    cur = -1; card.classList.add('shut'); routeSc = 'mum'; scenes('mum'); cam = { x: S[0].x, y: S[0].y, z: 2600 }; view();
    yShown = yearOf(S[0]); if (yearEl) yearEl.textContent = yShown; if (hint) hint.classList.remove('gone');
    setTimeout(() => { onScroll(); if (cur < 0) show(0); }, 250);
  };
  addEventListener('hashchange', () => setTimeout(start, 500));
  addEventListener('DOMContentLoaded', () => setTimeout(start, 80));
  if (window.ResizeObserver) new ResizeObserver(() => view()).observe(svg);
  start();
})();
