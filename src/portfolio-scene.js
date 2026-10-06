/* ===== Portfolio: 850 creator deals orbiting 9 brands (drag to spin) ===== */
window.DealScene = (function () {
  "use strict";
  if (typeof THREE === "undefined") return null;
  const HAS_GL = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; } })();
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  let seed = 3; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  let r, sc, cam, raf = 0, running = false, ok = false, cv, labels = [], host, grp, pts, lines, nodes = [], mode = 0, modeT = 0, intro = RM ? 1 : 0, t0 = 0, time = 0;
  const rot = { x: 0.25, y: 0, vx: 0, vy: 0.08 }, drag = { on: false, x: 0, y: 0 };
  const U = { uTime: { value: 0 }, uIntro: { value: 0 }, uMode: { value: 0 }, uPR: { value: 1 }, uHot: { value: -1 } };

  function init(canvas, labelHost, brands, day) {
    if (ok) { mount(canvas, labelHost, brands); return true; }
    if (!HAS_GL) return false;
    try { r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return false; }
    if (!r.getContext()) return false;
    r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); U.uPR.value = r.getPixelRatio();
    sc = new THREE.Scene(); cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100); cam.position.set(0, 0, 13);
    grp = new THREE.Group(); sc.add(grp);
    const B = brands.length, R = 4;
    for (let i = 0; i < B; i++) { const y = 1 - (i + 0.5) / B * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963; nodes.push(new THREE.Vector3(Math.cos(th) * rr * R, y * R * 0.85, Math.sin(th) * rr * R)); }
    // deals: 850 points, each belongs to a brand cluster
    const N = 850, pos = new Float32Array(N * 3), start = new Float32Array(N * 3), owner = new Float32Array(N), sd = new Float32Array(N);
    const share = [180, 140, 90, 70, 150, 60, 50, 40, 70];
    let k = 0; share.forEach((n, b) => { for (let j = 0; j < n && k < N; j++, k++) { const c = nodes[b % B]; const s = 0.55 + rnd() * 0.5; pos.set([c.x + gauss() * s, c.y + gauss() * s, c.z + gauss() * s], k * 3); owner[k] = b % B; sd[k] = rnd(); } });
    for (; k < N; k++) { const c = nodes[(rnd() * B) | 0]; pos.set([c.x + gauss(), c.y + gauss(), c.z + gauss()], k * 3); owner[k] = 0; sd[k] = rnd(); }
    for (let i = 0; i < N; i++) start.set([(rnd() - 0.5) * 40, (rnd() - 0.5) * 30, -10 - rnd() * 30], i * 3);
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("aStart", new THREE.BufferAttribute(start, 3)); g.setAttribute("aOwner", new THREE.BufferAttribute(owner, 1)); g.setAttribute("aSeed", new THREE.BufferAttribute(sd, 1));
    pts = new THREE.Points(g, new THREE.ShaderMaterial({
      uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `attribute vec3 aStart; attribute float aOwner; attribute float aSeed; uniform float uTime; uniform float uIntro; uniform float uPR; uniform float uHot; uniform float uMode; varying float vHot; varying float vS;
        void main(){ float st=clamp((uIntro-aSeed*0.4)/0.6,0.0,1.0); st=st*st*(3.0-2.0*st); vec3 p=mix(aStart,position,st);
          p+=vec3(sin(uTime*0.6+aSeed*30.0),cos(uTime*0.5+aSeed*20.0),sin(uTime*0.4+aSeed*10.0))*0.06;
          vHot=abs(aOwner-uHot)<0.5?1.0:0.0; vS=aSeed; vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv;
          gl_PointSize=(1.6+vHot*1.6+step(0.96,aSeed)*2.0)*uPR*(14.0/max(1.0,-mv.z)); }`,
      fragmentShader: `uniform float uMode; varying float vHot; varying float vS; void main(){ float r=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.1,r); if(a<0.02) discard;
        vec3 n=mix(mix(vec3(0.82,0.84,1.0),vec3(0.66,0.61,1.0),step(0.6,vS)),vec3(0.44,0.88,0.82),vHot);
        vec3 d=mix(mix(vec3(0.20,0.18,0.26),vec3(0.36,0.32,0.80),step(0.6,vS)),vec3(0.05,0.55,0.50),vHot);
        gl_FragColor=vec4(mix(n*(1.0+vHot),d,uMode),a*mix(0.9,0.8,uMode)); }`
    }));
    grp.add(pts);
    const lp = []; for (let i = 0; i < B; i++) for (let j = i + 1; j < B; j++) if (rnd() < 0.45) lp.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
    const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lp), 3));
    lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xa99cff, transparent: true, opacity: 0.18, depthWrite: false })); grp.add(lines);
    nodes.forEach((n) => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff })); m.position.copy(n); grp.add(m); n.mesh = m; });
    mount(canvas, labelHost, brands);
    mode = modeT = day ? 1 : 0; addEventListener("resize", size);
    ok = true; return true;
  }
  function mount(canvas, labelHost, brands) {
    if (canvas !== r.domElement) { /* reuse renderer on a fresh canvas */ const ctx = r; ctx.dispose(); r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); }
    cv = canvas; host = labelHost; host.innerHTML = brands.map((b, i) => `<span class="dlab" data-i="${i}">${b}</span>`).join(""); labels = Array.from(host.children);
    labels.forEach((l) => { l.addEventListener("pointerenter", () => (U.uHot.value = +l.dataset.i)); l.addEventListener("pointerleave", () => (U.uHot.value = -1)); });
    cv.onpointerdown = (e) => { drag.on = true; drag.x = e.clientX; drag.y = e.clientY; cv.setPointerCapture(e.pointerId); };
    cv.onpointermove = (e) => { if (!drag.on) { hoverNear(e); return; } rot.vy = (e.clientX - drag.x) * 0.0025; rot.vx = (e.clientY - drag.y) * 0.0015; rot.y += rot.vy; rot.x = clamp(rot.x + rot.vx, -0.8, 0.8); drag.x = e.clientX; drag.y = e.clientY; };
    cv.onpointerup = () => (drag.on = false); cv.onpointerleave = () => { if (!drag.on) U.uHot.value = -1; };
    intro = RM ? 1 : 0; size();
  }
  function hoverNear(e) {
    const b = cv.getBoundingClientRect(), mx = e.clientX - b.left, my = e.clientY - b.top; let best = -1, bd = 40;
    nodes.forEach((n, i) => { const p = n.clone().applyMatrix4(grp.matrixWorld).project(cam), x = (p.x + 1) / 2 * b.width, y = (1 - p.y) / 2 * b.height, d = Math.hypot(x - mx, y - my); if (d < bd) { bd = d; best = i; } });
    U.uHot.value = best;
  }
  function size() { if (!cv) return; const b = cv.getBoundingClientRect(); if (!b.width) return; r.setSize(b.width, b.height, false); cam.aspect = b.width / b.height; cam.position.z = b.width < 500 ? 15 : 13; cam.updateProjectionMatrix(); }
  function frame(now) {
    if (!running) return; const dt = Math.min(0.05, (now - (t0 || now)) / 1000); t0 = now; time += dt;
    intro = Math.min(1, intro + dt / 2.2); mode += (modeT - mode) * Math.min(1, dt * 3);
    U.uTime.value = time; U.uIntro.value = ease(intro); U.uMode.value = mode;
    if (!drag.on) { rot.y += rot.vy * dt * (rot.vy > 0.2 ? 1 : 1); rot.vy += (0.12 - rot.vy) * dt * 0.8; rot.vx *= 0.92; }
    grp.rotation.set(rot.x, rot.y, 0);
    pts.material.blending = mode > 0.5 ? THREE.NormalBlending : THREE.AdditiveBlending;
    lines.material.color.set(mode > 0.5 ? 0x5e5ce6 : 0xa99cff);
    nodes.forEach((n, i) => { n.mesh.material.color.set(U.uHot.value === i ? (mode > 0.5 ? 0x0e8c80 : 0x6fe0d2) : (mode > 0.5 ? 0x1d1d1f : 0xffffff)); n.mesh.scale.setScalar(U.uHot.value === i ? 1.8 : 1); });
    const b = cv.getBoundingClientRect(); grp.updateMatrixWorld();
    labels.forEach((l, i) => { const p = nodes[i].clone().applyMatrix4(grp.matrixWorld), z = p.clone().applyMatrix4(cam.matrixWorldInverse).z; p.project(cam); const lx = (p.x + 1) / 2 * b.width; l.style.transform = `translate(${lx}px,${(1 - p.y) / 2 * b.height}px)` + (lx > b.width - 140 ? " translateX(calc(-100% - 20px))" : ""); l.style.opacity = clamp((-z - 8) / 6 + 0.25, 0.25, 1) * ease(intro); l.classList.toggle("hot", U.uHot.value === i); });
    r.render(sc, cam);
    if (!RM) raf = requestAnimationFrame(frame); else running = false;
  }
  return {
    init,
    start() { if (!ok || running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); },
    setMode(day) { modeT = day ? 1 : 0; },
    get ok() { return ok; }
  };
})();

