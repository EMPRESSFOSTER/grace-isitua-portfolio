// lib/email.ts
// Resend email notification dispatcher — server-side only

import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'graceantony202@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Grace AI <noreply@grace-isitua.com>';

function getResend(): Resend | null {
  if (!RESEND_API_KEY) {
    console.warn('[Grace AI] RESEND_API_KEY not set — emails will not be sent');
    return null;
  }
  return new Resend(RESEND_API_KEY);
}

// ─── Lead Notification Email ───────────────────────────────────────────────────

export interface LeadEmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  projectDescription?: string;
  budget?: string;
  timeline?: string;
  source: string;
  createdAt: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Portfolio Lead</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 32px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 16px; padding: 32px;">
    
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
      <div style="background: linear-gradient(135deg, #7c3aed, #db2777); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">⚡</div>
      <div>
        <div style="font-size: 12px; color: #7c3aed; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Grace AI</div>
        <h1 style="font-size: 20px; font-weight: bold; color: #fff; margin: 4px 0 0 0;">New Portfolio Lead</h1>
      </div>
    </div>

    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 130px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${lead.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #a78bfa;">${lead.email}</a></td></tr>
        ${lead.company ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.company}</td></tr>` : ''}
        ${lead.phone ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.phone}</td></tr>` : ''}
        ${lead.service ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.service}</td></tr>` : ''}
        ${lead.budget ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Budget</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.budget}</td></tr>` : ''}
        ${lead.timeline ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Timeline</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.timeline}</td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Source</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.source}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Received</td><td style="padding: 8px 0; color: #e5e5e5;">${lead.createdAt}</td></tr>
      </table>
    </div>

    ${lead.projectDescription ? `
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <div style="color: #888; font-size: 13px; margin-bottom: 8px;">Project Description</div>
      <p style="color: #e5e5e5; margin: 0; line-height: 1.6;">${lead.projectDescription}</p>
    </div>
    ` : ''}

    <a href="mailto:${lead.email}?subject=Re: Your project inquiry&body=Hi ${lead.name},%0A%0AThank you for reaching out!%0A%0A"
       style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #db2777); color: #fff; font-weight: bold; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px;">
      Reply to ${lead.name}
    </a>

    <p style="color: #555; font-size: 12px; margin-top: 32px;">Sent by Grace AI Portfolio Assistant</p>
  </div>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `🎯 New Lead: ${lead.name}${lead.company ? ` from ${lead.company}` : ''}`,
      html,
    });

    if (error) {
      console.error('[Grace AI] Failed to send lead email:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Grace AI] Email send error:', err);
    return false;
  }
}

// ─── Quote Request Email ───────────────────────────────────────────────────────

export interface QuoteEmailData {
  name: string;
  email: string;
  projectType: string;
  pages?: string;
  features?: string;
  timeline?: string;
  budget?: string;
  description?: string;
  createdAt: string;
}

export async function sendQuoteNotification(quote: QuoteEmailData): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Quote Request</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 32px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 16px; padding: 32px;">
    
    <div style="margin-bottom: 32px;">
      <div style="font-size: 12px; color: #f59e0b; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Grace AI</div>
      <h1 style="font-size: 20px; font-weight: bold; color: #fff; margin: 4px 0 0 0;">New Quote Request — ${quote.projectType}</h1>
    </div>

    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 130px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${quote.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${quote.email}" style="color: #a78bfa;">${quote.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Project Type</td><td style="padding: 8px 0; color: #fbbf24;">${quote.projectType}</td></tr>
        ${quote.pages ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Pages</td><td style="padding: 8px 0; color: #e5e5e5;">${quote.pages}</td></tr>` : ''}
        ${quote.timeline ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Timeline</td><td style="padding: 8px 0; color: #e5e5e5;">${quote.timeline}</td></tr>` : ''}
        ${quote.budget ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Budget</td><td style="padding: 8px 0; color: #e5e5e5;">${quote.budget}</td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Received</td><td style="padding: 8px 0; color: #e5e5e5;">${quote.createdAt}</td></tr>
      </table>
    </div>

    ${quote.features ? `<div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 16px;"><div style="color: #888; font-size: 13px; margin-bottom: 8px;">Required Features</div><p style="color: #e5e5e5; margin: 0; line-height: 1.6;">${quote.features}</p></div>` : ''}
    ${quote.description ? `<div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;"><div style="color: #888; font-size: 13px; margin-bottom: 8px;">Project Description</div><p style="color: #e5e5e5; margin: 0; line-height: 1.6;">${quote.description}</p></div>` : ''}

    <a href="mailto:${quote.email}?subject=Your project quote&body=Hi ${quote.name},%0A%0AThank you for your quote request!%0A%0A"
       style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff; font-weight: bold; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px;">
      Reply with Quote
    </a>

    <p style="color: #555; font-size: 12px; margin-top: 32px;">Sent by Grace AI Portfolio Assistant</p>
  </div>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `💰 New Quote Request: ${quote.projectType} — ${quote.name}`,
      html,
    });

    if (error) {
      console.error('[Grace AI] Failed to send quote email:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Grace AI] Quote email error:', err);
    return false;
  }
}
