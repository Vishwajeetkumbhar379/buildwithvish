/* ===== Build with Vish: cinematic WebGL journey v7 (Three.js r128). Clean: near-black space, one hero piece per chapter that
   assembles as you arrive, reacts to the cursor and can be spun by dragging. ===== */
window.Journey = (function () {
  "use strict";
  if (typeof THREE === "undefined") return null;
  const HAS_GL = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; } })();
  const coarse = matchMedia("(pointer: coarse)").matches;
  const small = () => innerWidth < 760;
  const MOBILE = coarse || small();
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = (h) => new THREE.Color(h);
  const IRIS = C("#A99CFF"), AUR = C("#6FE0D2"), SOL = C("#F3C584"), STAR = C("#EEF0FF");
  const IRIS_D = C("#5546D8"), INK_D = C("#2A2F5C"), AUR_D = C("#0E8C80");
  const BG_N = C("#04050F"), BG_D = C("#E2DBE6"), ABYSS_N = C("#02101A"), MIST_D = C("#D7DCE5");
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

  let renderer, scene, camera, composer, bloom, raf = 0, running = false, ok = false;
  let target = 0, prog = 0, intro = RM ? 1 : 0, time = 0, last = 0, pulse = 0;
  let mode = 0, modeTarget = 0, blendDay = null;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0, active: false };
  const updaters = [], modeFns = [];
  const reg = (st, fn) => updaters.push({ st, fn });
  const onMode = (fn) => modeFns.push(fn);
  let frames = 0, slow = 0, bloomOn = true, hover = null, fx = null, fxS = 0, lastProg = 0, charge = 0, chargeT = 0;
  let depth = 0, bgDepth = -1, burstT = -99, mvel = 0, lastMx = 0, lastMy = 0, excite = 0;
  const trail = []; for (let i = 0; i < 16; i++) trail.push(new THREE.Vector3(9, 9, -99)); let trailI = 0, trailX = 9, trailY = 9;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const pickables = [];
  const sunDir = V(0.55, 0.32, -1).normalize();
  const U = { uTime: { value: 0 }, uMode: { value: 0 }, uPR: { value: 1 }, uAspect: { value: 1 }, uMouse: { value: new THREE.Vector2(9, 9) }, uRip: { value: new THREE.Vector3(0, 0, -99) }, uSun: { value: sunDir }, uLight: { value: V(0.45, 0.55, 0.7).normalize() }, uDepth: { value: 0 } };

  /* ---------- GLSL ---------- */
  const NOISE = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
  float fbm(vec3 p){ float a=0.5,s=0.0; for(int i=0;i<4;i++){ s+=a*snoise(p); p*=2.03; a*=0.5; } return s; }`;

  const PV = `attribute float aSize; attribute float aSeed; attribute vec3 aCol;
    uniform float uTime; uniform float uMode; uniform float uPR; uniform float uAspect; uniform vec2 uMouse; uniform vec3 uRip; uniform float uScale; uniform float uInteract;
    uniform vec3 uNight; uniform vec3 uDay; uniform float uAttr;
    varying float vA; varying vec3 vC;
    void main(){
      vec4 mv=modelViewMatrix*vec4(position,1.0); vec4 cp=projectionMatrix*mv;
      vec2 n=cp.xy/cp.w; vec2 d=n-uMouse; d.x*=uAspect; float dist=length(d);
      float push=smoothstep(0.32,0.0,dist)*0.07*uInteract; vec2 dir=normalize(d+1e-5); dir.x/=uAspect;
      float age=uTime-uRip.z; vec2 rd=n-uRip.xy; rd.x*=uAspect; float rl=length(rd);
      float wave=(age>0.0&&age<3.0)?exp(-pow((rl-age*1.1)*7.0,2.0))*exp(-age*1.2):0.0;
      vec2 rdir=normalize(rd+1e-5); rdir.x/=uAspect;
      n+=dir*push+rdir*wave*0.05*uInteract; cp.xy=n*cp.w; gl_Position=cp;
      float tw=0.6+0.4*sin(uTime*(0.7+aSeed*1.7)+aSeed*40.0);
      vA=tw*(1.0+smoothstep(0.25,0.0,dist)*0.9*uInteract+wave*2.5);
      vec3 nc=uAttr>0.5?aCol:uNight; vC=mix(nc,uDay,uMode);
      gl_PointSize=aSize*uScale*uPR*(70.0/max(1.0,-mv.z))*(0.8+0.2*tw);
    }`;
  const PF = `uniform float uMode; uniform float uOpacity; uniform float uDayOpacity; uniform float uBoost; varying float vA; varying vec3 vC;
    void main(){ vec2 p=gl_PointCoord-0.5; float r=length(p);
      float core=smoothstep(0.17,0.04,r); float halo=exp(-r*r*30.0)*mix(0.6,0.15,uMode); float a=core+halo;
      if(a<0.012) discard; float op=mix(uOpacity,uDayOpacity,uMode);
      gl_FragColor=vec4(vC*mix(uBoost,1.0,uMode)*(0.75+0.25*vA),clamp(a*op*vA,0.0,1.0)); }`;
  const pmats = [];
  function pointsMat(o) {
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: U.uTime, uMode: U.uMode, uPR: U.uPR, uAspect: U.uAspect, uMouse: U.uMouse, uRip: U.uRip,
        uScale: { value: o.scale || 1 }, uInteract: { value: o.interact == null ? 1 : o.interact }, uNight: { value: (o.night || STAR).clone() }, uDay: { value: (o.day || INK_D).clone() },
        uAttr: { value: o.attr ? 1 : 0 }, uOpacity: { value: o.opacity == null ? 1 : o.opacity }, uDayOpacity: { value: o.dayOpacity == null ? 0.5 : o.dayOpacity }, uBoost: { value: o.boost || 1.2 } },
      vertexShader: PV, fragmentShader: PF, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    pmats.push(m); return m;
  }
  function pointsGeo(pos, sizeFn, colFn) {
    const n = pos.length / 3, g = new THREE.BufferGeometry(), sz = new Float32Array(n), sd = new Float32Array(n), col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { sz[i] = sizeFn ? sizeFn(i) : 1; sd[i] = rnd(); const c = colFn ? colFn(i) : STAR; col.set([c.r, c.g, c.b], i * 3); }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(sd, 1)); g.setAttribute("aCol", new THREE.BufferAttribute(col, 3));
    return g;
  }
  function addPoints(parent, pos, o) { const p = new THREE.Points(pointsGeo(pos, o.size, o.col), pointsMat(o)); p.frustumCulled = false; parent.add(p); return p; }
  const blendables = [];
  const glowMat = (opts) => { const m = new THREE.MeshBasicMaterial(Object.assign({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }, opts)); blendables.push(m); return m; };

  /* ---------- stations ---------- */
  const ST = [
    { c: V(0, 0, 0), d: 15, y: 0.6 }, { c: V(30, 5, -60), d: 19, y: 1.2 }, { c: V(-28, -2, -125), d: 24, y: 6 },
    { c: V(30, 6, -190), d: 19, y: 1.5 }, { c: V(-24, 0, -255), d: 15, y: 0.4 }, { c: V(0, -2, -325), d: 20, y: 1 }
  ];
  function shiftFor(i) {
    const dist = ST[i].d * (small() ? 1.35 : 1);
    if (small()) return V(0, -Math.tan(camera.fov * Math.PI / 360) * dist * 0.42, 0);
    const hw = Math.tan(camera.fov * Math.PI / 360) * dist * camera.aspect, s = hw * (i === 0 ? 0.5 : 0.47);
    return V(i % 2 === 0 ? -s : s, 0, 0);
  }
  function pose(i, o) {
    const s = ST[i], sh = shiftFor(i), dist = s.d * (small() ? 1.35 : 1);
    return { pos: s.c.clone().add(sh).add(V(Math.sin(o) * dist, s.y, Math.cos(o) * dist)), look: s.c.clone().add(sh) };
  }

  /* ---------- one hero piece per chapter: each lives on a pivot that assembles on arrival and can be spun by dragging ---------- */
  const pivots = [], spin = { vx: 0, vy: 0, active: -1 }, gw = new THREE.Vector3();
  function mount(i, g) {
    const pv = new THREE.Group(); pv.position.copy(ST[i].c); g.position.sub(ST[i].c); pv.add(g); scene.add(pv);
    pivots[i] = { pv, rx: 0, ry: 0, k: 0 };
  }
  function updatePivots(f, dt) {
    const act = Math.round(f);
    pivots.forEach((p, i) => {
      if (!p) return;
      const d = Math.abs(f - i), target = RM ? (d < 0.6 ? 1 : 0) : sstep(1.05, 0.3, d);
      p.k = RM ? target : p.k + (target - p.k) * Math.min(1, dt * 4);
      const k = ease(clamp(p.k)); p.pv.visible = p.k > 0.01;
      p.pv.scale.setScalar(0.55 + 0.45 * k);
      if (i === act) { p.ry += spin.vy * dt; p.rx = clamp(p.rx + spin.vx * dt, -0.6, 0.6); }
      else { p.ry *= 1 - Math.min(1, dt * 1.5); p.rx *= 1 - Math.min(1, dt * 1.5); }
      p.pv.rotation.set(p.rx, p.ry + (1 - k) * 0.9 * (i % 2 ? -1 : 1), 0);
    });
    spin.vy *= 1 - Math.min(1, dt * 2.2); spin.vx *= 1 - Math.min(1, dt * 2.2);
  }

  /* ---------- sky dome ---------- */
  let sky;
  function buildSky() {
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: U.uTime, uMode: U.uMode, uSun: U.uSun, uDepth: U.uDepth }, side: THREE.BackSide, depthWrite: false, depthTest: false,
      vertexShader: `varying vec3 vDir; void main(){ vDir=normalize(position); vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position=p.xyww; }`,
      fragmentShader: NOISE + `uniform float uTime; uniform float uMode; uniform vec3 uSun; uniform float uDepth; varying vec3 vDir;
        void main(){ vec3 d=normalize(vDir); float h=d.y*0.5+0.5;
          vec3 n=mix(vec3(0.010,0.012,0.034),vec3(0.028,0.032,0.090),smoothstep(0.1,1.0,h));
          float neb=fbm(d*2.0+vec3(0.0,uTime*0.004,0.0)); float neb2=fbm(d*4.2+vec3(7.1,2.3,1.7));
          vec3 nc=mix(vec3(0.42,0.33,0.95),vec3(0.20,0.70,0.72),smoothstep(-0.4,0.5,neb2));
          n+=nc*pow(max(neb+0.15,0.0),2.2)*0.11;
          n+=vec3(0.95,0.72,0.55)*pow(max(fbm(d*3.0+vec3(3.0)),0.0),3.0)*0.04;
          float band=exp(-pow(dot(d,normalize(vec3(0.35,1.0,0.25)))*3.6,2.0)); n+=vec3(0.55,0.5,0.9)*band*0.025*(0.6+0.6*neb2);
          float s=max(dot(d,normalize(uSun)),0.0);
          vec3 day=mix(vec3(0.93,0.84,0.82),vec3(0.89,0.86,0.91),smoothstep(-0.45,0.05,d.y)); day=mix(day,vec3(0.74,0.71,0.84),smoothstep(0.05,0.8,d.y)); day=mix(day,vec3(1.0,0.86,0.72),pow(s,3.0)*0.35);
          day+=vec3(0.98,0.78,0.62)*pow(s,6.0)*0.16+vec3(1.0,0.93,0.86)*pow(s,500.0)*0.45+vec3(0.98,0.85,0.75)*pow(s,40.0)*0.08;
          float cl=fbm(vec3(d.xz/(abs(d.y)+0.32)*1.2,uTime*0.008)); float clouds=smoothstep(0.0,0.6,cl)*smoothstep(-0.25,0.25,d.y);
          day=mix(day,vec3(0.95,0.92,0.95),clouds*0.35);
          // the cosmic ocean: the deeper the journey, the more the galaxy is seen through dark water with drifting caustic veins
          vec3 ab=mix(vec3(0.003,0.018,0.03),vec3(0.012,0.07,0.095),smoothstep(-0.5,0.9,d.y));
          float cv=pow(1.0-abs(snoise(vec3(d.xz/(abs(d.y)+0.32)*2.4,uTime*0.06))),10.0)+pow(1.0-abs(snoise(vec3(d.xz/(abs(d.y)+0.32)*4.1+3.0,uTime*0.08))),12.0)*0.6;
          float up=smoothstep(-0.05,0.65,d.y);
          n=mix(n,n*0.5+ab,uDepth*0.82); n+=vec3(0.25,0.75,0.78)*cv*up*uDepth*0.05;
          n+=vec3(0.10,0.42,0.48)*pow(max(d.y,0.0),3.0)*uDepth*0.35;
          day=mix(day,vec3(0.81,0.85,0.9),uDepth*0.42); day+=vec3(1.0)*cv*up*uDepth*0.025;
          gl_FragColor=vec4(mix(n,day,uMode),1.0); }`
    });
    sky = new THREE.Mesh(new THREE.SphereGeometry(400, 48, 32), m); sky.frustumCulled = false; sky.renderOrder = -10; scene.add(sky);
  }

  /* ---------- stars, shooting stars, day clouds ---------- */
  function buildStars() {
    const N = MOBILE ? 1400 : 3200, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) pos.set([(rnd() - 0.5) * 260, (rnd() - 0.5) * 160, 70 - rnd() * 480], i * 3);
    const temps = [C("#FFFFFF"), C("#CFD8FF"), C("#A9C1FF"), C("#FFE3C2"), C("#FFD1A1"), C("#E6DFFF")];
    const s = addPoints(scene, pos, { size: () => { const r = rnd(); return r > 0.985 ? 3.2 : r > 0.9 ? 1.6 : 0.5 + rnd() * 0.8; }, col: () => temps[(rnd() * temps.length) | 0], attr: true, day: C("#7C83B8"), opacity: 1, dayOpacity: 0.28, boost: 1.4 });
    reg(-1, (t) => { s.rotation.z = t * 0.003; });
    const shoots = [];
    for (let i = 0; i < 3; i++) {
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      g.setAttribute("color", new THREE.BufferAttribute(new Float32Array([1, 1, 1, 0, 0, 0]), 3));
      const l = new THREE.Line(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      l.frustumCulled = false; l.visible = false; scene.add(l); shoots.push({ l, t: -rnd() * 8, p: V(0, 0, 0), v: V(0, 0, 0) });
    }
    const f = new THREE.Vector3();
    reg(-1, (t, dt) => {
      shoots.forEach((s) => {
        s.t += dt; const L = s.l;
        if (s.t > 1.4) { s.t = -(3 + rnd() * 7); camera.getWorldDirection(f); s.p.copy(camera.position).addScaledVector(f, 60 + rnd() * 40).add(V((rnd() - 0.2) * 60, 18 + rnd() * 20, 0)); s.v.set(-(14 + rnd() * 14), -(6 + rnd() * 6), 0); }
        const vis = s.t > 0 && mode < 0.5; L.visible = vis; if (!vis) return;
        const head = s.p.clone().addScaledVector(s.v, s.t), tail = head.clone().addScaledVector(s.v, -0.22);
        const a = L.geometry.attributes.position; a.setXYZ(0, head.x, head.y, head.z); a.setXYZ(1, tail.x, tail.y, tail.z); a.needsUpdate = true;
        L.material.opacity = Math.sin(clamp(s.t / 1.4) * Math.PI) * (1 - mode * 2);
      });
    });
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    for (let i = 0; i < 26; i++) { const cx = 60 + rnd() * 136, cy = 100 + rnd() * 60, r = 30 + rnd() * 50, g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, "rgba(255,255,255,0.55)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, 256, 256); }
    const tex = new THREE.CanvasTexture(cv), clouds = [], CN = MOBILE ? 22 : 44;
    for (let i = 0; i < CN; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0, fog: false, color: 0xEFE4EC })); const sc = 18 + rnd() * 30; sp.scale.set(sc * 1.8, sc, 1);
      sp.position.set((rnd() - 0.5) * 170, rnd() < 0.55 ? -17 - rnd() * 12 : 21 + rnd() * 14, 30 - rnd() * 400); sp.visible = false; scene.add(sp); clouds.push({ sp, b: 0.3 + rnd() * 0.35, v: 0.3 + rnd() * 0.6 });
    }
    reg(-1, (t, dt) => { clouds.forEach((c) => { c.sp.visible = mode > 0.01; c.sp.material.opacity = c.b * ease(clamp((mode - 0.3) / 0.7)); c.sp.position.x += dt * c.v; if (c.sp.position.x > 80) c.sp.position.x = -80; }); });
  }

  /* ---------- 01 core ---------- */
  let coreHover = 0;
  function buildCore() {
    const g = new THREE.Group(); g.position.copy(ST[0].c); mount(0, g);
    const geo = new THREE.IcosahedronGeometry(3, MOBILE ? 30 : 72);
    const mat = new THREE.ShaderMaterial({
      extensions: { derivatives: true },
      uniforms: { uTime: U.uTime, uMode: U.uMode, uSun: U.uLight, uPulse: { value: 0 }, uHover: { value: 0 } },
      vertexShader: NOISE + `uniform float uTime; uniform float uPulse; uniform float uHover; varying float vN; varying vec3 vNor; varying vec3 vView;
        float disp(vec3 p){ float a=0.5+uPulse*0.55+uHover*0.25; return snoise(p*0.42+vec3(uTime*(0.16+uHover*0.1)))*a+snoise(p*1.5-vec3(uTime*0.32))*0.12; }
        void main(){ vec3 p=position; vec3 nrm=normalize(p);
          vec3 t1=normalize(cross(nrm,abs(nrm.y)<0.99?vec3(0.0,1.0,0.0):vec3(1.0,0.0,0.0))); vec3 t2=cross(nrm,t1); float e=0.04;
          vec3 p0=p+nrm*disp(p); vec3 q1=p+t1*e; vec3 q2=p+t2*e; vec3 p1=q1+normalize(q1)*disp(q1); vec3 p2=q2+normalize(q2)*disp(q2);
          vec3 nn=normalize(cross(p1-p0,p2-p0)); if(dot(nn,nrm)<0.0) nn=-nn;
          vN=disp(p); vec4 mv=modelViewMatrix*vec4(p0,1.0); vView=normalize(-mv.xyz);
          vNor=normalize(normalMatrix*nn); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform float uMode; uniform vec3 uSun; uniform float uPulse; varying float vN; varying vec3 vNor; varying vec3 vView;
        vec3 pal(float t){ return 0.55+0.45*cos(6.2831*(vec3(0.0,0.12,0.24)+t)); }
        void main(){ vec3 N=normalize(vNor), Vd=normalize(vView); float fr=pow(1.0-max(dot(N,Vd),0.0),2.6);
          vec3 L=normalize((viewMatrix*vec4(normalize(uSun),0.0)).xyz); float dif=max(dot(N,L),0.0); vec3 H=normalize(L+Vd); float spec=pow(max(dot(N,H),0.0),60.0);
          float b=fract(vN*7.0); float w=fwidth(vN*7.0); float line=1.0-smoothstep(0.0,w*1.5,abs(b-0.5));
          vec3 irid=pal(fr*0.8+vN*0.6+0.55);
          vec3 night=mix(vec3(0.02,0.022,0.06),vec3(0.20,0.17,0.46),smoothstep(-0.5,0.8,vN));
          night+=line*mix(vec3(0.66,0.61,1.0),vec3(0.44,0.88,0.82),fr)*(0.55+uPulse);
          night+=fr*mix(vec3(0.66,0.61,1.0),vec3(0.44,0.88,0.82),0.35)*(2.2+uPulse*2.0)+spec*0.6;
          vec3 base=mix(vec3(0.74,0.70,0.82),vec3(0.93,0.90,0.94),dif); vec3 day=base*(0.72+0.32*dif)+vec3(0.55,0.45,0.70)*(1.0-dif)*0.12;
          day+=irid*fr*0.45+spec*0.45; day+=line*vec3(0.33,0.27,0.85)*0.25;
          gl_FragColor=vec4(mix(night,day,uMode),1.0); }`
    });
    const core = new THREE.Mesh(geo, mat); g.add(core);
    const rings = [];
    [[4.4, 0.4, 0.2], [5.4, -0.6, 0.9], [6.7, 1.1, -0.4]].forEach(([r, rx, rz], i) => {
      const t = new THREE.Mesh(new THREE.TorusGeometry(r, i === 1 ? 0.02 : 0.011, 8, 320), glowMat({ color: 0xffffff, opacity: 0.6 })); t.rotation.set(rx + Math.PI / 2, 0, rz); g.add(t);
      const b = new THREE.Mesh(new THREE.SphereGeometry(i === 1 ? 0.1 : 0.065, 16, 16), glowMat({ color: 0xffffff })); t.add(b); b.userData.r = r; rings.push({ t, b, i });
    });
    onMode((m) => rings.forEach(({ t, b, i }) => { t.material.color.copy(i === 1 ? IRIS : STAR).multiplyScalar(i === 1 ? 2.2 : 0.7).lerp(i === 1 ? IRIS_D : INK_D, m); t.material.opacity = (i === 1 ? 0.95 : 0.4) * (1 - m * 0.3); b.material.color.copy(i === 1 ? AUR : SOL).multiplyScalar(3).lerp(i === 1 ? AUR_D : IRIS_D, m); }));
    const N = MOBILE ? 700 : 1600, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const r = 4.4 + Math.pow(rnd(), 1.7) * 10, a = rnd() * 6.283, b = Math.acos(2 * rnd() - 1); pos.set([r * Math.sin(b) * Math.cos(a), r * Math.cos(b) * 0.65, r * Math.sin(b) * Math.sin(a)], i * 3); }
    const halo = addPoints(g, pos, { size: () => 0.5 + rnd() * 1.4, attr: true, col: () => (rnd() < 0.55 ? STAR : rnd() < 0.6 ? IRIS : AUR), day: C("#5A5FA8"), dayOpacity: 0.55, boost: 1.3 });
    const sp = new THREE.Vector3();
    reg(0, (t, dt) => {
      g.getWorldPosition(sp); sp.project(camera); const d = Math.hypot((sp.x - mouse.sx) * camera.aspect, sp.y - mouse.sy);
      coreHover += ((mouse.active && d < 0.45 ? 1 : 0) - coreHover) * Math.min(1, dt * 3);
      mat.uniforms.uPulse.value = pulse; mat.uniforms.uHover.value = coreHover;
      core.rotation.y = t * 0.08 + mouse.sx * 0.4; core.rotation.x = -mouse.sy * 0.25;
      halo.rotation.y = -t * 0.02; halo.rotation.x = Math.sin(t * 0.1) * 0.1;
      rings.forEach(({ t: r, b, i }) => { r.rotation.z += dt * (0.05 + i * 0.03) * (i % 2 ? -1 : 1) * (1 + coreHover); const a = t * (0.4 + i * 0.15); b.position.set(Math.cos(a) * b.userData.r, Math.sin(a) * b.userData.r, 0); });
    });
  }

  /* ---------- 02 prompt cards ---------- */
  const PROMPTS = [["GOAL", "more saves on my posts"], ["AUDIENCE", "busy founders, 30-45"], ["CONTEXT", "launch is in 2 weeks"], ["FORMAT", "table, 3 options"], ["EXAMPLE", "paste the post that worked"], ["ASK", "3 questions before you start"], ["TONE", "plain, warm, no buzzwords"], ["LIMIT", "under 120 words"], ["CHECK", "what did you assume?"], ["GOAL", "a site that gets me hired"], ["ROLE", "act as a sceptical CMO"], ["NEXT", "steps for the next hour"]];
  const rrect = (x, X, Y, W, H, R) => { x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R); x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath(); };
  function cardTex(k, v, i, day) {
    const c = document.createElement("canvas"); c.width = 1024; c.height = 600; const x = c.getContext("2d"); x.scale(2, 2);
    const gr = x.createLinearGradient(0, 0, 512, 300);
    if (day) { gr.addColorStop(0, "rgba(244,239,245,0.97)"); gr.addColorStop(1, "rgba(232,226,236,0.95)"); } else { gr.addColorStop(0, "rgba(22,24,58,0.94)"); gr.addColorStop(1, "rgba(10,12,32,0.94)"); }
    x.save(); if (day) { x.shadowColor = 'rgba(40,50,130,0.28)'; x.shadowBlur = 22; x.shadowOffsetY = 6; } rrect(x, 14, 12, 484, 270, 24); x.fillStyle = gr; x.fill(); x.restore(); x.lineWidth = 1.5; x.strokeStyle = day ? "rgba(85,70,216,0.35)" : "rgba(169,156,255,0.55)"; x.stroke();
    const hl = x.createLinearGradient(40, 0, 472, 0); hl.addColorStop(0, "rgba(0,0,0,0)"); hl.addColorStop(0.5, day ? "rgba(85,70,216,0.5)" : "rgba(111,224,210,0.7)"); hl.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = hl; x.fillRect(50, 12, 412, 1.5);
    rrect(x, 30, 30, 152, 38, 19); x.fillStyle = day ? "rgba(85,70,216,0.1)" : "rgba(169,156,255,0.16)"; x.fill();
    x.fillStyle = day ? "#4436B8" : "#CFC8FF"; x.font = "500 17px 'Geist Mono', ui-monospace, Menlo, monospace"; x.textBaseline = "middle"; x.fillText("PROMPT " + String(i + 1).padStart(2, "0"), 46, 50);
    x.fillStyle = day ? "#5546D8" : "#A99CFF"; x.font = "600 26px 'Geist Mono', ui-monospace, Menlo, monospace"; x.fillText(k + ":", 34, 124);
    x.fillStyle = day ? "#101330" : "#EEF0FF"; x.font = "500 30px Geist, ui-sans-serif, system-ui, sans-serif";
    let line = "", y = 176; v.split(" ").forEach((w) => { const t = line ? line + " " + w : w; if (x.measureText(t).width > 440) { x.fillText(line, 34, y); line = w; y += 40; } else line = t; }); x.fillText(line, 34, y);
    x.fillStyle = day ? "#0E8C80" : "#6FE0D2"; x.fillRect(34 + x.measureText(line).width + 8, y - 15, 12, 30);
    const t = new THREE.CanvasTexture(c); t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
  }
  function buildPrompts() {
    const g = new THREE.Group(); g.position.copy(ST[1].c); mount(1, g);
    const ring = new THREE.Group(); g.add(ring);
    const cards = PROMPTS.map(([k, v], i) => {
      const m = new THREE.ShaderMaterial({
        uniforms: { mapN: { value: cardTex(k, v, i, false) }, mapD: { value: cardTex(k, v, i, true) }, uMode: U.uMode, uOp: { value: 1 }, uHi: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform sampler2D mapN; uniform sampler2D mapD; uniform float uMode; uniform float uOp; uniform float uHi; varying vec2 vUv;
          void main(){ vec2 uv=gl_FrontFacing?vUv:vec2(1.0-vUv.x,vUv.y); vec4 a=texture2D(mapN,uv); vec4 b=texture2D(mapD,uv); vec4 c=mix(a,b,uMode); c.rgb*=1.0+uHi*0.25*(1.0-uMode); gl_FragColor=vec4(c.rgb,c.a*uOp); }`,
        transparent: true, side: THREE.DoubleSide, depthWrite: false
      });
      const p = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2), m); p.userData = { a: (i / PROMPTS.length) * Math.PI * 2, y: Math.sin(i * 1.7) * 1.6, lift: 0 };
      ring.add(p); pickables.push({ mesh: p, kind: "prompt", st: 1 }); return p;
    });
    const beamMat = new THREE.ShaderMaterial({ uniforms: { uMode: U.uMode, uTime: U.uTime }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `uniform float uMode; uniform float uTime; varying vec2 vUv; void main(){ float a=smoothstep(0.0,0.25,vUv.y)*smoothstep(1.0,0.75,vUv.y); float flow=0.6+0.4*sin(vUv.y*40.0-uTime*6.0);
        vec3 c=mix(mix(vec3(0.66,0.61,1.0),vec3(0.44,0.88,0.82),vUv.y)*2.4,vec3(0.33,0.27,0.85),uMode); gl_FragColor=vec4(c,a*flow*mix(0.9,0.6,uMode)); }` });
    blendables.push(beamMat);

    const N = MOBILE ? 160 : 320, pos = new Float32Array(N * 3), meta = [];
    for (let i = 0; i < N; i++) meta.push({ a: rnd() * 6.283, r: 0.3 + rnd() * 3.2, y: rnd() * 14 - 7, s: 0.6 + rnd() * 1.6 });
    const stream = addPoints(g, pos, { size: () => 0.5 + rnd() * 1.1, attr: true, col: () => (rnd() < 0.5 ? IRIS : AUR), day: IRIS_D, dayOpacity: 0.7, boost: 1.8 });
    const pa = stream.geometry.attributes.position, camDir = new THREE.Vector3(), q = new THREE.Quaternion(), nrm = new THREE.Vector3();
    reg(1, (t, dt, near) => {
      if (!near) return;
      ring.rotation.y = t * 0.1;
      camDir.copy(camera.position).sub(g.getWorldPosition(gw)).normalize();
      cards.forEach((p) => {
        const a = p.userData.a, hov = hover && hover.mesh === p ? 1 : 0; p.userData.lift += (hov - p.userData.lift) * Math.min(1, dt * 6);
        const L = p.userData.lift, r = 5 + L * 0.9; p.position.set(Math.sin(a) * r, p.userData.y + Math.sin(t * 0.8 + a * 3) * 0.25 + L * 0.2, Math.cos(a) * r);
        p.rotation.y = a; p.scale.setScalar(1 + L * 0.12);
        nrm.set(0, 0, 1).applyQuaternion(p.getWorldQuaternion(q)); p.material.uniforms.uOp.value = 0.22 + 0.78 * clamp(nrm.dot(camDir) * 1.4 + 0.25); p.material.uniforms.uHi.value = L;
      });
      for (let i = 0; i < N; i++) { const m = meta[i]; m.y += dt * m.s * 1.4; m.a += dt * 0.6 / m.r; if (m.y > 7) m.y = -7; const r = m.r * (1 - (m.y + 7) / 18); pa.array[i * 3] = Math.cos(m.a) * r; pa.array[i * 3 + 1] = m.y; pa.array[i * 3 + 2] = Math.sin(m.a) * r; }
      pa.needsUpdate = true;
    });
  }

  /* ---------- 03 tower ---------- */
  let buildP = 0;
  function buildTower() {
    const g = new THREE.Group(); g.position.copy(ST[2].c); g.position.y -= 4; mount(2, g);
    const G = 9, S = 1.15, cells = [];
    for (let x = 0; x < G; x++) for (let z = 0; z < G; z++) {
      const dx = x - (G - 1) / 2, dz = z - (G - 1) / 2, d = Math.hypot(dx, dz); if (d > 4.9) continue;
      cells.push({ x: dx * S, z: dz * S, h: Math.max(0.4, (5.2 - d) * 1.25 + rnd() * 2.2 + (d < 1 ? 3.5 : 0)), delay: d / 5.4 * 0.6 + rnd() * 0.12, acc: rnd() < 0.18, glow: 0 });
    }
    const box = new THREE.BoxGeometry(1, 1, 1); box.translate(0, 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x14152a, metalness: 0.75, roughness: 0.3 });
    const wire = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.16 });
    const mesh = new THREE.InstancedMesh(box, mat, cells.length), wmesh = new THREE.InstancedMesh(box, wire, cells.length), caps = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.06, 1), new THREE.MeshBasicMaterial({ color: 0xffffff }), cells.length);
    caps.setColorAt(0, C("#ffffff")); g.add(mesh, wmesh, caps);
    const grid = new THREE.GridHelper(26, 26, 0xffffff, 0xffffff); grid.material.transparent = true; g.add(grid);
    const scan = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), glowMat({ color: 0xffffff, opacity: 0.12, side: THREE.DoubleSide })); scan.rotation.x = -Math.PI / 2; g.add(scan);
    const hemi = new THREE.HemisphereLight(0xa99cff, 0x04050f, 0.6); scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.1); dir.position.copy(ST[2].c).add(V(10, 20, 12)); dir.target = g; scene.add(dir);
    const pl = new THREE.PointLight(0xa99cff, 3.2, 14, 1.6); pl.position.set(0, 10, 0); g.add(pl);
    onMode((m) => {
      mat.color.set(0x14152a).lerp(C("#D9D0DF"), m); mat.metalness = lerp(0.75, 0.05, m); mat.roughness = lerp(0.3, 0.7, m);
      wire.color.copy(IRIS).lerp(IRIS_D, m); wire.opacity = lerp(0.16, 0.07, m);
      grid.material.color.copy(IRIS).lerp(INK_D, m); grid.material.opacity = lerp(0.35, 0.22, m);
      hemi.color.copy(IRIS).lerp(C("#F3E6EE"), m); hemi.groundColor.copy(BG_N).lerp(C("#BFB3C9"), m); hemi.intensity = lerp(0.6, 0.9, m);
      dir.intensity = lerp(1.1, 1.5, m); pl.color.copy(IRIS).lerp(C("#FFB25E"), m); scan.visible = m < 0.5;
    });
    const dummy = new THREE.Object3D(), plane = new THREE.Plane(V(0, 1, 0), 0), hit = new THREE.Vector3(), cc = new THREE.Color(), tgt = new THREE.Vector3();
    const accN = IRIS.clone().multiplyScalar(3), offN = STAR.clone().multiplyScalar(0.22), hotN = AUR.clone().multiplyScalar(3), offD = C("#EEE6F0"), hotD = C("#FFB25E");
    reg(2, (t, dt, near) => {
      if (!near) return;
      g.rotation.y = Math.sin(t * 0.12) * 0.25 + 0.6;
      let local = null;
      if (mouse.active) { ndc.set(mouse.x, mouse.y); ray.setFromCamera(ndc, camera); plane.constant = -g.getWorldPosition(gw).y; if (ray.ray.intersectPlane(plane, hit)) local = g.worldToLocal(hit.clone()); }
      if (local) { tgt.set(local.x, 6, local.z); pl.position.lerp(tgt, Math.min(1, dt * 5)); }
      cells.forEach((c, i) => {
        const k = ease(clamp((buildP - c.delay) / 0.4)), n2 = local ? clamp(1 - Math.hypot(local.x - c.x, local.z - c.z) / 3) : 0;
        c.glow += (n2 - c.glow) * Math.min(1, dt * 6);
        const h = Math.max(0.001, c.h * k * (1 + c.glow * 0.12));
        dummy.position.set(c.x, (1 - k) * -6, c.z); dummy.scale.set(1, h, 1); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); wmesh.setMatrixAt(i, dummy.matrix);
        dummy.position.set(c.x, (1 - k) * -6 + h + 0.03, c.z); dummy.scale.set(k < 0.02 ? 0.001 : 1, 1, k < 0.02 ? 0.001 : 1); dummy.updateMatrix(); caps.setMatrixAt(i, dummy.matrix);
        if (mode < 0.5) cc.copy(c.acc ? accN : offN).lerp(hotN, c.glow); else cc.copy(c.acc ? IRIS_D : offD).lerp(hotD, c.glow);
        caps.setColorAt(i, cc);
      });
      mesh.instanceMatrix.needsUpdate = wmesh.instanceMatrix.needsUpdate = caps.instanceMatrix.needsUpdate = true; caps.instanceColor.needsUpdate = true;
      scan.position.y = (t * 2.2) % 12; scan.material.color.copy(AUR).multiplyScalar(1.4); scan.material.opacity = 0.12 * (1 - scan.position.y / 12) * clamp(buildP * 2);
    });
  }

  /* ---------- 04 network ---------- */
  function buildNetwork() {
    const g = new THREE.Group(); g.position.copy(ST[3].c); g.scale.setScalar(0.72); mount(3, g);
    const layers = [4, 7, 9, 7, 4], nodes = [];
    layers.forEach((n, li) => { for (let j = 0; j < n; j++) { const a = (j / n) * Math.PI * 2 + li, r = 1 + rnd() * 3.4; nodes.push({ p: V((li - 2) * 4.6, Math.sin(a) * r, Math.cos(a) * r), li, acc: li === 0 || li === 4, wake: 0 }); } });
    const edges = [];
    nodes.forEach((a, i) => { if (a.li === 4) return; const next = nodes.map((b, j) => [b, j]).filter(([b]) => b.li === a.li + 1); for (let k = 0; k < 2; k++) edges.push([i, next[(i * 3 + k * 5) % next.length][1]]); });
    const lp = new Float32Array(edges.length * 6); edges.forEach(([a, b], i) => lp.set([nodes[a].p.x, nodes[a].p.y, nodes[a].p.z, nodes[b].p.x, nodes[b].p.y, nodes[b].p.z], i * 6));
    const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }); blendables.push(lineMat);
    g.add(new THREE.LineSegments(lg, lineMat));
    const nm = new THREE.InstancedMesh(new THREE.SphereGeometry(0.11, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }), nodes.length); nm.setColorAt(0, C("#fff")); g.add(nm);
    const glowPos = new Float32Array(nodes.length * 3); nodes.forEach((n, i) => glowPos.set([n.p.x, n.p.y, n.p.z], i * 3));
    addPoints(g, glowPos, { size: (i) => (nodes[i].acc ? 4.5 : 2.2), night: IRIS, day: IRIS_D, opacity: 0.4, dayOpacity: 0.25, boost: 1.2, interact: 0 });
    const P = MOBILE ? 60 : 130, pp = new Float32Array(P * 3), pulses = [];
    for (let i = 0; i < P; i++) pulses.push({ e: (rnd() * edges.length) | 0, t: rnd(), s: 0.25 + rnd() * 0.5 });
    const pts = addPoints(g, pp, { size: () => 1.7, attr: true, col: () => (rnd() < 0.5 ? AUR : SOL), day: AUR_D, dayOpacity: 1, boost: 2.4, interact: 0 });
    const pa = pts.geometry.attributes.position, dm = new THREE.Object3D(), cc = new THREE.Color(), wp = new THREE.Vector3();
    const outsOf = nodes.map((_, i) => edges.map((e, k) => [e, k]).filter(([e]) => e[0] === i).map(([, k]) => k));
    const starts = edges.map((e, k) => [e, k]).filter(([e]) => nodes[e[0]].li === 0).map(([, k]) => k);
    const accN = IRIS.clone().multiplyScalar(2.6), offN = STAR.clone().multiplyScalar(0.8), hotN = AUR.clone().multiplyScalar(3);
    onMode((m) => { lineMat.color.copy(IRIS).lerp(INK_D, m); lineMat.opacity = lerp(0.3, 0.35, m); });
    reg(3, (t, dt, near) => {
      if (!near) return;
      g.rotation.y = Math.sin(t * 0.15) * 0.35 - 0.2 + mouse.sx * 0.25; g.rotation.x = Math.sin(t * 0.11) * 0.08 - mouse.sy * 0.12; g.updateMatrixWorld();
      nodes.forEach((n, i) => {
        wp.copy(n.p); g.localToWorld(wp); wp.project(camera); const d = Math.hypot((wp.x - mouse.sx) * camera.aspect, wp.y - mouse.sy);
        const w = mouse.active && d < 0.09 ? 1 : 0; if (w && n.wake < 0.5) outsOf[i].forEach((k) => { const q = pulses[(rnd() * P) | 0]; q.e = k; q.t = 0; });
        n.wake += (w - n.wake) * Math.min(1, dt * 6);
        dm.position.copy(n.p); dm.scale.setScalar((n.acc ? 1.6 : 1) * (1 + n.wake * 1.2)); dm.updateMatrix(); nm.setMatrixAt(i, dm.matrix);
        if (mode < 0.5) cc.copy(n.acc ? accN : offN).lerp(hotN, n.wake); else cc.copy(n.acc ? IRIS_D : INK_D).lerp(AUR_D, n.wake);
        nm.setColorAt(i, cc);
      });
      nm.instanceMatrix.needsUpdate = true; nm.instanceColor.needsUpdate = true;
      pulses.forEach((q, i) => {
        q.t += dt * q.s * (1 + pulse * 2);
        if (q.t >= 1) { const o = outsOf[edges[q.e][1]]; q.e = o.length ? o[(rnd() * o.length) | 0] : starts[(rnd() * starts.length) | 0]; q.t = 0; }
        const [a, b] = edges[q.e], A = nodes[a].p, B = nodes[b].p;
        pa.array[i * 3] = A.x + (B.x - A.x) * q.t; pa.array[i * 3 + 1] = A.y + (B.y - A.y) * q.t; pa.array[i * 3 + 2] = A.z + (B.z - A.z) * q.t;
      });
      pa.needsUpdate = true;
    });
  }

  /* ---------- 05 carousel fan ---------- */
  function slideTex(cv, i) {
    const s = cv.slides[0], tints = ["#F5F4FF", "#F0FBF6", "#FEF6F3"];
    const c = document.createElement("canvas"); c.width = 1080; c.height = 1350; const x = c.getContext("2d"); x.scale(2, 2);
    x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, 540, 675);
    rrect(x, 28, 110, 484, 470, 26); x.fillStyle = tints[i % 3]; x.fill(); x.strokeStyle = "#E3E1F2"; x.lineWidth = 1; x.stroke();
    x.fillStyle = "#7F77DD"; x.beginPath(); x.arc(52, 56, 18, 0, 7); x.fill();
    x.fillStyle = "#fff"; x.font = "700 13px Geist, system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("VK", 52, 57);
    x.textAlign = "left"; x.fillStyle = "#1A1830"; x.font = "600 17px Geist, system-ui, sans-serif"; x.fillText("Vish Kumbhar", 80, 50);
    x.fillStyle = "#77758C"; x.font = "400 13px Geist, system-ui, sans-serif"; x.fillText("Build with Vish", 80, 70);
    rrect(x, 436, 40, 76, 32, 16); x.fillStyle = "#EEEDFC"; x.fill(); x.fillStyle = "#534AB7"; x.font = "600 14px 'Geist Mono', monospace"; x.textAlign = "center"; x.fillText("1/" + cv.slides.length, 474, 57); x.textAlign = "left";
    x.font = "600 14px Geist, system-ui, sans-serif"; const bw = x.measureText(s.badge).width + 32; rrect(x, 56, 140, bw, 32, 16); x.fillStyle = "#FFFFFF"; x.fill(); x.strokeStyle = "#E3E1F2"; x.stroke(); x.fillStyle = "#534AB7"; x.fillText(s.badge, 72, 157);
    x.fillStyle = "#1A1830"; x.font = "700 38px Geist, system-ui, sans-serif"; let line = "", y = 236;
    s.title.split(" ").forEach((w) => { const t = line ? line + " " + w : w; if (x.measureText(t).width > 420) { x.fillText(line, 56, y); line = w; y += 46; } else line = t; }); x.fillText(line, 56, y);
    x.fillStyle = "#5E5C70"; x.font = "400 19px Geist, system-ui, sans-serif"; x.fillText(s.sub.length > 44 ? s.sub.slice(0, 42) + "…" : s.sub, 56, Math.min(y + 54, 540));
    x.font = "38px system-ui, sans-serif"; x.fillText(s.emoji || "", 446, 545);
    x.fillStyle = "#7F77DD"; x.font = "600 15px Geist, system-ui, sans-serif"; x.fillText("Tap to open →", 56, 628);
    const t = new THREE.CanvasTexture(c); t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
  }
  let fanP = 0;
  function buildFan() {
    const g = new THREE.Group(); g.position.copy(ST[4].c); mount(4, g);
    const list = (typeof CAROUSELS !== "undefined" ? CAROUSELS : []).slice(0, 7);
    const cards = list.map((cv, i) => {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.25), new THREE.MeshBasicMaterial({ map: slideTex(cv, i), side: THREE.DoubleSide, color: 0xd6d6e6 }));
      p.userData = { lift: 0 }; g.add(p); pickables.push({ mesh: p, kind: "carousel", data: cv.slug, st: 4 }); return p;
    });
    const glowPos = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) { const a = rnd() * 6.283, r = 3 + rnd() * 7; glowPos.set([Math.cos(a) * r, Math.sin(a) * r * 0.6 - 1, -2 - rnd() * 5], i * 3); }
    const dust = addPoints(g, glowPos, { size: () => 0.5 + rnd() * 0.9, attr: true, col: () => (rnd() < 0.5 ? IRIS : SOL), day: IRIS_D, dayOpacity: 0.45, boost: 1.6 });
    onMode((m) => cards.forEach((p) => p.material.color.set(0xd6d6e6).lerp(C("#EDE8F0"), m)));
    reg(4, (t, dt, near) => {
      if (!near) return;
      const n = cards.length, spread = 0.05 + ease(fanP) * 0.15, R = 9;
      cards.forEach((p, i) => {
        const hov = hover && hover.mesh === p ? 1 : 0; p.userData.lift += (hov - p.userData.lift) * Math.min(1, dt * 7); const L = p.userData.lift, k = i - (n - 1) / 2, th = k * spread;
        p.position.set(Math.sin(th) * R, Math.cos(th) * R - R + Math.sin(t * 0.9 + i) * 0.08 - Math.abs(k) * 0.12 * fanP + L * 0.7, -Math.abs(k) * 0.04 + i * 0.005 + L * 1.2);
        p.rotation.set(0, Math.sin(t * 0.4 + i) * 0.06, -th * (1 - L * 0.6)); p.scale.setScalar(1 + L * 0.08);
      });
      g.rotation.y = Math.sin(t * 0.2) * 0.15 + mouse.sx * 0.12; dust.rotation.z = t * 0.03;
    });
  }

  /* ---------- 06 planet ---------- */
  function buildGlobe() {
    const g = new THREE.Group(); g.position.copy(ST[5].c); g.rotation.z = 0.35; mount(5, g);
    const R = 6, LAND = `float land(vec3 p){ vec3 q=normalize(p); return snoise(q*1.6+vec3(3.1,1.7,0.4))+0.5*snoise(q*3.4)+0.2*snoise(q*8.0); }`;
    const planet = new THREE.Mesh(new THREE.SphereGeometry(R, MOBILE ? 96 : 160, MOBILE ? 64 : 120), new THREE.ShaderMaterial({
      uniforms: { uMode: U.uMode, uSun: U.uLight },
      vertexShader: `varying vec3 vP; varying vec3 vN; varying vec3 vV; void main(){ vP=position; vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: NOISE + LAND + `uniform float uMode; uniform vec3 uSun; varying vec3 vP; varying vec3 vN; varying vec3 vV;
        void main(){ float l=land(vP); float isL=smoothstep(0.12,0.18,l); float lat=abs(normalize(vP).y);
          vec3 N=normalize(vN); vec3 L=normalize((viewMatrix*vec4(normalize(uSun),0.0)).xyz); float dif=max(dot(N,L),0.0); float fr=pow(1.0-max(dot(N,normalize(vV)),0.0),3.0);
          vec3 ocean=mix(vec3(0.33,0.36,0.58),vec3(0.55,0.56,0.78),fr*0.7+dif*0.35); vec3 grass=mix(vec3(0.55,0.61,0.52),vec3(0.82,0.73,0.64),smoothstep(0.2,0.6,snoise(normalize(vP)*5.0)*0.5+0.5));
          vec3 dayc=mix(ocean,grass,isL); dayc=mix(dayc,vec3(0.93,0.91,0.95),smoothstep(0.82,0.9,lat));
          float spec=pow(max(dot(reflect(-L,N),normalize(vV)),0.0),40.0)*(1.0-isL); dayc=dayc*(0.3+0.8*dif)+spec*0.5+fr*vec3(0.55,0.75,1.0)*0.5;
          vec3 nightc=mix(vec3(0.012,0.016,0.045),vec3(0.03,0.035,0.09),isL)+fr*vec3(0.36,0.32,0.95)*0.6;
          float city=isL*smoothstep(0.55,0.95,snoise(normalize(vP)*38.0)*0.5+0.5)*smoothstep(0.85,0.6,lat); nightc+=city*vec3(1.0,0.78,0.45)*2.2;
          gl_FragColor=vec4(mix(nightc,dayc,uMode),1.0); }`
    })); g.add(planet);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(R * 1.018, 96, 64), new THREE.ShaderMaterial({
      uniforms: { uMode: U.uMode, uSun: U.uLight, uTime: U.uTime }, transparent: true, depthWrite: false,
      vertexShader: `varying vec3 vP; varying vec3 vN; void main(){ vP=position; vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: NOISE + `uniform float uMode; uniform vec3 uSun; uniform float uTime; varying vec3 vP; varying vec3 vN;
        void main(){ float c=fbm(normalize(vP)*3.0+vec3(uTime*0.01,0.0,0.0)); float a=smoothstep(0.05,0.5,c); vec3 L=normalize((viewMatrix*vec4(normalize(uSun),0.0)).xyz); float dif=max(dot(normalize(vN),L),0.0);
          gl_FragColor=vec4(vec3(1.0)*(0.45+0.6*dif),a*mix(0.08,0.85,uMode)); }`
    })); g.add(clouds);
    const N = MOBILE ? 3500 : 8000, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; pos.set([Math.cos(th) * r * R * 1.004, y * R * 1.004, Math.sin(th) * r * R * 1.004], i * 3); }
    const dotMat = new THREE.ShaderMaterial({
      uniforms: { uMode: U.uMode, uPR: U.uPR, uAcc: { value: IRIS }, uAur: { value: AUR } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: NOISE + LAND + `attribute float aSize; uniform float uPR; uniform float uMode; varying float vL; varying float vF;
        void main(){ vL=smoothstep(0.12,0.3,land(position)); vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv;
          vec3 n=normalize(normalMatrix*normalize(position)); vF=clamp(dot(n,normalize(-mv.xyz)),0.0,1.0); gl_PointSize=(uMode>0.98?0.0:(0.8+vL*1.1))*uPR*(70.0/max(1.0,-mv.z)); }`,
      fragmentShader: `uniform float uMode; uniform vec3 uAcc; uniform vec3 uAur; varying float vL; varying float vF;
        void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.1,d); if(a<0.02) discard; vec3 c=mix(uAcc*0.4,mix(uAcc,uAur,vF)*1.15,vL);
          gl_FragColor=vec4(c,a*(0.2+0.8*vF)*(0.25+0.75*vL)*(1.0-uMode)); }`
    });
    const dots = new THREE.Points(pointsGeo(pos, () => 1), dotMat); g.add(dots);
    const atm = new THREE.Mesh(new THREE.SphereGeometry(R * 1.13, 96, 64), new THREE.ShaderMaterial({
      uniforms: { uMode: U.uMode }, side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform float uMode; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(clamp(0.74+dot(vN,vV),0.0,1.0),3.0); vec3 c=mix(vec3(0.66,0.61,1.0)*1.8,vec3(0.86,0.70,0.86)*1.1,uMode); gl_FragColor=vec4(c,f*0.95); }`
    })); g.add(atm);
    const ll = (lat, lon, r) => { const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180; return V(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)); };
    const home = ll(48.47, 7.94, R * 1.02);
    const hm = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff })); hm.position.copy(home); g.add(hm);
    const arcs = [], A = MOBILE ? 14 : 26, heads = new Float32Array(A * 3), arcMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    blendables.push(arcMat);
    for (let i = 0; i < A; i++) {
      const to = ll(-50 + rnd() * 115, -170 + rnd() * 340, R * 1.02), mid = home.clone().add(to).multiplyScalar(0.5); mid.setLength(R + home.distanceTo(to) * 0.42);
      const pts = new THREE.QuadraticBezierCurve3(home, mid, to).getPoints(90);
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat); g.add(line); arcs.push({ line, pts, ph: rnd(), sp: 0.12 + rnd() * 0.12 });
    }
    const hp = addPoints(g, heads, { size: () => 3.2, night: STAR, day: C("#FFFFFF"), dayOpacity: 1, boost: 3, interact: 0 });
    const ha = hp.geometry.attributes.position;
    onMode((m) => { arcMat.color.copy(AUR).multiplyScalar(1.8).lerp(C("#FFFFFF"), m); hm.material.color.copy(SOL).multiplyScalar(3).lerp(C("#FFB25E"), m); });
    let spin = 0;
    reg(5, (t, dt, near) => {
      if (!near) return;
      spin += dt * 0.06; g.rotation.y = spin + 2.2 + mouse.sx * 0.5; g.rotation.x = -mouse.sy * 0.2; clouds.rotation.y = t * 0.012;
      arcs.forEach((a, i) => {
        a.ph += dt * a.sp * (1 + pulse * 3); const u = a.ph % 1.6, head = clamp(u) * 90 | 0, tail = clamp(u - 0.35) * 90 | 0;
        a.line.geometry.setDrawRange(tail, Math.max(0, head - tail + 1)); const p = a.pts[Math.min(90, head)]; ha.array.set([p.x, p.y, p.z], i * 3);
      });
      ha.needsUpdate = true;
    });
  }

  const jellies = []; let whale = null, bubbles = null; // ocean layers removed in v7 (clean)

  /* ---------- camera / picking / mode ---------- */
  const look = V(0, 0, 0), up = V(0, 1, 0);
  function placeCamera(dt) {
    const f = prog * (ST.length - 1), i = Math.min(ST.length - 2, Math.floor(f)), t = clamp(f - i), e = ease(clamp((t - 0.18) / 0.64));
    const A = pose(i, t * 0.55), B = pose(i + 1, (t - 1) * 0.55);
    const pos = A.pos.clone().lerp(B.pos, e); pos.y += Math.sin(Math.PI * e) * 7;
    const lk = A.look.clone().lerp(B.look, ease(clamp((t - 0.12) / 0.7)));
    const ie = ease(intro); pos.z += (1 - ie) * 46 - charge * 4; pos.y += (1 - ie) * 6;
    mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 3); mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 3);
    pos.x += mouse.sx * 0.9; pos.y += mouse.sy * 0.6;
    camera.position.copy(pos); look.copy(lk);
    const roll = Math.sin(Math.PI * e) * 0.12 * (i % 2 ? -1 : 1); up.set(Math.sin(roll), Math.cos(roll), 0); camera.up.copy(up); camera.lookAt(look);
    sky.position.copy(camera.position);
    buildP = RM ? 1 : clamp((f - 1.35) / 0.75); fanP = RM ? 1 : clamp((f - 3.4) / 0.7);
    return f;
  }
  const pk = new THREE.Vector3();
  function screenHit(obj, r) {
    pk.setFromMatrixPosition(obj.matrixWorld); const cd = pk.clone().sub(camera.position); camera.getWorldDirection(look2); if (cd.dot(look2) < 0) return false;
    pk.project(camera); return Math.hypot((pk.x - mouse.x) * camera.aspect, pk.y - mouse.y) < r;
  }
  const look2 = new THREE.Vector3();
  function doPick(f) {
    hover = null; if (whale) whale.hovered = false; jellies.forEach((j) => (j.hovered = false));
    if (!mouse.active) return;
    for (const j of jellies) { if (j.g.visible && screenHit(j.g, 0.05 * j.sc * (small() ? 1.6 : 1) * Math.min(2.5, 30 / Math.max(8, j.g.position.distanceTo(camera.position))))) { j.hovered = true; hover = { kind: "jelly", data: j }; return; } }
    if (whale && screenHit(whale.grp, small() ? 0.2 : 0.14)) { whale.hovered = true; hover = { kind: "whale" }; }
    const cand = pickables.filter((p) => Math.abs(f - p.st) < 0.45); if (!cand.length) return;
    ndc.set(mouse.x, mouse.y); ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(cand.map((c) => c.mesh), false);
    if (hits.length) { hover = cand.find((c) => c.mesh === hits[0].object); if (whale) whale.hovered = false; }
  }
  function applyBg() {
    const bg = BG_N.clone().lerp(ABYSS_N, depth).lerp(BG_D.clone().lerp(MIST_D, depth * 0.7), mode);
    renderer.setClearColor(bg, 1); scene.fog.color.copy(bg); scene.fog.density = lerp(lerp(0.008, 0.011, depth), 0.0045, mode); bgDepth = depth;
  }
  function applyMode() {
    U.uMode.value = mode;
    applyBg();
    if (bloom) { bloom.strength = lerp(MOBILE ? 0.75 : 0.95, 0.0, ease(mode)); bloom.threshold = lerp(0.9, 1.4, mode); bloom.enabled = mode < 0.97; }
    const day = mode > 0.5;
    if (day !== blendDay) { blendDay = day; const b = day ? THREE.NormalBlending : THREE.AdditiveBlending; pmats.concat(blendables).forEach((m) => { if (m.blending !== b) { m.blending = b; m.needsUpdate = true; } }); }
    modeFns.forEach((fn) => fn(mode));
  }

  /* ---------- loop ---------- */
  function frame(now) {
    if (!running) return;
    const raw = Math.min(0.3, (now - (last || now)) / 1000), dt = Math.min(0.05, raw); last = now;
    if (!RM) { time += dt; intro = Math.min(1, intro + raw / 2.6); prog += (target - prog) * (1 - Math.exp(-raw * 3.2)); } else prog = target;
    const pm = mode; mode += (modeTarget - mode) * (RM ? 1 : 1 - Math.exp(-raw * 2.6)); if (Math.abs(modeTarget - mode) < 0.002) mode = modeTarget;
    if (mode !== pm || frames === 0) applyMode();
    pulse = Math.max(0, pulse - dt * 0.9); excite = Math.max(0, excite - dt * 0.12);

    const mv = Math.hypot(mouse.x - lastMx, mouse.y - lastMy) / Math.max(raw, 0.001); lastMx = mouse.x; lastMy = mouse.y;
    mvel += (Math.min(1, mv * 0.25) - mvel) * Math.min(1, raw * 6);
    U.uTime.value = time; U.uMouse.value.set(mouse.active ? mouse.sx : 9, mouse.active ? mouse.sy : 9);
    const f = placeCamera(dt); updatePivots(f, raw);
    updaters.forEach((u) => u.fn(time, dt, u.st < 0 || Math.abs(f - u.st) < 1.5 || frames < 3));
    if (frames % 3 === 0) doPick(f);
    const speed = Math.min(1, Math.abs(prog - lastProg) / Math.max(raw, 0.001) * 3.2); lastProg = prog;
    charge += (chargeT - charge) * Math.min(1, raw * 4); coreHover = Math.max(coreHover, charge);
    fxS += (Math.max(speed, charge * 0.8, pulse * 0.6) - fxS) * Math.min(1, raw * 5);
    if (fx) { const fu = fx.uniforms; fu.uStr.value = RM ? 0 : fxS; fu.uMouse.value.set((mouse.sx + 1) / 2, (mouse.sy + 1) / 2); fu.uMV.value = RM || !mouse.active ? 0 : mvel; fu.uBurstT.value = burstT; fu.uAsp.value = camera.aspect; }
    if (composer && bloomOn) composer.render(); else renderer.render(scene, camera);
    frames++; if (frames > 30 && frames < 150) { if (dt > 0.032) slow++; if (frames === 149 && slow > 60) degrade(); }
    if (!RM) raf = requestAnimationFrame(frame); else running = false;
  }
  function degrade() { bloomOn = false; renderer.setPixelRatio(1); resize(); }
  function resize() {
    if (!renderer) return;
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 62 : 46; camera.updateProjectionMatrix(); U.uAspect.value = w / h;
    if (composer) { composer.setSize(w, h); if (bloom) bloom.setSize(MOBILE ? w / 2 : w, MOBILE ? h / 2 : h); if (fx) fx.uniforms.uRes.value.set(w, h); }
    U.uPR.value = renderer.getPixelRatio();
  }
  function init(cv, day) {
    if (ok) return true;
    if (!HAS_GL) return false;
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, powerPreference: "high-performance" }); } catch (e) { return false; }
    if (!renderer.getContext()) return false;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1.75 : 2));
    mode = modeTarget = day ? 1 : 0;
    scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(BG_N, 0.008);
    camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 900);
    buildSky(); buildStars(); buildCore(); buildPrompts(); buildTower(); buildNetwork(); buildFan(); buildGlobe();
    if (THREE.EffectComposer && THREE.UnrealBloomPass && THREE.RenderPass) {
      try {
        const w2 = renderer.capabilities.isWebGL2;
        composer = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: w2 ? THREE.HalfFloatType : THREE.UnsignedByteType }));
        composer.addPass(new THREE.RenderPass(scene, camera));
        bloom = new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.95, 0.6, w2 ? 0.9 : 0.6); composer.addPass(bloom);
        if (THREE.ShaderPass) {
          fx = new THREE.ShaderPass({
            uniforms: { tDiffuse: { value: null }, uStr: { value: 0 }, uTime: U.uTime, uMode: U.uMode, uDepth: U.uDepth, uRes: { value: new THREE.Vector2(innerWidth, innerHeight) }, uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uMV: { value: 0 }, uBurstT: { value: -99 }, uAsp: { value: 1 } },
            vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
            fragmentShader: `uniform sampler2D tDiffuse; uniform float uStr; uniform float uTime; uniform float uMode; uniform float uDepth; uniform vec2 uRes; uniform vec2 uMouse; uniform float uMV; uniform float uBurstT; uniform float uAsp; varying vec2 vUv;
              void main(){ vec2 uv=vUv;
                uv+=vec2(sin(uv.y*9.0+uTime*0.7),cos(uv.x*8.0+uTime*0.55))*0.0009*uDepth;
                vec2 dm=uv-uMouse; dm.x*=uAsp; float rm=length(dm);
                if(uMV>0.01){ vec2 dd=dm/(rm+1e-4); dd.x/=uAsp; uv+=dd*sin(rm*70.0-uTime*9.0)*exp(-rm*rm*55.0)*0.0045*uMV; }
                float age=uTime-uBurstT; if(age>0.0&&age<2.2){ vec2 c2=uv-0.5; c2.x*=uAsp; float rr=length(c2); float ring=exp(-pow((rr-age*0.85)*7.0,2.0))*exp(-age*1.5); vec2 d2=normalize(c2+1e-5); d2.x/=uAsp; uv+=d2*ring*0.022; }
                vec2 c=uv-0.5; float r=length(c); float s=uStr*0.018*r;
                vec3 col=vec3(texture2D(tDiffuse,uv-c*s).r,texture2D(tDiffuse,uv).g,texture2D(tDiffuse,uv+c*s).b);
                if(uStr>0.01){ vec3 acc=vec3(0.0); for(int i=0;i<6;i++){ float k=float(i)/5.0; acc+=texture2D(tDiffuse,uv-c*k*uStr*0.05).rgb; } col=mix(col,acc/6.0,clamp(uStr,0.0,1.0)*0.55); }
                float g=fract(sin(dot(floor(vUv*uRes)+fract(uTime*7.0)*91.0,vec2(12.9898,78.233)))*43758.5453);
                col+=(g-0.5)*mix(0.03,0.018,uMode);
                col*=1.0-smoothstep(0.55,0.95,r)*mix(0.35,0.12,uMode);
                gl_FragColor=vec4(col,1.0); }`
          });
          composer.addPass(fx);
        }
      } catch (e) { composer = null; }
    }
    resize(); addEventListener("resize", resize); applyMode();
    ok = true; return true;
  }
  return {
    init,
    start() { if (!ok || running) return; running = true; last = 0; raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); },
    progress(p) { target = clamp(p); if (RM && ok && !running) { running = true; requestAnimationFrame(frame); } },
    pointer(x, y, active) {
      mouse.x = x; mouse.y = y; mouse.active = active !== false;
      if (mouse.active && Math.hypot(x - trailX, y - trailY) > 0.012) { trail[trailI].set(x, y, time); trailI = (trailI + 1) % trail.length; trailX = x; trailY = y; }
    },
    setMode(day) { modeTarget = day ? 1 : 0; if (RM && ok && !running) { running = true; requestAnimationFrame(frame); } },
    charge(c) { chargeT = clamp(c); },
    burst() {
      pulse = 1; chargeT = 0; charge = Math.max(charge, 1); burstT = time; excite = 1;
      if (bubbles && camera) { const f = new THREE.Vector3(); camera.getWorldDirection(f); bubbles.spawn(camera.position.clone().addScaledVector(f, 9).add(V(0, -2.5, 0)), MOBILE ? 14 : 22, 2, true); }
      jellies.forEach((j) => (j.kick = 1));
    },
    velocity() {},
    pulse() { pulse = 0.6; },
    click() {
      pulse = 1; U.uRip.value.set(mouse.x, mouse.y, time);
      if (bubbles && camera) { ndc.set(mouse.x, mouse.y); ray.setFromCamera(ndc, camera); bubbles.spawn(ray.ray.origin.clone().addScaledVector(ray.ray.direction, 9), 6, 0.35, false); }
      if (hover && hover.kind === "jelly") { hover.data.kick = 1; return { kind: "jelly" }; }
      if (hover && hover.kind === "whale") { excite = 1; return { kind: "whale" }; }
      return hover ? { kind: hover.kind, data: hover.data } : null;
    },
    drag(dx, dy) { spin.vy += dx * 9; spin.vx += dy * 5; },
    get hover() { return hover ? hover.kind : null; },
    get ok() { return ok; }
  };
})();
