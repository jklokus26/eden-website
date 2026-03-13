import '../styles/contact-form.css';
import { createDivider } from './section-divider.js';

/**
 * Build the shared contact form section.
 * Used on homepage, about, services, and results pages.
 */
export function buildContactSection() {
  return `
    <section class="contact-section section-padding" id="contact">
      <div class="container">
        ${createDivider('Contact')}
        <h2 class="contact-headline" data-animate="words">Let's Talk</h2>
        <form class="contact-form" action="https://formsubmit.co/ajax/hello@edencommunications.com" method="POST">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_subject" value="New inquiry from Eden website">
          <input type="hidden" name="referringPage" value="">
          <div class="contact-form-row">
            <div class="contact-field">
              <label for="contact-name">Name</label>
              <input type="text" id="contact-name" name="name" required placeholder="Your name">
            </div>
            <div class="contact-field">
              <label for="contact-email">Email</label>
              <input type="email" id="contact-email" name="email" required placeholder="you@company.com">
            </div>
          </div>
          <div class="contact-form-row">
            <div class="contact-field contact-field--full">
              <label for="contact-company">Company</label>
              <input type="text" id="contact-company" name="company" required placeholder="Company name">
            </div>
          </div>
          <div class="contact-field contact-field--full">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" required placeholder="Tell us about your project or inquiry..."></textarea>
          </div>
          <button type="submit" class="contact-submit">Let's Talk</button>
          <div class="contact-success" style="display:none">
            <p>Thanks for reaching out. We'll be in touch within 24 hours.</p>
          </div>
        </form>
      </div>
    </section>
  `;
}

/**
 * Initialize form submission handling.
 * Call after the form HTML is in the DOM.
 */
export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Set hidden referringPage field
  const hiddenField = form.querySelector('input[name="referringPage"]');
  if (hiddenField) hiddenField.value = window.location.href;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        form.style.display = 'none';
        const success = form.parentElement.querySelector('.contact-success') || form.querySelector('.contact-success');
        if (success) success.style.display = 'block';
      }
    } catch (err) {
      // Silently fail — form still submits via browser default
    }
  });
}
