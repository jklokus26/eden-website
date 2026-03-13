# Eden Communications Website

Marketing website for Eden Communications, a crypto and fintech PR agency.

**Live URL:** https://eden-communications.vercel.app
**Auto-deploy:** Every push to `main` goes live on Vercel within ~60 seconds.

## Critical Rules

1. **Every push is a live deploy.** Test your changes mentally before committing. If unsure, describe what you plan to do and ask for confirmation first.
2. **Never modify animation or layout code** unless specifically asked. The files in `src/animations.js`, `src/components/`, and `src/styles/` control the site's visual design and are carefully tuned. Content changes should only touch `data/` files and occasionally HTML files.
3. **Follow existing patterns exactly.** When adding new content (case studies, team members, news items), copy the structure of an existing entry. Do not invent new fields or change the data shape.
4. **Keep the dark theme and brand intact.** Primary background is dark (#020408 area), accent color is #c8ff00 (yellow-green). Typography is Schibsted Grotesk for headings, Inter for body. Do not change colors, fonts, or spacing without explicit approval.
5. **Images go in `public/assets/images/`**, logos in `public/assets/logos/`. Use descriptive filenames (e.g., `team-firstname.png`, `client-name-logo.png`). Always add alt text.
6. **Update `public/sitemap.xml`** whenever adding a new page.

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

## Do Not Touch (without explicit request)

| File/Directory | Why |
|---------------|-----|
| `src/animations.js` | Hero animation, scroll triggers, parallax — carefully calibrated |
| `src/styles/*.css` | Layout, spacing, responsive breakpoints — tuned across all devices |
| `src/components/nav.js` | Navigation structure and mobile hamburger menu |
| `src/components/footer.js` | Footer layout and links |
| `src/main.js` | Page routing logic |
| `public/assets/video/` | Hero video with baked-in color grading |
| `vercel.json` | Routing rules (only add new rewrites, don't modify existing) |

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
