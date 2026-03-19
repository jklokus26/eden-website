# Eden Communications Website

Marketing website for Eden Communications, a crypto and fintech PR agency.

**Live URL:** https://eden-communications.vercel.app
**Auto-deploy:** Every push to `main` goes live on Vercel within ~60 seconds.

## Rules

0. **ALWAYS commit and push directly to the `main` branch.** Do NOT create feature branches, side branches, or branches named `claude/*`. Always use `main`. This repo auto-deploys from `main` to the live site. Feature branches only deploy as previews, which is not what we want.
1. **Every push is a live deploy.** Changes go live on Vercel within ~60 seconds of pushing to `main`. Before committing, describe what you plan to change and confirm with the user first.
2. **Only change what was asked for.** Do not make unsolicited changes to files outside the scope of the request. If someone asks to update a team bio, only edit `data/team.js`. Do not also "improve" animations, restyle components, or refactor code.
3. **Follow existing patterns exactly.** When adding new content (case studies, team members, news items), copy the structure of an existing entry. Do not invent new fields or change the data shape.
4. **Images go in `public/assets/images/`**, logos in `public/assets/logos/`. Use descriptive filenames (e.g., `team-firstname.png`, `client-name-logo.png`). Always add alt text.
5. **Update `public/sitemap.xml`** whenever adding a new page.

## Safe Changes (data/ files)

These files contain all site content. Editing them is the primary way to update the site:

| File | What It Controls |
|------|-----------------|
| `data/site-content.js` | Homepage headlines, descriptions, hero text |
| `data/team.js` | Team member names, titles, bios, photos |
| `data/services.js` | Service offerings and FAQ section |
| `data/case-studies.js` | Case study content, metrics, quotes, images |
| `data/clients.js` | Client logos on homepage carousel |
| `data/coverage.js` | Press coverage items (homepage + results page) |
| `data/news-items.js` | News page articles and screenshots |
| `data/testimonials.js` | Client testimonials |
| `data/media-logos.js` | Media outlet logos in the ticker |

To update text, swap a photo, add a team member, or change a testimonial — edit the relevant data file above. Follow the exact format of existing entries.

## Adding a New Case Study

This is a multi-file change. Follow these steps in order:

1. Add the case study data to `data/case-studies.js` — copy an existing entry's full structure (id, title, client, heroImage, metrics array, content sections, quotes)
2. Create a new HTML file in `case-studies/` — copy `case-studies/grip-shipping.html` as a template, update the meta tags (title, description, og:title, og:description, og:url, canonical URL)
3. Register the new page in `vite.config.js` — add an entry to `rollupOptions.input`
4. Add a URL rewrite in `vercel.json` if the URL needs clean routing
5. Add the URL to `public/sitemap.xml`

## Adding a New Page

Only do this if explicitly requested. New pages require:

1. An HTML file (copy an existing page's HTML as template)
2. A page renderer in `src/pages/` (copy an existing one)
3. A route in `src/main.js`
4. Registration in `vite.config.js`
5. Entry in `public/sitemap.xml`
6. Navigation link in `src/components/nav.js`

## Design Reference

These are the current brand and design values. You can change any of them if the user asks — just don't change them as a side effect of another task.

- **Dark theme:** Background #020408, accent color #c8ff00 (yellow-green)
- **Typography:** Schibsted Grotesk (headings), Inter (body) via Google Fonts
- **Animations:** Blur-to-focus hero entrance, scroll-triggered reveals, parallax, card tilt on hover
- **Mobile breakpoints:** 480px, 768px, 1024px
- **Hero video:** Color grading is baked into the video files (not CSS filters) for performance

## Architecture Reference

These files control site structure and behavior. They can all be modified when the user requests it, but changes here affect the whole site, so be precise.

| File/Directory | What It Controls |
|---------------|-----------------|
| `src/animations.js` | Hero animation, scroll triggers, parallax, card tilt |
| `src/styles/*.css` | Layout, spacing, responsive breakpoints (one file per page/component) |
| `src/components/` | Nav, footer, contact form, section dividers, ticker, loader |
| `src/pages/` | Page-specific rendering logic (one file per page) |
| `src/main.js` | Page routing — determines which page renderer to load |
| `public/assets/video/` | Hero background video (WebM + MP4 with baked color grading) |
| `vercel.json` | URL routing rules (add new rewrites for new pages, don't remove existing) |

## Rolling Back Changes

If a change doesn't look right, say "roll back the last change" to revert the most recent commit. This will push a revert commit and Vercel will auto-deploy the previous version.

## Tech Stack (for reference)

- **Build:** Vite
- **Animations:** GSAP + ScrollTrigger + SplitType
- **Smooth scroll:** Lenis
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Contact form:** FormSubmit.co → hello@edencommunications.com
- **SEO:** Unique meta tags, Open Graph, Twitter Cards, and JSON-LD structured data per page

## Local Development (optional)

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
```
