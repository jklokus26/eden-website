import '../styles/look-2026.css';
import '../styles/services-2026.css';
import { servicesIntro as INTRO, services, servicesFaq } from '../../data/services.js';
import { homeWhatWeDo } from '../../data/site-content.js';
import { initContactForm } from '../components/contact-form.js';
import {
  pageHead, keepWords, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import { sectionHead } from '../components/eden-kit.js';
import { initBoldPage } from '../components/eden-bold.js';

// Services page, on the bold kit (DESIGN.md). The intro (servicesIntro), the
// practice areas and the questions are Eden's copy, verbatim, from
// data/services.js.

// Each practice area delivers one of the homepage's three pillars, so it
// carries that pillar's words as its label.
const PILLAR_BY_PRACTICE = {
  'strategic-counsel': '01',
  'earned-media': '02',
  'executive-visibility': '03',
};

function pillarTitle(s) {
  const pillar = homeWhatWeDo.pillars.find(p => p.number === PILLAR_BY_PRACTICE[s.anchorId]);
  return pillar ? pillar.title : '';
}

// A practice area, always open, set like the homepage's What we do: the
// kit's header (its pillar as the label, the signature line) across the
// width, then two columns that start on one line, the title, tagline and
// intro on the left and its services as a list on the right, each name
// over what it is. The section keeps its anchor (/services#earned-media).
function buildPractice(s) {
  const items = s.subServices.map(sub => `
    <li class="practice__item">
      <h3 class="t-card practice__name">${sub.name}</h3>
      <p class="practice__desc">${keepWords(sub.description)}</p>
    </li>
  `).join('');

  return `
    <section class="practice" id="${s.anchorId}" aria-labelledby="${s.anchorId}-title">
      <div class="wrap">
        ${sectionHead({ label: pillarTitle(s) })}
        <div class="practice__layout">
          <div class="practice__head">
            <h2 id="${s.anchorId}-title" class="t-h2 practice__title" data-rise>${s.title}</h2>
            <div class="practice__copy" data-reveal style="--i: 2">
              <p class="practice__tagline">${keepWords(s.tagline)}</p>
              <p class="practice__intro">${keepWords(s.intro)}</p>
            </div>
          </div>
          <ul class="practice__list" data-reveal style="--i: 3">${items}</ul>
        </div>
      </div>
    </section>
  `;
}

// The questions are the page's light chapter, before the dark contact band.
function buildFaq() {
  const items = servicesFaq.map((item, i) => `
    <details class="faq__item"${i === 0 ? ' open' : ''}>
      <summary><h3 class="t-card">${item.question}</h3></summary>
      <p>${keepWords(item.answer)}</p>
    </details>
  `).join('');

  return `
    <div class="chapter">
      <section class="sv-faq" aria-labelledby="faq-title">
        <div class="wrap">
          ${sectionHead({ label: 'FAQ', title: 'Frequently asked questions', titleId: 'faq-title' })}
          <div class="faq sv-faq__list" data-reveal>${items}</div>
        </div>
      </section>
    </div>
  `;
}

function initServicesPage() {
  const main = document.getElementById('services-page');
  if (!main) return;

  main.innerHTML = `
    ${pageHead({ label: 'Services', title: 'What we do', lead: INTRO })}
    <div class="practices">${services.map(buildPractice).join('')}</div>
    ${buildFaq()}
    ${buildContactBand()}
  `;

  initBoldPage(main);
  initReveal(main);
  initAnchors(main);
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initServicesPage);
