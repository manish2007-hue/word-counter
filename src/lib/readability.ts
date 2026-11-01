export interface ReadabilityMetrics {
  fleschReadingEase: number;
  fleschReadingEaseLabel: string;
  fleschReadingEaseColor: string;
  fleschKincaidGrade: number;
  gunningFog: number;
  colemanLiau: number;
  automatedReadabilityIndex: number;
  averageGradeLevel: number;
  gradeLevelSummary: string;
  totalSyllables: number;
  complexWords: number;
  syllablesPerWord: number;
  wordsPerSentence: number;
}

export function countSyllables(word: string): number {
  let clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  if (clean.length <= 3) return 1;

  // Consonant + 'le' at end (like "simple", "table", "little", "candle") forms a syllable
  const hasConsonantLe = /[^aeiouy]le$/.test(clean);

  // If not consonant-le, strip silent 'e' at end
  if (!hasConsonantLe) {
    clean = clean.replace(/e$/, '');
  }

  // Strip non-syllabic 'ed' (like "walked", "baked"), but preserve for "wanted", "needed"
  clean = clean.replace(/(?<![td])ed$/, '');

  // Count contiguous vowel clusters
  const matches = clean.match(/[aeiouy]{1,2}/g);
  const count = matches ? matches.length : 1;
  return Math.max(1, count);
}

export function calculateReadability(
  text: string,
  wordCount: number,
  sentenceCount: number,
  characterCountNoSpaces: number
): ReadabilityMetrics {
  if (wordCount < 5 || sentenceCount < 1) {
    return {
      fleschReadingEase: 0,
      fleschReadingEaseLabel: 'Needs more text',
      fleschReadingEaseColor: 'text-[#86868b]',
      fleschKincaidGrade: 0,
      gunningFog: 0,
      colemanLiau: 0,
      automatedReadabilityIndex: 0,
      averageGradeLevel: 0,
      gradeLevelSummary: 'Add at least 5 words to calculate readability.',
      totalSyllables: 0,
      complexWords: 0,
      syllablesPerWord: 0,
      wordsPerSentence: 0,
    };
  }

  const words = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || [];
  let totalSyllables = 0;
  let complexWords = 0;

  for (const word of words) {
    const syllables = countSyllables(word);
    totalSyllables += syllables;
    if (syllables >= 3) {
      complexWords++;
    }
  }

  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = totalSyllables / wordCount;

  // 1. Flesch Reading Ease
  let fre = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
  fre = Math.max(0, Math.min(100, Math.round(fre * 10) / 10));

  let fleschLabel = 'Standard';
  let fleschColor = 'text-emerald-600 dark:text-emerald-400';
  if (fre >= 90) {
    fleschLabel = 'Very Easy (5th Grade)';
  } else if (fre >= 80) {
    fleschLabel = 'Easy (6th Grade)';
  } else if (fre >= 70) {
    fleschLabel = 'Fairly Easy (7th Grade)';
  } else if (fre >= 60) {
    fleschLabel = 'Standard (8th-9th Grade)';
  } else if (fre >= 50) {
    fleschLabel = 'Fairly Difficult (10th-12th Grade)';
  } else if (fre >= 30) {
    fleschLabel = 'Difficult (College)';
  } else {
    fleschLabel = 'Very Confusing (Graduate)';
  }

  // 2. Flesch-Kincaid Grade Level
  let fkg = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
  fkg = Math.max(0, Math.round(fkg * 10) / 10);

  // 3. Gunning Fog Index
  const complexWordPercent = (complexWords / wordCount) * 100;
  let fog = 0.4 * (wordsPerSentence + complexWordPercent);
  fog = Math.max(0, Math.round(fog * 10) / 10);

  // 4. Coleman-Liau Index
  const lettersOnlyCount = (text.match(/[\p{L}]/gu) || []).length;
  const L = (lettersOnlyCount / wordCount) * 100;
  const S = (sentenceCount / wordCount) * 100;
  let cli = 0.0588 * L - 0.296 * S - 15.8;
  cli = Math.max(0, Math.round(cli * 10) / 10);

  // 5. Automated Readability Index (ARI)
  let ari = 4.71 * (characterCountNoSpaces / wordCount) + 0.5 * wordsPerSentence - 21.43;
  ari = Math.max(0, Math.round(ari * 10) / 10);

  // Average Grade Level
  const avgGrade = Math.round(((fkg + fog + cli + ari) / 4) * 10) / 10;

  let gradeSummary = '';
  if (avgGrade <= 6) {
    gradeSummary = 'Readily accessible to middle school students and general readers.';
  } else if (avgGrade <= 10) {
    gradeSummary = 'Ideal readability for blogs, non-fiction, and consumer audiences.';
  } else if (avgGrade <= 14) {
    gradeSummary = 'College level prose. Suitable for professional, business, or technical readers.';
  } else {
    gradeSummary = 'Academic or specialized research level. Consider shortening sentences to improve clarity.';
  }

  return {
    fleschReadingEase: fre,
    fleschReadingEaseLabel: fleschLabel,
    fleschReadingEaseColor: fleschColor,
    fleschKincaidGrade: fkg,
    gunningFog: fog,
    colemanLiau: cli,
    automatedReadabilityIndex: ari,
    averageGradeLevel: avgGrade,
    gradeLevelSummary: gradeSummary,
    totalSyllables,
    complexWords,
    syllablesPerWord: Math.round(syllablesPerWord * 100) / 100,
    wordsPerSentence: Math.round(wordsPerSentence * 10) / 10,
  };
}
