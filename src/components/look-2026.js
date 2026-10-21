// Shared pieces for pages on the Oct 2026 look (DESIGN.md): markup helpers,
// the closing contact band, and the small behaviours every such page uses.
import { buildContactSection } from './contact-form.js';
import { lenis } from '../main.js';
import { homeContactBand } from '../../data/site-content.js';

export const ARROW = '<span class="arrow" aria-hidden="true">→</span>';

export function picture({ dir, base, widths, sizes, alt, width, height, eager = false, className = '', fallback = 1024 }) {
  const srcset = widths.map(w => `${dir}/${base}-${w}.webp ${w}w`).join(', ');
  return `
    <picture class="${className}">
      <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
      <img src="${dir}/${base}-${fallback}.jpg" alt="${alt}" width="${width}" height="${height}"
        loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>
    </picture>
  `;
}

export function textLink(href, label, extra = '') {
  return `<a class="text-link" href="${href}"${extra}><span class="text-link__label">${label}</span>${ARROW}</a>`;
}

// The dark skyline band that closes a page, with the contact form on a paper
// panel inside it (the form takes the place of the band's button). The band
// carries id="contact" so every "Talk to Eden" lands on headline and form
// together.
export function buildContactBand() {
  return `
    <section class="band on-dark" id="contact" aria-labelledby="band-title">
      <div class="band__media" aria-hidden="true">
        ${picture({
          dir: '/assets/images/home', base: 'contact-nyc-skyline', widths: [1024, 1600, 2400], sizes: '100vw',
          width: 2400, height: 996, alt: '', fallback: 1600,
        })}
      </div>
      <div class="wrap band__inner">
        <div class="band__copy">
          <h2 id="band-title" class="t-h2 band__title">${homeContactBand.headline}</h2>
          <p class="band__body">${homeContactBand.body}</p>
          <p class="band__alt"><a class="band__email" href="mailto:hello@edencommunications.com">hello@edencommunications.com</a></p>
          <ul class="band__words">${homeContactBand.words.map(w => `<li>${w}</li>`).join('')}</ul>
        </div>
        <div class="band__panel">
          ${buildContactSection({ id: 'contact-form', headline: false })}
        </div>
      </div>
    </section>
  `;
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

export function initAnchors(root) {
  root.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        const nav = document.getElementById('nav');
        lenis.scrollTo(target, { offset: -((nav && nav.offsetHeight) || 72) - 16, duration: 1.1 });
      } else {
        target.scrollIntoView({ block: 'start' });
      }
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
