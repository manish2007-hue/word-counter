// Server Routes & Content Verification Test
async function runRouteTests() {
  const port = process.env.PORT || 5173;
  console.log(`🌐 Testing Live Server Routes on http://localhost:${port} ...\n`);

  const routes = [
    { path: '/', expectedTexts: ['CleanWordCounter', 'How CleanWordCounter Compares', 'Social Media', 'Character Constraints', 'Privacy (100% Client-Side)'] },
    { path: '/social-media-counter', expectedTexts: ['Social Media Character Counter', 'X / Twitter Post', 'LinkedIn Post', 'Instagram Caption'] },
    { path: '/readability-checker', expectedTexts: ['Readability Score', 'Flesch Reading Ease', 'Flesch-Kincaid Grade Level', 'Gunning Fog'] },
    { path: '/keyword-density-checker', expectedTexts: ['Keyword Density', 'N-Gram Frequency', 'Filter stop words'] },
    { path: '/academic-word-counter', expectedTexts: ['Academic Word Counter', 'Exclude Citations', 'Official'] },
    { path: '/privacy', expectedTexts: ['Privacy Policy', '100% Client-Side', 'Zero-Transmission'] },
    { path: '/about', expectedTexts: ['About CleanWordCounter', 'Mission'] },
    { path: '/terms', expectedTexts: ['Terms of Service'] },
    { path: '/contact', expectedTexts: ['Contact the CleanWordCounter Team'] },
  ];

  let passed = 0;
  for (const route of routes) {
    try {
      const url = `http://localhost:${port}${route.path}`;
      const res = await fetch(url);
      if (res.status !== 200) {
        console.error(`❌ FAILED: ${route.path} returned status ${res.status}`);
        process.exit(1);
      }
      const html = await res.text();
      for (const text of route.expectedTexts) {
        if (!html.includes(text)) {
          console.error(`❌ FAILED: ${route.path} missing expected content "${text}"`);
          process.exit(1);
        }
      }
      console.log(`✅ PASSED: ${route.path} (HTTP 200, all expected content verified)`);
      passed++;
    } catch (err: any) {
      console.error(`❌ FAILED: Route ${route.path} connection error: ${err.message}`);
      process.exit(1);
    }
  }

  console.log(`\n🎉 ALL ${passed} LIVE ROUTES VERIFIED SUCCESSFULLY ON PORT ${port}!`);
}

runRouteTests();
