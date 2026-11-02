import { countSyllables } from './readability';

export interface SentenceFlow {
  veryShort: number; // 1-5 words
  short: number;     // 6-14 words
  medium: number;    // 15-25 words
  long: number;      // 26-39 words
  marathon: number;  // 40+ words
  flowScore: number; // 0 - 100
  flowLabel: string; // e.g. "Dynamic & Engaging", "Good Variety", "Monotonous Rhythm"
}

export interface TextMetrics {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeSec: number;
  speakingTimeSec: number;
  readingTimeFormatted: string;
  speakingTimeFormatted: string;
  handwritingTimeSec: number;
  handwritingTimeFormatted: string;
  longestWord: string;
  averageWordLength: number;
  uniqueWords: number;
  uniqueWordsPercent: number;
  totalSyllables: number;
  syllablesPerWord: number;
  shortestSentenceWords: number;
  longestSentenceWords: number;
  publisherPages: number; // standard book estimate: 250 words / page
  standardPages: number;  // standard single-spaced: 500 words / page
  flow: SentenceFlow;
}

export function formatTime(seconds: number): string {
  if (seconds < 1) return '< 1 sec';
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins === 0) {
    return `${secs} sec`;
  }
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hours > 0) {
    return `${hours}h ${remMins > 0 ? `${remMins}m` : ''}`.trim();
  }
  return `${mins} min ${secs > 0 ? `${secs}s` : ''}`.trim();
}

const COMMON_ABBREVIATIONS = new Set([
  'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'vs', 'etc', 'eg', 'ie', 'approx', 'dept',
  'u.s', 'u.k', 'e.u', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  'a.m', 'p.m', 'no', 'vol', 'rev', 'hon', 'gen', 'gov'
]);

