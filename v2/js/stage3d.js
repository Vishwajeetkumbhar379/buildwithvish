/* Build with Vish 2.0 prototype: the 3D layer.
   1. The hero bust: Vish's original chest-up render, turned toward the pointer with a depth map (raw WebGL), eyes following.
   2. One Three.js piece per home chapter, assembled as you scroll in and tilted by the pointer:
      creators (850 dots, one per creator), deck (six service cards), globe (the route from Mumbai to Offenburg). */
(() => {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const onHome = () => (document.body.dataset.page || 'home') === 'home';
  const ptr = { px: innerWidth / 2, py: innerHeight / 2, last: -1e9, nx: 0, ny: 0, sx: 0, sy: 0 };
  const setP = (e) => { ptr.px = e.clientX; ptr.py = e.clientY; ptr.last = performance.now(); ptr.nx = e.clientX / innerWidth * 2 - 1; ptr.ny = e.clientY / innerHeight * 2 - 1; };
  addEventListener('pointermove', setP, { passive: true });
  addEventListener('pointerdown', setP, { passive: true });
  const sfx = (k) => { if (window.bwvSfx) window.bwvSfx(k); };

  /* ---------- 1. hero bust ---------- */
  const bustState = (() => {
    const host = document.getElementById('bust'), portal = document.getElementById('portal');
    if (!host) return null;
    const cv = document.createElement('canvas'); cv.setAttribute('aria-hidden', 'true');
    const gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return null;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, [
      'precision mediump float;uniform sampler2D tex,dep;uniform vec2 m;uniform float eye,amt;varying vec2 uv;',
      'void main(){float d=texture2D(dep,uv).r;vec2 p=uv-m*(d-.42)*amt;',
      // the irises move toward the pointer inside each eye; lids and glasses stay put
      'vec2 g=m*vec2(.0085,.0055)*eye;',
      'float k1=1.-smoothstep(.15,1.,length((p-vec2(.4658,.3711))/vec2(.04,.02)));',
      'float k2=1.-smoothstep(.15,1.,length((p-vec2(.6299,.3848))/vec2(.04,.02)));',
      'p-=g*(k1+k2);gl_FragColor=texture2D(tex,p);}'].join('')));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    const uM = U('m'), uEye = U('eye'), uAmt = U('amt');
    gl.uniform1i(U('tex'), 0); gl.uniform1i(U('dep'), 1);
    const texOf = (img, unit) => {
      const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, unit === 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    const st = { ready: false, tex: [], cur: 0, eye: 1, mx: 0, my: 0, react: 0, host, cv, gl, vis: true };
    Promise.all(['img/bust-confident-smile.webp', 'img/bust-depth.png', 'img/bust-laughing.webp', 'img/bust-winking.webp', 'img/bust-surprised.webp'].map(load)).then(([a, d, ...x]) => {
      st.tex = [texOf(a, 0), ...x.map((i) => texOf(i, 0))]; texOf(d, 1);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, st.tex[0]);
      host.appendChild(cv); host.classList.add('live'); st.ready = true;
    }).catch(() => {});
    // tap: a quick expression, then back
    let ri = 0, rt = 0;
    if (portal) portal.addEventListener('click', () => {
      if (!st.ready) return; ri = (ri % 3) + 1; st.cur = ri; st.eye = 0; sfx('pop');
      clearTimeout(rt); rt = setTimeout(() => { st.cur = 0; st.eye = 1; }, 1400);
      host.classList.remove('boop'); void host.offsetWidth; host.classList.add('boop');
    });
    new IntersectionObserver(([e]) => { st.vis = e.isIntersecting; }).observe(host);
    st.draw = (t) => {
      if (!st.ready || !st.vis) return;
      const r = host.getBoundingClientRect(), w = Math.round(r.width * DPR), h = Math.round(r.height * DPR);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
      // target: where the pointer is, relative to the bust; after a pause, a slow look around
      let tx, ty;
      if (t - ptr.last > 2600 && !RM) { tx = Math.sin(t * .00055) * .55; ty = Math.sin(t * .0009 + 1) * .2; }
      else { tx = clamp((ptr.px - (r.left + r.width / 2)) / (innerWidth * .38), -1, 1); ty = clamp((ptr.py - (r.top + r.height * .38)) / (innerHeight * .45), -1, 1); }
      const k = RM ? 1 : .085; st.mx += (tx - st.mx) * k; st.my += (ty - st.my) * k;
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, st.tex[st.cur]);
      gl.uniform2f(uM, st.mx, st.my); gl.uniform1f(uEye, st.eye); gl.uniform1f(uAmt, .05);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      host.style.transform = `perspective(900px) rotateY(${(st.mx * 7).toFixed(2)}deg) rotateX(${(-st.my * 4).toFixed(2)}deg)`;
    };
    return st;
  })();

  /* ---------- 2. Three.js pieces ---------- */
  const stages = [];
  const hasThree = typeof THREE !== 'undefined';
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const isDark = () => { const b = css('--bg'); return b && parseInt(b.slice(1, 3), 16) < 80; };

  function envMap(r) {
    const pm = new THREE.PMREMGenerator(r), sc = new THREE.Scene();
    sc.add(new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), new THREE.MeshBasicMaterial({ color: 0x15132a, side: THREE.BackSide })));
    const panel = (c, x, y, z, w, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); sc.add(m); };
    panel(new THREE.Color(5, 5, 5.4), 0, 5.8, 1, 7, 5);
    panel(new THREE.Color(2.6, 2.3, 3.6), -5.8, 1, 2, 3, 6);
    panel(new THREE.Color(1.6, 2.6, 2.5), 5.8, -.5, -1, 3, 5);
    panel(new THREE.Color(.9, .8, 1.6), 0, -5.8, 0, 8, 8);
    const rt = pm.fromScene(sc, .035); pm.dispose(); return rt.texture;
  }

  function makeStage(el, build) {
    let r;
    try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); } catch (e) { el.classList.add('nogl'); return; }
    r.setPixelRatio(DPR); r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.NoToneMapping;
    r.domElement.className = 'st-cv'; r.domElement.setAttribute('aria-hidden', 'true'); el.appendChild(r.domElement);
    const scene = new THREE.Scene(); scene.environment = envMap(r);
    const cam = new THREE.PerspectiveCamera(30, 1, .1, 100);
    const s = { el, r, scene, cam, vis: false, w: 0, h: 0, rx: 0, ry: 0 };
    s.upd = build(scene, cam, s);
    const size = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h || (w === s.w && h === s.h)) return; s.w = w; s.h = h; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    s.size = size; size();
    if (window.ResizeObserver) new ResizeObserver(size).observe(el); else addEventListener('resize', size);
    io.observe(el); el.classList.add('live'); stages.push(s);
  }
  const io = window.IntersectionObserver ? new IntersectionObserver((es) => es.forEach((e) => { const s = stages.find((x) => x.el === e.target); if (s) s.vis = e.isIntersecting; }), { rootMargin: '120px' }) : null;

  // a tilt that follows the pointer, eased
  const tilt = (s, g, ax = .35, ay = .22) => { s.ry += ((RM ? 0 : ptr.sx * ax) - s.ry) * .06; s.rx += ((RM ? 0 : ptr.sy * ay) - s.rx) * .06; g.rotation.y += s.ry; g.rotation.x += s.rx; };

  const PAL = [0xA99CFF, 0x7F77DD, 0x86E6D8, 0xF5B49C, 0xFFFFFF, 0xC9C1FF, 0x5B52CF];

  /* creators: 850 dots, one per creator, gathering into 20 groups (the grouping is illustrative) */
  function creators(scene, cam) {
    cam.position.set(0, 0, 9.4);
    const N = 850, G = 20, grp = new THREE.Group(); scene.add(grp);
    const mat = new THREE.MeshStandardMaterial({ roughness: .28, metalness: .15, envMapIntensity: 1.2 });
    const mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(.07, 14, 10), mat, N); grp.add(mesh);
    const rnd = (() => { let s = 7; return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) + 12345 | 0) >>> 0) / 4294967296; })();
    const centres = [], from = [], to = [], delay = [];
    for (let g = 0; g < G; g++) { const y = 1 - (g + .5) / G * 2, r = Math.sqrt(1 - y * y), th = g * 2.39996; centres.push(new THREE.Vector3(Math.cos(th) * r * 2.5, y * 2.1, Math.sin(th) * r * 2.5)); }
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const g = i % G, u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1), rr = .18 + Math.pow(rnd(), .6) * .42;
      to.push(centres[g].clone().add(new THREE.Vector3(Math.sin(v) * Math.cos(u) * rr, Math.cos(v) * rr, Math.sin(v) * Math.sin(u) * rr)));
      const R = 6 + rnd() * 5; from.push(new THREE.Vector3((rnd() - .5) * R * 2, (rnd() - .5) * R, (rnd() - .5) * R - 2));
      delay.push(rnd() * .35);
      mesh.setColorAt(i, c.setHex(PAL[g % 5]));
    }
    mesh.instanceColor.needsUpdate = true;
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pos = new THREE.Vector3();
    let lastK = -1;
    return (t, p, s) => {
      const k = RM ? 1 : ss(.08, .55, p);
      if (Math.abs(k - lastK) > .0005) {
        for (let i = 0; i < N; i++) { const e = ss(delay[i], delay[i] + .65, k); pos.lerpVectors(from[i], to[i], e); sc.setScalar(.35 + .65 * e); m4.compose(pos, q, sc); mesh.setMatrixAt(i, m4); }
        mesh.instanceMatrix.needsUpdate = true; lastK = k;
      }
      grp.rotation.set(0, RM ? 0 : t * .00012 + (1 - k) * 1.2, 0); tilt(s, grp);
    };
  }

  /* deck: six service cards that fan out as you arrive */
  function deck(scene, cam) {
    cam.position.set(0, .2, 9.6);
    const NAMES = [['Campaigns'], ['Talent'], ['Accounts'], ['Content', '& UGC'], ['Teams'], ['AI', 'tools']];
    const TINT = ['#F6F1E8', '#F0FBF6', '#FEF6F3', '#F6F1E8', '#F0FBF6', '#FEF6F3'];
    const INK = ['#3A2A5E', '#0A5E55', '#8A3A1A', '#3A2A5E', '#0A5E55', '#8A3A1A'];
    const grp = new THREE.Group(); scene.add(grp);
    const W = 1.7, H = 2.25, R = .16;
    const shape = new THREE.Shape(); shape.moveTo(-W / 2 + R, -H / 2); shape.lineTo(W / 2 - R, -H / 2); shape.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + R); shape.lineTo(W / 2, H / 2 - R); shape.quadraticCurveTo(W / 2, H / 2, W / 2 - R, H / 2); shape.lineTo(-W / 2 + R, H / 2); shape.quadraticCurveTo(-W / 2, H / 2, -W / 2, H / 2 - R); shape.lineTo(-W / 2, -H / 2 + R); shape.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + R, -H / 2);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: .05, bevelEnabled: true, bevelThickness: .025, bevelSize: .025, bevelSegments: 3, curveSegments: 10 }); geo.translate(0, 0, -.025);
    const label = (i) => {
      const cv = document.createElement('canvas'); cv.width = 340; cv.height = 450; const x = cv.getContext('2d');
      // a big number on the part of the card that stays visible in the fan; the services themselves are spelled out below
      x.fillStyle = INK[i]; x.globalAlpha = .9; x.font = '500 26px "Martian Mono", monospace'; x.fillText(String(i + 1).padStart(2, '0') + ' / 06', 26, 54);
      x.globalAlpha = .82; x.font = '800 190px "Wix Madefor Display", system-ui, sans-serif'; x.fillText(String(i + 1).padStart(2, '0'), 18, 400); x.globalAlpha = 1;
      const tex = new THREE.CanvasTexture(cv); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4; return tex;
    };
    const cards = NAMES.map((n, i) => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: new THREE.Color(TINT[i]), emissive: new THREE.Color(TINT[i]), emissiveIntensity: .45, roughness: .3, metalness: 0, clearcoat: 1, clearcoatRoughness: .1, envMapIntensity: .8 }));
      const face = new THREE.Mesh(new THREE.PlaneGeometry(W * .94, H * .94), new THREE.MeshBasicMaterial({ map: label(i), transparent: true, toneMapped: false }));
      face.position.z = .052; g.add(body, face); grp.add(g); return g;
    });
    const relabel = () => cards.forEach((g, i) => { const f = g.children[1]; f.material.map.dispose(); f.material.map = label(i); f.material.needsUpdate = true; });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relabel);
    return (t, p, s) => {
      const k = RM ? 1 : ss(.1, .5, p), asp = s.w / Math.max(1, s.h);
      cam.position.z = asp < 1.6 ? 8.4 : 6.6;
      const vw = 2 * Math.tan(15 * Math.PI / 180) * cam.position.z * asp, gap = Math.min(1.4, (vw - 3) / 5.4);
      cards.forEach((g, i) => {
        const f = i - 2.5, a = f * (gap > 1.3 ? .12 : .2) * k;
        g.position.set(f * gap * k, -Math.abs(f) * .16 * k + (RM ? 0 : Math.sin(t * .0012 + i) * .05 * k), i * .06 - (1 - k) * i * .02);
        g.rotation.set(0, (1 - k) * .5 - f * .06 * k, -a);
      });
      grp.rotation.set(-.08, (1 - k) * -.6, 0); grp.position.y = (1 - k) * -.6; tilt(s, grp, .3, .18);
    };
  }

  /* globe: dotted land, pins for Mumbai and Offenburg, and the arc drawn as you scroll */
  function globe(scene, cam, s) {
    cam.position.set(0, 0, 7.3);
    const RAD = 1.55, grp = new THREE.Group(); scene.add(grp);
    const dark = isDark();
    const sph = new THREE.Mesh(new THREE.SphereGeometry(RAD * .985, 64, 48), new THREE.MeshPhysicalMaterial({ color: new THREE.Color(dark ? '#1D1A33' : '#F6F1E8'), roughness: .5, clearcoat: .6, clearcoatRoughness: .3, envMapIntensity: .7 }));
    grp.add(sph);
    const v3 = (lat, lon, r = RAD) => { const ph = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)); };
    const dot = document.createElement('canvas'); dot.width = dot.height = 32; const dx = dot.getContext('2d'); dx.beginPath(); dx.arc(16, 16, 13, 0, Math.PI * 2); dx.fillStyle = '#fff'; dx.fill();
    const dotTex = new THREE.CanvasTexture(dot);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data, pts = [], N = 11000;
      for (let i = 0; i < N; i++) {
        const y = 1 - (i + .5) / N * 2, lat = Math.asin(y) * 180 / Math.PI, lon = ((i * 137.50776) % 360) - 180;
        const px = Math.floor((lon + 180) / 360 * c.width) % c.width, py = Math.min(c.height - 1, Math.floor((90 - lat) / 180 * c.height));
        if (d[(py * c.width + px) * 4] > 128 && lat > -62) { const p = v3(lat, lon, RAD); pts.push(p.x, p.y, p.z); }
      }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      grp.add(new THREE.Points(g, new THREE.PointsMaterial({ size: .07, map: dotTex, transparent: true, alphaTest: .4, color: new THREE.Color(dark ? '#D4B67C' : '#3A2A5E'), sizeAttenuation: true })));
    };
    img.src = 'img/land-mask.png';
    const MUM = [19.076, 72.878], OFF = [48.473, 7.941];
    const pin = (ll, col) => { const m = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 12), new THREE.MeshBasicMaterial({ color: col })); m.position.copy(v3(ll[0], ll[1], RAD * 1.01)); grp.add(m); const halo = new THREE.Mesh(new THREE.RingGeometry(.07, .1, 32), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .5, side: THREE.DoubleSide })); halo.position.copy(m.position); halo.lookAt(0, 0, 0); grp.add(halo); return halo; };
    const h1 = pin(MUM, 0xF5B49C), h2 = pin(OFF, 0x86E6D8);
    const a = v3(...MUM, RAD), b = v3(...OFF, RAD), mid = a.clone().add(b).normalize().multiplyScalar(RAD * 1.42);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const tube = new THREE.TubeGeometry(curve, 96, .012, 8, false);
    const arc = new THREE.Mesh(tube, new THREE.MeshBasicMaterial({ color: new THREE.Color(dark ? '#D9C49A' : '#3A2A5E') })); grp.add(arc);
    const total = tube.index.count;
    const trav = new THREE.Mesh(new THREE.SphereGeometry(.04, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })); grp.add(trav);
    const tag = (txt, ll, up) => {
      const cv = document.createElement('canvas'); cv.width = 256; cv.height = 64; const x = cv.getContext('2d');
      x.font = '600 30px Inter, system-ui, sans-serif'; x.fillStyle = dark ? '#F3EEE4' : '#15171C'; x.fillText(txt, 8, 40);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthTest: false }));
      sp.scale.set(.9, .225, 1); sp.position.copy(v3(ll[0] + up, ll[1], RAD * 1.08)); sp.center.set(0, .5); grp.add(sp); return sp;
    };
    tag('Mumbai', MUM, -4); tag('Offenburg', OFF, 5);
    const face = (lon) => { const L = lon * Math.PI / 180; return -Math.atan2(Math.cos(L), -Math.sin(L)); };
    const yA = face(100), yB = face(40);
    return (t, p) => {
      const k = RM ? 1 : ss(.12, .62, p);
      arc.geometry.setDrawRange(0, Math.max(0, Math.floor(total * k / 3) * 3));
      trav.position.copy(curve.getPoint(clamp(k))); trav.visible = k > .02 && k < .995;
      const pulse = 1 + (RM ? 0 : (Math.sin(t * .004) * .5 + .5) * .35); h1.scale.setScalar(pulse); h2.scale.setScalar(pulse);
      grp.rotation.set(.42, yA + (yB - yA) * k, 0); tilt(s, grp, .3, .15);
    };
  }

  if (hasThree) {
    const B = { creators, deck, globe };
    document.querySelectorAll('[data-stage]').forEach((el) => { const f = B[el.dataset.stage]; if (f) makeStage(el, f); });
  } else document.querySelectorAll('[data-stage]').forEach((el) => el.classList.add('nogl'));

  function loop(t) {
    requestAnimationFrame(loop);
    ptr.sx += (ptr.nx - ptr.sx) * .05; ptr.sy += (ptr.ny - ptr.sy) * .05;
    if (bustState && onHome()) bustState.draw(t);
    const vh = innerHeight;
    for (const s of stages) {
      if (!s.vis) continue;
      if (!s.w) s.size();
      const r = s.el.getBoundingClientRect(), p = clamp((vh - r.top) / (vh + r.height * .5));
      s.upd(t, p, s); s.r.render(s.scene, s.cam);
    }
  }
  requestAnimationFrame(loop);
})();
