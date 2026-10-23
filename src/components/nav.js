import { navLinks } from '../../data/site-content.js';
import { lenis } from '../main.js';

const EDEN_LOGO_SVG = `<svg viewBox="0 0 105 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="nav-logo" aria-label="Eden Communications">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M48 -3.05176e-05H43V14.2012C43 15.0345 42.0204 15.525 41.2916 15.1211C39.4273 14.0881 37.2823 13.5 35 13.5C27.8203 13.5 22 19.3203 22 26.5C22 33.6797 27.8203 39.5 35 39.5C37.2986 39.5 39.4578 38.9034 41.3313 37.8567C43.1018 36.8675 45.0023 36 47.0304 36H48V-3.05176e-05ZM43 26.5C43 22.0817 39.4183 18.5 35 18.5C30.5817 18.5 27 22.0817 27 26.5C27 30.9182 30.5817 34.5 35 34.5C39.4183 34.5 43 30.9182 43 26.5Z" fill="currentColor"/>
  <path d="M0 9.49997H20.5V14.5H6.5C5.94771 14.5 5.5 14.9477 5.5 15.5V20.5C5.5 21.0522 5.94771 21.5 6.5 21.5H18.5V26.5H6.5C5.94771 26.5 5.5 26.9477 5.5 27.5V33C5.5 33.5522 5.94771 34 6.5 34H20.5V39H0V9.49997Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M65 39.5C69.1174 39.5 72.7877 37.5858 75.1696 34.5988L71.3079 31.421C69.8437 33.2951 67.5625 34.5 65 34.5C63.0084 34.5 61.1868 33.7722 59.7866 32.5682L75.0811 23.8123C75.9067 23.3396 76.2966 22.3451 75.9156 21.4735C73.9603 17.0009 70.1748 13.5 65 13.5C57.8203 13.5 52 19.3203 52 26.5C52 33.6797 57.8203 39.5 65 39.5ZM70 21L57.2005 28.2876C57.0693 27.7129 57 27.1145 57 26.5C57 22.0817 60.5817 19 65 19C67.1108 19 68.5704 19.6643 70 21Z" fill="currentColor"/>
  <path d="M86.5287 13.9846C88.1051 13.3345 89.7943 13 91.5 13C93.2057 13 94.8949 13.3345 96.4713 13.9846C98.0478 14.6348 99.4809 15.588 100.689 16.7904C101.896 17.9929 102.855 19.421 103.509 20.9935C104.163 22.566 104.5 24.2518 104.5 25.9545V39H99.5V25.9545C99.5 24.9114 99.2937 23.8783 98.8925 22.914C98.4913 21.9497 97.903 21.0728 97.1607 20.3336C96.4183 19.5945 95.5364 19.0076 94.565 18.6069C93.5936 18.2063 92.5521 18 91.5 18C90.4479 18 89.4064 18.2063 88.435 18.6069C87.4636 19.0076 86.5817 19.5945 85.8393 20.3336C85.0969 21.0728 84.5087 21.9497 84.1075 22.914C83.7063 23.8783 83.5 24.9114 83.5 25.9545V39L78.5 39L78.5 25.9545C78.5 24.2518 78.8368 22.566 79.491 20.9935C80.1452 19.421 81.1038 17.9929 82.3115 16.7904C83.5191 15.588 84.9522 14.6348 86.5287 13.9846Z" fill="currentColor"/>
</svg>`;

function getActiveClass(href) {
  const path = window.location.pathname;
  if (href === '/' && (path === '/' || path === '/index.html')) return ' active';
  if (href !== '/' && !href.startsWith('/#') && path.startsWith(href)) return ' active';
  return '';
}

function handleNavClick(e, href) {
  if (href.startsWith('/#')) {
    const targetId = href.slice(2);
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    if (isHomepage) {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (!target) return;

      // Old-look pages scroll to the heading inside the section. On the new
      // look the section itself is the target (its scroll margin clears the
      // nav), since the contact band's form panel starts above its heading.
      const heading = document.body.classList.contains('look-2026')
        ? target
        : (target.querySelector('h2') || target);
      if (lenis) lenis.stop();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      heading.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      // Move keyboard focus to the section too. Wait a frame: from the mobile
      // menu, the page is still inert until the menu's own click handler closes it.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
      if (lenis) setTimeout(() => lenis.start(), 1500);
    }
  }
}

export function initNav() {
  const navEl = document.getElementById('nav');
  if (!navEl) return;
  navEl.setAttribute('aria-label', 'Primary');
  // Pages on the Oct 2026 look use the doc's button label; the rest keep
  // theirs until they're carried over.
  const ctaLabel = document.body.classList.contains('look-2026') ? 'Talk to Eden' : 'Get in Touch';

  // Skip link: first focusable thing on the page, jumps past the nav.
  const main = document.querySelector('main');
  if (main && main.id) {
    document.body.insertAdjacentHTML('afterbegin', `<a class="skip-link" href="#${main.id}">Skip to content</a>`);
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
  }

  const textLinks = navLinks.map(link =>
    `<a href="${link.href}" class="nav-link${getActiveClass(link.href)}">${link.label}</a>`
  ).join('');

  const mobileLinks = navLinks.map(link =>
    `<a href="${link.href}" class="nav-mobile-link${getActiveClass(link.href)}">${link.label}</a>`
  ).join('');

  navEl.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-logo-link" aria-label="Eden Communications home">
        ${EDEN_LOGO_SVG}
      </a>
      <div class="nav-links">
        ${textLinks}
      </div>
      <div class="nav-right">
        <a href="/#contact" class="nav-cta">${ctaLabel}</a>
      </div>
      <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile-overlay" id="nav-mobile-menu" aria-hidden="true">
      <div class="nav-mobile-links">
        ${mobileLinks}
        <a href="/#contact" class="nav-mobile-cta">${ctaLabel}</a>
      </div>
    </div>
  `;

  // Wire smooth scroll for hash links
  navEl.querySelectorAll('.nav-link, .nav-mobile-link, .nav-cta, .nav-mobile-cta').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/#')) {
      link.addEventListener('click', (e) => handleNavClick(e, href));
    }
  });

  // Hamburger toggle. While the menu is open the page behind it is inert,
  // so keyboard focus stays in the menu; Escape closes it and returns focus.
  const hamburger = navEl.querySelector('.nav-hamburger');
  const overlay = navEl.querySelector('.nav-mobile-overlay');

  const setMenu = (open) => {
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    overlay.inert = !open;
    document.body.classList.toggle('nav-open', open);
    document.querySelectorAll('main, footer').forEach(el => { el.inert = open; });
    if (lenis) (open ? lenis.stop() : lenis.start());
    if (open) overlay.querySelector('a')?.focus();
  };

  overlay.inert = true;
  hamburger.addEventListener('click', () => setMenu(!overlay.classList.contains('open')));

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') {
      setMenu(false);
      hamburger.focus();
      return;
    }
    // Keep Tab cycling through the menu button and the menu's links.
    if (e.key === 'Tab') {
      const stops = [hamburger, ...overlay.querySelectorAll('a')];
      const i = stops.indexOf(document.activeElement);
      const next = e.shiftKey ? (i <= 0 ? stops.length - 1 : i - 1) : (i === stops.length - 1 ? 0 : i + 1);
      e.preventDefault();
      stops[next].focus();
    }
  });

  // The menu only exists on narrow layouts; widening the window closes it.
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
    if (e.matches && overlay.classList.contains('open')) setMenu(false);
  });

  // Close overlay on link click
  overlay.querySelectorAll('.nav-mobile-link, .nav-mobile-cta').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}
