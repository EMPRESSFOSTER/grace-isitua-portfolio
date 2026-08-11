# ⚡ Grace AI — Production Setup & Maintenance Guide

Grace AI is a modular, production-ready AI portfolio assistant built with Next.js, OpenRouter, Supabase, Resend, and Tailwind CSS.

---

## 📋 Table of Contents

1. [OpenRouter Account & API Key](#1-openrouter-account--api-key)
2. [Supabase Setup & Database Schema](#2-supabase-setup--database-schema)
3. [Resend Setup for Email Notifications](#3-resend-setup-for-email-notifications)
4. [Environment Variables Reference](#4-environment-variables-reference)
5. [Local Development](#5-local-development)
6. [Netlify Deployment Configuration](#6-netlify-deployment-configuration)
7. [Updating Grace's Knowledge Base](#7-updating-graces-knowledge-base)
8. [Changing the AI Model or Provider](#8-changing-the-ai-model-or-provider)
9. [Admin Dashboard Access](#9-admin-dashboard-access)
10. [Troubleshooting & Support](#10-troubleshooting--support)

---

## 1. OpenRouter Account & API Key

1. Sign up for a free account at [OpenRouter.ai](https://openrouter.ai/).
2. Navigate to **Keys** and create a new secret key named `Grace AI Portfolio`.
3. Copy the secret key (it starts with `sk-or-v1-`).
4. Set `OPENROUTER_API_KEY` in your `.env.local` or Netlify deployment settings.

> 🔒 **Security Notice**: Never expose `OPENROUTER_API_KEY` in client components or prefix it with `NEXT_PUBLIC_`. All OpenRouter calls route strictly through server-side Next.js route handlers (`/api/ai/chat`).

---

## 2. Supabase Setup & Database Schema

1. Create a project on [Supabase](https://supabase.com/).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Copy the full contents of [`supabase/schema.sql`](file:///c:/Users/grace/grace-isitua/supabase/schema.sql) and execute it.
4. Go to **Project Settings → API** and obtain:
   - **URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **Anon / Publishable Key** (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
   - **Service Role Key** (`SUPABASE_SERVICE_ROLE_KEY`)

The schema configures tables for `leads`, `quote_requests`, `cv_downloads`, `chat_sessions`, and `analytics_events` with **Row Level Security (RLS)** to protect visitor data.

---

## 3. Resend Setup for Email Notifications

1. Create an account on [Resend.com](https://resend.com/).
2. Add your domain (e.g., `grace-isitua.com`) and verify DNS records, or use Resend's onboarding domain for testing.
3. Create an API key under **API Keys**.
4. Set the environment variables:
   - `RESEND_API_KEY=re_xxx`
   - `CONTACT_EMAIL=graceantony202@gmail.com`
   - `FROM_EMAIL=Grace AI <noreply@grace-isitua.com>`

---

## 4. Environment Variables Reference

Create a `.env.local` file in your root workspace:

```env
# OpenRouter AI
OPENROUTER_API_KEY=sk-or-v1-your-key
OPENROUTER_MODEL=openrouter/free
NEXT_PUBLIC_SITE_URL=https://grace-isitua.netlify.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Resend Emails
RESEND_API_KEY=re_xxxx
CONTACT_EMAIL=graceantony202@gmail.com
FROM_EMAIL=Grace AI <noreply@grace-isitua.com>

# Admin Passcode
NEXT_PUBLIC_ADMIN_PASSWORD=grace2026
```

---

## 5. Local Development

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Look for the floating **Grace AI** widget in the bottom-right corner.

---

## 6. Netlify Deployment Configuration

1. In Netlify Dashboard, navigate to **Site Settings → Environment Variables**.
2. Add all variables listed in section 4.
3. Ensure the build command is `npm run build` and output directory is `.next`.
4. Deploy the site. All Netlify Serverless Functions / Next.js API endpoints (`/api/ai/chat`, `/api/leads`, `/api/cv`, `/api/quotes`) will function automatically.

---

## 7. Updating Grace's Knowledge Base

All facts answered by Grace AI are stored in Markdown files inside the [`knowledge/`](file:///c:/Users/grace/grace-isitua/knowledge) directory:

- `about.md` — Personal background & bio
- `services.md` — Services offered & process
- `experience.md` — Work history & roles
- `skills.md` — Technologies & tools
- `projects.md` — Case studies & portfolio projects
- `pricing.md` — Pricing guidance & estimates
- `faq.md` — Frequently Asked Questions
- `contact.md` — Verified contact channels
- `cv.md` — CV overview

To update Grace's information, edit the relevant Markdown file and redeploy. The retrieval system will automatically read updated content without code modifications.

---

## 8. Changing the AI Model or Provider

### To change OpenRouter model:
Update `OPENROUTER_MODEL` in `.env.local` or Netlify environment variables:
- `openrouter/free` (default free tier router)
- `openai/gpt-4o-mini`
- `anthropic/claude-3-haiku`
- `google/gemini-flash-1.5`

### To switch AI provider entirely:
The AI layer uses a provider pattern. To add OpenAI or Gemini directly:
1. Create a new provider class in `lib/ai/` implementing `AIProvider` (from `lib/ai/types.ts`).
2. Update `getAIProvider()` in [`lib/ai/provider.ts`](file:///c:/Users/grace/grace-isitua/lib/ai/provider.ts).

---

## 9. Admin Dashboard Access

Navigate to [/admin](file:///c:/Users/grace/grace-isitua/app/admin/page.tsx) on your site.

Enter the passcode (default: `grace2026` or configured via `NEXT_PUBLIC_ADMIN_PASSWORD`).

Features:
- View total chats & CV downloads
- Table of captured leads with email contact links
- Table of project quote requests with requirements
- Real-time refresh button

---

## 10. Troubleshooting & Support

| Symptom | Cause | Solution |
| --- | --- | --- |
| Assistant returns friendly error message | `OPENROUTER_API_KEY` missing or OpenRouter free model rate limited | Check terminal/server logs. Verify `OPENROUTER_API_KEY` is set. |
| Leads submit but email not received | `RESEND_API_KEY` not configured or domain unverified | Check server logs (`[Grace AI] Lead email failed`). Lead data is still saved safely in Supabase. |
| Admin dashboard shows 0 leads | Supabase keys not set or schema not applied | Execute `supabase/schema.sql` in Supabase SQL editor. |
| CV button shows error | `public/Grace-Isitua-CV.pdf` missing | Ensure `public/Grace-Isitua-CV.pdf` exists. |
