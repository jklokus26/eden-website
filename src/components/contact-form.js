import '../styles/contact-form.css';
import { createDivider } from './section-divider.js';

// FormSubmit activates each web address separately. A submit from any other
// address (Vercel previews, localhost) sends an "activate this form" email to
// hello@ instead of delivering, so the form only sends from the live site.
const LIVE_HOSTS = ['edencommunications.com', 'www.edencommunications.com'];

const ERROR_TEXT = 'Something went wrong. Please try again or email us directly at hello@edencommunications.com';
const PREVIEW_TEXT = 'Preview only: this form sends from the live site, so nothing was sent.';
const SUCCESS_TEXT = 'Thanks for reaching out. We\'ll be in touch within 24 hours.';

/**
 * Build the shared contact form section.
 * Used on homepage, about, services, and results pages.
 * The homepage passes { id: 'contact-form', headline: false } because its
 * contact band above the form already carries the heading.
 */
export function buildContactSection({ id = 'contact', headline = true } = {}) {
  const heading = headline
    ? `${createDivider('Contact')}
        <h2 class="contact-headline" data-animate="words">Let's Talk</h2>`
    : '';
  return `
    <section class="contact-section section-padding" id="${id}"${headline ? '' : ' aria-label="Contact form"'}>
      <div class="container">
        ${heading}
        <form class="contact-form" action="https://formsubmit.co/ajax/hello@edencommunications.com" method="POST">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_subject" value="New inquiry from Eden website">
          <input type="hidden" name="referringPage" value="">
          <input type="text" name="_honey" class="contact-honey" tabindex="-1" autocomplete="off" aria-hidden="true">
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
          <p class="contact-error" role="alert"></p>
        </form>
        <div class="contact-success" role="status" tabindex="-1"></div>
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

  const button = form.querySelector('.contact-submit');
  const buttonLabel = button ? button.textContent : '';
  const errMsg = form.querySelector('.contact-error');
  const success = form.parentElement.querySelector('.contact-success');

  // The status and alert regions stay in the page and start empty; filling
  // them is what makes screen readers announce the message.
  const showError = (text) => {
    if (errMsg) errMsg.textContent = text;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errMsg) errMsg.textContent = '';

    if (!LIVE_HOSTS.includes(window.location.hostname)) {
      showError(PREVIEW_TEXT);
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      // FormSubmit can answer HTTP 200 with success "false" (e.g. a form that
      // still needs activation), so the JSON flag decides, not the status code.
      const result = await response.json().catch(() => ({}));
      const delivered = response.ok && String(result.success) === 'true';
      if (!delivered) throw new Error(result.message || `HTTP ${response.status}`);

      form.hidden = true;
      if (success) {
        success.innerHTML = `<p>${SUCCESS_TEXT}</p>`;
        success.focus();
      }
    } catch (err) {
      showError(ERROR_TEXT);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = buttonLabel;
      }
    }
  });
}
