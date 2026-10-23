import '../styles/look-2026.css';
import '../styles/case-study-2026.css';
import { caseStudies, CASE_CARD_IMAGES } from '../../data/case-studies.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, caseCard, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// One case study, Oct 2026 look (DESIGN.md): the opening with the case
// photo, the story beside a sticky "By the numbers" sidebar, three more
// case cards, then the contact band. Copy comes from data/case-studies.js.

function getSlugFromPath() {
  // Path: /case-studies/grip-shipping (or .html in dev)
  const parts = window.location.pathname.replace(/\.html$/, '').split('/');
  return parts[parts.length - 1];
}

function clientName(cs) {
  return cs.title.replace(/^Case [Ss]tudy:\s*/i, '');
}

function casePhoto(cs) {
  const image = CASE_CARD_IMAGES[cs.slug];
  if (!image) return '';
  return `
    <div class="cs-head__media" data-reveal>
      <picture>
        ${image.webp ? `<source type="image/webp" srcset="${image.webp}">` : ''}
        <img src="${image.src}" alt="${cs.alt}" width="${image.width}" height="${image.height}"
          loading="eager" decoding="async" fetchpriority="high">
      </picture>
    </div>
  `;
}

function sidebarFigures(metrics) {
  if (!metrics || !metrics.length) return '';
  return `
    <div class="cs-figures">
      <h2 class="t-label t-label--dot">By the numbers</h2>
      <dl class="cs-figures__list">
        ${metrics.map(m => `
          <div class="cs-figure">
            <dt>${m.label}</dt>
            <dd>${m.number}</dd>
          </div>
        `).join('')}
      </dl>
    </div>
  `;
}

function buildCaseStudy() {
  const main = document.getElementById('case-study');
  if (!main) return;

  // Try data-client attr first, fall back to URL slug
  const slug = main.dataset.client || getSlugFromPath();
  const cs = caseStudies.find(c => c.slug === slug);

  if (!cs) {
    main.innerHTML = `<section class="page-head"><div class="wrap"><p>Case study not found.</p></div></section>`;
    return;
  }

  // Update page title dynamically
  const cleanTitle = clientName(cs);
  document.title = `${cleanTitle} | Eden Communications`;

  // Related case studies
  const related = (cs.relatedCaseStudies || [])
    .map(relSlug => caseStudies.find(c => c.slug === relSlug))
    .filter(Boolean)
    .slice(0, 3);

  const relatedCards = related.map((rel, i) => caseCard({
    href: `/case-studies/${rel.slug}`,
    client: clientName(rel),
    title: rel.subtitle,
    image: CASE_CARD_IMAGES[rel.slug],
    alt: rel.alt,
    metrics: rel.metrics || [],
    i,
  })).join('');

  // The story's section headings come in as h3; under the page's h1 they
  // are the next level down, so they become h2 (same words).
  const story = cs.bodyHtml.replace(/<(\/?)h3>/g, '<$1h2>');

  main.innerHTML = `
    <section class="cs-head" aria-labelledby="cs-title">
      <div class="wrap cs-head__grid">
        <div class="cs-head__copy">
          <p class="t-label t-label--dot">Case Study</p>
          <h1 id="cs-title" class="t-h2 cs-head__title">${cleanTitle}</h1>
          <p class="cs-head__deck">${cs.subtitle}</p>
        </div>
        ${casePhoto(cs)}
      </div>
    </section>

    <section class="cs-body">
      <div class="wrap cs-body__grid">
        <article class="cs-story">
          <dl class="cs-meta">
            <div class="cs-meta__item">
              <dt class="t-label">Service</dt>
              <dd>${cs.service}</dd>
            </div>
            <div class="cs-meta__item">
              <dt class="t-label">Industry</dt>
              <dd>${cs.industries}</dd>
            </div>
          </dl>
          <div class="cs-prose">
            ${story}
          </div>
        </article>

        <aside class="cs-aside">
          ${sidebarFigures(cs.metrics)}
          <div class="cs-cta">
            <p class="cs-cta__text">Ready to build institutional credibility?</p>
            <a class="btn btn--primary" href="#contact">Get in touch ${ARROW}</a>
          </div>
        </aside>
      </div>
    </section>

    ${related.length ? `
      <section class="cs-more" aria-labelledby="more-title">
        <div class="wrap">
          <h2 id="more-title" class="t-label t-label--dot cs-more__label">More Case Studies</h2>
          <ul class="case-grid">${relatedCards}</ul>
        </div>
      </section>
    ` : ''}

    ${cs.isLast ? `
      <section class="cs-end">
        <div class="wrap cs-end__inner" data-reveal>
          <p class="t-card cs-end__text">${cs.lastMessage}</p>
          <a class="text-link cs-end__link" href="/results"><span class="arrow" aria-hidden="true">←</span><span class="text-link__label">Back to all case studies</span></a>
        </div>
      </section>
    ` : ''}

    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
}

function initCaseStudyPage() {
  buildCaseStudy();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initCaseStudyPage);
