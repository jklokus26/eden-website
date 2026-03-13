import '../styles/home.css';
import { createTicker } from '../components/ticker.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';
import { buildContactSection, initContactForm } from '../components/contact-form.js';
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
import { caseStudies } from '../../data/case-studies.js';
import { services } from '../../data/services.js';
import { coverageItems } from '../../data/coverage.js';
import { testimonials } from '../../data/testimonials.js';

// Data files already have corrected local paths from the image-fixer agent.
function resolveLogoPath(item) {
  return item.logo;
}

const LINKEDIN_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;

// ─── Metric counter helpers ──────────────────────────────────────────────────

function parseMetric(str) {
  const match = str.match(/^([+-]?)([0-9,]+)([%M]?)\s*(.*)/);
  if (!match) return { prefix: '', value: 0, suffix: '', label: str };
  return {
    prefix: match[1],
    value: parseInt(match[2].replace(/,/g, '')),
    suffix: match[3],
    label: match[4],
  };
}

function animateValue(el, start, end, prefix, suffix, duration) {
  const startTime = performance.now();
  const prefixSpan = el.querySelector('.featured-cs-metric-prefix');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    if (prefixSpan) {
      prefixSpan.textContent = prefix;
      el.childNodes[el.childNodes.length - 1].textContent = current.toLocaleString() + suffix;
    } else {
      el.textContent = prefix + current.toLocaleString() + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.classList.add('counted');
    }
  }

  requestAnimationFrame(update);
}

