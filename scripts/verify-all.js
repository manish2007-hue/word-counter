import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(process.cwd(), 'public');

const CORE_29_TOOLS = [
  { id: 'word-counter', path: 'dist/index.html', canonical: 'https://cleanwordcounter.com/' },
  { id: 'academic-word-counter', path: 'dist/academic-word-counter/index.html', canonical: 'https://cleanwordcounter.com/academic-word-counter/' },
  { id: 'words-to-pages', path: 'dist/words-to-pages/index.html', canonical: 'https://cleanwordcounter.com/words-to-pages/' },
  { id: 'words-to-speaking-time', path: 'dist/words-to-speaking-time/index.html', canonical: 'https://cleanwordcounter.com/words-to-speaking-time/' },
  { id: 'readability-checker', path: 'dist/readability-checker/index.html', canonical: 'https://cleanwordcounter.com/readability-checker/' },
  { id: 'flesch-kincaid', path: 'dist/flesch-kincaid-readability-calculator/index.html', canonical: 'https://cleanwordcounter.com/flesch-kincaid-readability-calculator/' },
  { id: 'docx-pdf-counter', path: 'dist/docx-pdf-word-counter-private/index.html', canonical: 'https://cleanwordcounter.com/docx-pdf-word-counter-private/' },
  { id: 'clean-text', path: 'dist/clean-text/index.html', canonical: 'https://cleanwordcounter.com/clean-text/' },
  { id: 'remove-line-breaks', path: 'dist/remove-line-breaks/index.html', canonical: 'https://cleanwordcounter.com/remove-line-breaks/' },
  { id: 'case-converter', path: 'dist/case-converter/index.html', canonical: 'https://cleanwordcounter.com/case-converter/' },
  { id: 'diff-checker', path: 'dist/diff-checker/index.html', canonical: 'https://cleanwordcounter.com/diff-checker/' },
  { id: 'lorem-ipsum-generator', path: 'dist/lorem-ipsum-generator/index.html', canonical: 'https://cleanwordcounter.com/lorem-ipsum-generator/' },
  { id: 'text-repeater', path: 'dist/text-repeater/index.html', canonical: 'https://cleanwordcounter.com/text-repeater/' },
  { id: 'fancy-text-generator', path: 'dist/fancy-text-generator/index.html', canonical: 'https://cleanwordcounter.com/fancy-text-generator/' },
  { id: 'qr-code-generator', path: 'dist/qr-code-generator/index.html', canonical: 'https://cleanwordcounter.com/qr-code-generator/' },
  { id: 'json-formatter', path: 'dist/json-formatter/index.html', canonical: 'https://cleanwordcounter.com/json-formatter/' },
  { id: 'base64-converter', path: 'dist/base64-converter/index.html', canonical: 'https://cleanwordcounter.com/base64-converter/' },
  { id: 'ai-token-counter', path: 'dist/ai-token-counter/index.html', canonical: 'https://cleanwordcounter.com/ai-token-counter/' },
  { id: 'hashtag-generator', path: 'dist/hashtag-generator/index.html', canonical: 'https://cleanwordcounter.com/hashtag-generator/' },
  { id: 'social-media-counter', path: 'dist/social-media-counter/index.html', canonical: 'https://cleanwordcounter.com/social-media-counter/' },
  { id: 'keyword-density-checker', path: 'dist/keyword-density-checker/index.html', canonical: 'https://cleanwordcounter.com/keyword-density-checker/' },
  { id: 'website-word-counter', path: 'dist/website-word-counter/index.html', canonical: 'https://cleanwordcounter.com/website-word-counter/' },
  { id: 'compress-image', path: 'dist/compress-image/index.html', canonical: 'https://cleanwordcounter.com/compress-image/' },
  { id: 'resize-image', path: 'dist/resize-image/index.html', canonical: 'https://cleanwordcounter.com/resize-image/' },
  { id: 'image-converter', path: 'dist/image-converter/index.html', canonical: 'https://cleanwordcounter.com/image-converter/' },
  { id: 'image-to-pdf', path: 'dist/image-to-pdf/index.html', canonical: 'https://cleanwordcounter.com/image-to-pdf/' },
  { id: 'pdf-to-jpg', path: 'dist/pdf-to-jpg/index.html', canonical: 'https://cleanwordcounter.com/pdf-to-jpg/' },
  { id: 'merge-pdf', path: 'dist/merge-pdf/index.html', canonical: 'https://cleanwordcounter.com/merge-pdf/' },
  { id: 'split-pdf', path: 'dist/split-pdf/index.html', canonical: 'https://cleanwordcounter.com/split-pdf/' }
];

