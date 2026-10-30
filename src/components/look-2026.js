// Shared pieces for pages on the Oct 2026 look (DESIGN.md): markup helpers,
// the closing contact band, and the small behaviours every such page uses.
import { buildContactSection } from './contact-form.js';
import { sectionHead } from './eden-kit.js';
import { lenis } from '../main.js';
import { homeContactBand } from '../../data/site-content.js';

export const ARROW = '<span class="arrow" aria-hidden="true">→</span>';

export function picture({ dir, base, widths, sizes, alt, width, height, eager = false, className = '', fallback = 1024, narrow = null }) {
  const srcset = widths.map(w => `${dir}/${base}-${w}.webp ${w}w`).join(', ');
  // narrow: a differently cropped file for small screens, e.g. a tall crop for
  // a band that stacks and grows taller than it is wide.
  const narrowSource = narrow
    ? `<source media="${narrow.media}" type="image/webp" srcset="${narrow.widths.map(w => `${dir}/${narrow.base}-${w}.webp ${w}w`).join(', ')}" sizes="${narrow.sizes}">`
    : '';
  return `
    <picture class="${className}">
      ${narrowSource}
      <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
      <img src="${dir}/${base}-${fallback}.jpg" alt="${alt}" width="${width}" height="${height}"
        loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>
    </picture>
  `;
}

// Keeps a hyphenated word on one line ("AI-driven", "high-net-worth"), a
// number with the word before it ("Fortune 500") and an amount with its unit
// ("$10 billion"), as the homepage's case entries do. For plain text only.
export function keepWords(text) {
  return text
    .replace(/\S+-\S+/g, w => `<span class="keep">${w}</span>`)
    .replace(/ (?=\d)/g, '&nbsp;')
    .replace(/(\d) (thousand|million|billion|trillion)\b/gi, '$1&nbsp;$2');
}

export function textLink(href, label, extra = '') {
  return `<a class="text-link" href="${href}"${extra}><span class="text-link__label">${label}</span>${ARROW}</a>`;
}

// The opening of an inner page on the bold kit (DESIGN.md, "Page opening"):
// the kit's label and signature line, then the headline at poster size, its
// words rising as the page opens, and an optional intro under it, starting
// on the headline's left edge and set in two columns on laptops (Services,
// About). A title given as a list sets one sentence to a line; `long` takes
// the step down for a sentence-length headline.
export function pageHead({ label, title, lead = '', id = 'page-title', long = false }) {
  const size = long ? 'poster poster--long' : 'poster';
  const h1 = Array.isArray(title)
    ? `<h1 id="${id}" class="${size} page-head__title">${title.map(t => `<span class="page-head__line" data-rise>${t}</span>`).join(' ')}</h1>`
    : `<h1 id="${id}" class="${size} page-head__title" data-rise>${title}</h1>`;
  return `
    <section class="page-head" aria-labelledby="${id}">
      <div class="wrap">
        ${sectionHead({ label })}
        ${h1}
        ${lead ? `<div class="page-head__lead" data-reveal style="--i: 4">${[].concat(lead).map(p => `<p>${keepWords(p)}</p>`).join('')}</div>` : ''}
      </div>
    </section>
  `;
}

// A case card: 16:9 photo, client, title, up to three figures and "View case
// study". The whole card is the link, and hovering it puts "View case study"
// in the kit's ink box. Used on Our Results and under each case study,
// inside a list (.case-grid); the homepage has its own spread.
export function caseCard({ href, client, title, image, alt = '', metrics = [], note = '', more = 'View case study', heading = 'h3', i = 0 }) {
  const media = image
    ? `<picture>
        ${image.webp ? `<source type="image/webp" srcset="${image.webp}">` : ''}
        <img src="${image.src}" alt="${alt}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async">
      </picture>`
    : '';
  const facts = metrics.length
    ? `<dl class="case__metrics">
        ${metrics.slice(0, 3).map(m => `<div class="case__metric"><dt>${keepWords(m.label)}</dt><dd>${m.number}</dd></div>`).join('')}
      </dl>`
    : note ? `<p class="case__note">${note}</p>` : '';
  return `
    <li class="case" data-reveal data-ink-owner style="--i: ${i % 3}">
      <div class="case__media">${media}</div>
      <p class="t-label case__client">${client}</p>
      <${heading} class="t-card case__title"><a class="case__link" href="${href}">${keepWords(title)}</a></${heading}>
      ${facts}
      <span class="text-link case__more" aria-hidden="true"><span class="text-link__label">${more}</span>${ARROW}</span>
    </li>
  `;
}

// A team portrait that opens the bio dialog (initBios). Used in the homepage
// carousel and the About grid.
export function memberCard(m, i) {
  return `
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
  `;
}

export function bioDialog() {
  return `
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
  `;
}

