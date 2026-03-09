import '../styles/gallery.css';
import { newsPageItems } from '../../data/news-items.js';
import { newsPageContent } from '../../data/site-content.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';

// Map data thumbnail paths to actual downloaded files
const NEWS_IMAGE_MAP = {
  '/assets/images/news-page-stellar.png': '/assets/images/news-cleanshot.png',
  '/assets/images/news-page-cheddar.webp': '/assets/images/franzy-funding-pano.webp',
  '/assets/images/news-page-inc.jpeg': '/assets/images/case-study-image6.jpeg',
  '/assets/images/news-page-forbes.jpeg': '/assets/images/case-study-news.jpeg',
  '/assets/images/news-page-cnbc.jpeg': '/assets/images/case-study-image4.jpeg',
};

function resolveNewsImage(item) {
  return NEWS_IMAGE_MAP[item.thumbnail] || item.thumbnail;
}

function buildNewsPage() {
  const main = document.getElementById('news');
  if (!main) return;

  const cards = newsPageItems.map(item => {
    const img = resolveNewsImage(item);
    return `
      <a
        href="${item.url}"
        class="news-page-card"
        target="_blank"
        rel="noopener noreferrer"
        ${item.url === '#' ? 'aria-disabled="true"' : ''}
      >
        <div class="news-page-card-img-wrap">
          <img
            src="${img}"
            alt="${item.alt}"
            class="news-page-card-img"
            loading="lazy"
            onerror="this.parentElement.style.background='var(--bg-section)'; this.style.display='none'"
          >
        </div>
        <div class="news-page-card-body">
          ${item.date ? `<span class="news-page-card-date">${item.date}</span>` : ''}
          <p class="news-page-card-title">${item.title}</p>
          ${item.description ? `<p class="news-page-card-desc">${item.description}</p>` : ''}
          <span class="news-page-card-link">Read more →</span>
        </div>
      </a>
    `;
  }).join('');

  main.innerHTML = `
    <section class="news-page-hero section-padding">
      <div class="container">
        ${createDivider('Coverage')}
        <h1 class="news-page-headline">${newsPageContent.headline}</h1>
        <p class="news-page-subtitle">${newsPageContent.subtitle}</p>
      </div>
    </section>
    <section class="news-page-grid section-padding">
      <div class="container">
        <div class="news-page-list">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function initNewsPage() {
  buildNewsPage();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initNewsPage);