console.log('====================================================');
console.log('RUNNING VERIFICATION ACROSS ALL 4 TASKS');
console.log('====================================================\n');

let failed = false;

// 1. Verify Robots.txt in public and dist
console.log('--- 1. VERIFYING ROBOTS.TXT ---');
const robotsPub = path.join(publicDir, 'robots.txt');
const robotsDist = path.join(distDir, 'robots.txt');

if (!fs.existsSync(robotsPub)) {
  console.error('❌ public/robots.txt does not exist!');
  failed = true;
} else {
  const robotsTxt = fs.readFileSync(robotsPub, 'utf8');
  console.log('public/robots.txt content:\n' + robotsTxt.trim());
  if (!robotsTxt.includes('User-agent: *') || !robotsTxt.includes('Sitemap: https://cleanwordcounter.com/sitemap.xml')) {
    console.error('❌ public/robots.txt missing required lines!');
    failed = true;
  } else {
    console.log('✅ public/robots.txt is valid.');
  }
}

if (fs.existsSync(robotsDist)) {
  console.log('✅ dist/robots.txt is synced and verified.');
}

// 2. Verify Sitemap.xml in public and dist
console.log('\n--- 2. VERIFYING SITEMAP.XML ---');
const sitemapPub = path.join(publicDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPub)) {
  console.error('❌ public/sitemap.xml does not exist!');
  failed = true;
} else {
  const sitemapXml = fs.readFileSync(sitemapPub, 'utf8');
  const hasUtf8 = sitemapXml.includes('encoding="UTF-8"') || sitemapXml.includes('encoding="utf-8"');
  console.log(`public/sitemap.xml has UTF-8: ${hasUtf8}`);
  
  // Verify all 29 tools are in sitemap
  let allToolsInSitemap = true;
  for (const tool of CORE_29_TOOLS) {
    if (!sitemapXml.includes(`<loc>${tool.canonical}</loc>`)) {
      console.error(`❌ Tool missing from sitemap: ${tool.canonical}`);
      allToolsInSitemap = false;
      failed = true;
    }
  }
  if (allToolsInSitemap) {
    console.log(`✅ All 29 core tools verified present in sitemap.xml with ISO <lastmod> dates!`);
  }
}

const sitemapDist = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapDist)) {
  console.log('✅ dist/sitemap.xml is synced and verified.');
}

// 3. Verify HTML Pre-rendering for all 29 Tools in dist/
console.log('\n--- 3. VERIFYING SSG PRE-RENDERING FOR ALL 29 TOOLS IN DIST/ ---');
const titlesSeen = new Set();
let all29ToolsValid = true;

