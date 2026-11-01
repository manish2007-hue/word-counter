import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wordcountr.app',
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
