---
version: 2026.10
name: Eden Communications
description: Light, editorial, business-like. A strategic communications firm for financial services, digital assets and frontier tech. Warm paper, deep green-black ink, a light serif for headlines, a plain sans for everything else.
colors:
  paper: "#F4F2EC"
  paper-deep: "#ECE9E1"
  ink: "#14201B"
  ink-body: "#2E3632"
  ink-muted: "#5C645F"
  accent: "#0B3D2C"
  accent-hover: "#14533D"
  rule: "rgba(20, 32, 27, 0.14)"
  rule-strong: "rgba(20, 32, 27, 0.28)"
  control-border: "#858A86"
  field: "#FBFAF7"
  error: "#8A2A1D"
  logo-ink: "#2E3632"
  band-bg: "#1A211D"
  on-dark-rule: "rgba(244, 242, 236, 0.5)"
  on-dark: "#F4F2EC"
  on-dark-muted: "rgba(244, 242, 236, 0.74)"
typography:
  display:
    fontFamily: Newsreader
    fontSize: clamp(44px, 6vw, 88px)
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: -0.025em
  h2:
    fontFamily: Newsreader
    fontSize: clamp(34px, 4.2vw, 58px)
    fontWeight: 300
    lineHeight: 1.06
    letterSpacing: -0.02em
  h3:
    fontFamily: Newsreader
    fontSize: clamp(24px, 2.2vw, 30px)
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.01em
  card:
    fontFamily: Newsreader
    fontSize: clamp(20px, 1.6vw, 24px)
    fontWeight: 400
    lineHeight: 1.2
  figure-sm:
    fontFamily: Newsreader
    fontSize: clamp(22px, 1.8vw, 28px)
    fontWeight: 300
    lineHeight: 1
  quote:
    fontFamily: Newsreader
    fontSize: clamp(22px, 2vw, 30px)
    fontWeight: 300
    lineHeight: 1.38
  figure:
    fontFamily: Newsreader
    fontSize: clamp(40px, 4.4vw, 64px)
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.02em
  lead:
    fontFamily: Geist
    fontSize: clamp(17px, 1.3vw, 19px)
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.14em
rounded:
  none: 0px
  button: 2px
spacing:
  gutter: clamp(20px, 4vw, 48px)
  section: clamp(80px, 10vw, 136px)
  band: clamp(48px, 6vw, 72px)
  container: 1280px
---

# Eden Communications — Design

*Rewritten 2026-10-20 for the Oct 2026 revamp. Source: the homepage mockup Eden approved ("lighter and more like the mockup look", Ebony, 2026-10-20), cross-checked against Eden's own client deck (pale sage #F1F5F0, deep green #0B3D2C, mid green #1E6B4E). The older dark system is in git history.*

**Transition note (remove at launch):** during the revamp the homepage runs this system through the `look-2026` class on `<body>`, written in the page's HTML (never added by script, so there's no flash of the old look). Other pages still use the old dark styles until they are carried over. Rules for this look are scoped under `.look-2026`, and the reverse leak is handled on purpose: the new styles override anything inherited from the old global CSS (body background, overflow, fonts), and shared scripts check the class or the reduced-motion setting (the page loader skips the new look, smooth scrolling turns off under reduced motion). Check the homepage and one unchanged inner page after every shared change.

## Overview

Eden should read like a serious advisory firm, not an agency and not a tech product: calm, confident, and expensive in the quiet way. Think of a well-made annual report or a broadsheet's weekend section. Warm off-white paper, deep green-black ink, generous space, one light serif carrying the headlines, a plain sans carrying everything else. Real photography only (Eden's dinners and licensed architectural stock). Restraint is the design: if a detail doesn't help someone trust Eden faster, it goes.

## Colors

Two paper tones, one ink family, one accent. Nothing else.