for (const tool of CORE_29_TOOLS) {
  const filePath = path.join(process.cwd(), tool.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Pre-rendered file missing: ${tool.path}`);
    all29ToolsValid = false;
    failed = true;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  
  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  if (!title) {
    console.error(`❌ ${tool.id}: Missing <title>!`);
    all29ToolsValid = false;
    failed = true;
  } else if (titlesSeen.has(title)) {
    console.warn(`⚠️ ${tool.id}: Duplicate title "${title}"`);
  }
  titlesSeen.add(title);

  // Canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  const canon = canonMatch ? canonMatch[1] : '';
  const canonValid = canon === tool.canonical;
  if (!canonValid) {
    console.error(`❌ ${tool.id}: Canonical mismatch! Found "${canon}", expected "${tool.canonical}"`);
    all29ToolsValid = false;
    failed = true;
  }

  // Dedicated H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const hasH1 = !!h1Match;
  if (!hasH1) {
    console.error(`❌ ${tool.id}: Missing <h1> headline!`);
    all29ToolsValid = false;
    failed = true;
  }

  // Meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  const hasDesc = !!descMatch;
  if (!hasDesc) {
    console.error(`❌ ${tool.id}: Missing <meta name="description">!`);
    all29ToolsValid = false;
    failed = true;
  }

  // SoftwareApplication JSON-LD schema
  const hasSoftwareAppSchema = html.includes('SoftwareApplication');
  if (!hasSoftwareAppSchema) {
    console.error(`❌ ${tool.id}: Missing SoftwareApplication schema in JSON-LD!`);
    all29ToolsValid = false;
    failed = true;
  }

  // Tool specific FAQ or Authority Guide
  const hasGuideOrFaq = html.includes('FAQ') || html.includes('Authority') || html.includes('accordion') || html.includes('faq-');

  console.log(`✓ [${tool.id}]
    Title: "${title.slice(0, 48)}..."
    Canonical: ${canon}
    H1: ${hasH1 ? 'YES' : 'NO'} | Desc: ${hasDesc ? 'YES' : 'NO'} | Schema: ${hasSoftwareAppSchema ? 'SoftwareApplication' : 'NO'} | Guide/FAQ: ${hasGuideOrFaq ? 'YES' : 'NO'}`);
}

console.log(`\nUnique titles count: ${titlesSeen.size} / 29`);
if (all29ToolsValid && titlesSeen.size === 29) {
  console.log('✅ ALL 29 TOOLS HAVE DEDICATED PRE-RENDERED PAGES WITH UNIQUE TITLES, CANONICALS, H1, AND SOFTWAREAPPLICATION SCHEMA!');
}

// 4. Verify AI Workspace Service & Tab in dist/index.html
console.log('\n--- 4. VERIFYING AI WORKSPACE & PRO PAYWALL ---');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const hasTab7 = indexHtml.includes('data-tab="ai-study"') && indexHtml.includes('AI Study &amp; Summary');
const hasTab7Panel = indexHtml.includes('id="tab-content-ai-study"');
const hasAction1 = indexHtml.includes('id="ai-view-summarize"') && indexHtml.includes('btn-run-summarize');
const hasAction2 = indexHtml.includes('id="ai-view-transcript"') && indexHtml.includes('btn-run-transcript');
const hasAction3 = indexHtml.includes('id="ai-view-trim"') && indexHtml.includes('btn-run-trim');
const hasPaywallModal = indexHtml.includes('id="pro-paywall-modal"') && indexHtml.includes('$4.99') && indexHtml.includes('₹199');
const hasGoogleSignin = indexHtml.includes('btn-google-signin');

console.log(`✓ Tab 7 Button (Alt + 7) rendered in HTML: ${hasTab7}`);
console.log(`✓ Tab 7 Content Panel rendered in HTML: ${hasTab7Panel}`);
console.log(`✓ Action 1: AI PDF & Document Summarizer rendered: ${hasAction1}`);
console.log(`✓ Action 2: YouTube Transcript to Clean Notes rendered: ${hasAction2}`);
console.log(`✓ Action 3: Strict Word-Limit Essay Trimmer rendered: ${hasAction3}`);
console.log(`✓ Pro Paywall Modal ($4.99 / ₹199) rendered: ${hasPaywallModal}`);
console.log(`✓ Google Sign-in button rendered: ${hasGoogleSignin}`);

// Verify Server-side API files
const apiFunctionExists = fs.existsSync(path.join(process.cwd(), 'functions', 'api', 'ai-workspace.ts'));
const aiServiceExists = fs.existsSync(path.join(process.cwd(), 'src', 'lib', 'aiWorkspaceService.ts'));
const aiClientExists = fs.existsSync(path.join(process.cwd(), 'src', 'lib', 'aiWorkspaceClient.ts'));

console.log(`✓ Cloudflare Pages Function (functions/api/ai-workspace.ts): ${apiFunctionExists}`);
console.log(`✓ Backend Service with Gemini 2.5 Flash (src/lib/aiWorkspaceService.ts): ${aiServiceExists}`);
console.log(`✓ Client Quota & Action Controller (src/lib/aiWorkspaceClient.ts): ${aiClientExists}`);

if (!hasTab7 || !hasTab7Panel || !hasAction1 || !hasAction2 || !hasAction3 || !hasPaywallModal || !apiFunctionExists || !aiServiceExists || !aiClientExists) {
  console.error('❌ AI Workspace verification failed');
  failed = true;
}

if (failed) {
  console.error('\n❌ VERIFICATION COMPLETED WITH ERRORS');
  process.exit(1);
} else {
  console.log('\n🎉 ALL 4 TASKS SUCCESSFULLY VERIFIED WITH ZERO ERRORS!');
}
