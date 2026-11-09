import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.GITHUB_ACTIONS ? 'https://manish2007-hue.github.io' : 'https://cleanwordcounter.com',
  base: process.env.GITHUB_ACTIONS ? '/word-counter' : '/',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    }
  },
  redirects: {
    '/words-to-pages-converter': '/words-to-pages',
    '/academic-word-counter-without-citations': '/academic-word-counter',
    '/llm-token-counter': '/ai-token-counter',
    '/text-diff-checker': '/diff-checker',
    '/privacy-policy': '/privacy'
  },
  server: {
    port: 5173,
    host: true
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['mammoth', 'pdfjs-dist']
    }
  }
});
