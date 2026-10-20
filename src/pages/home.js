import '../styles/look-2026.css';
import '../styles/home-2026.css';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, textLink, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import { lenis } from '../main.js';
import {
  homeHero,
  homeProof,
  homeClientsLabel,
  homeWhatWeDo,
  homeDinners,
  homeIndustries,
  teamHeading,
} from '../../data/site-content.js';
import { clientStrip } from '../../data/clients.js';
import { mediaLogos } from '../../data/media-logos.js';
import { team } from '../../data/team.js';
import { caseStudies } from '../../data/case-studies.js';
import { testimonials } from '../../data/testimonials.js';

// Homepage, Oct 2026 look (DESIGN.md). Copy comes from data/site-content.js,
// which holds Eden's "Website Flow (October 2026)" doc verbatim.

const DINNER_DIR = '/assets/images/dinners';
const HOME_DIR = '/assets/images/home';

// Label over the outlet logos (ours; the doc has none).
const PRESS_LABEL = 'Where our clients appear';

// The homepage shows the eight best-known outlets in one still row. All of
// Eden's outlet logos stay in data/media-logos.js.
const PRESS_PICKS = [
  'The Wall Street Journal', 'Bloomberg', 'Financial Times', 'The New York Times',
  'Reuters', 'CNBC', 'Forbes', 'Fortune',
];

// Logo heights tuned by eye on this page so every logo carries the same
// visual weight (heavy marks smaller, light or thin marks larger).
const CLIENT_HEIGHTS = {
  'Ondo Finance': 26, 'Wintermute': 19, 'Reed Smith': 22,
  'Cohen & Company Capital Markets': 30, 'Alpaca': 25, 'LayerZero': 28,
  'Grindr': 19, 'RoboStrategy': 15, 'Rox': 20, 'Jito Labs': 21,
};
const PRESS_HEIGHTS = {
  'The Wall Street Journal': 15, 'Bloomberg': 20, 'Financial Times': 15,
  'The New York Times': 21, 'Reuters': 24, 'CNBC': 21, 'Forbes': 22, 'Fortune': 17,
};

// Stock photos: CC0 / public domain from Wikimedia Commons, graded to one
// warm, muted tone. Sources: Financial Services "Window with Doric columns of
// the Neues Museum in Berlin" (CC0); Digital Assets "Polygonal Brown Facade"
// by Mike Wilson (CC0); Frontier Technology NASA ISS photo iss075e0099858
// (public domain); contact band "Sunset in New York City" by Joseph
// Barrientos (CC0).
const INDUSTRY_IMAGES = {
  'Financial Services': { base: 'industry-financial-services', alt: 'Neoclassical stone facade with columns between tall windows' },
  'Digital Assets': { base: 'industry-digital-assets', alt: 'Angular, faceted facade of a modern building in shadow' },
  'Frontier Technology': { base: 'industry-frontier-technology', alt: 'City lights across the Midwest at night, seen from the International Space Station' },
};

// Where each case study photo keeps its subject in a 3:2 crop.
const CASE_FOCUS = {
  'ondo': '50% 40%',
  'stellar-development-foundation': '50% 30%',
  'grip-shipping': '50% 22%',
};

// ─── Helpers ──────────────────────────────────────────────────────────────

function inkLogo({ name, logo, ratio }, height) {
  return `<span class="ink-logo" role="img" aria-label="${name}" style="--src: url('${logo}'); --r: ${ratio}; --h: ${height}px"></span>`;
}

function clientName(cs) {
  return cs.title.replace(/^Case Study:\s*/i, '');
}

// ─── Sections ─────────────────────────────────────────────────────────────

