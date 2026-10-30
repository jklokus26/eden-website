// Fails if Recent Work could put coverage text into the page as markup.
// data/coverage.js is filled by a script from Eden's coverage sheet, so a
// headline with "<" or a quote must show as text, and a link that isn't
// http(s) must not become a link.
// Usage: node tests/coverage-escape.test.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { escapeHtml, safeUrl } from '../src/components/escape.js';

assert.equal(escapeHtml('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
assert.equal(escapeHtml('Tom & "Jerry" \'s'), 'Tom &amp; &quot;Jerry&quot; &#39;s');
assert.equal(escapeHtml(undefined), '');
assert.equal(escapeHtml('Bitcoin’s ‘Inflection Point’—Catch'), 'Bitcoin’s ‘Inflection Point’—Catch');
assert.equal(safeUrl('https://www.coindesk.com/a?b=1&c=2'), 'https://www.coindesk.com/a?b=1&amp;c=2');
assert.equal(safeUrl(' http://example.com '), 'http://example.com');
assert.equal(safeUrl('javascript:alert(1)'), '');
assert.equal(safeUrl('data:text/html,hi'), '');
assert.equal(safeUrl(''), '');

// Every coverage value the page writes goes through one of the helpers.
const src = readFileSync(new URL('../src/pages/recent-work.js', import.meta.url), 'utf8');
const raw = [...src.matchAll(/\$\{\s*item\.(\w+)\s*\}/g)].map(m => m[1]);
assert.deepEqual(raw, [], `raw coverage values in recent-work.js: ${raw.join(', ')}`);
const rawClient = /\$\{\s*(c|value|label)\s*\}/.test(src);
assert.equal(rawClient, false, 'client filter labels must be escaped');

console.log('ok coverage escape');
