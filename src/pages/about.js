import '../styles/gallery.css';
import '../styles/about.css';
import { team } from '../../data/team.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';
import { buildContactSection, initContactForm } from '../components/contact-form.js';

const LINKEDIN_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;

function buildAbout() {
  const main = document.getElementById('about');
  if (!main) return;

  const teamCards = team.map(member => {
    const initials = member.name.split(' ').map(n => n[0]).join('');
    const tags = (member.expertise || []).map(t =>
      `<span class="about-team-tag">${t}</span>`
    ).join('');

    return `
      <div class="about-team-card">
        <div class="about-team-photo-wrap">
          <img
            src="${member.photo}"
            alt="${member.alt}"
            class="about-team-photo"
            loading="lazy"
            onerror="this.style.display='none';this.parentElement.classList.add('team-card-img-fallback');this.parentElement.setAttribute('data-initials','${initials}')"
          >
        </div>
        <div class="about-team-info">
          <h3 class="about-team-name">${member.name}</h3>
          <p class="about-team-role">${member.role}</p>
          ${tags ? `<div class="about-team-tags">${tags}</div>` : ''}
          <p class="about-team-bio">${member.bioShort || member.bio}</p>
          ${member.linkedin ? `<a href="${member.linkedin}" class="about-team-linkedin" target="_blank" rel="noopener noreferrer" aria-label="${member.name} on LinkedIn">${LINKEDIN_ICON_SVG} <span>LinkedIn</span></a>` : ''}
        </div>
      </div>
    `;
  }).join('');

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider('About Us')}
        <h1 class="gallery-headline" data-animate="words">Our Story</h1>
      </div>
    </section>

    <section class="about-story section-padding">
      <div class="container">
        <div class="about-story-grid">
          <div class="about-story-text">
            <div class="about-story-body">
              <p>Eden is a strategic communications firm for companies at the frontier of finance and technology. We were built by operators, not agency people. Our founder came from the New York Post and ABC. Our team includes former leads from Meta, Google, Mastercard, Deloitte, and OKX.</p>
              <p>We started Eden because the old model is broken and the new one is incomplete. Traditional agencies charge bloated retainers, issue anemic press releases, and report metrics that don\u2019t connect to business outcomes. The \u201Cgo direct\u201D movement got a lot right \u2014 but a founder with a massive following and no institutional credibility will lose the enterprise deal.</p>
              <p>We\u2019re building something different. A firm run by operators who use every edge available \u2014 technology, newsroom instincts, and a network we\u2019ve spent years building \u2014 to move faster and hit harder than shops ten times our size.</p>
              <p>We work with institutional-grade companies including Ondo Finance, Stellar Development Foundation, Reed Smith, Wintermute Trading, and Cohen & Company Capital Markets, representing $10 billion in tokenized assets, trading volume, and capital markets value.</p>
              <p>We don\u2019t do awareness. We build credibility.</p>
            </div>
          </div>
          <div class="about-story-photo">
            <img src="/assets/images/team-group.jpg" alt="Eden Communications team" class="about-team-group-img" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <section class="about-team section-padding">
      <div class="container">
        ${createDivider('Our Team')}
        <h2 class="about-section-heading" data-animate="words">Our Team</h2>
        <div class="about-team-grid">
          ${teamCards}
        </div>
      </div>
    </section>

    ${buildContactSection()}
  `;
}

function initAboutPage() {
  buildAbout();
  initContactForm();
  initAnimations();
}

document.addEventListener('DOMContentLoaded', initAboutPage);
