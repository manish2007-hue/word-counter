import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.GITHUB_ACTIONS ? 'https://manish2007-hue.github.io' : 'https://cleanwordcounter.com',
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
