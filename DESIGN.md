---
version: alpha
name: Eden Communications
description: Dark-mode editorial brand for a crypto and fintech PR agency. Gradient-accented, typographic, cinematic.
colors:
  primary: "#13ff99"
  secondary: "#1ca4ff"
  tertiary: "#951bff"
  neutral: "#0a0a06"
  hero-bg: "#020408"
  surface: "#0a0a06"
  on-surface: "#ffffff"
  muted: "#9b9b9b"
  blue-accent: "#19254e"
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 85.74px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 58.94px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 42.86px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18.75px
    fontWeight: 500
    lineHeight: 1.5
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16.08px
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.08em
  label-micro:
    fontFamily: Plus Jakarta Sans
    fontSize: 9px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.06em
spacing:
  sp-1: 16px
  sp-2: 32px
  sp-3: 48px
  sp-4: 56px
  sp-5: 64px
  sp-6: 64px
  sp-7: 96px
  sp-8: 80px
  container-max: 1440px
  nav-offset: 100px
rounded:
  none: 0px
  sm: 4px
  md: 12px
  card: 22.78px
  full: 9999px
components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  hero:
    backgroundColor: "{colors.hero-bg}"
    textColor: "{colors.on-surface}"
  caption:
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  data-panel:
    backgroundColor: "{colors.blue-accent}"
    textColor: "{colors.on-surface}"
  gradient-accent-a:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
  gradient-accent-b:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    padding: 14px
    typography: "{typography.label-caps}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.card}"
    padding: 32px
  card-hover-border:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  eyebrow:
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
  metric-number:
    textColor: "{colors.on-surface}"
    typography: "{typography.h2}"
  quote-italic:
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
---

# Eden Communications — Design

## Overview

Dark, editorial, and gradient-accented. Eden is a PR agency for crypto and fintech, and the site should read as serious journalism with a technical edge — not a SaaS landing page. The aesthetic is cinematic: a near-black background, high-contrast white typography at display weights, and a single animated three-stop gradient (purple → sky → mint) used sparingly for accents, hover states, and section dots. A subtle noise texture sits on top of everything to eliminate the flat digital feel.

Typography carries most of the design. Headlines are set heavy (800) with tight negative letter-spacing. Body copy is medium weight for long-form readability. Metrics are displayed as display-scale numbers, never italicized.

Motion is restrained but premium: blur-to-focus hero reveals, scroll-triggered opacity fades, and occasional card-tilt on hover. Nothing bounces, nothing pulses.

## Colors

The palette is one true black, one pure white, one muted grey for supporting copy, and a three-stop gradient for all accent work.

