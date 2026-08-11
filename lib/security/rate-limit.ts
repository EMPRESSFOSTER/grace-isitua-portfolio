// lib/security/rate-limit.ts
// In-memory rate limiter for API routes (no external dependency)
// Uses a sliding window approach per IP address

interface RateLimitRecord {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitRecord>();

// Cleanup old entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now - record.windowStart > CLEANUP_INTERVAL_MS) {
      store.delete(key);
    }
  }
}, CLEANUP_INTERVAL_MS);

export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAfterMs: number;
}

const AI_CHAT_LIMIT: RateLimitConfig = {
  maxRequests: 20,
  windowMs: 60 * 1000, // 20 requests per minute per IP
};

const LEAD_SUBMIT_LIMIT: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 5 lead submissions per hour per IP
};

const ANALYTICS_LIMIT: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 60 * 1000, // 100 analytics events per minute
};

export function checkRateLimit(
  ip: string,
  type: 'chat' | 'leads' | 'analytics',
): RateLimitResult {
  const config =
    type === 'chat'
      ? AI_CHAT_LIMIT
      : type === 'leads'
      ? LEAD_SUBMIT_LIMIT
      : ANALYTICS_LIMIT;

  const key = `${type}:${ip}`;
  const now = Date.now();
  const record = store.get(key);

  if (!record || now - record.windowStart >= config.windowMs) {
    // New window
    store.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAfterMs: config.windowMs,
    };
  }

  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAfterMs: config.windowMs - (now - record.windowStart),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetAfterMs: config.windowMs - (now - record.windowStart),
  };
}

/**
 * Extract client IP from a Next.js Request object.
 * Falls back to 'unknown' if IP cannot be determined.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}
