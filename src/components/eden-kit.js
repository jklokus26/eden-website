// The Eden kit (DESIGN.md, "The Eden kit"): markup for the one section
// header, and the behaviour behind the signature line, the rising headline
// words, the ink box and the scroll-filled lede. A page opts in by importing
// src/styles/eden-kit.css and calling initKit on its <main>.
import '../styles/eden-kit.css';

const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// The header that opens a section: the label, the signature line under it,
// then the serif headline where the section has one. With no headline the
// label is the section's heading (labelId). `action` (a link) sits at the
// label's right end; `titleAttrs` adds attributes to the headline (the
// scroll-filled lede); `titleTag` makes it the page's h1 on an inner page's
// opening.
export function sectionHead({ label = '', labelId = '', action = '', title = '', titleId = '', titleClass = 't-h2', titleAttrs = '', titleTag = 'h2' }) {
  const labelTag = labelId ? 'h2' : 'p';
  const top = label || action
    ? `<div class="kit-head__top">
        ${label ? `<${labelTag}${labelId ? ` id="${labelId}"` : ''} class="t-label kit-head__label">${label}</${labelTag}>` : ''}
        ${action}
      </div>`
    : '';
  return `
    <header class="kit-head">
      ${top}
      <span class="sig" aria-hidden="true"></span>
      ${title ? `<${titleTag}${titleId ? ` id="${titleId}"` : ''} class="${titleClass} kit-head__title" data-rise${titleAttrs}>${title}</${titleTag}>` : ''}
    </header>
  `;
}

// Each word in its own clipped mask so it can rise into place; screen
// readers get the sentence once, from the hidden copy.
function splitWords(el) {
  const text = el.textContent.trim().replace(/\s+/g, ' ');
  const words = text.split(' ').map((w, i) => {
    const safe = escapeHtml(w);
    return `<span class="w"><span class="w__i" style="--w: ${i}" data-w="${safe}">${safe}</span></span>`;
  });
  el.innerHTML = `<span class="visually-hidden">${escapeHtml(text)}</span><span class="kit-words" aria-hidden="true">${words.join(' ')}</span>`;
}

// Lays an inked copy of each link's content over it (white box, near-black
// text), which CSS reveals from the left on hover. The copy is hidden from
// assistive technology and carries no ids or headings.
function addInk(el) {
  if (el.querySelector(':scope > .ink')) return;
  const ink = document.createElement('span');
  ink.className = 'ink';
  ink.setAttribute('aria-hidden', 'true');
  el.childNodes.forEach(node => ink.appendChild(node.cloneNode(true)));
  ink.querySelectorAll('.ink, .sig-mark').forEach(n => n.remove());
  ink.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  ink.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
    const span = document.createElement('span');
    span.className = h.className;
    span.innerHTML = h.innerHTML;
    h.replaceWith(span);
  });
  el.appendChild(ink);
}

// The lede's words fill in reading order as it travels up the screen: from
// when its top reaches 80% of the screen height until its bottom passes 45%.
// Each word's share is set by its length, so the fill moves at an even pace;
// the leading edge shows only on the word being filled.
// Scroll work runs only while the lede is near the screen.
function initLede(lede) {
  const words = [...lede.querySelectorAll('.w__i')];
  if (!words.length) return;
  const lengths = words.map(w => w.dataset.w.length);
  const total = lengths.reduce((a, b) => a + b, 0);
  const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));
  const shown = words.map(() => -1);
  let last = -1;
  let frame = 0;

  const update = () => {
    frame = 0;
    const r = lede.getBoundingClientRect();
    const vh = window.innerHeight;
    const g = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.35 + r.height)));
    const at = Math.round(g * total * 20) / 20;
    if (at === last) return;
    last = at;
    // Only words whose fill changed are touched.
    words.forEach((w, i) => {
      const p = Math.min(1, Math.max(0, (at - starts[i]) / lengths[i]));
      if (p === shown[i]) return;
      shown[i] = p;
      w.style.setProperty('--p', p.toFixed(3));
      w.style.setProperty('--edge', p > 0 && p < 1 ? '1' : '0');
    });
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(update); };

  let listening = false;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !listening) {
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request, { passive: true });
      listening = true;
      request();
    } else if (!entry.isIntersecting && listening) {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      listening = false;
      request();
    }
  }, { rootMargin: '25% 0px' }).observe(lede);
  update();
}

export function initKit(root) {
  root.querySelectorAll('[data-rise]').forEach(splitWords);
  root.querySelectorAll('[data-ink], .text-link').forEach(addInk);
  // iOS Safari only applies :active (the pressed ink box) when a touch
  // listener exists.
  root.addEventListener('touchstart', () => {}, { passive: true });

  // Without IntersectionObserver nothing is hidden: lines drawn, words in
  // place, the lede plain white.
  if (!('IntersectionObserver' in window)) return;
  root.classList.add('kit-js');

  // A line is watched through its parent: at scale 0 it has no area of its
  // own to intersect.
  const waiting = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      waiting.get(entry.target).forEach(el => el.classList.add('is-drawn'));
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  root.querySelectorAll('.sig, [data-rise]').forEach(el => {
    const target = el.matches('.sig') ? el.parentElement : el;
    if (!waiting.has(target)) waiting.set(target, []);
    waiting.get(target).push(el);
  });
  waiting.forEach((_, target) => io.observe(target));

  root.querySelectorAll('.kit-lede').forEach(initLede);
}
