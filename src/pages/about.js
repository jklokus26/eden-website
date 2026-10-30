import '../styles/look-2026.css';
import '../styles/about-2026.css';
import { team } from '../../data/team.js';
import { aboutStory as STORY } from '../../data/site-content.js';
import { initContactForm } from '../components/contact-form.js';
import {
  pageHead, textLink, keepWords, bioDialog, initBios, buildContactBand, initReveal, initAnchors, initNavState,
} from '../components/look-2026.js';
import { sectionHead } from '../components/eden-kit.js';
import { initBoldPage } from '../components/eden-bold.js';

// About page, on the bold kit (DESIGN.md). The story is Eden's copy from the
// old page, verbatim (aboutStory in data/site-content.js); the team comes
// from data/team.js.


// The opening: "Our Story" as the label, Eden's credo (the story's last
// line) as the headline, one sentence to a line, and the rest of the story
// under it in two columns (pageHead's intro).
function buildOpening() {
  const credo = STORY[STORY.length - 1].split(/(?<=\.)\s+/);
  return pageHead({ label: 'Our Story', title: credo, lead: STORY.slice(0, -1), long: true });
}

// One person: portrait, then name, role, expertise and the links ("Read full
// bio" opens the shared bio dialog). The founder, first in data/team.js,
// leads on a row of her own with her short bio beside her; everyone else
// comes two to a row with no bio on the page, so rows stay even whatever
// the bios' lengths and however many people join (Alkida and Joseph are
// next, 2026-10-30).
function memberTile(m, i) {
  const lead = i === 0;
  const tags = (m.expertise || []).map(t => `<li>${t}</li>`).join('');
  const linkedin = m.linkedin
    ? textLink(m.linkedin, 'LinkedIn', ` target="_blank" rel="noopener noreferrer" aria-label="${m.name} on LinkedIn"`)
    : '';
  return `
    <li class="amember${lead ? ' amember--lead' : ''}" data-reveal style="--i: ${lead ? 0 : (i - 1) % 2}">
      <div class="member__photo amember__photo">
        <img src="${m.photo}" alt="${m.alt}" width="500" height="625" loading="lazy" decoding="async">
      </div>
      <div class="amember__info">
        <h3 id="member-${i}-name" class="t-h3 amember__name">${m.name}</h3>
        <p class="amember__role">${m.role}</p>
        ${tags ? `<ul class="t-label amember__tags">${tags}</ul>` : ''}
        <div class="amember__links">
          <button class="member__button amember__more text-link" type="button" data-index="${i}" aria-haspopup="dialog" aria-describedby="member-${i}-name"><span class="text-link__label">Read full bio</span></button>
          ${linkedin}
        </div>
      </div>
      ${lead ? `<p class="amember__bio">${keepWords(m.bioShort || m.bio)}</p>` : ''}
    </li>
  `;
}

// The team is the page's light chapter (white paper, near-black ink), opened
// with the kit's header like the homepage's team. The bio dialog sits
// outside the chapter so it keeps the dark look.
function buildTeam() {
  return `
    <div class="chapter">
      <section class="ateam" aria-labelledby="team-title">
        <div class="wrap">
          ${sectionHead({ label: 'Our Team', labelId: 'team-title' })}
          <ul class="ateam__grid">
            ${team.map(memberTile).join('')}
          </ul>
        </div>
      </section>
    </div>
    ${bioDialog()}
  `;
}

function initAboutPage() {
  const main = document.getElementById('about');
  if (!main) return;

  main.innerHTML = `
    ${buildOpening()}
    ${buildTeam()}
    ${buildContactBand()}
  `;

  initBoldPage(main);
  initReveal(main);
  initAnchors(main);
  initNavState();
  initBios(main, team);
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initAboutPage);
