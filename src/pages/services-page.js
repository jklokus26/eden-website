import '../styles/gallery.css';
import '../styles/services-page.css';
import '../styles/about.css';
import { services, servicesFaq } from '../../data/services.js';
import { createDivider } from '../components/section-divider.js';
import { initAnimations } from '../animations.js';
import { buildContactSection, initContactForm } from '../components/contact-form.js';

function buildServicesPage() {
  const main = document.getElementById('services-page');
  if (!main) return;

  const pillars = services.map(s => {
    const subItems = s.subServices.map(sub =>
      `<li class="services-sub-item">
        <strong>${sub.name}:</strong> ${sub.description}
      </li>`
    ).join('');

    return `
      <div class="services-pillar" id="${s.anchorId}">
        <h3 class="services-pillar-title">${s.title}</h3>
        <p class="services-pillar-intro">${s.intro}</p>
        <ol class="services-sub-list">
          ${subItems}
        </ol>
      </div>
    `;
  }).join('');

  const faqItems = servicesFaq.map((item, i) => `
    <div class="services-faq-item">
      <button class="services-faq-q" aria-expanded="false" aria-controls="faq-answer-${i}" data-faq="${i}">
        <span>${item.question}</span>
        <span class="services-faq-icon">+</span>
      </button>
      <div class="services-faq-a" id="faq-answer-${i}">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  main.innerHTML = `
    <section class="gallery-hero section-padding">
      <div class="container">
        ${createDivider('Services')}
        <h1 class="gallery-headline" data-animate="words">What we do</h1>
      </div>
    </section>

    <section class="services-content section-padding">
      <div class="container">
        <div class="services-intro-text">
          <p>Eden offers four integrated service pillars. Each is designed to work independently or as part of a unified communications strategy tailored to your company's goals, stage, and market position.</p>
        </div>
        ${pillars}
      </div>
    </section>

    <section class="services-faq-section section-padding">
      <div class="container">
        ${createDivider('FAQ')}
        <h2 class="services-faq-headline" data-animate="words">Frequently asked questions</h2>
        <div class="services-faq">
          ${faqItems}
        </div>
      </div>
    </section>

    ${buildContactSection()}
  `;

  initFaqAccordion();
}

function initFaqAccordion() {
  document.querySelectorAll('.services-faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.faq;
      const answer = document.getElementById(`faq-answer-${index}`);
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.services-faq-q').forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.querySelector('.services-faq-icon').textContent = '+';
      });
      document.querySelectorAll('.services-faq-a').forEach(a => {
        a.style.maxHeight = null;
      });

      // Toggle clicked
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.services-faq-icon').textContent = '\u2212';
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function initServicesPage() {
  buildServicesPage();
  initContactForm();

  // Handle anchor scroll from homepage service cards
  if (window.location.hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }

  initAnimations();
}

document.addEventListener('DOMContentLoaded', initServicesPage);
