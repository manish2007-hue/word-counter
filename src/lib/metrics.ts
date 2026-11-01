export interface TextMetrics {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeSec: number;
  speakingTimeSec: number;
  readingTimeFormatted: string;
  speakingTimeFormatted: string;
  longestWord: string;
  averageWordLength: number;
}

export function formatTime(seconds: number): string {
  if (seconds < 1) return '< 1 sec';
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins === 0) {
    return `${secs} sec`;
  }
  return `${mins} min ${secs > 0 ? `${secs}s` : ''}`.trim();
}

const COMMON_ABBREVIATIONS = new Set([
  'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'vs', 'etc', 'eg', 'ie', 'approx', 'dept',
  'u.s', 'u.k', 'e.u', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  'a.m', 'p.m', 'no', 'vol', 'rev', 'hon', 'gen', 'gov'
]);

export function calculateMetrics(text: string, readingWpm = 225, speakingWpm = 130): TextMetrics {
  if (!text || !text.trim()) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeSec: 0,
      speakingTimeSec: 0,
      readingTimeFormatted: '0 sec',
      speakingTimeFormatted: '0 sec',
      longestWord: '',
      averageWordLength: 0,
    };
  }

  // Characters
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Words: match alphanumeric sequences including contractions and internal hyphens
  const wordsArray = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || [];
  const words = wordsArray.length;

  // Longest word & avg length
  let longestWord = '';
  let totalWordChars = 0;
  for (const w of wordsArray) {
    totalWordChars += w.length;
    if (w.length > longestWord.length) {
      longestWord = w;
    }
  }
  const averageWordLength = words > 0 ? parseFloat((totalWordChars / words).toFixed(1)) : 0;

  // Paragraphs: count non-empty lines / blocks
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // Sentences: heuristic with abbreviation defense
  const rawSentences = text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“'‘])/g)
    .filter((s) => s.trim().length > 0);

  let sentenceCount = 0;
  for (const s of rawSentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;
    // Check if sentence ended on a false abbreviation like "Dr." or "e.g."
    const lastWord = trimmed.split(/\s+/).pop()?.toLowerCase().replace(/[^a-z.]/g, '') || '';
    if (COMMON_ABBREVIATIONS.has(lastWord) || COMMON_ABBREVIATIONS.has(lastWord.replace(/\.$/, ''))) {
      // part of abbreviation, not full stop
      continue;
    }
    sentenceCount++;
  }
  const sentences = Math.max(sentenceCount, words > 0 ? 1 : 0);

  // Reading & Speaking Time
  const readingTimeSec = words > 0 ? Math.ceil((words / readingWpm) * 60) : 0;
  const speakingTimeSec = words > 0 ? Math.ceil((words / speakingWpm) * 60) : 0;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeSec,
    speakingTimeSec,
    readingTimeFormatted: formatTime(readingTimeSec),
    speakingTimeFormatted: formatTime(speakingTimeSec),
    longestWord,
    averageWordLength,
  };
}
