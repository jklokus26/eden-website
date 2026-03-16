import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
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
        news: resolve(__dirname, 'news/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        results: resolve(__dirname, 'results/index.html'),
        recentWork: resolve(__dirname, 'recent-work/index.html'),
      }
    }
  }
});
