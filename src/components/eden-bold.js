// The bold variant of the Eden kit (DESIGN.md, "The bold variant"): the same
// system turned up, for Eden to compare. A page takes it by adding class
// kit-bold to its <main> and calling initBold after initKit. Pieces: headline
// words revealed by a sweeping block (Room & Pillar's bar wipe), a photo that
// follows the pointer over the What we do rows (Cypher's image swap), light
// chapters for the industries and the quotes that open with the kit's ink-box
// wipe (Cypher's theme flip, made with a wipe so the text is never caught
// mid-fade), the hero's sizzle reel and a press ticker under the hero.
// Eden picked this variant (Slack, 2026-10-29); the inner pages take it
// through initBoldPage.
import '../styles/eden-bold.css';
import { initKit } from './eden-kit.js';
import { coverageItems } from '../../data/coverage.js';

const PAUSE_ICONS = `
  <svg class="marquee__icon marquee__icon--pause" viewBox="0 0 14 14" aria-hidden="true"><rect x="3" y="2" width="2.5" height="10"/><rect x="8.5" y="2" width="2.5" height="10"/></svg>
  <svg class="marquee__icon marquee__icon--play" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10l8-5z"/></svg>
`;

// The photos that follow the pointer, one per pillar, all Eden's own (no
// stock): Position, a speaker on the Stellar conference stage (the photo the
// industries row uses for Digital Assets); Build market visibility, Franzy
// on Fox Business; Open the right doors, two guests
// talking at Eden's Wintermute dinner. Each source is at least twice the photo's largest size.
const PILLAR_PHOTOS = [
  { src: '/assets/images/home/industry-digital-assets-stellar-1024.webp', focus: '50% 50%' },
  { src: '/assets/images/franzy-fox-business.jpg', focus: '50% 50%' },
  { src: '/assets/images/dinners/wintermute-dinner-guests-conversation-1024.webp', focus: '50% 28%' },
];

// The press ticker along the foot of the hero, like the NYSE tape or the
// Times Square zipper, running Eden's real coverage (data/coverage.js):
// outlet, client, headline. Eden picks the articles: these four are
// Alkida's list (Slack, 2026-11-05, "Can we replace the articles on the
// 'Recent coverage' banner with some others?"; she linked one Forbes piece
// twice), in her order, pending Ebony's final input. A title must match its
// coverage.js entry exactly or the item is dropped.
// A white band, at the pace of the Prosek ticker Ebony pointed to (Slack,
// 2026-10-29: "easy to miss", "move a little faster"): about 200px a second,
// 150 on phones. It moves like the logo strips (a pause button, still on
// hover, rests off screen, stands still with reduced motion); its items
// aren't links while they move.
const TICKER = [
  'There’s Not Enough Robot Training Data. This Startup Plans To Fix That',
  '‘Infinite Demand For Robots:’ Inside Matter Venture Partners’ $450 Million Bet On Physical AI',
  'AI Is Changing How Companies Access Capital Markets',
  'Canton-based trading platform Cancore raises $7.2 million at $60 million token valuation',
];

export function heroTicker() {
  const items = TICKER
    .map(title => coverageItems.find(c => c.title === title))
    .filter(Boolean)
    .map(c => `<li class="marquee__item ticker__item"><span class="ticker__outlet">${c.publication}</span><span class="ticker__client">${c.client}</span><span class="ticker__headline">${c.title}</span></li>`)
    .join('');
  return `
    <div class="ticker" data-marquee>
      <p class="t-label ticker__label">Recent coverage</p>
      <div class="marquee marquee--ticker" data-speed="200" data-speed-narrow="150">
        <ul class="marquee__track" aria-label="Recent coverage">${items}</ul>
        <ul class="marquee__track" aria-hidden="true">${items}</ul>
      </div>
      <button class="marquee__toggle ticker__toggle" type="button" aria-pressed="false" aria-label="Pause the coverage ticker">${PAUSE_ICONS}</button>
    </div>
  `;
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

// A small photo trails the pointer while it's over a What we do row, easing
// after it; mouse only, and not with reduced motion.
function initFollow(root) {
  const section = root.querySelector('.what');
  const rows = [...root.querySelectorAll('.what__row')];
  if (!section || rows.length !== PILLAR_PHOTOS.length) return;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  const follow = document.createElement('div');
  follow.className = 'follow';
  follow.setAttribute('aria-hidden', 'true');
  follow.innerHTML = `<div class="follow__frame">${PILLAR_PHOTOS.map(p => `
    <img src="${p.src}" alt="" decoding="async" style="object-position: ${p.focus}">
  `).join('')}</div>`;
  section.appendChild(follow);
  const photos = [...follow.querySelectorAll('img')];

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let frame = 0;
  const place = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    follow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    frame = Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(place) : 0;
  };
  // Up and to the right of the pointer, kept on screen.
  const aim = (e) => {
    const w = follow.offsetWidth;
    const h = follow.offsetHeight;
    tx = Math.min(e.clientX + 28, window.innerWidth - w - 16);
    ty = Math.max(16, e.clientY - h - 20);
  };

  rows.forEach((row, i) => {
    row.addEventListener('pointerenter', (e) => {
      if (!fine.matches || reduce.matches || e.pointerType !== 'mouse') return;
      photos.forEach((p, j) => p.classList.toggle('is-on', j === i));
      aim(e);
      if (!follow.classList.contains('is-shown')) { x = tx; y = ty; place(); }
      follow.classList.add('is-shown');
    });
    row.addEventListener('pointermove', (e) => {
      if (!follow.classList.contains('is-shown')) return;
      aim(e);
      if (!frame) frame = requestAnimationFrame(place);
    });
    row.addEventListener('pointerleave', () => follow.classList.remove('is-shown'));
  });
}

