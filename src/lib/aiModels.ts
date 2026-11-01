/**
 * Comprehensive AI Model Catalog (2020 - 2026)
 * Tokenization specs, context windows, and official API pricing across
 * OpenAI, Anthropic, Google, Meta, DeepSeek, Mistral, xAI, and Cohere.
 */

export interface AIModel {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'DeepSeek' | 'Mistral' | 'xAI' | 'Cohere';
  year: number; // 2020 - 2026
  family: string;
  contextWindow: number; // Tokens
  inputCostPer1M: number; // USD per 1,000,000 input tokens
  outputCostPer1M: number; // USD per 1,000,000 output tokens
  tokenizerType: 'o200k' | 'cl100k' | 'p50k_legacy' | 'claude' | 'gemini' | 'llama' | 'deepseek' | 'mistral';
  description: string;
  featured?: boolean;
}

export const AI_MODELS_CATALOG: AIModel[] = [
  // ─── 2025 / 2026 LATEST MODERN MODELS & REASONING ───
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet (Hybrid Reasoning)',
    provider: 'Anthropic',
    year: 2025,
    family: 'Claude',
    contextWindow: 200000,
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    tokenizerType: 'claude',
    description: 'Hybrid standard & extended reasoning model with state-of-the-art coding and prose capabilities.',
    featured: true,
  },
  {
    id: 'gpt-4.5-preview',
    name: 'GPT-4.5 (Orion)',
    provider: 'OpenAI',
    year: 2025,
    family: 'GPT',
    contextWindow: 128000,
    inputCostPer1M: 75.00,
    outputCostPer1M: 150.00,
    tokenizerType: 'o200k',
    description: 'OpenAI massive flagship frontier model with unmatched world knowledge and emotional nuance.',
    featured: true,
  },
  {
    id: 'o3-mini',
    name: 'o3-mini (High-Speed Reasoning)',
    provider: 'OpenAI',
    year: 2025,
    family: 'o-Series',
    contextWindow: 200000,
    inputCostPer1M: 1.10,
    outputCostPer1M: 4.40,
    tokenizerType: 'o200k',
    description: 'Next-gen STEM and competitive coding reasoning model with adjustable thinking effort.',
    featured: true,
  },
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    year: 2025,
    family: 'Gemini',
    contextWindow: 1000000,
    inputCostPer1M: 0.10,
    outputCostPer1M: 0.40,
    tokenizerType: 'gemini',
    description: 'Ultra-fast multimodal 1M-token context model with native image and audio understanding.',
    featured: true,
  },
  {
    id: 'gemini-2-pro',
    name: 'Gemini 2.0 Pro',
    provider: 'Google',
    year: 2025,
    family: 'Gemini',
    contextWindow: 2000000,
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.00,
    tokenizerType: 'gemini',
    description: 'Google apex intelligence model with unmatched 2-million-token context processing.',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Open Reasoning)',
    provider: 'DeepSeek',
    year: 2025,
    family: 'DeepSeek',
    contextWindow: 128000,
    inputCostPer1M: 0.55,
    outputCostPer1M: 2.19,
    tokenizerType: 'deepseek',
    description: 'Groundbreaking open-weights chain-of-thought model rivaling OpenAI o1 at fraction of cost.',
    featured: true,
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3 (671B MoE)',
    provider: 'DeepSeek',
    year: 2024,
    family: 'DeepSeek',
    contextWindow: 128000,
    inputCostPer1M: 0.14,
    outputCostPer1M: 0.28,
    tokenizerType: 'deepseek',
    description: '671B parameter Mixture-of-Experts model delivering frontier quality at budget prices.',
    featured: true,
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta',
    year: 2024,
    family: 'Llama',
    contextWindow: 128000,
    inputCostPer1M: 0.80,
    outputCostPer1M: 0.80,
    tokenizerType: 'llama',
    description: 'Industry-standard open weights model matching the original Llama 3.1 405B performance.',
    featured: true,
  },

  // ─── 2024 FRONTIER MULTIMODAL & ADVANCED SUITE ───
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    provider: 'OpenAI',
    year: 2024,
    family: 'GPT',
    contextWindow: 128000,
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
    tokenizerType: 'o200k',
    description: 'OpenAI flagship multimodal intelligence engine with 200k vocabulary efficiency.',
    featured: true,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    year: 2024,
    family: 'GPT',
    contextWindow: 128000,
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
    tokenizerType: 'o200k',
    description: 'Fast, cost-efficient small model replacing GPT-3.5 Turbo for lightweight tasks.',
    featured: true,
  },
  {
    id: 'o1',
    name: 'OpenAI o1',
    provider: 'OpenAI',
    year: 2024,
    family: 'o-Series',
    contextWindow: 200000,
    inputCostPer1M: 15.00,
    outputCostPer1M: 60.00,
    tokenizerType: 'o200k',
    description: 'Autonomous reasoning model trained via reinforcement learning for complex math and science.',
  },
  {
    id: 'o1-mini',
    name: 'OpenAI o1-mini',
    provider: 'OpenAI',
    year: 2024,
    family: 'o-Series',
    contextWindow: 128000,
    inputCostPer1M: 1.10,
    outputCostPer1M: 4.40,
    tokenizerType: 'o200k',
    description: 'Faster reasoning model optimized for code and technical logic.',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    year: 2024,
    family: 'Claude',
    contextWindow: 200000,
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    tokenizerType: 'claude',
    description: 'Benchmark leader in programming, creative writing, nuanced editorial tone, and tool use.',
    featured: true,
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    year: 2024,
    family: 'Claude',
    contextWindow: 200000,
    inputCostPer1M: 0.80,
    outputCostPer1M: 4.00,
    tokenizerType: 'claude',
    description: 'High-speed compact model matching Claude 3 Opus on multiple intelligence benchmarks.',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    year: 2024,
    family: 'Claude',
    contextWindow: 200000,
    inputCostPer1M: 15.00,
    outputCostPer1M: 75.00,
    tokenizerType: 'claude',
    description: 'Deep cognitive and creative writing engine with maximum comprehension fidelity.',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    year: 2024,
    family: 'Gemini',
    contextWindow: 2000000,
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.00,
    tokenizerType: 'gemini',
    description: 'Breakthrough 2M-token context window capable of ingesting entire books and codebases.',
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    year: 2024,
    family: 'Gemini',
    contextWindow: 1000000,
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30,
    tokenizerType: 'gemini',
    description: 'Extremely fast 1M-token context model engineered for high-frequency low-latency workflows.',
    featured: true,
  },
  {
    id: 'llama-3.1-405b',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    year: 2024,
    family: 'Llama',
    contextWindow: 128000,
    inputCostPer1M: 3.00,
    outputCostPer1M: 3.00,
    tokenizerType: 'llama',
    description: 'First frontier-class open foundation model with 405 billion parameters.',
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    year: 2024,
    family: 'Llama',
    contextWindow: 128000,
    inputCostPer1M: 0.80,
    outputCostPer1M: 0.80,
    tokenizerType: 'llama',
    description: 'Workhorse 70B model with 128k context and high code accuracy.',
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    year: 2024,
    family: 'Llama',
    contextWindow: 128000,
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.15,
    tokenizerType: 'llama',
    description: 'Extremely lightweight edge and local model with native 128k context support.',
  },
  {
    id: 'grok-2',
    name: 'Grok-2',
    provider: 'xAI',
    year: 2024,
    family: 'Grok',
    contextWindow: 128000,
    inputCostPer1M: 2.00,
    outputCostPer1M: 10.00,
    tokenizerType: 'o200k',
    description: 'Elon Musk / xAI flagship model integrated with real-time X news stream analytics.',
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2 (123B)',
    provider: 'Mistral',
    year: 2024,
    family: 'Mistral',
    contextWindow: 128000,
    inputCostPer1M: 2.00,
    outputCostPer1M: 6.00,
    tokenizerType: 'mistral',
    description: 'European AI champion model specialized in multilingual synthesis and complex coding.',
  },
  {
    id: 'mixtral-8x22b',
    name: 'Mixtral 8x22B',
    provider: 'Mistral',
    year: 2024,
    family: 'Mistral',
    contextWindow: 64000,
    inputCostPer1M: 2.00,
    outputCostPer1M: 6.00,
    tokenizerType: 'mistral',
    description: 'Sparse Mixture-of-Experts architecture activating 39B parameters per token.',
  },
  {
    id: 'command-r-plus',
    name: 'Cohere Command R+',
    provider: 'Cohere',
    year: 2024,
    family: 'Command',
    contextWindow: 128000,
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
    tokenizerType: 'cl100k',
    description: 'Enterprise RAG-optimized model built for verifiable business and search automation.',
  },

  // ─── 2023 THE CHATGPT BOOM & FIRST MODERN FOUNDATION MODELS ───
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo (128k)',
    provider: 'OpenAI',
    year: 2023,
    family: 'GPT',
    contextWindow: 128000,
    inputCostPer1M: 10.00,
    outputCostPer1M: 30.00,
    tokenizerType: 'cl100k',
    description: 'First GPT-4 variant to introduce 128k context and structured JSON mode.',
  },
  {
    id: 'gpt-4-classic',
    name: 'GPT-4 (Original 2023)',
    provider: 'OpenAI',
    year: 2023,
    family: 'GPT',
    contextWindow: 8192,
    inputCostPer1M: 30.00,
    outputCostPer1M: 60.00,
    tokenizerType: 'cl100k',
    description: 'The historic March 2023 foundation model that passed the Uniform Bar Exam at the 90th percentile.',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo (ChatGPT)',
    provider: 'OpenAI',
    year: 2023,
    family: 'GPT',
    contextWindow: 16385,
    inputCostPer1M: 0.50,
    outputCostPer1M: 1.50,
    tokenizerType: 'cl100k',
    description: 'The engine that powered the consumer ChatGPT revolution across 2023.',
    featured: true,
  },
  {
    id: 'claude-2.1',
    name: 'Claude 2.1',
    provider: 'Anthropic',
    year: 2023,
    family: 'Claude',
    contextWindow: 200000,
    inputCostPer1M: 8.00,
    outputCostPer1M: 24.00,
    tokenizerType: 'claude',
    description: 'Pioneered 200k token context in late 2023 with 2x hallucination reduction.',
  },
  {
    id: 'claude-2.0',
    name: 'Claude 2.0',
    provider: 'Anthropic',
    year: 2023,
    family: 'Claude',
    contextWindow: 100000,
    inputCostPer1M: 8.00,
    outputCostPer1M: 24.00,
    tokenizerType: 'claude',
    description: 'First public Claude model offering 100k context for reading full research papers.',
  },
  {
    id: 'claude-instant-1.2',
    name: 'Claude Instant 1.2',
    provider: 'Anthropic',
    year: 2023,
    family: 'Claude',
    contextWindow: 100000,
    inputCostPer1M: 1.63,
    outputCostPer1M: 5.51,
    tokenizerType: 'claude',
    description: 'Early high-speed Claude variant for instant dialogue and summarization.',
  },
  {
    id: 'gemini-1-0-pro',
    name: 'Gemini 1.0 Pro',
    provider: 'Google',
    year: 2023,
    family: 'Gemini',
    contextWindow: 32000,
    inputCostPer1M: 0.50,
    outputCostPer1M: 1.50,
    tokenizerType: 'gemini',
    description: 'First-generation Gemini model replacing PaLM in Google Bard.',
  },
  {
    id: 'palm-2',
    name: 'PaLM 2 (Bison)',
    provider: 'Google',
    year: 2023,
    family: 'PaLM',
    contextWindow: 8192,
    inputCostPer1M: 0.50,
    outputCostPer1M: 1.50,
    tokenizerType: 'gemini',
    description: 'Google Pathways Language Model 2 powering Google I/O 2023 announcements.',
  },
  {
    id: 'llama-2-70b',
    name: 'Llama 2 70B',
    provider: 'Meta',
    year: 2023,
    family: 'Llama',
    contextWindow: 4096,
    inputCostPer1M: 0.90,
    outputCostPer1M: 0.90,
    tokenizerType: 'llama',
    description: 'Meta historic open source commercial release that sparked the open-weights ecosystem.',
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B (MoE)',
    provider: 'Mistral',
    year: 2023,
    family: 'Mistral',
    contextWindow: 32768,
    inputCostPer1M: 0.70,
    outputCostPer1M: 0.70,
    tokenizerType: 'mistral',
    description: 'The landmark torrent-dropped model that beat Llama 2 70B with 12B active parameters.',
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    provider: 'Mistral',
    year: 2023,
    family: 'Mistral',
    contextWindow: 32768,
    inputCostPer1M: 0.20,
    outputCostPer1M: 0.20,
    tokenizerType: 'mistral',
    description: 'Groundbreaking 7B model using Sliding Window Attention that outperformed all prior sub-13B models.',
  },

  // ─── 2022 INSTRUCTGPT & PRE-CHATGPT FOUNDATIONS ───
  {
    id: 'text-davinci-003',
    name: 'InstructGPT (text-davinci-003)',
    provider: 'OpenAI',
    year: 2022,
    family: 'GPT',
    contextWindow: 4097,
    inputCostPer1M: 20.00,
    outputCostPer1M: 20.00,
    tokenizerType: 'p50k_legacy',
    description: 'RLHF-aligned InstructGPT model released November 2022 right before ChatGPT.',
  },
  {
    id: 'text-davinci-002',
    name: 'text-davinci-002',
    provider: 'OpenAI',
    year: 2022,
    family: 'GPT',
    contextWindow: 4097,
    inputCostPer1M: 20.00,
    outputCostPer1M: 20.00,
    tokenizerType: 'p50k_legacy',
    description: 'Feed-forward InstructGPT predecessor trained with supervised fine-tuning.',
  },
  {
    id: 'code-davinci-002',
    name: 'OpenAI Codex (code-davinci-002)',
    provider: 'OpenAI',
    year: 2022,
    family: 'Codex',
    contextWindow: 8001,
    inputCostPer1M: 20.00,
    outputCostPer1M: 20.00,
    tokenizerType: 'p50k_legacy',
    description: 'The engine that powered GitHub Copilot original launch.',
  },
  {
    id: 'cohere-command-legacy',
    name: 'Cohere Command (2022)',
    provider: 'Cohere',
    year: 2022,
    family: 'Command',
    contextWindow: 4096,
    inputCostPer1M: 1.00,
    outputCostPer1M: 2.00,
    tokenizerType: 'cl100k',
    description: 'Early commercial enterprise instruction model from Aidan Gomez team.',
  },

  // ─── 2020 / 2021 THE BIRTH OF LARGE LANGUAGE MODELS (GPT-3 ERA) ───
  {
    id: 'text-davinci-001',
    name: 'text-davinci-001',
    provider: 'OpenAI',
    year: 2021,
    family: 'GPT-3',
    contextWindow: 2049,
    inputCostPer1M: 20.00,
    outputCostPer1M: 20.00,
    tokenizerType: 'p50k_legacy',
    description: 'Early 2021 GPT-3 instruction-tuned completion model.',
  },
  {
    id: 'davinci-legacy',
    name: 'GPT-3 Davinci (175B, June 2020)',
    provider: 'OpenAI',
    year: 2020,
    family: 'GPT-3',
    contextWindow: 2049,
    inputCostPer1M: 20.00,
    outputCostPer1M: 20.00,
    tokenizerType: 'p50k_legacy',
    description: 'The historic June 2020 175-billion-parameter paper "Language Models are Few-Shot Learners".',
  },
  {
    id: 'curie-legacy',
    name: 'GPT-3 Curie (6.7B, 2020)',
    provider: 'OpenAI',
    year: 2020,
    family: 'GPT-3',
    contextWindow: 2049,
    inputCostPer1M: 2.00,
    outputCostPer1M: 2.00,
    tokenizerType: 'p50k_legacy',
    description: 'Mid-sized 6.7B GPT-3 model optimized for classification and fast translation.',
  },
  {
    id: 'babbage-legacy',
    name: 'GPT-3 Babbage (1B, 2020)',
    provider: 'OpenAI',
    year: 2020,
    family: 'GPT-3',
    contextWindow: 2049,
    inputCostPer1M: 0.40,
    outputCostPer1M: 0.40,
    tokenizerType: 'p50k_legacy',
    description: 'Compact 1-billion-parameter model for simple search ranking and parsing.',
  },
  {
    id: 'ada-legacy',
    name: 'GPT-3 Ada (350M, 2020)',
    provider: 'OpenAI',
    year: 2020,
    family: 'GPT-3',
    contextWindow: 2049,
    inputCostPer1M: 0.20,
    outputCostPer1M: 0.20,
    tokenizerType: 'p50k_legacy',
    description: 'Smallest original 350M GPT-3 model capable of parsing simple text patterns.',
  },
];

