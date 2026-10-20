// Exercises initContactForm's submit handler with a fake DOM and stubbed fetch.
// Usage: node tests/contact-form.test.mjs [path to contact-form.js]
// (no test framework in this repo; runs the submit handler against stubbed replies)
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const target = process.argv[2] || new URL('../src/components/contact-form.js', import.meta.url).pathname;
const src = readFileSync(target, 'utf8')
  .replace(/^import .*$/gm, '')
  .replace('${createDivider(\'Contact\')}', '');
const dir = mkdtempSync(join(tmpdir(), 'formtest-'));
const modPath = join(dir, 'cf.mjs');
writeFileSync(modPath, src);
const { initContactForm } = await import(modPath);

function el(extra = {}) {
  return { hidden: false, disabled: false, textContent: '', innerHTML: '', value: '', focused: false, focus() { this.focused = true; }, ...extra };
}

async function run(hostname, fetchImpl) {
  const button = el({ textContent: "Let's Talk" });
  const error = el();
  const success = el();
  const referring = el();
  let handler;
  const form = {
    hidden: false,
    action: 'https://formsubmit.co/ajax/hello@edencommunications.com',
    querySelector: (s) => ({ '.contact-submit': button, '.contact-error': error, 'input[name="referringPage"]': referring })[s] || null,
    addEventListener: (_t, h) => { handler = h; },
    parentElement: { querySelector: (s) => (s === '.contact-success' ? success : null) },
  };
  const calls = [];
  globalThis.document = { querySelector: (s) => (s === '.contact-form' ? form : null) };
  globalThis.window = { location: { hostname, href: `https://${hostname}/` } };
  globalThis.FormData = class { constructor() {} [Symbol.iterator]() { return [['name', 'Test']][Symbol.iterator](); } };
  globalThis.fetch = async (...a) => { calls.push(a[0]); return fetchImpl(); };
  initContactForm();
  await handler({ preventDefault() {} });
  return { calls: calls.length, formHidden: form.hidden, successShown: success.innerHTML.length > 0 && success.focused, errorShown: error.textContent.length > 0, errorText: error.textContent, buttonReset: !button.disabled && button.textContent === "Let's Talk" };
}

const ok = () => ({ ok: true, status: 200, json: async () => ({ success: 'true', message: 'The form was submitted successfully.' }) });
const needsActivation = () => ({ ok: true, status: 200, json: async () => ({ success: 'false', message: 'This form needs Activation.' }) });
const serverError = () => ({ ok: false, status: 500, json: async () => { throw new Error('not json'); } });
const network = () => { throw new TypeError('Failed to fetch'); };

const cases = [
  ['live host, delivered', 'edencommunications.com', ok, (r) => r.calls === 1 && r.formHidden && r.successShown && !r.errorShown && r.buttonReset],
  ['live host, success:"false" (needs activation)', 'edencommunications.com', needsActivation, (r) => r.calls === 1 && !r.formHidden && !r.successShown && r.errorShown && r.errorText.startsWith('Something went wrong') && r.buttonReset],
  ['live host, HTTP 500', 'edencommunications.com', serverError, (r) => r.calls === 1 && !r.successShown && r.errorShown && r.buttonReset],
  ['live host, network failure', 'edencommunications.com', network, (r) => r.calls === 1 && !r.successShown && r.errorShown && r.buttonReset],
  ['preview host sends nothing', 'eden-communications-abc123.vercel.app', ok, (r) => r.calls === 0 && !r.successShown && r.errorShown && r.errorText.startsWith('Preview only')],
  ['localhost sends nothing', 'localhost', ok, (r) => r.calls === 0 && r.errorShown],
];

let failed = 0;
for (const [name, host, impl, check] of cases) {
  const r = await run(host, impl);
  const pass = check(r);
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${pass ? '' : '  ' + JSON.stringify(r)}`);
}
process.exit(failed ? 1 : 0);
