import { resolve } from 'path';
import { defineConfig } from 'vite';
import { crawlerFallbacks } from './build/crawler-fallbacks.js';

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

export default defineConfig({
  plugins: [shareImageOrigin, crawlerFallbacks],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gripShipping: resolve(__dirname, 'case-studies/grip-shipping.html'),
        franzy: resolve(__dirname, 'case-studies/franzy.html'),
        stellar: resolve(__dirname, 'case-studies/stellar-development-foundation.html'),
        reedSmith: resolve(__dirname, 'case-studies/reed-smith-on-chain.html'),
        ondo: resolve(__dirname, 'case-studies/ondo.html'),
        bluePlanet: resolve(__dirname, 'case-studies/blue-planet-energy.html'),
        henkRogers: resolve(__dirname, 'case-studies/henk-rogers.html'),
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
