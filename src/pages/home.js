import '../styles/look-2026.css';
import '../styles/home-2026.css';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, textLink, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import {
  homeHero,
  homeProof,
  homeClientsLabel,
  homeWhatWeDo,
  homeDinners,
  homeIndustries,
} from '../../data/site-content.js';
import { clientStrip } from '../../data/clients.js';
import { mediaLogos } from '../../data/media-logos.js';
import { caseStudies } from '../../data/case-studies.js';
import { testimonials } from '../../data/testimonials.js';

// Homepage, Oct 2026 look (DESIGN.md). Copy comes from data/site-content.js,
// which holds Eden's "Website Flow (October 2026)" doc verbatim.

const DINNER_DIR = '/assets/images/dinners';
const HOME_DIR = '/assets/images/home';

// Hero photo until Ebony's video arrives (the frame takes a video as is):
// the New York Stock Exchange facade, by Maxim Klimashin on Unsplash
// (https://unsplash.com/photos/1QSXCd0LHVs, Unsplash License, free for
// commercial use, no attribution required). Cropped to 4:5.
const HERO_IMAGE = {
  base: 'hero-financial-district',
  alt: 'The columns and sculpted pediment of the New York Stock Exchange on Wall Street',
};

// Label over the outlet logos (ours; the doc has none).
const PRESS_LABEL = 'Where our clients appear';

// The outlet row sits with the client quotes, away from the client logos,
// so no two logo rows meet. It shows the eight best-known outlets; all of
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
  'The Wall Street Journal': 13, 'Bloomberg': 23, 'Financial Times': 13,
  'The New York Times': 17, 'Reuters': 22, 'CNBC': 16, 'Forbes': 18, 'Fortune': 15,
};

// Stock photos, all in color and graded to one warm tone. Financial Services:
// "Golden hour illuminates classical architecture with columns" by Nhan Hoang
// (https://unsplash.com/photos/aKioE8ayPZs), cut below the sculpted frieze;
// Digital Assets: "Screen showing bitcoin trading chart" by Nick Chong
// (https://unsplash.com/photos/N__BnvQ_w18), cut to the candles and the
// BTCUSD tag so the dated 2020 price stays out of frame, saturation and
// contrast lifted (Joe, 2026-10-21: it read faded); both Unsplash
// License, free for commercial use. Frontier Technology: NASA ISS photo
// iss075e0099858 (public domain, Wikimedia Commons), brightened twice (Joe,
// 2026-10-21); contact band:
// "Sunset in New York City" by Joseph Barrientos (CC0, Wikimedia Commons).
const INDUSTRY_IMAGES = {
  'Financial Services': { base: 'industry-financial-services', alt: 'Classical columns under a stone cornice, lit by golden evening sun' },
  'Digital Assets': { base: 'industry-digital-assets', alt: 'A bitcoin-to-dollar candlestick chart on a trading screen' },
  'Frontier Technology': { base: 'industry-frontier-technology', alt: 'City lights across the Midwest at night, seen from the International Space Station' },
};

