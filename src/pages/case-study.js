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
  document.title = `${cs.title} | Eden Communications`;

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
        <span class="related-card-service">${rel.service}</span>
        <p class="related-card-title">${rel.title}</p>
      </a>
    `;
  }).join('');

  const sidebarNewsItems = (cs.sidebarNews || []).map(item => `
    <li class="sidebar-news-item">
      <a href="${item.url}" class="sidebar-news-link" target="_blank" rel="noopener noreferrer">
        <span class="sidebar-news-date">${item.date}</span>
        <p class="sidebar-news-title">${item.title}</p>
      </a>
    </li>
  `).join('');

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
        <h1 class="cs-detail-title" data-animate="words">${cs.title}</h1>
        <p class="cs-detail-subtitle">${cs.subtitle}</p>
      </div>
    </section>

    ${cs.metrics && cs.metrics.length ? `
    <section class="cs-hero-metrics">
      <div class="container">
        <div class="cs-hero-metrics-grid">
          ${cs.metrics.slice(0, 3).map(m => `
            <div class="cs-hero-metric-item">
              <span class="cs-hero-metric-number">${m.number}</span>
              <span class="cs-hero-metric-label">${m.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

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
            ${sidebarNewsItems.length ? `
              <div class="sidebar-section">
                ${createDivider('Recent Coverage')}
                <ul class="sidebar-news-list">
                  ${sidebarNewsItems}
                </ul>
              </div>
            ` : ''}

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
