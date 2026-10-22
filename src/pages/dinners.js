import '../styles/look-2026.css';
import '../styles/dinners-2026.css';
import { dinnersPage, dinnerPhotos } from '../../data/dinners.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, buildContactBand, dinnerFilm, initFilms, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// Private Dinners page, Oct 2026 look (DESIGN.md). Copy and numbers come
// from data/dinners.js (Eden's doc and dinner deck, verbatim).

const IMG_DIR = '/assets/images/dinners';

// The recap film leads the page, and two photos sit beside the numbers and
// the quote instead of a gallery (Alkida's Loom, 2026-10-21: "I don't
// really like the images over here as like a gallery... a little bit more
// scattered throughout the page"). The rest of the dinner photos stay in
// data/dinners.js and public/assets/images/dinners.
const RESULTS_PHOTO = 'wintermute-dinner-room-table-set';
const QUOTE_PHOTO = 'wintermute-dinner-guests-table-talk';

function findPhoto(base) {
  return dinnerPhotos.find(p => p.base === base);
}

function photo(p, sizes, eager = false) {
  return picture({
    dir: IMG_DIR, base: p.base, widths: [640, 1024, 1600], sizes,
    alt: p.alt, width: p.width, height: p.height, eager,
  });
}

function sidePhoto(base, className) {
  const p = findPhoto(base);
  if (!p) return '';
  return `<div class="${className}" data-reveal${p.focus ? ` style="--focus: ${p.focus}"` : ''}>${photo(p, '(max-width: 900px) 100vw, 33vw')}</div>`;
}

function buildResults(results) {
  if (!results?.dinners?.length) return '';
  return `
    <section class="dresults" aria-labelledby="results-title">
      <div class="wrap dresults__layout">
        ${sidePhoto(RESULTS_PHOTO, 'dresults__photo')}
        <div class="dresults__body">
          <h2 id="results-title" class="t-label t-label--dot dresults__label">${results.heading}</h2>
          <div class="dresults__grid">
            ${results.dinners.map((d, i) => `
              <article class="dresult" data-reveal style="--i: ${i}">
                <h3 class="t-card dresult__name">${d.name}</h3>
                <ul class="dresult__stats">
                  ${d.stats.map(s => `
                    <li class="dresult__stat">
                      <span class="dresult__value">${s.value}</span>
                      <span class="dresult__unit">${s.label}</span>
                    </li>
                  `).join('')}
                </ul>
                <p class="dresult__outlets">${d.outlets}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

// The quote with a photo beside it. Hidden with its photo when the quote is
// switched off in data/dinners.js.
function buildQuote(quote) {
  if (!quote) return '';
  return `
    <section class="dquote-band" aria-label="What a guest said">
      <div class="wrap dquote-band__layout">
        <figure class="dquote" data-reveal>
          <blockquote><p>${quote.text}</p></blockquote>
          <figcaption>${quote.name}, ${quote.outlet}</figcaption>
        </figure>
        ${sidePhoto(QUOTE_PHOTO, 'dquote-band__photo')}
      </div>
    </section>
  `;
}

function buildDinners() {
  const main = document.getElementById('dinners');
  if (!main) return;

  main.innerHTML = `
    <section class="dhero" aria-labelledby="dinners-title">
      <div class="wrap dhero__grid">
        <div class="dhero__head">
          <p class="t-label t-label--dot">${dinnersPage.sectionLabel}</p>
          <h1 id="dinners-title" class="t-h2 dhero__title">${dinnersPage.headline}</h1>
        </div>
        <div class="dhero__copy">
          ${dinnersPage.paragraphs.map(p => `<p>${p}</p>`).join('')}
          <a class="btn btn--primary" href="${dinnersPage.cta.href}">${dinnersPage.cta.label} ${ARROW}</a>
        </div>
      </div>
      <div class="wrap">${dinnerFilm()}</div>
    </section>

    ${buildResults(dinnersPage.results)}

    ${buildQuote(dinnersPage.results?.quote)}

    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
  initFilms(main);
}

function initDinnersPage() {
  buildDinners();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initDinnersPage);
