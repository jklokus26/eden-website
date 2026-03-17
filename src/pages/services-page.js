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

  const pillars = services.map((s, i) => {
    const subItems = s.subServices.map(sub =>
      `<li class="services-sub-item">
        <strong>${sub.name}:</strong> ${sub.description}
      </li>`
    ).join('');

    return `
      <div class="services-pillar" id="${s.anchorId}">
        <button class="services-pillar-header" aria-expanded="false" data-pillar="${i}">
          <div class="services-pillar-header-text">
            <h3 class="services-pillar-title">${s.title}</h3>
            <span class="services-pillar-tagline">${s.tagline}</span>
          </div>
          <span class="services-pillar-icon">+</span>
        </button>
        <div class="services-pillar-body">
          <p class="services-pillar-intro">${s.intro}</p>
          <ol class="services-sub-list">
            ${subItems}
          </ol>
        </div>
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
          <p>Your stakeholders don\u2019t live in one place. Your investors read Bloomberg. Your developers follow crypto Twitter. And the deal that changes your trajectory might close over dinner, not over email.</p>
          <p>Eden operates across every surface where credibility is built and deals get done. Our three practice areas are designed to reinforce each other, because credibility compounds only when every surface is working.</p>
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
  initPillarAccordion();
}

function initPillarAccordion() {
  document.querySelectorAll('.services-pillar-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const pillar = btn.closest('.services-pillar');
      const isOpen = pillar.classList.contains('services-pillar--open');

      // Close all pillars
      document.querySelectorAll('.services-pillar').forEach(p => {
        p.classList.remove('services-pillar--open');
        p.querySelector('.services-pillar-header').setAttribute('aria-expanded', 'false');
        p.querySelector('.services-pillar-icon').textContent = '+';
        const body = p.querySelector('.services-pillar-body');
        body.style.maxHeight = null;
      });

      // Toggle clicked (open if was closed)
      if (!isOpen) {
        pillar.classList.add('services-pillar--open');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.services-pillar-icon').textContent = '\u2212';
        const body = pillar.querySelector('.services-pillar-body');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
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

  // Handle anchor scroll from homepage service cards — auto-expand target pillar
  if (window.location.hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(window.location.hash);
      if (target && target.classList.contains('services-pillar')) {
        // Auto-expand the target pillar
        const header = target.querySelector('.services-pillar-header');
        if (header && !target.classList.contains('services-pillar--open')) {
          header.click();
        }
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }

  initAnimations();
}

document.addEventListener('DOMContentLoaded', initServicesPage);
