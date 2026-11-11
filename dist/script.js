(() => {
  'use strict';
  const PHONE = '923116066666';
  const MSG = 'Assalam-o-Alaikum, I would like to know more about Mardan Enclave.';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // WhatsApp links
  $$('.wa').forEach(a => {
    a.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MSG)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Sticky nav
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 60);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = $('#burger'), links = $('#links');
  const setMenu = open => {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    io.observe(el);
  });

  // Animated stats
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    co.unobserve(e.target);
    const el = e.target, to = parseFloat(el.dataset.to), dec = +el.dataset.dec || 0, suf = el.dataset.suf || '';
    const t0 = performance.now(), dur = 1600;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), v = to * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  $$('.count').forEach(el => co.observe(el));

  // Lightbox
  const lb = $('#lb'), lbImg = $('img', lb);
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; };
  $$('[data-lb]').forEach(img => img.addEventListener('click', () => {
    lbImg.src = img.src; lbImg.alt = img.alt;
    lb.hidden = false; document.body.style.overflow = 'hidden';
  }));
  lb.addEventListener('click', closeLb);
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeLb(); setMenu(false); } });
})();