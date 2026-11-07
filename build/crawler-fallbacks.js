// Full-text copies of each page for crawlers and AI tools that don't run
// JavaScript (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, and the page
// readers behind "read this link" in AI assistants). The pages draw their
// content with JavaScript, so without this those readers saw an empty page.
// At build time this writes each page's complete content into its <main>,
// from the same data files the page renders, so the two never drift apart.
//
// The copy sits in a plain <div class="crawler-copy">, hidden by a style in
// the head and removed by src/main.js before the page draws itself, so
// people never see it and Google's rendered page doesn't contain it. Until
// 2026-11-07 it sat in a <noscript>, but Mozilla Readability (used by many AI
// page readers) and Claude's own web fetch drop <noscript>, and read 0 words
// on every page but Silvia's. A <noscript> style in the head still shows the
// copy to the rare visitor who has JavaScript off.
//
// Also built here: the sitemap (every page, Recent Work dated by its newest
// article), llms-full.txt (every page's copy as one text file for AI tools),
// and the structured data that comes from data files (team, services, case
// study list, FAQ).
import { dirname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { caseStudies, relatedFor, silviaStory } from '../data/case-studies.js';
import { coverageItems } from '../data/coverage.js';
import { dinnersPage } from '../data/dinners.js';
import { team } from '../data/team.js';
import { clientStrip } from '../data/clients.js';
import { testimonials } from '../data/testimonials.js';
import {
  aboutStory, caseStudiesPageHeadline, homeWhatWeDo, homeHero, homeProof, homeIndustries,
  homeDinners, homeContactBand, navLinks,
} from '../data/site-content.js';
import { services, servicesFaq, servicesIntro } from '../data/services.js';
import { escapeHtml, safeUrl } from '../src/components/escape.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://edencommunications.com';
const ORG_ID = `${SITE}/#organization`;
// How a page that doesn't carry the full organization (the homepage does) points to it.
const ORG_REF = { '@type': 'Organization', '@id': ORG_ID, name: 'Eden Communications', url: `${SITE}/` };
const CONTACT = '<p>Contact: <a href="mailto:hello@edencommunications.com">hello@edencommunications.com</a> | +1 (201) 279-5403 | 600 Lexington Avenue, New York, NY 10022</p>';

// The copy is live markup (not a <noscript>), and Recent Work's data comes
// from Eden's coverage sheet, so text and links go through the page's own
// escaping: a link is kept only when it is http(s).
const esc = escapeHtml;
const client = (cs) => cs.title.replace(/^Case [Ss]tudy:\s*/, '');
const personId = (m) => `${SITE}/about#${m.name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '')}`;
const isoToText = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// The site's links, which the nav and footer give people (both drawn with
// JavaScript), so a crawler can reach every page from any page.
function siteLinks() {
  const pages = [{ label: 'Home', href: '/' }, ...navLinks, { label: 'Silvia client story', href: '/silvia' }];
  return `
        <nav aria-label="Site">
          <ul>${pages.map(l => `<li><a href="${SITE}${l.href === '/' ? '/' : l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
          <p>Case studies:</p>
          <ul>${caseStudies.map(cs => `<li><a href="${SITE}/case-studies/${cs.slug}">${esc(client(cs))}</a></li>`).join('')}</ul>
        </nav>`;
}

// Same three stories the homepage's Selected work shows (src/pages/home.js
// buildWork): the featured case studies, Silvia's taking the second spot
// once it has figures.
function featuredWork() {
  const featured = caseStudies.filter(cs => cs.featured).map(cs => ({
    href: `${SITE}/case-studies/${cs.slug}`, client: client(cs), title: cs.cardTitle || cs.subtitle, metrics: cs.metrics || [],
  }));
  if (silviaStory.metrics?.length) {
    featured.splice(1, 1, { href: `${SITE}${silviaStory.href}`, client: silviaStory.client, title: silviaStory.title, metrics: silviaStory.metrics });
  }
  return featured.slice(0, 3);
}

function home() {
  const proof = homeProof.map(p => `${p.value.toLocaleString('en-US')}${p.suffix} ${p.label.charAt(0).toLowerCase()}${p.label.slice(1)}`).join(' | ');
  return `
      <article>
        <h1>Eden Communications: ${esc(homeHero.tagline.charAt(0).toLowerCase() + homeHero.tagline.slice(1))}</h1>
        <h2>${esc(homeHero.headline)}</h2>
        <p>${esc(homeHero.positioning.lead)} ${esc(homeHero.positioning.emphasis)}.</p>
        <p>${esc(homeHero.body)}</p>
        <p>Eden Communications is a strategic communications firm headquartered at 600 Lexington Avenue, New York, NY 10022.</p>
        <p>${esc(proof)}</p>
        <h2>Clients</h2>
        <p>${clientStrip.map(c => esc(c.name)).join(', ')}</p>
        <h2>${esc(homeWhatWeDo.sectionLabel)}</h2>
        <p>${esc(homeWhatWeDo.headline)}</p>
        <p>${esc(homeWhatWeDo.body)}</p>
        <ol>${homeWhatWeDo.pillars.map(p => `<li>${esc(p.title)}: ${esc(p.text)}</li>`).join('')}</ol>
        <p><a href="${SITE}/services">Services</a></p>
        <h2>${esc(homeIndustries.sectionLabel)}</h2>
        <ul>${homeIndustries.items.map(i => `<li>${esc(i.name)}: ${i.areas.map(esc).join(', ')}</li>`).join('')}</ul>
        <h2>Selected work</h2>
        ${featuredWork().map(w => `
        <h3><a href="${w.href}">${esc(w.client)}: ${esc(w.title)}</a></h3>
        ${metricsList(w.metrics)}`).join('')}
        <p><a href="${SITE}/results">All case studies and results</a> | <a href="${SITE}/recent-work">Recent client coverage</a></p>
        <h2>What clients say</h2>
        ${testimonials.map(t => `<blockquote><p>${esc(t.quote)}</p><p>${esc(t.name)}, ${esc(t.title)}, ${esc(t.company)}</p></blockquote>`).join('')}
        <h2>${esc(homeDinners.sectionLabel)}</h2>
        <p>${esc(homeDinners.headline)}</p>
        ${homeDinners.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
        <p><a href="${SITE}/dinners">Private dinners</a></p>
        <h2>The team</h2>
        <ul>${team.map(m => `<li>${esc(m.name)}, ${esc(m.role)}</li>`).join('')}</ul>
        <p><a href="${SITE}/about">About Eden and the team</a></p>
        <h2>${esc(homeContactBand.headline)}</h2>
        <p>${esc(homeContactBand.body)}</p>
        ${CONTACT}${siteLinks()}
      </article>`;
}

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
        ${CONTACT}${siteLinks()}
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
        ${CONTACT}${siteLinks()}
      </article>`;
}

function recentWork() {
  return `
      <article>
        <h1>Our clients' wins</h1>
        <ul>${coverageItems.map(c => `
          <li>${esc(c.publication)}, ${isoToText(c.datePublished)}, for ${esc(c.client)}: ${safeUrl(c.externalUrl) ? `<a href="${safeUrl(c.externalUrl)}">${esc(c.title)}</a>` : esc(c.title)}${c.summary ? `. ${esc(c.summary)}` : ''}</li>`).join('')}
        </ul>
        ${CONTACT}${siteLinks()}
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
        ${CONTACT}${siteLinks()}
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
        ${safeUrl(m.linkedin) ? `<p><a href="${safeUrl(m.linkedin)}">${esc(m.name)} on LinkedIn</a></p>` : ''}`).join('')}
        ${CONTACT}${siteLinks()}
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
        ${CONTACT}${siteLinks()}
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

// Team members as people, with stable ids the organization's founder points
// to (homepage and About). Names, roles, bios, expertise, portraits and
// LinkedIn all from data/team.js, as the pages show them.
function peopleSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': team.map(m => ({
      '@type': 'Person',
      '@id': personId(m),
      name: m.name,
      jobTitle: m.role,
      worksFor: ORG_REF,
      ...(m.photo ? { image: `${SITE}${m.photo}` } : {}),
      ...(m.bio ? { description: m.bio } : {}),
      ...(m.expertise?.length ? { knowsAbout: m.expertise } : {}),
      ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    })),
  }, null, 2);
}

