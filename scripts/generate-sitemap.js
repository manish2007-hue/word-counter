import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(process.cwd(), 'public');
const sitemapPublicPath = path.join(publicDir, 'sitemap.xml');
const sitemapDistPath = path.join(distDir, 'sitemap.xml');
const robotsPublicPath = path.join(publicDir, 'robots.txt');
const robotsDistPath = path.join(distDir, 'robots.txt');

const today = new Date().toISOString().split('T')[0];

// The 29 Core Standalone Tools Canonical URLs
const CORE_29_TOOLS = [
  '/',
  '/academic-word-counter/',
  '/words-to-pages/',
  '/words-to-speaking-time/',
  '/readability-checker/',
  '/flesch-kincaid-readability-calculator/',
  '/docx-pdf-word-counter-private/',
  '/clean-text/',
  '/remove-line-breaks/',
  '/case-converter/',
  '/diff-checker/',
  '/lorem-ipsum-generator/',
  '/text-repeater/',
  '/fancy-text-generator/',
  '/qr-code-generator/',
  '/json-formatter/',
  '/base64-converter/',
  '/ai-token-counter/',
  '/hashtag-generator/',
  '/social-media-counter/',
  '/keyword-density-checker/',
  '/website-word-counter/',
  '/compress-image/',
  '/resize-image/',
  '/image-converter/',
  '/image-to-pdf/',
  '/pdf-to-jpg/',
  '/merge-pdf/',
  '/split-pdf/'
];

function getHtmlFiles(dir, base = '') {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const rel = path.join(base, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full, rel));
    } else if (file.endsWith('.html')) {
      results.push(rel.replace(/\\/g, '/'));
    }
  }
  return results;
}

const urlMap = new Map();

// Helper to determine priority and changefreq
function getMetaForPath(urlPath) {
  let priority = '0.8';
  let changefreq = 'weekly';

  if (urlPath === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (CORE_29_TOOLS.includes(urlPath) || urlPath === '/tools/') {
    priority = '0.95';
    changefreq = 'daily';
  } else if (
    urlPath.startsWith('/blog/') ||
    urlPath.startsWith('/character-counter/')
  ) {
    priority = '0.85';
    changefreq = 'weekly';
  } else if (
    urlPath.startsWith('/words-to-pages/') ||
    urlPath.startsWith('/words-to-speaking-time/') ||
    urlPath.startsWith('/words-to-reading-time/') ||
    urlPath.startsWith('/compress-image/') ||
    urlPath.startsWith('/resize-image/')
  ) {
    priority = '0.8';
    changefreq = 'monthly';
  } else if (['/about/', '/privacy/', '/terms/', '/contact/'].includes(urlPath)) {
    priority = '0.5';
    changefreq = 'monthly';
  }

  return { priority, changefreq };
}

// 1. Seed Core 29 Tools + Hub
for (const tool of CORE_29_TOOLS) {
  const { priority, changefreq } = getMetaForPath(tool);
  urlMap.set(tool, {
    loc: `https://cleanwordcounter.com${tool}`,
    lastmod: today,
    changefreq,
    priority
  });
}

// 2. Discover from dist if built
if (fs.existsSync(distDir)) {
  const htmlFiles = getHtmlFiles(distDir);
  for (const f of htmlFiles) {
    if (f === '404.html' || f === '500.html') continue;

    let urlPath = '';
    if (f === 'index.html') {
      urlPath = '/';
    } else if (f.endsWith('/index.html')) {
      urlPath = '/' + f.replace(/\/index\.html$/, '/');
    } else {
      urlPath = '/' + f.replace(/\.html$/, '/');
    }

    const { priority, changefreq } = getMetaForPath(urlPath);
    urlMap.set(urlPath, {
      loc: `https://cleanwordcounter.com${urlPath}`,
      lastmod: today,
      changefreq,
      priority
    });
  }
}

// Ensure legal pages are explicitly present
const legalPages = ['/about/', '/privacy/', '/terms/', '/contact/', '/blog/', '/tools/'];
for (const lp of legalPages) {
  if (!urlMap.has(lp)) {
    const { priority, changefreq } = getMetaForPath(lp);
    urlMap.set(lp, {
      loc: `https://cleanwordcounter.com${lp}`,
      lastmod: today,
      changefreq,
      priority
    });
  }
}

const urls = Array.from(urlMap.values());

// Sort: highest priority first, then alphabetical
urls.sort((a, b) => {
  if (b.priority !== a.priority) {
    return parseFloat(b.priority) - parseFloat(a.priority);
  }
  return a.loc.localeCompare(b.loc);
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const u of urls) {
  xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
}

xml += `</urlset>\n`;

// Write to public/sitemap.xml
fs.writeFileSync(sitemapPublicPath, xml, 'utf-8');
console.log(`✅ Generated public/sitemap.xml with ${urls.length} URLs (including all 29 tools)!`);

// If dist exists, also sync to dist/
if (fs.existsSync(distDir)) {
  fs.writeFileSync(sitemapDistPath, xml, 'utf-8');
  console.log(`✅ Synced dist/sitemap.xml`);
  if (fs.existsSync(robotsPublicPath)) {
    fs.copyFileSync(robotsPublicPath, robotsDistPath);
    console.log(`✅ Synced dist/robots.txt`);
  }
}
