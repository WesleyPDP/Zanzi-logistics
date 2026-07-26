// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zanzi-logistics.pages.dev',
  integrations: [sitemap()],
  redirects: {
    // common inbound guesses, so old links and typed URLs still land
    '/quote': '/contact',
    '/coverage': '/network',
    '/freight': '/services',
  },
  build: {
    // keep stylesheets external so the CSP can stay `style-src 'self'`
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // never inline scripts/assets: the CSP forbids inline <script>
      assetsInlineLimit: 0,
    },
  },
});
