/* Build with Vish 2.0: the reader. Every guide, project, prompt pack, tool page and news post opens at #read-<slug>
   in the article layout: numbered sections with a contents rail that follows your reading, time per section,
   prompts you can copy or open straight in Claude or ChatGPT, checklists you can tick off, project steps with
   progress, and three more to read. Long guides load on demand from g/<slug>.html. */
(() => {
  'use strict';
  const C = window.BWV_CONTENT; if (!C) return;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sfx = (k) => { if (window.bwvSfx) window.bwvSfx(k); };
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const TYPE = { built: 'Tool I built', guide: 'Guide', project: 'Project', prompts: 'Prompts', workflow: 'Workflow', creator: 'Creator marketing', career: 'Career', check: 'Checklist' };
  const TOOLN = { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini', multi: 'Any AI' };
  const ALL = [...C.GUIDES, ...C.PROJECTS];
  // the launch checklist, as an article of its own
  if (C.LAUNCH) {
    const groups = Object.values(C.LAUNCH);
    const n = groups.reduce((k, g) => k + g.items.length, 0);
    ALL.push({ slug: 'launch-check', type: 'check', tools: ['multi'], level: 'All levels', mins: 15, rank: 99, title: 'Before you launch: the security and legal checklist', excerpt: `${n} checks in plain words, for anything you built with AI and are about to share. Tick them off as you go.`,
      body: groups.map((g) => `<h2>${esc(g.label)}</h2><p>${esc(g.intro || '')}</p><ul class="checklist">${g.items.map((it) => `<li><b>${esc(it.t)}</b><span class="why">Why: ${esc(it.why)}</span><span class="how">How: ${esc(it.how)}</span></li>`).join('')}</ul>`).join('') });
  }
  const find = (s) => ALL.find((a) => a.slug === s);
  window.bwvArticles = ALL;

  /* ---------- small helpers ---------- */
  let tt = 0;
  function toast(m) { let t = $('.rd-toast'); if (!t) { t = document.createElement('div'); t.className = 'rd-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 1600); }
  function copy(text, el) {
    const done = () => { toast('Copied'); sfx('pop'); if (el) { const o = el.textContent; el.textContent = 'Copied'; el.classList.add('done'); setTimeout(() => { el.textContent = o; el.classList.remove('done'); }, 1400); } };
    const fb = () => { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove(); };
    try { navigator.clipboard.writeText(text).then(done, fb); } catch (e) { fb(); }
  }
  const words = (h) => (h.replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9€£$%]+/g) || []).length;
  const fixLinks = (h) => h
    .replace(/href="#(tools|carousels|guides|projects|start|guides-[a-z]+)"/g, 'href="#learn"')
    .replace(/href="#launch"/g, 'href="#read-launch-check"')
    .replace(/href="#(partner|newsletter|portfolio)"/g, 'href="#contact"')
    .replace(/<a ([^>]*href="https?:[^"]+")(?![^>]*target=)/g, '<a target="_blank" rel="noopener" $1');
  const bodyReq = {};
  function loadBody(a) {
    if (!a || !a.ext || a.body) return Promise.resolve();
    if (!bodyReq[a.slug]) bodyReq[a.slug] = fetch('g/' + a.slug + '.html?v=' + (C.V || '1'), { credentials: 'same-origin' })
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then((t) => { if (/^\s*<!doctype/i.test(t)) throw new Error('not a guide'); a.body = t; })
      .catch((e) => { delete bodyReq[a.slug]; throw e; });
    return bodyReq[a.slug];
  }
  document.addEventListener('pointerover', (e) => { const l = e.target.closest && e.target.closest('a[href^="#read-"]'); if (l) loadBody(find(l.getAttribute('href').slice(6))).catch(() => {}); }, { passive: true });

  /* ---------- turning a body into numbered sections ---------- */
  function sections(html) {
    const box = document.createElement('div'); box.innerHTML = fixLinks(html);
    const out = []; let cur = { title: null, nodes: [] };
    [...box.childNodes].forEach((n) => { if (n.nodeName === 'H2') { if (cur.title || cur.nodes.some((x) => (x.textContent || '').trim() || x.nodeType === 1)) out.push(cur); cur = { title: n.innerHTML, nodes: [] }; } else cur.nodes.push(n); });
    out.push(cur);
    return out.filter((s) => s.title || s.nodes.some((x) => x.nodeType === 1 || (x.textContent || '').trim()));
  }
  const html = (nodes) => { const d = document.createElement('div'); nodes.forEach((n) => d.appendChild(n.cloneNode(true))); return d.innerHTML; };
  const ARROW = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h7v7M13 3L4 12"/></svg>';

  /* ---------- the page ---------- */
  function related(a) {
    const same = ALL.filter((x) => x.slug !== a.slug && x.type !== 'check' && (x.type === a.type || (x.tools || []).some((t) => (a.tools || []).includes(t))));
    return same.sort((x, y) => (x.type === a.type ? 0 : 1) - (y.type === a.type ? 0 : 1) || x.rank - y.rank).slice(0, 3);
  }
  const card = (x) => `<a class="lc" href="#read-${x.slug}"><span class="typ">${esc(TYPE[x.type] || x.type)}</span><b>${esc(x.title)}</b><p>${esc(x.excerpt)}</p><span class="m">${x.mins ? x.mins + (x.type === 'project' ? ' MIN BUILD' : ' MIN READ') : ''}</span></a>`;
  const signup = `<form class="rd-sign" data-rdform novalidate><label class="sr" for="rdEmail">Email address</label><input id="rdEmail" name="email" type="email" autocomplete="email" placeholder="you@email.com" required><label class="hp" aria-hidden="true">Leave empty <input name="bot-field" tabindex="-1" autocomplete="off"></label><button class="btn btn-hard acc" type="submit">Get Build Notes</button><p class="rd-msg" role="status" aria-live="polite"></p><p class="rd-fine">Free, every Monday. You confirm by email first and can leave with one click.</p></form>`;
  function head(a) {
    const tools = (a.tools || []).map((t) => `<span class="tag t-plan">${esc((TOOLN[t] || t).toUpperCase())}</span>`).join('');
    const kind = a.fresh ? 'NEWS' : (TYPE[a.type] || a.type).toUpperCase();
    return `<div class="hero rd-hero"><div class="wrap" style="display:flex;flex-direction:column;gap:18px;position:relative;max-width:1060px">
      <a class="link" href="#learn">‹ All guides</a>
      <div class="art-meta"><span class="tag t-tool">${esc(kind)}</span>${tools}<span class="tag t-plan">${esc((a.level || '').toUpperCase())}</span><span class="mono">${a.mins ? a.mins + (a.type === 'project' ? ' MIN BUILD' : ' MIN READ') : ''}</span></div>
      <h1 class="h1 rd-h1">${esc(a.title)}</h1>
      <p class="lead">${esc(a.excerpt)}</p>
      <div class="rd-by"><div class="byline"><img src="img/vish-avatar.jpg" alt=""><b>Vish Kumbhar</b><span>Build with Vish</span></div><button type="button" class="btn-mono rd-share">Copy link</button></div>
    </div></div>`;
  }
  function tail(a) {
    return `<div class="wrap sec tight rd-tail"><div class="rd-end"><div><p class="kick">Build Notes</p><h3 class="h3">Get one like this every Monday.</h3><p class="body">One guide, one prompt, one thing to try. Free.</p></div>${signup}</div>
      <div class="rd-keep"><p class="kick" style="color:var(--muted)">Keep reading</p><div class="lgrid">${related(a).map(card).join('')}</div></div></div>`;
  }
  function vGuide(a) {
    const S = sections(a.body || '');
    const num = S.filter((s) => s.title).length;
    let k = 0;
    const secs = S.map((s) => {
      const id = 'rs-' + (s.title ? ++k : 0), body = html(s.nodes), m = Math.max(1, Math.round(words(body) / 220));
      return { id, t: s.title, body, m };
    });
    const toc = secs.filter((s) => s.t).map((s, i) => `<a href="#" data-rgo="${s.id}"><b>${String(i + 1).padStart(2, '0')}</b>${s.t.replace(/<[^>]+>/g, '')}</a>`).join('');
    const repo = a.type === 'built' ? 'https://github.com/Vishwajeetkumbhar379/' + (a.slug === 'claude-skills-i-use' ? 'claude-skills' : a.slug) : a.repo;
    const extra = a.type === 'built' && repo ? `<div class="rd-repo"><div><p class="kick">Open source</p><p class="body">The code is free on GitHub, with sample data only. Fork it, run it, change it.</p></div><a class="btn btn-hard" href="${esc(repo)}" target="_blank" rel="noopener">Get the code ${ARROW}</a></div>` : '';
    const news = a.fresh ? '<p class="rd-news">News, written in my words, with links to the original sources.</p>' : '';
    return `${head(a)}<div class="wrap sec tight"><div class="art${num < 2 ? ' rd-solo' : ''}">
      ${num >= 2 ? `<aside><p class="kick" style="color:var(--muted)">In this ${a.type === 'project' ? 'project' : 'guide'}</p><nav class="toc2" id="rdToc">${toc}</nav></aside>` : ''}
      <article class="prose2 rd-prose" id="rdProse">${news}${/in short/i.test((a.body || '').slice(0, 900)) ? '' : `<div class="inshort"><p class="kick">In short</p><p style="margin-top:8px">${esc(a.excerpt)}</p></div>`}
      ${secs.map((s) => `<section id="${s.id}">${s.t ? `<div class="step-h"><span class="n">${s.id.slice(3).padStart(2, '0')}</span><h2>${s.t}</h2><span class="tm">${s.m} MIN</span></div>` : ''}${s.body}</section>`).join('')}
      ${extra}</article></div></div>${tail(a)}`;
  }
  function vProject(a) {
    const done = getDone(a.slug);
    const toc = a.steps.map((s, i) => `<a href="#" data-rgo="rs-${i + 1}"><b>${String(i + 1).padStart(2, '0')}</b>${esc(s.t)}</a>`).join('');
    return `${head(a)}<div class="wrap sec tight"><div class="art"><aside><p class="kick" style="color:var(--muted)">Steps</p><nav class="toc2" id="rdToc">${toc}</nav><div class="rd-prog" aria-live="polite"><i><b id="rdBar"></b></i><span id="rdCount"></span></div></aside>
      <article class="prose2 rd-prose" id="rdProse">
        <div class="inshort"><p class="kick">What you'll build</p><p style="margin-top:8px">${esc(a.youbuild || a.excerpt)}</p></div>
        ${a.intro ? `<section>${fixLinks(a.intro)}</section>` : ''}
        <div class="rd-stats"><div><span>TIME</span><b>About ${a.mins} min</b></div><div><span>LEVEL</span><b>${esc(a.level)}</b></div><div><span>COST</span><b>${esc(a.cost || 'Free')}</b></div><div><span>STEPS</span><b>${a.steps.length}</b></div></div>
        ${a.need ? `<section><div class="step-h"><span class="n">00</span><h2>You need</h2></div><ul class="list">${a.need.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></section>` : ''}
        ${a.steps.map((s, i) => `<section id="rs-${i + 1}" class="rd-step${done.includes(i) ? ' done' : ''}" data-i="${i}"><div class="step-h"><span class="n">STEP ${String(i + 1).padStart(2, '0')}</span><h2>${esc(s.t)}</h2><button type="button" class="rd-done" aria-pressed="${done.includes(i)}">${done.includes(i) ? 'Done' : 'Mark done'}</button></div>${fixLinks(s.d || s.b || '')}</section>`).join('')}
        <div class="rd-win" id="rdWin" ${done.length === a.steps.length ? '' : 'hidden'}><h3 class="h3">You built it.</h3><p class="body">Before you share it, run <a class="link" href="#read-launch-check">the launch checklist</a>.</p></div>
        ${a.after ? `<section>${fixLinks(a.after)}</section>` : ''}
      </article></div></div>${tail(a)}`;
  }
  const getDone = (s) => { try { return JSON.parse(store.get('bwv-steps-' + s) || '[]'); } catch (e) { return []; } };

  /* ---------- after drawing: prompts, checklists, calculator, contents rail, progress ---------- */
  function enhance(root, a) {
    $$('pre.prompt', root).forEach((pre) => {
      const t = pre.textContent.trim(), q = encodeURIComponent(t), lab = pre.dataset.label;
      const box = document.createElement('div'); box.className = 'pbx';
      box.innerHTML = `<div class="pbx-h"><span>${lab ? esc(lab) : 'PROMPT'}</span><span class="pbx-a"><button type="button" class="pbx-b" data-pcopy>Copy</button><a class="pbx-b" href="https://claude.ai/new?q=${q}" target="_blank" rel="noopener">Claude ${ARROW}</a><a class="pbx-b" href="https://chatgpt.com/?q=${q}" target="_blank" rel="noopener">ChatGPT ${ARROW}</a></span></div>`;
      pre.replaceWith(box); box.appendChild(pre);
      $('[data-pcopy]', box).addEventListener('click', (e) => copy(t, e.currentTarget));
    });
    $$('table', root).forEach((t) => { if (t.parentElement.classList.contains('rd-tbl')) return; const w = document.createElement('div'); w.className = 'rd-tbl'; t.replaceWith(w); w.appendChild(t); });
    $$('ul.checklist', root).forEach((ul, k) => {
      const key = 'bwv-cl-' + a.slug + '-' + k, items = $$(':scope > li', ul); let st = [];
      try { st = JSON.parse(store.get(key) || '[]'); } catch (e) { st = []; }
      const prog = document.createElement('p'); prog.className = 'rd-clp'; prog.setAttribute('aria-live', 'polite'); ul.after(prog);
      const upd = () => { prog.textContent = `${st.length} of ${items.length} done`; };
      items.forEach((li, i) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'rd-ck'; b.setAttribute('aria-label', 'Mark done: ' + li.textContent.trim().slice(0, 80));
        const set = (on) => { li.dataset.done = on; b.setAttribute('aria-pressed', on); };
        const tog = () => { const on = !st.includes(i); st = on ? [...st, i] : st.filter((x) => x !== i); set(on); store.set(key, JSON.stringify(st)); upd(); sfx(on ? 'tick' : 'click'); if (on && st.length === items.length) { toast('All done'); sfx('chime'); } };
        li.prepend(b); set(st.includes(i));
        b.addEventListener('click', (e) => { e.stopPropagation(); tog(); });
        li.addEventListener('click', (e) => { if (e.target.closest('a,button')) return; tog(); });
      });
      upd();
    });
    const slot = $('.calc-slot', root); if (slot) calc(slot);
  }
  function calc(slot) {
    slot.outerHTML = `<div class="rd-calc" id="rdCalc"><div class="ins">
      <label><span>Campaign budget <output id="o-b"></output></span><input id="c-b" type="range" min="2000" max="100000" step="1000" value="20000"></label>
      <label><span>Creators <output id="o-c"></output></span><input id="c-c" type="range" min="1" max="60" value="10"></label>
      <label><span>Average reach per post <output id="o-r"></output></span><input id="c-r" type="range" min="2000" max="500000" step="1000" value="60000"></label>
      <label><span>Engagement rate <output id="o-e"></output></span><input id="c-e" type="range" min="0.5" max="12" step="0.1" value="4"></label></div>
      <div class="outs"><div><b id="r1"></b><span>Total reach</span></div><div><b id="r2"></b><span>Engagements</span></div><div><b id="r3"></b><span>CPM, per 1,000 reached</span></div><div><b id="r4"></b><span>Cost per engagement</span></div></div></div>`;
    const nf = (n, d = 0) => n.toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });
    const u = () => { const b = +$('#c-b').value, c = +$('#c-c').value, r = +$('#c-r').value, e = +$('#c-e').value, reach = c * r, eng = reach * e / 100;
      $('#o-b').textContent = '€' + nf(b); $('#o-c').textContent = c; $('#o-r').textContent = nf(r); $('#o-e').textContent = e.toFixed(1) + '%';
      $('#r1').textContent = nf(reach); $('#r2').textContent = nf(Math.round(eng)); $('#r3').textContent = '€' + nf(b / reach * 1000, 2); $('#r4').textContent = '€' + nf(b / eng, 2); };
    $$('#rdCalc input').forEach((i) => i.addEventListener('input', u)); u();
  }
  let spyIO = null;
  function bind(root, a) {
    const sh = $('.rd-share', root); if (sh) sh.addEventListener('click', (e) => copy(location.href, e.currentTarget));
    root.addEventListener('click', (e) => { const g = e.target.closest('[data-rgo]'); if (!g) return; e.preventDefault(); const t = document.getElementById(g.dataset.rgo); if (t) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); });
    const links = $$('#rdToc a', root);
    if (spyIO) spyIO.disconnect();
    if (links.length && window.IntersectionObserver) { spyIO = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.dataset.rgo === en.target.id)); }), { rootMargin: '-25% 0px -65% 0px' }); links.forEach((l) => { const t = document.getElementById(l.dataset.rgo); if (t) spyIO.observe(t); }); }
    if (a.type === 'project') {
      let done = getDone(a.slug);
      const prog = () => { $('#rdBar').style.width = (done.length / a.steps.length * 100) + '%'; $('#rdCount').textContent = `${done.length} of ${a.steps.length} steps`; $('#rdWin').hidden = done.length !== a.steps.length; };
      $$('.rd-step', root).forEach((sec) => $('.rd-done', sec).addEventListener('click', (e) => {
        const i = +sec.dataset.i, on = !done.includes(i); done = on ? [...done, i] : done.filter((x) => x !== i); store.set('bwv-steps-' + a.slug, JSON.stringify(done));
        sec.classList.toggle('done', on); e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'Done' : 'Mark done'; prog(); sfx(on ? 'tick' : 'click');
        if (on && done.length === a.steps.length) { toast('Project complete'); sfx('chime'); }
      }));
      prog();
    }
    ['.rd-hero', '#rdProse', '.rd-end'].forEach((s) => { const el = $(s, root); if (el) el.setAttribute('data-perch', ''); });
  }
  // reading progress along the top
  const bar = document.createElement('div'); bar.className = 'rd-bar'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
  addEventListener('scroll', () => { if (document.body.dataset.page !== 'read') { bar.style.transform = 'scaleX(0)'; return; } const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; }, { passive: true });

  /* ---------- the newsletter form at the end of each article ---------- */
  document.addEventListener('submit', async (e) => {
    const f = e.target.closest('form[data-rdform]'); if (!f) return; e.preventDefault();
    const msg = $('.rd-msg', f), email = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = 'That email looks off. Check it and try again.'; return; }
    if (f['bot-field'].value) return;
    msg.textContent = 'Sending…';
    let ok = false;
    ok = window.bwvSend ? await window.bwvSend('newsletter', { email, page: location.hash }) : false;
    msg.textContent = ok ? 'Nearly there: check your inbox and confirm your email.' : "That didn't go through. Try again in a minute.";
    if (ok) { f.email.value = ''; sfx('chime'); }
  });

  /* ---------- open an article ---------- */
  let token = 0;
  window.bwvRead = async (slug) => {
    const root = $('#readRoot'); if (!root) return;
    const a = find(slug), my = ++token;
    if (!a) { root.innerHTML = `<div class="hero"><div class="wrap" style="max-width:760px;display:flex;flex-direction:column;gap:18px"><p class="kick">Not found</p><h1 class="h1">This page has moved.</h1><p class="lead">Everything is in the Learn hub.</p><div class="btns"><a class="btn btn-hard acc" href="#learn">Open the Learn hub</a></div></div></div>`; document.title = 'Not found · Build with Vish'; return; }
    document.title = a.title + ' · Build with Vish';
    if (a.ext && !a.body) {
      root.innerHTML = head(a) + '<div class="wrap sec tight"><p class="body rd-loading">Loading the guide…</p></div>';
      try { await loadBody(a); } catch (e) { if (my !== token) return; root.innerHTML = head(a) + `<div class="wrap sec tight"><p class="body">This guide didn't load. Check your connection, then <a class="link" href="#read-${a.slug}" data-retry>try again</a>.</p></div>`; $('[data-retry]', root).addEventListener('click', (ev) => { ev.preventDefault(); window.bwvRead(slug); }); return; }
      if (my !== token) return;
    }
    root.innerHTML = a.type === 'project' ? vProject(a) : vGuide(a);
    enhance(root, a); bind(root, a);
    scrollTo({ top: 0, behavior: 'instant' });
  };
})();
// a direct link to an article: the page may already be showing before this file loaded
if (document.body.dataset.page === 'read' && /^#read-/.test(location.hash) && window.bwvRead) window.bwvRead(location.hash.slice(6));
