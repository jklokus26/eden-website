import '../styles/look-2026.css';
import '../styles/silvia-2026.css';
import { initContactForm } from '../components/contact-form.js';
import { buildContactBand, initReveal, initAnchors, initNavState } from '../components/look-2026.js';
import { initBoldPage } from '../components/eden-bold.js';

// Silvia client story, on the bold kit (DESIGN.md). The page's copy and links
// are in silvia/index.html so they are in the first HTML a crawler reads;
// this adds the closing contact band and the shared behaviours.

function initSilviaPage() {
  const main = document.getElementById('silvia');
  if (!main) return;
  main.insertAdjacentHTML('beforeend', buildContactBand());
  initBoldPage(main);
  initReveal(main);
  initAnchors(main);
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initSilviaPage);
