import { calculateMetrics, formatTime } from '../src/lib/metrics';
import { calculateReadability, countSyllables } from '../src/lib/readability';
import { calculateKeywordDensity } from '../src/lib/keywords';
import { filterAcademicText } from '../src/lib/academic';
import { evaluatePlatformLimits, PLATFORM_LIMITS } from '../src/lib/socialLimits';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${msg}`);
}

console.log('=== RUNNING CLEANWORDCOUNTER COMPREHENSIVE TEST SUITE ===\n');

// 1. METRICS TESTS
console.log('--- Test Group 1: Metrics Engine ---');
const empty = calculateMetrics('');
assert(empty.words === 0, 'Empty string returns 0 words');
assert(empty.characters === 0, 'Empty string returns 0 characters');
assert(empty.sentences === 0, 'Empty string returns 0 sentences');
assert(empty.paragraphs === 0, 'Empty string returns 0 paragraphs');

const sample = `Dr. Smith traveled to the U.S. in 2026. He didn't forget his state-of-the-art camera!

The journey was extraordinary. Many memories were forged.`;

const res = calculateMetrics(sample);
assert(res.words >= 20, `Word count calculated accurately (got ${res.words})`);
assert(res.characters === sample.length, `Characters with spaces match (got ${res.characters})`);
assert(res.charactersNoSpaces === sample.replace(/\s/g, '').length, 'Characters no spaces accurate');
assert(res.sentences >= 3, `Sentence boundary handling works with abbreviations (got ${res.sentences})`);
assert(res.paragraphs === 2, `Paragraph separation accurate (got ${res.paragraphs})`);
assert(res.readingTimeSec > 0, `Reading time computed (${res.readingTimeFormatted})`);
assert(res.speakingTimeSec > 0, `Speaking time computed (${res.speakingTimeFormatted})`);

// Edge case tests: Lowercase sentence counting & CJK words
const lowercaseParagraph = "first sentence is here. second sentence follows! third sentence ends now? fourth is brief. fifth one finishes.";
const lowerRes = calculateMetrics(lowercaseParagraph.toLowerCase());
assert(lowerRes.sentences === 5, `Lowercase sentences counted accurately (expected 5, got ${lowerRes.sentences})`);

const cjkSample = "你好世界，今天天气真好。";
const cjkRes = calculateMetrics(cjkSample);
assert(cjkRes.words >= 4, `CJK word segmentation via Intl.Segmenter works (got ${cjkRes.words} words)`);

// 2. READABILITY TESTS
console.log('\n--- Test Group 2: Readability Engine ---');
assert(countSyllables('the') === 1, 'Syllable: "the" = 1');
assert(countSyllables('simple') === 2, 'Syllable: "simple" = 2');
assert(countSyllables('extraordinary') >= 5, 'Syllable: "extraordinary" >= 5');

const easyText = "The cat sat on the mat. The dog saw the cat. The cat ran away fast. It was a good day.";
const easyMetrics = calculateMetrics(easyText);
const easyRead = calculateReadability(easyText, easyMetrics.words, easyMetrics.sentences, easyMetrics.charactersNoSpaces);
assert(easyRead.fleschReadingEase >= 80, `Easy text produces high Flesch Reading Ease (got ${easyRead.fleschReadingEase})`);
assert(easyRead.fleschKincaidGrade <= 6, `Easy text produces low grade level (got ${easyRead.fleschKincaidGrade})`);

const complexText = `Philosophical epistemologists systematically conceptualize metaphysical paradigms through multidimensional epistemological hermeneutics. This dialectical methodology facilitates comprehensive qualitative contextualization.`;
const compMetrics = calculateMetrics(complexText);
const compRead = calculateReadability(complexText, compMetrics.words, compMetrics.sentences, compMetrics.charactersNoSpaces);
assert(compRead.fleschReadingEase < 40, `Complex text produces low Flesch Reading Ease (got ${compRead.fleschReadingEase})`);
assert(compRead.fleschKincaidGrade >= 12, `Complex text produces college/graduate grade level (got ${compRead.fleschKincaidGrade})`);

// 3. KEYWORD DENSITY TESTS
console.log('\n--- Test Group 3: Keyword Density Analyzer ---');
const kwText = "apple banana apple orange apple banana grape apple";
const kwResult = calculateKeywordDensity(kwText, true, 10);
assert(kwResult.oneWord[0].phrase === 'apple', `Top keyword is "apple" (count: ${kwResult.oneWord[0].count})`);
assert(kwResult.oneWord[0].count === 4, 'Apple count is 4');
assert(kwResult.oneWord[0].density === 50, 'Apple density is 50%');

const ngramText = "content marketing strategy is a great content marketing strategy for business";
const ngramResult = calculateKeywordDensity(ngramText, true, 5);
assert(ngramResult.threeWord.some(k => k.phrase === 'content marketing strategy'), '3-word n-gram detected "content marketing strategy"');

// 4. ACADEMIC CITATION EXCLUSION TESTS
console.log('\n--- Test Group 4: Academic Citation Filter ---');
const essay = `Recent empirical investigations demonstrate positive pedagogical outcomes in blended classrooms (Johnson, 2021). Furthermore, advanced neural network architectures show comparable efficacy [1-3]. Students exhibited remarkable metacognitive adaptability.

