import '../styles/look-2026.css';
import '../styles/home-2026.css';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, textLink, buildContactBand, dinnerFilm, initFilms, initReveal, initAnchors, initNavState,
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
import { caseStudies } from '../../data/case-studies.js';
import { testimonials } from '../../data/testimonials.js';
import { team } from '../../data/team.js';

// Homepage, Oct 2026 look (DESIGN.md). Copy comes from data/site-content.js,
// which holds Eden's "Website Flow (October 2026)" doc verbatim.

const HOME_DIR = '/assets/images/home';

// Hero photo until Ebony's updated sizzle reel arrives (the call,
// 2026-10-22: "that would be like the landing background video"): the New
// York Stock Exchange facade, by Maxim Klimashin on Unsplash
// (https://unsplash.com/photos/1QSXCd0LHVs, Unsplash License, free for
// commercial use, no attribution required). The dark theme uses it edge to
// edge (a wide crop, a tall one for phones); the light theme frames a 3:2
// band of the pediment.
const HERO_IMAGE = {
  base: 'hero-cinema',
  tall: 'hero-cinema-tall',
  framed: 'hero-nyse-wide',
  alt: 'The sculpted pediment and columns of the New York Stock Exchange on Wall Street',
};

// Label over the outlet logos (ours; the doc has none).
const PRESS_LABEL = 'Where our clients appear';

// The outlet logos run as a moving strip under the case studies, bigger than
// the client strip and drifting the other way, so the two never read as one
// (Alkida's Loom, 2026-10-21: "a little bigger and dynamic... move around the
// screen"). Best-known outlets first; every outlet in data/media-logos.js runs.
const PRESS_ORDER = [
  'The Wall Street Journal', 'Bloomberg', 'Financial Times', 'The New York Times',
  'Reuters', 'CNBC', 'Forbes', 'Fortune', 'Axios', 'Business Insider', 'CoinDesk',
  'Fox Business', 'Yahoo Finance', 'The Block', 'The Washington Post', 'CNN',
  'USA Today', 'Blockworks', 'Bloomberg Law', 'CoinTelegraph', 'Inc.',
  'New York Post', 'Cheddar News',
];

// Logo heights tuned by eye on this page so every logo carries the same
// visual weight (heavy marks smaller, light or thin marks larger).
const CLIENT_HEIGHTS = {
  'Ondo Finance': 26, 'Wintermute': 19, 'Reed Smith': 22,
  'Cohen & Company Capital Markets': 30, 'Alpaca': 25, 'LayerZero': 28,
  'Grindr': 19, 'RoboStrategy': 15, 'Rox': 20, 'Jito Labs': 21,
};
// Outlet heights, tuned by eye on the strip so every mark carries the same
// weight (wide wordmarks shorter, compact marks taller).
const PRESS_HEIGHTS = {
  'The Wall Street Journal': 21, 'Bloomberg': 34, 'Financial Times': 21,
  'The New York Times': 26, 'Reuters': 33, 'CNBC': 25, 'Forbes': 29, 'Fortune': 23,
  'Axios': 28, 'Business Insider': 32, 'CoinDesk': 30, 'Fox Business': 35,
  'Yahoo Finance': 24, 'The Block': 22, 'The Washington Post': 25, 'CNN': 30,
  'USA Today': 22, 'Blockworks': 28, 'Bloomberg Law': 25, 'CoinTelegraph': 30,
  'Inc.': 26, 'New York Post': 20, 'Cheddar News': 30,
};

// What we do: one photo per pillar. Desktop shows them one at a time beside
// the list (the tall crop); phones show each above its pillar (the wide crop).
// Position: "Lectern on stage" by Wesley Tingey
// (https://unsplash.com/photos/bWRX_obQAl8); Build market visibility: a
// broadcast camera filming an interview, by Sam McGhee
// (https://unsplash.com/photos/KieCLNzKoBo), both Unsplash License, free for
// commercial use. Open the right doors: Eden's own Wintermute dinner photo.
const PILLAR_IMAGES = ['pillar-position', 'pillar-visibility', 'pillar-doors'];

