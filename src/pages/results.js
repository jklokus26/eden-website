import '../styles/gallery.css';
import { caseStudies, HERO_IMAGE_MAP } from '../../data/case-studies.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';
import { buildContactSection, initContactForm } from '../components/contact-form.js';

function buildResults() {
  const main = document.getElementById('results-gallery');
  if (!main) return;

  const cards = caseStudies.map((cs, i) => {
    const img = HERO_IMAGE_MAP[cs.slug] || cs.heroImage;
    return `
      <a href="/case-studies/${cs.slug}" class="cs-card cs-card--regular">
        <div class="cs-card-img-wrap">
          <img
            src="${img}"
            alt="${cs.alt}"
            class="cs-card-img"
            loading="${i === 0 ? 'eager' : 'lazy'}"
            onerror="this.style.display='none'"
          >
          <div class="cs-card-overlay"></div>
        </div>
        <div class="cs-card-body">
          <div class="cs-card-meta">
            <span class="cs-card-service">${cs.service}</span>
          </div>
          <h2 class="cs-card-title">${cs.title}</h2>
          <p class="cs-card-subtitle">${cs.subtitle}</p>
          <span class="cs-card-cta">View case study <span class="cs-card-arrow">→</span></span>
        </div>
      </a>
    `;
  }).join('');

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider('Our Results')}
        <h1 class="gallery-headline">Campaigns that create market leaders.</h1>
      </div>
    </section>
    <section class="gallery-grid section-padding">
      <div class="container">
        <div class="cs-grid">
          ${cards}
        </div>
      </div>
    </section>
    ${buildContactSection()}
  `;
}

function initResultsPage() {
  buildResults();
  initContactForm();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initResultsPage);