function animateCounters() {
  const metrics = document.querySelectorAll('.featured-cs-metric');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const value = parseInt(el.dataset.value);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const numberEl = el.querySelector('.featured-cs-metric-number');

        animateValue(numberEl, 0, value, prefix, suffix, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  metrics.forEach(m => observer.observe(m));

  // Stats panel counters
  const statsCounters = document.querySelectorAll('.stats-counter');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const value = parseInt(el.dataset.value);
        const suffix = el.dataset.suffix || '';
        animateValue(el, 0, value, '', suffix, 1800);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statsCounters.forEach(c => statsObserver.observe(c));
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
        preload="metadata"
        poster="/assets/images/hero-video-poster.jpg"
        aria-hidden="true"
      >
        <source src="/assets/video/hero-video.webm" type="video/webm">
        <source src="/assets/video/hero-video.mp4" type="video/mp4">
      </video>
      <div class="hero-video-overlay"></div>
    </div>
    <div class="hero-content container">
      <div class="hero-headline-wrap">
        <h1 class="hero-headline hero-headline--line1">${heroContent.headline}</h1>
        <h1 class="hero-headline hero-headline--line2 gradient-text">${heroContent.gradientText}</h1>
      </div>
      <p class="hero-subtitle">${heroContent.subtitle}</p>
    </div>
  `;

  return section;
}

function buildMediaTicker() {
  const section = document.createElement('section');
  section.id = 'media-ticker';
  section.className = 'media-ticker-section';

  const half = Math.ceil(mediaLogos.length / 2);
  const row1 = mediaLogos.slice(0, half);
  const row2 = mediaLogos.slice(half);

  const tickerWrap1 = document.createElement('div');
  tickerWrap1.className = 'media-ticker-wrap';

  const tickerWrap2 = document.createElement('div');
  tickerWrap2.className = 'media-ticker-wrap media-ticker-wrap--row2';

  section.appendChild(tickerWrap1);
  section.appendChild(tickerWrap2);

  requestAnimationFrame(() => {
    createTicker(
      tickerWrap1,
      row1.map(l => ({
        html: `<img src="${resolveLogoPath(l)}" alt="${l.alt}" class="media-logo" ${l.displayHeight ? `style="height:${l.displayHeight}px"` : ''} loading="lazy">`,
      })),
      { direction: 'left', speed: 25, gap: '80px' }
    );
    createTicker(
      tickerWrap2,
      row2.map(l => ({
        html: `<img src="${resolveLogoPath(l)}" alt="${l.alt}" class="media-logo" ${l.displayHeight ? `style="height:${l.displayHeight}px"` : ''} loading="lazy">`,
      })),
      { direction: 'right', speed: 25, gap: '80px' }
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
        <h2 class="mission-main-text" data-animate="words">${missionContent.mainText}</h2>
        <p class="mission-secondary-text">${missionContent.secondaryText}</p>
        <a href="#clients" class="mission-cta">${missionContent.ctaText} <span class="mission-cta-arrow">→</span></a>
      </div>
    </div>
  `;

  return section;
}

function buildFeaturedCaseStudies() {
  const section = document.createElement('section');
  section.id = 'featured-case-studies';
  section.className = 'featured-cs-section section-padding';

  const featured = caseStudies.filter(cs => cs.featured).slice(0, 3);

  const cards = featured.map(cs => {
    const m = parseMetric(cs.metricHighlight || '');
    return `
      <div class="featured-cs-col">
        <a href="/case-studies/${cs.slug}" class="featured-cs-card">
          <div class="featured-cs-img-wrap">
            <img src="${cs.heroImage}" alt="${cs.alt}" class="featured-cs-img" loading="lazy" onerror="this.style.display='none'">
          </div>
          <div class="featured-cs-body">
            <div class="featured-cs-metric" data-value="${m.value}" data-prefix="${m.prefix}" data-suffix="${m.suffix}">
              <span class="featured-cs-metric-number">${m.prefix ? `<span class="featured-cs-metric-prefix">${m.prefix}</span>` : ''}0${m.suffix}</span>
              <span class="featured-cs-metric-label">${m.label}</span>
            </div>
            <h3 class="featured-cs-title">${cs.title.replace('Case study: ', '').replace('Case Study: ', '')}</h3>
            <p class="featured-cs-desc">${cs.description}</p>
            <span class="featured-cs-link">Read the full case study →</span>
          </div>
        </a>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <div class="container">
      ${createDivider('Case studies')}
      <h2 class="featured-cs-headline" data-animate="words">Our Results</h2>
      <div class="featured-cs-grid">
        ${cards}
      </div>
      <div class="featured-cs-cta-wrap">
        <a href="/results" class="featured-cs-cta">See All Campaigns →</a>
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
      clients.map(c => {
        const logoClass = c.noInvert ? 'client-logo client-logo--original' : 'client-logo';
        const logoHtml = `<img src="${resolveLogoPath(c)}" alt="${c.alt}" class="${logoClass}" style="height: ${c.displayHeight || 40}px" loading="lazy">`;
        if (c.caseStudyUrl) {
          return { html: `<a href="${c.caseStudyUrl}" class="client-logo-link">${logoHtml}</a>` };
        }
        return { html: logoHtml };
      }),
      { direction: 'right', speed: 30, gap: '64px' }
    );
  });

  return section;
}

function buildYouTube() {
  const section = document.createElement('section');
  section.id = 'youtube';
  section.className = 'youtube-section section-padding';

  const stats = [
    { value: 2500, suffix: '+', label: 'MEDIA PLACEMENTS' },
    { value: 100, suffix: '+', label: 'TOP-TIER OUTLETS' },
    { value: 15, suffix: '+', label: 'CLIENTS SERVED' },
  ];

  const statsHtml = stats.map((s, i) => `
    <div class="stats-panel-item">
      <span class="stats-panel-number stats-counter" data-value="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</span>
      <span class="stats-panel-label">${s.label}</span>
    </div>
    ${i < stats.length - 1 ? '<div class="stats-panel-divider"></div>' : ''}
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="video-stats-grid" data-animate="fade">
        <div class="youtube-embed-wrap">
          <iframe
            class="youtube-iframe"
            src="https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&autoplay=1&mute=1"
            title="Eden Communications video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
        <div class="stats-panel">
          <h3 class="stats-panel-heading">Performance by the Numbers</h3>
          ${statsHtml}
        </div>
      </div>
    </div>
  `;

  return section;
}

function buildServices() {
  const section = document.createElement('section');
  section.id = 'services';
  section.className = 'services-section section-padding';

  const cards = services.map((s, i) => `
    <a href="/services#${s.anchorId}" class="service-card" id="${s.anchorId}">
      <span class="service-card-number">0${i + 1}</span>
      <h3 class="service-card-title">${s.title}</h3>
      <p class="service-card-desc">${s.tagline}</p>
      <span class="service-card-arrow">→</span>
    </a>
  `).join('');

  section.innerHTML = `
    <div class="container">
      ${createDivider('Services')}
      <h2 class="services-headline" data-animate="words">What We Do</h2>
      <div class="services-grid">
        ${cards}
      </div>
      <div class="section-cta-wrap">
        <a href="/services" class="section-cta">Learn More About Our Services →</a>
      </div>
    </div>
  `;

  return section;
}

function buildCoverageCarousel() {
  const section = document.createElement('section');
  section.id = 'coverage';
  section.className = 'coverage-section section-padding';

  const tiles = coverageItems.map(item => `
    <a href="${item.externalUrl}" class="coverage-tile" target="_blank" rel="noopener noreferrer">
      <div class="coverage-tile-img-wrap">
        <img src="${item.screenshotImage}" alt="${item.title}" class="coverage-tile-img" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="coverage-tile-info">
        <span class="coverage-tile-pub">${item.publication}</span>
        <p class="coverage-tile-title">${item.title}</p>
      </div>
    </a>
  `).join('');

  section.innerHTML = `
    <div class="container">
      ${createDivider(newsHeading.sectionLabel)}
      <h2 class="coverage-headline" data-animate="words">${newsHeading.headline}</h2>
    </div>
    <div class="coverage-scroll-container">
      ${tiles}
    </div>
    <div class="container">
      <div class="coverage-cta-wrap">
        <a href="/recent-work" class="coverage-cta">See More Recent Coverage →</a>
      </div>
    </div>
  `;

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
          onerror="this.style.display='none';this.parentElement.classList.add('team-card-img-fallback');this.parentElement.setAttribute('data-initials','${member.name.split(' ').map(n=>n[0]).join('')}')"
        >
      </div>
      <div class="team-card-body">
        <p class="team-card-name">${member.name}</p>
        <p class="team-card-role">${member.role}</p>
        ${member.linkedin && member.linkedin.length > 0 ? `<a href="${member.linkedin}" class="team-card-linkedin" target="_blank" rel="noopener noreferrer" aria-label="${member.name} on LinkedIn" onclick="event.stopPropagation()">${LINKEDIN_ICON_SVG}</a>` : ''}
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
      <div class="section-cta-wrap">
        <a href="/about" class="section-cta">Meet the Full Team →</a>
      </div>
    </div>
  `;

  return section;
}

function buildTestimonials() {
  const section = document.createElement('section');
  section.id = 'testimonials';
  section.className = 'testimonials-section section-padding';

  const dots = testimonials.map((_, i) =>
    `<button class="testimonial-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
  ).join('');

  section.innerHTML = `
    <div class="container">
      <div class="testimonials-wrap">
        <div class="testimonials-slider">
          ${testimonials.map((t, i) => `
            <div class="testimonial-slide${i === 0 ? ' active' : ''}" data-index="${i}">
              <blockquote class="testimonial-quote">"${t.quote}"</blockquote>
              <div class="testimonial-author">
                <span class="testimonial-name">${t.name}</span>
                <span class="testimonial-title">${t.title}, ${t.company}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="testimonial-dots">${dots}</div>
      </div>
    </div>
  `;

  return section;
}

function buildContactForm() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildContactSection();
  return wrapper.firstElementChild;
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
        <div class="team-modal-tags"></div>
        <p class="team-modal-bio"></p>
        <a href="" class="team-modal-linkedin" target="_blank" rel="noopener noreferrer" style="display:none">${LINKEDIN_ICON_SVG} <span>View LinkedIn Profile</span></a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function openTeamModal(overlay, member) {
  const modalImg = overlay.querySelector('.team-modal-img');
  const modalPhoto = overlay.querySelector('.team-modal-photo');
  modalImg.style.display = '';
  modalPhoto.classList.remove('team-card-img-fallback');
  modalPhoto.removeAttribute('data-initials');
  modalImg.onerror = function() {
    this.style.display = 'none';
    modalPhoto.classList.add('team-card-img-fallback');
    modalPhoto.setAttribute('data-initials', member.name.split(' ').map(n => n[0]).join(''));
  };
  modalImg.src = member.photo;
  modalImg.alt = member.alt;
  overlay.querySelector('.team-modal-name').textContent = member.name;
  overlay.querySelector('.team-modal-role').textContent = member.role;
  overlay.querySelector('.team-modal-bio').textContent = member.bio || '';

  const tagsEl = overlay.querySelector('.team-modal-tags');
  if (member.expertise && member.expertise.length) {
    tagsEl.innerHTML = member.expertise.map(t => `<span class="team-tag">${t}</span>`).join('');
    tagsEl.style.display = '';
  } else {
    tagsEl.style.display = 'none';
  }

  const linkedinEl = overlay.querySelector('.team-modal-linkedin');
  if (member.linkedin) {
    linkedinEl.href = member.linkedin;
    linkedinEl.style.display = '';
  } else {
    linkedinEl.style.display = 'none';
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTeamModal(overlay) {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ─── Testimonial rotation ────────────────────────────────────────────────────

function initTestimonialRotation() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  // Auto-rotate every 7 seconds
  let interval = setInterval(() => {
    showSlide((current + 1) % total);
  }, 7000);

  // Dot click navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      showSlide(parseInt(dot.dataset.index, 10));
      interval = setInterval(() => {
        showSlide((current + 1) % total);
      }, 7000);
    });
  });
}

// ─── Init ────────────────────────────────────────────────────────────────────

function initHomepage() {
  const main = document.getElementById('home');
  if (!main) return;

  const sections = [
    buildHero(),
    buildMediaTicker(),
    buildMission(),
    buildFeaturedCaseStudies(),
    buildClients(),
    buildYouTube(),
    buildServices(),
    buildCoverageCarousel(),
    buildTeam(),
    buildTestimonials(),
    buildContactForm(),
    buildMarquee(),
  ];

  sections.forEach(s => main.appendChild(s));

  // Wire Lenis smooth scroll for anchor CTAs
  const scrollTargets = main.querySelectorAll('a[href="#clients"], a[href="#contact"]');
  scrollTargets.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('href');
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      }
    });
  });

  // Wire up all GSAP scroll animations
  initAnimations();

  // Metric counter animation
  animateCounters();

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

  // Testimonial auto-rotation
  initTestimonialRotation();

  // Contact form handling
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initHomepage);