// The three services as the Services page shows them, offered by Eden.
function servicesSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': services.map(s => ({
      '@type': 'Service',
      '@id': `${SITE}/services#${s.anchorId}`,
      name: s.title,
      description: s.tagline,
      url: `${SITE}/services#${s.anchorId}`,
      provider: ORG_REF,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: s.title,
        itemListElement: s.subServices.map(sub => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: sub.name, description: sub.description } })),
      },
    })),
  }, null, 2);
}

// Our Results lists Silvia's story, then the case studies, in page order.
function resultsSchema() {
  const items = [
    { name: 'Silvia: Bringing a personal AI CFO into the media conversation', url: `${SITE}/silvia` },
    ...caseStudies.map(cs => ({ name: `${client(cs)}: ${cs.subtitle}`, url: `${SITE}/case-studies/${cs.slug}` })),
  ];
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: caseStudiesPageHeadline,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
  }, null, 2);
}

// Page (path from the project root) -> its crawler copy.
const PAGES = {
  'index.html': home,
  'about/index.html': about,
  'results/index.html': results,
  'recent-work/index.html': recentWork,
  'dinners/index.html': dinners,
  'services/index.html': servicesPage,
  ...Object.fromEntries(caseStudies.map(cs => [`case-studies/${cs.slug}.html`, () => caseStudy(cs)])),
};

