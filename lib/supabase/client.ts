// lib/supabase/client.ts
// Browser-side Supabase client — uses the publishable (anon) key only
// Only allows INSERT on tables where RLS permits anon inserts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // Warn in development but don't crash — Supabase features will be disabled
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '[Grace AI] Supabase environment variables not set. Analytics and lead tracking will be disabled.'
    );
  }
}

export const supabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
