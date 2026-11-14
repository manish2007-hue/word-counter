import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

function aiWorkspaceDevPlugin() {
  return {
    name: 'ai-workspace-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/ai-workspace') && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const { executeAIWorkspaceAction, streamAIWorkspaceAction } = await server.ssrLoadModule('/src/lib/aiWorkspaceService.ts');
              
              if (body.options?.stream) {
                res.writeHead(200, {
                  'Content-Type': 'text/event-stream; charset=utf-8',
                  'Cache-Control': 'no-cache',
                  'Connection': 'keep-alive',
                  'Access-Control-Allow-Origin': '*'
                });
                await streamAIWorkspaceAction(body, process.env.GEMINI_API_KEY, (chunk) => {
                  res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
                });
                res.write('data: [DONE]\n\n');
                res.end();
                return;
              }

              const result = await executeAIWorkspaceAction(body, process.env.GEMINI_API_KEY);
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.end(JSON.stringify(result));
            } catch (err) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.end(JSON.stringify({ error: err.message || 'AI Workspace processing error' }));
            }
          });
          return;
        }

        if (req.url && req.url.startsWith('/api/ai-workspace') && req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          });
          res.end();
          return;
        }

        next();
      });
    }
  };
}

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
    '/academic-essay-counter': '/academic-word-counter',
    '/pdf-word-counter': '/docx-pdf-word-counter-private',
    '/llm-token-counter': '/ai-token-counter',
    '/text-diff-checker': '/diff-checker',
    '/privacy-policy': '/privacy'
  },
  server: {
    port: 5173,
    host: true
  },
  vite: {
    plugins: [tailwindcss(), aiWorkspaceDevPlugin()],
    optimizeDeps: {
      include: ['mammoth', 'pdfjs-dist']
    }
  }
});
