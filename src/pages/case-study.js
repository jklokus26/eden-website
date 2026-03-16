import '../styles/case-study.css';
import { caseStudies, HERO_IMAGE_MAP } from '../../data/case-studies.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';

function getSlugFromPath() {
  // Path: /case-studies/grip-shipping (or .html in dev)
  const parts = window.location.pathname.replace(/\.html$/, '').split('/');
  return parts[parts.length - 1];
}

function buildCaseStudy() {
  const main = document.getElementById('case-study');
  if (!main) return;

  // Try data-client attr first, fall back to URL slug
  const slug = main.dataset.client || getSlugFromPath();
  const cs = caseStudies.find(c => c.slug === slug);

  if (!cs) {
    main.innerHTML = `<div class="container" style="padding-top:120px"><p>Case study not found.</p></div>`;
    return;
  }

  // Update page title dynamically
  const cleanTitle = cs.title.replace(/^Case [Ss]tudy:\s*/i, '');
  document.title = `${cleanTitle} | Eden Communications`;

  const heroImg = HERO_IMAGE_MAP[cs.slug] || cs.heroImage;

  // Related case studies
  const related = (cs.relatedCaseStudies || [])
    .map(relSlug => caseStudies.find(c => c.slug === relSlug))
    .filter(Boolean)
    .slice(0, 3);

  const relatedCards = related.map(rel => {
    const relImg = HERO_IMAGE_MAP[rel.slug] || rel.heroImage;
    return `
      <a href="/case-studies/${rel.slug}" class="related-card">
        <div class="related-card-img-wrap">
          <img src="${relImg}" alt="${rel.alt}" class="related-card-img" loading="lazy">
        </div>
        <p class="related-card-title">${rel.title}</p>
      </a>
    `;
  }).join('');

  const sidebarMetricsHtml = (cs.metrics && cs.metrics.length) ? (() => {
    const items = cs.metrics.map((m, i) => {
      const divider = i < cs.metrics.length - 1
        ? `<div class="sidebar-metric-divider"></div>`
        : '';
      return `
        <div class="sidebar-metric-item">
          <span class="sidebar-metric-number">${m.number}</span>
          <span class="sidebar-metric-label">${m.label}</span>
        </div>
        ${divider}
      `;
    }).join('');
    return `
      <div class="sidebar-metrics">
        <h3 class="sidebar-metrics-heading">BY THE NUMBERS</h3>
        ${items}
      </div>
    `;
  })() : '';

  main.innerHTML = `
    <section class="cs-detail-hero">
      <div class="cs-detail-hero-img-wrap">
        <img
          src="${heroImg}"
          alt="${cs.alt}"
          class="cs-detail-hero-img"
          loading="eager"
        >
        <div class="cs-detail-hero-overlay"></div>
      </div>
      <div class="cs-detail-hero-content container">
        <h1 class="cs-detail-title" data-animate="words">${cleanTitle}</h1>
        <p class="cs-detail-subtitle">${cs.subtitle}</p>
      </div>
    </section>


    <section class="cs-detail-body section-padding">
      <div class="container">
        <div class="cs-detail-layout">
          <article class="cs-detail-article">
            <div class="cs-detail-meta">
              <div class="cs-detail-meta-item">
                <span class="cs-detail-meta-label">Service</span>
                <span class="cs-detail-meta-value">${cs.service}</span>
              </div>
              <div class="cs-detail-meta-item">
                <span class="cs-detail-meta-label">Industry</span>
                <span class="cs-detail-meta-value">${cs.industries}</span>
              </div>
            </div>
            <div class="cs-detail-content">
              ${cs.bodyHtml}
            </div>
          </article>

          <aside class="cs-detail-sidebar">
            ${sidebarMetricsHtml}

            <div class="sidebar-cta">
              <p class="sidebar-cta-text">Ready to build institutional credibility?</p>
              <a href="mailto:hello@edencommunications.com" class="sidebar-cta-btn">Get in touch</a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    ${related.length ? `
      <section class="cs-related section-padding">
        <div class="container">
          ${createDivider('More Case Studies')}
          <div class="related-grid">
            ${relatedCards}
          </div>
        </div>
      </section>
    ` : ''}

    ${cs.isLast ? `
      <section class="cs-end-message section-padding">
        <div class="container">
          <p class="cs-end-text">${cs.lastMessage}</p>
          <a href="/case-studies" class="cs-end-link">← Back to all case studies</a>
        </div>
      </section>
    ` : ''}
  `;

  initAnimations();
}

document.addEventListener('DOMContentLoaded', buildCaseStudy);
