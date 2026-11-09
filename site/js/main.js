
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(pointer: fine)').matches;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M22 3L11 13M22 3l-7 18-4-8-8-4z"/></svg>',
    play: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#fff"/></svg>'
  };

  /* theme */
  const root = document.documentElement;
  const saved = store.get('bwv-theme'); if (saved) root.dataset.theme = saved;
  $('#themeBtn').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark'; store.set('bwv-theme', root.dataset.theme);
  });

  /* content */
  const SVC = [
    { id: 'cp', name: 'Creator Partnerships', line: 'The right creators, scored against your brief, then a campaign run end to end.', from: 'From €490', wide: true, viz: 'fit' },
    { id: 'ugc', name: 'UGC', line: 'Vertical videos I script, film and edit for your brand.', from: 'From €150', viz: 'phone', href: '#ugc' },
    { id: 'sc', name: 'Social & Content', line: 'Concepts, repurposing and short-form clips.', from: 'From €850', viz: 'cal' },
    { id: 'ops', name: 'Operations', line: 'A senior coordinator for your accounts, without a full hire.', from: 'From €750 / month', viz: 'gantt' },
    { id: 'ai', name: 'AI & Automation', line: 'Human-checked workflows for scoring, reporting and client health.', from: 'From €390', viz: 'spark' }
  ];
  const viz = {
    fit: () => `<div class="mini" aria-hidden="true" style="margin-top:14px;max-width:420px"><div style="display:flex;justify-content:space-between"><b style="font-size:13px">Shortlist · skincare launch</b><span class="mono" style="font-size:10.5px;color:var(--muted)">SAMPLE DATA</span></div>${[['#D4B67C,#3A2A5E', 'Creator A · beauty', 92], ['#86E6D8,#0A5E55', 'Creator B · lifestyle', 87], ['#F5B49C,#8A3A1A', 'Creator C · fitness', 74]].map(([g, n, s]) => `<div class="r"><span class="av" style="background:linear-gradient(135deg,${g})"></span><span style="flex:1">${n}</span><span class="bar"><i style="width:${s}%"></i></span><span class="mono">${s}</span></div>`).join('')}</div>`,
    phone: () => `<div style="display:flex;justify-content:center;margin-top:10px">${phone({ w: 132, img: 'img/vish-portrait.jpg', cap: '', slot: 'SAMPLE · to film' })}</div>`,
    cal: () => `<div class="cal" aria-hidden="true" style="margin-top:14px">${'0a0b0a00a0b0a0b'.split('').map((c) => `<i class="${c === 'a' ? 'a' : c === 'b' ? 'b' : ''}"></i>`).join('')}</div>`,
    gantt: () => `<div class="gantt" aria-hidden="true" style="margin-top:14px"><div><span>Brief</span><i style="width:90px"></i></div><div><span>Approvals</span><i style="width:120px;margin-left:50px;opacity:.7"></i></div><div><span>Report</span><i style="width:70px;margin-left:150px;background:var(--tti)"></i></div></div>`,
    spark: () => `<div class="mini" aria-hidden="true" style="margin-top:14px"><div style="display:flex;justify-content:space-between;font-size:12px"><span>Weekly report</span><span style="color:var(--tti)">Ready for review</span></div><svg width="100%" height="40" viewBox="0 0 300 40" preserveAspectRatio="none"><polyline points="0,34 40,30 80,31 120,21 160,24 200,13 240,16 300,6" fill="none" stroke="var(--acc)" stroke-width="2.5"/></svg></div>`
  };
  function phone(o) {
    return `<div class="phone"${o.w ? ` style="--w:${o.w}px"` : ''}><div class="scr"${o.g ? ` style="background:linear-gradient(170deg,${o.g})"` : ''}>${o.img ? `<img src="${o.img}" alt="" style="object-position:${o.pos || '50% 20%'}">` : ''}<div class="ui"><div class="prog"><i></i><i></i><i></i></div><div class="meta"><div class="cap">${esc(o.cap || '')}</div><div class="side">${I.heart}${I.msg}${I.send}</div></div></div>${o.noPlay ? '' : `<span class="play">${I.play}</span>`}${o.slot ? `<span class="slot" style="top:${o.noPlay ? 40 : 62}%">${esc(o.slot)}</span>` : ''}</div></div>`;
  }
  const bento = (el) => { el.innerHTML = SVC.map((s) => `<a class="tile${s.wide ? ' wide' : ''}" href="${s.href || '#services'}" data-tilt><h3>${esc(s.name)}</h3><p>${esc(s.line)}</p>${viz[s.viz]()}<div class="foot"><span class="from">${s.from}</span><span class="go">Explore ›</span></div></a>`).join(''); };
  const S6 = [
    ['Influencer campaigns', 'End-to-end campaign management: creator scouting and fit, briefs, fee talks, approvals, live tracking and the final report.', ['A creator shortlist scored against your brief', 'Briefs, fees and usage rights agreed', 'Shoot, approvals and posting on schedule', 'A report on reach, engagement and cost'], 'From €490', 'ic'],
    ['Talent management', 'I look after creators like a manager: pitching them to brands, handling fee talks and deliverables, and building long-term partnerships.', ['Media kit and rate card', 'Brand pitches with campaign ideas', 'Fees, deliverables and usage rights negotiated', 'From first call to content going live'], 'Price on request', 'tm'],
    ['Account management and client servicing', 'A senior main point of contact for your brand clients: timelines, approvals, upsells and renewals, so nothing slips.', ['Client updates on a fixed rhythm', 'Timelines, approvals and quality control', 'Campaign ideas pitched early', 'Renewal and upsell plans'], 'Price on request', 'am'],
    ['Content and UGC', 'Short-form videos, UGC and social content: scripted, filmed, edited and scheduled, with captions that sound like your brand.', ['UGC videos with three hooks each', 'Short clips cut from long videos', 'Content plans and captions', 'Scheduling and community replies'], 'From €150', 'cu'],
    ['Team and operations', 'Hiring, training and systems for marketing teams: one shared place for tasks, files and deadlines, and a rhythm that keeps people moving.', ['A hiring and onboarding plan', 'Training and a daily check-in rhythm', 'One shared task and file system', 'SOPs and handover documents'], 'From €590', 'to'],
    ['AI workflows', 'Human-checked AI tools for creator teams: scoring creators, checking contracts and turning campaign numbers into client reports.', ['Creator fit scoring', 'Contract clause checks', 'Weekly reports that write themselves', 'Set-up and team training'], 'From €390', 'ai']
  ];
  const turnIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5"/></svg>';
  const svc6 = (el) => { el.innerHTML = S6.map(([t, d, get, from, tab], i) => `<div class="flip"><div class="fi"><div class="ff front"><span class="no">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><button type="button" class="turn" data-turn aria-expanded="false">What you get ${turnIc}</button></div><div class="ff back" inert><span class="no" style="color:#D9C49A">${String(i + 1).padStart(2, '0')} · ${esc(t)}</span><ul>${get.map((g) => `<li>${esc(g)}</li>`).join('')}</ul><span class="from">${from}</span><div class="btns"><a class="btn btn-pri" href="#packages" data-tab="${tab}" style="min-height:44px;padding:0 18px;font-size:14.5px">Packages</a><button type="button" class="turn" data-turn aria-expanded="true">Back ${turnIc}</button></div></div></div></div>`).join(''); };
  /* services page: clean cards (abiemaxey.com) */
  const SVC_IT = ['Run end to end.', 'Represent the creator.', 'Nothing slips.', 'Made to perform.', 'Teams that keep moving.', 'Human-checked.'];
  const SVC_TONE = ['dark', '', 'pink', 'lil', 'mint', ''];
  window.BWV_S6 = S6; window.BWV_SVCIT = SVC_IT;
  $('#svcGrid').innerHTML = S6.map(([t, d, get, from, tab], i) => `<a class="svc-c ${SVC_TONE[i]}" href="#packages" data-tab="${tab}"><span class="sl"><span>SERVICE ${String(i + 1).padStart(2, '0')}</span><span>${String(i + 1).padStart(2, '0')} / 06</span></span><h3>${esc(t)}</h3><span class="it">${SVC_IT[i]}</span><p>${esc(d)}</p><span class="ft"><span>${from}</span><span class="go" aria-hidden="true">${I.arrow}</span></span></a>`).join('');
  /* tools and brands */
  const TOOLS = [['Social and ads', '#3A2A5E', ['Meta Business Suite', 'Meta Ads Manager', 'Google Ads', 'LinkedIn Ads']], ['Analytics and CRM', '#0A5E55', ['Google Analytics', 'HubSpot', 'Zoho', 'Google Sheets']], ['Design and content', '#B4532A', ['Canva', 'Figma', 'WordPress']], ['Work and office', '#3A2A5E', ['Microsoft Office', 'Excel', 'PowerPoint', 'Slack', 'Google Workspace']], ['AI', '#15171C', ['Claude', 'Claude Code', 'ChatGPT', 'Codex']]];
  const ini = (n) => { const w = n.split(/\s+/); return w.length > 1 ? (w[0][0] + w[1][0]) : n.slice(0, 2); };
  const appsHtml = TOOLS.map(([cat, col, xs]) => `<div class="appg"><p class="kick" style="color:var(--muted)">${esc(cat)}</p><div class="apps">${xs.map((x) => `<div class="tapp"><i style="background:${col}" aria-hidden="true">${esc(ini(x))}</i><span>${esc(x)}</span></div>`).join('')}</div></div>`).join('');
  ['#appsSvc', '#appsAbout'].forEach((sel) => { const e = $(sel); if (e) e.innerHTML = appsHtml; });
  const BRANDS = ['Philips', 'L\u2019Or\u00E9al', 'Universal Pictures', 'Bumble', 'Vans', 'Unilever (HUL)', 'Lakm\u00E9', 'Tata', 'Raymond'];
  const toolCol = Object.fromEntries(TOOLS.flatMap(([c, col, xs]) => xs.map((x) => [x, col])));
  const marq = (xs, tools) => `<div class="marq-in">${[...xs, ...xs].map((x, k) => `<span${k >= xs.length ? ' aria-hidden="true"' : ''}>${tools ? `<b><i style="background:${toolCol[x]}">${esc(ini(x))}</i>${esc(x)}</b>` : esc(x)}</span>`).join('')}</div>`;
  $$('[data-marq="brands"]').forEach((e) => { e.innerHTML = marq(BRANDS); });
  $$('[data-marq="tools"]').forEach((e) => { e.innerHTML = marq(TOOLS.flatMap((t) => t[2]), true); });
  /* guide: contents that scroll, and highlight the section you're in */
  $$('[data-goto]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const t = document.getElementById(a.dataset.goto); if (t) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }));
  const toc2 = $$('#toc2 a');
  if (toc2.length && window.IntersectionObserver) { const io2 = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) toc2.forEach((a) => a.classList.toggle('on', a.dataset.goto === en.target.id)); }), { rootMargin: '-25% 0px -65% 0px' }); $$('.prose2 > section').forEach((x) => io2.observe(x)); }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-turn]'); if (!b) return;
    const f = b.closest('.flip'), on = !f.classList.contains('on');
    f.classList.toggle('on', on);
    const [front, back] = f.querySelectorAll('.ff');
    front.toggleAttribute('inert', on); back.toggleAttribute('inert', !on);
    (on ? back : front).querySelector('[data-turn]').focus({ preventScroll: true });
  });

  const SK_UNUSED = [['Partnerships and accounts', ['Creator & brand partnerships', 'Client & account management', 'Remote & international teams']], ['Performance', ['Campaign reporting & KPIs', 'Meta, Google & LinkedIn Ads', 'Growth experiments & A/B tests', 'Marketing attribution']], ['Content and tools', ['Content & social media', 'Canva', 'WordPress', 'Excel / Sheets dashboards']], ['AI and automation', ['Claude', 'ChatGPT', 'Codex', 'Python & automation basics']]];

  /* work */
  const WORK = [
    { k: 'agency', tag: 'AGENCY WORK · EMPLOYED', t: 'Creator campaign operations across 20+ brand accounts', d: 'Briefs, creator fit, approvals and reporting for a 12-person team.', href: '#case', viz: 'laptop' },
    { k: 'tool', tag: 'MY TOOL · SAMPLE DATA', t: 'Creator Fit Scorer', d: 'Scores creators against a brief, with the reasons written out.', href: '#case', viz: 'fit' },
    { k: 'tool', tag: 'MY TOOL · SAMPLE DATA', t: 'Campaign Report Autopilot', d: 'Numbers in, a readable keep / test / change / stop report out.', href: '#case', viz: 'spark' },
    { k: 'tool', tag: 'MY TOOL · FICTIONAL DATA', t: 'Client Health Score', d: 'Spots churn risk before the client says it.', href: '#case', viz: 'gantt' },
    { k: 'tool', tag: 'MY TOOL · SAMPLE DATA', t: 'LinkedIn Carousel Studio', d: 'Turns a post into a carousel in my house style.', href: '#case', viz: 'cal' },
    { k: 'plan', tag: 'PLANNED', t: 'UGC and clipping showreel', d: 'Coming once the first samples are filmed.', href: '#ugc', viz: 'phone' }
  ];
  const workCard = (w) => `<a class="card" href="${w.href}" data-tilt style="display:flex;flex-direction:column;gap:12px"><div style="border-radius:16px;background:var(--bg2);border:1px solid var(--line);min-height:170px;padding:12px;display:flex;align-items:center;justify-content:center;overflow:hidden">${w.viz === 'laptop' ? `<div class="laptop" style="max-width:250px">${laptopInner(true)}</div>` : w.viz === 'phone' ? phone({ w: 90, slot: '' }) : `<div style="width:100%">${viz[w.viz]()}</div>`}</div><span class="tag t-${w.k === 'plan' ? 'plan' : w.k === 'agency' ? 'agency' : 'tool'}" style="align-self:flex-start">${w.tag}</span><p class="h3" style="font-size:21px">${esc(w.t)}</p><p class="body" style="font-size:15px">${esc(w.d)}</p></a>`;
  function laptopInner(small) {
    const rows = [['Creator A', 'Beauty', 'Approved', '#0F2420', '#86E6D8'], ['Creator B', 'Lifestyle', 'In review', '#1C2230', '#D9C49A'], ['Creator C', 'Fitness', 'Brief sent', '#2A1B17', '#F5B49C'], ['Creator D', 'Food', 'Approved', '#0F2420', '#86E6D8']];
    return `<div class="lid"><div class="disp"><div class="app"><div class="sb"><i class="on"></i><i></i><i></i><i></i><i style="width:60%"></i></div><div class="mn"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:${small ? 8 : 12}px">Campaign tracker · sample data</b><span class="pill" style="background:#1C2230;color:#D9C49A">Week 3</span></div><div class="rw h"><span>CREATOR</span><span>NICHE</span><span>STATUS</span><span>FIT</span></div>${rows.slice(0, small ? 3 : 4).map((r, i) => `<div class="rw"><span>${r[0]}</span><span style="color:#8A909C">${r[1]}</span><span class="pill" style="background:${r[3]};color:${r[4]}">${r[2]}</span><span class="mono">${[92, 87, 74, 81][i]}</span></div>`).join('')}</div></div></div></div><div class="base"></div>`;
  }
  $('#workHome').innerHTML = WORK.slice(1, 4).map(workCard).join('');
  let wf = 'all';
  const wcats = [['all', 'All'], ['agency', 'Agency work'], ['tool', 'My tools'], ['plan', 'Planned']];
  function drawWork() { $('#workChips').innerHTML = wcats.map(([k, l]) => `<button type="button" class="chip" aria-pressed="${wf === k}" data-wf="${k}">${l}</button>`).join(''); $('#workGrid').innerHTML = WORK.filter((w) => wf === 'all' || w.k === wf).map(workCard).join(''); bindTilt($('#workGrid')); }
  $('#workChips').addEventListener('click', (e) => { const b = e.target.closest('[data-wf]'); if (b) { wf = b.dataset.wf; drawWork(); } });
  drawWork();
  $('#caseLaptop').innerHTML = laptopInner(false);

  /* packages */
  const PK = {
    ic: ['Influencer campaigns', [['Creator Shortlist Pilot', 0, 'Test creator fit before a full campaign.', ['Brief review', 'Fit-scored creator shortlist', 'Outreach templates'], 'A few weeks'], ['Campaign Sprint', 0, 'One campaign, run end to end.', ['Shortlist, briefs and fees', 'Approvals and posting schedule', 'Final report'], 'A few weeks'], ['Campaign Operations Desk', 1, 'Ongoing coordination of live campaigns.', ['Up to 16 hours a month', 'Approvals, tracking, follow-ups', 'Monthly report'], 'Monthly']]],
    tm: ['Talent management', [['Creator Profile Setup', 0, 'Get a creator ready to pitch.', ['Media kit', 'Rate card', 'Target brand list'], 'A few weeks'], ['Brand Pitch Sprint', 0, 'Pitch a creator to the right brands.', ['Pitches to selected brands', 'Campaign ideas per brand', 'Follow-ups'], 'A few weeks'], ['Talent Management', 1, 'Ongoing representation for a creator.', ['Brand pitching', 'Fee and usage-rights talks', 'Deliverables to going live'], 'Monthly']]],
    am: ['Account management', [['Account Health Check', 0, 'A fresh look at one client account.', ['Account and timeline review', 'Risk and upsell notes', 'Action plan'], 'A few days'], ['Launch Support', 0, 'Senior hands for one big launch.', ['Client point of contact', 'Approvals and quality control', 'Wrap-up report'], 'A few weeks'], ['Fractional Account Lead', 1, 'A senior account lead without a full hire.', ['Agreed hours each month', 'Client updates and approvals', 'Renewals and upsells'], 'Monthly']]],
    cu: ['Content and UGC', [['Single UGC video', 0, 'One format to try UGC.', ['Script and shot list', 'Three hooks, captions', '9:16 and 4:5'], 'Soon after the product arrives'], ['Content Set', 0, 'Videos or posts to test angles.', ['A set of videos or posts', 'Hooks and captions', 'One revision round'], 'A few weeks'], ['Monthly Content', 1, 'Fresh content every month.', ['Agreed pieces each month', 'Monthly idea call', 'Scheduling'], 'Monthly']]],
    to: ['Team and operations', [['Process Setup', 0, 'Trackers and SOPs for a busy team.', ['Workflow audit', 'Shared task and file system', 'Handover session'], 'A few weeks'], ['Team Setup Sprint', 0, 'Hire and onboard well.', ['Role and hiring plan', 'Onboarding and training plan', 'Daily check-in rhythm'], 'A few weeks'], ['Fractional Operations', 1, 'A senior coordinator without a full hire.', ['8 to 10 hours a month', 'Team coordination', 'Weekly check-in'], 'Monthly']]],
    ai: ['AI workflows', [['AI Workflow Pilot', 0, 'One small workflow, built and tested with you.', ['Workflow mapping', 'Human-checked build', 'Handover and guide'], 'A few weeks'], ['Creator Evaluation Workflow', 0, 'Score creators against your brief, consistently.', ['Scoring rules with you', 'Workflow build', 'Team training'], 'A few weeks'], ['Campaign Reporting Automation', 0, 'Reports that assemble themselves, checked by a human.', ['Report template', 'Data connection plan', 'Monthly run guide'], 'A few weeks']]]
  };
  window.BWV_PK = PK;
  const PRICES = { ic: ['From €490', 'Price on request', 'From €950 / month'], tm: ['Price on request', 'Price on request', 'Price on request'], am: ['Price on request', 'Price on request', 'Price on request'], cu: ['From €150', 'From €850', 'Price on request'], to: ['From €590', 'From €950', 'From €750 / month'], ai: ['From €390', 'From €1,250', 'From €1,450'] };
  window.BWV_PRICEOF = (id) => (PRICES[id.slice(0, 2)] || [])[+id.slice(2)] || 'Price on request';
  let pt = 'ic', open = true;
  function drawPk() {
    $('#pkgTabs').innerHTML = Object.entries(PK).map(([k, [n]]) => `<button type="button" class="chip" aria-pressed="${pt === k}" data-pt="${k}">${esc(n)}</button>`).join('');
    $('#pkgGrid').innerHTML = PK[pt][1].map(([n, m, w, items, time], j) => `<div class="card pkg" data-tilt><span class="kind">${m ? 'Per month' : 'One-time'}</span><p class="h3">${esc(n)}</p><p class="body">${esc(w)}</p><ul>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p class="mono" style="font-size:12.5px;color:var(--muted)">${esc(time)}</p><p class="price">${esc(window.BWV_PRICEOF(pt + j))}</p><a class="btn btn-pri" href="#contact" data-topic="${esc(PK[pt][0])}">Ask about this package</a></div>`).join('');
    $('#bookNote').hidden = false; bindTilt($('#pkgGrid'));
    $$('[data-book]').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.book === 'open') === open)));
  }
  $('#pkgTabs').addEventListener('click', (e) => { const b = e.target.closest('[data-pt]'); if (b) { pt = b.dataset.pt; drawPk(); } });
  $$('[data-book]').forEach((b) => b.addEventListener('click', () => { open = b.dataset.book === 'open'; drawPk(); }));
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-tab]'); if (a && PK[a.dataset.tab]) { pt = a.dataset.tab; drawPk(); } });
  drawPk();

  /* journey */
  const TL = [
    ['2017 to 2020', 'Bachelor of Mass Media, Journalism and Advertising', 'Pillai College, University of Mumbai', 'mum'],
    ['11/2019 to 07/2022', 'Founder, What\u2019s Next?', 'A trekking and travel start-up in Mumbai: planning, budgets, logistics, marketing', 'mum'],
    ['01/2021 to 07/2021', 'Social Media Marketing Executive', 'FashionTV India, Mumbai', 'mum'],
    ['07/2021 to 06/2022', 'Influencer Marketing Executive', 'White Rivers Media, Mumbai', 'mum'],
    ['06/2022 to 04/2023', 'Senior Influencer Marketing Executive', 'Pollen (Zoo Media), remote', 'remote'],
    ['04/2023 to 01/2024', 'Marketing Manager, Influencer Marketing and Client Servicing', 'Pollen (Zoo Media), remote. Promoted within 10 months', 'remote'],
    ['01/2024 to 07/2025', 'Senior Marketing Manager, Influencer Marketing and Client Servicing', 'Illuminati Media, remote', 'remote'],
    ['10/2025 to early 2027', 'MBA, International Business Consulting', 'Hochschule Offenburg', 'off'],
    ['01/2026 to now', 'Marketing Analytics and Content Manager, Working Student', 'Black Forest Business School, Hochschule Offenburg', 'off']
  ];
  const mapSvg = (id) => `<svg viewBox="0 0 800 500" role="img" aria-label="Illustrated route from Mumbai, India, to Offenburg, Germany"><defs><radialGradient id="gl${id}" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="var(--soft)"/><stop offset="1" stop-color="var(--card)"/></radialGradient><pattern id="dots${id}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="var(--line2)"/></pattern></defs><rect width="800" height="500" fill="url(#gl${id})"/><rect width="800" height="500" fill="url(#dots${id})" opacity=".7"/><path d="M110 120 C 160 90, 250 100, 290 140 S 330 210, 300 250 S 230 300, 260 340" fill="none" stroke="var(--line2)" stroke-width="1.5" opacity=".9"/><path d="M520 300 C 560 280, 640 290, 680 340 S 700 420, 640 440" fill="none" stroke="var(--line2)" stroke-width="1.5" opacity=".9"/><path class="route" d="M600 380 C 520 120, 330 80, 215 160" fill="none" stroke="var(--acc)" stroke-width="2.5" stroke-linecap="round"/><g class="pin" data-pin="mum"><circle class="p" cx="600" cy="380" r="7" fill="var(--acc)"/><circle cx="600" cy="380" r="16" fill="none" stroke="var(--acc)" opacity=".35"/><text x="622" y="386" font-family="Inter,sans-serif" font-size="18" font-weight="600" fill="var(--ink)">Mumbai</text><text x="622" y="406" font-family="JetBrains Mono,monospace" font-size="12" fill="var(--muted)">2017 to 2022</text></g><g class="pin" data-pin="off"><circle class="p" cx="215" cy="160" r="7" fill="var(--acc)"/><circle cx="215" cy="160" r="16" fill="none" stroke="var(--acc)" opacity=".35"/><text x="140" y="130" font-family="Inter,sans-serif" font-size="18" font-weight="600" fill="var(--ink)">Offenburg</text><text x="140" y="110" font-family="JetBrains Mono,monospace" font-size="12" fill="var(--muted)">2025 to now</text></g><text x="40" y="470" font-family="JetBrains Mono,monospace" font-size="12" fill="var(--muted)">REMOTE ROLES ARE NOT A CITY PIN</text></svg>`;
  const mh = $('#mapHome'); if (mh) mh.innerHTML = mapSvg('h');
  const ph = $('#passHome'); if (ph) ph.addEventListener('click', () => sfx('plane'));
  $('#tline').innerHTML = TL.map(([d, r, w, p], i) => `<button type="button" class="tl${i === TL.length - 1 ? ' on' : ''}" data-tl="${p}"><span class="d">${d}</span><span><b>${esc(r)}</b><span>${esc(w)}</span></span></button>`).join('');
  function pinOn(p) { $$('#mapJourney .pin').forEach((g) => g.classList.toggle('on', g.dataset.pin === p)); }
  pinOn('off');
  $('#tline').addEventListener('click', (e) => { const b = e.target.closest('.tl'); if (!b) return; $$('#tline .tl').forEach((x) => x.classList.toggle('on', x === b)); pinOn(b.dataset.tl); const k = $$('#tline .tl').indexOf(b); if (window.jmGo) window.jmGo(k >= 7 ? k + 1 : k); });

  /* learn */
  const TYPES = [['all', 'Everything'], ['guide', 'Guides'], ['project', 'Projects'], ['prompts', 'Prompts'], ['workflow', 'Workflows'], ['creator', 'Creator marketing'], ['built', 'Tools I built'], ['career', 'Career']];
  const TN = Object.fromEntries(TYPES);
  const LIB = (window.LIB || []).slice().sort((a, b) => a.r - b.r);
  const lcard = (g, i) => `<a class="lc c-${g.t}" href="#read-${g.s}"><span class="typ">${esc(TN[g.t] || g.t)}</span><b>${esc(g.ti)}</b><p>${esc(g.e)}</p><span class="m">${g.m ? esc(g.m) + ' MIN' : ''}${g.t === 'project' ? ' · 0 OF 6 STEPS' : ''}</span><span class="n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></a>`;
  const starts = [LIB.find((g) => g.s === 'claude-from-zero'), LIB.find((g) => g.t === 'project' && g.st), LIB.find((g) => g.t === 'prompts')].filter(Boolean);
  $('#startLearn').innerHTML = starts.map(lcard).join('');
  let lt = 'all', show = 12;
  function drawLib() {
    const q = $('#q').value.trim().toLowerCase(), tool = $('#tool').value;
    const list = LIB.filter((g) => (lt === 'all' || g.t === lt) && (tool === 'all' || (g.tools || []).includes(tool)) && (!q || (g.ti + ' ' + g.e).toLowerCase().includes(q)));
    $('#typeChips').innerHTML = TYPES.map(([k, l]) => `<button type="button" class="chip" aria-pressed="${lt === k}" data-lt="${k}">${l}</button>`).join('');
    $('#libGrid').innerHTML = list.slice(0, show).map(lcard).join('') || `<p class="body">Nothing matches that yet. Try a shorter word, or clear the filters.</p>`;
    $('#count').textContent = `SHOWING ${Math.min(show, list.length)} OF ${list.length}`;
    $('#more').hidden = list.length <= show;
  }
  $('#typeChips').addEventListener('click', (e) => { const b = e.target.closest('[data-lt]'); if (b) { lt = b.dataset.lt; show = 12; drawLib(); } });
  $('#q').addEventListener('input', () => { show = 12; drawLib(); }); $('#tool').addEventListener('change', drawLib);
  $('#more').addEventListener('click', () => { show += 12; drawLib(); });
  drawLib();
  $('#carousels').innerHTML = (window.CAR || []).map((c, i) => `<a href="#learn" class="card" data-tilt style="scroll-snap-align:start;flex:none;width:230px;aspect-ratio:4/5;display:flex;flex-direction:column;justify-content:space-between;background:${['var(--tp)', 'var(--tt)', 'var(--tc)'][i % 3]};border-color:transparent"><span class="mono" style="font-size:11px;color:var(--muted)">@buildwith.vish · ${c.n || 8} slides</span><b style="font-size:23px;letter-spacing:-.03em;line-height:1.1;color:${['var(--tpi)', 'var(--tti)', 'var(--tci)'][i % 3]}">${esc(c.ti)}</b><span class="mono" style="font-size:11px;color:var(--muted)">1 / ${c.n || 8}</span></a>`).join('');
  // AI tool finder
  const QZ = [['What do you want help with first?', [['Writing that sounds like me', 'write'], ['Learning a new AI from zero', 'learn'], ['Building something small', 'build']]], ['Which tools do you already use?', [['Google Docs and Gmail', 'gemini'], ['Microsoft or nothing yet', 'claude'], ['A bit of everything', 'multi']]]];
  const PICK = { write: ['Make AI write in your voice', 'A voice file and rules that keep AI copy sounding like you.'], learn: ['The complete Claude guide for beginners', 'From blank screen to useful in about twenty minutes.'], build: ['Build your own website with AI, no code', 'From idea to a live link you can share, in about an hour.'] };
  let qs = 0, qa = [];
  function drawQuiz() {
    const box = $('#quiz');
    if (qs < QZ.length) { const [q, opts] = QZ[qs]; box.innerHTML = `<p class="kick">AI tool finder · ${qs + 1} of ${QZ.length}</p><p class="h3" style="margin:10px 0 16px">${q}</p><div style="display:flex;flex-direction:column;gap:10px">${opts.map(([l, v]) => `<button type="button" class="chip" style="justify-content:flex-start;min-height:52px;border-radius:16px;font-size:15.5px" data-q="${v}">${l}</button>`).join('')}</div>`; }
    else { const [t, d] = PICK[qa[0]]; box.innerHTML = `<p class="kick">Your starting point</p><p class="h3" style="margin:10px 0 8px">${t}</p><p class="body">${d}</p><div class="btns" style="margin-top:18px"><a class="btn btn-pri" href="#read-${({ write: 'brand-voice-without-ai-sound', learn: 'claude-from-zero', build: 'build-website-no-code' })[qa[0]] || 'claude-from-zero'}">Open the guide</a><button type="button" class="btn btn-ghost" data-q="reset">Start again</button></div>`; }
  }
  $('#quiz').addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (!b) return; if (b.dataset.q === 'reset') { qs = 0; qa = []; } else { qa.push(b.dataset.q); qs++; } drawQuiz(); });
  drawQuiz();
  $('#nl').addEventListener('submit', async (e) => {
    e.preventDefault(); const v = $('#nlEmail').value.trim(), msg = $('#nlMsg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { msg.textContent = 'Enter an email address to join.'; return; }
    msg.textContent = 'Sending…'; let ok = false;
    ok = await window.bwvSend('newsletter', { email: v, page: '#learn' });
    msg.textContent = ok ? 'Nearly there: check your inbox and confirm your email.' : "That didn't go through. Try again in a minute.";
    if (ok) { $('#nlEmail').value = ''; sfx('chime'); }
  });

  /* resources */
  const RES = [['How AI edited my intro reel: the free tool stack', 'free', 'Guide, 10 minutes', 'The open-source tools and the five prompts behind my Week 1 reel.', 'EDIT'], ['Reduce friction: the setup before your first client', 'free', 'Guide and checklist, 10 minutes', 'Three Claude prompts that turn your CV into a freelance profile, a one-page portfolio and a 4-week plan.', 'FRICTION'], ['Shortlist creators with AI, not follower counts', 'free', 'Guide', 'What brands check before they pay a creator, and how to check it with AI.', ''], ['The AI edit brief', 'soon', '1 file, PDF and Markdown', 'The exact brief I paste into Claude Code to edit a talking-head reel.', ''], ['The Reel edit kit', 'soon', 'Templates, video walkthrough, PDF guide', 'Everything I use to have Claude edit my reels.', ''], ['7 clauses in creator contracts that quietly cost money', 'free', 'Guide', 'Read a brand deal like the brand’s lawyer does.', '']];
  const RES_HREF = ['/resources/ai-edit-stack', '/resources/reduce-friction', '#read-shortlist-creators-with-ai', '/resources/ai-edit-brief', '/resources/reel-edit-kit', '#read-creator-contract-red-flags'];
  $('#resGrid').innerHTML = RES.map(([t, tier, f, d, k], ri) => `<div class="card" data-tilt style="display:flex;flex-direction:column;gap:12px${tier === 'soon' ? ';border-style:dashed' : ''}"><div style="aspect-ratio:16/10;border-radius:16px;background:${tier === 'soon' ? 'var(--bg2)' : 'var(--tt)'};display:grid;place-items:center;position:relative;overflow:hidden"><div style="width:44%;aspect-ratio:3/4;border-radius:8px;background:var(--card);box-shadow:var(--sh2);transform:rotate(-4deg);display:flex;flex-direction:column;gap:6px;padding:12px"><i style="height:6px;width:70%;border-radius:3px;background:var(--acc)"></i><i style="height:5px;width:90%;border-radius:3px;background:var(--line2)"></i><i style="height:5px;width:80%;border-radius:3px;background:var(--line2)"></i><i style="height:5px;width:60%;border-radius:3px;background:var(--line2)"></i></div></div><span class="tag ${tier === 'soon' ? 't-plan' : 't-practice'}" style="align-self:flex-start">${tier === 'soon' ? 'COMING SOON' : 'FREE'}</span><p class="h3" style="font-size:21px">${esc(t)}</p><p class="body" style="font-size:15px">${esc(d)}</p><p class="mono" style="font-size:12px;color:var(--muted)">${esc(f)}${k ? ' · COMMENT ' + k + ' ON INSTAGRAM' : ''}</p><a class="btn ${tier === 'soon' ? 'btn-ghost' : 'btn-pri'}" href="${RES_HREF[ri]}">${tier === 'soon' ? 'See what\'s inside' : 'Open it, free'}</a></div>`).join('');

  /* forms: the Worker endpoint first, then Netlify Forms; true when the message arrived */
  window.bwvSend = async (name, data) => {
    try { const r = await fetch('/api/' + name, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (r.ok) return true; if (r.status !== 404 && r.status !== 405) return false; } catch (e) {}
    try { const f = new URLSearchParams({ 'form-name': name, 'bot-field': '' }); Object.entries(data).forEach(([k, v]) => f.set(k, String(v))); const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: f.toString() }); return r.ok; } catch (e) { return false; }
  };
  /* router */
  const TITLES = { home: 'Build with Vish', services: 'Services', ugc: 'UGC', packages: 'Packages', work: 'Selected work', case: 'Case study', journey: 'Journey', ai: 'Built with AI', read: 'Read', legal: 'Imprint and privacy', learn: 'Learn', guide: 'Claude guide', resources: 'Downloads and kits', about: 'About', contact: 'Contact' };
  let firstRoute = true, lastPt = [innerWidth / 2, innerHeight / 2];
  addEventListener('pointerdown', (e) => { lastPt = [e.clientX, e.clientY]; }, { passive: true });
  function route() {
    if (firstRoute || RM) { firstRoute = false; return render(); }
    const w = $('#wipe');
    w.style.setProperty('--x', lastPt[0] + 'px'); w.style.setProperty('--y', lastPt[1] + 'px');
    w.className = 'wipe'; void w.offsetWidth; w.classList.add('in'); sfx('whoosh');
    setTimeout(() => { render(); w.className = 'wipe in'; void w.offsetWidth; w.className = 'wipe out'; setTimeout(() => { w.className = 'wipe'; }, 520); }, 430);
  }
  function render() {
    const id = (location.hash || '#home').slice(1);
    if (id === 'main' && document.body.dataset.page) { history.replaceState(null, '', '#' + (document.body.dataset.page === 'read' ? 'learn' : document.body.dataset.page)); const m = document.getElementById('main'); if (m) m.focus(); return; }
    if (id === 'guide') { location.replace('#read-claude-from-zero'); return; }
    // old v1 addresses keep working
    const OLD = { guides: 'learn', projects: 'learn', start: 'learn', tools: 'learn', carousels: 'learn', newsletter: 'learn', partner: 'contact', portfolio: 'about', launch: 'read-launch-check', 'home-play': 'learn', 'home-quiz': 'learn', 'home-connect': 'contact' };
    const old = OLD[id] || (/^(guides-|c-|issue-)/.test(id) ? 'learn' : '');
    if (old) { location.replace('#' + old); return; }
    const page = /^read-[a-z0-9-]+$/.test(id) ? 'read' : TITLES[id] ? id : 'home';
    document.body.dataset.page = page;
    $$('.page').forEach((p) => p.classList.toggle('on', p.dataset.page === page));
    $$('[data-nav]').forEach((a) => (a.dataset.nav === page ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    document.title = page === 'home' ? 'Build with Vish' : TITLES[page] + ' · Build with Vish';
    closeAll(); root.style.scrollBehavior = 'auto'; window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); requestAnimationFrame(() => { root.style.scrollBehavior = ''; });
    if (page === 'home') { setTimeout(hello, 350); }
    if (jumpTo) { const el = document.getElementById(jumpTo); jumpTo = null; if (el) setTimeout(() => el.scrollIntoView(), 60); }
    if (page === 'read' && window.bwvRead) window.bwvRead(id.slice(5));
    countUp(); sigs(); curChap = -1; onScroll();
  }
  let jumpTo = null;
  $$('[data-jump]').forEach((a) => a.addEventListener('click', (e) => { const id = a.dataset.jump; if (location.hash === a.getAttribute('href')) { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); return; } jumpTo = id; }));
  addEventListener('hashchange', route);

  /* menus */
  function closeAll() { $$('.mega').forEach((m) => (m.hidden = true)); $$('[data-mega]').forEach((b) => b.setAttribute('aria-expanded', 'false')); $('#pmenu').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  $$('[data-mega]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); const m = document.getElementById(b.dataset.mega), was = !m.hidden; closeAll(); if (!was) { m.hidden = false; b.setAttribute('aria-expanded', 'true'); } }));
  document.addEventListener('click', (e) => { if (!e.target.closest('.mega') && !e.target.closest('[data-mega]')) $$('.mega').forEach((m) => (m.hidden = true)), $$('[data-mega]').forEach((b) => b.setAttribute('aria-expanded', 'false')); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAll(); closeChat(); } });
  $('#menuBtn').addEventListener('click', () => { $('#pmenu').hidden = false; $('#menuBtn').setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('#menuClose').focus(); });
  $('#menuClose').addEventListener('click', closeAll);
  $$('#pmenu a').forEach((a) => a.addEventListener('click', closeAll));

  /* sound hook for the 3D layer and the map; the glass highlight follows the pointer */
  function hello() {}
  window.bwvSfx = (k) => sfx(k);
  document.addEventListener('pointermove', (e) => { const g = e.target.closest && e.target.closest('.say,.glass'); if (!g) return; const r = g.getBoundingClientRect(); g.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); g.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%'); }, { passive: true });

  /* home: services stack */
  $('#stackHome').innerHTML = S6.map(([t, d, get, from, tab], i) => `<article class="sc" style="--i:${i}"><span class="big" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div style="position:relative"><span class="no">${String(i + 1).padStart(2, '0')} / 06</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="from">${from}</span><a class="btn btn-hard" href="#packages" data-tab="${tab}">Packages ${I.arrow}</a></div><ul aria-label="What you get">${get.map((g) => `<li>${esc(g)}</li>`).join('')}</ul></article>`).join('');

  /* UGC formats: shared by the home ring and the UGC page */
  const UGC = [
    { f: 'Product demo', n: 'Tech and apps', hook: 'I stopped losing receipts the day I found this app.', best: 'App install ads', len: '20 to 30 s', plat: 'Reels · TikTok', g: '#3A2A5E,#1B1838', beats: ['Hook: the lost-receipt moment', 'Problem: a pile of paper on the desk', 'Demo: snap, sort, done', 'Proof: the month view, filled in', 'Call to action: try it tonight'] },
    { f: 'Unboxing', n: 'Beauty and grooming', hook: 'Opening the serum my whole feed keeps talking about.', best: 'Launch week, organic', len: '30 to 45 s', plat: 'Reels · TikTok', g: '#B4532A,#2A1B17', beats: ['Hook: box in hand, first cut', 'Packaging and first look', 'Texture on the back of the hand', 'First honest reaction', 'Who it is for'] },
    { f: 'Problem to fix', n: 'Home', hook: 'If your mornings start with a tangled cable, watch this.', best: 'Paid ad testing', len: '15 to 25 s', plat: 'Reels · TikTok · Shorts', g: '#0A5E55,#0B1F1C', beats: ['Hook: the everyday annoyance', 'Why the usual fix fails', 'The product, in one move', 'The calm after', 'Call to action'] },
    { f: 'Review to camera', n: 'Food and drink', hook: 'Three things I check before I buy a coffee subscription.', best: 'Product page and retargeting', len: '30 to 60 s', plat: 'Reels · Shorts', g: '#6B4A2E,#1E1510', beats: ['Hook: the three checks', 'Check one: taste', 'Check two: price per cup', 'Check three: cancelling', 'Verdict and who it suits'] },
    { f: 'Voiceover', n: 'Travel', hook: 'Everything I pack for a three-day trek, in one bag.', best: 'Organic reach and saves', len: '30 to 45 s', plat: 'Reels · TikTok', g: '#2F6B8F,#0E1A24', beats: ['Hook: the full bag, top shot', 'Item by item, with voiceover', 'The one thing people forget', 'Bag closed, ready', 'Save this for later'] },
    { f: 'Before and after', n: 'Beauty and grooming', hook: 'Two weeks, same light, same camera.', best: 'Paid ads with proof', len: '15 to 30 s', plat: 'Reels · TikTok', g: '#8A3A6A,#24101D', beats: ['Hook: split screen', 'Day one, filmed honestly', 'The routine, in three steps', 'Day fourteen, same set-up', 'What changed and what did not'] },
    { f: 'Comparison', n: 'Tech and apps', hook: 'The cheap one or the expensive one? I tried both.', best: 'Consideration ads', len: '30 to 45 s', plat: 'Reels · Shorts', g: '#3A2A5E,#0D1016', beats: ['Hook: both, side by side', 'Round one: build', 'Round two: daily use', 'Round three: the small things', 'Which one I would buy'] },
    { f: 'App walkthrough', n: 'Tech and apps', hook: 'How I plan a whole week of content in twenty minutes.', best: 'App store and onboarding', len: '30 to 60 s', plat: 'Reels · TikTok · Shorts', g: '#15171C,#3A2A5E', beats: ['Hook: the finished week', 'Screen recording, step one', 'Step two, with my face in the corner', 'The shortcut nobody shows', 'Call to action'] },
    { f: 'Day in the life', n: 'Fashion', hook: 'One outfit, a full workday, three settings.', best: 'Brand awareness', len: '30 to 60 s', plat: 'Reels · TikTok', g: '#7A6A3A,#1D190E', beats: ['Hook: the outfit, top to toe', 'Morning: the commute', 'Midday: the meeting', 'Evening: dinner', 'Where to get it'] },
    { f: 'No-face B-roll', n: 'Food and drink', hook: 'No talking. Just the pour.', best: 'Product page loops', len: '8 to 15 s', plat: 'Reels · Shorts · web', g: '#4A2E1E,#120B07', beats: ['Hook: macro shot, first drop', 'Hands, product, steam', 'Slow pour', 'The finished cup', 'Logo, two seconds'] },
    { f: 'ASMR', n: 'Home', hook: 'The sound of a good notebook.', best: 'Organic reach', len: '15 to 30 s', plat: 'TikTok · Reels', g: '#2E2A36,#0B0A10', beats: ['Hook: the first page turn', 'Close-up textures', 'Pen on paper', 'Closing the cover', 'No talking, captions only'] },
    { f: 'Hook test pack', n: 'Any niche', hook: 'Same video, three openings, one winner.', best: 'A/B testing in ads', len: '3 hooks, 1 body', plat: 'Meta · TikTok ads', g: '#C79A1E,#2A2107', beats: ['Hook A: a question', 'Hook B: a statement', 'Hook C: show it first', 'One shared body', 'Run all three, keep the winner'] }
  ];
  const slotLabel = (i) => 'SLOT ' + String(i + 1).padStart(2, '0') + ' · TO FILM';

  /* home: 3D ring of phones you can turn */
  const ringIn = $('#ringIn'), ringEl = $('#ringHome'), ringN = 8, step = 360 / ringN;
  ringIn.innerHTML = UGC.slice(0, ringN).map((u, i) => phone({ cap: u.hook, slot: slotLabel(i), g: u.g, noPlay: true })).join('');
  const rPhones = $$('.phone', ringIn);
  let rot = 0, rDrag = null, rVel = 0, rRaf = 0, rAuto = !RM, rFront = -1;
  function radius() { const pw = rPhones[0].offsetWidth || 150; return Math.round((pw / 2) / Math.tan(Math.PI / ringN) + pw * .28); }
  let R = 0;
  function drawRing() {
    ringIn.style.transform = `translateZ(${-R}px) rotateY(${rot}deg)`;
    rPhones.forEach((p, i) => { const a = i * step, rel = ((a + rot) % 360 + 360) % 360, c = Math.cos(rel * Math.PI / 180); p.style.transform = `rotateY(${a}deg) translateZ(${R}px)`; p.style.opacity = (0.35 + 0.65 * Math.max(0, c)).toFixed(3); });
    const f = ((Math.round(-rot / step) % ringN) + ringN) % ringN;
    if (f !== rFront) { rFront = f; const u = UGC[f]; $('#ringNow').innerHTML = `<span>FRONT · ${slotLabel(f)}</span><b>${esc(u.f)}</b><span>BEST FOR ${esc(u.best.toUpperCase())} · ${esc(u.len.toUpperCase())}</span>`; if (rDrag) sfx('tick'); }
  }
  function ringLoop() { if (rAuto && !rDrag && document.body.dataset.page === 'home') { rot -= 0.08; drawRing(); } rRaf = requestAnimationFrame(ringLoop); }
  function ringTo(target) { const s = rot, t0 = performance.now(); const go = (t) => { const k = Math.min(1, (t - t0) / 600), e = 1 - Math.pow(1 - k, 3); rot = s + (target - s) * e; drawRing(); if (k < 1) requestAnimationFrame(go); }; requestAnimationFrame(go); }
  ringEl.addEventListener('pointerdown', (e) => { rDrag = { x: e.clientX, r: rot, t: performance.now(), moved: 0, id: e.pointerId }; rAuto = false; rVel = 0; });
  ringEl.addEventListener('pointermove', (e) => { if (!rDrag) return; const dx = e.clientX - rDrag.x; rDrag.moved = Math.max(rDrag.moved, Math.abs(dx)); if (rDrag.moved < 6) return; if (!rDrag.cap) { rDrag.cap = 1; try { ringEl.setPointerCapture(rDrag.id); } catch (er) {} ringEl.classList.add('grab'); } const now = performance.now(), nr = rDrag.r + dx * 0.45; rVel = (nr - rot) / Math.max(8, now - rDrag.t); rDrag.t = now; rot = nr; drawRing(); });
  const rEnd = () => { if (!rDrag) return; const moved = rDrag.moved; rDrag = null; ringEl.classList.remove('grab'); if (moved < 6) return; const target = Math.round((rot + rVel * 240) / step) * step; ringTo(target); };
  ringEl.addEventListener('pointerup', rEnd); ringEl.addEventListener('pointercancel', rEnd);
  $$('[data-ring]').forEach((b) => b.addEventListener('click', () => { rAuto = false; ringTo(Math.round(rot / step) * step - (+b.dataset.ring) * step); }));
  function sizeRing() { R = radius(); drawRing(); }
  addEventListener('resize', sizeRing); sizeRing(); if (!RM) rRaf = requestAnimationFrame(ringLoop);

  /* home: work showcase */
  $('#browserApp').innerHTML = laptopInner(false).replace(/^<div class="lid"><div class="disp">/, '').replace(/<\/div><\/div><div class="base"><\/div>$/, '');
  $('#showPhone').innerHTML = phone({ cap: 'Week 3 report: 4 creators live, 2 in review', slot: '', g: '#3A2A5E,#0D1016', noPlay: true });

  /* home: learn path picker (avi's "tell me where you're headed") */
  const GOALS = [['ai', 'use AI at work', (g) => g.t === 'guide' || g.t === 'prompts'], ['camp', 'run better creator campaigns', (g) => g.t === 'creator'], ['build', 'build my own tools', (g) => g.t === 'project' || g.t === 'built'], ['job', 'land a marketing job', (g) => g.t === 'career' || g.s === 'claude-from-zero' || (g.t === 'project' && /job|cv|linkedin/i.test(g.ti))]];
  let goal = 'ai';
  function drawGoal() {
    $('#goalHome').innerHTML = 'I want to ' + GOALS.map(([k, l], i) => `<button type="button" aria-pressed="${goal === k}" data-goal="${k}">${esc(l)}</button>`).join('<span class="sep"> / </span>');
    const fn = GOALS.find((g) => g[0] === goal)[2];
    $('#pathHome').innerHTML = LIB.filter(fn).slice(0, 4).map((g, i) => `<a class="pstep" style="--i:${i}" href="#read-${g.s}"><span class="pn">STEP ${String(i + 1).padStart(2, '0')}</span><b>${esc(g.ti)}</b><span class="m">${esc((TN[g.t] || g.t).toUpperCase())}${g.m ? ' · ' + g.m + ' MIN' : ''}</span></a>`).join('');
  }
  $('#goalHome').addEventListener('click', (e) => { const b = e.target.closest('[data-goal]'); if (b) { goal = b.dataset.goal; drawGoal(); } });
  drawGoal();

  /* UGC page: hero phone, filterable library, brief sheet, hook lab, raw vs edited */
  $('#ugcHeroPhone').innerHTML = phone({ cap: 'Showreel · 30 to 60 seconds', slot: 'SHOWREEL · TO FILM', g: '#4A3A73,#0D1016' });
  const FMTS = ['All formats', ...UGC.map((u) => u.f)], NICHES = ['All niches', ...[...new Set(UGC.map((u) => u.n))]];
  let fmt = 'All formats', niche = 'All niches';
  function drawLibU() {
    $('#fmtChips').innerHTML = FMTS.map((f) => `<button type="button" class="chip" aria-pressed="${fmt === f}" data-fmt="${esc(f)}">${esc(f)}</button>`).join('');
    $('#nicheChips').innerHTML = NICHES.map((f) => `<button type="button" class="chip" aria-pressed="${niche === f}" data-niche="${esc(f)}">${esc(f)}</button>`).join('');
    const list = UGC.map((u, i) => [u, i]).filter(([u]) => (fmt === 'All formats' || u.f === fmt) && (niche === 'All niches' || u.n === niche));
    $('#libCount').textContent = `SHOWING ${list.length} OF ${UGC.length} SLOTS`;
    $('#ugcLib').innerHTML = list.map(([u, i]) => `<button type="button" class="slotc" data-slot="${i}" aria-label="${esc(u.f)}, ${esc(u.n)}. Open the script outline"><span class="pwrap">${phone({ cap: u.hook, slot: slotLabel(i), g: u.g, noPlay: true })}</span><span class="row"><span class="f">${esc(u.f)}</span><span class="tag t-plan">${esc(u.n.toUpperCase())}</span></span><span class="hk">“${esc(u.hook)}”</span><span class="best"><b>Best for:</b> ${esc(u.best)}</span><span class="m">${esc(u.len.toUpperCase())} · ${esc(u.plat.toUpperCase())}</span></button>`).join('') || `<p class="empty">No slot for that mix yet. Try another niche, or <a class="link" href="#contact" style="display:inline">ask for it</a>.</p>`;
  }
  $('#fmtChips').addEventListener('click', (e) => { const b = e.target.closest('[data-fmt]'); if (b) { fmt = b.dataset.fmt; drawLibU(); } });
  $('#nicheChips').addEventListener('click', (e) => { const b = e.target.closest('[data-niche]'); if (b) { niche = b.dataset.niche; drawLibU(); } });
  drawLibU();
  let sheetFrom = null;
  function openSheet(i) {
    const u = UGC[i]; sheetFrom = document.activeElement;
    $('#sheetPhone').innerHTML = phone({ cap: u.hook, slot: slotLabel(i), g: u.g });
    $('#sheetK').textContent = `${u.n} · ${u.len} · ${u.plat}`; $('#sheetT').textContent = u.f;
    $('#sheetB').innerHTML = `Best for ${esc(u.best.toLowerCase())}. Planned hook: <span class="serif" style="font-size:1.1em">“${esc(u.hook)}”</span>`;
    $('#sheetBeats').innerHTML = u.beats.map((b) => `<li>${esc(b)}</li>`).join('');
    $('#sheet').hidden = false; document.body.style.overflow = 'hidden'; $('#sheetX').focus();
  }
  function closeSheet() { if ($('#sheet').hidden) return; $('#sheet').hidden = true; document.body.style.overflow = ''; if (sheetFrom) sheetFrom.focus({ preventScroll: true }); }
  $('#ugcLib').addEventListener('click', (e) => { const b = e.target.closest('[data-slot]'); if (b) openSheet(+b.dataset.slot); });
  $('#sheetX').addEventListener('click', closeSheet); $('#sheetGo').addEventListener('click', closeSheet);
  $('#sheet').addEventListener('click', (e) => { if (e.target === $('#sheet')) closeSheet(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });
  const HOOKS = [['A', 'A question', 'Why does café coffee taste better than mine?', 'Opens a loop the viewer wants closed. Good for cold audiences.'], ['B', 'A statement', 'One small change fixed my morning coffee.', 'A clear promise up front. Good for retargeting.'], ['C', 'Show it first', '(no words, starts on the pour)', 'The product does the talking. Good for sound-off feeds.']];
  let hk = 0;
  $('#labPhone').innerHTML = phone({ cap: '', slot: '', g: '#6B4A2E,#120B07', noPlay: true });
  const labScr = $('#labPhone .scr'); labScr.insertAdjacentHTML('beforeend', '<span class="tbar"><i></i></span><span class="sec3">0 to 3 s</span>');
  function drawHook() {
    $('#hookTabs').innerHTML = HOOKS.map(([k, t], i) => `<button type="button" class="chip" role="tab" aria-selected="${hk === i}" aria-pressed="${hk === i}" data-hk="${i}">Hook ${k} · ${esc(t)}</button>`).join('');
    const [k, t, line, why] = HOOKS[hk];
    $('#hookInfo').innerHTML = `<b>Hook ${k}: ${esc(t)}</b><p class="body">${esc(why)}</p>`;
    const cap = $('#labPhone .cap'); cap.style.opacity = 0; setTimeout(() => { cap.textContent = line; cap.style.opacity = 1; }, 180);
    const bar = $('#labPhone .tbar i'); bar.classList.remove('go'); void bar.offsetWidth; if (!RM) bar.classList.add('go');
  }
  $('#hookTabs').addEventListener('click', (e) => { const b = e.target.closest('[data-hk]'); if (b) { hk = +b.dataset.hk; drawHook(); } });
  drawHook();
  const rve = $('#rve'), rin = $('#rveIn');
  const setCut = () => { const v = +rin.value; rve.style.setProperty('--cut', v + '%'); rve.style.setProperty('--cutn', v / 100); };
  rin.addEventListener('input', setCut); setCut();

  /* home chapters: rail, dock progress, 3D tilt-in, stacked cards, reading reveal, Work devices in 3D */
  const home = $('[data-page="home"]'); let chaps = $$('[data-chap]', home);
  const rail = document.createElement('nav'); rail.className = 'rail'; rail.setAttribute('aria-label', 'Chapters on this page');
  rail.innerHTML = `<span class="fill" aria-hidden="true"></span><ol>${chaps.map((c, i) => `<li><button type="button" data-to="${i}" aria-label="Chapter ${i + 1}: ${esc(c.dataset.chap)}"><span class="dot"></span><span class="rl" aria-hidden="true"><b>${String(i + 1).padStart(2, '0')}</b>${esc(c.dataset.chap)}</span></button></li>`).join('')}</ol>`;
  document.body.appendChild(rail);
  let railBtns = $$('button', rail);
  rail.addEventListener('click', (e) => { const b = e.target.closest('[data-to]'); if (!b) return; const c = chaps[+b.dataset.to]; scrollTo({ top: Math.max(0, docTop(c) - 90), behavior: RM ? 'auto' : 'smooth' }); });
  const prog = document.createElement('span'); prog.className = 'dock-prog'; prog.setAttribute('aria-hidden', 'true'); $('.dock').appendChild(prog);
  let curChap = -1;
  function setChap(i) {
    curChap = i;
    railBtns.forEach((b, j) => b.setAttribute('aria-current', String(j === i)));
    railBtns.forEach((b) => { if (b !== railBtns[i]) { b.classList.remove('flash'); clearTimeout(b._f); } });
    const rb = railBtns[i]; if (!rb) return; rb.classList.add('flash'); clearTimeout(rb._f); rb._f = setTimeout(() => rb.classList.remove('flash'), 1800);
  }
  const docTop = (el) => { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; };
  const tilts = $$('.tilt3d', home), cards = $$('.sc', home), showDev = $('.show-dev');
  const sstep = (v) => { const e = Math.min(1, Math.max(0, v)); return e * e * (3 - 2 * e); };
  // split the letter into words for the reading reveal
  const rvs = RM ? [] : $$('.rv', home);
  rvs.forEach((p) => { p.innerHTML = p.textContent.split(/(\s+)/).map((w) => (/^\s+$/.test(w) ? w : `<span class="rw">${esc(w)}</span>`)).join(''); p._w = $$('.rw', p); p._k = 0; });
  const markWords = (p, words, cls) => { const ws = p._w; for (let i = 0; i <= ws.length - words.length; i++) { if (words.every((w, k) => ws[i + k].textContent.replace(/[,.]/g, '') === w)) { for (let k = 0; k < words.length; k++) ws[i + k].classList.add(cls); return; } } };
  if (rvs[0]) { markWords(rvs[0], ['850', 'creators'], 'mk'); markWords(rvs[0], ['work', 'actually', 'runs'], 'wv'); }
  if (rvs[1]) { markWords(rvs[1], ['vague', 'brief'], 'wv'); markWords(rvs[1], ['team', 'of', 'twelve'], 'mk'); }
  if (rvs[2]) markWords(rvs[2], ['shortlists', 'contracts', 'and', 'reports'], 'mk');
  if (rvs[3]) markWords(rvs[3], ['I', 'read', 'every', 'message', 'myself'], 'wv');
  let ticking = false;
  function frame() {
    ticking = false;
    if (document.body.dataset.page !== 'home') return;
    const vh = innerHeight, sy = scrollY, max = Math.max(1, document.documentElement.scrollHeight - vh), pp = Math.min(1, sy / max);
    // reads
    const tops = tilts.map((b) => docTop(b) - sy);
    let ci = 0; chaps.forEach((c, i) => { if (c.getBoundingClientRect().top < vh * .45) ci = i; });
    const crs = cards.map((c) => c.getBoundingClientRect());
    const prs = rvs.map((p) => p.getBoundingClientRect());
    const sdr = showDev.getBoundingClientRect();
    // writes
    prog.style.setProperty('--pp', pp.toFixed(4)); rail.style.setProperty('--pp', pp.toFixed(4));
    if (ci !== curChap) setChap(ci);
    if (!RM) tilts.forEach((b, i) => { const p = Math.min(1, Math.max(0, (tops[i] - vh * .1) / (vh * .9))); b.style.transform = p > .002 ? `perspective(1400px) rotateX(${(p * 22).toFixed(2)}deg) translateY(${(p * 70).toFixed(1)}px) scale(${(1 - p * .08).toFixed(4)})` : ''; });
    cards.forEach((c, i) => { const n = crs[i + 1]; const k = n ? Math.min(1, Math.max(0, 1 - (n.top - crs[i].top) / Math.max(1, crs[i].height))) : 0; c.style.setProperty('--k', (k * .35).toFixed(3)); c.style.transform = k > .002 && !RM ? `scale(${(1 - k * .05).toFixed(4)})` : ''; });
    if (!RM) { const q = sstep((vh - sdr.top) / (vh * .85)); showDev.style.transform = `perspective(1600px) rotateY(${((1 - q) * -30).toFixed(2)}deg) rotateX(${((1 - q) * 12).toFixed(2)}deg)`; showDev.style.setProperty('--pz', (q * 70).toFixed(1) + 'px'); }
    rvs.forEach((p, i) => { const r = prs[i], q = Math.min(1, Math.max(0, (vh * .92 - r.top) / (r.height + vh * .3))), k = Math.ceil(q * p._w.length * 1.2); if (k !== p._k) { p._w.forEach((w, j) => w.classList.toggle('on', j < k)); p._k = k; } });
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.bwvRail = () => {
    chaps = $$('[data-chap]', home).filter((c) => c.offsetParent !== null).sort((a, b) => docTop(a) - docTop(b));
    rail.innerHTML = `<span class="fill" aria-hidden="true"></span><ol>${chaps.map((c, i) => `<li><button type="button" data-to="${i}" aria-label="Chapter ${i + 1}: ${esc(c.dataset.chap)}"><span class="dot"></span><span class="rl" aria-hidden="true"><b>${String(i + 1).padStart(2, '0')}</b>${esc(c.dataset.chap)}</span></button></li>`).join('')}</ol>`;
    railBtns = $$('button', rail); curChap = -1; onScroll();
  };
  /* paths: the home page rearranges for brands, recruiters or learners, and remembers the choice */
  const LANES = {
    all: [['note', 'proof', 'logos', 'services', 'ugc', 'work', 'ai', 'tools', 'journey', 'learn'], []],
    brand: [['proof', 'logos', 'services', 'ugc', 'work', 'tools'], ['note', 'ai', 'journey', 'learn']],
    hiring: [['note', 'proof', 'logos', 'work', 'ai', 'journey', 'tools'], ['services', 'ugc', 'learn']],
    learn: [['learn', 'ai', 'note', 'tools'], ['proof', 'logos', 'services', 'ugc', 'work', 'journey']]
  };
  function setLane(l, go) {
    if (!LANES[l]) l = 'all';
    const [show, fold] = LANES[l], secs = $$('[data-sec]', home), more = $('.more-bar', home);
    secs.forEach((x) => { const k = x.dataset.sec; if (k === 'more') return; if (k === 'contact') { x.style.order = 99; return; } const o = show.indexOf(k); if (o >= 0) { x.style.order = o; x.classList.remove('folded'); } else { const f = fold.indexOf(k); x.style.order = 60 + Math.max(0, f); x.classList.add('folded'); } });
    more.style.order = 59; more.hidden = !fold.length;
    $$('.pcard,[data-lane="all"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lane === l)));
    store.set('bwv-lane', l); document.body.dataset.lane = l;
    window.bwvRail();
    if (go) { const first = secs.filter((x) => x.dataset.sec !== 'more' && !x.classList.contains('folded')).sort((a, b) => (+a.style.order) - (+b.style.order))[0]; if (first) setTimeout(() => scrollTo({ top: docTop(first) - 60, behavior: RM ? 'auto' : 'smooth' }), 60); }
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lane]:not(body)'); if (!b) return;
    if (b.dataset.lane === 'more') { $$('.folded', home).forEach((x) => x.classList.remove('folded')); $('.more-bar', home).hidden = true; window.bwvRail(); sfx('swell'); return; }
    setLane(b.dataset.lane, true); sfx('swell');
  });
  $$('[data-goto-paths]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); scrollTo({ top: docTop($('#paths')) - 10, behavior: RM ? 'auto' : 'smooth' }); }));
  if (window.IntersectionObserver) { const pio = new IntersectionObserver(([en]) => { if (en.isIntersecting) { $('#paths').classList.add('seen'); pio.disconnect(); } }, { threshold: .3 }); pio.observe($('#paths')); }
  setLane(store.get('bwv-lane') || 'all', false);
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);

  /* tilt */
  function bindTilt(scope = document) {
    if (!FINE || RM) return;
    $$('[data-tilt]', scope).forEach((el) => {
      if (el._t) return; el._t = 1;
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; el.style.setProperty('--ry', `${(px - .5) * 6}deg`); el.style.setProperty('--rx', `${(.5 - py) * 6}deg`); el.style.setProperty('--mx', `${px * 100}%`); el.style.setProperty('--my', `${py * 100}%`); el.style.setProperty('--sheen', 1); el.style.setProperty('--ty', '-3px'); });
      el.addEventListener('pointerleave', () => { ['--rx', '--ry', '--ty'].forEach((p) => el.style.setProperty(p, p === '--ty' ? '0px' : '0deg')); el.style.setProperty('--sheen', 0); });
    });
  }
  bindTilt();

  /* count up */
  function countUp() {
    if (RM) return;
    $$('.page.on [data-count]').forEach((el) => {
      const end = +el.dataset.count, suf = el.dataset.suffix || '';
      const io = new IntersectionObserver(([en]) => { if (!en.isIntersecting) return; io.disconnect(); const t0 = performance.now(); const tick = (t) => { const k = Math.min(1, (t - t0) / 1100), v = Math.round(end * (1 - Math.pow(1 - k, 3))); el.textContent = (end >= 1000 ? v.toLocaleString('en-GB') : v) + suf; if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, { threshold: .4 });
      io.observe(el);
    });
  }

  /* signature writes itself on when it comes into view */
  function sigs() {
    if (RM) return;
    $$('.page.on .sig').forEach((el) => {
      el.classList.remove('write');
      const io = new IntersectionObserver(([en]) => { if (!en.isIntersecting) return; io.disconnect(); void el.offsetWidth; el.classList.add('write'); }, { threshold: .6 });
      io.observe(el);
    });
  }

  /* copy */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => { const t = document.getElementById(b.dataset.copy).textContent; const done = () => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1600); }; if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, () => { const r = document.createRange(); r.selectNodeContents(document.getElementById(b.dataset.copy)); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = 'Selected, press copy'; }); }));
  $$('[data-proto]').forEach((b) => b.addEventListener('click', () => { const o = b.textContent; b.textContent = b.dataset.proto; setTimeout(() => (b.textContent = o), 1800); }));

  /* contact */
  $('#cform').addEventListener('submit', async (e) => {
    e.preventDefault(); let ok = true;
    [['cname', (v) => v.trim().length > 1], ['ctype', (v) => v], ['cgoal', (v) => v.trim().length > 3], ['cemail', (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())]].forEach(([id, test]) => { const f = document.getElementById(id), bad = !test(f.value); f.closest('.field').classList.toggle('bad', bad); f.setAttribute('aria-invalid', String(bad)); if (bad && ok) { f.focus(); ok = false; } });
    if (!ok || $('#cbot').value) return;
    const v = (id) => document.getElementById(id).value.trim(), msg = $('#cmsg'), btn = $('#cform button[type="submit"]');
    const body = { name: v('cname'), email: v('cemail'), topic: v('ctype'), message: v('cgoal') + '\n\nStart: ' + v('cwhen'), page: location.hash || '#contact' };
    btn.disabled = true; msg.textContent = 'Sending…';
    let sent = false;
    sent = await window.bwvSend('partner', body);
    btn.disabled = false;
    if (sent) { msg.textContent = 'Thanks, it reached my inbox. I reply within two working days.'; $('#cform').reset(); sfx('chime'); return; }
    const mail = 'mailto:vishwajeetkumbhar379@gmail.com?subject=' + encodeURIComponent('Hi Vish: ' + body.topic) + '&body=' + encodeURIComponent(body.message + '\n\n' + body.name);
    msg.innerHTML = 'The form is resting for a moment. <a class="link" href="' + mail + '">Send it by email instead</a> (it opens your mail app with everything filled in).';
  });
  document.addEventListener('click', (e) => { const a = e.target.closest('a[data-topic]'); if (!a) return; const sel = document.getElementById('ctype'); if (!sel) return; const t = a.dataset.topic; const o = [...sel.options].find((x) => x.text.startsWith(t.split(' ')[0])); if (o) sel.value = o.value || o.text; });

  /* assistant */
  const A = { 'What does Vish do for brands?': 'Creator partnerships, social content, UGC, operations support and human-checked AI workflows. The Packages page shows each scope. Want me to open it?', 'Where should I start learning AI?': 'Start with the complete Claude guide for beginners. It takes about 35 minutes and you can copy every prompt.', 'Is Vish open to full-time roles?': 'Yes. He is available full-time from January 2027, remote-first. His CV and LinkedIn are on the About page.' };
  function openChat() { $('#chat').hidden = false; $('#launch').setAttribute('aria-expanded', 'true'); }
  function closeChat() { $('#chat').hidden = true; $('#launch').setAttribute('aria-expanded', 'false'); }
  $('#chatClose').addEventListener('click', closeChat);

  /* sound: a calm generative bed (warm pad, room air, rare soft chimes) and soft UI sounds. Nothing plays until a tap. */
  let ac = null, on = false, master = null, verb = null, chimeT = 0;
  function impulse(sec) { const n = Math.floor(ac.sampleRate * sec), b = ac.createBuffer(2, n, ac.sampleRate); for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3); } return b; }
  /* The calm bed, generated here (no recordings, nothing borrowed): a low drone that never moves, an open chord that
     swells and fades at about six breaths a minute (0.1 Hz, the pace of slow, relaxed breathing), soft wave-like noise
     on a longer cycle, and now and then one felt-piano note. Warm and low; nothing sharp. */
  let curCh = 0;
  const CH = [[146.83, 220, 277.18, 329.63], [123.47, 185, 220, 293.66], [98, 146.83, 246.94, 293.66], [110, 164.81, 220, 277.18]];
  const NOTES = [[587.33, 739.99, 880], [493.88, 587.33, 739.99], [392, 493.88, 587.33], [440, 554.37, 659.25]];
  function buildAudio() {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
    ac = new C(); master = ac.createGain(); master.gain.value = 0;
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -30; comp.ratio.value = 3; master.connect(comp); comp.connect(ac.destination);
    verb = ac.createConvolver(); verb.buffer = impulse(6); const wet = ac.createGain(); wet.gain.value = .7; verb.connect(wet); wet.connect(master);
    const bed = ac.createGain(); bed.gain.value = .55; bed.connect(master); bed.connect(verb);
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 430; lp.Q.value = .2; lp.connect(bed);
    const lfo = ac.createOscillator(), lfoG = ac.createGain(); lfo.frequency.value = .011; lfoG.gain.value = 110; lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    // the breath: the chord swells for five seconds and fades for five
    const breathe = ac.createGain(); breathe.gain.value = .62; breathe.connect(lp);
    const br = ac.createOscillator(), brG = ac.createGain(); br.frequency.value = .1; brG.gain.value = .36; br.connect(brG); brG.connect(breathe.gain); br.start();
    const voices = CH[0].map((f, i) => { const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.detune.value = (i - 1.5) * 3; const g = ac.createGain(); g.gain.value = .024; o.connect(g); g.connect(breathe); o.start(); return o; });
    setInterval(() => { if (!on) return; curCh = (curCh + 1) % CH.length; voices.forEach((o, i) => o.frequency.setTargetAtTime(CH[curCh][i], ac.currentTime + i * .6, 7)); }, 28000);
    // the drone: D and A, low and steady, for a sense of ground
    [[73.42, .03], [110, .014]].forEach(([f, v]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.value = v; o.connect(g); g.connect(lp); o.start(); });
    // soft waves: brown noise, low-passed, rising and falling over about fourteen seconds
    const nb = ac.createBuffer(1, ac.sampleRate * 8, ac.sampleRate), nd = nb.getChannelData(0); let last = 0; for (let i = 0; i < nd.length; i++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; nd[i] = last * 3.5; }
    const ns = ac.createBufferSource(); ns.buffer = nb; ns.loop = true; const nf = ac.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = 360; nf.Q.value = .3;
    const wave = ac.createGain(); wave.gain.value = .022; const wl = ac.createOscillator(), wlG = ac.createGain(); wl.frequency.value = .07; wlG.gain.value = .018; wl.connect(wlG); wlG.connect(wave.gain); wl.start();
    ns.connect(nf); nf.connect(wave); wave.connect(bed); ns.start();
    return true;
  }
  // a felt-piano note: soft attack, long fade, mostly reverb
  function keys(f, vol, when = 0) { const t = ac.currentTime + when; [[1, 1], [2, .12]].forEach(([m, a]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = f * m; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol * a, t + .045); g.gain.exponentialRampToValueAtTime(.0001, t + 4.5 / m); o.connect(g); g.connect(verb); const d = ac.createGain(); d.gain.value = .45; g.connect(d); d.connect(master); o.start(t); o.stop(t + 4.8); }); }
  function bell(f, vol = .05, when = 0) { const t = ac.currentTime + when; [1, 2.76].forEach((m, k) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = f * m; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol / (k * 3 + 1), t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + 3 / (k + 1)); o.connect(g); g.connect(verb); g.connect(master); o.start(t); o.stop(t + 3.2); }); }
  function chimes() { clearTimeout(chimeT); if (!on) return; const n = NOTES[curCh]; keys(n[Math.floor(Math.random() * n.length)], .012); if (Math.random() < .3) keys(n[Math.floor(Math.random() * n.length)], .008, .9); chimeT = setTimeout(chimes, 11000 + Math.random() * 9000); }
  function sound() {
    if (!ac && !buildAudio()) return;
    on = !on; ac.resume(); master.gain.cancelScheduledValues(ac.currentTime); master.gain.setTargetAtTime(on ? .21 : 0, ac.currentTime, on ? 2.4 : .35);
    if (on) { chimeT = setTimeout(chimes, 5000); keys(587.33, .012, .3); } else clearTimeout(chimeT);
    $$('[data-sound]').forEach((b) => {
      b.setAttribute('aria-pressed', String(on));
      if (b.classList.contains('iconbtn')) { b.setAttribute('aria-label', on ? 'Sound on. Turn sound off' : 'Sound off. Turn sound on'); const w = b.querySelector('.w'); if (w) w.setAttribute('d', on ? 'M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13' : 'M22 9l-6 6M16 9l6 6'); }
      else if (b.classList.contains('fl-sound')) b.querySelector('span').textContent = on ? 'Sound on' : 'Play with sound';
      else b.textContent = on ? 'Sound on' : 'Sound off';
    });
  }
  $$('[data-sound]').forEach((b) => b.addEventListener('click', sound));
  // only meaningful moments make a sound; taps, ticks and hops stay silent
  const QUIET = { tick: 1, click: 1, hop: 1, sand: 1 };
  function sfx(kind) {
    if (!ac || !on || QUIET[kind]) return;
    const t = ac.currentTime;
    if (kind === 'whoosh' || kind === 'plane') {
      const len = kind === 'plane' ? 2.6 : .9, n = ac.createBufferSource(), buf = ac.createBuffer(1, Math.floor(ac.sampleRate * len), ac.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / d.length);
      n.buffer = buf; const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = .5; f.frequency.setValueAtTime(kind === 'plane' ? 220 : 300, t); f.frequency.exponentialRampToValueAtTime(kind === 'plane' ? 900 : 1100, t + len * .6);
      const g = ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(kind === 'plane' ? .07 : .03, t + len * .4); g.gain.exponentialRampToValueAtTime(.001, t + len);
      n.connect(f); f.connect(g); g.connect(master); g.connect(verb); n.start(t); n.stop(t + len);
    } else if (kind === 'swell') {
      [293.66, 440, 554.37].forEach((fq, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = fq; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.012, t + 1.4); g.gain.exponentialRampToValueAtTime(.0001, t + 3.6); o.connect(g); g.connect(verb); o.start(t + i * .12); o.stop(t + 3.8); });
    } else if (kind === 'chime') { keys(880, .016); keys(1174.66, .01, .35); }
    else if (kind === 'pop') keys(739.99, .012);
    else if (kind === 'land') keys(440, .012);
  }
  /* a visible response to every tap: the control presses in, and a soft ring opens where you touched */
  const TAPSEL = 'a,button,select,summary,label,.chip,.lc,.card,.pcard,.svc-c,.gh-c,.bl-r,.iph-app-i,.r3-c,.sw-c,[role="button"]';
  document.addEventListener('pointerdown', (e) => {
    if (RM || e.button > 0) return;
    const t = e.target.closest(TAPSEL); if (!t || t.closest('.buddy,.dt-sticky,.ring3d,.swst-cards')) return;
    const big = t.offsetWidth > 260 || t.offsetHeight > 160, c = big ? 'tapl' : 'taps';
    t.classList.remove('taps', 'tapl'); void t.offsetWidth; t.classList.add(c); setTimeout(() => t.classList.remove(c), 460);
    const r = document.createElement('i'); r.className = 'tap-ring' + (big ? ' big' : ''); r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; r.setAttribute('aria-hidden', 'true'); document.body.appendChild(r); setTimeout(() => r.remove(), 700);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (ac && on) document.hidden ? ac.suspend() : ac.resume(); });

  route();
})();
