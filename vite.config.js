import { resolve } from 'path';
import { defineConfig } from 'vite';

// Share images (og:image, twitter:image) need an absolute URL. Production uses
// the live domain; a Vercel preview build points at its own deployment so the
// image exists when the preview link is shared.
const shareOrigin = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://edencommunications.com';

const shareImageOrigin = {
  name: 'share-image-origin',
  transformIndexHtml: (html) => html.replaceAll('%SHARE_ORIGIN%', shareOrigin),
};

// Two themes while Eden chooses (Joe, 2026-10-22): dark by default; a build
// with VITE_THEME=light marks the new-look pages body.theme-light and points
// the share image at the light one. The light theme takes the full-bleed
// photo hero like the dark one; VITE_LIGHT_HERO=editorial keeps the earlier
// framed-photo hero (body.hero-editorial, its photo preloaded instead) so Joe
// can compare the two light heroes. Remove once Eden picks.
const LIGHT = process.env.VITE_THEME === 'light';
const EDITORIAL = LIGHT && process.env.VITE_LIGHT_HERO === 'editorial';
const DARK_HERO_PRELOAD = /\s*<link rel="preload" as="image"[^>]*hero-cinema[^>]*>/g;
const LIGHT_HERO_PRELOAD = '\n  <link rel="preload" as="image" fetchpriority="high" href="/assets/images/home/hero-nyse-wide-1024.webp" imagesrcset="/assets/images/home/hero-nyse-wide-640.webp 640w, /assets/images/home/hero-nyse-wide-1024.webp 1024w, /assets/images/home/hero-nyse-wide-1600.webp 1600w, /assets/images/home/hero-nyse-wide-2400.webp 2400w" imagesizes="(max-width: 900px) 100vw, (max-width: 1280px) 52vw, 680px">';
const theme = {
  name: 'theme',
  transformIndexHtml: (html) => {
    if (!LIGHT || !html.includes('<body class="look-2026"')) return html;
    let out = html
      .replace('<body class="look-2026"', `<body class="look-2026 theme-light${EDITORIAL ? ' hero-editorial' : ''}"`)
      .replaceAll('/assets/images/og/eden-og-1200x630.jpg', '/assets/images/og/eden-og-light-1200x630.jpg');
    if (EDITORIAL && DARK_HERO_PRELOAD.test(out)) {
      out = out.replace(DARK_HERO_PRELOAD, '');
      out = out.replace('</head>', `${LIGHT_HERO_PRELOAD}\n</head>`);
    }
    return out;
  },
};

export default defineConfig({
  plugins: [shareImageOrigin, theme],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        caseStudies: resolve(__dirname, 'case-studies/index.html'),
        gripShipping: resolve(__dirname, 'case-studies/grip-shipping.html'),
        franzy: resolve(__dirname, 'case-studies/franzy.html'),
        stellar: resolve(__dirname, 'case-studies/stellar-development-foundation.html'),
        reedSmith: resolve(__dirname, 'case-studies/reed-smith-on-chain.html'),
        ondo: resolve(__dirname, 'case-studies/ondo.html'),
        bluePlanet: resolve(__dirname, 'case-studies/blue-planet-energy.html'),
        henkRogers: resolve(__dirname, 'case-studies/henk-rogers.html'),
        news: resolve(__dirname, 'news/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        results: resolve(__dirname, 'results/index.html'),
        recentWork: resolve(__dirname, 'recent-work/index.html'),
        dinners: resolve(__dirname, 'dinners/index.html'),
        silvia: resolve(__dirname, 'silvia/index.html'),
      }
    }
  }
});
