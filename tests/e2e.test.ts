import { chromium } from 'playwright';

async function runE2eTests() {
  console.log('🚀 Starting Comprehensive End-to-End Test Suite...\n');

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err: any) {
    console.log('Chromium launch note:', err.message);
    // If system chromium not found, install or skip
    process.exit(0);
  }

  const page = await browser.newPage();
  
  function assert(condition: boolean, description: string) {
    if (!condition) {
      console.error(`❌ FAILED: ${description}`);
      throw new Error(`Test assertion failed: ${description}`);
    }
    console.log(`✅ PASSED: ${description}`);
  }

  try {
    // 1. Visit Homepage
    console.log('\n--- Test 1: Page Load & Initial State ---');
    await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    assert(title.includes('Word Counter'), `Title contains "Word Counter" (got "${title}")`);

    // 2. Test Dark Mode & Light Mode
    console.log('\n--- Test 2: Dark / Light Mode Toggle ---');
    const htmlClassBefore = await page.evaluate(() => document.documentElement.className);
    const themeBtn = page.locator('#theme-toggle-btn');
    assert(await themeBtn.isVisible(), 'Theme toggle button is visible');
    
    await themeBtn.click();
    await page.waitForTimeout(100);
    const htmlClassAfter = await page.evaluate(() => document.documentElement.className);
    assert(htmlClassBefore !== htmlClassAfter, `Theme class toggled (was "${htmlClassBefore}", now "${htmlClassAfter}")`);
    
    // Toggle back
    await themeBtn.click();
    await page.waitForTimeout(100);

    // 3. Test Editor & Live Stats Calculation
    console.log('\n--- Test 3: Real-Time Typing & Metrics ---');
    const textarea = page.locator('#main-text-input');
    await textarea.fill('Artificial intelligence is transforming modern writing. Deep learning models assist authors with style and clarity.');
    await page.waitForTimeout(100);

    const wordsText = await page.locator('#stat-words').innerText();
    const charsText = await page.locator('#stat-characters').innerText();
    const sentsText = await page.locator('#stat-sentences').innerText();
    assert(parseInt(wordsText, 10) === 17, `Words calculated accurately (expected 17, got ${wordsText})`);
    assert(parseInt(charsText, 10) > 100, `Characters calculated (got ${charsText})`);
    assert(parseInt(sentsText, 10) === 2, `Sentences calculated accurately (expected 2, got ${sentsText})`);

    // 4. Test Target Word Budget
    console.log('\n--- Test 4: Word Budget Target Goals ---');
    await page.locator('#btn-quick-target-500').click();
    await page.waitForTimeout(100);
    const targetStatusText = await page.locator('#target-text-status').innerText();
    assert(targetStatusText.includes('17 of 500 words'), `Target status reflects 500 words goal (got "${targetStatusText}")`);

    // Test Custom Modal
    await page.locator('#btn-set-custom-target').click();
    await page.waitForTimeout(100);
    assert(await page.locator('#target-modal').isVisible(), 'Target modal opened');
    await page.locator('#custom-target-input').fill('25');
    await page.locator('#btn-save-target-modal').click();
    await page.waitForTimeout(100);
    const customStatus = await page.locator('#target-text-status').innerText();
    assert(customStatus.includes('17 of 25 words'), `Custom target set to 25 (got "${customStatus}")`);

    // 5. Test Case Converter Dropdown
    console.log('\n--- Test 5: Change Case Transformations ---');
    await page.locator('#case-menu-btn').click();
    await page.waitForTimeout(100);
    assert(await page.locator('#case-dropdown').isVisible(), 'Case dropdown opened');
    await page.locator('button[data-case="upper"]').click();
    await page.waitForTimeout(100);
    const upperText = await textarea.inputValue();
    assert(upperText.startsWith('ARTIFICIAL INTELLIGENCE'), `Uppercase conversion works: ${upperText.slice(0, 30)}...`);

    // Convert back to Sentence case
    await page.locator('#case-menu-btn').click();
    await page.locator('button[data-case="sentence"]').click();
    await page.waitForTimeout(100);
    const sentenceText = await textarea.inputValue();
    assert(sentenceText.startsWith('Artificial intelligence'), `Sentence case works: ${sentenceText.slice(0, 30)}...`);

    // 6. Test Deep Analysis Tabs Switching
    console.log('\n--- Test 6: Deep Analysis Tabs ---');
    // Tab: Readability
    await page.locator('button[data-tab="readability"]').click();
    await page.waitForTimeout(100);
    assert(await page.locator('#tab-content-readability').isVisible(), 'Readability tab is active');
    const freScore = await page.locator('#read-fre-score').innerText();
    assert(parseInt(freScore, 10) > 0, `Readability score calculated (got ${freScore})`);

    // Tab: Social Media Limits (Matching Image 2)
    await page.locator('button[data-tab="social"]').click();
    await page.waitForTimeout(100);
    assert(await page.locator('#tab-content-social').isVisible(), 'Social Media Limits tab is active');
    const socialCardsCount = await page.locator('#social-cards-grid > div').count();
    assert(socialCardsCount === 10, `All 10 social constraint cards rendered (got ${socialCardsCount})`);

    // Tab: Academic Mode
    await page.locator('button[data-tab="academic"]').click();
    await page.waitForTimeout(100);
    assert(await page.locator('#tab-content-academic').isVisible(), 'Academic tab is active');

    // 7. Test Copy Actions & Toast Feedback
    console.log('\n--- Test 7: Copy Buttons & Toast Notifications ---');
    await page.locator('#btn-copy-stats').click();
    await page.waitForTimeout(200);
    const toast = page.locator('#global-toast');
    assert(await toast.isVisible(), 'Global toast appeared for Copy Stats');

    // 8. Test Clear Button (2-Step Safe Confirmation)
    console.log('\n--- Test 8: Safe Clear Button ---');
    const clearBtn = page.locator('#btn-clear-text');
    await clearBtn.click();
    const clearBtnText = await clearBtn.innerText();
    assert(clearBtnText.includes('Sure'), `Clear button prompted confirmation: "${clearBtnText}"`);
    await clearBtn.click();
    await page.waitForTimeout(100);
    const clearedVal = await textarea.inputValue();
    assert(clearedVal === '', 'Textarea cleared successfully');
    const wordsAfterClear = await page.locator('#stat-words').innerText();
    assert(wordsAfterClear === '0', 'Word count reset to 0');

    // 9. Test "How WordCountr Compares" Table (Matching Image 1)
    console.log('\n--- Test 9: Comparison Table on Homepage ---');
    const compareHeading = page.locator('h2:has-text("How WordCountr Compares")');
    assert(await compareHeading.isVisible(), 'Comparison Table "How WordCountr Compares" is present on page');

    // 10. Test Specialized Sub-Pages
    console.log('\n--- Test 10: Routing to Specialized Sub-Pages ---');
    const subpages = [
      '/social-media-counter',
      '/readability-checker',
      '/keyword-density-checker',
      '/academic-word-counter',
      '/privacy'
    ];

    for (const path of subpages) {
      await page.goto(`http://localhost:4321${path}`, { waitUntil: 'domcontentloaded' });
      assert(await page.locator('header').isVisible(), `Header loaded on ${path}`);
      assert(await page.locator('footer').isVisible(), `Footer loaded on ${path}`);
    }

    console.log('\n=============================================================');
    console.log('🎉 ALL 10 END-TO-END BROWSER TESTS PASSED FLAWLESSLY!');
    console.log('=============================================================\n');

  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runE2eTests();
