// lib/supabase/server.ts
// Server-side Supabase client — uses the service role key
// NEVER import this in client components or pass it to the browser

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

let _serverClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServer() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }
  if (!_serverClient) {
    _serverClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _serverClient;
}

// Typed helpers for common operations

export async function insertLead(data: Record<string, unknown>): Promise<{ data: { id: string } | null; error: unknown }> {
  const client = getSupabaseServer();
  if (!client) {
    console.warn('[Grace AI] Supabase not configured — lead not stored');
    return { data: null, error: new Error('Supabase not configured') };
  }
  const res = await client.from('leads').insert(data as any).select('id').single();
  return { data: res.data as { id: string } | null, error: res.error };
}

export async function insertCvDownload(data: Record<string, unknown>): Promise<{ data: { id: string } | null; error: unknown }> {
  const client = getSupabaseServer();
  if (!client) return { data: null, error: new Error('Supabase not configured') };
  const res = await client.from('cv_downloads').insert(data as any).select('id').single();
  return { data: res.data as { id: string } | null, error: res.error };
}

export async function insertAnalyticsEvent(data: Record<string, unknown>): Promise<{ error: unknown }> {
  const client = getSupabaseServer();
  if (!client) return { error: new Error('Supabase not configured') };
  const res = await client.from('analytics_events').insert(data as any);
  return { error: res.error };
}

export async function insertQuoteRequest(data: Record<string, unknown>): Promise<{ data: { id: string } | null; error: unknown }> {
  const client = getSupabaseServer();
  if (!client) return { data: null, error: new Error('Supabase not configured') };
  const res = await client.from('quote_requests').insert(data as any).select('id').single();
  return { data: res.data as { id: string } | null, error: res.error };
}

export async function getAdminStats() {
  const client = getSupabaseServer();
  if (!client) return null;

  try {
    const [leadsResult, cvResult, analyticsResult, quotesResult] = await Promise.all([
      client.from('leads').select('id, name, email, service, status, created_at').order('created_at', { ascending: false }).limit(10),
      client.from('cv_downloads').select('id, created_at').order('created_at', { ascending: false }),
      client.from('analytics_events').select('event').eq('event', 'chat_started'),
      client.from('quote_requests').select('id, name, email, project_type, status, created_at').order('created_at', { ascending: false }).limit(10),
    ]);

    return {
      recentLeads: (leadsResult.data || []) as Array<{ id: string; name: string; email: string; service: string | null; status: string; created_at: string }>,
      totalCvDownloads: cvResult.data?.length || 0,
      totalChats: analyticsResult.data?.length || 0,
      recentQuotes: (quotesResult.data || []) as Array<{ id: string; name: string; email: string; project_type: string; status: string; created_at: string }>,
    };
  } catch (err) {
    console.error('[Grace AI] getAdminStats error:', err);
    return null;
  }
}
