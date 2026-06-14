(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Split char-stagger text into spans (preserving child tags) ── */
  let globalCharIndex = 0;
  const wrapChars = (node, container) => {
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split('').forEach(ch => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch === ' ' ? '\u00A0' : ch;
          span.style.transitionDelay = `${globalCharIndex * 18}ms`;
          globalCharIndex++;
          frag.appendChild(span);
        });
        container.appendChild(frag);
      } else {
        const clone = child.cloneNode(false);
        container.appendChild(clone);
        wrapChars(child, clone);
      }
    });
  };

  document.querySelectorAll('[data-reveal="char-stagger"]').forEach(el => {
    globalCharIndex = 0;
    const original = el.cloneNode(true);
    el.innerHTML = '';
    wrapChars(original, el);
  });

  /* ── Intersection Observer for reveals ─────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('in-view'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  }

  /* ── Count-up numbers ───────────────────────────────────── */
  const countEls = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals) + suffix;
    } else {
      requestAnimationFrame(tick);
    }
  };

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  countEls.forEach(el => countIO.observe(el));

  /* ── Skill bar fill on scroll ───────────────────────────── */
  const barEls = document.querySelectorAll('.skill-bar-fill');
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width + '%';
        barIO.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  barEls.forEach(el => barIO.observe(el));

  /* ── Timeline spine fill + marker activation ────────────── */
  const timeline = document.querySelector('.timeline');
  const spineFill = document.getElementById('spineFill');
  const tlItems = document.querySelectorAll('.tl-item');

  const updateSpine = () => {
    if (!timeline || !spineFill) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.85;
    const total = rect.height;
    let progress = (start - rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));
    spineFill.style.height = (progress * 100) + '%';

    tlItems.forEach(item => {
      const r = item.getBoundingClientRect();
      if (r.top < vh * 0.8) item.classList.add('in-view');
    });
  };

  /* ── Pipeline rail progress + scroll-spy ────────────────── */
  const railFill = document.getElementById('railFill');
  const railNodes = document.querySelectorAll('.rail-node');
  const topbarLinks = document.querySelectorAll('.topbar-nav a, .mobile-nav a');
  const sections = ['intake', 'experience', 'projects', 'skills', 'education', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const updateRailAndSpy = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    if (railFill) railFill.style.height = (Math.max(0, Math.min(1, progress)) * 100) + '%';

    // Determine active section
    let activeId = sections[0]?.id;
    const probeLine = window.innerHeight * 0.25;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= probeLine) activeId = sec.id;
    }

    // Near bottom of page → force last section active
    if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      activeId = sections[sections.length - 1]?.id;
    }

    railNodes.forEach(n => n.classList.toggle('active', n.dataset.target === activeId));
    topbarLinks.forEach(a => a.classList.toggle('active', a.dataset.target === activeId));
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateRailAndSpy();
        updateSpine();
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ── Rail node click → smooth scroll ────────────────────── */
  railNodes.forEach(node => {
    node.addEventListener('click', () => {
      const target = document.getElementById(node.dataset.target);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ── Mobile menu toggle ──────────────────────────────────── */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
