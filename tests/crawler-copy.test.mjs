// Fails if a page's text copy for crawlers and AI page readers
// (build/crawler-fallbacks.js) goes missing, loses its links, drifts from the
// homepage's data, or carries a link that isn't http(s), mailto or the site's own.
// Usage: node tests/crawler-copy.test.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { transformPage } from '../build/crawler-fallbacks.js';
import { caseStudies } from '../data/case-studies.js';
import { team } from '../data/team.js';
import { testimonials } from '../data/testimonials.js';
import { navLinks } from '../data/site-content.js';

const SITE = 'https://edencommunications.com';
const PAGES = ['index.html', 'about/index.html', 'services/index.html', 'results/index.html',
  'recent-work/index.html', 'dinners/index.html', ...caseStudies.map(cs => `case-studies/${cs.slug}.html`)];
const html = (rel) => transformPage(readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8'), rel);
const copyOf = (out) => out.match(/<div class="crawler-copy">([\s\S]*?)\n {4}<\/div>/)?.[1] || '';
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, '\'').replace(/&quot;/g, '"');

for (const rel of PAGES) {
  const out = html(rel);
  const copy = copyOf(out);
  assert.ok(copy.length > 500, `${rel}: no crawler copy in <main>`);
  assert.ok(!/<main\b[^>]*>(?:\s|<!--[\s\S]*?-->)*<noscript>/.test(out), `${rel}: copy still in a <noscript>`);
  assert.ok(out.includes('<style>.crawler-copy{display:none}</style>'), `${rel}: copy not hidden from people`);
  // Every page links to every other page.
  for (const href of ['/', ...navLinks.map(l => l.href), '/silvia', ...caseStudies.map(cs => `/case-studies/${cs.slug}`)]) {
    assert.ok(copy.includes(`href="${SITE}${href}"`), `${rel}: no link to ${href}`);
  }
  // Links are http(s), mailto or the site's own, never through a redirect.
  for (const [, href] of copy.matchAll(/href="([^"]*)"/g)) {
    assert.match(href, /^(https?:\/\/|mailto:)/, `${rel}: unsafe link ${href}`);
    assert.ok(!/edencommunications\.com\/(case-studies|news)\/?$/.test(href), `${rel}: link through a redirect ${href}`);
  }
  // Structured data parses.
  for (const [, json] of out.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    assert.doesNotThrow(() => JSON.parse(json), `${rel}: structured data doesn't parse`);
  }
}

// Silvia's page (written out in its HTML) gets the links.
const silvia = copyOf(html('silvia/index.html'));
for (const href of ['/', ...navLinks.map(l => l.href)]) assert.ok(silvia.includes(`href="${SITE}${href}"`), `silvia: no link to ${href}`);

// The homepage copy carries what the homepage shows.
const home = decode(copyOf(html('index.html')));
for (const t of testimonials) assert.ok(home.includes(t.quote) && home.includes(t.name), `homepage copy: missing ${t.name}'s quote`);
for (const m of team) assert.ok(home.includes(m.name), `homepage copy: missing ${m.name}`);
for (const cs of caseStudies.filter(c => c.featured)) assert.ok(home.includes(`${SITE}/case-studies/${cs.slug}`), `homepage copy: missing ${cs.slug}`);

// Team members get a stable id the organization's founder points to.
const people = html('about/index.html');
for (const m of team) assert.ok(people.includes(`"name": "${m.name}"`), `About structured data: missing ${m.name}`);
assert.ok(people.includes(`${SITE}/about#ebony-lewkovitz`), 'About structured data: no id for the founder');
assert.ok(readFileSync(new URL('../index.html', import.meta.url), 'utf8').includes(`"@id": "${SITE}/about#ebony-lewkovitz"`), 'homepage: founder not linked to her person entry');

console.log('ok crawler copy');
