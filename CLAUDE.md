# Eden Communications Website

## About This Site

Marketing website for Eden Communications, a crypto and fintech PR agency. Built with Vite, vanilla JavaScript, GSAP animations, and CSS.

**Live URL:** https://eden-communications.vercel.app (will move to edencommunications.com after DNS switch)

## Tech Stack

- **Build:** Vite 7
- **Animations:** GSAP 3 + ScrollTrigger + SplitType
- **Smooth scroll:** Lenis
- **Hosting:** Vercel (auto-deploys from this repo's `main` branch)
- **Contact form:** FormSubmit.co → hello@edencommunications.com

## Project Structure

```
├── index.html                    # Homepage
├── about/index.html              # About page
├── services/index.html           # Services page
├── results/index.html            # Results/metrics page
├── recent-work/index.html        # Recent work gallery
├── news/index.html               # News/press page
├── case-studies/
│   ├── index.html                # Case studies listing
│   ├── grip-shipping.html        # Case study: Grip Shipping
│   ├── franzy.html               # Case study: Franzy
│   ├── stellar-development-foundation.html
│   └── reed-smith-on-chain.html
├── data/                         # Content data (edit these to update site content)
│   ├── case-studies.js           # Case study content and metadata
│   ├── clients.js                # Client logos for homepage carousel
│   ├── coverage.js               # Press coverage items
│   ├── media-logos.js            # Media outlet logos
│   ├── news-items.js             # News page items
│   ├── services.js               # Services list and FAQ
│   ├── site-content.js           # Homepage copy, headlines, descriptions
│   ├── team.js                   # Team member bios and photos
│   └── testimonials.js           # Client testimonials
├── src/
│   ├── main.js                   # App entry point and page router
│   ├── animations.js             # All GSAP scroll/entrance animations
│   ├── components/               # Shared components (nav, footer, form, etc.)
│   ├── pages/                    # Page-specific rendering logic
│   └── styles/                   # CSS files (one per page/component)
├── public/
│   ├── assets/images/            # Photos, screenshots
│   ├── assets/video/             # Hero background video
│   ├── assets/logos/             # Client and media logos
│   ├── assets/icons/             # Favicons, social icons
│   ├── robots.txt                # Search engine directives
│   ├── sitemap.xml               # XML sitemap for SEO
│   └── llms.txt                  # AI crawler guidance
└── vercel.json                   # Vercel routing config
```

## How to Update Content

Most site content lives in the `data/` directory as JavaScript modules. To update text, add team members, or modify services:

1. Edit the relevant file in `data/`
2. Commit and push to `main`
3. Vercel auto-deploys within ~60 seconds

### Common Tasks

**Update homepage headline or copy:**
Edit `data/site-content.js`

**Add a new team member:**
Add an entry to `data/team.js` with name, title, bio, and photo path. Place their photo in `public/assets/images/`.

**Add a new case study:**
1. Add the case study data to `data/case-studies.js` (follow the existing pattern with id, title, client, metrics, content sections)
2. Create a new HTML file in `case-studies/` (copy an existing one as template)
3. Add the new HTML file to `vite.config.js` in the `rollupOptions.input` object
4. Add a rewrite rule to `vercel.json` if needed
5. Update `public/sitemap.xml` with the new URL

**Update services or FAQ:**
Edit `data/services.js`

**Add press coverage:**
Add items to `data/coverage.js` and/or `data/news-items.js`

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (usually http://localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
```

## Design Notes

- **Dark theme** with accent color `#c8ff00` (yellow-green)
- **Typography:** Schibsted Grotesk (headings) + Inter (body) via Google Fonts
- **Animations:** Blur-to-focus hero entrance, scroll-triggered reveals, parallax, card tilt on hover
- **Mobile breakpoints:** 480px, 768px, 1024px
- **All images use lazy loading** except hero video poster
- **SEO:** Each page has unique meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)
