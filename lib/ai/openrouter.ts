// lib/ai/openrouter.ts
// OpenRouter API client — server-side ONLY
// Never import this file in client components or pages

import type { AIProvider, ChatRequest, ChatResponse } from './types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'openrouter/auto';
const REQUEST_TIMEOUT_MS = 30_000;

export class OpenRouterProvider implements AIProvider {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly siteUrl: string;

  constructor() {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }
    this.apiKey = key;
    this.model = DEFAULT_MODEL;
    this.siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grace-isitua.netlify.app';
  }

  private buildHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': this.siteUrl,
      'X-Title': 'Grace AI - Portfolio Assistant',
    };
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

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

      if (!response.ok) {
        const status = response.status;
        if (status === 429) throw new AIProviderError('rate_limit', 'Rate limit exceeded');
        if (status === 402) throw new AIProviderError('quota', 'API quota exceeded');
        if (status >= 500) throw new AIProviderError('server_error', 'OpenRouter service error');
        throw new AIProviderError('api_error', `API error: ${status}`);
      }

      const data = await response.json();

      const content = data?.choices?.[0]?.message?.content;
      if (!content) {
        throw new AIProviderError('malformed_response', 'No content in response');
      }

      return {
        content,
        model: data.model || this.model,
        usage: data.usage ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        } : undefined,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof AIProviderError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new AIProviderError('timeout', 'Request timed out');
      }
      throw new AIProviderError('network_error', 'Network error connecting to AI service');
    }
  }

  async chatStream(request: ChatRequest): Promise<ReadableStream<Uint8Array>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify({
        model: request.model || this.model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 1024,
        stream: true,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      if (status === 429) throw new AIProviderError('rate_limit', 'Rate limit exceeded');
      if (status === 402) throw new AIProviderError('quota', 'API quota exceeded');
      if (status >= 500) throw new AIProviderError('server_error', 'OpenRouter service error');
      throw new AIProviderError('api_error', `API error: ${status}`);
    }

    if (!response.body) {
      throw new AIProviderError('malformed_response', 'No response body for streaming');
    }

    // Transform the SSE stream into a plain text stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    return new ReadableStream<Uint8Array>({
      async start(streamController) {
        const reader = response.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              streamController.close();
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));
            for (const line of lines) {
              const data = line.replace(/^data:\s*/, '').trim();
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
                // Skip malformed SSE chunks
              }
            }
          }
        } catch (error) {
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
    public readonly code: 'rate_limit' | 'quota' | 'server_error' | 'api_error' | 'timeout' | 'network_error' | 'malformed_response',
    message: string,
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}