// Homepage crops of each case study photo: 16:9, cut inside the broadcast
// frame so no channel logo or news bar is sliced, and wide enough to stay
// sharp on retina screens. Ondo: a 50/50 split rebuilt from the Squawk Box
// frame Eden already uses (ondo-cnbc-squawk-box.jpg, the only copy found):
// Andrew Ross Sorkin left, the Ondo guest right, each box cropped so both heads
// are the same size (Joe, 2026-10-21), resized up with Lanczos. Real frame, no
// generated faces. Stellar: the full-size CNBC still of
// the same Dixon photo Eden uses (image.cnbcfm.com 107399355-0410_Dixon_ISO,
// 1920x1080). Grip: Eden's full-size team photo from its Webflow CDN.
const CASE_IMAGES = {
  'ondo': { base: 'case-ondo', width: 1200, height: 675 },
  'stellar-development-foundation': { base: 'case-stellar', width: 1060, height: 596 },
  'grip-shipping': { base: 'case-grip', width: 1177, height: 662 },
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
      <div class="wrap hero__grid">
        <div class="hero__text">
          <p class="t-label hero__eyebrow">${homeHero.eyebrow}</p>
          <h1 id="hero-title" class="t-display hero__title">${homeHero.headline}</h1>
          <p class="t-lead hero__body">${homeHero.body}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="${homeHero.primaryCta.href}">${homeHero.primaryCta.label} ${ARROW}</a>
            <a class="btn btn--secondary" href="${homeHero.secondaryCta.href}">${homeHero.secondaryCta.label}</a>
          </div>
        </div>
        <div class="hero__media">
          ${picture({
            dir: HOME_DIR,
            base: HERO_IMAGE.base,
            widths: [640, 1024, 1600],
            sizes: '(max-width: 900px) 100vw, 46vw',
            alt: HERO_IMAGE.alt,
            width: 1600,
            height: 2000,
            eager: true,
          })}
        </div>
      </div>
    </section>
  `;
}

// The numbers, then one strip of client logos under them (Ebony on the
// Oct 9 call: "the performance numbers up across the top, with a scrolling
// logo strip of companies beneath").
function buildProof() {
  const figures = homeProof.map(f => `
    <li class="proof__figure">
      <span class="proof__value">${f.value.toLocaleString('en-US')}${f.suffix}</span>
      <span class="proof__label">${f.label}</span>
    </li>
  `).join('');

  const logos = clientStrip
    .map(c => `<li class="marquee__item">${inkLogo(c, CLIENT_HEIGHTS[c.name] || Math.round(c.displayHeight * 0.85))}</li>`)
    .join('');

  return `
    <section class="proof" aria-labelledby="proof-title">
      <div class="wrap">
        <h2 id="proof-title" class="t-label proof__title">${homeHero.tagline}</h2>
        <ul class="proof__figures">${figures}</ul>
        <div class="clients">
          <div class="clients__head">
            <h2 class="t-label">${homeClientsLabel}</h2>
            <button class="marquee__toggle" type="button" aria-pressed="false" aria-label="Pause the logo strip">
              <svg class="marquee__icon marquee__icon--pause" viewBox="0 0 14 14" aria-hidden="true"><rect x="3" y="2" width="2.5" height="10"/><rect x="8.5" y="2" width="2.5" height="10"/></svg>
              <svg class="marquee__icon marquee__icon--play" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10l8-5z"/></svg>
            </button>
          </div>
          <div class="marquee">
            <ul class="marquee__track">${logos}</ul>
            <ul class="marquee__track" aria-hidden="true">${logos}</ul>
          </div>
        </div>
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
  const cards = featured.map((cs, i) => {
    const caseImg = CASE_IMAGES[cs.slug];
    return `
    <li class="case" data-reveal style="--i: ${i}">
      <div class="case__media">
        ${caseImg ? `
          <picture>
            <source type="image/webp" srcset="${HOME_DIR}/${caseImg.base}.webp">
            <img src="${HOME_DIR}/${caseImg.base}.jpg" alt="" width="${caseImg.width}" height="${caseImg.height}" loading="lazy" decoding="async">
          </picture>
        ` : `<img src="${cs.heroImage}" alt="" width="1200" height="800" loading="lazy" decoding="async">`}
      </div>
      <p class="t-label case__client">${clientName(cs)}</p>
      <h3 class="t-card case__title"><a class="case__link" href="/case-studies/${cs.slug}">${cs.cardTitle || cs.subtitle}</a></h3>
      <dl class="case__metrics">
        ${(cs.metrics || []).slice(0, 3).map(m => `
          <div class="case__metric"><dt>${m.label}</dt><dd>${m.number}</dd></div>
        `).join('')}
      </dl>
      <span class="text-link case__more" aria-hidden="true"><span class="text-link__label">View case study</span>${ARROW}</span>
    </li>
  `;
  }).join('');

  // The press row closes the section: the case results, then where clients ran.
  const press = PRESS_PICKS
    .map(name => mediaLogos.find(l => l.name === name))
    .filter(Boolean)
    .map(l => `<li class="press__item">${inkLogo(l, PRESS_HEIGHTS[l.name] || 20)}</li>`)
    .join('');

  return `
    <section class="work" aria-labelledby="work-title">
      <div class="wrap">
        <div class="sec-head">
          <h2 id="work-title" class="t-label">Selected work</h2>
          ${textLink('/results', 'View all work')}
        </div>
        <ul class="work__grid">${cards}</ul>
        <div class="press">
          <h3 class="t-label press__label">${PRESS_LABEL}</h3>
          <ul class="press__list">${press}</ul>
        </div>
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
        <span class="quote__role">${t.title}, ${t.company.replace(/ /g, '&nbsp;')}</span>
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
            // A guest, not the empty table (it read as the wide photo's table
            // without people), and not Ebony, who is already in the next photo:
            // her in two of three read too founder-focused (Joe, 2026-10-21).
            // A closer crop of guest-smiling so she, not the heads in front, leads.
            dir: DINNER_DIR, base: 'wintermute-dinner-guest-smiling-close', widths: [640, 1024],
            sizes: '(max-width: 900px) 50vw, 25vw', width: 1024, height: 1434, className: 'dinners__photo',
            alt: 'A guest smiling across the table at dinner',
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
          width: 1600, height: 1067, alt: img.alt, className: 'industry__photo',
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

// ─── Behaviour ────────────────────────────────────────────────────────────

// The client strip scrolls on its own; the button stops and restarts it
// (moving content needs a pause control). Its label stays "Pause the logo
// strip" and aria-pressed says whether it's paused; the icon swaps to play.
// Reduced motion shows the strip still.
function initMarquee(root) {
  const toggle = root.querySelector('.marquee__toggle');
  const marquee = root.querySelector('.marquee');
  if (!toggle || !marquee) return;
  toggle.addEventListener('click', () => {
    const paused = marquee.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────

function initHomepage() {
  const main = document.getElementById('home');
  if (!main) return;

  main.insertAdjacentHTML('beforeend', [
    buildHero(),
    buildProof(),
    buildWhatWeDo(),
    buildWork(),
    buildTestimonials(),
    buildDinners(),
    buildIndustries(),
    buildContactBand(),
  ].join(''));

  initReveal(main);
  initAnchors(main);
  initNavState();
  initMarquee(main);
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initHomepage);
