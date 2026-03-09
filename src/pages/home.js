import '../styles/home.css';
import { createTicker } from '../components/ticker.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';
import { lenis } from '../main.js';
import {
  heroContent,
  missionContent,
  youtubeVideoId,
  newsHeading,
  clientsHeading,
  teamHeading,
  aboutMarqueeText,
} from '../../data/site-content.js';
import { homeNewsItems } from '../../data/news-items.js';
import { clients } from '../../data/clients.js';
import { mediaLogos } from '../../data/media-logos.js';
import { team } from '../../data/team.js';

// Data files already have corrected local paths from the image-fixer agent.
function resolveLogoPath(item) {
  return item.logo;
}

// ─── Section builders ────────────────────────────────────────────────────────

function buildHero() {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'hero';

  const lines = heroContent.headline.split('\n');

  section.innerHTML = `
    <div class="hero-video-wrap">
      <video
        class="hero-video"
        autoplay
        muted
        playsinline
        loop
        poster="/assets/images/hero-video-poster.jpg"
        aria-hidden="true"
      >
        <source src="/assets/video/hero-video.webm" type="video/webm">
        <source src="/assets/video/hero-video.mp4" type="video/mp4">
      </video>
      <div class="hero-video-overlay"></div>
    </div>
    <div class="hero-content container">
      <h1 class="hero-headline">
        ${lines.map(line => `<span class="hero-headline-line">${line}</span>`).join('')}
        <span class="hero-headline-gradient gradient-text">${heroContent.gradientText}</span>
      </h1>
      <p class="hero-subtitle">${heroContent.subtitle}</p>
    </div>
    <div class="hero-scroll-hint" aria-hidden="true">
      <span class="hero-scroll-line"></span>
    </div>
  `;

  return section;
}

function buildMediaTicker() {
  const section = document.createElement('section');
  section.id = 'media-ticker';
  section.className = 'media-ticker-section';

  // Split logos into two rows for the two-row ticker effect
  const half = Math.ceil(mediaLogos.length / 2);
  const row1 = mediaLogos.slice(0, half);
  const row2 = mediaLogos.slice(half);

  const tickerWrap1 = document.createElement('div');
  tickerWrap1.className = 'media-ticker-wrap';

  const tickerWrap2 = document.createElement('div');
  tickerWrap2.className = 'media-ticker-wrap media-ticker-wrap--row2';

  section.appendChild(tickerWrap1);
  section.appendChild(tickerWrap2);

  // Build after DOM insertion so createTicker can measure
  requestAnimationFrame(() => {
    createTicker(
      tickerWrap1,
      row1.map(l => ({
        html: `<img src="${resolveLogoPath(l)}" alt="${l.alt}" class="media-logo" loading="lazy">`,
      })),
      { direction: 'left', speed: 25, gap: '36px' }
    );
    createTicker(
      tickerWrap2,
      row2.map(l => ({
        html: `<img src="${resolveLogoPath(l)}" alt="${l.alt}" class="media-logo" loading="lazy">`,
      })),
      { direction: 'right', speed: 25, gap: '36px' }
    );
  });

  return section;
}

function buildMission() {
  const section = document.createElement('section');
  section.id = 'mission';
  section.className = 'mission-section section-padding';

  section.innerHTML = `
    <div class="container">
      ${createDivider(missionContent.sectionLabel)}
      <div class="mission-body">
        <p class="mission-main-text" data-animate="words">${missionContent.mainText}</p>
        <div class="mission-secondary">
          <p class="mission-secondary-text">${missionContent.secondaryText}</p>
          <a href="#clients" class="mission-cta">${missionContent.ctaText} <span class="mission-cta-arrow">→</span></a>
        </div>
      </div>
    </div>
  `;

  return section;
}

function buildYouTube() {
  const section = document.createElement('section');
  section.id = 'youtube';
  section.className = 'youtube-section section-padding';

  section.innerHTML = `
    <div class="container">
      <div class="youtube-embed-wrap" data-animate="fade">
        <iframe
          class="youtube-iframe"
          src="https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1"
          title="Eden Communications video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  `;

  return section;
}

function buildNews() {
  const section = document.createElement('section');
  section.id = 'news';
  section.className = 'news-section section-padding';

  const [featured, ...rest] = homeNewsItems;

  const smallCards = rest.map(item => `
    <a href="${item.url}" class="news-card news-card--small" target="_blank" rel="noopener noreferrer">
      <div class="news-card-img-wrap">
        <img src="${item.thumbnail}" alt="${item.alt}" class="news-card-img" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="news-card-body">
        <span class="news-card-outlet">${item.outlet}</span>
        <p class="news-card-title">${item.title}</p>
      </div>
    </a>
  `).join('');

  section.innerHTML = `
    <div class="container">
      ${createDivider(newsHeading.sectionLabel)}
      <h2 class="news-headline">${newsHeading.headline}</h2>
      <div class="news-grid">
        <a href="${featured.url}" class="news-card news-card--featured" target="_blank" rel="noopener noreferrer">
          <div class="news-card-img-wrap">
            <img src="${featured.thumbnail}" alt="${featured.alt}" class="news-card-img" loading="lazy" onerror="this.style.display='none'">
          </div>
          <div class="news-card-body">
            <span class="news-card-outlet">${featured.outlet}</span>
            <p class="news-card-title">${featured.title}</p>
            ${featured.date ? `<span class="news-card-date">${featured.date}</span>` : ''}
          </div>
        </a>
        <div class="news-grid-small">
          ${smallCards}
        </div>
      </div>
    </div>
  `;

  return section;
}

