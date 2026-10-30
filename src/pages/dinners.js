import '../styles/look-2026.css';
import '../styles/dinners-2026.css';
import { dinnersPage, dinnerPhotos } from '../../data/dinners.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, keepWords, buildContactBand, dinnerFilm, initFilms, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import { sectionHead } from '../components/eden-kit.js';
import { initBoldPage } from '../components/eden-bold.js';

// Private Dinners page, on the bold kit (DESIGN.md). Copy and numbers come
// from data/dinners.js (Eden's doc and dinner deck, verbatim).

const IMG_DIR = '/assets/images/dinners';

// The recap film leads the page, and photos sit beside the numbers and the
// quote instead of a gallery (Alkida's Loom, 2026-10-21: "I don't really
// like the images over here as like a gallery... a little bit more
// scattered throughout the page"). Beside the numbers, the Wintermute
// table full of guests (brighter and sharper than the skyline phone photo
// it replaced, Joe, 2026-10-30); beside the quote, two guests' moments,
// staggered, so the white chapter isn't mostly empty. The rest of the dinner photos stay in
// data/dinners.js and public/assets/images/dinners.
const RESULTS_PHOTO = 'wintermute-dinner-table-guests-wide';
const QUOTE_PHOTOS = ['wintermute-dinner-guests-table-talk', 'wintermute-dinner-guest-smiling'];

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
  // A landscape photo in the portrait frame is cut to its height, so it
  // shows wider than the column: ask for the larger file.
  const sizes = p.width > p.height ? '(max-width: 900px) 100vw, 56vw' : '(max-width: 900px) 100vw, 33vw';
  return `<div class="${className}" data-reveal${p.focus ? ` style="--focus: ${p.focus}"` : ''}>${photo(p, sizes)}</div>`;
}

function buildResults(results) {
  if (!results?.dinners?.length) return '';
  return `
    <section class="dresults" aria-labelledby="results-title">
      <div class="wrap">
        ${sectionHead({ label: results.heading, labelId: 'results-title' })}
        <div class="dresults__layout">
        ${sidePhoto(RESULTS_PHOTO, 'dresults__photo frame-rise')}
        <div class="dresults__body">
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
      </div>
    </section>
  `;
}

// The quote with two photos beside it, the page's light chapter; the signature
// line stands beside the quote as a bar, as on the homepage's quotes.
// Hidden with its photo when the quote is switched off in data/dinners.js.
function buildQuote(quote) {
  if (!quote) return '';
  return `
    <div class="chapter">
      <section class="dquote-band" aria-label="What a guest said">
        <div class="wrap dquote-band__layout">
          <figure class="dquote" data-reveal>
            <blockquote><span class="sig sig--down" aria-hidden="true"></span><p>${keepWords(quote.text)}</p></blockquote>
            <figcaption>${quote.name}, ${quote.outlet}</figcaption>
          </figure>
          <div class="dquote-band__photos">
            ${QUOTE_PHOTOS.map(base => sidePhoto(base, 'dquote-band__photo')).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function buildDinners() {
  const main = document.getElementById('dinners');
  if (!main) return;

  main.innerHTML = `
    <section class="dhero" aria-labelledby="dinners-title">
      <div class="wrap">
        ${sectionHead({ label: dinnersPage.sectionLabel, title: dinnersPage.headline, titleId: 'dinners-title', titleTag: 'h1', titleClass: 'poster poster--long' })}
        <div class="dhero__copy" data-reveal style="--i: 4">
          ${dinnersPage.paragraphs.map(p => `<p>${p}</p>`).join('')}
          <a class="btn btn--primary" href="${dinnersPage.cta.href}">${dinnersPage.cta.label} ${ARROW}</a>
        </div>
        <div class="dhero__film frame-rise" data-reveal>${dinnerFilm()}</div>
      </div>
    </section>

    ${buildResults(dinnersPage.results)}

    ${buildQuote(dinnersPage.results?.quote)}

    ${buildContactBand()}
  `;

  initBoldPage(main);
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
