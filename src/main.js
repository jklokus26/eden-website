// Styles
import './styles/global.css';
import './styles/nav.css';
import './styles/footer.css';
import './styles/loader.css';

// Components
import { initNav } from './components/nav.js';
import { initFooter } from './components/footer.js';
import { initLoader } from './components/loader.js';

// Lenis smooth scroll
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Initialize shared components
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFooter();
  initLoader();
});

export { lenis };