export function calculateMetrics(text: string, readingWpm = 225, speakingWpm = 130): TextMetrics {
  const emptyFlow: SentenceFlow = {
    veryShort: 0,
    short: 0,
    medium: 0,
    long: 0,
    marathon: 0,
    flowScore: 0,
    flowLabel: 'Needs more text'
  };

  if (!text || !text.trim()) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeSec: 0,
      speakingTimeSec: 0,
      readingTimeFormatted: '0 sec',
      speakingTimeFormatted: '0 sec',
      handwritingTimeSec: 0,
      handwritingTimeFormatted: '0 sec',
      longestWord: '',
      averageWordLength: 0,
      uniqueWords: 0,
      uniqueWordsPercent: 0,
      totalSyllables: 0,
      syllablesPerWord: 0,
      shortestSentenceWords: 0,
      longestSentenceWords: 0,
      publisherPages: 0,
      standardPages: 0,
      flow: emptyFlow,
    };
  }

  // Characters
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Lines
  const lines = text.split(/\r\n|\r|\n/).length;

  // Words: Intl.Segmenter support for CJK + Latin fallback
  let wordsArray: string[] = [];
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new (Intl as any).Segmenter(undefined, { granularity: 'word' });
      const segments = Array.from(segmenter.segment(text)) as Array<{ segment: string; isWordLike?: boolean }>;
      wordsArray = segments.filter((s) => s.isWordLike).map((s) => s.segment);
    } catch {
      wordsArray = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || [];
    }
  } else {
    wordsArray = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || [];
  }
  const words = wordsArray.length;

  // Longest word, average length, unique words & syllables
  let longestWord = '';
  let totalWordChars = 0;
  let totalSyllables = 0;
  const uniqueSet = new Set<string>();

  for (const w of wordsArray) {
    const lower = w.toLowerCase();
    uniqueSet.add(lower);
    totalWordChars += w.length;
    if (w.length > longestWord.length) {
      longestWord = w;
    }
    totalSyllables += countSyllables(w);
  }

  const averageWordLength = words > 0 ? parseFloat((totalWordChars / words).toFixed(1)) : 0;
  const uniqueWords = uniqueSet.size;
  const uniqueWordsPercent = words > 0 ? parseFloat(((uniqueWords / words) * 100).toFixed(1)) : 0;
  const syllablesPerWord = words > 0 ? parseFloat((totalSyllables / words).toFixed(2)) : 0;

  // Paragraphs
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // Sentences & Sentence Flow
  const rawSentences = text
    .split(/(?<=[.!?]+["”'’]?)\s+/gu)
    .filter((s) => s.trim().length > 0);

  const validSentences: string[] = [];
  for (const s of rawSentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;
    const lastWord = trimmed.split(/\s+/).pop()?.toLowerCase().replace(/[^a-z.]/g, '') || '';
    if (COMMON_ABBREVIATIONS.has(lastWord) || COMMON_ABBREVIATIONS.has(lastWord.replace(/\.$/, ''))) {
      continue;
    }
    validSentences.push(trimmed);
  }

  const sentences = Math.max(validSentences.length, words > 0 ? 1 : 0);

  // Shortest & Longest sentence word counts, and Flow categorization
  let shortestSentenceWords = words > 0 ? Infinity : 0;
  let longestSentenceWords = 0;
  const sentenceWordCounts: number[] = [];

  let veryShort = 0;
  let short = 0;
  let medium = 0;
  let long = 0;
  let marathon = 0;

  const sentenceList = validSentences.length > 0 ? validSentences : (words > 0 ? [text] : []);

  for (const sent of sentenceList) {
    const sw = (sent.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
    if (sw > 0) {
      sentenceWordCounts.push(sw);
      if (sw < shortestSentenceWords) shortestSentenceWords = sw;
      if (sw > longestSentenceWords) longestSentenceWords = sw;

      if (sw <= 5) veryShort++;
      else if (sw <= 14) short++;
      else if (sw <= 25) medium++;
      else if (sw <= 39) long++;
      else marathon++;
    }
  }

  if (shortestSentenceWords === Infinity) shortestSentenceWords = 0;

  // Calculate Flow Score & Rhythm Variety
  let flowScore = 70;
  let flowLabel = 'Standard Rhythm';
  if (sentenceWordCounts.length >= 2) {
    const mean = words / sentenceWordCounts.length;
    const variance = sentenceWordCounts.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / sentenceWordCounts.length;
    const stdDev = Math.sqrt(variance);

    // Standard deviation between 5 and 14 indicates healthy sentence variety (punchy mixed with developed)
    if (stdDev < 2.5) {
      flowScore = 45;
      flowLabel = 'Monotonous (Similar Lengths)';
    } else if (stdDev < 5) {
      flowScore = 65;
      flowLabel = 'Moderate Rhythm Variety';
    } else if (stdDev <= 14) {
      flowScore = 88;
      flowLabel = 'Dynamic & Natural Flow';
    } else if (stdDev <= 20) {
      flowScore = 80;
      flowLabel = 'Highly Varied Cadence';
    } else {
      flowScore = 60;
      flowLabel = 'Erratic (Many Run-ons)';
    }

    // Deduct slightly if > 30% of sentences are marathon run-ons
    if (marathon / sentenceWordCounts.length > 0.3) {
      flowScore = Math.max(30, flowScore - 15);
      flowLabel = 'Heavy Run-on Sentences';
    }
  } else if (words > 0) {
    flowScore = 60;
    flowLabel = 'Single Sentence';
  }

  const flow: SentenceFlow = {
    veryShort,
    short,
    medium,
    long,
    marathon,
    flowScore,
    flowLabel
  };

  // Reading & Speaking Time
  const readingTimeSec = words > 0 ? Math.ceil((words / readingWpm) * 60) : 0;
  const speakingTimeSec = words > 0 ? Math.ceil((words / speakingWpm) * 60) : 0;

  // Handwriting Time (avg 13 words/min)
  const handwritingTimeSec = words > 0 ? Math.ceil((words / 13) * 60) : 0;

  // Publisher & Standard Pages
  const publisherPages = words > 0 ? parseFloat((words / 250).toFixed(1)) : 0;
  const standardPages = words > 0 ? parseFloat((words / 500).toFixed(1)) : 0;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeSec,
    speakingTimeSec,
    readingTimeFormatted: formatTime(readingTimeSec),
    speakingTimeFormatted: formatTime(speakingTimeSec),
    handwritingTimeSec,
    handwritingTimeFormatted: formatTime(handwritingTimeSec),
    longestWord,
    averageWordLength,
    uniqueWords,
    uniqueWordsPercent,
    totalSyllables,
    syllablesPerWord,
    shortestSentenceWords,
    longestSentenceWords,
    publisherPages,
    standardPages,
    flow,
  };
}
