-- supabase/schema.sql
-- Grace AI — Supabase Database Schema with Row Level Security
-- Run this in your Supabase SQL Editor

-- ─────────────────────────────────────────────────────────
-- 1. Leads Table
-- ─────────────────────────────────────────────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  service text,
  project_description text,
  budget text,
  timeline text,
  source text not null default 'ai_assistant',
  conversation_id uuid,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now()
);

-- Index for efficient status-based queries in admin dashboard
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ─────────────────────────────────────────────────────────
-- 2. CV Downloads Table
-- ─────────────────────────────────────────────────────────
create table if not exists public.cv_downloads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  conversation_id uuid,
  ip_hash text, -- hashed IP for analytics, not raw IP
  created_at timestamptz not null default now()
);

create index if not exists cv_downloads_created_at_idx on public.cv_downloads (created_at desc);

-- ─────────────────────────────────────────────────────────
-- 3. Chat Sessions Table
-- ─────────────────────────────────────────────────────────
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  message_count int not null default 0
);

-- ─────────────────────────────────────────────────────────
-- 4. Analytics Events Table
-- ─────────────────────────────────────────────────────────
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  conversation_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_event_idx on public.analytics_events (event);
create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);

-- ─────────────────────────────────────────────────────────
-- 5. Quote Requests Table
-- ─────────────────────────────────────────────────────────
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text not null,
  pages text,
  features text,
  timeline text,
  budget text,
  description text,
  conversation_id uuid,
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'quoted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);

-- ─────────────────────────────────────────────────────────
-- 6. Row Level Security Policies
-- ─────────────────────────────────────────────────────────

-- Enable RLS on all tables
alter table public.leads enable row level security;
alter table public.cv_downloads enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.analytics_events enable row level security;
alter table public.quote_requests enable row level security;

-- ── Leads: visitors can INSERT only, cannot read or update ──
create policy "leads_insert_public"
  on public.leads
  for insert
  to anon
  with check (true);

-- Service role (used by server API) can read all leads
create policy "leads_select_service_role"
  on public.leads
  for select
  to service_role
  using (true);

create policy "leads_update_service_role"
  on public.leads
  for update
  to service_role
  using (true);

-- ── CV Downloads: visitors can INSERT only ──
create policy "cv_downloads_insert_public"
  on public.cv_downloads
  for insert
  to anon
  with check (true);

create policy "cv_downloads_select_service_role"
  on public.cv_downloads
  for select
  to service_role
  using (true);

-- ── Chat Sessions: visitors can INSERT and UPDATE their own session ──
create policy "chat_sessions_insert_public"
  on public.chat_sessions
  for insert
  to anon
  with check (true);

create policy "chat_sessions_update_service_role"
  on public.chat_sessions
  for update
  to service_role
  using (true);

create policy "chat_sessions_select_service_role"
  on public.chat_sessions
  for select
  to service_role
  using (true);

-- ── Analytics Events: visitors can INSERT only ──
create policy "analytics_insert_public"
  on public.analytics_events
  for insert
  to anon
  with check (true);

create policy "analytics_select_service_role"
  on public.analytics_events
  for select
  to service_role
  using (true);

-- ── Quote Requests: visitors can INSERT only ──
create policy "quote_requests_insert_public"
  on public.quote_requests
  for insert
  to anon
  with check (true);

create policy "quote_requests_select_service_role"
  on public.quote_requests
  for select
  to service_role
  using (true);
