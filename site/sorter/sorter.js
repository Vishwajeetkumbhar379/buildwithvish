/* Photo Sorter by Vish. Everything happens in this browser tab: no uploads, no tracking, no libraries. */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const S = { items: [], i: 0, history: [], pile: 'keep', scanning: 0 };
  const LABEL = { keep: 'Keep', maybe: 'Maybe', delete: 'Delete' };
  const NEXT = { keep: 'maybe', maybe: 'delete', delete: 'keep' };

  /* ---------- adding photos ---------- */
  const isImage = (f) => /^image\//.test(f.type) || /\.(jpe?g|png|webp|gif|heic|heif|avif|bmp|tiff?)$/i.test(f.name);
  function addFiles(list) {
    const seen = new Set(S.items.map((x) => x.key));
    const fresh = [...list].filter(isImage).map((file) => ({ file, name: file.name, key: file.name + '|' + file.size + '|' + file.lastModified, d: null, flags: [], sharp: null, hash: null, thumb: null, group: 0, best: false }))
      .filter((x) => !seen.has(x.key) && seen.add(x.key));
    if (!fresh.length) return toast(list.length ? 'Those are already here, or they are not photos.' : 'No photos found.');
    fresh.sort((a, b) => a.file.lastModified - b.file.lastModified || a.name.localeCompare(b.name));
    S.items.push(...fresh);
    show('work'); render(); scan(fresh);
  }

  /* ---------- looking at each photo: sharpness, brightness, a fingerprint for near copies ---------- */
  async function bitmap(file) {
    try { return await createImageBitmap(file); } catch (e) {}
    return new Promise((res) => { const im = new Image(), u = URL.createObjectURL(file); im.onload = () => { URL.revokeObjectURL(u); res(im); }; im.onerror = () => { URL.revokeObjectURL(u); res(null); }; im.src = u; });
  }
  function grey(src, w, h, crop) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d', { willReadFrequently: true }); if (crop) x.drawImage(src, crop[0], crop[1], crop[2], crop[3], 0, 0, w, h); else x.drawImage(src, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data, g = new Float32Array(w * h);
    for (let i = 0; i < g.length; i++) g[i] = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
    return g;
  }
  async function analyse(it) {
    const bm = await bitmap(it.file);
    if (!bm) { it.flags = ['No preview']; it.sharp = -1; return; }
    const sw = bm.width || bm.naturalWidth, sh = bm.height || bm.naturalHeight;
    /* look at the middle of the photo at a third of full size at most, so small blur still shows and small photos are not enlarged */
    const sc = Math.min(1, 1200 / Math.max(sw, sh)), cw = Math.min(sw, Math.round(384 / sc)), ch = Math.min(sh, Math.round(384 / sc)), w = Math.max(16, Math.round(cw * sc)), h = Math.max(16, Math.round(ch * sc));
    const g = grey(bm, w, h, [(sw - cw) / 2, (sh - ch) / 2, cw, ch]);
    /* blur: soften the photo again and see how much detail is lost. A sharp photo loses a lot, a blurry one barely changes. */
    const pass = (step, len, lines, stride) => { let f = 0, v = 0; const R = 4;
      for (let l = 0; l < lines; l++) { let pb = 0; for (let i = R; i < len - R; i++) { const k = l * stride + i * step; let sum = 0; for (let r = -R; r <= R; r++) sum += g[k + r * step];
        const bl = sum / 9; if (i > R) { const df = Math.abs(g[k] - g[k - step]), db = Math.abs(bl - pb); f += df; v += Math.max(0, df - db); } pb = bl; } }
      return f > 0 ? (f - v) / f : 1; };
    it.blur = Math.max(pass(1, w, h, w), pass(w, h, w, 1)); it.sharp = 1 - it.blur;
    const q = grey(bm, 9, 8); let a = 0, b = 0, lum = 0; for (let i = 0; i < q.length; i++) lum += q[i]; it.lum = lum / q.length;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { const bit = q[y * 9 + x] > q[y * 9 + x + 1] ? 1 : 0, k = y * 8 + x; if (k < 32) a |= bit << k; else b |= bit << (k - 32); }
    it.hash = [a >>> 0, b >>> 0];
    const t = document.createElement('canvas'); t.width = 160; t.height = Math.round(160 * sh / sw); t.getContext('2d').drawImage(bm, 0, 0, t.width, t.height);
    it.thumb = await new Promise((res) => t.toBlob((bl) => res(bl ? URL.createObjectURL(bl) : null), 'image/jpeg', 0.7));
    if (bm.close) bm.close();
  }
  const pop = (v) => { v = v - ((v >>> 1) & 0x55555555); v = (v & 0x33333333) + ((v >>> 2) & 0x33333333); return (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24; };
  const BLURRY = 0.62;
  const dist = (p, q) => pop(p[0] ^ q[0]) + pop(p[1] ^ q[1]);
  function judge() {
    const parent = S.items.map((_, i) => i), find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
    for (let i = 0; i < S.items.length; i++) { const a = S.items[i]; if (!a.hash) continue;
      for (let j = Math.max(0, i - 8); j < i; j++) { const b = S.items[j]; if (b.hash && dist(a.hash, b.hash) <= 6) parent[find(i)] = find(j); } }
    const groups = {}; S.items.forEach((x, i) => { (groups[find(i)] = groups[find(i)] || []).push(x); });
    let gid = 0;
    for (const x of S.items) { if (x.sharp === -1) continue; x.flags = []; x.group = 0; x.best = false;
      if (x.blur > BLURRY) x.flags.push('Looks blurry');
      if (x.lum < 28) x.flags.push('Very dark'); else if (x.lum > 232) x.flags.push('Very bright'); }
    Object.values(groups).filter((g) => g.length > 1).forEach((g) => { gid++; const top = g.reduce((m, x) => (x.sharp > m.sharp ? x : m), g[0]);
      g.forEach((x) => { x.group = gid; x.best = x === top; x.flags.push(x.best ? 'Sharpest of ' + g.length + ' near copies' : 'Near copy'); }); });
  }
  const obvious = () => S.items.filter((x) => !x.d && (x.flags.includes('Looks blurry') || x.flags.includes('Near copy')));
  async function scan(list) {
    S.scanning += list.length; let k = 0;
    const worker = async () => { while (k < list.length) { const it = list[k++]; await analyse(it); S.scanning--; if (S.scanning % 4 === 0) { judge(); meta(); } } };
    await Promise.all([worker(), worker(), worker()]);
    judge(); render();
  }

  /* ---------- sorting ---------- */
  let shown = null, shownUrl = null;
  function meta() {
    const done = S.items.filter((x) => x.d).length, it = S.items[S.i];
    $('barFill').style.width = (S.items.length ? (100 * done) / S.items.length : 0) + '%';
    $('pos').textContent = done + ' of ' + S.items.length + ' sorted';
    $('scan').textContent = S.scanning > 0 ? 'Checking ' + S.scanning + ' more…' : '';
    const n = obvious().length; $('bAuto').hidden = !n || S.scanning > 0; $('bAuto').textContent = 'Move ' + n + ' blurry or copied to Delete';
    $('badges').innerHTML = ''; if (it) it.flags.concat(it.d ? ['In ' + LABEL[it.d]] : []).forEach((f) => { const s = document.createElement('span'); s.className = 'badge'; s.textContent = f; $('badges').appendChild(s); });
  }
  function render() {
    const it = S.items[S.i]; if (!it) return;
    if (shown !== it) {
      if (shownUrl) URL.revokeObjectURL(shownUrl);
      shown = it; shownUrl = URL.createObjectURL(it.file);
      const img = $('photo'); img.hidden = false; $('noprev').hidden = true;
      img.onerror = () => { img.hidden = true; $('noprev').hidden = false; };
      img.src = shownUrl; $('name').textContent = it.name;
    }
    $('card').style.transform = ''; $('card').removeAttribute('data-go'); meta();
  }
  function decide(d) {
    const it = S.items[S.i]; if (!it) return;
    S.history.push({ i: S.i, was: it.d }); it.d = d;
    let j = -1; for (let k = 1; k <= S.items.length; k++) { const n = (S.i + k) % S.items.length; if (!S.items[n].d) { j = n; break; } }
    if (j < 0) { meta(); return openReview(); }
    S.i = j; render();
  }
  function undo() { const h = S.history.pop(); if (!h) return toast('Nothing to undo.'); S.items[h.i].d = h.was; S.i = h.i; show('work'); render(); }
  function auto() { const list = obvious(); list.forEach((x) => { x.d = 'delete'; }); toast(list.length + ' moved to Delete. Check them in the review.');
    if (S.items[S.i].d) { const j = S.items.findIndex((x) => !x.d); if (j < 0) return openReview(); S.i = j; } render(); }

  /* ---------- review ---------- */
  function openReview() { show('review'); drawReview(); }
  function drawReview() {
    document.querySelectorAll('.tab').forEach((t) => { const p = t.dataset.pile, n = S.items.filter((x) => x.d === p).length; t.textContent = LABEL[p] + ' · ' + n; t.setAttribute('aria-selected', String(p === S.pile)); });
    const g = $('grid'); g.innerHTML = ''; const list = S.items.filter((x) => x.d === S.pile);
    if (!list.length) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = 'Nothing in ' + LABEL[S.pile] + ' yet.'; g.appendChild(p); }
    list.forEach((x) => { const b = document.createElement('button'); b.type = 'button'; b.title = x.name + '. Tap to move to ' + LABEL[NEXT[x.d]];
      if (x.thumb) { const im = document.createElement('img'); im.src = x.thumb; im.alt = x.name; im.loading = 'lazy'; b.appendChild(im); }
      if (x.flags.length) { const s = document.createElement('span'); s.className = 'dot'; s.textContent = x.flags[0]; b.appendChild(s); }
      b.onclick = () => { x.d = NEXT[x.d]; drawReview(); }; g.appendChild(b); });
    const left = S.items.filter((x) => !x.d).length; $('bBack').textContent = left ? 'Back to sorting (' + left + ' left)' : 'Back to sorting';
  }

  /* ---------- download: a plain zip written here, the originals byte for byte ---------- */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(u8) { let c = 0xffffffff; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  async function zip(items, folder) {
    const enc = new TextEncoder(), parts = [], central = []; let off = 0; const used = new Set();
    for (const it of items) {
      let nm = it.name; for (let k = 2; used.has(nm.toLowerCase()); k++) nm = it.name.replace(/(\.[^.]*)?$/, ' (' + k + ')$1'); used.add(nm.toLowerCase());
      const name = enc.encode(folder + '/' + nm), crc = crc32(new Uint8Array(await it.file.arrayBuffer())), size = it.file.size, dt = new Date(it.file.lastModified);
      const time = (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >> 1), date = ((Math.max(1980, dt.getFullYear()) - 1980) << 9) | ((dt.getMonth() + 1) << 5) | dt.getDate();
      const lh = new DataView(new ArrayBuffer(30)); lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(10, time, true); lh.setUint16(12, date, true);
      lh.setUint32(14, crc, true); lh.setUint32(18, size, true); lh.setUint32(22, size, true); lh.setUint16(26, name.length, true);
      parts.push(lh.buffer, name, it.file);
      const ch = new DataView(new ArrayBuffer(46)); ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(12, time, true); ch.setUint16(14, date, true);
      ch.setUint32(16, crc, true); ch.setUint32(20, size, true); ch.setUint32(24, size, true); ch.setUint16(28, name.length, true); ch.setUint32(42, off, true);
      central.push(ch.buffer, name); off += 30 + name.length + size;
    }
    const csize = central.reduce((n, p) => n + p.byteLength, 0), end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, items.length, true); end.setUint16(10, items.length, true); end.setUint32(12, csize, true); end.setUint32(16, off, true);
    return new Blob([...parts, ...central, end.buffer], { type: 'application/zip' });
  }
  async function downloadKeepers() {
    const list = S.items.filter((x) => x.d === 'keep'); if (!list.length) return toast('The Keep pile is empty.');
    if (list.reduce((n, x) => n + x.file.size, 0) > 3.5e9) return toast('That is over 3.5 GB. Download it in two halves.');
    const b = $('bZip'), label = b.textContent; b.disabled = true; b.textContent = 'Packing ' + list.length + ' photos…';
    try { const blob = await zip(list, 'Keepers'), a = $('dl'); a.href = URL.createObjectURL(blob); a.download = 'keepers.zip'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 60000); toast(list.length + ' photos packed. Your originals are untouched.'); }
    catch (e) { toast('Could not pack the zip. Try fewer photos at once.'); }
    b.disabled = false; b.textContent = label;
  }
  async function copyList() {
    const names = S.items.filter((x) => x.d === 'delete').map((x) => x.name); if (!names.length) return toast('The Delete pile is empty.');
    try { await navigator.clipboard.writeText(names.join('\n')); toast(names.length + ' file names copied.'); } catch (e) { toast('Copy was blocked by the browser.'); }
  }

  /* ---------- screens, keys, swipes ---------- */
  function show(id) { ['start', 'work', 'review'].forEach((s) => { $(s).hidden = s !== id; }); }
  let tt; function toast(msg) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => { t.hidden = true; }, 3200); }
  $('btnPick').onclick = () => $('pick').click();
  $('bMore').onclick = () => $('pick').click();
  $('pick').onchange = (e) => { addFiles(e.target.files); e.target.value = ''; };
  $('bKeep').onclick = () => decide('keep'); $('bMaybe').onclick = () => decide('maybe'); $('bDelete').onclick = () => decide('delete');
  $('bUndo').onclick = undo; $('bAuto').onclick = auto; $('bReview').onclick = openReview; $('bZip').onclick = downloadKeepers; $('bList').onclick = copyList;
  $('bBack').onclick = () => { const j = S.items.findIndex((x) => !x.d); if (j >= 0) S.i = j; show('work'); render(); };
  document.querySelectorAll('.tab').forEach((t) => { t.onclick = () => { S.pile = t.dataset.pile; drawReview(); }; });
  ['dragenter', 'dragover'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); $('drop').classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); $('drop').classList.remove('over'); }));
  document.addEventListener('drop', (e) => { if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });
  document.addEventListener('keydown', (e) => {
    if ($('work').hidden || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase(), d = { arrowright: 'keep', k: 'keep', arrowup: 'maybe', m: 'maybe', arrowleft: 'delete', d: 'delete' }[k];
    if (d) { e.preventDefault(); decide(d); } else if (k === 'z' || k === 'backspace') { e.preventDefault(); undo(); }
  });
  const card = $('card'); let p0 = null;
  const lean = (dx, dy) => (dy < -90 && Math.abs(dx) < 80 ? 'maybe' : dx > 90 ? 'keep' : dx < -90 ? 'delete' : null);
  card.addEventListener('pointerdown', (e) => { p0 = { x: e.clientX, y: e.clientY }; card.setPointerCapture(e.pointerId); });
  card.addEventListener('pointermove', (e) => { if (!p0) return; const dx = e.clientX - p0.x, dy = e.clientY - p0.y; card.style.transform = 'translate(' + dx + 'px,' + Math.min(0, dy) + 'px) rotate(' + dx / 28 + 'deg)';
    const g = lean(dx, dy); if (g) card.dataset.go = g; else card.removeAttribute('data-go'); });
  const up = (e) => { if (!p0) return; const g = lean(e.clientX - p0.x, e.clientY - p0.y); p0 = null; if (g) decide(g); else { card.style.transform = ''; card.removeAttribute('data-go'); } };
  card.addEventListener('pointerup', up); card.addEventListener('pointercancel', () => { p0 = null; card.style.transform = ''; card.removeAttribute('data-go'); });
  window.addEventListener('beforeunload', (e) => { if (S.items.some((x) => x.d)) { e.preventDefault(); e.returnValue = ''; } });
  window.__sorter = S; /* for tests */
})();
