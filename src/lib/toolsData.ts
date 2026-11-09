export interface ToolItem {
  id: string;
  slug: string;
  href: string;
  name: string;
  shortDesc: string;
  category: 'writing' | 'cleaning' | 'generators' | 'developer' | 'social' | 'image';
  categoryLabel: string;
  badge?: 'New' | 'Popular' | 'Essential' | 'Pro';
  badgeColor?: string;
  tags: string[];
  icon: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Tools', count: 23 },
  { id: 'writing', label: 'Writing & Analysis', count: 7 },
  { id: 'image', label: 'Image Tools', count: 3 },
  { id: 'cleaning', label: 'Formatting & Cleaning', count: 4 },
  { id: 'generators', label: 'Text Generators', count: 3 },
  { id: 'developer', label: 'Developer & Code', count: 2 },
  { id: 'social', label: 'Social & SEO', count: 4 },
] as const;

export const TOOLS_LIST: ToolItem[] = [
  // --- Writing & Analysis ---
  {
    id: 'word-counter',
    slug: '',
    href: '/',
    name: 'Word & Character Counter',
    shortDesc: 'Real-time words, characters, sentences, paragraphs, reading speed, and speaking duration.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    badge: 'Essential',
    badgeColor: 'blue',
    tags: ['word count', 'character count', 'reading time', 'speaking time', 'pwa', 'offline'],
    icon: 'text'
  },
  {
    id: 'academic-word-counter',
    slug: 'academic-word-counter',
    href: '/academic-word-counter',
    name: 'Academic Essay Counter',
    shortDesc: 'Filters in-text citations (APA, MLA, Harvard) and reference lists for exact net essay length.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    badge: 'Popular',
    badgeColor: 'purple',
    tags: ['essay', 'academic', 'citations', 'apa', 'mla', 'college', 'paper', 'references'],
    icon: 'academic'
  },
  {
    id: 'words-to-pages',
    slug: 'words-to-pages',
    href: '/words-to-pages',
    name: 'Words to Pages Calculator',
    shortDesc: 'Calculate single-spaced and double-spaced page estimates across standard academic fonts.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    badge: 'Popular',
    badgeColor: 'purple',
    tags: ['pages', 'words to pages', 'double spaced', 'single spaced', 'formatting', 'font'],
    icon: 'document'
  },
  {
    id: 'words-to-speaking-time',
    slug: 'words-to-speaking-time',
    href: '/words-to-speaking-time',
    name: 'Words to Speaking Time',
    shortDesc: 'Convert speech draft word count into delivery duration at slow, normal, and fast tempos.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['speech', 'speaking time', 'presentation', 'podcast', 'voiceover', 'script'],
    icon: 'clock'
  },
  {
    id: 'readability-checker',
    slug: 'readability-checker',
    href: '/readability-checker',
    name: 'Readability Score Analyzer',
    shortDesc: 'Multi-formula readability analysis: Flesch-Kincaid, Gunning Fog, Coleman-Liau, and ARI.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    tags: ['readability', 'flesch kincaid', 'gunning fog', 'grade level', 'comprehension'],
    icon: 'chart'
  },
  {
    id: 'flesch-kincaid',
    slug: 'flesch-kincaid-readability-calculator',
    href: '/flesch-kincaid-readability-calculator',
    name: 'Flesch-Kincaid Grade Calculator',
    shortDesc: 'Instant reading ease score and school grade level evaluation with syllable breakdown.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    tags: ['flesch kincaid', 'reading ease', 'school grade', 'syllables'],
    icon: 'chart'
  },
  {
    id: 'docx-pdf-counter',
    slug: 'docx-pdf-word-counter-private',
    href: '/docx-pdf-word-counter-private',
    name: 'DOCX & PDF Word Counter',
    shortDesc: '100% private in-browser document word counting without uploading confidential files.',
    category: 'writing',
    categoryLabel: 'Writing & Analysis',
    badge: 'Essential',
    badgeColor: 'blue',
    tags: ['pdf', 'docx', 'word document', 'private upload', 'in-browser', 'wasm'],
    icon: 'file'
  },

  // --- Formatting & Cleaning ---
  {
    id: 'clean-text',
    slug: 'clean-text',
    href: '/clean-text',
    name: 'Clean Text & Line Breaks',
    shortDesc: 'Strip line breaks, double spaces, trailing tabs, and duplicate lines from messy pastes.',
    category: 'cleaning',
    categoryLabel: 'Formatting & Cleaning',
    badge: 'Popular',
    badgeColor: 'purple',
    tags: ['clean text', 'remove line breaks', 'strip spaces', 'remove duplicates', 'trim lines'],
    icon: 'sparkles'
  },
  {
    id: 'remove-line-breaks',
    slug: 'remove-line-breaks',
    href: '/remove-line-breaks',
    name: 'Remove Line Breaks Tool',
    shortDesc: 'Join fragmented lines copied from PDFs or emails into smooth flowing continuous paragraphs.',
    category: 'cleaning',
    categoryLabel: 'Formatting & Cleaning',
    tags: ['line breaks', 'newlines', 'join lines', 'pdf formatting', 'paragraphs'],
    icon: 'wrap'
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    href: '/case-converter',
    name: 'Case Converter Tool',
    shortDesc: 'Transform text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and kebab-case.',
    category: 'cleaning',
    categoryLabel: 'Formatting & Cleaning',
    tags: ['case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'kebab-case'],
    icon: 'case'
  },
  {
    id: 'diff-checker',
    slug: 'diff-checker',
    href: '/diff-checker',
    name: 'Side-by-Side Diff Checker',
    shortDesc: 'Compare two text drafts or code files side-by-side with color-coded additions and deletions.',
    category: 'cleaning',
    categoryLabel: 'Formatting & Cleaning',
    tags: ['diff', 'compare text', 'side by side', 'changes', 'revisions', 'additions'],
    icon: 'diff'
  },

  // --- Text Generators (Priority 1) ---
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    href: '/lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    shortDesc: 'Generate customizable dummy placeholder text by paragraphs, sentences, words, or lists.',
    category: 'generators',
    categoryLabel: 'Text Generators',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['lorem ipsum', 'dummy text', 'placeholder', 'latin text', 'mockup text', 'generator'],
    icon: 'lorem'
  },
  {
    id: 'text-repeater',
    slug: 'text-repeater',
    href: '/text-repeater',
    name: 'Text Repeater Tool',
    shortDesc: 'Repeat words, sentences, or emojis up to 10,000 times with custom separators and numbering.',
    category: 'generators',
    categoryLabel: 'Text Generators',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['text repeater', 'repeat text', 'message multiplier', 'duplicate string', 'copy text'],
    icon: 'repeat'
  },
  {
    id: 'fancy-text-generator',
    slug: 'fancy-text-generator',
    href: '/fancy-text-generator',
    name: 'Fancy Text Generator',
    shortDesc: 'Convert plain text into 30+ stylish Unicode fonts: Bold, Gothic, Cursive, Bubbles & Small Caps.',
    category: 'generators',
    categoryLabel: 'Text Generators',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['fancy text', 'cool fonts', 'instagram fonts', 'unicode', 'cursive', 'gothic', 'small caps'],
    icon: 'wand'
  },

  // --- Developer & Code (Priority 1) ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    href: '/json-formatter',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Beautify, minify, validate, and repair JSON in-browser with exact syntax error highlighting.',
    category: 'developer',
    categoryLabel: 'Developer & Code',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['json formatter', 'json validator', 'beautify json', 'minify json', 'json lint', 'parse json'],
    icon: 'code'
  },
  {
    id: 'ai-token-counter',
    slug: 'ai-token-counter',
    href: '/ai-token-counter',
    name: 'AI & LLM Token Counter',
    shortDesc: 'Estimate prompt token usage and API costs across GPT-4o, Claude 3.5 Sonnet, and Gemini 2.0.',
    category: 'developer',
    categoryLabel: 'Developer & Code',
    badge: 'Popular',
    badgeColor: 'purple',
    tags: ['token counter', 'openai tokens', 'claude tokens', 'llm prompt', 'api cost', 'gpt-4o'],
    icon: 'cpu'
  },

  // --- Social Media & SEO ---
  {
    id: 'hashtag-generator',
    slug: 'hashtag-generator',
    href: '/hashtag-generator',
    name: 'Hashtag Generator & Extractor',
    shortDesc: 'Generate topical hashtag packs or extract, clean, and count hashtags from social media posts.',
    category: 'social',
    categoryLabel: 'Social & SEO',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['hashtags', 'hashtag generator', 'instagram hashtags', 'tiktok tags', 'extract hashtags', 'seo'],
    icon: 'hash'
  },
  {
    id: 'social-media-counter',
    slug: 'social-media-counter',
    href: '/social-media-counter',
    name: 'Social Media Limits Counter',
    shortDesc: 'Live character and word counters for X/Twitter (280), LinkedIn (3000), Instagram, and TikTok.',
    category: 'social',
    categoryLabel: 'Social & SEO',
    badge: 'Essential',
    badgeColor: 'blue',
    tags: ['social media', 'twitter character limit', 'linkedin limit', 'instagram caption', 'tiktok limit'],
    icon: 'share'
  },
  {
    id: 'keyword-density-checker',
    slug: 'keyword-density-checker',
    href: '/keyword-density-checker',
    name: 'Keyword Density & N-Gram Analyzer',
    shortDesc: 'Detect 1-word, 2-word, and 3-word n-gram frequency to optimize SEO copy and avoid keyword stuffing.',
    category: 'social',
    categoryLabel: 'Social & SEO',
    tags: ['keyword density', 'n-grams', 'seo analysis', 'keyword frequency', 'content optimization'],
    icon: 'search'
  },
  {
    id: 'website-word-counter',
    slug: 'website-word-counter',
    href: '/website-word-counter',
    name: 'Website & URL Word Counter',
    shortDesc: 'Analyze the visible editorial word count and content density of any public web page.',
    category: 'social',
    categoryLabel: 'Social & SEO',
    tags: ['website word count', 'url word counter', 'competitor page count', 'webpage analyzer'],
    icon: 'globe'
  },
  // --- Image Tools ---
  {
    id: 'compress-image',
    slug: 'compress-image',
    href: '/compress-image',
    name: 'Target Image Compressor',
    shortDesc: 'Compress photos to exact target sizes (20KB, 50KB, 100KB, 200KB) with zero quality loss and 100% in-browser privacy.',
    category: 'image',
    categoryLabel: 'Image Tools',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['compress image', 'compress to 20kb', 'compress to 50kb', 'compress to 100kb', 'photo compressor', 'image reducer', 'upsc photo', 'passport photo size'],
    icon: 'image'
  },
  {
    id: 'resize-image',
    slug: 'resize-image',
    href: '/resize-image',
    name: 'Passport Photo & Dimension Resizer',
    shortDesc: 'Resize photos in cm, mm, inches and px with 300 DPI support for Indian passports (3.5x4.5cm), US visas (2x2 in), and exam forms.',
    category: 'image',
    categoryLabel: 'Image Tools',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['resize image', 'passport photo resizer', 'resize in cm', 'resize in mm', '3.5x4.5cm', '2x2 inch', 'photo 300 dpi', 'upsc signature resize'],
    icon: 'aspect'
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    href: '/image-converter',
    name: 'Batch Image Format Converter',
    shortDesc: 'Instant client-side conversion between PNG, JPG, and WebP formats with quality control and zero file uploads.',
    category: 'image',
    categoryLabel: 'Image Tools',
    badge: 'New',
    badgeColor: 'emerald',
    tags: ['image converter', 'png to jpg', 'webp to png', 'jpg to webp', 'convert photo', 'batch image conversion'],
    icon: 'refresh'
  }
];
