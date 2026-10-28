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

// Vercel Web Analytics (switched on by Joe, 2026-10-28): visitors, pages,
// devices and referrers in the Vercel dashboard, alongside the Google tag in
// each page's head. Live site only, like that tag, so previews and local runs
// don't count (www redirects to the bare domain).
if (location.hostname === 'edencommunications.com') {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const insights = document.createElement('script');
  insights.defer = true;
  insights.src = '/_vercel/insights/script.js';
  document.head.appendChild(insights);
}

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
