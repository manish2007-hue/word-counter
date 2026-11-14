import { executeAIWorkspaceAction, type AIWorkspaceRequest } from '../../src/lib/aiWorkspaceService';

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const body: AIWorkspaceRequest = await request.json();

    if (!body || !body.action || !body.text) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: action and text' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = (env && env.GEMINI_API_KEY) || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);

    // If streaming requested
    if (body.options?.stream) {
      const { ReadableStream } = globalThis as any;
      const { systemInstruction, userPrompt, buildPrompt } = await import('../../src/lib/aiWorkspaceService');
      const stream = new ReadableStream({
        async start(controller: any) {
          try {
            const encoder = new TextEncoder();
            const { streamAIWorkspaceAction } = await import('../../src/lib/aiWorkspaceService');
            await streamAIWorkspaceAction(body, apiKey, (chunkText: string) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`));
            });
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (err: any) {
            controller.error(err);
          }
        }
      });

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      });
    }

    // Standard structured JSON response
    const result = await executeAIWorkspaceAction(body, apiKey);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('AI Workspace error:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred in AI Workspace',
        details: error.toString()
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