function buildClients() {
  const section = document.createElement('section');
  section.id = 'clients';
  section.className = 'clients-section section-padding';

  const tickerWrap = document.createElement('div');
  tickerWrap.className = 'clients-ticker-wrap';

  section.innerHTML = `
    <div class="container">
      <h2 class="clients-headline">${clientsHeading}</h2>
    </div>
  `;
  section.appendChild(tickerWrap);

  requestAnimationFrame(() => {
    createTicker(
      tickerWrap,
      clients.map(c => ({
        html: `<img src="${resolveLogoPath(c)}" alt="${c.alt}" class="client-logo" style="height: ${c.displayHeight || 40}px" loading="lazy">`,
      })),
      { direction: 'right', speed: 30, gap: '64px' }
    );
  });

  return section;
}

function buildMarquee() {
  const section = document.createElement('section');
  section.id = 'marquee';
  section.className = 'marquee-section';
  section.setAttribute('aria-hidden', 'true');

  const tickerWrap = document.createElement('div');
  tickerWrap.className = 'marquee-ticker-wrap';
  section.appendChild(tickerWrap);

  // Build repeated text items
  const items = Array.from({ length: 8 }, () => ({
    html: `<span class="marquee-text">${aboutMarqueeText}</span><span class="marquee-dot">●</span>`,
  }));

  requestAnimationFrame(() => {
    createTicker(tickerWrap, items, { direction: 'left', speed: 18, gap: '0px' });
  });

  return section;
}

function buildTeam() {
  const section = document.createElement('section');
  section.id = 'team';
  section.className = 'team-section section-padding';

  const cards = team.map((member, i) => `
    <div class="team-card" data-index="${i}" style="cursor:pointer">
      <div class="team-card-img-wrap" data-animate="fade">
        <img
          src="${member.photo}"
          alt="${member.alt}"
          class="team-card-img"
          loading="lazy"
          onerror="this.src=''"
        >
      </div>
      <div class="team-card-body">
        <p class="team-card-name">${member.name}</p>
        <p class="team-card-role">${member.role}</p>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      ${createDivider(teamHeading.sectionLabel)}
      <h2 class="team-headline" data-animate="words">${teamHeading.headline}</h2>
      <div class="team-grid">
        ${cards}
      </div>
    </div>
  `;

  return section;
}

// ─── Team Modal ──────────────────────────────────────────────────────────────

function buildTeamModal() {
  const overlay = document.createElement('div');
  overlay.className = 'team-modal-overlay';
  overlay.innerHTML = `
    <div class="team-modal">
      <button class="team-modal-close" aria-label="Close bio">&times;</button>
      <div class="team-modal-photo">
        <img src="" alt="" class="team-modal-img">
      </div>
      <div class="team-modal-info">
        <h3 class="team-modal-name"></h3>
        <p class="team-modal-role"></p>
        <p class="team-modal-bio"></p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function openTeamModal(overlay, member) {
  overlay.querySelector('.team-modal-img').src = member.photo;
  overlay.querySelector('.team-modal-img').alt = member.alt;
  overlay.querySelector('.team-modal-name').textContent = member.name;
  overlay.querySelector('.team-modal-role').textContent = member.role;
  overlay.querySelector('.team-modal-bio').textContent = member.bio;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTeamModal(overlay) {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ─── Init ────────────────────────────────────────────────────────────────────

function initHomepage() {
  const main = document.getElementById('home');
  if (!main) return;

  const sections = [
    buildHero(),
    buildMediaTicker(),
    buildMission(),
    buildYouTube(),
    buildNews(),
    buildClients(),
    buildMarquee(),
    buildTeam(),
  ];

  sections.forEach(s => main.appendChild(s));

  // Wire Lenis smooth scroll for anchor CTA
  const ctaLink = main.querySelector('.mission-cta[href="#clients"]');
  if (ctaLink && lenis) {
    ctaLink.addEventListener('click', e => {
      e.preventDefault();
      lenis.scrollTo('#clients', { offset: -80, duration: 1.2 });
    });
  }

  // Wire up all GSAP scroll animations
  initAnimations();

  // Team bio modal
  const modalOverlay = buildTeamModal();

  main.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index, 10);
      openTeamModal(modalOverlay, team[idx]);
    });
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target.closest('.team-modal-close')) {
      closeTeamModal(modalOverlay);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeTeamModal(modalOverlay);
    }
  });
}

document.addEventListener('DOMContentLoaded', initHomepage);
