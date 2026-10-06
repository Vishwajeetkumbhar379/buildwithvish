/* ===== Build with Vish: sound engine v3 =====
   A generative ambient score plus a UI sound kit, synthesised live with the WebAudio API (no samples, no licences needed).
   Everything lives in D major, so any layer and any UI note agrees with any other.
   Layers: breathing glass pad (chord per chapter) · low drone · sea swells and deep rumble · star plucks (FM glass)
   · whale calls · sonar pings · bubbles. Depth (0 at the top of the journey, 1 in the abyss) darkens and muffles the mix. */
window.SoundEngine = function (ctx) {
  "use strict";
  const now = () => ctx.currentTime;
  const R = Math.random;
  const sr = ctx.sampleRate;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const CH = [
    [50, 57, 64, 66, 73], // Dmaj9      wonder
    [47, 54, 62, 64, 69], // Bm11       focus
    [43, 50, 66, 69, 73], // Gmaj7#11   float
    [40, 47, 62, 66, 67], // Em9        depth
    [45, 52, 59, 64, 73], // A6/9       lift
    [38, 57, 64, 66, 69]  // D6/9       home
  ];
  const PENTA = [74, 76, 78, 81, 83, 86, 88, 90, 93];
  const pick = (a) => a[(R() * a.length) | 0];
  const hasPan = !!ctx.createStereoPanner;
  const IS_OFF = typeof OfflineAudioContext !== "undefined" && ctx instanceof OfflineAudioContext;
  const LEVEL = 0.5;

  /* ---------- master chain ---------- */
  const bus = ctx.createGain();
  const shelf = ctx.createBiquadFilter(); shelf.type = "highshelf"; shelf.frequency.value = 8000; shelf.gain.value = -2.5;
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -26; comp.knee.value = 16; comp.ratio.value = 2; comp.attack.value = 0.015; comp.release.value = 0.35;
  const out = ctx.createGain(); out.gain.value = 0;
  const lim = ctx.createDynamicsCompressor(); lim.threshold.value = -3; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.002; lim.release.value = 0.15;
  bus.connect(shelf); shelf.connect(comp); comp.connect(out); out.connect(lim); lim.connect(ctx.destination);
  // music runs through the depth filter: the deeper you go, the darker and more muffled it gets
  const music = ctx.createGain();
  const depthLP = ctx.createBiquadFilter(); depthLP.type = "lowpass"; depthLP.frequency.value = 6500; depthLP.Q.value = 0.5;
  music.connect(depthLP); depthLP.connect(bus);

  /* ---------- space: one long reverb + one ping-pong delay ---------- */
  function makeIR(sec, pre) {
    const len = Math.floor(sr * sec), p0 = Math.floor(sr * pre), b = ctx.createBuffer(2, len, sr);
    const kLo = Math.exp(-6.9 / (sec * sr)), kMid = Math.exp(-6.9 / (sec * 0.42 * sr)), kHi = Math.exp(-6.9 / (sec * 0.14 * sr));
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c); let lo = 0, mid = 0, eLo = 1, eMid = 1, eHi = 1;
      for (let i = p0; i < len; i++) {
        const n = R() * 2 - 1; lo += 0.05 * (n - lo); mid += 0.28 * (n - mid);
        d[i] = lo * 3.4 * eLo + (mid - lo) * eMid + (n - mid) * 0.3 * eHi;
        eLo *= kLo; eMid *= kMid; eHi *= kHi;
      }
      [[0.013, 0.42], [0.021, 0.33], [0.034, 0.26], [0.047, 0.19], [0.061, 0.14]].forEach(([t, g], k) => { const i = p0 + Math.floor(sr * (t + (c ? 0.0031 * (k + 1) : 0))); if (i < len) d[i] += g * (k % 2 ? -1 : 1) * (c ? -1 : 1); });
      for (let i = p0; i < p0 + 400 && i < len; i++) d[i] *= (i - p0) / 400;
    }
    return b;
  }
  const verbIn = ctx.createGain(), verbHP = ctx.createBiquadFilter(), verb = ctx.createConvolver(), verbOut = ctx.createGain();
  verbHP.type = "highpass"; verbHP.frequency.value = 180; verb.buffer = makeIR(5.8, 0.032); verbOut.gain.value = 0.85;
  verbIn.connect(verbHP); verbHP.connect(verb); verb.connect(verbOut); verbOut.connect(music);
  const dIn = ctx.createGain(), dL = ctx.createDelay(2), dR = ctx.createDelay(2), fb = ctx.createGain(), dLP = ctx.createBiquadFilter(), dOut = ctx.createGain();
  dL.delayTime.value = 0.42; dR.delayTime.value = 0.63; fb.gain.value = 0.36; dLP.type = "lowpass"; dLP.frequency.value = 2400; dOut.gain.value = 0.55;
  dIn.connect(dL); dL.connect(dR); dR.connect(dLP); dLP.connect(fb); fb.connect(dL);
  if (ctx.createChannelMerger) { const mg = ctx.createChannelMerger(2); dL.connect(mg, 0, 0); dR.connect(mg, 0, 1); mg.connect(dOut); } else { dL.connect(dOut); dR.connect(dOut); }
  dOut.connect(music); const dv = ctx.createGain(); dv.gain.value = 0.3; dOut.connect(dv); dv.connect(verbIn);

  // send a source to the dry bus, the reverb and the delay, with a pan position
  function route(src, o) {
    let n = src;
    if (hasPan) { const p = ctx.createStereoPanner(); p.pan.value = clamp(o.pan || 0, -1, 1); src.connect(p); n = p; }
    if (o.dry) { const g = ctx.createGain(); g.gain.value = o.dry; n.connect(g); g.connect(o.ui ? bus : music); }
    if (o.verb) { const g = ctx.createGain(); g.gain.value = o.verb; n.connect(g); g.connect(verbIn); }
    if (o.delay) { const g = ctx.createGain(); g.gain.value = o.delay; n.connect(g); g.connect(dIn); }
    return n;
  }
  function noiseBuf(sec, brown) {
    const len = Math.floor(sr * sec), b = ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, br = 0;
      for (let i = 0; i < len; i++) {
        const w = R() * 2 - 1;
        if (brown) { br = (br + 0.02 * w) / 1.02; d[i] = br * 3.2; }
        else { b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898; d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + w * 0.5362) * 0.11; }
      }
      const f = Math.floor(sr * 0.05); for (let i = 0; i < f; i++) { const k = i / f; d[i] = d[i] * k + d[len - f + i] * (1 - k); }
    }
    return b;
  }
  const PINK = noiseBuf(9, false), BROWN = noiseBuf(7, true);

  /* ---------- timbres ---------- */
  const padWave = ctx.createPeriodicWave(new Float32Array(8), new Float32Array([0, 1, 0.42, 0.19, 0.1, 0.05, 0.028, 0.014]));
  const glassWave = ctx.createPeriodicWave(new Float32Array(8), new Float32Array([0, 1, 0, 0.28, 0, 0.1, 0, 0.04]));

  /* ---------- pad: two banks crossfade on chapter change, each voice breathes on its own cycle ---------- */
  const padBus = ctx.createGain(), padLP = ctx.createBiquadFilter();
  padLP.type = "lowpass"; padLP.frequency.value = 2400; padLP.Q.value = 0.6; const padHP = ctx.createBiquadFilter(); padHP.type = "highpass"; padHP.frequency.value = 95; padBus.connect(padHP); padHP.connect(padLP); route(padLP, { dry: 0.6, verb: 0.75 });
  let padBase = 2400, rushAmt = 0, bank = null, started = false, cur = 0, depth = 0;
  function makeBank(notes, at) {
    return notes.map((m, k) => {
      const env = ctx.createGain(), breath = ctx.createGain(), amp = [0.026, 0.03, 0.034, 0.031, 0.027][k] || 0.026;
      env.gain.setValueAtTime(0, at); env.gain.setTargetAtTime(amp, at, 2.2);
      breath.gain.value = 0.72;
      const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      const w = k >= 3 ? glassWave : padWave; o1.setPeriodicWave(w); o2.setPeriodicWave(w);
      o1.frequency.value = o2.frequency.value = mtof(m); o1.detune.value = -4 - R() * 4; o2.detune.value = 4 + R() * 4;
      lfo.frequency.value = 0.03 + R() * 0.06; lg.gain.value = 0.28; lfo.connect(lg); lg.connect(breath.gain);
      o1.connect(env); o2.connect(env); env.connect(breath);
      if (hasPan) { const p = ctx.createStereoPanner(); p.pan.value = (k / (notes.length - 1) - 0.5) * 1.2; breath.connect(p); p.connect(padBus); } else breath.connect(padBus);
      [o1, o2, lfo].forEach((o) => o.start(at));
      return { env, osc: [o1, o2, lfo] };
    });
  }
  function retire(b, at) { b.forEach((v) => { v.env.gain.setTargetAtTime(0, at, 1.9); v.osc.forEach((o) => { try { o.stop(at + 11); } catch (e) {} }); }); }

  /* ---------- drone ---------- */
  const droneG = ctx.createGain(); droneG.gain.value = 0; route(droneG, { dry: 0.85, verb: 0.3 });
  const dr1 = ctx.createOscillator(), dr2 = ctx.createOscillator(), drl = ctx.createOscillator(), drlg = ctx.createGain(), dr2g = ctx.createGain();
  dr1.type = dr2.type = "sine"; dr2g.gain.value = 0.45; dr1.connect(droneG); dr2.connect(dr2g); dr2g.connect(droneG);
  drl.frequency.value = 0.05; drlg.gain.value = 0.008; drl.connect(drlg); drlg.connect(droneG.gain);

  /* ---------- sea: swells, foam, deep rumble, and a rush when you move ---------- */
  const sea = ctx.createBufferSource(), seaLP = ctx.createBiquadFilter(), seaG = ctx.createGain(), foamBP = ctx.createBiquadFilter(), foamG = ctx.createGain();
  sea.buffer = PINK; sea.loop = true; seaLP.type = "lowpass"; seaLP.frequency.value = 820; seaG.gain.value = 0.0001;
  foamBP.type = "bandpass"; foamBP.frequency.value = 2600; foamBP.Q.value = 0.6; foamG.gain.value = 0.0001;
  sea.connect(seaLP); seaLP.connect(seaG); const seaP = route(seaG, { dry: 0.9, verb: 0.3 });
  sea.connect(foamBP); foamBP.connect(foamG); route(foamG, { dry: 0.55, verb: 0.25, pan: 0.2 });
  const rum = ctx.createBufferSource(), rumLP = ctx.createBiquadFilter(), rumG = ctx.createGain();
  rum.buffer = BROWN; rum.loop = true; rumLP.type = "lowpass"; rumLP.frequency.value = 160; rumG.gain.value = 0.0001;
  rum.connect(rumLP); rumLP.connect(rumG); route(rumG, { dry: 1 });
  const rush = ctx.createBufferSource(), rushBP = ctx.createBiquadFilter(), rushG = ctx.createGain();
  rush.buffer = PINK; rush.loop = true; rush.playbackRate.value = 0.7; rushBP.type = "bandpass"; rushBP.frequency.value = 700; rushBP.Q.value = 0.8; rushG.gain.value = 0;
  rush.connect(rushBP); rushBP.connect(rushG); route(rushG, { dry: 0.8, verb: 0.2 });

  /* ---------- voices ---------- */
  function pluck(m, at, lvl, o) {
    o = o || {}; const f = mtof(m), dur = o.dur || 2.8;
    const car = ctx.createOscillator(), mod = ctx.createOscillator(), mg = ctx.createGain(), g = ctx.createGain();
    car.frequency.value = f * (1 + (R() - 0.5) * 0.004); mod.frequency.value = f * 3.5;
    mg.gain.setValueAtTime(f * 1.3, at); mg.gain.exponentialRampToValueAtTime(f * 0.01, at + 0.7);
    mod.connect(mg); mg.connect(car.frequency); car.connect(g);
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(lvl, at + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    route(g, { dry: 0.45, verb: o.verb == null ? 0.6 : o.verb, delay: o.delay == null ? 0.35 : o.delay, pan: o.pan == null ? (R() - 0.5) * 1.2 : o.pan, ui: o.ui });
    car.start(at); mod.start(at); car.stop(at + dur + 0.05); mod.stop(at + dur + 0.05);
  }
  function whale(at, near) {
    const dur = 3.2 + R() * 1.6, base = mtof(pick([57, 59, 62])), shape = (R() * 3) | 0;
    const path = shape === 0 ? [0.8, 1.12, 0.68] : shape === 1 ? [0.62, 0.8, 1.3] : [1.1, 1.0, 0.6];
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), o2g = ctx.createGain(), env = ctx.createGain(), am = ctx.createOscillator(), amg = ctx.createGain(), amb = ctx.createGain();
    const vib = ctx.createOscillator(), vg = ctx.createGain(), form = ctx.createBiquadFilter(), body = ctx.createBiquadFilter(), mix = ctx.createGain();
    o1.type = "sine"; o2.type = "triangle"; o2g.gain.value = 0.32;
    [o1, o2].forEach((o) => { o.frequency.setValueAtTime(base * path[0], at); o.frequency.exponentialRampToValueAtTime(base * path[1], at + dur * 0.38); o.frequency.exponentialRampToValueAtTime(base * path[2], at + dur); });
    vib.frequency.value = 4.6 + R(); vg.gain.setValueAtTime(0, at); vg.gain.linearRampToValueAtTime(14, at + dur * 0.6); vib.connect(vg); vg.connect(o1.detune); vg.connect(o2.detune);
    am.frequency.value = 26 + R() * 8; amg.gain.value = 0.12; amb.gain.value = 0.88; am.connect(amg); amg.connect(amb.gain);
    form.type = "bandpass"; form.frequency.value = 650 + R() * 250; form.Q.value = 2.2; body.type = "lowpass"; body.frequency.value = 1100;
    o1.connect(mix); o2.connect(o2g); o2g.connect(mix); mix.connect(amb); amb.connect(form); amb.connect(body);
    const fg = ctx.createGain(); fg.gain.value = 0.6; form.connect(fg); fg.connect(env); body.connect(env);
    const lvl = near ? 0.11 : 0.075;
    env.gain.setValueAtTime(0.0001, at); env.gain.setTargetAtTime(lvl, at, 0.35); env.gain.setTargetAtTime(0.0001, at + dur - 0.9, 0.4);
    route(env, { dry: near ? 0.5 : 0.14, verb: near ? 0.75 : 0.95, delay: 0.18, pan: (R() - 0.5) * 0.9 });
    [o1, o2, vib, am].forEach((o) => { o.start(at); o.stop(at + dur + 1.2); });
  }
  function ping(at, lvl) {
    const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g2 = ctx.createGain(), g = ctx.createGain();
    o.frequency.value = mtof(86); o2.frequency.value = mtof(98); g2.gain.value = 0.18; o2.connect(g2); g2.connect(g); o.connect(g);
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(lvl || 0.022, at + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, at + 1.3);
    route(g, { dry: 0.4, verb: 0.55, delay: 0.6, pan: (R() - 0.5) * 0.7 });
    [o, o2].forEach((x) => { x.start(at); x.stop(at + 1.35); });
  }
  function bubble(at, f0, lvl, dur) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(f0, at); o.frequency.exponentialRampToValueAtTime(f0 * 1.9, at + dur);
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(lvl, at + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, at + dur * 1.35);
    route(g, { dry: 0.85, verb: 0.22, pan: (R() - 0.5) * 0.9, ui: true });
    o.start(at); o.stop(at + dur * 1.35 + 0.02);
  }
  function bubbles(n, spread, at, size) {
    at = at || now(); size = size || 1;
    for (let k = 0; k < n; k++) bubble(at + R() * spread, (480 + R() * 1250) / size, 0.01 + R() * 0.02, 0.03 + R() * 0.055);
  }

  /* ---------- state, depth, chapters ---------- */
  let lvlK = 1, isLive = false, isDucked = false;
  let pendingCh = 0, pendingAt = 0, appliedCh = -1, nextWave = 0, nextPluck = 0, nextWhale = 0, nextPing = 0, nextBub = 0, timer = 0, riserN = null, lastHover = 0;
  function applyChapter(i, at) {
    const notes = CH[i] || CH[0];
    if (bank) retire(bank, at);
    bank = makeBank(notes, at);
    const root = mtof(notes[0] < 45 ? notes[0] + 12 : notes[0]);
    dr1.frequency.setTargetAtTime(root / 2, at, 1.4); dr2.frequency.setTargetAtTime(root, at, 1.4);
    appliedCh = i;
  }
  function setDepthNow(at) {
    const d = depth;
    depthLP.frequency.setTargetAtTime(7000 * Math.pow(0.24, d), at, 0.6);
    rumG.gain.setTargetAtTime(0.012 + d * 0.06, at, 1.2);
    padBase = 2400 - d * 1000;
    padLP.frequency.setTargetAtTime(padBase + rushAmt * 900, at, 0.25);
  }
  function wave(at) {
    const rise = 2.1 + R() * 1.6, fall = 3.4 + R() * 2.6, surf = 1 - depth * 0.75, peak = (0.045 + R() * 0.035) * surf;
    seaG.gain.setTargetAtTime(peak, at, rise / 3); seaG.gain.setTargetAtTime(0.008 * surf + 0.002, at + rise, fall / 3);
    foamG.gain.setTargetAtTime(peak * 0.32 * (1 - depth), at + rise * 0.65, 0.5); foamG.gain.setTargetAtTime(0.0005, at + rise * 0.65 + 0.9, fall / 4);
    if (seaP.pan) seaP.pan.setTargetAtTime((R() - 0.5) * 0.9, at, 2);
    return at + rise + fall * 0.65 + R() * 2;
  }
  function tick(t) {
    t = t == null ? now() : t;
    if (appliedCh !== pendingCh && t - pendingAt > 0.45) applyChapter(pendingCh, t + 0.02);
    if (t >= nextWave) nextWave = wave(t + 0.05);
    if (t >= nextPluck) {
      const deep = depth > 0.55, n = R() < 0.25 ? 2 + ((R() * 2) | 0) : 1;
      for (let k = 0; k < n; k++) pluck(pick(PENTA) - (deep ? 12 : 0), t + 0.05 + k * (0.18 + R() * 0.3), 0.014 + R() * 0.014);
      nextPluck = t + (3 + R() * 6) * (1 + depth);
    }
  }

  return {
    get time() { return now(); },
    start() {
      const t = now();
      if (!started) {
        started = true; [dr1, dr2, drl, sea, rum, rush].forEach((s) => s.start(t));
        applyChapter(pendingCh, t); setDepthNow(t);
        droneG.gain.setTargetAtTime(0.03, t, 2);
        nextWave = t + 0.4; nextPluck = t + 1.6; nextWhale = t + 6; nextPing = t + 4; nextBub = t + 2.5;
      }
      if (ctx.state === "suspended" && ctx.resume && !IS_OFF) ctx.resume().catch(() => {});
      out.gain.cancelScheduledValues(t); out.gain.setTargetAtTime(LEVEL * lvlK, t, 0.6); isLive = true; isDucked = false;
      pluck(81, t + 0.05, 0.03, { ui: false }); pluck(86, t + 0.2, 0.022, {});
      if (!timer && !IS_OFF) timer = setInterval(() => tick(), 200);
    },
    stop() {
      const t = now(); out.gain.cancelScheduledValues(t); out.gain.setTargetAtTime(0, t, 0.22); isLive = false;
      if (timer) { clearInterval(timer); timer = 0; }
      setTimeout(() => { if (!timer && ctx.state === "running" && ctx.suspend) ctx.suspend(); }, 1600);
    },
    duck(d) { isDucked = d; if (!isLive) return; const t = now(); out.gain.cancelScheduledValues(t); out.gain.setTargetAtTime(d ? 0 : LEVEL * lvlK, t, 0.3); },
    level(k) { lvlK = k; if (!isLive || isDucked) return; const t = now(); out.gain.cancelScheduledValues(t); out.gain.setTargetAtTime(LEVEL * lvlK, t, 0.9); },
    tick,
    setChapter(i, at) { pendingCh = i; pendingAt = at == null ? now() : at; if (!started) appliedCh = -1; },
    setDepth(d, at) { depth = clamp(d); if (started) setDepthNow(at == null ? now() : at); },
    scroll(v) {
      const s = clamp(Math.abs(v) / 700), t = now(); rushAmt += (s - rushAmt) * 0.5;
      rushG.gain.setTargetAtTime(rushAmt * 0.05, t, 0.15); rushBP.frequency.setTargetAtTime(500 + rushAmt * 900, t, 0.2);
      padLP.frequency.setTargetAtTime(padBase + rushAmt * 900, t, 0.25);
    },
    hover() { const t = now(); if (t - lastHover < 0.07) return; lastHover = t; bubble(t, 1250 + R() * 650, 0.009, 0.026); },
    click(at) {
      at = at || now(); const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(190, at); o.frequency.exponentialRampToValueAtTime(115, at + 0.1);
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.05, at + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.2);
      route(g, { dry: 0.9, verb: 0.18, ui: true }); o.start(at); o.stop(at + 0.22);
      bubbles(2, 0.08, at + 0.01);
    },
    splash(at) { at = at || now(); bubbles(6 + ((R() * 4) | 0), 0.35, at); },
    whoosh(at) {
      at = at || now();
      const s = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain(), sub = ctx.createOscillator(), sg = ctx.createGain();
      s.buffer = PINK; bp.type = "bandpass"; bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(240, at); bp.frequency.exponentialRampToValueAtTime(1900, at + 0.45); bp.frequency.exponentialRampToValueAtTime(320, at + 1.1);
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.11, at + 0.42); g.gain.exponentialRampToValueAtTime(0.0001, at + 1.15);
      s.connect(bp); bp.connect(g); const p = route(g, { dry: 0.8, verb: 0.4, ui: true, pan: -0.5 });
      if (p.pan) p.pan.linearRampToValueAtTime(0.5, at + 1.1);
      sub.frequency.value = 68; sg.gain.setValueAtTime(0.0001, at); sg.gain.exponentialRampToValueAtTime(0.06, at + 0.4); sg.gain.exponentialRampToValueAtTime(0.0001, at + 1.2);
      sub.connect(sg); route(sg, { dry: 1, ui: true });
      s.start(at, R() * 5); s.stop(at + 1.2); sub.start(at); sub.stop(at + 1.25);
      bubbles(7, 0.5, at + 0.45);
    },
    riser(k, at) {
      at = at || now();
      if (!riserN) {
        const a = ctx.createOscillator(), b = ctx.createOscillator(), lp = ctx.createBiquadFilter(), trem = ctx.createOscillator(), tg = ctx.createGain(), tb = ctx.createGain(), g = ctx.createGain();
        const n = ctx.createBufferSource(), nbp = ctx.createBiquadFilter(), ng = ctx.createGain();
        a.type = "sine"; b.setPeriodicWave(glassWave); lp.type = "lowpass"; lp.Q.value = 4; g.gain.value = 0; tb.gain.value = 0.75; tg.gain.value = 0.25;
        trem.frequency.value = 3; trem.connect(tg); tg.connect(tb.gain);
        a.connect(lp); b.connect(lp); lp.connect(tb); tb.connect(g); route(g, { dry: 0.7, verb: 0.55, delay: 0.15, ui: true });
        n.buffer = PINK; n.loop = true; nbp.type = "bandpass"; nbp.Q.value = 1.4; ng.gain.value = 0; n.connect(nbp); nbp.connect(ng); route(ng, { dry: 0.7, verb: 0.3, ui: true });
        [a, b, trem, n].forEach((o) => o.start(at));
        riserN = { a, b, lp, trem, g, nbp, ng };
      }
      const r = riserN, base = mtof(50), f = base * Math.pow(2, k * 2);
      r.a.frequency.setTargetAtTime(f, at, 0.05); r.b.frequency.setTargetAtTime(f * 1.5, at, 0.05);
      r.lp.frequency.setTargetAtTime(280 + k * 4200, at, 0.06); r.trem.frequency.setTargetAtTime(3 + k * 11, at, 0.1);
      r.nbp.frequency.setTargetAtTime(400 + k * 2600, at, 0.08);
      r.g.gain.setTargetAtTime(k > 0.01 ? 0.018 + k * 0.05 : 0, at, k > 0.01 ? 0.05 : 0.12);
      r.ng.gain.setTargetAtTime(k > 0.01 ? k * 0.035 : 0, at, 0.08);
    },
    bloom(at) {
      at = at || now();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(120, at); o.frequency.exponentialRampToValueAtTime(36, at + 1.5);
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.16, at + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, at + 2.3);
      route(g, { dry: 1, verb: 0.25, ui: true }); o.start(at); o.stop(at + 2.4);
      (CH[appliedCh < 0 ? 0 : appliedCh] || CH[0]).slice(1).forEach((m, k) => pluck(Math.min(98, m + 24), at + 0.04 + k * 0.07, 0.022, { delay: 0.45 }));
      padLP.frequency.setTargetAtTime(4200, at, 0.15); padLP.frequency.setTargetAtTime(padBase, at + 1.4, 1.4);
      bubbles(10, 1.2, at + 0.05);
      [86, 90, 93, 98].forEach((m, k) => pluck(m, at + 0.5 + k * 0.11, 0.02, { delay: 0.5 }));
    },
    chime(at) { at = at || now(); [74, 78, 81, 86].forEach((m, k) => pluck(m + 12, at + k * 0.09, 0.026, { ui: true })); },
    whale(near, at) { whale(at || now(), !!near); },
    bubbles(n, at) { bubbles(n || 8, 0.6, at || now()); },
    ping(at) { ping(at || now(), 0.03); },
    pluck
  };
};
