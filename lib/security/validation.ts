// lib/security/validation.ts
// Zod schemas for validating all API input — server-side

import { z } from 'zod';

// ─── Chat Message ──────────────────────────────────────────────────────────────

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().max(4000),
});

export const ChatRequestSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message is too long — please keep it under 2000 characters'),
  conversationId: z.string().uuid().optional(),
  history: z.array(ChatMessageSchema).max(20).optional().default([]),
});

export type ValidatedChatRequest = z.infer<typeof ChatRequestSchema>;

// ─── Lead Submission ───────────────────────────────────────────────────────────

export const LeadSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter your full name')
    .max(100)
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(200)
    .toLowerCase()
    .trim()
    .optional(),
  company: z.string().max(200).trim().optional(),
  phone: z.string().max(50).trim().optional(),
  service: z.string().max(200).trim().optional(),
  project_type: z.string().max(200).trim().optional(),
  projectDescription: z
    .string()
    .max(3000, 'Project description is too long')
    .trim()
    .optional(),
  features: z.string().max(1000).trim().optional(),
  budget: z.string().max(200).trim().optional(),
  timeline: z.string().max(200).trim().optional(),
  source: z
    .enum(['ai_assistant', 'contact_form', 'cv_download', 'direct'])
    .default('ai_assistant'),
  conversationId: z.string().uuid().optional(),
}).refine(
  (data) => data.email || data.phone,
  { message: 'Please provide either an email address or phone/WhatsApp number' }
);

export type ValidatedLead = z.infer<typeof LeadSchema>;

// ─── Quote Request ─────────────────────────────────────────────────────────────

export const QuoteSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).toLowerCase().trim(),
  projectType: z.enum([
    'Business website',
    'E-commerce',
    'Landing page',
    'Web application',
    'Website redesign',
    'Brand identity',
    'Other',
  ]),
  pages: z.string().max(50).optional(),
  features: z.string().max(1000).trim().optional(),
  timeline: z.string().max(100).trim().optional(),
  budget: z.string().max(100).trim().optional(),
  description: z.string().max(2000).trim().optional(),
  conversationId: z.string().uuid().optional(),
});

export type ValidatedQuote = z.infer<typeof QuoteSchema>;

// ─── Analytics Event ───────────────────────────────────────────────────────────

export const AnalyticsEventSchema = z.object({
  event: z.enum([
    'chat_started',
    'message_sent',
    'cv_requested',
    'cv_downloaded',
    'lead_started',
    'lead_submitted',
    'quote_requested',
    'booking_clicked',
    'project_clicked',
    'contact_clicked',
  ]),
  conversationId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type ValidatedAnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;

// ─── CV Download ───────────────────────────────────────────────────────────────

export const CvDownloadSchema = z.object({
  name: z.string().max(100).trim().optional(),
  email: z.string().email().max(200).toLowerCase().trim().optional(),
  conversationId: z.string().uuid().optional(),
});

export type ValidatedCvDownload = z.infer<typeof CvDownloadSchema>;

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Sanitize a string to prevent XSS — strip HTML tags and trim whitespace.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/javascript:/gi, '') // strip JS protocol
    .trim();
}
