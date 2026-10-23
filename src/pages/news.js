import '../styles/look-2026.css';
import '../styles/news-2026.css';
import { newsPageItems } from '../../data/news-items.js';
import { newsPageContent } from '../../data/site-content.js';
import { initContactForm } from '../components/contact-form.js';
import {
  ARROW, pageHead, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// News (coverage) page, Oct 2026 look (DESIGN.md): each item as a row with
// its thumbnail at left. Copy comes from data/news-items.js and
// data/site-content.js.

// Map data thumbnail paths to actual downloaded files
const NEWS_IMAGE_MAP = {
  '/assets/images/news-page-stellar.png': '/assets/images/news-cleanshot.webp',
  '/assets/images/news-page-cheddar.webp': '/assets/images/franzy-funding-pano.webp',
  '/assets/images/news-page-inc.jpeg': '/assets/images/case-study-image6.jpeg',
  '/assets/images/news-page-forbes.jpeg': '/assets/images/case-study-news.jpeg',
  '/assets/images/news-page-cnbc.jpeg': '/assets/images/case-study-image4.jpeg',
};

function resolveNewsImage(item) {
  return NEWS_IMAGE_MAP[item.thumbnail] || item.thumbnail;
}

// The title is the link and its hit area covers the whole row, as on the
// case cards. An item whose url is '#' has nowhere to go: no link, and its
// "Read more" is marked disabled.
function buildItem(item, i) {
  const live = item.url && item.url !== '#';
  const title = live
    ? `<a class="news__link" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>`
    : item.title;
  const more = live
    ? `<span class="text-link news__more" aria-hidden="true"><span class="text-link__label">Read more</span>${ARROW}</span>`
    : `<span class="text-link news__more news__more--off" role="link" aria-disabled="true"><span class="text-link__label">Read more</span>${ARROW}</span>`;
  return `
    <li class="news__item" data-reveal>
      <div class="news__media">
        <img src="${resolveNewsImage(item)}" alt="${item.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async" onerror="this.style.display='none'">
      </div>
      <div class="news__body">
        ${item.date ? `<p class="news__date">${item.date}</p>` : ''}
        <h2 class="t-h3 news__title">${title}</h2>
        ${item.description ? `<p class="news__desc">${item.description}</p>` : ''}
        ${more}
      </div>
    </li>
  `;
}

function buildNewsPage() {
  const main = document.getElementById('news');
  if (!main) return;

  main.innerHTML = `
    ${pageHead({ label: 'Coverage', title: newsPageContent.headline, lead: newsPageContent.subtitle, id: 'news-title' })}

    <section class="news">
      <div class="wrap">
        <ul class="news__list">
          ${newsPageItems.map(buildItem).join('')}
        </ul>
      </div>
    </section>

    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
}

function initNewsPage() {
  buildNewsPage();
  initNavState();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initNewsPage);