// Each portrait opens the bio dialog with that person's full bio; closing it
// returns focus to the portrait.
export function initBios(root, team) {
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

// The dark skyline band that closes every page, with the contact form on a
// paper panel inside it (the form takes the place of the band's button). The
// band carries id="contact" so every "Talk to Eden" lands on headline and
// form together. It opens with the Eden kit's label ("Talk to Eden") and
// signature line, the headline's words rise, and the email address takes
// the ink box.
export function buildContactBand() {
  return `
    <section class="band on-dark" id="contact" aria-labelledby="band-title">
      <div class="band__media" aria-hidden="true">
        ${picture({
          dir: '/assets/images/home', base: 'contact-nyc-skyline', widths: [1024, 1600, 2400], sizes: '100vw',
          width: 2400, height: 996, alt: '', fallback: 1600,
          narrow: { media: '(max-width: 900px)', base: 'contact-nyc-skyline-portrait', widths: [750, 1200], sizes: '(max-width: 540px) 540px, 100vw' },
        })}
      </div>
      <div class="wrap band__inner">
        <div class="band__copy">
          <div class="band__head"><p class="t-label band__label">${homeContactBand.label}</p><span class="sig band__sig" aria-hidden="true"></span></div>
          <h2 id="band-title" class="t-h2 band__title" data-rise>${homeContactBand.headline}</h2>
          <p class="band__body">${homeContactBand.body}</p>
          <p class="band__alt"><a class="band__email" href="mailto:hello@edencommunications.com" data-ink>hello@edencommunications.com</a></p>
          <ul class="band__words">${homeContactBand.words.map(w => `<li>${w}</li>`).join('')}</ul>
        </div>
        <div class="band__panel">
          ${buildContactSection({ id: 'contact-form', headline: false })}
        </div>
      </div>
    </section>
  `;
}

// The Wintermute dinner recap (Eden's V2 film, 15 s, played silent; swapped
// in at Alkida's request, 2026-10-28), shown on the homepage dinners band and
// the dinners page. The poster is the film's opening shot at every size, so
// the film fades in over a matching frame. The film itself loads only when it
// nears the screen, in 720p on phones and 1080p elsewhere, and plays muted on
// a loop while on screen (initFilms).
const FILM = {
  small: '/assets/video/wintermute-recap-v2-720.mp4',
  large: '/assets/video/wintermute-recap-v2-1080.mp4',
};

export function dinnerFilm() {
  return `
    <figure class="film" data-film>
      <div class="film__frame">
        ${picture({
          dir: '/assets/images/dinners', base: 'wintermute-recap-v2-poster', widths: [768, 1280, 1920],
          sizes: '(max-width: 1280px) 100vw, 1184px', alt: '', width: 1920, height: 1080, fallback: 1280,
          className: 'film__poster',
        })}
        <video class="film__video" muted playsinline loop preload="none" disablepictureinpicture aria-hidden="true"></video>
        <button class="film__toggle" type="button" aria-pressed="true" aria-label="Pause the dinner film" hidden>
          <svg class="film__icon film__icon--pause" viewBox="0 0 14 14" aria-hidden="true"><rect x="3" y="2" width="2.5" height="10"/><rect x="8.5" y="2" width="2.5" height="10"/></svg>
          <svg class="film__icon film__icon--play" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10l8-5z"/></svg>
        </button>
      </div>
      <figcaption class="visually-hidden">Highlights from the private dinner Eden hosted for Wintermute</figcaption>
    </figure>
  `;
}

// Plays while at least a quarter of the film is on screen and pauses when it
// leaves. The button pauses and resumes it, and a pause by the visitor holds
// until they press play. Reduced motion and data saver start paused on the
// poster. If the browser refuses to autoplay (iPhone Low Power Mode), the
// button shows play.
export function initFilms(root) {
  root.querySelectorAll('[data-film]').forEach(film => {
    const video = film.querySelector('video');
    const toggle = film.querySelector('.film__toggle');
    if (!video || !toggle) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    let held = reduce.matches || saveData;
    // Reduced motion switched on mid-visit pauses the film until the visitor
    // presses play.
    reduce.addEventListener('change', () => {
      if (!reduce.matches) return;
      held = true;
      video.pause();
    });

    const load = () => {
      if (video.getAttribute('src')) return;
      video.src = window.matchMedia('(max-width: 900px)').matches || saveData ? FILM.small : FILM.large;
      video.preload = 'auto';
    };
    const play = () => {
      load();
      const attempt = video.play();
      if (attempt) attempt.catch(() => toggle.setAttribute('aria-pressed', 'true'));
    };

    video.addEventListener('playing', () => {
      film.classList.add('is-playing');
      toggle.setAttribute('aria-pressed', 'false');
    });
    video.addEventListener('pause', () => toggle.setAttribute('aria-pressed', 'true'));
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      if (video.paused) {
        held = false;
        play();
      } else {
        held = true;
        video.pause();
      }
    });

    if (!('IntersectionObserver' in window)) {
      if (!held) play();
      return;
    }
    // Start fetching a little before the film arrives so it's ready to play.
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || held) return;
      load();
      near.disconnect();
    }, { rootMargin: '400px 0px' });
    near.observe(film);
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !held) play();
      else if (!entry.isIntersecting && !video.paused) video.pause();
    }, { threshold: 0.25 }).observe(film);
  });
}

export function initReveal(root) {
  const items = root.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) return;
  root.classList.add('js-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

// Keyboard and screen-reader users land where the page scrolled to, so the
// next Tab goes into that section instead of back to where they started.
export function focusSection(target) {
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

export function initAnchors(root) {
  root.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const nav = document.getElementById('nav');
        lenis.scrollTo(target, { offset: -((nav && nav.offsetHeight) || 72) - 16, duration: 1.1 });
      } else {
        target.scrollIntoView({ block: 'start' });
      }
      focusSection(target);
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
}

export function initNavState() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 4);
  update();
  window.addEventListener('scroll', update, { passive: true });
}
