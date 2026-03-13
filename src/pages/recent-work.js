import '../styles/gallery.css';
import { coverageItems } from '../../data/coverage.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';

function buildRecentWork() {
  const main = document.getElementById('recent-work');
  if (!main) return;

  const tiles = coverageItems.map(item => `
    <a href="${item.externalUrl}" class="coverage-grid-tile" target="_blank" rel="noopener noreferrer">
      <div class="coverage-grid-tile-img-wrap">
        <img
          src="${item.screenshotImage}"
          alt="${item.title}"
          loading="lazy"
          onerror="this.parentElement.style.background='var(--bg-section)'; this.style.display='none'"
        >
      </div>
      <div class="coverage-grid-tile-info">
        <span class="coverage-grid-tile-pub">${item.publication}</span>
        <p class="coverage-grid-tile-title">${item.title}</p>
      </div>
    </a>
  `).join('');

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider('Recent Work')}
        <h1 class="gallery-headline">Our clients' wins</h1>
      </div>
    </section>
    <section class="section-padding">
      <div class="container">
        <div class="coverage-static-grid">
          ${tiles}
        </div>
      </div>
    </section>
  `;
}

function initRecentWorkPage() {
  buildRecentWork();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initRecentWorkPage);
