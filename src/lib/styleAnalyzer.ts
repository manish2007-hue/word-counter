// Style & Quality Analyzer: Filler Words & Passive Voice Detector

export interface FillerMatch {
  word: string;
  count: number;
}

export interface PassiveMatch {
  phrase: string;
  count: number;
}

export interface StyleReport {
  fillerWordsCount: number;
  fillerMatches: FillerMatch[];
  passiveVoiceCount: number;
  passiveMatches: PassiveMatch[];
}

const COMMON_FILLER_WORDS = [
  'very', 'really', 'literally', 'just', 'basically', 'actually', 
  'in order to', 'totally', 'extremely', 'simply', 'honestly', 
  'clearly', 'somewhat', 'essentially'
];

// Auxiliaries for passive voice detection: am, is, are, was, were, be, being, been
const PASSIVE_REGEX = /\b(am|is|are|was|were|be|being|been)\s+([a-z]+(?:ed|en|wn|ne|pt|lt|ld|ht|nt))\b/gi;

export function analyzeStyle(text: string): StyleReport {
  if (!text || !text.trim()) {
    return {
      fillerWordsCount: 0,
      fillerMatches: [],
      passiveVoiceCount: 0,
      passiveMatches: []
    };
  }

  const lower = text.toLowerCase();

  // 1. Detect filler words
  const fillerCounts: Record<string, number> = {};
  let totalFillers = 0;

  for (const filler of COMMON_FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      fillerCounts[filler] = matches.length;
      totalFillers += matches.length;
    }
  }

  const fillerMatches: FillerMatch[] = Object.entries(fillerCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  // 2. Detect passive voice patterns
  const passiveCounts: Record<string, number> = {};
  let totalPassive = 0;

  let match: RegExpExecArray | null;
  while ((match = PASSIVE_REGEX.exec(lower)) !== null) {
    const phrase = match[0].trim();
    passiveCounts[phrase] = (passiveCounts[phrase] || 0) + 1;
    totalPassive++;
  }

  const passiveMatches: PassiveMatch[] = Object.entries(passiveCounts)
    .map(([phrase, count]) => ({ phrase, count }))
    .sort((a, b) => b.count - a.count);

  return {
    fillerWordsCount: totalFillers,
    fillerMatches,
    passiveVoiceCount: totalPassive,
    passiveMatches
  };
}
