import '../styles/gallery.css';
import '../styles/dinners.css';
import { dinnersPage, dinnerPhotos } from '../../data/dinners.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';
import { buildContactSection, initContactForm } from '../components/contact-form.js';

const IMG_DIR = '/assets/images/dinners';

function buildPicture(photo, sizes, eager = false) {
  const srcset = [640, 1024, 1600]
    .map(w => `${IMG_DIR}/${photo.base}-${w}.webp ${w}w`)
    .join(', ');
  return `
    <picture>
      <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
      <img
        src="${IMG_DIR}/${photo.base}-1024.jpg"
        alt="${photo.alt}"
        width="${photo.width}"
        height="${photo.height}"
        loading="${eager ? 'eager' : 'lazy'}"
        decoding="async"
      >
    </picture>
  `;
}

function buildStats(stats) {
  if (!stats.length) return '';
  return `
    <div class="dinners-stats">
      ${stats.map(s => `
        <div class="dinners-stat">
          <span class="dinners-stat-value">${s.value}</span>
          <span class="dinners-stat-label">${s.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function buildDinners() {
  const main = document.getElementById('dinners');
  if (!main) return;

  const [lead, ...rest] = dinnerPhotos;

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider(dinnersPage.sectionLabel)}
        <h1 class="gallery-headline" data-animate="words">${dinnersPage.headline}</h1>
      </div>
    </section>

    <section class="dinners-intro">
      <div class="container">
        <div class="dinners-copy">
          ${dinnersPage.paragraphs.map(p => `<p>${p}</p>`).join('')}
          <a class="dinners-cta" href="${dinnersPage.cta.href}">${dinnersPage.cta.label} &rarr;</a>
        </div>
        ${buildStats(dinnersPage.stats)}
      </div>
    </section>

    <section class="dinners-gallery">
      <div class="container">
        <figure class="dinners-lead">
          ${buildPicture(lead, '(max-width: 1280px) 100vw, 1280px', true)}
        </figure>
        <div class="dinners-grid">
          ${rest.map(photo => `
            <figure class="dinners-photo">
              ${buildPicture(photo, '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw')}
            </figure>
          `).join('')}
        </div>
      </div>
    </section>

    ${buildContactSection()}
  `;
}

function initDinnersPage() {
  buildDinners();
  initContactForm();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initDinnersPage);
