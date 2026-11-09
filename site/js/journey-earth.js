/* Build with Vish 2.0 prototype: the Earth inside the Journey.
   NASA Blue Marble by day and Black Marble city lights by night (texture files from the three-globe package), a thin
   atmosphere and stars. journey-map.js drives it with scroll through set(q, opacity, area). q runs from 0 to 1:
   the zoom out from Mumbai, take-off, the great-circle flight to Germany, and the dive back down to Offenburg. */
(() => {
  'use strict';
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const lerp = (a, b, t) => a + (b - a) * t;
  window.bwvEarth = (host) => {
    if (!host || typeof THREE === 'undefined') return null;
    let r;
    try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { return null; }
    r.setPixelRatio(Math.min(2, devicePixelRatio || 1)); r.domElement.setAttribute('aria-hidden', 'true'); host.appendChild(r.domElement);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(34, 1, .005, 200);
    const R = 1.3, globe = new THREE.Group(); scene.add(globe);
    const v3 = (lat, lon, rad = R) => { const ph = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-rad * Math.sin(ph) * Math.cos(th), rad * Math.cos(ph), rad * Math.sin(ph) * Math.sin(th)); };
    const latLon = (p) => [Math.asin(clamp(p.y / p.length(), -1, 1)) * 180 / Math.PI, Math.atan2(-p.z, p.x) * 180 / Math.PI];
    const GOLD = new THREE.Color('#E2C58E'), CREAM = new THREE.Color('#F3EEE4');
    const dotTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.45, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
    const TL = new THREE.TextureLoader(), aniso = r.capabilities.getMaxAnisotropy();
    const tex = (u) => { const t = TL.load(u); t.anisotropy = Math.min(8, aniso); return t; };

    // the planet: lit from the upper left, so the night side and its city lights sit on the right edge
    const SUN = new THREE.Vector3(-.5, .38, .78).normalize();
    const earthMat = new THREE.ShaderMaterial({
      uniforms: { day: { value: tex('img/earth-day.webp') }, night: { value: tex('img/earth-night.webp') }, water: { value: tex('img/earth-water.webp') }, sun: { value: SUN } },
      vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vUv = uv; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: [
        'uniform sampler2D day, night, water; uniform vec3 sun; varying vec2 vUv; varying vec3 vN; varying vec3 vV;',
        'void main(){',
        '  vec3 n = normalize(vN); float l = dot(n, sun);',
        '  float dayK = smoothstep(-.12, .28, l);',
        '  vec3 d = texture2D(day, vUv).rgb; vec3 nl = texture2D(night, vUv).rgb;',
        '  vec3 lit = d * (.2 + .95 * max(l, 0.));',
        '  vec3 lights = pow(nl, vec3(1.45)) * vec3(1.95, 1.5, .95) * 2.3;',
        '  vec3 col = mix(lights + d * .035, lit, dayK);',
        '  float w = texture2D(water, vUv).r; vec3 h = normalize(sun + vV);',
        '  col += vec3(1., .93, .82) * pow(max(dot(n, h), 0.), 60.) * w * .5 * dayK;',
        '  float fr = pow(1. - max(dot(n, vV), 0.), 3.);',
        '  col += vec3(.36, .58, 1.) * fr * (.25 + .75 * smoothstep(-.3, .4, l)) * .9;',
        '  gl_FragColor = vec4(col, 1.);',
        '}'].join('\n')
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R, 128, 96), earthMat));
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.12, 96, 64), new THREE.ShaderMaterial({
      side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { sun: { value: SUN } },
      vertexShader: 'varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: 'uniform vec3 sun; varying vec3 n; void main(){ float i = pow(clamp(.68 - dot(n, vec3(0.,0.,1.)), 0., 1.), 3.2); float s = .35 + .65 * smoothstep(-.5, .6, dot(-n, sun)); gl_FragColor = vec4(vec3(.34,.56,1.) * i * 1.2 * s, i * s); }'
    })));
    (() => { const n = 1200, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, rr = 40 + Math.random() * 30, s = Math.sqrt(1 - u * u); a.set([rr * s * Math.cos(t), rr * u, rr * s * Math.sin(t)], i * 3); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: .13, map: dotTex, color: 0xffffff, transparent: true, opacity: .5, depthWrite: false }))); })();

    // places
    const MUM = [19.08, 72.88], OFF = [48.47, 7.94];
    const glow = (col, s) => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, color: col, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); m.scale.set(s, s, 1); return m; };
    const mumG = glow(GOLD, .09), offG = glow(CREAM, .08); mumG.position.copy(v3(...MUM, R * 1.01)); offG.position.copy(v3(...OFF, R * 1.01)); globe.add(mumG, offG);
    const rings = [0, 1, 2].map(() => { const m = new THREE.Mesh(new THREE.RingGeometry(.03, .035, 64), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })); m.position.copy(v3(...MUM, R * 1.003)); m.lookAt(new THREE.Vector3(0, 0, 0)); globe.add(m); return m; });

    // the great circle from Mumbai to Offenburg, flown at a gentle height
    const A = v3(...MUM, 1).normalize(), B = v3(...OFF, 1).normalize(), qAB = new THREE.Quaternion().setFromUnitVectors(A, B), qT = new THREE.Quaternion();
    const dirAt = (f) => A.clone().applyQuaternion(qT.set(0, 0, 0, 1).slerp(qAB, clamp(f)));
    const ptAt = (f) => dirAt(f).multiplyScalar(R * (1.004 + .15 * Math.sin(Math.PI * clamp(f))));
    const pts = []; for (let i = 0; i <= 200; i++) pts.push(ptAt(i / 200));
    const curve = new THREE.CatmullRomCurve3(pts);
    const ghostM = new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0, depthWrite: false });
    globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 200, .0024, 6, false), ghostM));
    const tube = new THREE.TubeGeometry(curve, 200, .0075, 8, false), trailM = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, depthWrite: false }); globe.add(new THREE.Mesh(tube, trailM));
    const TOT = tube.index.count;
    const ps = new THREE.Shape(); [[0, .5], [.07, .2], [.42, -.02], [.42, -.12], [.07, -.02], [.06, -.32], [.17, -.42], [.17, -.5], [0, -.44], [-.17, -.5], [-.17, -.42], [-.06, -.32], [-.07, -.02], [-.42, -.12], [-.42, -.02], [-.07, .2]].forEach(([x, y], i) => (i ? ps.lineTo(x, y) : ps.moveTo(x, y)));
    const plane = new THREE.Mesh(new THREE.ShapeGeometry(ps), new THREE.MeshBasicMaterial({ color: CREAM, side: THREE.DoubleSide })); globe.add(plane);
    const planeGlow = glow(GOLD, .14); globe.add(planeGlow);
    const basis = new THREE.Matrix4(), fwd = new THREE.Vector3(), up = new THREE.Vector3(), right = new THREE.Vector3();
    function placePlane(f, s) {
      const p = ptAt(f), q = f < .995 ? ptAt(f + .004) : p.clone().multiplyScalar(2).sub(ptAt(f - .004));
      fwd.subVectors(q, p).normalize(); up.copy(p).normalize(); right.crossVectors(fwd, up).normalize(); up.crossVectors(right, fwd).normalize();
      basis.makeBasis(right, fwd, up); plane.quaternion.setFromRotationMatrix(basis); plane.position.copy(p); plane.scale.setScalar(s); planeGlow.position.copy(p); planeGlow.scale.setScalar(s * 1.4);
      return p;
    }
    const face = (lat, lon) => { const L = lon * Math.PI / 180; globe.rotation.set(lat * Math.PI / 180, -Math.atan2(Math.cos(L), -Math.sin(L)), 0, 'XYZ'); };

    // labels are HTML, so the type stays crisp
    const mk = (cls, txt) => { const s = document.createElement('span'); s.className = 'je-lbl' + (cls ? ' ' + cls : ''); s.textContent = txt; host.appendChild(s); return s; };
    const lM = mk('', 'Mumbai'), lO = mk('', 'Offenburg'), lK = mk('je-km', '');
    const tmp = new THREE.Vector3();
    function pin(lbl, local, o, dy) {
      tmp.copy(local).applyMatrix4(globe.matrixWorld);
      const front = tmp.dot(new THREE.Vector3().subVectors(cam.position, tmp)) > 0;
      tmp.project(cam);
      const x = (tmp.x * .5 + .5) * W, y = (-tmp.y * .5 + .5) * H;
      lbl.style.opacity = (front ? o : 0).toFixed(3);
      lbl.style.transform = `translate3d(${x.toFixed(1)}px,${(y + dy).toFixed(1)}px,0) translate(-50%,-50%)`;
    }

    let W = 0, H = 0;
    const size = () => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h || (w === W && h === H)) return; W = w; H = h; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    const st = { q: 0, op: 0, area: null };
    let raf = 0;
    function frame(t) {
      size(); if (!W) return;
      const q = st.q, a = st.area || { cx: W / 2, cy: H / 2, m: Math.min(W, H) };
      // camera height: from just above Mumbai, out to the whole planet, and back down over Offenburg (eased in log space)
      const dOv = 4.25 * H / (.8 * Math.max(160, a.m)), aOv = Math.max(.6, dOv - R);
      const f = ss(.3, .72, q);
      let alt = Math.exp(lerp(Math.log(.5), Math.log(aOv), ss(.02, .24, q)));
      alt = Math.exp(lerp(Math.log(alt), Math.log(.42), ss(.74, .95, q)));
      alt *= 1 + .14 * Math.sin(Math.PI * f);
      cam.position.set(0, 0, R + alt); cam.lookAt(0, 0, 0);
      cam.setViewOffset(W, H, W / 2 - a.cx, H / 2 - a.cy, W, H);
      // follow the plane, looking a little south of it so it flies over the top of the globe
      const [la, lo] = latLon(dirAt(f));
      face(la - Math.sin(Math.PI * f) * 7, lo);
      globe.updateMatrixWorld();
      const lift = ss(.22, .3, q) * (1 - ss(.74, .8, q));
      plane.visible = planeGlow.visible = lift > .01;
      const pp = placePlane(f, .16 * lift);
      trailM.opacity = 1 - ss(.8, .9, q);
      tube.setDrawRange(0, Math.floor(TOT * f / 3) * 3);
      ghostM.opacity = .32 * ss(.22, .3, q) * (1 - ss(.88, .95, q));
      const rem = 1 - ss(.2, .3, q);
      rings.forEach((m, i) => { const k = ((t * .00045) + i / 3) % 1; m.scale.setScalar(1 + k * 4); m.material.opacity = rem * (1 - k) * .75; });
      // glows keep about the same size on screen as the camera dives in
      const gk = Math.pow(Math.min(1, alt / aOv), .85), pulse = 1 + Math.sin(t * .004) * .12;
      mumG.scale.setScalar(.09 * pulse * gk); offG.scale.setScalar(.08 * pulse * (1 + ss(.72, .8, q) * .6) * Math.max(gk, .05));
      r.render(scene, cam);
      pin(lM, mumG.position, ss(.06, .16, q) * (1 - ss(.32, .42, q)), -22);
      pin(lO, offG.position, ss(.56, .66, q) * (1 - ss(.9, .95, q)), -22);
      const kmO = ss(.3, .36, q) * (1 - ss(.68, .74, q));
      lK.textContent = Math.round(6600 * (1 - f) / 10) * 10 + ' km to Offenburg';
      lK.textContent = lK.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      pin(lK, pp, kmO, 30);
    }
    function loop(t) {
      if (st.op <= .003) { raf = 0; return; }
      raf = requestAnimationFrame(loop); frame(t);
    }
    return {
      set(q, op, area) { st.q = q; st.op = op; st.area = area; if (!raf && op > .003) raf = requestAnimationFrame(loop); }
    };
  };
})();