/* ===== Portrait: a live photo that ripples like liquid under the cursor and reveals itself with a soft noisy wipe ===== */
window.PhotoFX = (function () {
  "use strict";
  if (typeof THREE === "undefined") return null;
  const HAS_GL = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; } })();
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function mount(fig) {
    if (!fig || !HAS_GL) return null;
    const img = fig.querySelector("img"), cv = fig.querySelector("canvas"); if (!img || !cv) return null;
    let r; try { r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: false, premultipliedAlpha: false }); } catch (e) { return null; }
    if (!r.getContext()) return null;
    r.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const sc = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), tex = new THREE.Texture(img);
    tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
    const load = () => { tex.needsUpdate = true; U.uImg.value.set(img.naturalWidth || 880, img.naturalHeight || 1100); };
    const U = { uTex: { value: tex }, uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uVel: { value: 0 }, uTime: { value: 0 }, uReveal: { value: RM ? 1 : 0 }, uImg: { value: new THREE.Vector2(880, 1100) }, uBox: { value: new THREE.Vector2(1, 1.25) } };
    if (img.complete && img.naturalWidth) load(); else img.addEventListener("load", load, { once: true });
    sc.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      uniforms: U, transparent: true, depthTest: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`,
      fragmentShader: `uniform sampler2D uTex; uniform vec2 uMouse; uniform float uVel; uniform float uTime; uniform float uReveal; uniform vec2 uImg; uniform vec2 uBox; varying vec2 vUv;
        float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y); }
        vec2 cover(vec2 uv){ float rb=uBox.x/uBox.y, ri=uImg.x/uImg.y; vec2 s=rb>ri?vec2(1.0,ri/rb):vec2(rb/ri,1.0); return (uv-0.5)*s+0.5; }
        void main(){
          vec2 asp=vec2(uBox.x/uBox.y,1.0); vec2 d=(vUv-uMouse)*asp; float r=length(d);
          float w=exp(-r*r*12.0)*uVel; vec2 dir=d/(r+1e-4)/asp;
          vec2 uv=vUv-dir*w*(0.03+0.018*sin(r*38.0-uTime*7.0));
          float edge=vUv.y*0.85+n(vUv*6.0+vec2(0.0,uTime*0.15))*0.22; float rv=smoothstep(edge-0.07,edge,uReveal*1.14);
          uv.y-=(1.0-rv)*0.04; float sh=w*0.011+(1.0-rv)*0.012;
          vec3 c=vec3(texture2D(uTex,cover(uv+dir*sh)).r,texture2D(uTex,cover(uv)).g,texture2D(uTex,cover(uv-dir*sh)).b);
          c+=(h(vUv*900.0+fract(uTime)*50.0)-0.5)*0.03;
          gl_FragColor=vec4(c,rv); }`
    })));
    let raf = 0, run = false, t0 = 0, mx = 0.5, my = 0.5, lx = 0.5, ly = 0.5, vel = 0, revealing = false;
    const size = () => { const b = fig.getBoundingClientRect(); if (!b.width) return; r.setSize(b.width, b.height, false); U.uBox.value.set(b.width, b.height); };
    const move = (e) => { const b = fig.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width; my = 1 - (e.clientY - b.top) / b.height; };
    fig.addEventListener("pointermove", move, { passive: true });
    addEventListener("resize", size);
    function frame(now) {
      if (!run) return; const dt = Math.min(0.05, (now - (t0 || now)) / 1000); t0 = now;
      U.uTime.value += dt;
      if (revealing && U.uReveal.value < 1) U.uReveal.value = Math.min(1, U.uReveal.value + dt / 1.6);
      const sp = Math.hypot(mx - lx, my - ly) / Math.max(dt, 0.001); lx += (mx - lx) * Math.min(1, dt * 10); ly += (my - ly) * Math.min(1, dt * 10);
      vel += (Math.min(1, sp * 0.6) - vel) * Math.min(1, dt * 4); U.uVel.value = RM ? 0 : vel; U.uMouse.value.set(lx, ly);
      r.render(sc, cam); raf = requestAnimationFrame(frame);
    }
    size();
    return {
      start() { if (run) return; run = true; revealing = true; t0 = 0; size(); raf = requestAnimationFrame(frame); },
      stop() { run = false; cancelAnimationFrame(raf); },
      dispose() { run = false; cancelAnimationFrame(raf); removeEventListener("resize", size); fig.removeEventListener("pointermove", move); tex.dispose(); r.dispose(); if (r.forceContextLoss) r.forceContextLoss(); }
    };
  }
  return { mount };
})();
