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
        news: resolve(__dirname, 'news/index.html'),
      }
    }
  }
});
