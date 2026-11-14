/**
 * CleanWordCounter AI Workspace Backend Service
 * Wired to Google Gemini 2.5 Flash with fallback to Gemini 2.0 / 1.5 Flash.
 * Supports structured JSON generation and streaming (Server-Sent Events).
 */

export interface AIWorkspaceRequest {
  action: 'summarize' | 'transcript' | 'trim';
  text: string;
  options?: {
    targetWords?: number;
    stream?: boolean;
    docTitle?: string;
  };
}

export interface SummaryOutput {
  action: 'summarize';
  executiveSummary: string;
  keyTakeaways: string[];
  flashcards: Array<{ question: string; answer: string }>;
}

export interface TranscriptOutput {
  action: 'transcript';
  title: string;
  cleanNotesMarkdown: string;
  actionItems: string[];
}

export interface TrimOutput {
  action: 'trim';
  trimmedEssay: string;
  originalWordCount: number;
  trimmedWordCount: number;
  targetWordCount: number;
  wordsSaved: number;
  preservedCitations: string[];
  editorialNotes: string;
}

export type AIWorkspaceResponse = SummaryOutput | TranscriptOutput | TrimOutput;

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash'
];

function countWords(str: string): number {
  if (!str || !str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}

export function buildPrompt(action: string, text: string, options: AIWorkspaceRequest['options'] = {}) {
  const wordCount = countWords(text);

  if (action === 'summarize') {
    return {
      systemInstruction: `You are an expert executive research analyst and academic study coach.
Analyze the provided document text thoroughly.
Respond with pure JSON matching this exact structure:
{
  "action": "summarize",
  "executiveSummary": "A cohesive 2-3 paragraph executive summary synthesizing the premise, core arguments/findings, and final conclusions.",
  "keyTakeaways": [
    "5 to 8 bulleted high-impact takeaways highlighting actionable insights and core takeaways."
  ],
  "flashcards": [
    {
      "question": "Clear, testing question testing a key concept, definition, or finding.",
      "answer": "Concise, precise answer suitable for active recall study."
    }
  ]
}
Ensure there are at least 6 high-yield flashcards and 5 key takeaways.`,
      userPrompt: `Document Title: ${options.docTitle || 'Untitled Document'}\nWord Count: ${wordCount} words\n\nDocument Text:\n${text}`
    };
  }

  if (action === 'transcript') {
    return {
      systemInstruction: `You are an expert academic note-taker and technical editor.
You will receive raw, messy transcript text (from YouTube, Zoom lecture, audio recording, or podcast).
It contains timestamps (e.g. 00:15, [14:22]), speaker labels, stutters, and filler phrases ("um", "uh", "you know", "like", "sort of").
Your task:
1. Strip all timestamps and conversational filler words.
2. Structure the concepts into comprehensive, beautifully organized Markdown notes with clear H1, H2, H3 headers, bulleted lists, key terms in bold, and code/formulas where applicable.
3. Identify 4-7 actionable follow-up items, study exercises, or key takeaways.
Respond with pure JSON matching this exact structure:
{
  "action": "transcript",
  "title": "Clear, descriptive title of the lecture or video",
  "cleanNotesMarkdown": "Full formatted Markdown revision notes without timestamps or fillers",
  "actionItems": [
    "Concrete action items, study questions, or next steps"
  ]
}`,
      userPrompt: `Raw Transcript Text (${wordCount} words):\n${text}`
    };
  }

  if (action === 'trim') {
    const targetWords = options.targetWords || Math.max(50, Math.round(wordCount * 0.8));
    return {
      systemInstruction: `You are a master academic admissions editor and writing coach.
The user needs their essay or statement strictly trimmed to fit within a strict word budget ceiling of ${targetWords} words (input has ${wordCount} words).
Rules:
1. Ruthlessly cut fluff, throat-clearing intro phrases, redundant descriptors, and passive voice.
2. CRITICAL MANDATE: PRESERVE all in-text academic citations intact (e.g., (Smith, 2024), MLA style (Jones 45), IEEE [1], Harvard references). Never drop, distort, or invent citations.
3. Keep the author's original voice, thesis, and evidence compelling.
4. The output trimmedEssay word count MUST be at or just below ${targetWords} words.
Respond with pure JSON matching this exact structure:
{
  "action": "trim",
  "trimmedEssay": "The fully trimmed, polished essay prose hitting the exact budget",
  "originalWordCount": ${wordCount},
  "trimmedWordCount": <actual word count of trimmedEssay>,
  "targetWordCount": ${targetWords},
  "wordsSaved": <originalWordCount - trimmedWordCount>,
  "preservedCitations": ["Array of citations found and preserved"],
  "editorialNotes": "1-2 sentences summarizing which verbose constructions were streamlined"
}`,
      userPrompt: `Target Ceiling: ${targetWords} words\nCurrent Word Count: ${wordCount} words\n\nEssay Text:\n${text}`
    };
  }

  throw new Error(`Unknown AI action: ${action}`);
}

/**
 * Call Gemini 2.5 Flash API with model fallback
 */
export async function executeAIWorkspaceAction(
  req: AIWorkspaceRequest,
  apiKey?: string
): Promise<AIWorkspaceResponse> {
  const key = apiKey || process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured in the environment. Please set GEMINI_API_KEY.');
  }

  const { systemInstruction, userPrompt } = buildPrompt(req.action, req.text, req.options);

  let lastError: any = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        // If 404 model not found, try next fallback model
        if (res.status === 404 && model !== GEMINI_MODELS[GEMINI_MODELS.length - 1]) {
          lastError = new Error(`Model ${model} returned 404, falling back...`);
          continue;
        }
        throw new Error(`Gemini API error (${res.status} on ${model}): ${errorText}`);
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Empty response received from Gemini API');
      }

      // Parse JSON from text
      let parsed: any;
      try {
        parsed = JSON.parse(rawText);
      } catch (e) {
        // Fallback: extract JSON block if wrapped in markdown
        const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } else {
          throw new Error('Failed to parse structured JSON from Gemini response');
        }
      }

      // Compute actual word count for trim action if needed
      if (req.action === 'trim' && parsed.trimmedEssay) {
        parsed.trimmedWordCount = countWords(parsed.trimmedEssay);
        parsed.originalWordCount = countWords(req.text);
        parsed.wordsSaved = Math.max(0, parsed.originalWordCount - parsed.trimmedWordCount);
      }

      return parsed as AIWorkspaceResponse;
    } catch (err: any) {
      lastError = err;
      // If error was not 404, don't keep retrying if it's an auth error
      if (err.message && err.message.includes('API_KEY_INVALID')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Failed to communicate with Gemini API');
}

/**
 * Handle streaming SSE from Gemini API
 */
export async function streamAIWorkspaceAction(
  req: AIWorkspaceRequest,
  apiKey: string | undefined,
  onChunk: (chunk: string) => void
): Promise<void> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not configured');

  const { systemInstruction, userPrompt } = buildPrompt(req.action, req.text, req.options);

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${key}`;
      
      const payload = {
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { responseMimeType: 'application/json', temperature: 0.3 }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        if (res.status === 404 && model !== GEMINI_MODELS[GEMINI_MODELS.length - 1]) {
          continue;
        }
        throw new Error(`Gemini Stream error (${res.status}): ${await res.text()}`);
      }

      if (!res.body) throw new Error('No readable stream returned by Gemini API');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const jsonStr = trimmed.slice(6);
            if (jsonStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const chunkText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (chunkText) {
                onChunk(chunkText);
              }
            } catch (e) {
              // Ignore partial JSON chunks
            }
          }
        }
      }
      return;
    } catch (err) {
      if (model === GEMINI_MODELS[GEMINI_MODELS.length - 1]) throw err;
    }
  }
}
