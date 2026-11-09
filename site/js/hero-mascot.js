/* Build with Vish 2.0 prototype: the opening.
   1. The real Build with Vish logo zooms in and turns once.
   2. It breaks into dust where it stands, and the dust gathers into Vish's avatar (his original render, uncut).
   3. Scrolling glides the avatar to the right of "Build with Vish", then bursts it into particles.
   4. The particles gather at one spot, and the full-body Vish pops out there and waves (buddy.js takes over).
   Touch the avatar and the dust scatters, then settles back. */
(() => {
  'use strict';
  const root = document.getElementById('dots'); if (!root) return;
  const stage = root.querySelector('.dt-stage'), sticky = root.querySelector('.dt-sticky'), copy = root.querySelector('.dt-beat'), logo = root.querySelector('.dt-logo');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const io = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const sfx = (k) => { if (window.bwvSfx) window.bwvSfx(k); };
  const docTop = (e) => { let y = 0; while (e) { y += e.offsetTop; e = e.offsetParent; } return y; };
  const progress = () => (RM ? 0 : clamp((scrollY - docTop(root)) / Math.max(1, root.offsetHeight - innerHeight)));
  // the crisp logo: zoom in, one turn, then it gives way to the dust
  function logoAt(e) {
    if (!logo) return;
    const k1 = ss(0, .55, e), k2 = io(clamp((e - .55) / 1.1)), k3 = ss(1.6, 1.95, e);
    logo.style.opacity = (k1 * (1 - k3)).toFixed(3);
    logo.style.transform = `translate(-50%,-50%) perspective(1100px) rotateY(${(k2 * 360).toFixed(2)}deg) scale(${(.62 + .38 * k1).toFixed(3)})`;
    logo.style.filter = `blur(${((1 - k1) * 10 + k3 * 4).toFixed(2)}px)`;
    logo.style.visibility = k1 * (1 - k3) > .003 ? 'visible' : 'hidden';
  }
  const fallback = () => {
    root.classList.add('nogl');
    if (!logo) return; const t0 = performance.now();
    (function f(t) { const e = RM ? 9 : (t - t0) / 1000; logoAt(Math.min(e, 1.55)); if (e < 1.55) requestAnimationFrame(f); })(t0);
  };
  if (typeof THREE === 'undefined') { fallback(); return; }
  let r; try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { fallback(); return; }
  r.setPixelRatio(Math.min(2, devicePixelRatio || 1)); r.domElement.setAttribute('aria-hidden', 'true'); stage.appendChild(r.domElement);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, .1, 100); cam.position.set(0, 0, 6);
  const UNIT = 2 * 6 * Math.tan(15 * Math.PI / 180); // world units across the stage height at z = 0
  const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const pix = (img) => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return { d: x.getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height }; };

  // the logo drawn exactly where the crisp one sits, so the dust starts as the logo
  function logoPoints(n) {
    const sr = stage.getBoundingClientRect(), W = Math.round(sr.width), Hh = Math.round(sr.height);
    const c = document.createElement('canvas'); c.width = W; c.height = Hh; const x = c.getContext('2d');
    const prev = logo.style.transform; logo.style.transform = 'translate(-50%,-50%)';
    const ic = logo.querySelector('svg').getBoundingClientRect(), parts = [...logo.querySelectorAll('.dl-t > span')];
    const ix = ic.left - sr.left, iy = ic.top - sr.top, s = ic.width / 30;
    x.save(); x.translate(ix, iy); x.scale(s, s);
    x.fillStyle = '#4A3A73'; x.beginPath(); x.roundRect ? x.roundRect(0, 0, 30, 30, 9) : x.rect(0, 0, 30, 30); x.fill();
    x.translate(15, 15); x.rotate(Math.PI / 4); x.strokeStyle = '#F3EEE4'; x.lineWidth = 2.2; x.strokeRect(-8, -8, 16, 16); x.rotate(-Math.PI / 4);
    x.fillStyle = '#E2C58E'; x.beginPath(); x.arc(0, 0, 2.6, 0, Math.PI * 2); x.fill(); x.restore();
    parts.forEach((p) => { const cs = getComputedStyle(p), pr = p.getBoundingClientRect(); x.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; x.fillStyle = cs.color; x.textBaseline = 'alphabetic'; const m = x.measureText(p.textContent); x.fillText(p.textContent, pr.left - sr.left, pr.top - sr.top + (pr.height + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2); });
    logo.style.transform = prev;
    const d = x.getImageData(0, 0, W, Hh).data, cand = [];
    for (let j = 0; j < Hh; j += 1) for (let i = 0; i < W; i += 1) { const k = (j * W + i) * 4; if (d[k + 3] > 110) cand.push(i, j, d[k], d[k + 1], d[k + 2]); }
    const m = cand.length / 5, k = UNIT / Hh, out = [], col = [];
    if (!m) return null;
    for (let q = 0; q < n; q++) { const z = Math.floor(Math.random() * m) * 5; out.push((cand[z] + Math.random() - .5 - W / 2) * k, (Hh / 2 - cand[z + 1] + Math.random() - .5) * k, (Math.random() - .5) * .02); col.push(cand[z + 2] / 255, cand[z + 3] / 255, cand[z + 4] / 255); }
    return { out, col };
  }

  let D = null;
  const ready = Promise.all([load('img/mascot-dots.png'), document.fonts ? document.fonts.ready : Promise.resolve()]);
  ready.then(([m]) => {
    const M = pix(m), P = [], C = [], R = [];
    const S = 2.9 / M.h;
    for (let j = 0; j < M.h; j++) for (let i = 0; i < M.w; i++) { const k = (j * M.w + i) * 4; if (M.d[k + 3] > 120) { P.push((i - M.w / 2) * S, (M.h / 2 - j) * S, 0); C.push(M.d[k] / 255, M.d[k + 1] / 255, M.d[k + 2] / 255); } }
    const N = P.length / 3;
    size();
    const L = logoPoints(N) || { out: P.slice(), col: C.slice() };
    for (let n = 0; n < N; n++) R.push(Math.random());
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute('aLogo', new THREE.Float32BufferAttribute(L.out, 3));
    geo.setAttribute('aCol', new THREE.Float32BufferAttribute(C, 3));
    geo.setAttribute('aLc', new THREE.Float32BufferAttribute(L.col, 3));
    geo.setAttribute('aRnd', new THREE.Float32BufferAttribute(R, 1));
    const off = new Float32Array(N * 3), offA = new THREE.BufferAttribute(off, 3); offA.setUsage(THREE.DynamicDrawUsage); geo.setAttribute('aOff', offA);
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uMorph: { value: 0 }, uIn: { value: 0 }, uDust: { value: 0 }, uBurst: { value: 0 }, uGather: { value: 0 }, uTgt: { value: new THREE.Vector3() }, uSize: { value: 4 }, uT: { value: 0 } },
      vertexShader: [
        'attribute vec3 aLogo; attribute vec3 aCol; attribute vec3 aLc; attribute float aRnd; attribute vec3 aOff;',
        'uniform float uMorph, uIn, uDust, uBurst, uGather, uSize, uT; uniform vec3 uTgt; varying vec3 vC; varying float vA;',
        'void main(){',
        '  vec3 dir = normalize(vec3(sin(aRnd * 91.7), cos(aRnd * 53.3), sin(aRnd * 17.9)));',
        '  vec3 L = aLogo + dir * uDust * (.03 + aRnd * .09);',
        '  float k = smoothstep(aRnd * .45, aRnd * .45 + .55, uMorph);',
        '  vec3 swirl = dir * sin(3.14159 * k) * (.55 + aRnd * .8);',
        '  vec3 p = mix(L, position + aOff, k) + swirl;',
        '  p += vec3(sin(uT * .9 + aRnd * 40.), cos(uT * .7 + aRnd * 30.), 0.) * .006 * k;',
        '  float b = smoothstep(aRnd * .3, aRnd * .3 + .7, uBurst);',
        '  p += dir * b * (2.2 + aRnd * 6.) + vec3(0., b * b * (aRnd - .3) * 2., 0.);',
        '  float g = smoothstep(aRnd * .35, aRnd * .35 + .65, uGather);',
        '  p = mix(p, uTgt + dir * (.04 + aRnd * .16) * (1. - g * .7), g);',
        '  vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;',
        '  vC = mix(mix(aLc, aCol, k), vec3(.91, .85, .7), g * .6);',
        '  vA = uIn * (1. - b * .7 * (1. - g)) * (1. - smoothstep(.86, 1., uGather));',
        '  gl_PointSize = uSize * mix(1.05, 1., k) * (1. + b * 1.1 * (1. - g)) * (1. - g * .45) * (6. / -mv.z);',
        '}'].join('\n'),
      fragmentShader: 'varying vec3 vC; varying float vA; void main(){ vec2 q = gl_PointCoord - .5; float d = length(q); if (d > .5) discard; gl_FragColor = vec4(vC, smoothstep(.5, .3, d) * vA); }'
    });
    const pts = new THREE.Points(geo, mat); scene.add(pts);
    D = { N, base: P, off, offA, vel: new Float32Array(N * 3), mat, pts, t0: performance.now() };
    root.classList.add('live'); sfx('swell');
  }).catch(() => fallback());

  // touch: the dust runs from the finger and settles back
  const ptr = { x: 99, y: 99, on: false, last: 0 };
  const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3(), ndc = new THREE.Vector2();
  let lastS = 0;
  ['pointermove', 'pointerdown'].forEach((ty) => sticky.addEventListener(ty, (e) => {
    if (!D) return; const b = r.domElement.getBoundingClientRect(); ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(ndc, cam);
    if (ray.ray.intersectPlane(plane, hit)) { const sc = D.pts.scale.x; ptr.x = (hit.x - D.pts.position.x) / sc; ptr.y = (hit.y - D.pts.position.y) / sc; ptr.on = true; ptr.last = performance.now(); }
    if (ty === 'pointerdown' || (e.pointerType !== 'mouse' && performance.now() - lastS > 160)) { lastS = performance.now(); sfx('sand'); }
  }, { passive: true }));
  sticky.addEventListener('pointerleave', () => { ptr.on = false; });

  let Wd = 0, Ht = 0, vis = true, burstOn = false, introDone = false, turned = false, dusted = false;
  function size() { const w = stage.clientWidth, h = stage.clientHeight; if (w === Wd && h === Ht) return; Wd = w; Ht = h; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(root);
  const tgt = new THREE.Vector3();
  function frame(t) {
    requestAnimationFrame(frame);
    if (!vis || document.body.dataset.page !== 'home') return;
    size(); if (!D) return;
    const p = progress(), wide = Wd / Math.max(1, Ht) > 1.05;
    // the opening, by time: logo in, one turn, dust, avatar
    const e = RM ? 9 : (t - D.t0) / 1000, u = D.mat.uniforms;
    logoAt(e);
    if (e > .55 && !turned) { turned = true; sfx('whoosh'); }
    if (e > 1.6 && !dusted) { dusted = true; sfx('sand'); }
    u.uIn.value = ss(1.55, 1.85, e); u.uDust.value = ss(1.55, 1.95, e) * (1 - ss(1.95, 2.6, e)); u.uMorph.value = ss(1.9, 3.3, e); u.uT.value = t * .001;
    if (e > 3.3 && !introDone) { introDone = true; root.classList.add('ready'); }
    // scroll: glide to the right of the title, burst, then gather where the full-body Vish appears
    const g = ss(.02, .3, p), bst = ss(.5, .7, p), gat = ss(.68, .9, p);
    if (wide) { D.pts.position.set(g * 1.45, -.02, 0); D.pts.scale.setScalar(1 - g * .12); } else { D.pts.position.set(0, -g * .7, 0); D.pts.scale.setScalar(1 - g * .3); }
    u.uBurst.value = bst; u.uGather.value = gat;
    if (gat > 0 && window.bwvBuddyRest) {
      const b = window.bwvBuddyRest(), sr = stage.getBoundingClientRect(), k = UNIT / Ht;
      tgt.set((b.x + b.w / 2 - sr.left - Wd / 2) * k, (Ht / 2 - (b.y + b.h * .55 - sr.top)) * k, 0);
      u.uTgt.value.copy(tgt).sub(D.pts.position).divideScalar(D.pts.scale.x);
    }
    u.uSize.value = 2.05 * Math.min(2, devicePixelRatio || 1) * (Ht / 820) * (wide ? 1 : .9);
    if (bst > .02 && !burstOn) { burstOn = true; sfx('whoosh'); } if (bst < .01) burstOn = false;
    // touch physics once the avatar has formed
    if (introDone && bst < .02) {
      const o = D.off, v = D.vel, b = D.base, R2 = .1, act = ptr.on && performance.now() - ptr.last < 1200;
      for (let i = 0; i < D.N; i++) { const k = i * 3, px = b[k] + o[k], py = b[k + 1] + o[k + 1]; let fx = -o[k] * .055, fy = -o[k + 1] * .055; if (act) { const dx = px - ptr.x, dy = py - ptr.y, d2 = dx * dx + dy * dy; if (d2 < R2) { const f = (1 - d2 / R2) * .06 / Math.sqrt(d2 + .0004); fx += dx * f; fy += dy * f; } } v[k] = (v[k] + fx) * .86; v[k + 1] = (v[k + 1] + fy) * .86; o[k] += v[k]; o[k + 1] += v[k + 1]; }
      D.offA.needsUpdate = true;
    }
    r.render(scene, cam);
    // words fade in as the avatar moves aside
    const o = RM ? 1 : ss(.03, .2, p) * (1 - ss(.9, 1, p));
    if (copy) { copy.style.opacity = o.toFixed(3); copy.style.transform = `translateY(${((1 - o) * 18).toFixed(1)}px)`; copy.style.visibility = o > .01 ? 'visible' : 'hidden'; }
    root.classList.toggle('moved', p > .02);
    // the full-body Vish takes over once the dust has gathered
    document.body.classList.toggle('buddy-on', p > .885 || scrollY > docTop(root) + root.offsetHeight - innerHeight);
    document.body.classList.toggle('in-hero', p < .97 && scrollY < docTop(root) + root.offsetHeight - innerHeight * .3);
    document.body.classList.toggle('hero-night', p < .97);
  }
  requestAnimationFrame(frame);
})();
