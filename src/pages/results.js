import '../styles/look-2026.css';
import '../styles/results-2026.css';
import { caseStudies, CASE_CARD_IMAGES, silviaStory } from '../../data/case-studies.js';
import { caseStudiesPageHeadline } from '../../data/site-content.js';
import { initContactForm } from '../components/contact-form.js';
import {
  pageHead, caseCard, buildContactBand, initReveal, initAnchors, initNavState, ARROW,
} from '../components/look-2026.js';
import { sectionHead } from '../components/eden-kit.js';
import { initBoldPage } from '../components/eden-bold.js';

// Our Results, on the bold kit (DESIGN.md): Silvia's client story first, on
// a row of its own (Joe, 2026-10-30: "move Silvia to the top"), then every
// case study as the shared case card, in the order of data/case-studies.js.

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
    heading: 'h3',
    i,
  })).join('');

  // Silvia's client story (at /silvia) has no photo or figures yet, so it
  // gets its own row over the case studies rather than a card: its logo,
  // then the headline, the Silvia page's summary line and the link from the
  // grid's second column. The whole row is the link.
  const silviaRow = `
    <section class="rstory" aria-labelledby="rstory-title">
      <div class="wrap">
        ${sectionHead({ label: 'Client story', labelId: 'rstory-title' })}
        <div class="rstory__row" data-reveal data-ink-owner>
          <img class="rstory__logo" src="/assets/logos/silvia-logo.svg" alt="${silviaStory.client}" width="1229" height="255">
          <div class="rstory__text">
            <h3 class="t-h3 rstory__title"><a class="rstory__link" href="${silviaStory.href}">${silviaStory.title}</a></h3>
            <p class="rstory__summary">${silviaStory.summary}</p>
            <span class="text-link rstory__more" aria-hidden="true"><span class="text-link__label">${silviaStory.more}</span>${ARROW}</span>
          </div>
        </div>
      </div>
    </section>
  `;

  main.innerHTML = `
    ${pageHead({ label: 'Our Results', title: caseStudiesPageHeadline, id: 'results-title' })}
    ${silviaRow}
    <section class="results" aria-labelledby="cases-title">
      <div class="wrap">
        ${sectionHead({ label: 'Case studies', labelId: 'cases-title' })}
        <ul class="case-grid">
          ${cards}
        </ul>
      </div>
    </section>
    ${buildContactBand()}
  `;

  initBoldPage(main);
  initReveal(main);
  initAnchors(main);
}

function initResultsPage() {
  buildResults();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initResultsPage);
