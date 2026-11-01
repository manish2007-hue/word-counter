export interface AcademicAnalysis {
  originalWords: number;
  filteredWords: number;
  excludedWords: number;
  referencesDetected: boolean;
  referencesWordCount: number;
  inTextCitationsCount: number;
  cleanedText: string;
}

export function filterAcademicText(text: string): AcademicAnalysis {
  if (!text || !text.trim()) {
    return {
      originalWords: 0,
      filteredWords: 0,
      excludedWords: 0,
      referencesDetected: false,
      referencesWordCount: 0,
      inTextCitationsCount: 0,
      cleanedText: '',
    };
  }

  const rawWords = (text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;

  let cleaned = text;
  let referencesWordCount = 0;
  let referencesDetected = false;

  // 1. Detect and strip References / Bibliography / Works Cited / Literature Cited section at end
  const referenceHeadingRegex = /(?:\n|^)(?:#{1,3}\s*)?(?:references|bibliography|works cited|literature cited|sources cited)\s*(?:\n|$)/i;
  const refMatch = cleaned.search(referenceHeadingRegex);

  if (refMatch !== -1) {
    referencesDetected = true;
    const bodyPart = cleaned.slice(0, refMatch);
    const refPart = cleaned.slice(refMatch);
    const refWords = (refPart.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
    referencesWordCount = refWords;
    cleaned = bodyPart;
  }

  // 2. Count and strip in-text parenthetical citations:
  // e.g., (Smith, 2020), (Smith & Jones, 2019, p. 24), (Doe et al., 2022), [1], [1-4], [12, 15]
  let inTextCitationsCount = 0;

  // Bracket numbers: [1], [12, 14], [3-7]
  const numericCitationRegex = /\[\s*\d+(?:[\s,\-–]+\d+)*\s*\]/g;
  const numMatches = cleaned.match(numericCitationRegex);
  if (numMatches) {
    inTextCitationsCount += numMatches.length;
    cleaned = cleaned.replace(numericCitationRegex, ' ');
  }

  // Author-year citations: (Smith, 2020), (Johnson et al., 2018), (Miller & Davis, 2021: 45)
  const authorYearRegex = /\((?:[A-Z][a-zA-Z\s&]+(?:et\s+al\.?)?,?\s+(?:19|20)\d{2}[a-z]?(?:[:;,]\s*(?:p\.?|pp\.?)?\s*\d+(?:-\d+)?)?)\)/g;
  const authorMatches = cleaned.match(authorYearRegex);
  if (authorMatches) {
    inTextCitationsCount += authorMatches.length;
    cleaned = cleaned.replace(authorYearRegex, ' ');
  }

  const filteredWords = (cleaned.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
  const excludedWords = Math.max(0, rawWords - filteredWords);

  return {
    originalWords: rawWords,
    filteredWords,
    excludedWords,
    referencesDetected,
    referencesWordCount,
    inTextCitationsCount,
    cleanedText: cleaned.trim(),
  };
}