/**
 * Tokenizer heuristic multiplier based on empirical dictionary size
 */
const TOKENIZER_MULTIPLIERS: Record<string, number> = {
  o200k: 0.96,        // OpenAI 200k vocab (GPT-4o, o1, o3, GPT-4.5) - highest compression
  cl100k: 1.00,       // OpenAI 100k vocab (GPT-4, GPT-3.5)
  p50k_legacy: 1.14,  // OpenAI legacy 50k vocab (GPT-3, Davinci) - requires ~14% more tokens
  claude: 1.02,       // Anthropic Claude tokenizer
  gemini: 0.98,       // Google SentencePiece tokenizer
  llama: 0.97,        // Meta Llama 3 (128k)
  deepseek: 0.97,     // DeepSeek BPE
  mistral: 0.99,      // Mistral BPE
};

/**
 * Calculate token count and cost for a specific model
 */
export function calculateModelTokens(text: string, model: AIModel): {
  tokens: number;
  inputCost: number;
  contextUsagePct: number;
  charsPerToken: number;
} {
  if (!text || text.trim().length === 0) {
    return {
      tokens: 0,
      inputCost: 0,
      contextUsagePct: 0,
      charsPerToken: 0,
    };
  }

  // Regex splitting approximating BPE chunks
  const bpeRegex = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}{1,3}| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
  const matches = text.match(bpeRegex) || [];

  let baseTokens = 0;
  for (let i = 0; i < matches.length; i++) {
    const len = matches[i].length;
    if (len <= 4) baseTokens += 1;
    else if (len <= 8) baseTokens += Math.ceil(len / 4);
    else baseTokens += Math.ceil(len / 3.5);
  }

  const multiplier = TOKENIZER_MULTIPLIERS[model.tokenizerType] || 1.0;
  const finalTokens = Math.max(1, Math.round(baseTokens * multiplier));

  const inputCost = Number(((finalTokens / 1_000_000) * model.inputCostPer1M).toFixed(6));
  const contextUsagePct = Number(((finalTokens / model.contextWindow) * 100).toFixed(3));
  const charsPerToken = Number((text.length / finalTokens).toFixed(2));

  return {
    tokens: finalTokens,
    inputCost,
    contextUsagePct,
    charsPerToken,
  };
}
