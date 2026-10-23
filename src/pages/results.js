import '../styles/look-2026.css';
import '../styles/results-2026.css';
import { caseStudies, CASE_CARD_IMAGES } from '../../data/case-studies.js';
import { caseStudiesPageHeadline } from '../../data/site-content.js';
import { initContactForm } from '../components/contact-form.js';
import {
  pageHead, caseCard, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// Our Results, Oct 2026 look (DESIGN.md): every case study as the homepage
// case card, in the order of data/case-studies.js, then Silvia.

function clientName(cs) {
  return cs.title.replace(/^Case [Ss]tudy:\s*/i, '');
}

function buildResults() {
  const main = document.getElementById('results-gallery');
  if (!main) return;

  const cards = caseStudies.map((cs, i) => caseCard({
    href: `/case-studies/${cs.slug}`,
    client: clientName(cs),
    title: cs.subtitle,
    image: CASE_CARD_IMAGES[cs.slug],
    alt: cs.alt,
    metrics: cs.metrics || [],
    heading: 'h2',
    i,
  })).join('');

  // Silvia's client story lives at /silvia, not under /case-studies (Pomp,
  // through Alkida, 2026-10-23), so its card is added here by hand. It has
  // no figures, so the figures' place stays empty.
  const silviaCard = caseCard({
    href: '/silvia',
    client: 'Silvia',
    title: 'Bringing a personal AI CFO into the media conversation',
    image: { src: '/assets/images/silvia-card.jpg', width: 1600, height: 900 },
    alt: 'The Silvia logo',
    more: 'View client story',
    heading: 'h2',
    i: caseStudies.length,
  });

  main.innerHTML = `
    ${pageHead({ label: 'Our Results', title: caseStudiesPageHeadline, id: 'results-title' })}
    <section class="results">
      <div class="wrap">
        <ul class="case-grid">
          ${cards}
          ${silviaCard}
        </ul>
      </div>
    </section>
    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
}

function initResultsPage() {
  buildResults();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initResultsPage);
