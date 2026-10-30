// The bold variant of the Eden kit (DESIGN.md, "The bold variant"): the same
// system turned up, for Eden to compare. A page takes it by adding class
// kit-bold to its <main> and calling initBold after initKit. Pieces: headline
// words revealed by a sweeping block (Room & Pillar's bar wipe), a photo that
// follows the pointer over the What we do rows (Cypher's image swap), a light
// chapter for the quotes and industries that opens with the kit's ink-box
// wipe (Cypher's theme flip, made with a wipe so the text is never caught
// mid-fade), a "going to print" hero entrance and a press ticker under the
// hero. Eden picked this variant (Slack, 2026-10-29); the inner pages take
// it through initBoldPage.
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
// outlet, client, headline. Hand-picked so each item is proof of Eden's work
// for a named client: no dollar prices (under the Stock Exchange it read as
// a live price tape), no market or political news without the client, and
// nothing from Ondo (on hold) or ProCap. It prints in with the hero photo.
// A white band, at the pace of the Prosek ticker Ebony pointed to (Slack,
// 2026-10-29: "easy to miss", "move a little faster"): about 200px a second,
// 150 on phones. It moves like the logo strips (a pause button, still on
// hover, rests off screen, stands still with reduced motion); its items
// aren't links while they move.
const TICKER = [
  'Why influential Wintermute founder Evgeny Gaevoy thinks crypto has strayed from its cypherpunk roots',
  'Stellar CMO: Why Stablecoins Are the Gateway to Mainstream Crypto',
  'Quantum Computing Awaits Its ChatGPT Moment',
  'AI mania is helping cap crypto’s upside, Wintermute says',
  'Crypto Rallies Are Getting Shorter: Wintermute CEO',
  'Reed Smith: Arbitration Is Now the Global Go-To for Crypto Exchange Disputes',
  'Gaevoy: This is a crisis of faith in prices, not technology',
  'Marshall Islands launches world’s first blockchain-based UBI on Stellar blockchain',
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

// The quotes and industries are one light chapter, white paper with dark
// ink throughout. It opens once, wiping in from the left like the kit's ink
// box, when its top reaches three quarters of the way down the screen. The
// text sits inside the white, so every visible line is always dark on white;
// nothing fades between the two. With reduced motion it's simply there.
function initChapter(root) {
  const chapter = root.querySelector('.chapter');
  if (!chapter || reduce.matches || !('IntersectionObserver' in window)) return;
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
}

// ─── Hero entrance ───────────────────────────────────────────────────────
// It waits for the photo to be ready, so the motion is seen, and doesn't run
// with reduced motion.

const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
const ready = img => (img.complete && img.naturalWidth ? Promise.resolve() : new Promise(r => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); }));

// Going to print: the hero opens as the photo in coarse white newsprint dots
// on the page color, holds a beat so the dots read, then one press pass runs
// left to right, finer dots leading, the photograph and the coverage ticker
// printing in together behind it. The two dot screens are drawn once each;
// the pass is CSS (classes on the hero section).
async function heroPrint(bg, photo) {
  const img = photo.querySelector('img');
  const hero = bg.parentElement;
  hero.classList.add('is-print');
  await ready(img);
  const box = bg.getBoundingClientRect();
  const W = Math.round(box.width);
  const H = Math.round(box.height);
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const narrow = window.matchMedia('(max-width: 900px)').matches;

  // The photo's crop on screen (object-fit: cover at its object-position).
  const [px, py] = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100);
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  const ox = (W - dw) * px;
  const oy = (H - dh) * py;
  const sample = document.createElement('canvas');
  const sctx = sample.getContext('2d', { willReadFrequently: true });
  const paper = getComputedStyle(bg).backgroundColor;

  const screen = (cell, extra = '') => {
    const canvas = document.createElement('canvas');
    canvas.className = `hero-fx__print ${extra}`;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cols = Math.ceil(W / cell);
    const rows = Math.ceil(H / cell);
    sample.width = cols;
    sample.height = rows;
    sctx.drawImage(img, ox / cell, oy / cell, dw / cell, dh / cell);
    const data = sctx.getImageData(0, 0, cols, rows).data;
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const k = (r * cols + c) * 4;
        const lum = (0.2126 * data[k] + 0.7152 * data[k + 1] + 0.0722 * data[k + 2]) / 255;
        const rad = cell * 0.56 * Math.sqrt(lum);
        if (rad < 0.4) continue;
        const cx = c * cell + cell / 2;
        const cy = r * cell + cell / 2;
        ctx.moveTo(cx + rad, cy);
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      }
    }
    ctx.fill();
    return canvas;
  };

  const fx = document.createElement('div');
  fx.className = 'hero-fx';
  fx.append(screen(narrow ? 12 : 16), screen(narrow ? 5 : 6, 'hero-fx__print--fine'));
  // Under the photo, which is masked until it prints.
  bg.insertBefore(fx, photo);
  await nextFrame();
  // Hold the dots long enough to read as newsprint, then print.
  await new Promise(r => setTimeout(r, 1000));
  hero.classList.add('is-printing');
  await new Promise(r => setTimeout(r, 2600 + 280 + 200));
  fx.remove();
  hero.classList.remove('is-print', 'is-printing');
}

function initHero(root) {
  const bg = root.querySelector('.hero__bg');
  const photo = bg && bg.querySelector(':scope > picture');
  if (!photo || reduce.matches) return;
  heroPrint(bg, photo);
}

export function initBold(root) {
  initHero(root);
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