// Eden clients' own moments, not stock (Alkida's Loom: "These images can
// also be a little bit more interesting"; Joe, 2026-10-22: photos "that try to
// match the frontier technology ringing the bell one"), graded to one warm
// tone. No public bell or broadcast photo exists for a Financial Services or
// Digital Assets client, so these are the clients' own event photos; Eden to
// confirm use with each client before launch. Financial Services: the Ondo
// Summit, "Wall Street 2.0", the room under a tokenized-stock ticker (Ondo's
// summit site, https://summit.ondo.finance, "summit-photo-7", 1780x1040, cut
// to 3:2). Digital Assets: a speaker on the Stellar Development Foundation's
// conference stage (stellar.org/events, Meridian block, 4000x2667). Frontier
// Technology: RoboStrategy, an
// Eden client, ringing the Nasdaq closing bell with a humanoid robot (Oct 13,
// 2026), supplied by Alkida in Eden's shared folder on 2026-10-22
// ("RoboStrategy_Bell.png", Gabby's idea in Alkida's Oct 21 Loom). Eden's
// only copy is 774x422, so the 3:2 crop (633 px) is resized up with Lanczos
// to 1024; ask Eden for the full-size original before launch. Contact band:
// "Sunset in New York City" by Joseph Barrientos (CC0, Wikimedia Commons).
const INDUSTRY_IMAGES = {
  'Financial Services': { base: 'industry-financial-services-ondo-summit', alt: 'Guests at the Ondo Summit under a tokenized-stock ticker and a "Wall Street 2.0" banner' },
  'Digital Assets': { base: 'industry-digital-assets-stellar', alt: 'A speaker on the Stellar conference stage in front of a wall of event photos' },
  'Frontier Technology': { base: 'industry-frontier-robostrategy-bell', alt: 'A humanoid robot ringing the Nasdaq closing bell as the RoboStrategy team cheers' },
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

// The cinematic hero, like the live site's: the photo (later Ebony's video)
// edge to edge, the text at the bottom left; in the dark theme behind a dark
// overlay, in the light theme fading into the paper (Joe, 2026-10-22: "I like
// how you have the background image for the dark version... something like
// that, but in light"). The editorial hero (headline across the page above
// the text and a framed photo) stays behind a build flag while Joe compares
// the two light versions (vite.config.js). Eden's line is one solid color in both (Joe,
// 2026-10-22: the muted half "blends in too well with the background"),
// with the words Alkida highlighted starting their own line.
function heroText() {
  return `
    <p class="hero__deck">${homeHero.positioning.lead} <span class="hero__emphasis">${homeHero.positioning.emphasis}</span></p>
    <p class="hero__body">${homeHero.body}</p>
    <div class="hero__actions">
      <a class="btn btn--primary" href="${homeHero.primaryCta.href}">${homeHero.primaryCta.label} ${ARROW}</a>
      ${textLink(homeHero.secondaryCta.href, homeHero.secondaryCta.label)}
    </div>
  `;
}

function buildHero() {
  if (document.body.classList.contains('hero-editorial')) {
    return `
      <section class="hero hero--editorial" aria-labelledby="hero-title">
        <div class="wrap">
          <h1 id="hero-title" class="t-display hero__title">${homeHero.headline}</h1>
          <div class="hero__grid">
            <div class="hero__text">${heroText()}</div>
            <div class="hero__media">
              ${picture({
                dir: HOME_DIR, base: HERO_IMAGE.framed, widths: [640, 1024, 1600, 2400],
                sizes: '(max-width: 900px) 100vw, (max-width: 1280px) 52vw, 680px',
                alt: HERO_IMAGE.alt, width: 2400, height: 1600, eager: true,
              })}
            </div>
          </div>
        </div>
      </section>
    `;
  }
  return `
    <section class="hero hero--cinema" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true">
        ${picture({
          dir: HOME_DIR, base: HERO_IMAGE.base, widths: [1280, 1920, 2600], sizes: '100vw',
          alt: '', width: 2600, height: 1625, eager: true, fallback: 1600,
          narrow: { media: '(max-width: 900px)', base: HERO_IMAGE.tall, widths: [750, 1200], sizes: '100vw' },
        })}
      </div>
      <div class="wrap hero__inner">
        <h1 id="hero-title" class="t-display hero__title">${homeHero.headline}</h1>
        <div class="hero__text">${heroText()}</div>
      </div>
    </section>
  `;
}

// The numbers, then one strip of client logos under them (Ebony on the
// Oct 9 call: "the performance numbers up across the top, with a scrolling
// logo strip of companies beneath").
function buildProof() {
  // The visible number counts up (initCountUp); screen readers get the final
  // figure once, from the hidden copy.
  const figures = homeProof.map((f, i) => {
    const final = `${f.value.toLocaleString('en-US')}${f.suffix}`;
    return `
    <li class="proof__figure" style="--i: ${i}">
      <span class="proof__value"><span class="proof__count" aria-hidden="true" data-count="${f.value}" data-suffix="${f.suffix}">${final}</span><span class="visually-hidden">${final}</span></span>
      <span class="proof__label">${f.label}</span>
    </li>
  `;
  }).join('');

  const logos = clientStrip
    .map(c => `<li class="marquee__item">${inkLogo(c, CLIENT_HEIGHTS[c.name] || Math.round(c.displayHeight * 0.85))}</li>`)
    .join('');

  return `
    <section class="proof" aria-labelledby="proof-title">
      <div class="wrap">
        <h2 id="proof-title" class="t-label proof__title">${homeHero.tagline}</h2>
        <ul class="proof__figures">${figures}</ul>
        <div class="clients" data-marquee>
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

function pillarPhoto(i, { wide = false, className = '', sizes }) {
  return picture({
    dir: HOME_DIR, base: `${PILLAR_IMAGES[i]}${wide ? '-wide' : ''}`, widths: [640, 1024, 1600], sizes,
    width: 1600, height: wide ? 1067 : 2000, alt: '', className,
  });
}

// The pillars as a list beside one large photo. On desktop the photo follows
// the pillar under the pointer and otherwise steps through all three, with a
// line filling along the active pillar to show the timing (initPillars).
// Phones get each photo above its pillar and no stepping.
function buildWhatWeDo() {
  const pillars = homeWhatWeDo.pillars.map((p, i) => `
    <li class="pillar${i === 0 ? ' is-active' : ''}" data-reveal style="--i: ${i}">
      <span class="pillar__rule" aria-hidden="true"><span class="pillar__progress"></span></span>
      ${pillarPhoto(i, { wide: true, className: 'pillar__photo', sizes: '(max-width: 900px) 100vw, 1px' })}
      <span class="pillar__num">${p.number}</span>
      <h3 class="t-h3 pillar__title">${p.title}</h3>
      <p class="pillar__text">${p.text}</p>
    </li>
  `).join('');

  const stage = PILLAR_IMAGES.map((_, i) => pillarPhoto(i, {
    className: `pillars__img${i === 0 ? ' is-active' : ''}`, sizes: '(max-width: 900px) 1px, 46vw',
  })).join('');

  return `
    <section class="what" aria-labelledby="what-title">
      <div class="wrap">
        <p class="t-label t-label--dot sec-label" data-reveal>${homeWhatWeDo.sectionLabel}</p>
        <div class="what__head">
          <h2 id="what-title" class="t-h2 what__title" data-reveal>${homeWhatWeDo.headline}</h2>
          <p class="what__body" data-reveal style="--i: 1">${homeWhatWeDo.body}</p>
        </div>
        <div class="what__pillars">
          <ol class="pillars">${pillars}</ol>
          <div class="pillars__stage" data-reveal style="--i: 1">
            <div class="pillars__media" aria-hidden="true">${stage}</div>
            <button class="marquee__toggle pillars__toggle" type="button" aria-pressed="false" aria-label="Pause the rotating photos">
              <svg class="marquee__icon marquee__icon--pause" viewBox="0 0 14 14" aria-hidden="true"><rect x="3" y="2" width="2.5" height="10"/><rect x="8.5" y="2" width="2.5" height="10"/></svg>
              <svg class="marquee__icon marquee__icon--play" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10l8-5z"/></svg>
            </button>
          </div>
        </div>
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

  // The outlet strip closes the section: the case results, then where clients ran.
  const press = PRESS_ORDER
    .map(name => mediaLogos.find(l => l.name === name))
    .filter(Boolean)
    .map(l => `<li class="marquee__item">${inkLogo(l, PRESS_HEIGHTS[l.name] || 26)}</li>`)
    .join('');

  return `
    <section class="work" aria-labelledby="work-title">
      <div class="wrap">
        <div class="sec-head">
          <h2 id="work-title" class="t-label t-label--dot">Selected work</h2>
          ${textLink('/results', 'View all work')}
        </div>
        <ul class="work__grid">${cards}</ul>
        <div class="press" data-marquee>
          <div class="press__head">
            <h3 class="t-label">${PRESS_LABEL}</h3>
            <button class="marquee__toggle" type="button" aria-pressed="false" aria-label="Pause the outlet logos">
              <svg class="marquee__icon marquee__icon--pause" viewBox="0 0 14 14" aria-hidden="true"><rect x="3" y="2" width="2.5" height="10"/><rect x="8.5" y="2" width="2.5" height="10"/></svg>
              <svg class="marquee__icon marquee__icon--play" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10l8-5z"/></svg>
            </button>
          </div>
          <div class="marquee marquee--press" data-speed="28">
            <ul class="marquee__track">${press}</ul>
            <ul class="marquee__track" aria-hidden="true">${press}</ul>
          </div>
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

// The dinner recap film takes the place of the photo grid (Alkida's Loom,
// 2026-10-21: "we could maybe even actually insert a video of the dinner
// here"), on a dark band so it plays like a screening.
function buildDinners() {
  return `
    <section class="dinners on-dark" aria-labelledby="dinners-title">
      <div class="wrap">
        <div class="dinners__head">
          <div class="dinners__intro">
            <p class="t-label t-label--dot" data-reveal>${homeDinners.sectionLabel}</p>
            <h2 id="dinners-title" class="t-h2" data-reveal>${homeDinners.headline}</h2>
          </div>
          <div class="dinners__copy">
            ${homeDinners.paragraphs.map((p, i) => `<p class="dinners__para" data-reveal style="--i: ${i + 1}">${p}</p>`).join('')}
            <div data-reveal style="--i: 3">${textLink(homeDinners.cta.href, homeDinners.cta.label)}</div>
          </div>
        </div>
        <div data-reveal>${dinnerFilm()}</div>
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
        <h2 id="industries-title" class="t-label t-label--dot sec-label">${homeIndustries.sectionLabel}</h2>
        <ul class="industries__grid">${items}</ul>
      </div>
    </section>
  `;
}

// Back on the homepage at Alkida's request (Loom, 2026-10-21), as a carousel
// (call, 2026-10-22: "the carousel that then leads to like everyone's bio...
// it doesn't really look good when it's displayed stagnantly"). About two and
// a half portraits show at a time so it slides even with three people; it
// swipes, scrolls sideways and steps with the arrows (initTeamCarousel). Each
// card opens that person's bio. Alkida and Joseph join when their headshots
// arrive.
const ARROW_LEFT = '<span aria-hidden="true">←</span>';
const ARROW_RIGHT = '<span aria-hidden="true">→</span>';

function buildTeam() {
  const members = team.map((m, i) => `
    <li class="member">
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
      <div class="wrap team__grid">
        <div class="team__head">
          <h2 id="team-title" class="t-h2" data-reveal>${teamHeading.headline}</h2>
          <div class="team__links" data-reveal style="--i: 1">
            ${textLink('/about', 'Meet the full team')}
            <div class="team__arrows">
              <button class="team__arrow" type="button" data-step="-1" aria-controls="team-track" aria-label="Previous people">${ARROW_LEFT}</button>
              <button class="team__arrow" type="button" data-step="1" aria-controls="team-track" aria-label="Next people">${ARROW_RIGHT}</button>
            </div>
          </div>
        </div>
        <ul class="team__list" id="team-track" aria-label="Team" data-lenis-prevent-wheel data-reveal style="--i: 1">${members}</ul>
      </div>
      <dialog class="bio-dialog" aria-labelledby="bio-name" data-lenis-prevent>
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

// The logo strips scroll on their own; each button stops and restarts its
// strip (moving content needs a pause control). Its label stays fixed and
// aria-pressed says whether it's paused; the icon swaps to play. A strip also
// rests while it's off screen or the tab is hidden. A strip with data-speed
// (px per second) gets its loop time from its own width, so it moves at that
// speed at every screen size. Reduced motion shows the strips still.
function initMarquee(root) {
  root.querySelectorAll('[data-marquee]').forEach(box => {
    const toggle = box.querySelector('.marquee__toggle');
    const marquee = box.querySelector('.marquee');
    if (!toggle || !marquee) return;
    toggle.addEventListener('click', () => {
      const paused = marquee.classList.toggle('is-paused');
      toggle.setAttribute('aria-pressed', String(paused));
    });

    const speed = Number(marquee.dataset.speed);
    const track = marquee.querySelector('.marquee__track');
    if (speed && track && 'ResizeObserver' in window) {
      new ResizeObserver(() => {
        marquee.style.setProperty('--marquee-dur', `${Math.round(track.offsetWidth / speed)}s`);
      }).observe(track);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        marquee.classList.toggle('is-offscreen', !entry.isIntersecting);
      }).observe(marquee);
    }
  });
  document.addEventListener('visibilitychange', () => {
    root.querySelectorAll('.marquee').forEach(m => m.classList.toggle('is-hidden-tab', document.hidden));
  });
}