// Structured data built from data files, added to these pages' heads.
const SCHEMA = {
  'index.html': [peopleSchema],
  'about/index.html': [peopleSchema],
  'services/index.html': [servicesSchema],
  'results/index.html': [resultsSchema],
};

// The page shell's placeholder in <main> (a <noscript>), which the copy replaces.
const MAIN_NOSCRIPT = /(<main\b[^>]*>(?:\s|<!--[\s\S]*?-->)*)<noscript>[\s\S]*?<\/noscript>/;
const HIDE_COPY = '<style>.crawler-copy{display:none}</style><noscript><style>.crawler-copy{display:block}</style></noscript>';
// "<" written as \u003c so no value can close the script tag.
const ldScript = (json) => `<script type="application/ld+json">\n${json.replace(/</g, '\\u003c')}\n</script>`;

// Every page, for the sitemap. Only Recent Work gets a date (its newest
// article), the one date that is always right; Google ignores dates it can't
// trust, and the other pages change too irregularly to keep dated by hand.
function sitemap() {
  const newest = coverageItems.map(c => c.datePublished).filter(Boolean).sort().pop();
  const paths = ['/', '/about', '/services', '/results', '/recent-work', '/dinners', '/silvia',
    ...caseStudies.map(cs => `/case-studies/${cs.slug}`)];
  const urls = paths.map(p => `  <url>\n    <loc>${SITE}${p === '/' ? '/' : p}</loc>${p === '/recent-work' && newest ? `\n    <lastmod>${newest}</lastmod>` : ''}\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function crawlerCopyFor(rel) {
  return PAGES[rel]?.();
}

export function transformPage(html, rel) {
  let out = html;
  if (rel === 'services/index.html') {
    out = out.replace(/<script type="application\/ld\+json">\s*\{[^<]*?"@type": "FAQPage"[\s\S]*?<\/script>/,
      ldScript(servicesFaqSchema()));
  }
  const extra = (SCHEMA[rel] || []).map(fn => ldScript(fn())).join('\n  ');
  if (extra) out = out.replace('</head>', `  ${extra}\n</head>`);
  // Silvia's page is written out in its HTML already; it gets only the links.
  if (rel === 'silvia/index.html' && out.includes('</main>')) {
    out = out.replace('</head>', `  ${HIDE_COPY}\n</head>`);
    return out.replace('</main>', `<div class="crawler-copy">${siteLinks()}\n    </div>\n  </main>`);
  }
  if (!PAGES[rel] || !MAIN_NOSCRIPT.test(out)) return out;
  out = out.replace('</head>', `  ${HIDE_COPY}\n</head>`);
  return out.replace(MAIN_NOSCRIPT, (_, open) => `${open}<div class="crawler-copy">${PAGES[rel]()}\n    </div>`);
}

export const crawlerFallbacks = {
  name: 'crawler-fallbacks',
  transformIndexHtml(html, ctx) {
    return transformPage(html, relative(ROOT, ctx.filename).replace(/\\/g, '/'));
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
  },
};
