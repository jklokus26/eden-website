---
version: 2026.10
name: Eden Communications
description: Dark, editorial, business-like. A strategic communications firm for financial services, digital assets and frontier tech. The live site's palette (near-black, white, grey, a purple-sky-mint gradient used sparingly), a light serif for headlines, a plain sans for everything else.
colors:
  paper: "#0a0a06"
  paper-deep: "rgba(255, 255, 255, 0.03)"
  ink: "#ffffff"
  ink-body: "rgba(255, 255, 255, 0.88)"
  ink-muted: "#9b9b9b"
  accent: "#13ff99"
  btn-bg: "#ffffff"
  btn-ink: "#0a0a06"
  btn-bg-hover: "#f0f0f0"
  rule: "rgba(255, 255, 255, 0.08)"
  rule-strong: "rgba(255, 255, 255, 0.12)"
  link-rule: "rgba(255, 255, 255, 0.3)"
  control-border: "rgba(255, 255, 255, 0.12)"
  field: "rgba(255, 255, 255, 0.04)"
  error: "#ff6b6b"
  logo-ink: "#ffffff"
  band-bg: "rgba(255, 255, 255, 0.03)"
  selection: "#951bff"
  gradient-purple: "#951bff"
  gradient-sky: "#1ca4ff"
  gradient-mint: "#13ff99"
  nav-scrolled-bg: "rgba(18, 19, 31, 0.85)"
  on-dark: "#ffffff"
  on-dark-muted: "rgba(255, 255, 255, 0.7)"
  on-dark-rule: "rgba(255, 255, 255, 0.3)"
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
    fontSize: clamp(20px, 1.6vw, 26px)
    fontWeight: 300
    lineHeight: 1.36
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

*Colors changed 2026-10-22 to the live site's palette (see Colors). Layout, type and motion as below. Rewritten 2026-10-20 for the Oct 2026 revamp. Source: the homepage mockup Eden approved ("lighter and more like the mockup look", Ebony, 2026-10-20), cross-checked against Eden's own client deck (pale sage #F1F5F0, deep green #0B3D2C, mid green #1E6B4E). The older dark system is in git history.*

**Transition note (remove at launch):** during the revamp the homepage runs this system through the `look-2026` class on `<body>`, written in the page's HTML (never added by script, so there's no flash of the old look). Other pages still use the old dark styles until they are carried over. Rules for this look are scoped under `.look-2026`, and the reverse leak is handled on purpose: the new styles override anything inherited from the old global CSS (body background, overflow, fonts), and shared scripts check the class or the reduced-motion setting (the page loader skips the new look, smooth scrolling turns off under reduced motion). Check the homepage and one unchanged inner page after every shared change.

## Overview

