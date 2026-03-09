const EDEN_LOGO_SVG = `<svg viewBox="0 0 105 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="nav-logo" aria-label="Eden Communications">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M48 -3.05176e-05H43V14.2012C43 15.0345 42.0204 15.525 41.2916 15.1211C39.4273 14.0881 37.2823 13.5 35 13.5C27.8203 13.5 22 19.3203 22 26.5C22 33.6797 27.8203 39.5 35 39.5C37.2986 39.5 39.4578 38.9034 41.3313 37.8567C43.1018 36.8675 45.0023 36 47.0304 36H48V-3.05176e-05ZM43 26.5C43 22.0817 39.4183 18.5 35 18.5C30.5817 18.5 27 22.0817 27 26.5C27 30.9182 30.5817 34.5 35 34.5C39.4183 34.5 43 30.9182 43 26.5Z" fill="white"/>
  <path d="M0 9.49997H20.5V14.5H6.5C5.94771 14.5 5.5 14.9477 5.5 15.5V20.5C5.5 21.0522 5.94771 21.5 6.5 21.5H18.5V26.5H6.5C5.94771 26.5 5.5 26.9477 5.5 27.5V33C5.5 33.5522 5.94771 34 6.5 34H20.5V39H0V9.49997Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M65 39.5C69.1174 39.5 72.7877 37.5858 75.1696 34.5988L71.3079 31.421C69.8437 33.2951 67.5625 34.5 65 34.5C63.0084 34.5 61.1868 33.7722 59.7866 32.5682L75.0811 23.8123C75.9067 23.3396 76.2966 22.3451 75.9156 21.4735C73.9603 17.0009 70.1748 13.5 65 13.5C57.8203 13.5 52 19.3203 52 26.5C52 33.6797 57.8203 39.5 65 39.5ZM70 21L57.2005 28.2876C57.0693 27.7129 57 27.1145 57 26.5C57 22.0817 60.5817 19 65 19C67.1108 19 68.5704 19.6643 70 21Z" fill="white"/>
  <path d="M86.5287 13.9846C88.1051 13.3345 89.7943 13 91.5 13C93.2057 13 94.8949 13.3345 96.4713 13.9846C98.0478 14.6348 99.4809 15.588 100.689 16.7904C101.896 17.9929 102.855 19.421 103.509 20.9935C104.163 22.566 104.5 24.2518 104.5 25.9545V39H99.5V25.9545C99.5 24.9114 99.2937 23.8783 98.8925 22.914C98.4913 21.9497 97.903 21.0728 97.1607 20.3336C96.4183 19.5945 95.5364 19.0076 94.565 18.6069C93.5936 18.2063 92.5521 18 91.5 18C90.4479 18 89.4064 18.2063 88.435 18.6069C87.4636 19.0076 86.5817 19.5945 85.8393 20.3336C85.0969 21.0728 84.5087 21.9497 84.1075 22.914C83.7063 23.8783 83.5 24.9114 83.5 25.9545V39L78.5 39L78.5 25.9545C78.5 24.2518 78.8368 22.566 79.491 20.9935C80.1452 19.421 81.1038 17.9929 82.3115 16.7904C83.5191 15.588 84.9522 14.6348 86.5287 13.9846Z" fill="white"/>
</svg>`;

const INSTAGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;

const LINKEDIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;

function getActiveClass(href) {
  const path = window.location.pathname;
  if (href === '/' && (path === '/' || path === '/index.html')) return ' active';
  if (href !== '/' && path.startsWith(href)) return ' active';
  return '';
}

function updateClock(el) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  el.textContent = `NYC ${fmt.format(new Date())}`;
}

export function initNav() {
  const navEl = document.getElementById('nav');
  if (!navEl) return;

  navEl.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-logo-link" aria-label="Eden Communications home">
        ${EDEN_LOGO_SVG}
      </a>
      <div class="nav-links">
        <a href="/" class="nav-link${getActiveClass('/')}">Home</a>
        <a href="/case-studies" class="nav-link${getActiveClass('/case-studies')}">Case Studies</a>
      </div>
      <div class="nav-right">
        <span class="nav-clock" aria-label="Current time in New York"></span>
      </div>
      <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile-overlay" aria-hidden="true">
      <div class="nav-mobile-links">
        <a href="/" class="nav-mobile-link${getActiveClass('/')}">Home</a>
        <a href="/case-studies" class="nav-mobile-link${getActiveClass('/case-studies')}">Case Studies</a>
      </div>
    </div>
  `;

  // Clock
  const clockEl = navEl.querySelector('.nav-clock');
  updateClock(clockEl);
  setInterval(() => updateClock(clockEl), 60000);

  // Hamburger toggle
  const hamburger = navEl.querySelector('.nav-hamburger');
  const overlay = navEl.querySelector('.nav-mobile-overlay');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('nav-open', open);
  });

  // Close overlay on link click
  overlay.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}
