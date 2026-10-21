// Fails if a homepage or dinners photo is too small to stay sharp on retina
// screens. Cards render up to ~350 CSS px wide (about 700 device px at 2x),
// so every photo file must be at least 1000 px wide. Preview 1's case crops
// were 392-618 px wide and looked blurry (Joe, 2026-10-21).
// Usage: node tests/photo-sizes.test.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const MIN_WIDTH = 1000;
const DIRS = ['home', 'dinners'].map(d => new URL(`../public/assets/images/${d}/`, import.meta.url).pathname);

// Width from a JPEG's start-of-frame marker (baseline or progressive).
function jpegWidth(buf) {
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xC0 && marker <= 0xC3) return buf.readUInt16BE(i + 7);
    i += 2 + len;
  }
  throw new Error('no SOF marker');
}

const tooSmall = [];
for (const dir of DIRS) {
  for (const f of readdirSync(dir).filter(f => f.endsWith('.jpg'))) {
    const w = jpegWidth(readFileSync(join(dir, f)));
    if (w < MIN_WIDTH) tooSmall.push(`${f} (${w}px)`);
  }
}
assert.deepEqual(tooSmall, [], `photos under ${MIN_WIDTH}px wide: ${tooSmall.join(', ')}`);
console.log('ok photo sizes');
