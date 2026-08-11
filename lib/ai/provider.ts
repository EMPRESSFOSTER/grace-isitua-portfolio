// lib/ai/provider.ts
// Factory for obtaining an AI provider instance — server-side only

import type { AIProvider } from './types';
import { OpenRouterProvider } from './openrouter';

let providerInstance: AIProvider | null = null;

/**
 * Get the configured AI provider.
 * Currently returns OpenRouterProvider.
 * To switch providers in the future, change this function only.
 */
export function getAIProvider(): AIProvider {
  if (!providerInstance) {
    providerInstance = new OpenRouterProvider();
  }
  return providerInstance;
}
