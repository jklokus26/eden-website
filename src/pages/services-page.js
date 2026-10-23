import '../styles/look-2026.css';
import '../styles/services-2026.css';
import { services, servicesFaq } from '../../data/services.js';
import { homeWhatWeDo } from '../../data/site-content.js';
import { initContactForm } from '../components/contact-form.js';
import {
  pageHead, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// Services page, Oct 2026 look (DESIGN.md). The intro is Eden's copy from the
// old page, verbatim; practice areas and questions come from data/services.js.

const INTRO = [
  'Your stakeholders don’t live in one place. Your investors read Bloomberg. Your developers follow crypto Twitter. And the deal that changes your trajectory might close over dinner, not over email.',
  'Eden operates across every surface where credibility is built and deals get done. Our three practice areas are designed to reinforce each other, because credibility compounds only when every surface is working.',
];

// Each practice area delivers one of the homepage's three pillars, so it
// carries that pillar's number and words as its label.
const PILLAR_BY_PRACTICE = {
  'strategic-counsel': '01',
  'earned-media': '02',
  'executive-visibility': '03',
};

function pillarLabel(s) {
  const pillar = homeWhatWeDo.pillars.find(p => p.number === PILLAR_BY_PRACTICE[s.anchorId]);
  if (!pillar) return '';
  return `<p class="t-label practice__label" data-reveal><span class="practice__pillar-num">${pillar.number}</span>${pillar.title}</p>`;
}

// A practice area, always open: label and title on the left, the tagline and
// intro on the right, then the five services as numbered rows between
// hairlines. The section keeps its anchor (/services#earned-media).
function buildPractice(s) {
  const items = s.subServices.map((sub, i) => `
    <li class="practice__item" data-reveal style="--i: ${i}">
      <span class="practice__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="t-card practice__name">${sub.name}</h3>
      <p class="practice__desc">${sub.description}</p>
    </li>
  `).join('');

  return `
    <section class="practice" id="${s.anchorId}" aria-labelledby="${s.anchorId}-title">
      <div class="wrap">
        <div class="practice__head">
          <div class="practice__title">
            ${pillarLabel(s)}
            <h2 id="${s.anchorId}-title" class="t-h2" data-reveal>${s.title}</h2>
          </div>
          <div class="practice__copy" data-reveal style="--i: 1">
            <p class="practice__tagline">${s.tagline}</p>
            <p class="practice__intro">${s.intro}</p>
          </div>
        </div>
        <ol class="practice__list">${items}</ol>
      </div>
    </section>
  `;
}

function buildFaq() {
  const items = servicesFaq.map((item, i) => `
    <details class="faq__item"${i === 0 ? ' open' : ''}>
      <summary><h3 class="t-card">${item.question}</h3></summary>
      <p>${item.answer}</p>
    </details>
  `).join('');

  return `
    <section class="sv-faq" aria-labelledby="faq-title">
      <div class="wrap sv-faq__grid">
        <div class="sv-faq__head" data-reveal>
          <p class="t-label t-label--dot">FAQ</p>
          <h2 id="faq-title" class="t-h2">Frequently asked questions</h2>
        </div>
        <div class="faq sv-faq__list" data-reveal style="--i: 1">${items}</div>
      </div>
    </section>
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

  initReveal(main);
  initAnchors(main);
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initServicesPage);