// A light chapter is white paper with dark ink throughout (the homepage has
// two: industries, then the client quotes). Each opens once, wiping in from
// the left like the kit's ink box, when its top reaches three quarters of the
// way down the screen. The text sits inside the white, so every visible line
// is always dark on white; nothing fades between the two. With reduced motion
// it's simply there.
function initChapter(root) {
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  root.querySelectorAll('.chapter').forEach((chapter) => {
    chapter.classList.add('is-closed');
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      chapter.classList.add('is-open');
      // The wipe is the chapter's reveal: everything inside it shows as it
      // opens, so nothing waits on scroll-triggered reveals that may have
      // passed while it was still closed.
      chapter.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'));
      chapter.querySelectorAll('.sig, [data-rise]').forEach(el => el.classList.add('is-drawn'));
      io.disconnect();
    }, { rootMargin: '0px 0px -25% 0px' });
    io.observe(chapter);
  });
}

// ─── Hero reel ───────────────────────────────────────────────────────────
// Eden's sizzle reel (2026-11-05) is the hero's motion. It starts as soon as
// it can play, over its own first frame (the still), so the picture simply
// starts moving. It replaced the "going to print" entrance the same day
// (Joe: with the video the effect was "overdoing it", and holding the reel
// until the pass was done left it still for about three seconds). Like the
// dinner film: it plays while the hero is on screen, the button pauses and
// resumes it and a visitor's pause holds, reduced motion and data saver keep
// the still with the button on play, and if the browser refuses to autoplay
// (iPhone Low Power Mode) the button shows play.
function initReel(hero) {
  const video = hero.querySelector('.hero__video');
  const toggle = hero.querySelector('.hero__toggle');
  if (!video || !toggle) return;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  let held = reduce.matches || saveData;

  const show = () => { toggle.hidden = false; };
  const load = () => {
    if (video.getAttribute('src')) return;
    // Phones take the 3:4 crop; tablets' band is about 16:9, so they take the wide file.
    video.src = window.matchMedia('(max-width: 640px)').matches ? video.dataset.tall : video.dataset.wide;
    video.preload = 'auto';
  };
  const play = () => {
    load();
    const attempt = video.play();
    if (attempt) attempt.catch(() => { toggle.setAttribute('aria-pressed', 'true'); show(); });
  };

  video.addEventListener('playing', () => {
    hero.classList.add('is-playing');
    toggle.setAttribute('aria-pressed', 'false');
    show();
  });
  video.addEventListener('pause', () => toggle.setAttribute('aria-pressed', 'true'));
  reduce.addEventListener('change', () => {
    if (!reduce.matches) return;
    held = true;
    video.pause();
  });
  toggle.addEventListener('click', () => {
    if (video.paused) {
      held = false;
      play();
    } else {
      held = true;
      video.pause();
    }
  });

  if (held) show();
  if (!('IntersectionObserver' in window)) {
    if (!held) play();
    return;
  }
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !held) play();
    else if (!entry.isIntersecting && !video.paused) video.pause();
  }, { threshold: 0.25 }).observe(hero);
}

// The glow around the reel on laptops (2026-11-05): the shot's own colours,
// drawn 32x18 and blurred by CSS, so the frame fades into its own light
// rather than into flat black (Joe: the frame went "from solid to just this
// transparent window"). The still paints it until the reel plays; about 15
// paints a second is plenty for a blur.
function initGlow(hero, video) {
  const canvas = hero.querySelector('.hero__glow');
  const ctx = canvas && canvas.getContext('2d');
  if (!ctx) return;
  const laptop = window.matchMedia('(min-width: 901px)');
  const still = hero.querySelector('.hero__bg img');
  const paint = (src) => {
    if (laptop.matches) ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
  };
  const paintStill = () => { if (still && still.complete && still.naturalWidth) paint(still); };
  if (still) still.addEventListener('load', paintStill);
  paintStill();
  let running = false;
  let last = 0;
  const tick = (now) => {
    if (video.paused) { running = false; return; }
    if (now - last > 66) { paint(video); last = now; }
    requestAnimationFrame(tick);
  };
  video.addEventListener('playing', () => {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  });
  laptop.addEventListener('change', () => {
    if (video.readyState >= 2) paint(video); else paintStill();
  });
}

export function initBold(root) {
  const hero = root.querySelector('.hero');
  if (hero) {
    initReel(hero);
    const video = hero.querySelector('.hero__video');
    if (video) initGlow(hero, video);
  }
  initFollow(root);
  initChapter(root);
}

// An inner page on the bold kit (2026-10-30): the class, the kit, and the
// page's light chapter if it has one. The page's own reveals come after.
export function initBoldPage(main) {
  main.classList.add('kit-bold');
  initKit(main);
  initChapter(main);
}
