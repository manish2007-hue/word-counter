import fs from 'fs';
import path from 'path';

function checkDistFile(relPath: string, expectedKeywords: string[]) {
  const fullPath = path.join(process.cwd(), 'dist', relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath}`);
  }
  const content = fs.readFileSync(fullPath, 'utf-8');
  for (const kw of expectedKeywords) {
    if (!content.includes(kw)) {
      throw new Error(`File ${relPath} missing required keyword "${kw}"`);
    }
  }
  console.log(`✅ Verified ${relPath} (${expectedKeywords.length} content checks passed)`);
}

console.log('🔍 RUNNING COMPREHENSIVE DIST VERIFICATION...\n');

// 1. Core and Dashboard
checkDistFile('index.html', ['CleanWordCounter', 'Tools', '23']);
checkDistFile('tools/index.html', ['All 23 Free In-Browser Tools', 'Image Tools', 'Target Image Compressor']);

// 2. Image Tools Suite (Pi7 Model)
checkDistFile('compress-image/index.html', ['Target Image', 'Compressor', '20KB', '50KB', '100KB', '200KB']);
checkDistFile('compress-image/to-20kb/index.html', ['Compress Image to 20KB', '20 KB Maximum', 'Signatures']);
checkDistFile('compress-image/to-50kb/index.html', ['Compress Image to 50KB', '50 KB Maximum', 'Exam Forms']);
checkDistFile('compress-image/to-100kb/index.html', ['Compress Image to 100KB', 'Passport']);
checkDistFile('resize-image/index.html', ['Passport Photo', '3.5 × 4.5 cm', '300 DPI', 'US Visa (2 × 2 in)']);
checkDistFile('image-converter/index.html', ['Image Format', 'Converter', 'PNG', 'WebP', 'JPG']);

// 3. Priority 1 Tools
checkDistFile('lorem-ipsum-generator/index.html', ['Lorem Ipsum', 'Generator']);
checkDistFile('text-repeater/index.html', ['Text Repeater']);
checkDistFile('fancy-text-generator/index.html', ['Fancy Text']);
checkDistFile('json-formatter/index.html', ['JSON Formatter']);
checkDistFile('hashtag-generator/index.html', ['Hashtag']);

// 4. Programmatic Speaking Time
checkDistFile('words-to-speaking-time/index.html', ['Words to Speaking Time']);
checkDistFile('words-to-speaking-time/1000-words/index.html', ['How Long is a 1,000 Word Speech', 'Conversational Pace (130 WPM)', '7 min 42 sec']);
checkDistFile('words-to-speaking-time/500-words/index.html', ['How Long is a 500 Word Speech', 'Conversational Pace (130 WPM)']);

// 5. Programmatic Words to Pages
checkDistFile('words-to-pages/1000-words/index.html', ['1,000 Words']);

console.log('\n🎉 ALL STATIC DIST ARTIFACTS VERIFIED SUCCESSFULLY!');
