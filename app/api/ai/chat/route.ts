// app/api/ai/chat/route.ts
// Main AI Chat endpoint — server-side only
// POST /api/ai/chat

import { NextRequest } from 'next/server';
import { getAIProvider } from '@/lib/ai/provider';
import { buildSystemPrompt } from '@/lib/ai/system-prompt';
import { buildKnowledgeContext } from '@/lib/ai/retrieval';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';
import { ChatRequestSchema } from '@/lib/security/validation';
import { insertAnalyticsEvent } from '@/lib/supabase/server';
import { AIProviderError } from '@/lib/ai/openrouter';
import type { ChatMessage } from '@/lib/ai/types';

// Friendly error message shown to visitors on failure
const FRIENDLY_ERROR =
  "Sorry, I'm having a little trouble connecting right now. Please use the contact options below and Grace will get back to you shortly.";

export async function POST(req: NextRequest) {
  // ── 1. Rate Limiting ──────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rateResult = checkRateLimit(ip, 'chat');

  if (!rateResult.allowed) {
    return Response.json(
      {
        error: "You're sending messages a little quickly. Please wait a moment and try again.",
        code: 'rate_limited',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(rateResult.resetAfterMs / 1000)) },
      }
    );
  }

  // ── 2. Parse & Validate Request ───────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request format', code: 'bad_request' }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid request';
    return Response.json({ error: firstError, code: 'validation_error' }, { status: 400 });
  }

  const { message, history } = parsed.data;

  // ── 3. Retrieve Relevant Knowledge ────────────────────────────────────────
  const knowledgeContext = buildKnowledgeContext(message);

  // ── 4. Build System Prompt ────────────────────────────────────────────────
  const systemPrompt = buildSystemPrompt(knowledgeContext);

  // ── 5. Build Message Array ────────────────────────────────────────────────
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    // Include conversation history (capped at 20 messages by schema)
    ...(history ?? []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    // Current user message
    { role: 'user', content: message },
  ];

  // ── 6. Call AI Provider (Streaming) ──────────────────────────────────────
  try {
    const provider = getAIProvider();
    const stream = await provider.chatStream({ messages });

    // Log analytics event (fire and forget — don't block response)
    insertAnalyticsEvent({
      event: 'message_sent',
      conversation_id: parsed.data.conversationId ?? null,
      metadata: { ip_hash: hashIp(ip) },
    }).catch(() => {});

    // Return the streaming response
    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, no-store',
      },
    });
  } catch (error) {
    // ── 7. Graceful Error Handling ────────────────────────────────────────
    if (error instanceof AIProviderError) {
      console.error(`[Grace AI] Provider error [${error.code}]:`, error.message);

      if (error.code === 'rate_limit') {
        return Response.json(
          { error: "The AI service is a little busy right now. Please try again in a moment.", code: 'provider_rate_limit' },
          { status: 503 }
        );
      }

      return Response.json({ error: FRIENDLY_ERROR, code: error.code }, { status: 503 });
    }

    console.error('[Grace AI] Unexpected chat error:', error);
    return Response.json({ error: FRIENDLY_ERROR, code: 'internal_error' }, { status: 500 });
  }
}

/** One-way hash of IP for analytics — never store raw IPs */
function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
