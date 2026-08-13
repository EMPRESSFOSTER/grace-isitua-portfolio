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
  const requestStartMs = Date.now();

  console.log('[Grace AI] API route start | POST /api/ai/chat');

  // ── 0. Runtime Environment Verification ──────────────────────────────────
  const rawKey = process.env.OPENROUTER_API_KEY;
  const key = rawKey ? rawKey.trim().replace(/^["']|["']$/g, '').trim() : '';

  const hasKey = key.length > 0;
  const hasModel = Boolean(process.env.OPENROUTER_MODEL);
  const hasSiteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

  console.log(
    `[Grace AI] OPENROUTER_API_KEY configured: ${hasKey} | length: ${key.length} | validPrefix: ${key.startsWith('sk-or-v1-')}\n` +
      `[Grace AI] OPENROUTER_MODEL configured: ${hasModel}\n` +
      `[Grace AI] NEXT_PUBLIC_SITE_URL configured: ${hasSiteUrl}`,
  );

  if (!hasKey) {
    console.error('[Grace AI] OPENROUTER_API_KEY is missing at runtime');
    return Response.json(
      { error: FRIENDLY_ERROR, code: 'misconfigured' },
      { status: 503 },
    );
  }

  // ── 1. Rate Limiting ──────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rateResult = checkRateLimit(ip, 'chat');

  if (!rateResult.allowed) {
    console.warn(`[Grace AI] Rate limit hit | ip_hash: ${hashIp(ip)}`);
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
    console.warn('[Grace AI] Request validation failed — Invalid JSON body');
    return Response.json({ error: 'Invalid request format', code: 'bad_request' }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid request';
    console.warn(`[Grace AI] Request validation failed — ${firstError}`);
    return Response.json({ error: firstError, code: 'validation_error' }, { status: 400 });
  }

  const { message, history } = parsed.data;
  console.log(`[Grace AI] Request validated | message length: ${message.length}`);

  // Check if non-streaming diagnostic mode is requested
  const isSyncMode =
    req.nextUrl.searchParams.get('stream') === 'false' ||
    (body as { stream?: boolean })?.stream === false;

  // ── 3. Retrieve Relevant Knowledge ────────────────────────────────────────
  let knowledgeContext = '';
  try {
    knowledgeContext = buildKnowledgeContext(message);
    console.log('[Grace AI] Knowledge retrieval completed');
  } catch (kErr) {
    console.error(
      '[Grace AI] Knowledge retrieval error:',
      kErr instanceof Error ? kErr.message : String(kErr),
    );
    knowledgeContext =
      'Grace Isitua is a Frontend Engineer and Digital Creative based in Nigeria specializing in React, Next.js, TypeScript, and UI/UX design.';
  }

  // ── 4. Build System Prompt ────────────────────────────────────────────────
  const systemPrompt = buildSystemPrompt(knowledgeContext);

  // ── 5. Build Message Array ────────────────────────────────────────────────
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...(history ?? []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: message },
  ];

  // ── 6. Call AI Provider (Streaming or Non-Streaming Diagnostic) ───────────
  try {
    console.log(
      `[Grace AI] Provider initialization | provider: openrouter | messages: ${messages.length} | mode: ${isSyncMode ? 'sync' : 'stream'}`,
    );

    const provider = getAIProvider();

    if (isSyncMode) {
      const chatResponse = await provider.chat({ messages });
      const durationMs = Date.now() - requestStartMs;
      console.log(`[Grace AI] Non-streaming request completed | ${durationMs}ms`);

      insertAnalyticsEvent({
        event: 'message_sent',
        conversation_id: parsed.data.conversationId ?? null,
        metadata: { ip_hash: hashIp(ip) },
      }).catch(() => {});

      return Response.json(chatResponse);
    }

    const stream = await provider.chatStream({ messages });

    const durationMs = Date.now() - requestStartMs;
    console.log(`[Grace AI] Stream initialized successfully | ${durationMs}ms`);

    insertAnalyticsEvent({
      event: 'message_sent',
      conversation_id: parsed.data.conversationId ?? null,
      metadata: { ip_hash: hashIp(ip) },
    }).catch(() => {});

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
    const durationMs = Date.now() - requestStartMs;

    if (error instanceof AIProviderError) {
      console.error(
        `[Grace AI] Provider error [${error.code}] | ${durationMs}ms\n` +
          `  message: ${error.message}`,
      );

      if (error.code === 'rate_limit') {
        return Response.json(
          {
            error: 'The AI service is a little busy right now. Please try again in a moment.',
            code: 'provider_rate_limit',
          },
          { status: 503 },
        );
      }

      if (error.code === 'quota') {
        return Response.json(
          { error: FRIENDLY_ERROR, code: 'quota' },
          { status: 503 },
        );
      }

      if (error.code === 'timeout') {
        return Response.json(
          { error: FRIENDLY_ERROR, code: 'timeout' },
          { status: 503 },
        );
      }

      return Response.json({ error: FRIENDLY_ERROR, code: error.code }, { status: 503 });
    }

    if (error instanceof Error && error.message.includes('OPENROUTER_API_KEY')) {
      console.error(
        `[Grace AI] OPENROUTER_API_KEY is missing at runtime | ${durationMs}ms`,
      );
      return Response.json({ error: FRIENDLY_ERROR, code: 'misconfigured' }, { status: 503 });
    }

    console.error(
      `[Grace AI] Unexpected exception | ${durationMs}ms\n`,
      error,
    );
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

