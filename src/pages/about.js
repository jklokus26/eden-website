import '../styles/look-2026.css';
import '../styles/about-2026.css';
import { team } from '../../data/team.js';
import { initContactForm } from '../components/contact-form.js';
import {
  pageHead, textLink, bioDialog, initBios, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';

// About page, Oct 2026 look (DESIGN.md). The story is Eden's copy from the
// old page, verbatim; the team comes from data/team.js.

const STORY = [
  'Eden is a strategic communications firm for companies at the frontier of finance and technology. We were built by operators, not agency people. Our founder came from the New York Post and ABC. Our team includes former leads from Meta, Google, Mastercard, Deloitte, and OKX.',
  'We started Eden because the old model is broken and the new one is incomplete. Traditional agencies charge bloated retainers, issue anemic press releases, and report metrics that don’t connect to business outcomes. The “go direct” movement got a lot right — but a founder with a massive following and no institutional credibility will lose the enterprise deal.',
  'We’re building something different. A firm run by operators who use every edge available — technology, newsroom instincts, and a network we’ve spent years building — to move faster and hit harder than shops ten times our size.',
  'We work with institutional-grade companies including Ondo Finance, Stellar Development Foundation, Reed Smith, Wintermute Trading, and Cohen & Company Capital Markets, representing $10 billion in tokenized assets, trading volume, and capital markets value.',
  'We don’t do awareness. We build credibility.',
];

// The story in one reading column; its last line closes it a size larger.
function buildStory() {
  const closing = STORY[STORY.length - 1];
  return `
    <section class="astory">
      <div class="wrap astory__grid">
        <div class="astory__body" data-reveal>
          ${STORY.slice(0, -1).map(p => `<p>${p}</p>`).join('')}
          <p class="astory__close">${closing}</p>
        </div>
      </div>
    </section>
  `;
}

// A portrait card with everything the old card showed (photo, name, role,
// expertise, short bio, LinkedIn) plus "Read full bio", which opens the
// shared bio dialog. On laptops and tablets the cards share rows (subgrid)
// so names, expertise and bios line up whatever the number of people.
function memberTile(m, i) {
  const tags = (m.expertise || []).map(t => `<li>${t}</li>`).join('');
  const linkedin = m.linkedin
    ? textLink(m.linkedin, 'LinkedIn', ` target="_blank" rel="noopener noreferrer" aria-label="${m.name} on LinkedIn"`)
    : '';
  return `
    <li class="amember" data-reveal style="--i: ${i % 3}">
      <div class="member__photo amember__photo">
        <img src="${m.photo}" alt="${m.alt}" width="500" height="625" loading="lazy" decoding="async">
      </div>
      <h3 id="member-${i}-name" class="t-card amember__name">${m.name}</h3>
      <p class="amember__role">${m.role}</p>
      ${tags ? `<ul class="t-label amember__tags">${tags}</ul>` : '<span aria-hidden="true"></span>' /* keeps the card's rows in step */}
      <div class="amember__text">
        <p class="amember__bio">${m.bioShort || m.bio}</p>
        <div class="amember__links">
          <button class="member__button amember__more" type="button" data-index="${i}" aria-haspopup="dialog" aria-describedby="member-${i}-name"><span class="text-link__label">Read full bio</span></button>
          ${linkedin}
        </div>
      </div>
    </li>
  `;
}

function buildTeam() {
  return `
    <section class="ateam" aria-labelledby="team-title">
      <div class="wrap">
        <h2 id="team-title" class="t-h2 ateam__title" data-reveal>Our Team</h2>
        <ul class="ateam__grid">
          ${team.map(memberTile).join('')}
        </ul>
      </div>
      ${bioDialog()}
    </section>
  `;
}

function initAboutPage() {
  const main = document.getElementById('about');
  if (!main) return;

  main.innerHTML = `
    ${pageHead({ label: 'About Us', title: 'Our Story' })}
    ${buildStory()}
    ${buildTeam()}
    ${buildContactBand()}
  `;

  initReveal(main);
  initAnchors(main);
  initNavState();
  initBios(main, team);
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initAboutPage);