// Each figure counts up from zero the first time it scrolls into view, easing
// out so it settles on the real number. Reduced motion shows the numbers as is.
function initCountUp(root) {
  const counts = root.querySelectorAll('[data-count]');
  if (!counts.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const DURATION = 1600;
  const ease = t => 1 - Math.pow(1 - t, 4);
  const show = (el, n) => { el.textContent = `${n.toLocaleString('en-US')}${el.dataset.suffix}`; };
  const run = (el, delay) => {
    const target = Number(el.dataset.count);
    let start = null;
    const step = (now) => {
      if (start === null) start = now + delay;
      const t = Math.min(1, Math.max(0, (now - start) / DURATION));
      show(el, Math.round(target * ease(t)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  counts.forEach(el => show(el, 0));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const i = [...counts].indexOf(entry.target);
      run(entry.target, i * 120);
    });
  }, { threshold: 0.5 });
  counts.forEach(el => io.observe(el));
}

// What we do: on desktop the large photo shows the active pillar. Pointing at
// a pillar shows its photo and stops the stepping; otherwise it steps every
// few seconds while the section is on screen. The button pauses and resumes
// the stepping. Phones and reduced motion: no stepping.
function initPillars(root) {
  const section = root.querySelector('.what__pillars');
  if (!section) return;
  const items = [...section.querySelectorAll('.pillar')];
  const photos = [...section.querySelectorAll('.pillars__img')];
  const toggle = section.querySelector('.pillars__toggle');
  if (!items.length || photos.length !== items.length) return;

  // 4s a step (Joe, 2026-10-22: 6s "seemed to move a little bit too slow").
  // The fill line reads the same value.
  const STEP = 4000;
  const desktop = window.matchMedia('(min-width: 901px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let timer = null;
  let inView = false;
  let stopped = reduce.matches;

  const show = (i) => {
    active = i;
    items.forEach((el, k) => el.classList.toggle('is-active', k === i));
    photos.forEach((el, k) => el.classList.toggle('is-active', k === i));
  };

  const schedule = () => {
    clearTimeout(timer);
    const cycling = !stopped && inView && desktop.matches;
    // Restart the fill line from empty on every step.
    section.classList.remove('is-cycling');
    if (!cycling) return;
    void section.offsetWidth;
    section.classList.add('is-cycling');
    timer = setTimeout(() => { show((active + 1) % items.length); schedule(); }, STEP);
  };

  const stop = () => {
    stopped = true;
    toggle.setAttribute('aria-pressed', 'true');
    schedule();
  };

  items.forEach((el, i) => {
    el.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || !desktop.matches) return;
      show(i);
      if (!stopped) stop();
    });
  });

  toggle.addEventListener('click', () => {
    stopped = !stopped;
    toggle.setAttribute('aria-pressed', String(stopped));
    schedule();
  });

  section.style.setProperty('--pillar-step', `${STEP}ms`);
  if (stopped) toggle.setAttribute('aria-pressed', 'true');
  desktop.addEventListener('change', schedule);
  // Reduced motion switched on mid-visit stops the stepping for good.
  reduce.addEventListener('change', () => { if (reduce.matches) stop(); });
  if (!('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    schedule();
  }, { threshold: 0.35 }).observe(section);
}

