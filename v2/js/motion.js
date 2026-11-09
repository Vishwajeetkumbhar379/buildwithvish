/* Build with Vish 2.0 prototype: headings rise in, word by word, as they come into view (GSAP SplitText, free since 3.13). */
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.SplitText) return;
  gsap.registerPlugin(SplitText);
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const sp = new SplitText(e.target, { type: 'words', mask: 'words' });
    gsap.from(sp.words, { yPercent: 115, opacity: 0, duration: 1.15, ease: 'expo.out', stagger: .05 });
  }), { threshold: .35 });
  const watch = () => document.querySelectorAll('.page.on .h1:not([data-split]), .page.on .h2:not([data-split])').forEach((el) => { if (el.closest('.flight')) return; el.dataset.split = '1'; io.observe(el); });
  watch(); addEventListener('hashchange', () => setTimeout(watch, 650));
})();
