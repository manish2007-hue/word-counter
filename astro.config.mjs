import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.GITHUB_ACTIONS ? 'https://manish2007-hue.github.io' : 'https://wordcountr.app',
  base: process.env.GITHUB_ACTIONS ? '/word-counter' : '/',
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
