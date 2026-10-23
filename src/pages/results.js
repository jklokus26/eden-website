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
          <h2 class="cs-card-title">${cs.title.replace(/^Case [Ss]tudy:\s*/i, '')}</h2>
          <p class="cs-card-subtitle">${cs.subtitle}</p>
          <span class="cs-card-cta">View case study <span class="cs-card-arrow">→</span></span>
        </div>
      </a>
    `;
  }).join('');

  // Silvia's client story lives at /silvia, not under /case-studies (Pomp,
  // through Alkida, 2026-10-23), so its card is added here by hand.
  const silviaCard = `
      <a href="/silvia" class="cs-card cs-card--regular">
        <div class="cs-card-img-wrap">
          <img src="/assets/images/silvia-card.jpg" alt="The Silvia logo" class="cs-card-img" loading="lazy">
          <div class="cs-card-overlay"></div>
        </div>
        <div class="cs-card-body">
          <h2 class="cs-card-title">Silvia</h2>
          <p class="cs-card-subtitle">Bringing a personal AI CFO into the media conversation</p>
          <span class="cs-card-cta">View client story <span class="cs-card-arrow">→</span></span>
        </div>
      </a>
    `;

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider('Our Results')}
        <h1 class="gallery-headline">Campaigns that create market leaders.</h1>
      </div>
    </section>
    <section class="gallery-grid">
      <div class="container">
        <div class="cs-grid">
          ${cards}
          ${silviaCard}
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
