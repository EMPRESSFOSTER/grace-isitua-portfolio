// app/api/quotes/route.ts
// Quote request endpoint
// POST /api/quotes

import { NextRequest } from 'next/server';
import { QuoteSchema } from '@/lib/security/validation';
import { insertQuoteRequest } from '@/lib/supabase/server';
import { sendQuoteNotification } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateResult = checkRateLimit(ip, 'leads'); // use same lead rate limit

  if (!rateResult.allowed) {
    return Response.json(
      { error: 'Too many submissions. Please wait before trying again.', code: 'rate_limited' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request format', code: 'bad_request' }, { status: 400 });
  }

  const parsed = QuoteSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((e: { message: string }) => e.message).join(', ');
    return Response.json({ error: errors, code: 'validation_error' }, { status: 400 });
  }

  const quote = parsed.data;

  const { data: insertedQuote, error: dbError } = await insertQuoteRequest({
    name: quote.name,
    email: quote.email,
    project_type: quote.projectType,
    pages: quote.pages ?? null,
    features: quote.features ?? null,
    timeline: quote.timeline ?? null,
    budget: quote.budget ?? null,
    description: quote.description ?? null,
    conversation_id: quote.conversationId ?? null,
    status: 'new',
  });

  if (dbError) {
    console.error('[Grace AI] Failed to insert quote request:', dbError);
  }

  const emailSent = await sendQuoteNotification({
    name: quote.name,
    email: quote.email,
    projectType: quote.projectType,
    pages: quote.pages,
    features: quote.features,
    timeline: quote.timeline,
    budget: quote.budget,
    description: quote.description,
    createdAt: new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }),
  });

  if (!emailSent) {
    console.error('[Grace AI] Quote email failed — quote ID:', insertedQuote?.id ?? 'unknown');
  }

  if (dbError && !emailSent) {
    return Response.json(
      { error: 'Something went wrong. Please contact Grace directly at graceantony202@gmail.com', code: 'storage_error' },
      { status: 500 }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Your quote request has been sent! Grace will review your requirements and get back to you soon.",
      quoteId: insertedQuote?.id,
    },
    { status: 201 }
  );
}
