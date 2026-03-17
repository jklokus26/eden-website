import '../styles/gallery.css';
import { coverageItems, OUTLET_LOGO_MAP } from '../../data/coverage.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';

const ITEMS_PER_PAGE = 15;

function formatDate(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function buildLogoHtml(item) {
  const logoPath = OUTLET_LOGO_MAP[item.logoKey];
  if (logoPath) {
    return `<img src="${logoPath}" alt="${item.publication}" class="coverage-row-logo-img" loading="lazy">`;
  }
  // Text fallback for outlets without a logo file
  return `<span class="coverage-row-logo-text">${item.publication}</span>`;
}

function buildRow(item) {
  const tag = item.externalUrl ? 'a' : 'div';
  const linkAttrs = item.externalUrl
    ? `href="${item.externalUrl}" target="_blank" rel="noopener noreferrer"`
    : '';

  return `
    <${tag} class="coverage-row" data-client="${item.client}" ${linkAttrs}>
      <div class="coverage-row-logo">
        ${buildLogoHtml(item)}
      </div>
      <div class="coverage-row-content">
        <div class="coverage-row-meta">
          <span class="coverage-row-date">${formatDate(item.datePublished)}</span>
          <span class="coverage-row-dot">\u00B7</span>
          <span class="coverage-row-client">${item.client}</span>
        </div>
        <h3 class="coverage-row-title">${item.title}</h3>
        ${item.summary ? `<p class="coverage-row-summary">${item.summary}</p>` : ''}
      </div>
      ${item.externalUrl ? '<span class="coverage-row-arrow">\u2192</span>' : ''}
    </${tag}>
  `;
}

function buildRecentWork() {
  const main = document.getElementById('recent-work');
  if (!main) return;

  // Get unique clients for filter chips
  const clients = [...new Set(coverageItems.map(i => i.client))];

  const filterChips = clients.map(c =>
    `<button class="coverage-filter" data-filter="${c}">${c}</button>`
  ).join('');

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
          ${filterChips}
        </div>
        <div class="coverage-list" id="coverage-list"></div>
        <div class="coverage-load-more-wrap" id="load-more-wrap">
          <button class="coverage-load-more" id="load-more-btn">Load More</button>
        </div>
      </div>
    </section>
  `;

  // State
  let activeFilter = 'all';
  let visibleCount = ITEMS_PER_PAGE;

  const listEl = main.querySelector('#coverage-list');
  const loadMoreBtn = main.querySelector('#load-more-btn');
  const loadMoreWrap = main.querySelector('#load-more-wrap');

  function getFiltered() {
    if (activeFilter === 'all') return coverageItems;
    return coverageItems.filter(i => i.client === activeFilter);
  }

  function render() {
    const filtered = getFiltered();
    const toShow = filtered.slice(0, visibleCount);
    listEl.innerHTML = toShow.map(buildRow).join('');

    // Show/hide Load More
    if (visibleCount >= filtered.length) {
      loadMoreWrap.style.display = 'none';
    } else {
      loadMoreWrap.style.display = '';
    }
  }

  render();

  // Load More
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += ITEMS_PER_PAGE;
    render();
  });

  // Filter chips
  const filters = main.querySelectorAll('.coverage-filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      visibleCount = ITEMS_PER_PAGE;
      render();
    });
  });
}

function initRecentWorkPage() {
  buildRecentWork();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initRecentWorkPage);
