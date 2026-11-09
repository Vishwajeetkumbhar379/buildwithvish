/* Build with Vish: the jumping mascot and "Talk to me".
   The full-body Vish (his original renders: wave, gestures and a turnaround) stands on the edge of a card or section and
   hops to the next as you scroll, twirling in the air, waving when he arrives and gesturing when he lands.
   "Talk to me" sits on the right with the small live mascot. Opening it sends the jumping mascot into the button;
   closing it lets him out again. Vish's own voice says hello only after a tap. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sfx = (k) => { if (window.bwvSfx) window.bwvSfx(k); };
  const soundOn = () => { const b = $('[data-sound][aria-pressed]'); return b && b.getAttribute('aria-pressed') === 'true'; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const F = (n) => `img/fb/${n}.webp`;
  const WAVE = ['wave-2-raise-hand', 'wave-3-wave-center', 'wave-4-wave-out', 'wave-5-wave-in', 'wave-4-wave-out', 'wave-3-wave-center', 'wave-6-return-to-rest'];
  const SPIN = ['spin-0', 'spin-1', 'spin-2', 'spin-3', 'spin-4', 'spin-5', 'spin-6', 'spin-7'];
  const IDLE = ['g-thinking', 'g-arms-crossed', 'g-point-up', 'g-thumbs-up'];
  const REST = 'wave-1-rest';
  [REST, ...WAVE, ...SPIN, ...IDLE, 'g-explaining', 'g-point-screen-left', 'g-point-screen-right'].forEach((n) => { const i = new Image(); i.src = F(n); });
  const X = { smile: 'img/buddy-confident-smile.webp', laugh: 'img/buddy-laughing.webp', wink: 'img/buddy-winking.webp', wow: 'img/buddy-surprised.webp', think: 'img/buddy-thoughtful.webp', pleased: 'img/buddy-pleased.webp' };
  Object.values(X).forEach((u) => { const i = new Image(); i.src = u; });
  // the edges he can stand on
  ['#paths .path3', '#intro .letter', '.proof', '#brandList', '#stackHome', '#ringNow', '.show-dev .browser', '#passHome', '#pathHome', '[data-sec="contact"] .band', '#svcGrid', '#ugcLib', '#workGrid', '#pkgGrid', '#libGrid', '.prose2', '#resGrid', '.path5', '#cform', '.uses', '.jm-card', '.iph-wrap', '.aih', '#ring3d', '#ghGrid', '#fitLive', '#svcStack', '#cmp'].forEach((sel) => $$(sel).forEach((e) => e.setAttribute('data-perch', '')));

  /* ---------- "Talk to me", on the right ---------- */
  const launch = $('#launch');
  if (launch) {
    launch.innerHTML = `<span class="la-av"><img src="${X.smile}" alt=""><i aria-hidden="true"></i></span><span class="la-t">Talk to me</span>`;
    launch.setAttribute('aria-label', 'Talk to Vish');
  }
  const laImg = launch && launch.querySelector('img');
  setInterval(() => { if (!laImg || RM || document.body.classList.contains('chat-open')) return; laImg.src = X[['wink', 'pleased', 'laugh'][Math.floor(Math.random() * 3)]]; setTimeout(() => (laImg.src = X.smile), 900); }, 5600);

  /* ---------- the jumping mascot ---------- */
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'buddy'; b.setAttribute('aria-label', 'Vish, waving. Tap to talk');
  b.innerHTML = `<span class="bd-body"><img src="${F(REST)}" alt=""></span><span class="bd-say"></span>`;
  document.body.appendChild(b);
  const img = b.querySelector('img'), say = b.querySelector('.bd-say');
  let frame = REST, play = 0, holdT = 0;
  const show = (n) => { if (n !== frame) { img.src = F(n); frame = n; } };
  // play a list of frames, then hold the last for a while and go back to rest
  function seq(list, ms = 110, hold = 0) { clearTimeout(play); clearTimeout(holdT); let k = 0; const step = () => { show(list[k]); k++; if (k < list.length) play = setTimeout(step, ms); else if (hold) holdT = setTimeout(() => show(REST), hold); }; step(); }
  const gesture = (n, ms = 1300) => seq([n], 0, ms);
  const talk = (t, ms = 3200) => { say.textContent = t; say.classList.add('show'); clearTimeout(say._t); say._t = setTimeout(() => say.classList.remove('show'), ms); };
  const PERCH = '.page.on [data-perch]';
  const H = () => b.offsetHeight || 120, W = () => b.offsetWidth || 80;
  let perch = null, side = 1, pos = null, hop = null, mode = 'free', shown = false, scl = 1;
  function rest() { const phone = innerWidth < 900; return { x: 14, y: innerHeight - H() - (phone ? 92 : 18), w: W(), h: H() }; }
  window.bwvBuddyRest = rest;
  function spotOf(el, k) {
    const r = el.getBoundingClientRect(), w = W(), inset = Math.min(70, r.width * .14);
    const x = k % 2 ? r.left + inset : r.right - w - inset;
    return { x: Math.max(6, Math.min(innerWidth - w - 6, x)), y: r.top - H() * .985 };
  }
  function pick() {
    const vh = innerHeight; let best = null, bd = 1e9;
    $$(PERCH).forEach((el) => { if (el.classList.contains('shut')) return; const r = el.getBoundingClientRect(); if (!r.width || r.top < H() + 70 || r.top > vh * .82) return; const d = Math.abs(r.top - vh * .48); if (d < bd) { bd = d; best = el; } });
    return best;
  }
  const launchSpot = () => { const r = launch ? launch.getBoundingClientRect() : { left: innerWidth - 80, top: innerHeight - 70, width: 60, height: 60 }; return { x: r.left + 26 - W() / 2, y: r.top + r.height / 2 - H() * .8 }; };
  function hopTo(to, opts = {}) {
    if (!pos) pos = { ...to };
    const d = Math.hypot(to.x - pos.x, to.y - pos.y);
    if (RM || d < 20) { pos = { ...to }; scl = opts.s == null ? 1 : opts.s; if (opts.done) opts.done(); return; }
    hop = { t0: performance.now(), from: { ...pos }, to, h: opts.h || 60 + Math.min(150, d * .2), D: opts.D || 720, dir: to.x < pos.x ? -1 : 1, s0: scl, s1: opts.s == null ? 1 : opts.s, done: opts.done, twirl: opts.twirl !== false };
    b.classList.add('air');
  }
  function tick(t) {
    requestAnimationFrame(tick);
    const ch = document.getElementById('chat'), chOpen = !!ch && !ch.hidden;
    document.body.classList.toggle('chat-open', chOpen);
    const want = document.body.classList.contains('buddy-on') || document.body.dataset.page !== 'home';
    // he arrives: a pop, a wave and hello
    if (want && !shown && mode === 'free') {
      shown = true; pos = rest(); scl = 1; perch = null; hop = null; b.classList.add('on', 'pop'); setTimeout(() => b.classList.remove('pop'), 650);
      sfx('land'); seq([REST, ...WAVE, REST], 120);
      if (!b._hi) { b._hi = 1; setTimeout(() => talk("Hi! I'm Vish."), 300); setTimeout(() => talk('Tap “Talk to me” to ask me anything.', 3800), 9000); }
    }
    if (!want && shown) { shown = false; b.classList.remove('on'); hop = null; }
    if (!shown) return;
    // the chat opens: he hops into the button; it closes: he comes back out
    if (chOpen && mode === 'free') { mode = 'going'; perch = null; say.classList.remove('show'); hopTo(launchSpot(), { s: .2, D: 520, h: 80, twirl: false, done: () => { mode = 'in'; b.classList.remove('on'); } }); }
    if (!chOpen && (mode === 'in' || mode === 'going')) { mode = 'free'; hop = null; pos = launchSpot(); scl = .2; b.classList.add('on'); perch = null; hopTo(rest(), { s: 1, D: 620 }); }
    if (mode === 'free' && !hop) {
      const np = pick();
      if (np !== perch) { const k = np ? $$(PERCH).indexOf(np) : 0; perch = np; side = k; hopTo(np ? spotOf(np, k) : rest(), { done: () => land(np, k) }); }
    }
    if (hop) {
      const k = Math.max(0, Math.min(1, (t - hop.t0) / hop.D)), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const to = mode === 'going' ? launchSpot() : (perch ? spotOf(perch, side) : hop.to);
      pos = { x: hop.from.x + (to.x - hop.from.x) * e, y: hop.from.y + (to.y - hop.from.y) * e - Math.sin(Math.PI * k) * hop.h };
      scl = hop.s0 + (hop.s1 - hop.s0) * e;
      // a twirl in the air
      if (!RM && hop.twirl) { const fi = Math.min(8, Math.floor(k * 9)); show(SPIN[hop.dir > 0 ? fi % 8 : (8 - fi) % 8]); }
      if (k >= 1) { const done = hop.done; hop = null; b.classList.remove('air'); show(REST); if (done) done(); }
    } else if (mode === 'free') {
      const target = perch ? spotOf(perch, side) : rest();
      pos = { x: pos.x + (target.x - pos.x) * .35, y: pos.y + (target.y - pos.y) * .35 };
    }
    b.style.transform = `translate3d(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px,0) scale(${scl.toFixed(3)})`;
    b.classList.toggle('lt', pos.x < innerWidth / 2);
  }
  function land(el, k) {
    b.classList.remove('land'); void b.offsetWidth; b.classList.add('land'); setTimeout(() => b.classList.remove('land'), 420);
    if (!el) return;
    const r = Math.random();
    gesture(r < .45 ? (k % 2 ? 'g-point-screen-right' : 'g-point-screen-left') : r < .7 ? 'g-thumbs-up' : 'g-explaining', 1400);
  }
  requestAnimationFrame(tick);
  // little signs of life
  setInterval(() => { if (!hop && frame === REST && shown && mode === 'free' && !RM) gesture(IDLE[Math.floor(Math.random() * IDLE.length)], 1500); }, 7200);

  /* ---------- the chat ---------- */
  const chat = $('#chat'), msgs = $('#msgs'), sugg = $('#sugg');
  if (!chat) return;
  b.addEventListener('click', () => { if (mode !== 'free') return; seq([...WAVE, REST], 90); talk("Let's talk."); sfx('pop'); setTimeout(() => openChat(), 650); });
  chat.querySelector('.ch').innerHTML = `<span class="ch-av" id="chAv"><img src="${X.smile}" alt=""><i></i></span><div style="flex:1"><p style="font-weight:700">Talk to Vish</p><p class="ch-st"><b></b>Quick answers from this site</p></div><button type="button" class="iconbtn" id="chatClose2" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
  const av = $('#chAv'), avImg = av.querySelector('img');
  let avT = 0; const avFace = (f, ms) => { avImg.src = X[f]; clearTimeout(avT); if (ms) avT = setTimeout(() => (avImg.src = X.smile), ms); };
  setInterval(() => { if (!chat.hidden && !RM) avFace(['wink', 'pleased', 'think'][Math.floor(Math.random() * 3)], 900); }, 5200);
  chat.insertAdjacentHTML('beforeend', '<form class="ch-in" id="chIn"><label for="chQ" class="sr">Ask Vish</label><input id="chQ" type="text" placeholder="Ask about services, work or learning" autocomplete="off"><button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M22 3L11 13M22 3l-7 18-4-8-8-4z"/></svg></button></form>');
  const voice = new Audio('audio/hi.mp3'); voice.preload = 'none';
  voice.addEventListener('play', () => av.classList.add('talk')); ['pause', 'ended'].forEach((ev) => voice.addEventListener(ev, () => av.classList.remove('talk')));
  const A = [
    [/price|cost|rate|budget|how much|fee/i, 'Every package shows where it starts, and each project gets a written quote first. Booking for paid projects opens soon.', ['See packages', '#packages']],
    [/hire|hiring|job|full.?time|cv|resume|role|available/i, 'Vish is open to full-time roles from January 2027, remote-first. His story, real work and CV are on the About page.', ['Open About', '#about']],
    [/ugc|video|reel|content/i, 'Vish scripts, films and edits vertical videos, with three hooks each and usage rights in writing.', ['See UGC', '#ugc']],
    [/learn|guide|start|beginner|claude|chatgpt|prompt/i, 'Start with the complete Claude guide for beginners. Everything in the Learn hub is free.', ['Open the guide', '#guide']],
    [/built|tool|github|code|ai tool|project/i, 'He has built 11 open-source AI tools, from a creator fit scorer to a weekly report autopilot. You can try one live.', ['See the AI tools', '#ai']],
    [/journey|story|background|experience|where/i, 'Five years at creator agencies, 850+ creators, 20+ brands and a team of twelve. Now based in Germany, building AI tools for marketing teams.', ['Take the journey', '#journey']],
    [/service|brand|agency|campaign|influencer|talent|help/i, 'Influencer campaigns, talent management, client servicing, content and UGC, team operations and AI workflows.', ['See services', '#services']],
    [/contact|email|call|talk|reach/i, 'Send a short note on the Contact page. Vish reads every message himself.', ['Contact', '#contact']]
  ];
  const SUG = { all: ['What does Vish do for brands?', 'Is Vish open to full-time roles?', 'Where should I start learning AI?'], brand: ['What does Vish do for brands?', 'How much does it cost?', 'Can I see UGC?'], hiring: ['Is Vish open to full-time roles?', "What's his background?", 'What has he built with AI?'], learn: ['Where should I start learning AI?', 'What has he built with AI?', 'Is everything free?'] };
  function drawSug() { const l = document.body.dataset.lane || 'all'; sugg.innerHTML = (SUG[l] || SUG.all).map((q) => `<button type="button">${esc(q)}</button>`).join(''); }
  function bubble(cls, html) { const d = document.createElement('div'); d.className = 'bub ' + cls; d.innerHTML = html; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d; }
  function answer(q) {
    bubble('me', esc(q)); sfx('click');
    const hit = A.find(([re]) => re.test(q)) || [null, "Good question. I answer from what's on this site, so here's the simplest route: the Contact page goes straight to Vish.", ['Contact', '#contact']];
    const dots = bubble('bot typing', '<i></i><i></i><i></i>'); avFace('think');
    setTimeout(() => {
      dots.remove(); avFace('smile'); const d = bubble('bot', ''); const words = hit[1].split(' '); let n = 0;
      const step = () => { n++; d.textContent = words.slice(0, n).join(' '); msgs.scrollTop = msgs.scrollHeight; if (n < words.length) setTimeout(step, RM ? 0 : 28); else { d.insertAdjacentHTML('beforeend', ` <a class="bub-go" href="${hit[2][1]}">${esc(hit[2][0])} →</a>`); sfx('pop'); avFace('pleased', 1000); } };
      step();
    }, RM ? 0 : 650 + Math.random() * 350);
  }
  sugg.addEventListener('click', (e) => { const q = e.target.closest('button'); if (q) answer(q.textContent); });
  $('#chIn').addEventListener('submit', (e) => { e.preventDefault(); const q = $('#chQ').value.trim(); if (!q) return; $('#chQ').value = ''; answer(q); });
  msgs.addEventListener('click', (e) => { if (e.target.closest('[data-voice]')) { voice.currentTime = 0; voice.play().catch(() => {}); } if (e.target.closest('.bub-go')) closeChat(); });
  msgs.innerHTML = '';
  function greet() { if (msgs.children.length) return; bubble('bot', `Hi, I'm Vish. Ask me about my work, my services, or where to start with AI. <button type="button" class="bub-voice" data-voice><span aria-hidden="true">▶</span> Hear it in my voice</button>`); }
  function openChat() { if (!chat.hidden) return; chat.hidden = false; document.body.classList.add('chat-open'); if (launch) launch.setAttribute('aria-expanded', 'true'); drawSug(); greet(); sfx('pop'); avFace('laugh', 900); if (soundOn()) { voice.currentTime = 0; voice.play().catch(() => {}); } setTimeout(() => $('#chQ').focus({ preventScroll: true }), 50); }
  function closeChat() { if (chat.hidden) return; chat.hidden = true; document.body.classList.remove('chat-open'); if (launch) launch.setAttribute('aria-expanded', 'false'); voice.pause(); }
  if (launch) launch.addEventListener('click', (e) => { e.stopImmediatePropagation(); chat.hidden ? openChat() : closeChat(); }, true);
  $('#chatClose2').addEventListener('click', closeChat);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeChat(); }, true);
})();
