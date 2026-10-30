import '../styles/look-2026.css';
import '../styles/recent-work-2026.css';
import { coverageItems } from '../../data/coverage.js';
import { mediaLogos, PRESS_HEIGHTS } from '../../data/media-logos.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, pageHead, buildContactBand, focusSection, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import { initBoldPage } from '../components/eden-bold.js';
import { escapeHtml as esc, safeUrl } from '../components/escape.js';

// Recent Work, on the bold kit (DESIGN.md): the client filter, then the
// coverage as link rows, 15 at a time. Copy and coverage come from
// data/coverage.js. The filters take the kit's ink box; a hovered row draws
// the signature line along its foot. Coverage values are escaped as they're
// written (esc, safeUrl): a script fills data/coverage.js from Eden's sheet.

const ITEMS_PER_PAGE = 15;

// Each outlet's logo from the press logo list (data/media-logos.js), the
// same files and proportions as the homepage strip.
const OUTLET_NAMES = {
  'coindesk': 'CoinDesk', 'bloomberg': 'Bloomberg', 'fortune': 'Fortune', 'cnbc': 'CNBC',
  'yahoo-finance': 'Yahoo Finance', 'the-block': 'The Block', 'wsj': 'The Wall Street Journal',
  'financial-times': 'Financial Times', 'forbes': 'Forbes', 'reuters': 'Reuters',
  'new-york-times': 'The New York Times', 'bloomberg-law': 'Bloomberg Law',
};
const LOGOS = Object.fromEntries(mediaLogos.map(l => [l.name, l]));

// Logos sit at a fixed fraction of the strip's tuned heights, so every mark
// carries the same weight here too (Joe, 2026-10-23: Law360, Law.com and
// Reuters looked "extremely small compared to the CNBC logo").
const LOGO_SCALE = 0.72;

function formatDate(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// The outlet's logo drawn in ink; an outlet without a logo file shows its
// name as a wordmark of the same size and weight.
function buildOutlet(item) {
  const logo = LOGOS[OUTLET_NAMES[item.logoKey]];
  if (logo) {
    const h = Math.round((PRESS_HEIGHTS[logo.name] || 26) * LOGO_SCALE);
    return `<span class="rows__outlet rw__logo-cell"><span class="ink-logo rw__logo" role="img" aria-label="${esc(item.publication)}" style="--src: url('${logo.logo}'); --r: ${logo.ratio}; --h: ${h}px"></span></span>`;
  }
  return `<span class="rows__outlet rw__logo-cell"><span class="rw__wordmark">${esc(item.publication)}</span></span>`;
}

// One row. Rows without a URL are not links. Rows don't fade in: a long list
// of staggered entrances never settled (design audit, 2026-10-30).
function buildRow(item) {
  const inner = `
    ${buildOutlet(item)}
    <div class="rw__text">
      <h2 class="t-card rows__headline">${esc(item.title)}</h2>
      ${item.summary ? `<p class="rw__summary">${esc(item.summary)}</p>` : ''}
    </div>
    <span class="rw__meta">
      <time class="rows__date" datetime="${esc(item.datePublished)}">${esc(formatDate(item.datePublished))}</time>
      <span class="t-label rw__client">${esc(item.client)}</span>
    </span>
  `;
  const href = safeUrl(item.externalUrl);
  const row = href
    ? `<a class="rows__link" href="${href}" target="_blank" rel="noopener noreferrer">${inner}${ARROW}<span class="sig-mark" aria-hidden="true"></span></a>`
    : `<div class="rows__link rw__static">${inner}</div>`;
  return `<li class="rows__item">${row}</li>`;
}

function buildRecentWork() {
  const main = document.getElementById('recent-work');
  if (!main) return;

  // One filter per client, in the order they first appear.
  const clients = [...new Set(coverageItems.map(i => i.client))];
  const filter = (value, label, pressed) =>
    `<button class="rw__filter" type="button" data-filter="${esc(value)}" aria-pressed="${pressed}" aria-controls="coverage-list" data-ink>${esc(label)}</button>`;

  main.innerHTML = `
    ${pageHead({ label: 'Recent Work', title: 'Our clients’ wins', id: 'recent-work-title' })}

    <section class="rw">
      <div class="wrap">
        <div class="rw__filters" role="group" aria-label="Filter by client">
          ${filter('all', 'All', true)}
          ${clients.map(c => filter(c, c, false)).join('')}
        </div>
        <ul class="rows rw__list" id="coverage-list"></ul>
        <div class="rw__more">
          <button class="btn btn--secondary" type="button" id="load-more-btn" aria-controls="coverage-list">Load More</button>
        </div>
      </div>
    </section>

    ${buildContactBand()}
  `;

  let activeFilter = 'all';
  let visibleCount = ITEMS_PER_PAGE;

  const listEl = main.querySelector('#coverage-list');
  const loadMoreBtn = main.querySelector('#load-more-btn');
  const loadMoreWrap = main.querySelector('.rw__more');

  function getFiltered() {
    if (activeFilter === 'all') return coverageItems;
    return coverageItems.filter(i => i.client === activeFilter);
  }

  function updateLoadMore(total) {
    loadMoreWrap.hidden = visibleCount >= total;
  }

  function render() {
    const filtered = getFiltered();
    listEl.innerHTML = filtered.slice(0, visibleCount).map(buildRow).join('');
    updateLoadMore(filtered.length);
  }

  render();

  // Load More adds the next rows under the ones already shown and moves
  // focus to the first new row, so keyboard and screen reader users carry on
  // from there (the button may have just hidden itself).
  loadMoreBtn.addEventListener('click', () => {
    const filtered = getFiltered();
    const next = filtered.slice(visibleCount, visibleCount + ITEMS_PER_PAGE);
    if (!next.length) return;
    listEl.insertAdjacentHTML('beforeend', next.map(buildRow).join(''));
    const firstNew = listEl.children[visibleCount];
    visibleCount += ITEMS_PER_PAGE;
    updateLoadMore(filtered.length);
    const link = firstNew.querySelector('a');
    if (link) link.focus({ preventScroll: true });
    else focusSection(firstNew.firstElementChild);
  });

  const filters = main.querySelectorAll('.rw__filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      activeFilter = btn.dataset.filter;
      visibleCount = ITEMS_PER_PAGE;
      render();
    });
  });
}

function initRecentWorkPage() {
  const main = document.getElementById('recent-work');
  buildRecentWork();
  if (!main) return;
  initBoldPage(main);
  initReveal(main);
  initAnchors(main);
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initRecentWorkPage);
