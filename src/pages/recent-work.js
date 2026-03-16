import '../styles/gallery.css';
import { coverageItems } from '../../data/coverage.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';

function buildRecentWork() {
  const main = document.getElementById('recent-work');
  if (!main) return;

  const tiles = coverageItems.map(item => `
    <a href="${item.externalUrl}" class="coverage-grid-tile" data-category="${item.coverageType}" target="_blank" rel="noopener noreferrer">
      <div class="coverage-grid-tile-logo">
        <img src="${item.logoImage}" alt="${item.publication}" class="coverage-grid-tile-logo-img" loading="lazy">
      </div>
      <div class="coverage-grid-tile-img-wrap">
        <img src="${item.screenshotImage}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="coverage-grid-tile-info">
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
        <div class="coverage-filters">
          <button class="coverage-filter active" data-filter="all">All</button>
          <button class="coverage-filter" data-filter="Broadcast">Broadcast</button>
          <button class="coverage-filter" data-filter="Podcast">Podcast</button>
          <button class="coverage-filter" data-filter="Article">Article</button>
        </div>
        <div class="coverage-static-grid">
          ${tiles}
        </div>
      </div>
    </section>
  `;

  // Filter chip interactivity
  const filters = main.querySelectorAll('.coverage-filter');
  const grid = main.querySelector('.coverage-static-grid');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active chip
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide tiles
      const tiles = grid.querySelectorAll('.coverage-grid-tile');
      tiles.forEach(tile => {
        if (filter === 'all' || tile.dataset.category === filter) {
          tile.classList.remove('hidden');
        } else {
          tile.classList.add('hidden');
        }
      });
    });
  });
}

function initRecentWorkPage() {
  buildRecentWork();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initRecentWorkPage);
