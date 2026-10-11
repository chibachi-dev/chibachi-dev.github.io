(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Starfield --------------------------------------------------------------
     Chunky pixel stars drifting downward, like a vertical shmup backdrop.
     The canvas renders at 1/SCALE resolution and is upscaled with
     image-rendering: pixelated so each star is a crisp square. */
  const canvas = document.getElementById('starfield');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const SCALE = 3;
    const PALETTE = ['#dde2f7', '#dde2f7', '#9097bf', '#9097bf', '#5d6496', '#4fe3ff', '#7cff4f', '#ff5fd2'];
    let width = 0;
    let height = 0;
    let stars = [];
    let last = 0;
    let rafId = 0;

    const makeStar = (y) => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: y ?? Math.random() * height,
        speed: 1.5 + depth * depth * 9, // canvas px per second
        size: depth > 0.93 ? 2 : 1,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        twinkle: Math.random() < 0.3 ? Math.random() * Math.PI * 2 : null,
      };
    };

    const resize = () => {
      const w = Math.ceil(window.innerWidth / SCALE);
      const h = Math.ceil(window.innerHeight / SCALE);
      if (w === width && h === height) return;
      const target = Math.round((w * h) / 200);
      // Keep existing stars on resize (mobile URL bars resize constantly)
      stars = stars.filter((s) => s.x < w).map((s) => ({ ...s, y: s.y % h }));
      width = canvas.width = w;
      height = canvas.height = h;
      while (stars.length < target) stars.push(makeStar());
      stars.length = target;
      draw(performance.now());
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.globalAlpha = s.twinkle === null ? 0.85 : 0.35 + 0.65 * Math.abs(Math.sin(t / 900 + s.twinkle));
        ctx.fillStyle = s.color;
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (t) => {
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      for (const s of stars) {
        s.y += s.speed * dt;
        if (s.y >= height) Object.assign(s, makeStar(-s.size));
      }
      draw(t);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId || reduceMotion.matches || document.hidden) return;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    resize();
    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));
  }

  /* Scroll reveal ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const show = (el) => el.classList.add('is-visible');

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealEls.forEach(show);
  } else {
    // Stagger siblings that enter together
    revealEls.forEach((el) => {
      const index = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 90}ms`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }
})();
