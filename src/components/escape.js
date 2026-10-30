// For values that reach the page from data a script fills (Recent Work's
// data/coverage.js comes from Eden's coverage sheet): text and attribute
// values are escaped, and a link is kept only when it is http(s).

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeUrl(value) {
  const url = String(value ?? '').trim();
  return /^https?:\/\//i.test(url) ? escapeHtml(url) : '';
}
