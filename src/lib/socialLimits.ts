export interface PlatformLimit {
  id: string;
  name: string;
  category: 'social' | 'seo' | 'video' | 'community';
  maxChars: number;
  tip?: string;
}

export const SOCIAL_PLATFORMS: PlatformLimit[] = [
  {
    id: 'twitter',
    name: 'X / Twitter Post',
    category: 'social',
    maxChars: 280,
    tip: 'Tweets under 250 characters generally earn higher engagement.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Post',
    category: 'social',
    maxChars: 3000,
    tip: 'Keep opening hook under 140 chars before the "see more" cutoff.',
  },
  {
    id: 'instagram',
    name: 'Instagram Caption',
    category: 'social',
    maxChars: 2200,
    tip: 'First 125 characters appear in feed preview before truncated.',
  },
  {
    id: 'google-title',
    name: 'Google SEO Title',
    category: 'seo',
    maxChars: 60,
    tip: 'Google cuts off page titles longer than 60 characters.',
  },
  {
    id: 'google-meta',
    name: 'Google Meta Description',
    category: 'seo',
    maxChars: 160,
    tip: 'Optimal length is 120–160 characters to avoid SERP ellipsis.',
  },
  {
    id: 'youtube-title',
    name: 'YouTube Video Title',
    category: 'video',
    maxChars: 100,
    tip: 'Titles under 70 characters won\'t get cut off on mobile recommendation feeds.',
  },
  {
    id: 'youtube-desc',
    name: 'YouTube Description',
    category: 'video',
    maxChars: 5000,
    tip: 'Put primary keywords and call-to-action in the first 200 characters.',
  },
  {
    id: 'tiktok',
    name: 'TikTok Caption',
    category: 'video',
    maxChars: 2200,
    tip: 'Keep captions concise and keyword-focused for TikTok search.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest Pin Description',
    category: 'social',
    maxChars: 500,
    tip: 'First 50–60 characters are visible in mobile search feeds.',
  },
  {
    id: 'reddit-title',
    name: 'Reddit Post Title',
    category: 'community',
    maxChars: 300,
    tip: 'Informative, non-clickbait titles between 60–120 chars perform best.',
  },
];

export const PLATFORM_LIMITS = SOCIAL_PLATFORMS;

export interface PlatformStatus {
  limit: PlatformLimit;
  currentChars: number;
  remainingChars: number;
  percentage: number;
  isOverLimit: boolean;
}

export function evaluatePlatformLimits(characterCount: number): PlatformStatus[] {
  return SOCIAL_PLATFORMS.map((limit) => {
    const remainingChars = limit.maxChars - characterCount;
    const percentage = Math.min(100, Math.round((characterCount / limit.maxChars) * 100));
    const isOverLimit = remainingChars < 0;

    return {
      limit,
      currentChars: characterCount,
      remainingChars,
      percentage,
      isOverLimit,
    };
  });
}