- **Primary (mint #13ff99):** The functional accent — used for eyebrow labels, active link states, focus outlines, and the mint stop of the brand gradient.
- **Secondary (sky #1ca4ff) / Tertiary (purple #951bff):** The other two gradient stops. They never appear as solid fills — only as part of the 3-stop gradient on text fills, dots, card borders (hover), and selection highlights.
- **Neutral (#0a0a06):** The body and section background. Not pure black — warmed very slightly.
- **Hero-bg (#020408):** A deeper near-black reserved exclusively for the hero section's video treatment.
- **On-surface (#ffffff):** All headlines, body copy, and default UI text.
- **Muted (#9b9b9b):** Secondary body copy, metadata, captions.
- **Blue-accent (#19254e):** Used for technical/data contexts only.
- **Border tokens:** All borders are low-opacity white (`rgba(255,255,255, 0.06/0.08/0.12)`). Never use a solid grey border.

## Typography

Plus Jakarta Sans, variable weight 400–800, loaded from Google Fonts. This is the only typeface in the system.

- **Headlines (h1/h2/h3):** Weight 800 for h1/h2, 700 for h3. Letter-spacing always `-0.02em`. Sizes are fluid via `clamp()` so they scale cleanly from mobile to ultrawide.
- **Body large (18.75px):** Used for lead paragraphs and quotes. Weight 500.
- **Body small (16.08px):** Default body copy. Weight 400.
- **Label-caps (12px):** Uppercase, letter-spacing 0.08em. Used for eyebrows above headlines and for section-divider labels.
- **Label-micro (9px):** Uppercase, letter-spacing 0.06em. Used sparingly for tag chips and timestamps.

Case-study body content uses standard bullet lists with a white-disc marker (`::marker` color `rgba(255,255,255,0.7)`). Never use custom arrow glyphs as list markers.

## Layout

- **Container:** `max-width: 1440px`, auto-margin, horizontal padding `--sp-3` (48px) at desktop, collapsing through `--sp-2` (32px) at 768px and `--sp-1` (16px) at 480px.
- **Section padding:** The `.section-padding` utility is `var(--sp-6) var(--sp-3)` (64px vertical, 48px horizontal). It collapses at 768px and 480px breakpoints. **Never combine `.section-padding` with custom padding overrides on the same element** — the shorthand and longhand fight each other unpredictably.
- **Breakpoints:** 480px, 768px, 1024px.
- **Grid gaps:** Flex columns use the lobotomized owl pattern (`> * + * { margin-top: Xpx }`) instead of `gap`, to defeat GSAP's inline-style interference on animated grids.
- **Scroll offset:** Section anchors use `scroll-margin-top: 100px` so the fixed nav doesn't cover them.

## Elevation & Depth

Depth is achieved through **tonal contrast and noise**, not shadows. The base background is `#0a0a06` with a fixed 3% SVG turbulence noise overlay blending at `mix-blend-mode: overlay`. Cards sit on `rgba(255, 255, 255, 0.03)` with low-opacity borders and gain a 1.5px gradient-border ring on hover. There are no drop shadows anywhere in the system.

## Shapes

- **Standard card radius:** `22.78px`. This oddly specific value is the brand's signature corner and appears on all content cards, case-study tiles, and coverage tiles.
- **Small radius:** 4px for inline chips and pills (rare).
- **Pill radius (`9999px`):** CTAs and tag chips.

**Gradient-border rule:** The gradient-border-on-hover pattern uses a `::before` pseudo-element with `inset: -1.5px` and `mask-composite: exclude`. Any parent of a gradient-bordered element **must not set `overflow: hidden`** — it clips the ring. Image wrappers inside the card handle their own image clipping separately.

## Components

- **Primary CTA (pill):** Mint fill, near-black text, full pill radius, label-caps typography. One per section maximum.
- **Card (content, case study, coverage tile):** 22.78px radius, 3% white fill, 1px low-opacity white border, gradient-border ring on hover, subtle `transform: translateY(-2px)` on hover.
- **Eyebrow label:** Mint text, 12px, uppercase, 0.08em tracking, appears above h2 section headings.
- **Metric number:** H2-scale, weight 800, white — **never italicized, never given a gradient fill, never colored mint**.
- **Testimonial quote:** Italic is allowed here and only here. Body-lg size, white.
- **Section divider:** Horizontal hairline border + gradient dot + uppercase label.
- **Media ticker:** Horizontal auto-scrolling row of client logos at bottom of hero.

## Do's and Don'ts

- Do use the brand gradient sparingly — one or two elements per viewport max (eyebrow, divider dot, or hover ring). Never fill large surfaces with it.
- Do write metric numbers in upright weight-800 white. Never italic.
- Do use Plus Jakarta Sans exclusively. No secondary typeface.
- Do keep letter-spacing negative (-0.02em) on display headlines, neutral or slightly positive on body, positive and wide (0.06–0.08em) on label-caps.
- Do render body text on the base surface `#0a0a06` with `#ffffff` or `#9b9b9b` text to stay above WCAG AA.
- Don't use Schibsted Grotesk, Inter, or any typeface other than Plus Jakarta Sans. (An older reference in `CLAUDE.md` mentioned these — it is stale; this file is authoritative.)
- Don't use pure black (`#000000`) or pure Tailwind-style greys. The palette is specific.
- Don't add drop shadows. Depth comes from tonal contrast and noise.
- Don't give metric numbers italic, color, or decoration.
- Don't wrap a gradient-bordered element in a parent with `overflow: hidden` — the border gets clipped.
- Don't combine the `.section-padding` utility with explicit `padding-top` / `padding-bottom` overrides on the same node.
- Don't use arrow glyphs or custom icons as list markers inside case-study body content.
- Don't add a second accent color (red, yellow, orange). Everything off-palette should instead use the existing gradient or muted grey.
