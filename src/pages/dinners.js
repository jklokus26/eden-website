import '../styles/look-2026.css';
import '../styles/dinners-2026.css';
import { dinnersPage, dinnerPhotos } from '../../data/dinners.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// Private Dinners page, Oct 2026 look (DESIGN.md). Copy and numbers come
// from data/dinners.js (Eden's doc and dinner deck, verbatim).

const IMG_DIR = '/assets/images/dinners';

function photo(p, sizes, eager = false) {
  return picture({
    dir: IMG_DIR, base: p.base, widths: [640, 1024, 1600], sizes,
    alt: p.alt, width: p.width, height: p.height, eager,
  });
}

function buildResults(results) {
  if (!results?.dinners?.length) return '';
  const { quote } = results;
  return `
    <section class="dresults" aria-labelledby="results-title">
      <div class="wrap">
        <h2 id="results-title" class="t-label dresults__label">${results.heading}</h2>
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
        ${quote ? `
          <figure class="dquote" data-reveal>
            <blockquote><p>${quote.text}</p></blockquote>
            <figcaption>${quote.name}, ${quote.outlet}</figcaption>
          </figure>
        ` : ''}
      </div>
    </section>
  `;
}

function buildDinners() {
  const main = document.getElementById('dinners');
  if (!main) return;

  const [lead, ...rest] = dinnerPhotos;
  // The gallery skips the menu card (a landscape detail shot that loses its
  // text in a portrait tile) and the shot that is mostly the backs of heads,
  // so eight photos sit in an even 4 by 2 grid.
  const GALLERY_SKIP = ['wintermute-dinner-wintermute-menu', 'wintermute-dinner-guest-smiling'];
  const gallery = rest.filter(p => !GALLERY_SKIP.includes(p.base));

  main.innerHTML = `
    <section class="dhero" aria-labelledby="dinners-title">
      <div class="wrap dhero__grid">
        <div class="dhero__head">
          <p class="t-label">${dinnersPage.sectionLabel}</p>
          <h1 id="dinners-title" class="t-h2 dhero__title">${dinnersPage.headline}</h1>
        </div>
        <div class="dhero__copy">
          ${dinnersPage.paragraphs.map(p => `<p>${p}</p>`).join('')}
          <a class="btn btn--primary" href="${dinnersPage.cta.href}">${dinnersPage.cta.label} ${ARROW}</a>
        </div>
      </div>
      <div class="wrap">
        <div class="dhero__lead">${photo(lead, '(max-width: 1280px) 100vw, 1184px', true)}</div>
      </div>
    </section>

    ${buildResults(dinnersPage.results)}

    <section class="dgallery" aria-label="Photos from the Wintermute dinner">
      <div class="wrap">
        <ul class="dgallery__grid">
          ${gallery.map(p => `<li class="dgallery__item"${p.focus ? ` style="--focus: ${p.focus}"` : ''}>${photo(p, '(max-width: 900px) 50vw, 25vw')}</li>`).join('')}
        </ul>
      </div>
    </section>

    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
}

function initDinnersPage() {
  buildDinners();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initDinnersPage);
