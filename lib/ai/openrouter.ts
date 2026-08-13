// lib/ai/openrouter.ts
// OpenRouter API client — server-side ONLY
// Never import this file in client components or pages

import type { AIProvider, ChatRequest, ChatResponse } from './types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Curated list of reliable conversational free models on OpenRouter
// (avoiding content-safety classifier models like nemotron-3.5-content-safety)
export const DEFAULT_FREE_MODELS = [
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3.5-lightning:free',
  'openai/gpt-oss-20b:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
];

const envModel = process.env.OPENROUTER_MODEL;
const DEFAULT_MODEL =
  envModel && envModel !== 'openrouter/free' ? envModel : DEFAULT_FREE_MODELS[0];

const REQUEST_TIMEOUT_MS = 30_000;

export class OpenRouterProvider implements AIProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly siteUrl: string;

  constructor() {
    const rawKey = process.env.OPENROUTER_API_KEY;
    const hasRawKey = Boolean(rawKey);
    const key = rawKey ? rawKey.trim().replace(/^["']|["']$/g, '').trim() : '';

    const hasKey = key.length > 0;
    const hasModel = Boolean(process.env.OPENROUTER_MODEL);
    const hasSiteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

    console.log(`[Grace AI] OPENROUTER_API_KEY configured: ${hasKey} | length: ${key.length} | validPrefix: ${key.startsWith('sk-or-v1-')}`);
    console.log(`[Grace AI] OPENROUTER_MODEL configured: ${hasModel} (effective: ${DEFAULT_MODEL})`);
    console.log(`[Grace AI] NEXT_PUBLIC_SITE_URL configured: ${hasSiteUrl}`);

    if (!hasKey) {
      console.error('[Grace AI] OPENROUTER_API_KEY is missing at runtime');
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }

    if (!key.startsWith('sk-or-v1-')) {
      console.error(
        `[Grace AI] INVALID OPENROUTER_API_KEY format | length: ${key.length} | validPrefix: false\n` +
          `  OpenRouter API keys must start with 'sk-or-v1-'.\n` +
          `  The value currently set in Netlify environment variables appears to be a 366-character key from another service (e.g. Supabase JWT).\n` +
          `  Please update OPENROUTER_API_KEY in Netlify Dashboard → Site Settings → Environment Variables.`,
      );
    }

    this.apiKey = key;
    this.model = DEFAULT_MODEL;
    // Correct production URL — no hyphen before ".netlify"
    this.siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://graceisitua.netlify.app';

    console.log(
      `[Grace AI] OpenRouterProvider initialised | provider: openrouter | model: ${this.model} | site: ${this.siteUrl}`,
    );
  }

  private buildHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': this.siteUrl,
      'X-Title': 'Grace AI - Portfolio Assistant',
    };
  }

  // ── Safely read the response body for error logging ──────────────────────
  // Never throws — returns a truncated string so logs stay readable.
  private async safeReadErrorBody(response: Response): Promise<string> {
    try {
      const text = await response.text();
      try {
        const parsed = JSON.parse(text);
        if (parsed?.error?.message) {
          return String(parsed.error.message);
        }
        if (parsed?.message) {
          return String(parsed.message);
        }
      } catch {
        // Not valid JSON
      }
      return text.slice(0, 500);
    } catch {
      return '(could not read response body)';
    }
  }

  // ── Map HTTP status → AIProviderError ─────────────────────────────────────
  private mapStatusToError(
    status: number,
    body: string,
    context: string,
  ): AIProviderError {
    const safeBody = body
      .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [REDACTED]')
      .replace(/"Authorization":\s*"[^"]*"/gi, '"Authorization":"[REDACTED]"');

    console.error(
      `[Grace AI] OpenRouter error\n` +
        `status: ${status}\n` +
        `context: ${context}\n` +
        `model: ${this.model}\n` +
        `message: ${safeBody}`,
    );

    if (status === 401) {
      return new AIProviderError('api_error', `OpenRouter authentication failed (401): ${safeBody}`);
    }

    if (status === 402) {
      return new AIProviderError('quota', `OpenRouter quota exceeded (402): ${safeBody}`);
    }

    if (status === 403) {
      return new AIProviderError('api_error', `OpenRouter access forbidden (403): ${safeBody}`);
    }

    if (status === 404) {
      return new AIProviderError('api_error', `OpenRouter model not found (404) — model: ${this.model}`);
    }

    if (status === 429) {
      return new AIProviderError('rate_limit', `OpenRouter rate limit exceeded (429): ${safeBody}`);
    }

    if (status >= 500) {
      return new AIProviderError('server_error', `OpenRouter service error (${status}): ${safeBody}`);
    }

    return new AIProviderError('api_error', `OpenRouter API error (${status}): ${safeBody}`);
  }

  // ── Non-streaming chat ────────────────────────────────────────────────────
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const startMs = Date.now();
    const candidateModels = request.model
      ? [request.model]
      : [this.model, ...DEFAULT_FREE_MODELS.filter((m) => m !== this.model)];

    let lastError: unknown = null;

    for (const model of candidateModels) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      console.log(`[Grace AI] Provider: openrouter | Model: ${model} | Calling OpenRouter (sync)`);

      try {
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: this.buildHeaders(),
          body: JSON.stringify({
            model,
            messages: request.messages,
            temperature: request.temperature ?? 0.7,
            max_tokens: request.maxTokens ?? 1024,
            stream: false,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const durationMs = Date.now() - startMs;
        console.log(`[Grace AI] OpenRouter response status: ${response.status} | model: ${model} | ${durationMs}ms`);

        if (!response.ok) {
          const body = await this.safeReadErrorBody(response);
          lastError = this.mapStatusToError(response.status, body, `chat() [${model}]`);
          console.warn(`[Grace AI] Model ${model} failed (${response.status}) — trying next candidate...`);
          continue;
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content || content.includes('User Safety: safe')) {
          console.warn(`[Grace AI] Model ${model} returned invalid or safety-only output — trying next candidate...`);
          continue;
        }

        console.log(`[Grace AI] chat() complete | ${durationMs}ms | model: ${data.model || model}`);

        return {
          content,
          model: data.model || model,
          usage: data.usage
            ? {
                promptTokens: data.usage.prompt_tokens,
                completionTokens: data.usage.completion_tokens,
                totalTokens: data.usage.total_tokens,
              }
            : undefined,
        };
      } catch (error) {
        clearTimeout(timeoutId);
        lastError = error;
        console.warn(`[Grace AI] Model ${model} network error:`, error instanceof Error ? error.message : String(error));
      }
    }

    if (lastError instanceof AIProviderError) throw lastError;
    throw new AIProviderError('network_error', 'All OpenRouter candidate models failed or were unavailable');
  }

  // ── Streaming chat ────────────────────────────────────────────────────────
  async chatStream(request: ChatRequest): Promise<ReadableStream<Uint8Array>> {
    const startMs = Date.now();
    const candidateModels = request.model
      ? [request.model]
      : [this.model, ...DEFAULT_FREE_MODELS.filter((m) => m !== this.model)];

    let lastError: unknown = null;

    for (const model of candidateModels) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      console.log(`[Grace AI] Provider: openrouter | Model: ${model} | Calling OpenRouter (stream)`);

      try {
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: this.buildHeaders(),
          body: JSON.stringify({
            model,
            messages: request.messages,
            temperature: request.temperature ?? 0.7,
            max_tokens: request.maxTokens ?? 1024,
            stream: true,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const durationMs = Date.now() - startMs;
        console.log(`[Grace AI] OpenRouter stream response status: ${response.status} | model: ${model} | ${durationMs}ms`);

        if (!response.ok) {
          const body = await this.safeReadErrorBody(response);
          lastError = this.mapStatusToError(response.status, body, `chatStream() [${model}]`);
          console.warn(`[Grace AI] Stream for model ${model} failed (${response.status}) — trying next candidate...`);
          continue;
        }

        if (!response.body) {
          console.warn(`[Grace AI] Model ${model} returned empty body — trying next candidate...`);
          continue;
        }

        console.log(`[Grace AI] chatStream() connection established | ${durationMs}ms | model: ${model} | streaming started`);

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        return new ReadableStream<Uint8Array>({
          async start(streamController) {
            const reader = response.body!.getReader();
            let buffer = '';

            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                while (true) {
                  const idxNn = buffer.indexOf('\n\n');
                  const idxRnRn = buffer.indexOf('\r\n\r\n');

                  if (idxNn === -1 && idxRnRn === -1) break;

                  let boundary: number;
                  let delimLen: number;

                  if (idxNn !== -1 && (idxRnRn === -1 || idxNn < idxRnRn)) {
                    boundary = idxNn;
                    delimLen = 2;
                  } else {
                    boundary = idxRnRn;
                    delimLen = 4;
                  }

                  const message = buffer.slice(0, boundary);
                  buffer = buffer.slice(boundary + delimLen);

                  for (const line of message.split(/\r?\n/)) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data:')) continue;

                    const data = trimmed.slice(5).trim();
                    if (data === '[DONE]') {
                      streamController.close();
                      return;
                    }

                    try {
                      const parsed = JSON.parse(data);
                      const delta = parsed?.choices?.[0]?.delta?.content;
                      // Filter out safety-classifier noise
                      if (delta && !delta.includes('User Safety:') && !delta.includes('Response Safety:')) {
                        streamController.enqueue(encoder.encode(delta));
                      }
                    } catch {
                      // Skip invalid SSE line
                    }
                  }
                }
              }

              // Flush any remaining buffer content
              if (buffer.trim()) {
                for (const line of buffer.split(/\r?\n/)) {
                  const trimmed = line.trim();
                  if (!trimmed.startsWith('data:')) continue;
                  const data = trimmed.slice(5).trim();
                  if (data === '[DONE]') break;
                  try {
                    const parsed = JSON.parse(data);
                    const delta = parsed?.choices?.[0]?.delta?.content;
                    if (delta && !delta.includes('User Safety:') && !delta.includes('Response Safety:')) {
                      streamController.enqueue(encoder.encode(delta));
                    }
                  } catch {
                    // ignore
                  }
                }
              }

              streamController.close();
            } catch (error) {
              console.error('[Grace AI] chatStream() read error:', error instanceof Error ? error.message : String(error));
              streamController.error(error);
            } finally {
              reader.releaseLock();
            }
          },
        });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        lastError = fetchError;
        console.warn(`[Grace AI] Stream for model ${model} network error:`, fetchError instanceof Error ? fetchError.message : String(fetchError));
      }
    }

    if (lastError instanceof AIProviderError) throw lastError;
    throw new AIProviderError('network_error', 'All OpenRouter candidate models failed to stream');
  }
}

export class AIProviderError extends Error {
  public readonly code:
    | 'rate_limit'
    | 'quota'
    | 'server_error'
    | 'api_error'
    | 'timeout'
    | 'network_error'
    | 'malformed_response';

  constructor(
    code:
      | 'rate_limit'
      | 'quota'
      | 'server_error'
      | 'api_error'
      | 'timeout'
      | 'network_error'
      | 'malformed_response',
    message: string,
  ) {
    super(message);
    this.name = 'AIProviderError';
    this.code = code;
  }
}

