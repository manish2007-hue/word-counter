import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const today = new Date().toISOString().split('T')[0];

function getHtmlFiles(dir, base = '') {
  let results = [];
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

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run npm run build first.');
  process.exit(1);
}

const htmlFiles = getHtmlFiles(distDir);
const urls = [];

for (const f of htmlFiles) {
  // Exclude error pages
  if (f === '404.html' || f === '500.html') continue;

  let urlPath = '';
  if (f === 'index.html') {
    urlPath = '/';
  } else if (f.endsWith('/index.html')) {
    urlPath = '/' + f.replace(/\/index\.html$/, '/');
  } else {
    urlPath = '/' + f.replace(/\.html$/, '/');
  }

  // Determine priority & changefreq
  let priority = '0.8';
  let changefreq = 'weekly';

  if (urlPath === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (
    ['/tools/', '/compress-image/', '/resize-image/', '/image-to-pdf/', '/image-converter/'].includes(urlPath)
  ) {
    priority = '0.95';
    changefreq = 'daily';
  } else if (
    [
      '/words-to-pages/',
      '/words-to-speaking-time/',
      '/academic-word-counter/',
      '/clean-text/',
      '/diff-checker/',
      '/json-formatter/',
      '/fancy-text-generator/',
      '/text-repeater/',
      '/lorem-ipsum-generator/',
      '/hashtag-generator/',
      '/readability-checker/'
    ].includes(urlPath)
  ) {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (
    urlPath.startsWith('/words-to-pages/') ||
    urlPath.startsWith('/words-to-speaking-time/') ||
    urlPath.startsWith('/compress-image/') ||
    urlPath.startsWith('/character-counter/')
  ) {
    priority = '0.85';
    changefreq = 'weekly';
  } else if (['/about/', '/privacy/', '/terms/', '/contact/'].includes(urlPath)) {
    priority = '0.5';
    changefreq = 'monthly';
  }

  urls.push({
    loc: `https://cleanwordcounter.com${urlPath}`,
    lastmod: today,
    changefreq,
    priority
  });
}

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

fs.writeFileSync(sitemapPath, xml, 'utf-8');
console.log(`✅ Generated public/sitemap.xml with ${urls.length} verified URLs!`);
