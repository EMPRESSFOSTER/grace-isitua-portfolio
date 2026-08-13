-- supabase/migrations/001_fix_leads_table.sql
-- ─────────────────────────────────────────────────────────
-- Migration: Fix leads table for Grace AI lead-gen upgrade
-- Run this in Supabase SQL Editor if your database already
-- has a "leads" table from an earlier schema version.
-- Safe to run multiple times (uses ADD COLUMN IF NOT EXISTS).
-- ─────────────────────────────────────────────────────────

-- 1. Make email nullable (supports phone-only leads)
ALTER TABLE public.leads ALTER COLUMN email DROP NOT NULL;

-- 2. Add project_type column (e.g. E-commerce, Landing Page)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS project_type text;

-- 3. Add features column (comma-separated requested features)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS features text;

-- Verify result — should show all columns with correct nullability:
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'leads'
ORDER BY ordinal_position;