// Team carousel: the arrows step one portrait at a time and switch off at
// either end; with nothing to scroll (wide screens, few people) they hide.
// Swipe and sideways scrolling are the browser's own, snapping to a portrait.
function initTeamCarousel(root) {
  const track = root.querySelector('.team__list');
  const arrows = [...root.querySelectorAll('.team__arrow')];
  const box = root.querySelector('.team__arrows');
  if (!track || arrows.length !== 2) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const step = () => {
    const card = track.querySelector('.member');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    box.hidden = max <= 2;
    arrows[0].disabled = track.scrollLeft <= 2;
    arrows[1].disabled = track.scrollLeft >= max - 2;
  };

  arrows.forEach(btn => btn.addEventListener('click', () => {
    track.scrollBy({ left: Number(btn.dataset.step) * step(), behavior: reduce.matches ? 'auto' : 'smooth' });
  }));
  // A card that takes keyboard focus slides fully into view.
  track.addEventListener('focusin', (e) => {
    const card = e.target.closest('.member');
    if (!card) return;
    const c = card.getBoundingClientRect();
    const t = track.getBoundingClientRect();
    const shift = c.left < t.left ? c.left - t.left : c.right > t.right ? c.right - t.right : 0;
    if (shift) track.scrollBy({ left: shift, behavior: reduce.matches ? 'auto' : 'smooth' });
  });
  track.addEventListener('scroll', update, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
  update();
}

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
    buildWhatWeDo(),
    buildWork(),
    buildTestimonials(),
    // Industries sit right under the client quotes: the repositioning is the
    // point of the rebrand (Alkida's Loom, 2026-10-21).
    buildIndustries(),
    buildDinners(),
    buildTeam(),
    buildContactBand(),
  ].join(''));

  initReveal(main);
  initAnchors(main);
  initNavState();
  initMarquee(main);
  initCountUp(main);
  initPillars(main);
  initFilms(main);
  initTeamCarousel(main);
  initBios(main);
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initHomepage);
