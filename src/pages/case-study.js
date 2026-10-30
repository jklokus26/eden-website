import '../styles/look-2026.css';
import '../styles/case-study-2026.css';
import { caseStudies, CASE_CARD_IMAGES, relatedFor } from '../../data/case-studies.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, caseCard, keepWords, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import { sectionHead } from '../components/eden-kit.js';
import { initBoldPage } from '../components/eden-bold.js';

// One case study, on the bold kit (DESIGN.md): the opening (the client's name
// at poster size, the deck beside the case photo), the story beside a sticky
// "By the numbers" sidebar, three more case cards on the page's light
// chapter, then the contact band. Copy comes from data/case-studies.js.

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
    <div class="cs-head__media frame-rise" data-reveal>
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
      <h2 class="t-label">By the numbers</h2>
      <span class="sig cs-figures__sig" aria-hidden="true"></span>
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

  // Each page's own <title> ("<Client> Case Study | Eden Communications")
  // stays as written in its HTML, which is what search engines show.
  const cleanTitle = clientName(cs);

  // Related case studies
  const related = relatedFor(cs);

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
      <div class="wrap">
        ${sectionHead({ label: 'Case Study', title: cleanTitle, titleId: 'cs-title', titleTag: 'h1', titleClass: 'poster' })}
        <div class="cs-head__grid">
          <p class="cs-head__deck" data-reveal style="--i: 3">${keepWords(cs.subtitle)}</p>
          ${casePhoto(cs)}
        </div>
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

    <div class="chapter">
      ${related.length ? `
        <section class="cs-more" aria-labelledby="more-title">
          <div class="wrap">
            ${sectionHead({ label: 'More Case Studies', labelId: 'more-title' })}
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
    </div>

    ${buildContactBand()}
  `;

  initBoldPage(main);
  initReveal(main);
  initAnchors(main);
}

function initCaseStudyPage() {
  buildCaseStudy();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initCaseStudyPage);
