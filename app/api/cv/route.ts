// app/api/cv/route.ts
// CV download tracking endpoint
// GET /api/cv          — serves the CV PDF
// POST /api/cv         — logs a CV download request with optional contact info

import { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import { CvDownloadSchema } from '@/lib/security/validation';
import { insertCvDownload, insertAnalyticsEvent } from '@/lib/supabase/server';
import { getClientIp } from '@/lib/security/rate-limit';

const CV_PATH = path.join(process.cwd(), 'public', 'Grace-Isitua-CV.pdf');
const CV_FILENAME = 'Grace-Isitua-CV.pdf';

function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// GET — serve the CV file
export async function GET(req: NextRequest) {
  const ip = getClientIp(req);

  // Check if CV file exists
  if (!fs.existsSync(CV_PATH)) {
    return new Response(
      JSON.stringify({
        error: 'CV is not currently available for download. Please contact Grace directly at graceantony202@gmail.com',
        code: 'cv_unavailable',
      }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Track download event (fire and forget)
  insertAnalyticsEvent({
    event: 'cv_downloaded',
    metadata: { ip_hash: hashIp(ip) },
  }).catch(() => {});

  // Read and serve the file
  const fileBuffer = fs.readFileSync(CV_PATH);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${CV_FILENAME}"`,
      'Content-Length': String(fileBuffer.length),
      'Cache-Control': 'no-cache, no-store',
    },
  });
}

// POST — log a CV download with optional visitor contact info
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    // Body is optional for CV requests
  }

  const parsed = CvDownloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request', code: 'validation_error' }, { status: 400 });
  }

  const { name, email, conversationId } = parsed.data;

  // Store in Supabase (non-blocking)
  insertCvDownload({
    name: name ?? null,
    email: email ?? null,
    conversation_id: conversationId ?? null,
    ip_hash: hashIp(ip),
  }).catch(() => {});

  // Track analytics (fire and forget)
  insertAnalyticsEvent({
    event: 'cv_requested',
    conversation_id: conversationId ?? null,
    metadata: { ip_hash: hashIp(ip), provided_email: !!email },
  }).catch(() => {});

  // Check if CV is available
  const cvAvailable = fs.existsSync(CV_PATH);

  return Response.json({
    success: true,
    downloadUrl: cvAvailable ? '/api/cv' : null,
    cvAvailable,
    message: cvAvailable
      ? "Grace's CV is ready for download."
      : "Grace's CV is not available for direct download at the moment. You can reach her at graceantony202@gmail.com to request it.",
  });
}
