// app/api/analytics/route.ts
// Analytics event tracker
// POST /api/analytics

import { NextRequest } from 'next/server';
import { AnalyticsEventSchema } from '@/lib/security/validation';
import { insertAnalyticsEvent } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateResult = checkRateLimit(ip, 'analytics');

  if (!rateResult.allowed) {
    // Silently drop analytics events when rate limited (don't error the user)
    return Response.json({ success: false }, { status: 200 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  const parsed = AnalyticsEventSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ success: false }, { status: 400 });
  }

  const { event, conversationId, metadata } = parsed.data;

  await insertAnalyticsEvent({
    event,
    conversation_id: conversationId ?? null,
    metadata: metadata ?? null,
  });

  return Response.json({ success: true });
}
