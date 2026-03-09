import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ─── Word animation ───────────────────────────────────────────────────────────

export function initWordAnimation() {
  document.fonts.ready.then(() => {
    const elements = document.querySelectorAll('[data-animate="words"]');
    elements.forEach(el => {
      const split = new SplitType(el, { types: 'words' });

      split.words.forEach(word => {
        word.style.overflow = 'hidden';
        word.style.display = 'inline-block';
        word.style.paddingBottom = '0.1em';
      });

      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: { amount: 0.5 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  });
}

// ─── Fade-up entrance ─────────────────────────────────────────────────────────

export function initFadeUps() {
  document.querySelectorAll('[data-animate="fade-up"]').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// ─── Fade-in (no Y movement) ──────────────────────────────────────────────────

export function initFadeAnimations() {
  document.querySelectorAll('[data-animate="fade"]').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// ─── Staggered children ───────────────────────────────────────────────────────

export function initStaggerGroups() {
  document.querySelectorAll('[data-animate="stagger"]').forEach(group => {
    gsap.from(group.children, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// ─── Hero entrance ────────────────────────────────────────────────────────────

export function initHeroAnimation() {
  const headline = document.querySelector('.hero-headline');
  const subtitle = document.querySelector('.hero-subtitle');
  const scrollHint = document.querySelector('.hero-scroll-hint');

  if (!headline) return;

  const tl = gsap.timeline({ delay: 0.3 });

  // Wrap each line span in a clip container so text slides up from below
  // Skip .gradient-text spans — the nested block wrapper breaks background-clip: text
  const lines = headline.querySelectorAll('span:not(.gradient-text)');
  lines.forEach(line => {
    line.style.overflow = 'hidden';
    line.style.display = 'block';
  });

  const innerWraps = Array.from(lines).map(line => {
    const inner = document.createElement('span');
    inner.style.display = 'block';
    inner.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.appendChild(inner);
    return inner;
  });

  tl.from(innerWraps, {
    yPercent: 105,
    opacity: 0,
    duration: 1.1,
    ease: 'power4.out',
    stagger: 0.12,
  });

  // Animate gradient text separately (no wrapper — preserves background-clip: text)
  const gradientEl = headline.querySelector('.gradient-text');
  if (gradientEl) {
    tl.from(gradientEl, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    }, '-=0.8');
  }

  if (subtitle) {
    tl.from(subtitle, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }

  if (scrollHint) {
    tl.from(scrollHint, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  }
}

// ─── Hero video parallax ──────────────────────────────────────────────────────

export function initHeroParallax() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  gsap.to(video, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ─── Nav scroll state ─────────────────────────────────────────────────────────

export function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => nav.classList.add('nav--scrolled'),
    onLeaveBack: () => nav.classList.remove('nav--scrolled'),
  });
}

// ─── Section divider reveals ──────────────────────────────────────────────────

export function initDividerAnimations() {
  document.querySelectorAll('.section-divider').forEach(divider => {
    gsap.from(divider, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: divider,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// ─── Card hover tilt (desktop only) ──────────────────────────────────────────

export function initCardTilt() {
  document.querySelectorAll('.cs-card, .team-card, .news-card--featured').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' });
    });
  });
}

// ─── News grid stagger ────────────────────────────────────────────────────────

export function initNewsAnimation() {
  const newsGrid = document.querySelector('.news-grid');
  if (!newsGrid) return;

  gsap.from(newsGrid.querySelectorAll('.news-card'), {
    y: 50,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: newsGrid,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ─── Team cards stagger ───────────────────────────────────────────────────────

export function initTeamAnimation() {
  const teamGrid = document.querySelector('.team-grid');
  if (!teamGrid) return;

  gsap.from(teamGrid.querySelectorAll('.team-card'), {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: teamGrid,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ─── Gallery cards stagger ────────────────────────────────────────────────────

export function initGalleryAnimation() {
  const grid = document.querySelector('.cs-grid');
  if (!grid) return;

  gsap.from(grid.querySelectorAll('.cs-card'), {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: grid,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ─── Master init ──────────────────────────────────────────────────────────────

export function initAnimations() {
  const mm = gsap.matchMedia();

  // Desktop only: parallax, card tilt, divider reveals
  mm.add('(min-width: 769px)', () => {
    initHeroParallax();
    initCardTilt();
    initDividerAnimations();
  });

  // All viewports
  initWordAnimation();
  initFadeUps();
  initFadeAnimations();
  initStaggerGroups();
  initHeroAnimation();
  initNavScroll();
  initNewsAnimation();
  initTeamAnimation();
  initGalleryAnimation();
}
