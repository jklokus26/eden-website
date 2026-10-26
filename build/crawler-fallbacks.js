// Full-text fallbacks for crawlers that don't run JavaScript (most AI
// crawlers: GPTBot, ClaudeBot, PerplexityBot). The pages draw their content
// with JavaScript, so without this those crawlers only saw a short summary.
// At build time this writes each page's complete content into the <noscript>
// inside its <main>, from the same data files the page renders, so the two
// never drift apart. People with JavaScript never see it.
import { caseStudies, relatedFor } from '../data/case-studies.js';
import { coverageItems } from '../data/coverage.js';
import { dinnersPage } from '../data/dinners.js';
import { team } from '../data/team.js';
import { aboutStory, caseStudiesPageHeadline, homeWhatWeDo } from '../data/site-content.js';
import { services, servicesFaq, servicesIntro } from '../data/services.js';

const SITE = 'https://edencommunications.com';
const CONTACT = '<p>Contact: <a href="mailto:hello@edencommunications.com">hello@edencommunications.com</a> | 600 Lexington Avenue, New York, NY 10022</p>';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const client = (cs) => cs.title.replace(/^Case [Ss]tudy:\s*/, '');
const isoToText = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function metricsList(metrics = []) {
  if (!metrics.length) return '';
  return `<ul>${metrics.map(m => `<li>${esc(m.number)} ${esc(m.label)}</li>`).join('')}</ul>`;
}

function caseStudy(cs) {
  const related = relatedFor(cs);
  return `
      <article>
        <p>Case Study</p>
        <h1>${esc(client(cs))}</h1>
        <p>${esc(cs.subtitle)}</p>
        <p>Service: ${esc(cs.service)} | Industry: ${esc(cs.industries)}</p>
        ${cs.bodyHtml.replace(/<(\/?)h3>/g, '<$1h2>')}
        <h2>By the numbers</h2>
        ${metricsList(cs.metrics)}
        ${related.length ? `<h2>More case studies</h2><ul>${related.map(r => `<li><a href="${SITE}/case-studies/${r.slug}">${esc(client(r))}: ${esc(r.subtitle)}</a></li>`).join('')}</ul>` : ''}
        <p><a href="${SITE}/results">All case studies and results</a></p>
        ${CONTACT}
      </article>`;
}

function results() {
  return `
      <article>
        <h1>${esc(caseStudiesPageHeadline)}</h1>
        ${caseStudies.map(cs => `
        <h2><a href="${SITE}/case-studies/${cs.slug}">${esc(client(cs))}</a></h2>
        <p>${esc(cs.subtitle)}</p>
        ${metricsList(cs.metrics)}`).join('')}
        <h2><a href="${SITE}/silvia">Silvia</a></h2>
        <p>Bringing a personal AI CFO into the media conversation</p>
        ${CONTACT}
      </article>`;
}

function recentWork() {
  return `
      <article>
        <h1>Our clients' wins</h1>
        <ul>${coverageItems.map(c => `
          <li>${esc(c.publication)}, ${isoToText(c.datePublished)}, for ${esc(c.client)}: ${c.externalUrl ? `<a href="${c.externalUrl}">${esc(c.title)}</a>` : esc(c.title)}${c.summary ? `. ${esc(c.summary)}` : ''}</li>`).join('')}
        </ul>
        ${CONTACT}
      </article>`;
}

function dinners() {
  const r = dinnersPage.results;
  return `
      <article>
        <p>${esc(dinnersPage.sectionLabel)}</p>
        <h1>${esc(dinnersPage.headline)}</h1>
        ${dinnersPage.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
        ${r?.dinners?.length ? `<h2>${esc(r.heading)}</h2>${r.dinners.map(d => `
        <h3>${esc(d.name)}</h3>
        <p>${d.stats.map(s => `${esc(s.value)} ${esc(s.label)}`).join(', ')} ${esc(d.outlets)}</p>`).join('')}` : ''}
        ${r?.quote ? `<blockquote><p>${esc(r.quote.text)}</p><p>${esc(r.quote.name)}, ${esc(r.quote.outlet)}</p></blockquote>` : ''}
        ${CONTACT}
      </article>`;
}

function about() {
  return `
      <article>
        <h1>Our Story</h1>
        ${aboutStory.map(p => `<p>${esc(p)}</p>`).join('')}
        <h2>Our Team</h2>
        ${team.map(m => `
        <h3>${esc(m.name)}, ${esc(m.role)}</h3>
        ${m.expertise?.length ? `<p>Expertise: ${m.expertise.map(esc).join(', ')}</p>` : ''}
        <p>${esc(m.bio)}</p>
        ${m.linkedin ? `<p><a href="${m.linkedin}">${esc(m.name)} on LinkedIn</a></p>` : ''}`).join('')}
        ${CONTACT}
      </article>`;
}

function servicesPage() {
  return `
      <article>
        <h1>What we do</h1>
        ${servicesIntro.map(p => `<p>${esc(p)}</p>`).join('')}
        ${services.map((s, i) => `
        <section id="${s.anchorId}">
          <p>${esc(homeWhatWeDo.pillars[i]?.number || '')} ${esc(homeWhatWeDo.pillars[i]?.title || '')}</p>
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.tagline)}</p>
          <p>${esc(s.intro)}</p>
          <ol>${s.subServices.map(sub => `<li>${esc(sub.name)}: ${esc(sub.description)}</li>`).join('')}</ol>
        </section>`).join('')}
        <h2>Frequently asked questions</h2>
        ${servicesFaq.map(q => `
        <h3>${esc(q.question)}</h3>
        <p>${esc(q.answer)}</p>`).join('')}
        ${CONTACT}
      </article>`;
}

// The FAQ's structured data, from the same six questions the page shows
// (search engines require marked-up questions to be visible on the page).
function servicesFaqSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: servicesFaq.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }, null, 2);
}

// Page (path from the project root) -> its fallback.
const PAGES = {
  'about/index.html': about,
  'results/index.html': results,
  'recent-work/index.html': recentWork,
  'dinners/index.html': dinners,
  'services/index.html': servicesPage,
  ...Object.fromEntries(caseStudies.map(cs => [`case-studies/${cs.slug}.html`, () => caseStudy(cs)])),
};

const MAIN_NOSCRIPT = /(<main\b[^>]*>\s*)<noscript>[\s\S]*?<\/noscript>/;

export const crawlerFallbacks = {
  name: 'crawler-fallbacks',
  transformIndexHtml(html, ctx) {
    const file = ctx.filename.replace(/\\/g, '/');
    let out = html;
    if (file.endsWith('/services/index.html')) {
      out = out.replace(/<script type="application\/ld\+json">\s*\{[^<]*?"@type": "FAQPage"[\s\S]*?<\/script>/,
        `<script type="application/ld+json">\n${servicesFaqSchema()}\n</script>`);
    }
    const page = Object.keys(PAGES).find(p => file.endsWith(`/${p}`));
    if (!page || !MAIN_NOSCRIPT.test(out)) return out;
    return out.replace(MAIN_NOSCRIPT, (_, open) => `${open}<noscript>${PAGES[page]()}\n    </noscript>`);
  },
};
