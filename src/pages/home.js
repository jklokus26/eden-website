import '../styles/look-2026.css';
import '../styles/home-2026.css';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, picture, textLink, buildContactBand, dinnerFilm, initFilms, initReveal, initAnchors, initNavState,
  memberCard, bioDialog, initBios,
} from '../components/look-2026.js';
import { sectionHead, initKit } from '../components/eden-kit.js';
import { heroTicker, initBold } from '../components/eden-bold.js';
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
import { mediaLogos, PRESS_HEIGHTS } from '../../data/media-logos.js';
import { caseStudies, CASE_CARD_IMAGES, silviaStory } from '../../data/case-studies.js';
import { services } from '../../data/services.js';
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
// Outlet heights for the press strip: PRESS_HEIGHTS in data/media-logos.js
// (shared with Recent Work).

// Real moments, a client's where Eden has one (Alkida's Loom: "These images can
// also be a little bit more interesting"; Joe, 2026-10-22: photos "that try to
// match the frontier technology ringing the bell one"), graded to one warm
// tone. No public bell or broadcast photo exists for a Financial Services or
// Digital Assets client. Financial Services: the NYSE trading floor, a
// public-domain photo by Carol M. Highsmith (Library of Congress,
// LCCN2011634218, via Wikimedia Commons, 2388x1598, lifted slightly), until
// Eden sends a moment from one of its own finance clients. It replaced an
// Ondo Summit panel because Ondo is a digital assets company (Joe,
// 2026-10-23: "if anything, is even closer to digital assets"). Digital
// Assets: the client's own event photo, Eden to confirm use before launch: a
// speaker on the Stellar Development Foundation's
// conference stage (stellar.org/events, Meridian block, 4000x2667). Frontier
// Technology: RoboStrategy, an
// Eden client, ringing the Nasdaq closing bell with a humanoid robot (Oct 13,
// 2026), supplied by Alkida in Eden's shared folder on 2026-10-22
// ("RoboStrategy_Bell.png", Gabby's idea in Alkida's Oct 21 Loom). Eden's
// only copy is 774x422, so the 3:2 crop (633 px) is resized up with Lanczos
// to 1024; ask Eden for the full-size original before launch. Contact band:
// "Sunset in New York City" by Joseph Barrientos (CC0, Wikimedia Commons).
const INDUSTRY_IMAGES = {
  'Financial Services': { base: 'industry-financial-services-nyse-floor', alt: 'Traders at work on the New York Stock Exchange trading floor under an NYSE banner' },
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
// 1920x1080). Grip: Eden's full-size team photo from its Webflow CDN. The
// files are listed in CASE_CARD_IMAGES (data/case-studies.js), shared with
// Our Results and the case study pages.

// ─── Helpers ──────────────────────────────────────────────────────────────

function inkLogo({ name, logo, ratio }, height) {
  return `<span class="ink-logo" role="img" aria-label="${name}" style="--src: url('${logo}'); --r: ${ratio}; --h: ${height}px"></span>`;
}

function clientName(cs) {
  return cs.title.replace(/^Case Study:\s*/i, '');
}

// ─── Sections ─────────────────────────────────────────────────────────────

// The cinematic hero, like the live site's: the photo (later Ebony's video)
// edge to edge behind a dark overlay, the text at the bottom left. The kit
// carries in lightly: the headline's words rise once as the page opens (a
// short line above it read as an afterthought, Joe, 2026-10-28). Eden's
// line is one solid color (Joe, 2026-10-22: the muted half "blends in too
// well with the background"), with the words Alkida highlighted starting
// their own line.
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
  return `
    <section class="hero hero--cinema" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true">
        ${picture({
          dir: HOME_DIR, base: HERO_IMAGE.base, widths: [1280, 1920, 2600, 3600], sizes: '100vw',
          alt: '', width: 2600, height: 1625, eager: true, fallback: 1600,
          narrow: { media: '(max-width: 900px)', base: HERO_IMAGE.tall, widths: [750, 1200], sizes: '100vw' },
        })}
      </div>
      <div class="wrap hero__inner">
        <h1 id="hero-title" class="t-display hero__title" data-rise>${homeHero.headline}</h1>
        <div class="hero__text">${heroText()}</div>
      </div>
      ${heroTicker()}
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
        ${sectionHead({ label: homeHero.tagline, labelId: 'proof-title' })}
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

// A split: the header, the headline and the body in the left columns; the
// headline is the section's one big statement, filled from grey to white as
// the reader scrolls through it (the kit's lede). The three pillars run as an
// index in the right columns: each row is the pillar's title as written with
// a period, its short list, and an arrow, and the whole row links to the
// practice area on the Services page that delivers it (Position ->
// #strategic-counsel, Build market visibility -> #earned-media, Open the
// right doors -> #executive-visibility). On hover the row inverts under the
// kit's ink box and the signature line marks it.
function buildWhatWeDo() {
  const rows = homeWhatWeDo.pillars.map((p, i) => `
    <li data-reveal style="--i: ${i}">
      <a class="what__row" href="/services#${services[i].anchorId}" data-ink>
        <h3 class="what__line">${p.title}.</h3>
        <p class="what__note">${p.text}</p>
        ${ARROW}
        <span class="sig-mark" aria-hidden="true"></span>
      </a>
    </li>
  `).join('');

  return `
    <section class="what" aria-labelledby="what-title">
      <div class="wrap what__split">
        <div class="what__lead">
          ${sectionHead({
            label: homeWhatWeDo.sectionLabel,
            title: homeWhatWeDo.headline,
            titleId: 'what-title',
            titleClass: 'what__lede kit-lede',
          })}
          <p class="what__body" data-reveal>${homeWhatWeDo.body}</p>
        </div>
        <ul class="what__index">${rows}</ul>
      </div>
    </section>
  `;
}

// A hyphenated word never breaks at its hyphen ("AI-driven", "Sign-ups").
function keepHyphens(text) {
  return text.replace(/\S+-\S+/g, w => `<span class="story__keep">${w}</span>`);
}

// Selected work as a compact spread: the first case is the lead story (its
// photo beside its headline, figures and plate), the other two run side by
// side under it as shorter entries. Every figure is set the same way.
// Homepage only: Our Results and the case study pages keep
// the shared caseCard. The whole entry is the link, as on the case cards; the
// headline is underlined at rest so it reads as one without a pointer. Each
// case closes on a data plate (Room & Pillar's): its service and industries
// from the case study data as small label rows over dashed hairlines. The
// lead story ends on "View case study", which takes the kit's ink box when
// the entry is hovered.
function workStory({ href, client, title, image, alt = '', metrics = [], note = '', more = 'View case study', service = '', industry = '' }, i) {
  const lead = i === 0;
  const media = image
    ? `<div class="story__media">
        <picture>
          ${image.webp ? `<source type="image/webp" srcset="${image.webp}">` : ''}
          <img src="${image.src}" alt="${alt}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async">
        </picture>
      </div>`
    : '';
  // A case without figures yet (Silvia) shows its note, if any, in their place.
  const facts = metrics.length
    ? `<dl class="story__figures">
        ${metrics.slice(0, 3).map(m => `<div class="story__figure"><dt>${keepHyphens(m.label)}</dt><dd>${m.number}</dd></div>`).join('')}
      </dl>`
    : note ? `<p class="story__note">${note}</p>` : '';
  // Labels as on the case study pages (Service, Industry).
  const rows = [['Service', service], ['Industry', industry]].filter(([, value]) => value);
  const plate = rows.length
    ? `<dl class="plate">
        ${rows.map(([label, value]) => `<div class="plate__row"><dt>${label}</dt><dd>${value}</dd></div>`).join('')}
      </dl>`
    : '';
  return `
    <li class="story${lead ? ' story--lead' : ''}" data-reveal data-ink-owner style="--i: ${i}">
      ${media}
      <p class="t-label story__client">${client}</p>
      <h3 class="story__title"><a class="story__link" href="${href}">${keepHyphens(title)}</a></h3>
      ${facts}
      ${plate}
      ${lead ? `<span class="text-link story__more" aria-hidden="true"><span class="text-link__label">${more}</span>${ARROW}</span>` : ''}
    </li>
  `;
}

function buildWork() {
  const featured = caseStudies.filter(cs => cs.featured).map(cs => ({
    href: `/case-studies/${cs.slug}`,
    client: clientName(cs),
    title: cs.cardTitle || cs.subtitle,
    image: CASE_CARD_IMAGES[cs.slug],
    metrics: cs.metrics || [],
    service: cs.service,
    industry: cs.industries,
  }));
  // Silvia's card takes the second spot, Grip's, once it has figures (see
  // silviaStory in data/case-studies.js).
  if (silviaStory.metrics?.length) featured.splice(1, 1, silviaStory);
  const stories = featured.slice(0, 3).map(workStory).join('');

  // The outlet strip closes the section: the case results, then where clients ran.
  const press = PRESS_ORDER
    .map(name => mediaLogos.find(l => l.name === name))
    .filter(Boolean)
    .map(l => `<li class="marquee__item">${inkLogo(l, PRESS_HEIGHTS[l.name] || 26)}</li>`)
    .join('');

  return `
    <section class="work" aria-labelledby="work-title">
      <div class="wrap">
        ${sectionHead({ label: 'Selected work', labelId: 'work-title', action: textLink('/results', 'View all work') })}
        <ul class="work__spread">${stories}</ul>
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

// Each quote has the signature line beside it as a vertical bar
// (Cognichip's quote bar), drawn top to bottom as it arrives.
function buildTestimonials() {
  const quotes = testimonials.map((t, i) => `
    <figure class="quote" data-reveal style="--i: ${i}">
      <blockquote class="quote__text"><span class="sig sig--down" aria-hidden="true"></span><p>${t.quote}</p></blockquote>
      <figcaption class="quote__by">
        <span class="quote__name">${t.name}</span>
        <span class="quote__role">${t.title}, ${t.company.replace(/ /g, '&nbsp;')}</span>
      </figcaption>
    </figure>
  `).join('');

  return `
    <section class="quotes" aria-labelledby="quotes-title">
      <div class="wrap">
        ${sectionHead({ label: 'What clients say', labelId: 'quotes-title' })}
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
        ${sectionHead({ label: homeDinners.sectionLabel })}
        <div class="dinners__head">
          <div class="dinners__intro">
            <h2 id="dinners-title" class="t-h2" data-rise>${homeDinners.headline}</h2>
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
        ${sectionHead({ label: homeIndustries.sectionLabel, labelId: 'industries-title' })}
        <ul class="industries__grid">${items}</ul>
      </div>
    </section>
  `;
}

// Back on the homepage at Alkida's request (Loom, 2026-10-21), as a carousel
// (call, 2026-10-22: "the carousel that then leads to like everyone's bio...
// it doesn't really look good when it's displayed stagnantly"). Whole
// portraits only, two at a time (one on phones), so it slides even with three
// people without cutting anyone off (Alkida, 2026-10-29: it "cuts off right
// at Gabby's face... allowing users to swipe through the team members"). It
// swipes, drags with a mouse, scrolls sideways and steps with the arrows, and
// a line under it shows where you are (initTeamCarousel). Each card opens
// that person's bio. Alkida and Joseph join when their headshots
// arrive. The heading is the kit's label ("The team"), so the section opens
// like every other.
const ARROW_LEFT = '<span aria-hidden="true">←</span>';
const ARROW_RIGHT = '<span aria-hidden="true">→</span>';

function buildTeam() {
  const members = team.map(memberCard).join('');

  return `
    <section class="team" aria-labelledby="team-title">
      <div class="wrap">
        ${sectionHead({ label: teamHeading.headline, labelId: 'team-title' })}
        <div class="team__grid">
          <div class="team__head">
            <div class="team__links" data-reveal>
              ${textLink('/about', 'Meet the full team')}
              <div class="team__arrows">
                <button class="team__arrow" type="button" data-step="-1" aria-controls="team-track" aria-label="Previous people">${ARROW_LEFT}</button>
                <button class="team__arrow" type="button" data-step="1" aria-controls="team-track" aria-label="Next people">${ARROW_RIGHT}</button>
              </div>
            </div>
          </div>
          <div class="team__track" data-reveal style="--i: 1">
            <ul class="team__list" id="team-track" aria-label="Team">${members}</ul>
            <div class="team__progress" aria-hidden="true"><span class="team__progress-thumb"><span class="team__progress-ink"></span></span></div>
          </div>
        </div>
      </div>
      ${bioDialog()}
    </section>
  `;
}

// ─── Behaviour ────────────────────────────────────────────────────────────

// The logo strips scroll on their own; each button stops and restarts its
// strip (moving content needs a pause control). Its label stays fixed and
// aria-pressed says whether it's paused; the icon swaps to play. A strip also
// rests while it's off screen or the tab is hidden. A strip with data-speed
// (px per second) gets its loop time from its own width, so it moves at that
// speed at every screen size (data-speed-narrow, if set, on phones). Reduced
// motion shows the strips still.
function initMarquee(root) {
  const narrow = window.matchMedia('(max-width: 640px)');
  root.querySelectorAll('[data-marquee]').forEach(box => {
    const toggle = box.querySelector('.marquee__toggle');
    const marquee = box.querySelector('.marquee');
    if (!toggle || !marquee) return;
    toggle.addEventListener('click', () => {
      const paused = marquee.classList.toggle('is-paused');
      toggle.setAttribute('aria-pressed', String(paused));
    });

    const speed = () => Number((narrow.matches && marquee.dataset.speedNarrow) || marquee.dataset.speed);
    const track = marquee.querySelector('.marquee__track');
    if (speed() && track && 'ResizeObserver' in window) {
      new ResizeObserver(() => {
        marquee.style.setProperty('--marquee-dur', `${Math.round(track.offsetWidth / speed())}s`);
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

// Team carousel: the arrows step one portrait at a time and switch off at
// either end; with nothing to scroll (wide screens, few people) they hide.
// Swipe and sideways scrolling are the browser's own, snapping to a portrait.
// A mouse can drag it too: the track follows the pointer one to one, and on
// release a quick throw moves on a portrait in its direction while a slow
// one settles on the nearest portrait (a drag that moved doesn't open
// a bio). The line under it shows how much is in view and where.
// The line is a scrubber too: press anywhere on it to jump there, or drag
// it, and the track follows (Joe, 2026-10-29: "click on it and like drag it
// to scroll"); on release it settles on the nearest portrait.
function initTeamCarousel(root) {
  const track = root.querySelector('.team__list');
  const arrows = [...root.querySelectorAll('.team__arrow')];
  const box = root.querySelector('.team__arrows');
  const progress = root.querySelector('.team__progress');
  const thumb = progress && progress.querySelector('.team__progress-thumb');
  if (!track || arrows.length !== 2) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = () => (reduce.matches ? 'auto' : 'smooth');

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
    if (thumb) {
      progress.hidden = max <= 2;
      thumb.style.width = `${(track.clientWidth / track.scrollWidth) * 100}%`;
      thumb.style.transform = `translateX(${(track.scrollLeft / track.clientWidth) * 100}%)`;
    }
  };

  arrows.forEach(btn => btn.addEventListener('click', () => {
    track.scrollBy({ left: Number(btn.dataset.step) * step(), behavior: behavior() });
  }));
  // A card that takes keyboard focus slides fully into view.
  track.addEventListener('focusin', (e) => {
    const card = e.target.closest('.member');
    if (!card) return;
    const c = card.getBoundingClientRect();
    const t = track.getBoundingClientRect();
    const shift = c.left < t.left ? c.left - t.left : c.right > t.right ? c.right - t.right : 0;
    if (shift) track.scrollBy({ left: shift, behavior: behavior() });
  });

  // Mouse drag. Touch and trackpads already swipe natively. The drag only
  // takes over after 6px, so a plain click still opens a bio.
  let drag = null;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, left: track.scrollLeft, moved: false, hist: [[e.timeStamp, e.clientX]] };
  });
  track.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < 6) return;
      drag.moved = true;
      track.setPointerCapture(e.pointerId);
      track.classList.add('is-dragging');
    }
    track.scrollLeft = drag.left - dx;
    drag.hist.push([e.timeStamp, e.clientX]);
    if (drag.hist.length > 6) drag.hist.shift();
  });
  let scrub = null;
  // Snapping stays off until the settle ends, so the track doesn't jump to
  // the nearest portrait first; a new grab during the settle takes over.
  const settled = () => { if (!drag && !scrub) track.classList.remove('is-dragging'); };
  const settle = () => {
    const size = step();
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.max(0, Math.min(max, Math.round(track.scrollLeft / size) * size)), behavior: behavior() });
    track.addEventListener('scrollend', settled, { once: true });
    setTimeout(settled, 800);
  };
  const swallowClick = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
  const release = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { moved, hist } = drag;
    drag = null;
    if (!moved) return;
    // Release speed over the last few moves (px per second, scroll direction).
    const [t0, x0] = hist[0];
    const [t1, x1] = hist[hist.length - 1];
    const v = t1 > t0 ? -((x1 - x0) / (t1 - t0)) * 1000 : 0;
    const size = step();
    const page = track.scrollLeft / size;
    const index = Math.abs(v) > 300 ? (v > 0 ? Math.ceil(page) : Math.floor(page)) : Math.round(page);
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.max(0, Math.min(max, index * size)), behavior: behavior() });
    track.addEventListener('scrollend', settled, { once: true });
    setTimeout(settled, 800);
    // The click that ends a drag doesn't open a bio.
    track.addEventListener('click', swallowClick, { capture: true });
    setTimeout(() => track.removeEventListener('click', swallowClick, { capture: true }), 0);
  };
  // The scrubber: the thumb stays under the point where it was grabbed (a
  // press on the rail centres it there first), and the track follows it.
  if (thumb) {
    const follow = (x) => {
      const r = progress.getBoundingClientRect();
      track.scrollLeft = ((x - r.left - scrub.offset) / r.width) * track.scrollWidth;
    };
    progress.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const t = thumb.getBoundingClientRect();
      const onThumb = e.clientX >= t.left && e.clientX <= t.right;
      scrub = { id: e.pointerId, offset: onThumb ? e.clientX - t.left : t.width / 2 };
      progress.setPointerCapture(e.pointerId);
      progress.classList.add('is-scrubbing');
      track.classList.add('is-dragging');
      follow(e.clientX);
    });
    progress.addEventListener('pointermove', (e) => {
      if (scrub && e.pointerId === scrub.id) follow(e.clientX);
    });
    const endScrub = (e) => {
      if (!scrub || e.pointerId !== scrub.id) return;
      scrub = null;
      progress.classList.remove('is-scrubbing');
      settle();
    };
    progress.addEventListener('pointerup', endScrub);
    progress.addEventListener('pointercancel', endScrub);
  }

  // Over the photos an up-down wheel scrolls the page, with the site's
  // smooth scrolling, like anywhere else (Joe, 2026-10-29: it caught the
  // scroll); only a sideways swipe moves the track, so the smooth scroller
  // steps aside for those alone.
  track.addEventListener('wheel', (e) => {
    track.toggleAttribute('data-lenis-prevent-wheel', Math.abs(e.deltaX) > Math.abs(e.deltaY));
  }, { passive: true });

  track.addEventListener('dragstart', (e) => e.preventDefault());
  track.addEventListener('pointerup', release);
  track.addEventListener('pointercancel', release);

  // The portraits rise one after another as the section arrives (CSS).
  track.querySelectorAll('.member').forEach((m, i) => m.style.setProperty('--m', i));

  track.addEventListener('scroll', update, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
  update();
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
    // The quotes and industries are one light chapter in the bold variant.
    // Industries sit right under the client quotes: the repositioning is the
    // point of the rebrand (Alkida's Loom, 2026-10-21).
    `<div class="chapter">${buildTestimonials()}${buildIndustries()}</div>`,
    buildDinners(),
    buildTeam(),
    buildContactBand(),
  ].join(''));

  // The bold variant of the kit, Eden's pick (Slack, 2026-10-29).
  main.classList.add('kit-bold');

  // The kit's ink box also marks the team cards' "Read bio" (shared markup,
  // so it's marked here).
  main.querySelectorAll('.member__button').forEach(el => el.setAttribute('data-ink-owner', ''));
  main.querySelectorAll('.member__more').forEach(el => el.setAttribute('data-ink', ''));
  initKit(main);
  initBold(main);
  initReveal(main);
  initAnchors(main);
  initNavState();
  initMarquee(main);
  initCountUp(main);
  initFilms(main);
  initTeamCarousel(main);
  initBios(main, team);
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initHomepage);
