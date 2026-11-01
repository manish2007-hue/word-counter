export interface KeywordItem {
  phrase: string;
  count: number;
  density: number; // percentage (e.g. 2.4%)
}

export interface KeywordDensityResult {
  oneWord: KeywordItem[];
  twoWord: KeywordItem[];
  threeWord: KeywordItem[];
  totalWordCount: number;
}

export const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
  'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have',
  'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself',
  'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into',
  'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself',
  'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves',
  'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t',
  'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
  'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s',
  'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t',
  'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

export function calculateKeywordDensity(
  text: string,
  filterStopWords = true,
  limit = 10
): KeywordDensityResult {
  if (!text || !text.trim()) {
    return { oneWord: [], twoWord: [], threeWord: [], totalWordCount: 0 };
  }

  // Tokenize words
  const rawWords = text
    .toLowerCase()
    .match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || [];

  const totalWordCount = rawWords.length;
  if (totalWordCount === 0) {
    return { oneWord: [], twoWord: [], threeWord: [], totalWordCount: 0 };
  }

  // 1-word frequency
  const oneMap = new Map<string, number>();
  for (const word of rawWords) {
    if (filterStopWords && (COMMON_STOP_WORDS.has(word) || word.length < 3)) {
      continue;
    }
    oneMap.set(word, (oneMap.get(word) || 0) + 1);
  }

  // 2-word phrase frequency
  const twoMap = new Map<string, number>();
  for (let i = 0; i < rawWords.length - 1; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    if (filterStopWords && (COMMON_STOP_WORDS.has(w1) && COMMON_STOP_WORDS.has(w2))) {
      continue;
    }
    const phrase = `${w1} ${w2}`;
    twoMap.set(phrase, (twoMap.get(phrase) || 0) + 1);
  }

  // 3-word phrase frequency
  const threeMap = new Map<string, number>();
  for (let i = 0; i < rawWords.length - 2; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    const w3 = rawWords[i + 2];
    if (
      filterStopWords &&
      COMMON_STOP_WORDS.has(w1) &&
      COMMON_STOP_WORDS.has(w2) &&
      COMMON_STOP_WORDS.has(w3)
    ) {
      continue;
    }
    const phrase = `${w1} ${w2} ${w3}`;
    threeMap.set(phrase, (threeMap.get(phrase) || 0) + 1);
  }

  const mapToSorted = (map: Map<string, number>, divisor: number): KeywordItem[] => {
    return Array.from(map.entries())
      .filter(([_, count]) => count >= (divisor > 50 ? 2 : 1))
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Math.round((count / divisor) * 1000) / 10,
      }))
      .sort((a, b) => b.count - a.count || b.density - a.density)
      .slice(0, limit);
  };

  return {
    oneWord: mapToSorted(oneMap, totalWordCount),
    twoWord: mapToSorted(twoMap, Math.max(1, totalWordCount - 1)),
    threeWord: mapToSorted(threeMap, Math.max(1, totalWordCount - 2)),
    totalWordCount,
  };
}
