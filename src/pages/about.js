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
          <p class="about-team-bio">${member.bio}</p>
          ${member.linkedin ? `<a href="${member.linkedin}" class="about-team-linkedin" target="_blank" rel="noopener noreferrer" aria-label="${member.name} on LinkedIn">${LINKEDIN_ICON_SVG} <span>LinkedIn</span></a>` : ''}
        </div>
      </div>
    `;
  }).join('');

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider('About Us')}
        <h1 class="gallery-headline" data-animate="words">The team behind your next headline.</h1>
      </div>
    </section>

    <section class="about-story section-padding">
      <div class="container">
        <h2 class="about-section-heading" data-animate="words">Our Story</h2>
        <div class="about-story-body">
          <p>Eden was founded by Ebony Lewkovitz, a former Washington correspondent for the New York Post and journalist at ABC News and Al Jazeera, who saw an industry stuck in an outdated model. Traditional agencies were bloated, slow, and disconnected from the companies reshaping finance and technology.</p>
          <p>Eden was built to fix that: a lean team that earns tier-one coverage for the companies defining the future of money, markets, and technology.</p>
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