function buildHero() {
  return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__text">
        <p class="hero__eyebrow">${homeHero.eyebrow}</p>
        <h1 id="hero-title" class="t-display hero__title">${homeHero.headline}</h1>
        <p class="t-lead hero__body">${homeHero.body}</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="${homeHero.primaryCta.href}">${homeHero.primaryCta.label} ${ARROW}</a>
          <a class="btn btn--secondary" href="${homeHero.secondaryCta.href}">${homeHero.secondaryCta.label}</a>
        </div>
        <p class="hero__tagline">${homeHero.tagline}</p>
      </div>
      <div class="hero__media">
        ${picture({
          dir: DINNER_DIR,
          base: 'wintermute-dinner-long-table-flowers',
          widths: [640, 1024, 1600],
          sizes: '(max-width: 900px) 100vw, 50vw',
          alt: 'A long dinner table set with white flowers and glassware at a private Eden dinner',
          width: 1600,
          height: 2240,
          eager: true,
        })}
      </div>
    </section>
  `;
}

function buildProof() {
  const figures = homeProof.map(f => `
    <li class="proof__figure">
      <span class="proof__value">${f.value.toLocaleString('en-US')}${f.suffix}</span>
      <span class="proof__label">${f.label}</span>
    </li>
  `).join('');

  const press = PRESS_PICKS
    .map(name => mediaLogos.find(l => l.name === name))
    .filter(Boolean)
    .map(l => `<li class="press__item">${inkLogo(l, PRESS_HEIGHTS[l.name] || 20)}</li>`)
    .join('');

  return `
    <section class="proof" aria-labelledby="proof-title">
      <div class="wrap">
        <h2 id="proof-title" class="visually-hidden">Eden in numbers</h2>
        <ul class="proof__figures">${figures}</ul>
        <div class="press">
          <h3 class="t-label press__label">${PRESS_LABEL}</h3>
          <ul class="press__list">${press}</ul>
        </div>
      </div>
    </section>
  `;
}

function buildClients() {
  const items = clientStrip.map(c => {
    const logo = inkLogo(c, CLIENT_HEIGHTS[c.name] || Math.round(c.displayHeight * 0.85));
    return c.caseStudyUrl
      ? `<li class="clients__item"><a class="clients__link" href="${c.caseStudyUrl}" aria-label="${c.name} case study">${logo}</a></li>`
      : `<li class="clients__item">${logo}</li>`;
  }).join('');

  return `
    <section class="clients" aria-labelledby="clients-title">
      <div class="wrap">
        <h2 id="clients-title" class="t-label clients__label">${homeClientsLabel}</h2>
        <ul class="clients__grid">${items}</ul>
      </div>
    </section>
  `;
}

function buildWhatWeDo() {
  const pillars = homeWhatWeDo.pillars.map((p, i) => `
    <li class="pillar" data-reveal style="--i: ${i}">
      <span class="pillar__num">${p.number}</span>
      <h3 class="t-h3 pillar__title">${p.title}</h3>
      <p class="pillar__text">${p.text}</p>
    </li>
  `).join('');

  return `
    <section class="what" aria-labelledby="what-title">
      <div class="wrap">
        <p class="t-label sec-label" data-reveal>${homeWhatWeDo.sectionLabel}</p>
        <div class="what__head">
          <h2 id="what-title" class="t-h2 what__title" data-reveal>${homeWhatWeDo.headline}</h2>
          <p class="what__body" data-reveal style="--i: 1">${homeWhatWeDo.body}</p>
        </div>
        <ol class="pillars">${pillars}</ol>
      </div>
    </section>
  `;
}

function buildWork() {
  const featured = caseStudies.filter(cs => cs.featured).slice(0, 3);
  const cards = featured.map((cs, i) => `
    <li class="case" data-reveal style="--i: ${i}">
      <div class="case__media">
        <img src="${cs.heroImage}" alt="" width="1200" height="800" loading="lazy" decoding="async"
          style="object-position: ${CASE_FOCUS[cs.slug] || '50% 40%'}">
      </div>
      <p class="t-label case__client">${clientName(cs)}</p>
      <h3 class="t-card case__title"><a class="case__link" href="/case-studies/${cs.slug}">${cs.subtitle}</a></h3>
      <dl class="case__metrics">
        ${(cs.metrics || []).slice(0, 3).map(m => `
          <div class="case__metric"><dt>${m.label}</dt><dd>${m.number}</dd></div>
        `).join('')}
      </dl>
      <span class="text-link case__more" aria-hidden="true"><span class="text-link__label">View case study</span>${ARROW}</span>
    </li>
  `).join('');

  return `
    <section class="work" aria-labelledby="work-title">
      <div class="wrap">
        <div class="sec-head">
          <h2 id="work-title" class="t-label">Selected work</h2>
          ${textLink('/results', 'View all work')}
        </div>
        <ul class="work__grid">${cards}</ul>
      </div>
    </section>
  `;
}

function buildTestimonials() {
  const quotes = testimonials.map((t, i) => `
    <figure class="quote" data-reveal style="--i: ${i}">
      <blockquote class="quote__text"><p>${t.quote}</p></blockquote>
      <figcaption class="quote__by">
        <span class="quote__name">${t.name}</span>
        <span class="quote__role">${t.title}, ${t.company}</span>
      </figcaption>
    </figure>
  `).join('');

  return `
    <section class="quotes" aria-labelledby="quotes-title">
      <div class="wrap">
        <h2 id="quotes-title" class="visually-hidden">What clients say</h2>
        <div class="quotes__grid">${quotes}</div>
      </div>
    </section>
  `;
}

function buildDinners() {
  return `
    <section class="dinners" aria-labelledby="dinners-title">
      <div class="wrap dinners__grid">
        <div class="dinners__text">
          <p class="t-label" data-reveal>${homeDinners.sectionLabel}</p>
          <h2 id="dinners-title" class="t-h2" data-reveal>${homeDinners.headline}</h2>
          ${homeDinners.paragraphs.map((p, i) => `<p class="dinners__para" data-reveal style="--i: ${i + 1}">${p}</p>`).join('')}
          <div data-reveal style="--i: 3">${textLink(homeDinners.cta.href, homeDinners.cta.label)}</div>
        </div>
        <div class="dinners__photos">
          ${picture({
            dir: DINNER_DIR, base: 'wintermute-dinner-table-guests-wide', widths: [640, 1024, 1600],
            sizes: '(max-width: 900px) 100vw, 50vw', width: 1600, height: 1143, className: 'dinners__photo dinners__photo--wide',
            alt: 'Guests seated along a long candlelit table at a private Eden dinner',
          })}
          ${picture({
            dir: DINNER_DIR, base: 'wintermute-dinner-room-table-set', widths: [640, 1024],
            sizes: '(max-width: 900px) 50vw, 25vw', width: 1600, height: 2240, className: 'dinners__photo',
            alt: 'Private dining room set for dinner under a crystal chandelier',
          })}
          ${picture({
            dir: DINNER_DIR, base: 'wintermute-dinner-guests-conversation', widths: [640, 1024],
            sizes: '(max-width: 900px) 50vw, 25vw', width: 1600, height: 2240, className: 'dinners__photo',
            alt: 'Two guests in conversation before dinner',
          })}
        </div>
      </div>
    </section>
  `;
}

function buildIndustries() {
  const items = homeIndustries.items.map((ind, i) => {
    const img = INDUSTRY_IMAGES[ind.name];
    return `
      <li class="industry" data-reveal style="--i: ${i}">
        ${img ? picture({
          dir: HOME_DIR, base: img.base, widths: [640, 1024], sizes: '(max-width: 640px) 100vw, 33vw',
          width: 1600, height: 800, alt: img.alt, className: 'industry__photo',
        }) : ''}
        <h3 class="t-h3 industry__name">${ind.name}</h3>
        <ul class="industry__areas">${ind.areas.map(a => `<li>${a}</li>`).join('')}</ul>
      </li>
    `;
  }).join('');

  return `
    <section class="industries" aria-labelledby="industries-title">
      <div class="wrap">
        <h2 id="industries-title" class="t-label sec-label">${homeIndustries.sectionLabel}</h2>
        <ul class="industries__grid">${items}</ul>
      </div>
    </section>
  `;
}

function buildTeam() {
  const members = team.map((m, i) => `
    <li class="member" data-reveal style="--i: ${i}">
      <button class="member__button" type="button" data-index="${i}" aria-haspopup="dialog">
        <span class="member__photo"><img src="${m.photo}" alt="" width="500" height="625" loading="lazy" decoding="async"></span>
        <span class="member__info">
          <span class="member__name">${m.name}</span>
          <span class="member__role">${m.role}</span>
          <span class="member__more">Read bio</span>
        </span>
      </button>
    </li>
  `).join('');

  return `
    <section class="team" aria-labelledby="team-title">
      <div class="wrap">
        <div class="sec-head sec-head--ruled">
          <h2 id="team-title" class="t-label">${teamHeading.sectionLabel}</h2>
          ${textLink('/about', 'Meet the full team')}
        </div>
        <ul class="team__grid">${members}</ul>
      </div>
      <dialog class="bio-dialog" aria-labelledby="bio-name">
        <div class="bio">
          <div class="bio__photo"><img alt="" width="500" height="625"></div>
          <div class="bio__body">
            <h3 id="bio-name" class="t-h3 bio__name"></h3>
            <p class="bio__role"></p>
            <p class="bio__text"></p>
            <a class="text-link bio__linkedin" href="#" target="_blank" rel="noopener noreferrer"><span class="text-link__label">LinkedIn</span>${ARROW}</a>
          </div>
          <button class="bio__close" type="button" aria-label="Close bio">Close</button>
        </div>
      </dialog>
    </section>
  `;
}

// ─── Behaviour ────────────────────────────────────────────────────────────

function initBios(root) {
  const dialog = root.querySelector('.bio-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let opener = null;
  const photo = dialog.querySelector('.bio__photo img');

  root.querySelectorAll('.member__button').forEach(button => {
    button.addEventListener('click', () => {
      const m = team[Number(button.dataset.index)];
      photo.src = m.photo;
      photo.alt = m.alt || '';
      dialog.querySelector('.bio__name').textContent = m.name;
      dialog.querySelector('.bio__role').textContent = m.role;
      dialog.querySelector('.bio__text').textContent = m.bio;
      const linkedin = dialog.querySelector('.bio__linkedin');
      linkedin.hidden = !m.linkedin;
      if (m.linkedin) {
        linkedin.href = m.linkedin;
        linkedin.setAttribute('aria-label', `${m.name} on LinkedIn`);
      }
      opener = button;
      if (lenis) lenis.stop();
      dialog.showModal();
      dialog.querySelector('.bio__close').focus();
    });
  });

  dialog.querySelector('.bio__close').addEventListener('click', () => dialog.close());
  // A click on the backdrop lands on the dialog element itself.
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    if (lenis) lenis.start();
    if (opener) opener.focus();
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────

function initHomepage() {
  const main = document.getElementById('home');
  if (!main) return;

  main.insertAdjacentHTML('beforeend', [
    buildHero(),
    buildProof(),
    buildClients(),
    buildWhatWeDo(),
    buildWork(),
    buildTestimonials(),
    buildDinners(),
    buildIndustries(),
    buildTeam(),
    buildContactBand(),
  ].join(''));

  initReveal(main);
  initAnchors(main);
  initNavState();
  initBios(main);
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initHomepage);
