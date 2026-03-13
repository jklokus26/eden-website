# Hero Animation Variants — Ebony Demo

Two animation variants Joe liked, saved for demoing to Ebony. Currently the hero is **fully static** (no animation). To activate a variant, replace the `initHeroAnimation()` function in `src/animations.js`.

---

## Current: Static (No Animation)

All three lines visible at all times. No movement.

```
Coverage fades.
Credibility compounds.
Strategic PR for crypto, fintech...
```

---

## Animation A: Crossfade Replace

Line 1 and Line 2 occupy the **same position** (Line 2 is absolutely positioned on top). Only Line 1 + subtitle visible on load. After 2s, Line 1 dissolves (chars blur + drift), Line 2 crossfades in on top.

**Requires CSS change** — add back to `home.css`:
```css
.hero-headline--line2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
}
```

**Animation code:**
```js
export function initHeroAnimation() {
  const line1 = document.querySelector('.hero-headline--line1');
  const line2 = document.querySelector('.hero-headline--line2');

  if (!line1) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (line2) { line1.style.opacity = '0'; line2.style.opacity = '1'; }
    return;
  }

  const split = new SplitType(line1, { types: 'chars' });

  const tl = gsap.timeline({ delay: 1.2 });

  tl.to(split.chars, {
    opacity: 0,
    filter: 'blur(4px)',
    y: () => gsap.utils.random(-8, -2),
    x: () => gsap.utils.random(-5, 5),
    duration: 1.6,
    ease: 'power1.in',
  }, 'dissolve');

  if (line2) {
    tl.to(line2, {
      opacity: 1,
      duration: 1.0,
      ease: 'power1.inOut',
    }, 'dissolve+=0.6');
  }
}
```

---

## Animation B: Fade-Out Only

All three lines visible on load (stacked: Line 1, Line 2, subtitle). After 2s, "Coverage fades." gently fades out and disappears. "Credibility compounds." and subtitle stay exactly where they are — no movement.

**No CSS changes needed** (uses the default stacked layout).

**Animation code:**
```js
export function initHeroAnimation() {
  const line1 = document.querySelector('.hero-headline--line1');

  if (!line1) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const split = new SplitType(line1, { types: 'chars' });

  gsap.to(split.chars, {
    opacity: 0,
    filter: 'blur(4px)',
    y: () => gsap.utils.random(-8, -2),
    x: () => gsap.utils.random(-5, 5),
    duration: 1.6,
    delay: 2.0,
    ease: 'power1.in',
  });
}
```

---

## Quick Switch Guide

To demo for Ebony:
1. Open `src/animations.js`
2. Replace the `initHeroAnimation()` function with the variant code above
3. For Animation A only: also update `.hero-headline--line2` in `home.css`
4. Dev server hot-reloads — refresh the page to see the animation from the start
