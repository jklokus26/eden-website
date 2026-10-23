// Styles
import './styles/global.css';
import './styles/nav.css';
import './styles/footer.css';

// Components
import { initNav } from './components/nav.js';
import { initFooter } from './components/footer.js';

// Lenis smooth scroll
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';

// Initialize Lenis (smooth scrolling), except for people who ask their
// system for reduced motion: they get the browser's normal scrolling.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const lenis = reducedMotion.matches ? null : new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  smoothTouch: false,
});

if (lenis) {
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // Turning reduced motion on mid-visit gives the browser's normal scrolling
  // straight away; turning it off again brings the smoothing back.
  reducedMotion.addEventListener('change', (e) => {
    lenis.options.smoothWheel = !e.matches;
    // Stop any glide already under way, right where the page is.
    if (e.matches) lenis.scrollTo(window.scrollY, { immediate: true, force: true });
  });
}

// Initialize shared components
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFooter();
});

export { lenis };