Eden should read like a serious advisory firm, not an agency and not a tech product: calm, confident, and expensive in the quiet way. Think of a well-made annual report or a broadsheet's weekend section, printed dark. The live site's near-black and white with its brand gradient used sparingly, generous space, one light serif carrying the headlines, a plain sans carrying everything else. Real photography only (Eden's dinners and licensed architectural stock). Restraint is the design: if a detail doesn't help someone trust Eden faster, it goes.

## Colors

**The live site's palette, exactly** (Alkida, with Ebony agreeing, on the Oct 22 call: "let's stick to the same color palette that we have on the current website" until Eden settles brand colors; this replaces Ebony's Oct 20 "lighter" request). Every value comes from the live site's code (`deliverables/eden/website-clone/src/styles`) or its DESIGN.md; where those two disagree, the live code wins (Joe, 2026-10-22). Don't add or invent a color. When Eden settles a brand palette, it replaces this section.

- **Paper (#0a0a06):** the page, the live `--bg`. Panels (the form, the bio dialog) use it too, with a hairline edge.
- **Paper-deep (white at 3%):** the live card fill, used for alternate bands (testimonials, the dinners band) and image placeholders.
- **Ink (#ffffff):** headlines, labels that open a section, logos, strong text.
- **Ink-body (white at 88%):** running text (the live hero subtitle).
- **Ink-muted (#9b9b9b):** secondary lines, captions, the muted half of the hero deck (the live `--accent-grey`).
- **Accent, mint (#13ff99):** focus rings, link hover underlines, field focus borders, active states (the pillar number) and the case-study figures, as the live case cards show them. Never a large fill.
- **Buttons:** white fill (#ffffff), near-black text (#0a0a06), hover #f0f0f0, as the live "Get in Touch" and form button. (The live DESIGN.md says mint; the live code is white, and the code wins.)
- **Brand gradient:** purple #951bff, sky #1ca4ff, mint #13ff99. Sparingly, as the live site uses it: the hero's "who don't believe in PR" as gradient text (like the live "Credibility compounds.", static here), the dot before each section label, and the pillar timing line. Never a large fill, never on figures.
- **Numbers band:** the live numbers panel's faint wash of the three gradient colors (2-4%) with a purple edge at 12%.
- **Selection:** purple #951bff with white text (live).
- **Rules:** white at 8% (`--rule`) or 12% (`--rule-strong`), the live border tokens; text underlines at 30% (`--link-rule`).
- **Nav once scrolled:** the live frosted bar, rgba(18, 19, 31, 0.85) with a 12px blur.
- **Form fields:** white at 4% fill, white at 12% border, mint on focus; error text #ff6b6b (all live).
- **Over photos:** the scrim uses stops copied from the live hero overlay (rgba(2, 4, 8, 0.92), rgba(3, 5, 15, 0.7), rgba(2, 4, 10, 0.5)); round controls on photos and video sit on the live frosted-nav color, rgba(18, 19, 31, 0.85).

No glows, neon, glass or drop shadows. Logos are always one color (white).

## Typography

Two families, two weights each, loaded from Google Fonts.

- **Newsreader** (serif, optical sizes) for display, section headlines, card titles, large figures and pull quotes. Weight 300 for display and h2, 400 for h3. Always upright. Never italic in headings.
- **Geist** (sans) for body, navigation, buttons, labels and forms. Weights 400 and 500 only.
- **Labels:** Geist 500, 12px (0.75rem), uppercase, 0.14em tracking, ink-muted. The label that opens a section is ink (white) after an 8px brand-gradient dot, the live site's section-divider label (`.t-label--dot`). Used sparingly: one above a section at most, never as numbered chapter tags beside a heading.
- **Figures:** Newsreader 300 with lining, tabular numerals. Numbers are written exactly as Eden supplies them.
- **Measure:** body lines stay under about 65 characters (`max-width: 36rem` on paragraphs).
- Headline letter-spacing is negative (-0.01 to -0.025em). Body is neutral. Labels are wide.
- **Rendering:** load Newsreader with its optical-size axis (`opsz`) and set `font-optical-sizing: auto`, so large headlines get the display cut and small text the text cut. Weight 300 and the tight tracking are starting values: check them at real sizes on a real screen. Sizes in rem so browser zoom and text resizing work.

## Layout

- **Container:** max 1280px, gutter `clamp(20px, 4vw, 48px)`.
- **Section rhythm:** major sections get `clamp(80px, 10vw, 136px)` of vertical padding. Compact bands (the proof numbers, the logo rows, the footer) get `clamp(48px, 6vw, 72px)`, as in the mockup, so the page doesn't become a run of identical blocks. Sections are separated by space and hairlines, not boxes.
- **Hero (editorial):** the headline alone on one line across the content width (up to 136px; two lines below 900px), a strong hairline, then two columns: Eden's line as a serif deck, the paragraph and the calls to action in columns 1-5; a 3:2 photo in columns 7-12, framed by the nav margins, the shape Ebony's hero video will have. Padding heavier below than above. On short laptop screens (under 780px tall) the top padding tightens so the buttons stay in the first screen. Below 900px it stacks: headline, deck, paragraph, buttons, then the photo at 4:3. (Joe, 2026-10-22, on the split version: "could we make it look a little cleaner, more unique, professional".)
- **Grid:** 12 columns on desktop. Statement sections run headline on the left (7 columns) and supporting text on the right (4 columns, offset 1). Three-up rows (case studies, industries) use equal columns.
- **Breakpoints:** 640px, 900px, 1200px. Rows choose their own tablet layout (three-up rows can go to two plus one, logo grids to 3 then 2 columns); everything is one column below 640px.
- **Images:** square corners, fixed aspect ratios so nothing shifts while loading. Case study images are 16:9 and industry images 3:2. Every photo file is at least as wide as its largest retina display size (about 2x the CSS width), so nothing is upscaled into blur: take the largest original available, never a small crop of a small file. Each industry photo has to say its industry at a glance (Joe, 2026-10-21: a building "doesn't make any sense with digital assets"): golden columns for Financial Services, a BTCUSD candlestick chart for Digital Assets, the Earth's city lights from orbit for Frontier Technology. Crops are complete compositions (no sculpture sliced at the edge), dark photos are brightened until their subject reads, and nothing shows a dated price or a third-party app brand. Never grey stone that reads as black and white.
- **Anchors:** `scroll-margin-top: 96px` so the fixed nav never covers a heading.

## Elevation & Depth

Flat. Depth comes from photography, paper tone shifts and hairlines. No shadows, no cards floating on cards.

## Shapes

- Buttons: 2px radius. Rectangular, not pills.
- Images, sections and dividers: square.
- The only round shapes are focus-ring corners (follow the element) and the circular LinkedIn icon hit area.

## Components

- **Nav:** Eden logo left (ink), page links center (Geist 14px, ink-body, ink on hover and when active), "Talk to Eden" primary button right. Page-color background; once the page scrolls, the live frosted bar with a hairline under it. Mobile: logo + menu button, full-screen paper overlay.
- **Primary button:** white fill, near-black text, Geist 500 14px, 2px radius, 14px 22px padding, arrow glyph after the label. Hover: #f0f0f0. Active: 1px press. Focus: 2px mint ring offset 3px.
- **Links on photographs:** paper text with a paper underline. Their focus ring is two-tone (a paper ring with an ink outline) so it shows on any part of a photo.
- **Focus:** every link, button, field and logo link shows a visible focus ring on keyboard focus, instantly (not animated).
- **Secondary button:** transparent, 1px link-rule border, ink text. Hover: border turns ink.
- **Text link:** ink with a 1px underline in link-rule under the words only, never the arrow; the underline turns accent on hover. At least 44px tall for touch.
- **Button sizes:** 48px tall with 13px 22px padding everywhere, except the nav button, which is a compact 44px.
- **Hero:** the headline "Reputation is capital." (Alkida, 2026-10-21); Eden's positioning line as a Newsreader 300 deck at about 38px, "A modern communications firm for companies" in ink-muted and "who don't believe in PR" on its own line in the brand gradient (Alkida's Loom: the line is a competitive advantage, "make it a bit bolder"; the gradient is how the live site marks its own key line). No underline, which read as a link. Then the paragraph, the primary button and "Talk to Eden" as a text link. Nothing else, and no text on the photo.
- **Proof band:** on the live numbers-panel wash, between two purple-edged hairlines. Eden's tagline as its label, then three figures in a row divided by vertical hairlines, each with a label under it, then a hairline and one strip of the ten client logos (Ebony on the Oct 9 call: the numbers "with a scrolling logo strip of companies beneath"). On phones the figures become rows: number left, label right.
- **One logo row per place, never two in a row.** The client strip lives in the proof band; the press strip closes the Selected work section, under the case cards (Joe, 2026-10-21: outlets back up the case results). Joe, 2026-10-20: back-to-back press and client rows read as chaotic.
- **Client strip:** one line that scrolls slowly (60s per loop), edges faded into the band, paused on hover and by a small pause/play icon button beside the label (moving content needs a pause control; its label stays "Pause the logo strip" with `aria-pressed`). Logos aren't links while they move. Reduced motion: the strip stands still in two rows of five (two columns on phones).
- **Press strip:** all 23 outlets, best-known first, as a second moving strip labelled "Where our clients appear" under the case cards behind a hairline (Alkida's Loom, 2026-10-21: "a little bigger and dynamic"). Logos about 1.5x the client strip's size, a little slower (28px per second, its loop time worked out from its own width so the speed holds at every screen size) and drifting right while the client strip drifts left, so the two never read as one. Both strips rest while off screen or in a hidden tab. Same pause button and reduced-motion rules as the client strip (a still grid). Heights tuned so every mark carries the same weight.
- **Logos:** each logo is drawn in logo-ink through a CSS mask, with its proportions from the data files and a height tuned by eye so heavy and light marks carry the same weight.
- **Three-up rows** (case studies, industries) share one 3-column grid with a 64px gap (32px under 1100px), so their columns line up down the page. Nothing gets vertical dividers.
- **Pillars (What we do):** a list of the three pillars (number, serif title, short sans list, hairline above each) in columns 1-6 beside one large 4:5 photo in columns 8-12. The photo shows the active pillar: it follows the pointer, and otherwise steps every 6 seconds while the section is on screen, timed by an accent line filling along the active pillar's hairline. Inactive titles rest at 60% opacity and fade up when active (opacity only, never a color fade). A pause button sits on the photo; pointing at a pillar stops the stepping. Tablets: each pillar is a 4:3 photo beside its words. Phones: each pillar is a 3:2 photo above its words. Photos: a lectern on stage (Position), a broadcast camera filming an interview (Build market visibility), Eden's own photo of guests talking at the Wintermute dinner (Open the right doors).
- **Industries:** photo, serif title, short sans list. They sit right under the client quotes (Alkida, 2026-10-21: the repositioning is the point of the rebrand). Frontier Technology gets RoboStrategy's Nasdaq bell photo when Eden sends it.
- **Case study cards:** image (16:9, cropped inside any broadcast frame with every person whole, in color with the shared `--photo-grade`), client label, card-size serif title, three figures as rows (figure left, label right, hairline between rows) so every label sits on one line, "View case study". No card box. The whole card is the link; its title underline appears on hover only. The rows of the three cards line up (CSS subgrid).
- **Quotes:** Newsreader 300 at the quote size, opening mark hung outside the text edge, name and title in Geist below a short hairline. No quote-mark ornaments larger than the text.
- **Team:** a carousel on the homepage (call, 2026-10-22: a carousel "that then leads to like everyone's bio and more information"; a static row "doesn't really look good"), between the dinners band and the contact band. Desktop: "The team", "Meet the full team" and two round arrow buttons in columns 1-3; the carousel in columns 4-12 shows about two and a half 4:5 portraits, so it slides even with three people (Joe, 2026-10-22, accepting slightly softer photos from the 500 px headshots). Tablets: heading row on top, 2.3 portraits. Phones: 1.35 portraits, swipe only. Native sideways scrolling with snap; the arrows step one portrait and switch off at either end, and hide when nothing scrolls. Each card (color portrait in the shared grade, name, title, "Read bio") opens the bio in a native dialog with focus kept inside it and returned to the card. Alkida and Joseph join when their headshots arrive. The mobile menu follows the same focus rules.
- **Dinners band (homepage):** flat band-bg, on-dark text: label and headline in columns 1-6, the doc's two paragraphs and "See our dinners" in columns 8-12, then the Wintermute recap film across the content width (16:9, 4:3 on phones).
- **Dinner film:** Eden's 21-second recap, silent, no grade. A still from it is the poster at every size; the film loads only as it nears the screen (720p on phones and with data saver, 1080p elsewhere), plays muted on a loop while a quarter of it is on screen, and fades in over the poster once playing. A round pause/play button sits bottom right; a pause by the visitor holds. Reduced motion and data saver start on the poster with a play button. If autoplay is refused (iPhone Low Power Mode), the button shows play.
- **Dinners page:** headline and copy, the film as the lead, then the numbers beside a tall photo of the room and the quote beside a photo of guests talking. No gallery (Alkida, 2026-10-21: "a little bit more scattered throughout the page").
- **Contact band:** a warm-graded skyline photograph under the live near-black scrim. Columns 1-5: headline, body, the bare email address as a link (no "Or email" lead-in), and the word list in one line under a hairline (hidden on phones). Columns 7-12: the form on a flat page-color panel with a hairline edge, which takes the place of the doc's "Talk to Eden" button. The band carries id `contact`, so every "Talk to Eden" lands on headline and form together. Stacked below 900px. Check text contrast against the scrimmed photo at every crop, including the translucent on-dark text. Inside the panel the normal accent focus ring applies.
- **Form:** labels above fields; name and email side by side, then company and the message across the full width; 52px fields at white 4% with a white 12% border; mint focus border and ring; the submit button carries the arrow; errors in text (not color alone). The form section inside the band has id `contact-form`.

## Motion

Calm, but the page should feel alive (Alkida, 2026-10-21: "more dynamic and visual"). Everything that moves on its own has a pause control or stops when it leaves the screen, and phones get the same content without depending on hover.

- **Reveal:** content blocks fade in and rise 12px over 500ms with `cubic-bezier(0.16, 1, 0.3, 1)` when they enter the viewport, staggered 80ms within a group. Once only.
- **Hover:** color and border changes over 150-200ms. The only hover movement is a 3px arrow nudge, on mouse devices only. No scale on cards, no tilt, no parallax.
- **Figures:** the three proof numbers count up from zero over 1.6s (ease-out, 120ms apart) the first time they scroll into view. Screen readers get the final number only.
- **Pillar photos:** crossfade over 600ms and settle from 1.04 scale over 1.4s.
- **Reduced motion:** with `prefers-reduced-motion: reduce` (also when switched on mid-visit), nothing moves: reveals show immediately, numbers show their final value, the strips become static grids, the pillar photos don't step, the film waits on its poster for a press of play, smooth scrolling is off.
- Animate `transform` and `opacity` only.

## Do's and Don'ts

- Do keep copy exactly as Eden supplies it. Numbers too.
- Do use real photographs only, all in color, in one warm, slightly desaturated grade (`--photo-grade`), TV frames included. A heavier mute reads as faded. No black-and-white photos: they read as a different site.
- Do let space do the separating. Hairlines before boxes, boxes almost never.
- Do keep every logo one ink color and optically balanced.
- Don't use italic headings, glows, drop shadows, pills or rounded cards. The brand gradient only where Colors allows it.
- Don't add a third typeface or any color the live site doesn't use.
- Don't use stock clichés (handshakes, laptops, coins, circuit boards) or AI-generated images.
- Don't use a photo in the hero that doesn't say what Eden does. A detail shot (a place setting, a glass) reads as a restaurant. The hero shows the world Eden works in (New York's financial district) until Eden's own video replaces it.
- Don't use numbered chapter labels beside headlines, or icon rows in circles.
- Don't animate layout properties, and don't animate anything that the reader didn't scroll to.
- Don't change these values as a side effect of another task. Change them on purpose, then update this file.
