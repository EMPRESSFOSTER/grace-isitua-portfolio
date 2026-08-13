// lib/ai/openrouter.ts
// OpenRouter API client — server-side ONLY
// Never import this file in client components or pages

import type { AIProvider, ChatRequest, ChatResponse } from './types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Default to 'openrouter/free' — the free routing tier.
// Never fall back to 'openrouter/auto' which routes to paid models.
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'openrouter/free';

const REQUEST_TIMEOUT_MS = 30_000;

export class OpenRouterProvider implements AIProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly siteUrl: string;

  constructor() {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      console.error('[Grace AI] FATAL: OPENROUTER_API_KEY environment variable is not set');
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }
    this.apiKey = key;
    this.model = DEFAULT_MODEL;
    // Correct production URL — no hyphen before ".netlify"
    this.siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://graceisitua.netlify.app';

    console.log(
      `[Grace AI] OpenRouterProvider initialised | model: ${this.model} | site: ${this.siteUrl}`,
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
      // Truncate long bodies; we only need the key diagnostic fields
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
    const safeBody = body.replace(/"Authorization":\s*"[^"]*"/gi, '"Authorization":"[REDACTED]"');

    if (status === 401) {
      console.error(
        `[Grace AI] OpenRouter ${context} failed — 401 Unauthorized.\n` +
          `  model: ${this.model}\n` +
          `  body: ${safeBody}\n` +
          `  Check that OPENROUTER_API_KEY is set correctly in Netlify environment variables.`,
      );
      return new AIProviderError('api_error', 'OpenRouter authentication failed (401)');
    }

    if (status === 402) {
      console.error(
        `[Grace AI] OpenRouter ${context} failed — 402 Payment Required.\n` +
          `  model: ${this.model}\n` +
          `  body: ${safeBody}\n` +
          `  The account has no credits or the model requires payment. Ensure OPENROUTER_MODEL=openrouter/free is set.`,
      );
      return new AIProviderError('quota', 'OpenRouter quota exceeded (402)');
    }

    if (status === 403) {
      console.error(
        `[Grace AI] OpenRouter ${context} failed — 403 Forbidden.\n` +
          `  model: ${this.model}\n` +
          `  body: ${safeBody}`,
      );
      return new AIProviderError('api_error', 'OpenRouter access forbidden (403)');
    }

    if (status === 404) {
      console.error(
        `[Grace AI] OpenRouter ${context} failed — 404 Not Found.\n` +
          `  model: ${this.model}\n` +
          `  body: ${safeBody}\n` +
          `  The model "${this.model}" may not exist. Check OPENROUTER_MODEL env var.`,
      );
      return new AIProviderError('api_error', `OpenRouter model not found (404) — model: ${this.model}`);
    }

    if (status === 429) {
      console.warn(
        `[Grace AI] OpenRouter ${context} rate limited — 429.\n` +
          `  model: ${this.model}`,
      );
      return new AIProviderError('rate_limit', 'OpenRouter rate limit exceeded (429)');
    }

    if (status >= 500) {
      console.error(
        `[Grace AI] OpenRouter ${context} server error — ${status}.\n` +
          `  model: ${this.model}\n` +
          `  body: ${safeBody}`,
      );
      return new AIProviderError('server_error', `OpenRouter service error (${status})`);
    }

    console.error(
      `[Grace AI] OpenRouter ${context} unexpected error — ${status}.\n` +
        `  model: ${this.model}\n` +
        `  body: ${safeBody}`,
    );
    return new AIProviderError('api_error', `OpenRouter API error (${status})`);
  }

  // ── Non-streaming chat ────────────────────────────────────────────────────
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const startMs = Date.now();

    console.log(`[Grace AI] chat() | model: ${this.model}`);

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: this.buildHeaders(),
        body: JSON.stringify({
          model: request.model || this.model,
          messages: request.messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 1024,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const durationMs = Date.now() - startMs;

      if (!response.ok) {
        const body = await this.safeReadErrorBody(response);
        throw this.mapStatusToError(response.status, body, 'chat()');
      }

      const data = await response.json();

      const content = data?.choices?.[0]?.message?.content;
      if (!content) {
        console.error('[Grace AI] chat() — malformed response: no content in choices[0].message.content');
        throw new AIProviderError('malformed_response', 'No content in response');
      }

      console.log(`[Grace AI] chat() complete | ${durationMs}ms | model: ${data.model || this.model}`);

      return {
        content,
        model: data.model || this.model,
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
      if (error instanceof AIProviderError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        const durationMs = Date.now() - startMs;
        console.error(`[Grace AI] chat() timed out after ${durationMs}ms | model: ${this.model}`);
        throw new AIProviderError('timeout', 'Request timed out after 30s');
      }
      console.error('[Grace AI] chat() network error:', error instanceof Error ? error.message : String(error));
      throw new AIProviderError('network_error', 'Network error connecting to OpenRouter');
    }
  }

  // ── Streaming chat ────────────────────────────────────────────────────────
  async chatStream(request: ChatRequest): Promise<ReadableStream<Uint8Array>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const startMs = Date.now();
    const model = request.model || this.model;

    console.log(`[Grace AI] chatStream() | model: ${model}`);

    let response: Response;
    try {
      response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
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
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        const durationMs = Date.now() - startMs;
        console.error(`[Grace AI] chatStream() fetch timed out after ${durationMs}ms | model: ${model}`);
        throw new AIProviderError('timeout', 'Request timed out after 30s');
      }
      console.error(
        '[Grace AI] chatStream() network/fetch error:',
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
      throw new AIProviderError('network_error', 'Network error connecting to OpenRouter');
    }

    clearTimeout(timeoutId);
    const durationMs = Date.now() - startMs;

    if (!response.ok) {
      const body = await this.safeReadErrorBody(response);
      throw this.mapStatusToError(response.status, body, 'chatStream()');
    }

    if (!response.body) {
      console.error('[Grace AI] chatStream() — response.body is null (no streaming body)');
      throw new AIProviderError('malformed_response', 'No response body for streaming');
    }

    console.log(`[Grace AI] chatStream() connection established | ${durationMs}ms | model: ${model} | streaming started`);

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    return new ReadableStream<Uint8Array>({
      async start(streamController) {
        const reader = response.body!.getReader();
        // Buffer accumulates partial SSE data across network chunks.
        // An SSE payload can be split mid-line across two fetch chunks,
        // e.g. chunk1: 'data: {"choices":[{"delta":{"con'
        //      chunk2: 'tent":"Hello"}}]}\n\n'
        // Without buffering, JSON.parse() fails and the token is silently lost.
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process all complete SSE messages in the buffer.
            // SSE messages are delimited by '\n\n' or '\r\n\r\n'.
            let boundary: number;
            while ((boundary = buffer.indexOf('\n\n')) !== -1) {
              const message = buffer.slice(0, boundary);
              buffer = buffer.slice(boundary + 2);

              for (const line of message.split('\n')) {
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
                  if (delta) {
                    streamController.enqueue(encoder.encode(delta));
                  }
                } catch {
                  // Malformed JSON in a single SSE line — skip it.
                  // (This is a genuine parse error, not a split-chunk issue,
                  //  since we only process complete '\n\n'-terminated messages.)
                }
              }
            }
          }

          // Flush any remaining buffer content (stream ended without [DONE])
          if (buffer.trim()) {
            for (const line of buffer.split('\n')) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const data = trimmed.slice(5).trim();
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed?.choices?.[0]?.delta?.content;
                if (delta) streamController.enqueue(encoder.encode(delta));
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
  }
}

export class AIProviderError extends Error {
  constructor(
    public readonly code:
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
  }
}