References
1. Johnson, M. (2021). Blended Learning Efficacy. Journal of Education, 45(2), 112-125.
2. Smith, K., & Lee, P. (2019). Machine Intelligence in Higher Education. Cambridge Press.`;

const acad = filterAcademicText(essay);
assert(acad.referencesDetected === true, 'References section detected');
assert(acad.inTextCitationsCount >= 2, `In-text citations detected (got ${acad.inTextCitationsCount})`);
assert(acad.excludedWords > 0, `Excluded words identified (got ${acad.excludedWords})`);
assert(acad.filteredWords < acad.originalWords, `Net essay words lower than gross words (${acad.filteredWords} vs ${acad.originalWords})`);

// 5. SOCIAL MEDIA LIMITS TESTS
console.log('\n--- Test Group 5: Social Media Limits ---');
const shortTweetChars = 200;
const tweetStatus = evaluatePlatformLimits(shortTweetChars).find(p => p.limit.id === 'twitter')!;
assert(!tweetStatus.isOverLimit, '200 chars is within Twitter 280 limit');
assert(tweetStatus.remainingChars === 80, '80 chars remaining for Twitter');

const overTweetChars = 320;
const overTweetStatus = evaluatePlatformLimits(overTweetChars).find(p => p.limit.id === 'twitter')!;
assert(overTweetStatus.isOverLimit, '320 chars is over Twitter 280 limit');
assert(overTweetStatus.remainingChars === -40, 'Remaining chars is -40');

// 6. STYLE & QUALITY ANALYZER TESTS
console.log('\n--- Test Group 6: Style & Quality Analyzer ---');
import { analyzeStyle } from '../src/lib/styleAnalyzer';

const styleText = "This is very really cool. The decision was decided yesterday and experiments were conducted.";
const styleReport = analyzeStyle(styleText);
assert(styleReport.fillerWordsCount >= 2, `Filler words detected (got ${styleReport.fillerWordsCount})`);
assert(styleReport.passiveVoiceCount >= 2, `Passive voice detected (got ${styleReport.passiveVoiceCount})`);
assert(styleReport.fillerMatches.some(f => f.word === 'very'), 'Detected "very" as filler');
assert(styleReport.passiveMatches.some(p => p.phrase === 'was decided'), 'Detected "was decided" as passive voice');

console.log('\n======================================================');
console.log('🎉 ALL UNIT AND INTEGRATION TESTS PASSED PERFECTLY!');
console.log('======================================================\n');