- **Paper (#F4F2EC):** the page. Warm bone, from the mockup.
- **Paper-deep (#ECE9E1):** an alternate band to separate a few sections (proof numbers, testimonials, footer). Never more than one in a row.
- **Ink (#14201B):** headlines, logos, rules at full strength. A green-black, close to Eden's deck green when dark.
- **Ink-body (#2E3632):** running text.
- **Ink-muted (#5C645F):** labels, captions, secondary lines. Passes WCAG AA on both paper tones.
- **Accent (#0B3D2C):** Eden's deep green from their deck. Primary buttons, the focus ring, link underlines on hover. Small footprint only, never a large fill except the primary button.
- **On-dark (#F4F2EC):** text on photographs (hero overlay is not used; the contact band is the one place text sits on a photo, behind a dark scrim).
- **Rules:** hairlines in ink at 14% (`--rule`) or 28% (`--rule-strong`). Never a solid grey. A hairline that opens a section runs the width of the content, never edge to edge.
- **Logo ink (#2E3632):** every client and press logo, one color.
- **Field (#FBFAF7) and control border (#858A86, 3.1:1 on paper):** form inputs only. The border is as light as it can be while still marking the field clearly.
- **Error (#8A2A1D):** form error text only, always with words, never color alone.

No gradients, glows, neon, glass or drop shadows. Logos are always one ink color.

## Typography

Two families, two weights each, loaded from Google Fonts.

- **Newsreader** (serif, optical sizes) for display, section headlines, card titles, large figures and pull quotes. Weight 300 for display and h2, 400 for h3. Always upright. Never italic in headings.
- **Geist** (sans) for body, navigation, buttons, labels and forms. Weights 400 and 500 only.
- **Labels:** Geist 500, 12px (0.75rem), uppercase, 0.14em tracking, ink-muted. Used sparingly: one above a section at most, never as numbered chapter tags beside a heading.
- **Figures:** Newsreader 300 with lining, tabular numerals. Numbers are written exactly as Eden supplies them.
- **Measure:** body lines stay under about 65 characters (`max-width: 36rem` on paragraphs).
- Headline letter-spacing is negative (-0.01 to -0.025em). Body is neutral. Labels are wide.
- **Rendering:** load Newsreader with its optical-size axis (`opsz`) and set `font-optical-sizing: auto`, so large headlines get the display cut and small text the text cut. Weight 300 and the tight tracking are starting values: check them at real sizes on a real screen. Sizes in rem so browser zoom and text resizing work.

## Layout

- **Container:** max 1280px, gutter `clamp(20px, 4vw, 48px)`.
- **Section rhythm:** major sections get `clamp(80px, 10vw, 136px)` of vertical padding. Compact bands (the proof numbers, the logo rows, the footer) get `clamp(48px, 6vw, 72px)`, as in the mockup, so the page doesn't become a run of identical blocks. Sections are separated by space and hairlines, not boxes.
- **Hero:** two halves. Text on the left inside the container's left edge, vertically centered; one photograph on the right running to the viewport's right edge and from just under the nav to the bottom of the hero (about 88% of the viewport height, capped at 820px). The headline wraps naturally at its real length. Below 900px it stacks: text first, then the photo at 4:3 across the full width. The photo keeps its subject in view with `object-position` set per image.
- **Grid:** 12 columns on desktop. Statement sections run headline on the left (7 columns) and supporting text on the right (4 columns, offset 1). Three-up rows (pillars, case studies, industries) use equal columns divided by hairlines.
- **Breakpoints:** 640px, 900px, 1200px. Rows choose their own tablet layout (three-up rows can go to two plus one, logo grids to 3 then 2 columns); everything is one column below 640px.
- **Images:** square corners, fixed aspect ratios so nothing shifts while loading. Case study and industry images are shallow landscape crops (about 2.4:1 and 2:1), as in the mockup.
- **Anchors:** `scroll-margin-top: 96px` so the fixed nav never covers a heading.

## Elevation & Depth

Flat. Depth comes from photography, paper tone shifts and hairlines. No shadows, no cards floating on cards.

## Shapes

- Buttons: 2px radius. Rectangular, not pills.
- Images, sections and dividers: square.
- The only round shapes are focus-ring corners (follow the element) and the circular LinkedIn icon hit area.

## Components

- **Nav:** Eden logo left (ink), page links center (Geist 14px, ink-body, ink on hover and when active), "Talk to Eden" primary button right. Paper background; a hairline appears under it once the page scrolls. Mobile: logo + menu button, full-screen paper overlay.
- **Primary button:** accent fill, paper text, Geist 500 14px, 2px radius, 14px 22px padding, arrow glyph after the label. Hover: accent-hover. Active: 1px press. Focus: 2px accent ring offset 3px.
- **Inverse button (on photographs):** paper fill, ink text, same shape. Its focus ring is two-tone (a paper ring with an ink outline) so it shows on any part of a photo.
- **Focus:** every link, button, field and logo link shows a visible focus ring on keyboard focus, instantly (not animated).
- **Secondary button:** transparent, 1px rule-strong border, ink text. Hover: border turns ink.
- **Text link:** ink with a 1px underline in rule-strong under the words only, never the arrow; the underline turns accent on hover. At least 44px tall for touch.
- **Button sizes:** 48px tall with 13px 22px padding everywhere, except the nav button, which is a compact 44px.
- **Hero:** a short sentence-case line above the headline (the doc's eyebrow, muted, not uppercase), the headline, the paragraph, two buttons, then Eden's tagline as a quiet line under a hairline so visitors see who Eden serves.
- **Proof figures:** three figures in a row, each with a label under it, no dividers. On phones they become rows: number left, label right.
- **Press row:** the eight best-known outlets in one still row spread across the content width, labelled "Where our clients appear". All of Eden's outlet logos stay in the data file.
- **Logo rows:** each logo is drawn in logo-ink through a CSS mask, with its proportions from the data files and a height tuned by eye so heavy and light marks carry the same weight. Client logos sit centered in a still 5-column grid, as in the mockup. Nothing scrolls.
- **Three-up rows** (pillars, case studies, industries, team) share one 3-column grid with a 64px gap (32px under 1100px), so their columns line up down the page. Text rows (pillars) get a hairline above each column; image rows don't need one, and nothing gets vertical dividers.
- **Pillars and industries:** small numeral or photo, serif title, short sans list.
- **Case study cards:** image (3:2, focal point set per photo, muted to sit with the page), client label, card-size serif title, three small figures, "View case study". No card box. The whole card is the link; its title underline appears on hover only. The rows of the three cards line up (CSS subgrid).
- **Quotes:** Newsreader 300 at the quote size, opening mark hung outside the text edge, name and title in Geist below a short hairline. No quote-mark ornaments larger than the text.
- **Team:** 4:5 portraits in one black-and-white grade (so new headshots always match), on the three-column grid; on phones a list with a small portrait left, name in serif, role in sans. The bio opens in a native dialog: focus moves into it, stays inside it, Escape and the close button shut it, and focus returns to the card that opened it. The mobile menu follows the same focus rules.
- **Contact band:** a dark photograph with a flat dark scrim, headline and inverse button left, a short stacked word list right, then the form on paper below it. Check text contrast against the scrimmed photo at every crop, including the translucent on-dark text.
- **Form:** labels above fields; name, email and company in one row, message across the full width; 52px fields with a 1px control border; accent focus ring; the submit button carries the arrow; errors in text (not color alone). The form section has id `contact`, so every "Talk to Eden" lands on it.

## Motion

Quiet and short. It should never be the thing someone remembers.

- **Reveal:** content blocks fade in and rise 12px over 500ms with `cubic-bezier(0.16, 1, 0.3, 1)` when they enter the viewport, staggered 80ms within a group. Once only.
- **Hover:** color and border changes over 150-200ms. The only hover movement is a 3px arrow nudge, on mouse devices only. No scale on cards, no tilt, no parallax.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, nothing moves: reveals show immediately, the marquee becomes a static wrap, smooth scrolling is off.
- Animate `transform` and `opacity` only.

## Do's and Don'ts

- Do keep copy exactly as Eden supplies it. Numbers too.
- Do use real photographs only, in one warm, slightly desaturated grade.
- Do let space do the separating. Hairlines before boxes, boxes almost never.
- Do keep every logo one ink color and optically balanced.
- Don't use italic headings, gradients, glows, drop shadows, pills or rounded cards.
- Don't add a third typeface or a second accent color.
- Don't use stock clichés (handshakes, laptops, coins, circuit boards) or AI-generated images.
- Don't use numbered chapter labels beside headlines, or icon rows in circles.
- Don't animate layout properties, and don't animate anything that the reader didn't scroll to.
- Don't change these values as a side effect of another task. Change them on purpose, then update this file.
