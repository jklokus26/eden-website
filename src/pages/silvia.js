import '../styles/look-2026.css';
import '../styles/silvia-2026.css';
import { silviaPage, silviaCoverage } from '../../data/silvia.js';
import { initContactForm } from '../components/contact-form.js';
import { ARROW, buildContactBand, initReveal, initAnchors, initNavState } from '../components/look-2026.js';

// Silvia coverage page, Oct 2026 look (DESIGN.md): the intro and a link to
// silvia.com, then the coverage as a list of rows (outlet, headline, date)
// between hairlines. Copy and links come from data/silvia.js.

const OUT = 'target="_blank" rel="noopener"';

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

function buildCoverage(items) {
  if (!items.length) return '';
  return `
    <section class="scov" aria-labelledby="coverage-title">
      <div class="wrap">
        <h2 id="coverage-title" class="t-label t-label--dot scov__label">${silviaPage.listLabel}</h2>
        <ol class="scov__list">
          ${items.map((c, i) => `
            <li class="scov__item" data-reveal style="--i: ${i % 6}">
              <a class="scov__link" href="${c.url}" ${OUT}>
                <span class="t-label scov__outlet">${c.outlet}</span>
                <span class="t-card scov__headline">${c.headline}</span>
                <time class="scov__date" datetime="${c.date}">${formatDate(c.date)}${c.kind ? ` · ${c.kind}` : ''}</time>
                ${ARROW}
              </a>
            </li>
          `).join('')}
        </ol>
      </div>
    </section>
  `;
}

function buildSilvia() {
  const main = document.getElementById('silvia');
  if (!main) return;

  main.innerHTML = `
    <section class="shero" aria-labelledby="silvia-title">
      <div class="wrap shero__grid">
        <div class="shero__head">
          <p class="t-label t-label--dot">${silviaPage.sectionLabel}</p>
          <h1 id="silvia-title" class="t-h2 shero__title">${silviaPage.headline}</h1>
        </div>
        <div class="shero__copy">
          <p>${silviaPage.intro}</p>
          <a class="btn btn--primary" href="${silviaPage.site.href}" ${OUT}>${silviaPage.site.label} ${ARROW}</a>
        </div>
      </div>
    </section>

    ${buildCoverage(silviaCoverage)}

    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
}

function initSilviaPage() {
  buildSilvia();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initSilviaPage);
