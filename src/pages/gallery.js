import '../styles/gallery.css';
import { caseStudies } from '../../data/case-studies.js';
import { caseStudiesPageHeadline } from '../../data/site-content.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';

// Map data heroImage paths to actual downloaded filenames
const HERO_IMAGE_MAP = {
  'grip-shipping': '/assets/images/grip-shipping-team.jpg',
  'franzy': '/assets/images/franzy-fox-business.jpg',
  'stellar-development-foundation': '/assets/images/stellar-screenshot.png',
  'reed-smith-on-chain': '/assets/images/reed-smith-dixon.jpg',
};

function buildGallery() {
  const main = document.getElementById('case-studies-gallery');
  if (!main) return;

  const cards = caseStudies.map((cs, i) => {
    const img = HERO_IMAGE_MAP[cs.slug] || cs.heroImage;
    return `
      <a href="/case-studies/${cs.slug}" class="cs-card cs-card--${i === 0 ? 'featured' : 'regular'}">
        <div class="cs-card-img-wrap">
          <img
            src="${img}"
            alt="${cs.alt}"
            class="cs-card-img"
            loading="${i === 0 ? 'eager' : 'lazy'}"
          >
          <div class="cs-card-overlay"></div>
        </div>
        <div class="cs-card-body">
          <div class="cs-card-meta">
            <span class="cs-card-service">${cs.service}</span>
            <span class="cs-card-date">${cs.date}</span>
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
        ${createDivider('Our Work')}
        <h1 class="gallery-headline">${caseStudiesPageHeadline}</h1>
      </div>
    </section>
    <section class="gallery-grid section-padding">
      <div class="container">
        <div class="cs-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function initGalleryPage() {
  buildGallery();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initGalleryPage);
