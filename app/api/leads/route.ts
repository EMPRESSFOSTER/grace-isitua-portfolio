// app/api/leads/route.ts
// Lead capture endpoint
// POST /api/leads

import { NextRequest } from 'next/server';
import { LeadSchema } from '@/lib/security/validation';
import { insertLead } from '@/lib/supabase/server';
import { sendLeadNotification } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  // ── Rate Limiting ─────────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rateResult = checkRateLimit(ip, 'leads');

  if (!rateResult.allowed) {
    return Response.json(
      { error: 'Too many submissions. Please wait before trying again.', code: 'rate_limited' },
      { status: 429 }
    );
  }

  // ── Parse & Validate ──────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request format', code: 'bad_request' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((e: { message: string }) => e.message).join(', ');
    return Response.json({ error: errors, code: 'validation_error' }, { status: 400 });
  }

  const lead = parsed.data;

  // ── Store in Supabase ─────────────────────────────────────────────────────
  const { data: insertedLead, error: dbError } = await insertLead({
    name: lead.name,
    email: lead.email,
    company: lead.company ?? null,
    phone: lead.phone ?? null,
    service: lead.service ?? null,
    project_description: lead.projectDescription ?? null,
    budget: lead.budget ?? null,
    timeline: lead.timeline ?? null,
    source: lead.source,
    conversation_id: lead.conversationId ?? null,
    status: 'new',
  });

  if (dbError) {
    // Still try to send the email even if DB insert fails
    console.error('[Grace AI] Failed to insert lead into Supabase:', dbError);
  }

  // ── Send Email Notification ───────────────────────────────────────────────
  const emailSent = await sendLeadNotification({
    name: lead.name,
    email: lead.email,
    company: lead.company,
    phone: lead.phone,
    service: lead.service,
    projectDescription: lead.projectDescription,
    budget: lead.budget,
    timeline: lead.timeline,
    source: lead.source,
    createdAt: new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }),
  });

  if (!emailSent) {
    console.error('[Grace AI] Lead email notification failed — lead ID:', insertedLead?.id ?? 'unknown');
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
      message: "Thanks! Grace has been notified and will reach out to you shortly.",
      leadId: insertedLead?.id,
    },
    { status: 201 }
  );
}
