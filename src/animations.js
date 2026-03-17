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
          start: 'top 95%',
          toggleActions: 'play none none none',
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
// Blur-to-focus reveal matching Eden's current site animation.

export function initHeroAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  gsap.to(hero, {
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1.8,
    ease: 'power2.out',
    delay: 0.3,
  });
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
  document.querySelectorAll('.cs-card, .team-card, .featured-cs-card, .service-card').forEach(card => {
    let ticking = false;
    card.addEventListener('mousemove', e => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
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
        ticking = false;
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' });
    });
  });
}

// ─── Featured case studies stagger ───────────────────────────────────────────

export function initFeaturedCaseStudiesAnimation() {
  const grid = document.querySelector('.featured-cs-grid');
  if (!grid) return;

  gsap.from(grid.querySelectorAll('.featured-cs-col'), {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: grid,
      start: 'top 80%',
      once: true,
    },
  });
}

// ─── Services stagger ────────────────────────────────────────────────────────

export function initServicesAnimation() {
  const grid = document.querySelector('.services-grid');
  if (!grid) return;

  gsap.from(grid.querySelectorAll('.service-card'), {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: grid,
      start: 'top 80%',
      once: true,
    },
  });
}

// ─── Coverage fade in ────────────────────────────────────────────────────────

export function initCoverageAnimation() {
  const section = document.querySelector('.coverage-section');
  if (!section) return;

  gsap.from(section.querySelector('.coverage-scroll-container'), {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ─── Testimonials fade ───────────────────────────────────────────────────────

export function initTestimonialsAnimation() {
  const section = document.querySelector('.testimonials-section');
  if (!section) return;

  gsap.from(section.querySelector('.testimonials-wrap'), {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ─── Contact form fade up ────────────────────────────────────────────────────

export function initContactFormAnimation() {
  const section = document.querySelector('.contact-section');
  if (!section) return;

  gsap.from(section.querySelector('.contact-form'), {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
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

  // Temporarily disabled to debug spacing issue
  // gsap.from(grid.querySelectorAll('.cs-card'), {
  //   y: 60,
  //   opacity: 0,
  //   duration: 0.8,
  //   ease: 'power3.out',
  //   stagger: 0.15,
  //   scrollTrigger: {
  //     trigger: grid,
  //     start: 'top 80%',
  //     toggleActions: 'play none none reverse',
  //   },
  // });
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
  initFeaturedCaseStudiesAnimation();
  initServicesAnimation();
  initCoverageAnimation();
  initTeamAnimation();
  initTestimonialsAnimation();
  initContactFormAnimation();
  initGalleryAnimation();
}
