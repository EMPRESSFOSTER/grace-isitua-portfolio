// app/api/ai/health/route.ts
// Diagnostic endpoint to verify OpenRouter connectivity in production.
// GET /api/ai/health
//
// Safe to expose publicly — never returns API keys or sensitive data.
// Hit this immediately after deploying to Netlify to confirm the integration works.

export const dynamic = 'force-dynamic';

interface HealthResult {
  provider: string;
  configured: boolean;
  model: string;
  siteUrl: string;
  status: 'ok' | 'error' | 'misconfigured';
  error?: string;
  latencyMs?: number;
  checkedAt: string;
}

export async function GET() {
  const model = process.env.OPENROUTER_MODEL || 'openrouter/free';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://graceisitua.netlify.app';
  const rawKey = process.env.OPENROUTER_API_KEY;
  const key = rawKey ? rawKey.trim().replace(/^["']|["']$/g, '').trim() : '';

  const hasKey = key.length > 0;
  const validPrefix = key.startsWith('sk-or-v1-');
  const hasQuotes = Boolean(rawKey && (rawKey.startsWith('"') || rawKey.startsWith("'")));
  const hasWhitespace = Boolean(rawKey && rawKey !== rawKey.trim());

  const base = {
    provider: 'openrouter',
    configured: hasKey,
    keyLength: key.length,
    validPrefix,
    hasQuotes,
    hasWhitespace,
    model,
    siteUrl,
    checkedAt: new Date().toISOString(),
  };

  if (!hasKey) {
    console.error('[Grace AI] Health check: OPENROUTER_API_KEY is not configured');
    return Response.json(
      { ...base, status: 'misconfigured', error: 'OPENROUTER_API_KEY is not set' },
      { status: 503 },
    );
  }

  if (!validPrefix) {
    console.error(
      `[Grace AI] Health check: OPENROUTER_API_KEY is invalid | length: ${key.length} | validPrefix: false`,
    );
    return Response.json(
      {
        ...base,
        status: 'misconfigured',
        error: `OPENROUTER_API_KEY in Netlify dashboard is invalid (length ${key.length}). OpenRouter API keys must start with 'sk-or-v1-'.`,
      },
      { status: 503 },
    );
  }

  // Make a minimal test request to OpenRouter to verify connectivity and auth.
  const startMs = Date.now();
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': siteUrl,
        'X-Title': 'Grace AI - Health Check',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Say "ok" in one word.' }],
        max_tokens: 5,
        stream: false,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const latencyMs = Date.now() - startMs;

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = (await response.text()).slice(0, 300);
      } catch {
        errorBody = '(unreadable)';
      }

      console.error(
        `[Grace AI] Health check failed | status: ${response.status} | model: ${model}\n` +
          `  body: ${errorBody}`,
      );

      return Response.json(
        {
          ...base,
          status: 'error',
          latencyMs,
          error: `OpenRouter returned HTTP ${response.status}. Check Netlify logs for details.`,
        } satisfies HealthResult,
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? '(no content)';
    console.log(`[Grace AI] Health check OK | ${latencyMs}ms | model: ${data.model || model} | reply: "${content}"`);

    return Response.json(
      { ...base, status: 'ok', latencyMs } satisfies HealthResult,
      { status: 200 },
    );
  } catch (err) {
    const latencyMs = Date.now() - startMs;
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[Grace AI] Health check network error | ${latencyMs}ms | ${message}`);

    return Response.json(
      {
        ...base,
        status: 'error',
        latencyMs,
        error: `Network error reaching OpenRouter: ${message}`,
      } satisfies HealthResult,
      { status: 502 },
    );
  }
}
