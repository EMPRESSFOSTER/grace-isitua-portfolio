// lib/ai/retrieval.ts
// Lightweight keyword-based document retrieval for Grace AI knowledge base
// Reads Markdown files from the knowledge/ directory at runtime (server-side)

import fs from 'fs';
import path from 'path';
import type { KnowledgeDocument, RetrievalResult } from './types';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');

// Document keyword mappings for fast retrieval
// Order matters: more specific topics should appear before generic ones
const DOCUMENT_KEYWORDS: Record<string, string[]> = {
  'lead-workflow': [
    'hire', 'need a website', 'want to work', 'i need', 'build me', 'build a', 'build my',
    'restaurant website', 'fashion website', 'business website', 'e-commerce website', 'ecommerce website',
    'i want to hire', 'want to start a project', 'start a project', 'request a quote', 'get a quote',
    'how do i hire', 'work with grace', 'work together', 'commission', 'project inquiry',
    'need a developer', 'need a designer', 'need someone to build',
  ],
  'cv': ['cv', 'resume', 'curriculum', 'download', 'pdf', 'download grace'],
  'about': ['who', 'about', 'grace', 'background', 'story', 'bio', 'herself', 'professional', 'identity', 'entrepreneur', 'creative'],
  'services': ['services', 'service', 'offer', 'do', 'help', 'build', 'design', 'frontend', 'ui', 'ux', 'performance', 'education', 'mentor', 'brand', 'graphic'],
  'experience': ['experience', 'work', 'job', 'company', 'role', 'career', 'history', 'digital abode', 'brand spark', 'freelance', 'years', 'ruthenbud', 'hotel arex', 'shoppadi experience', 'genis'],
  'skills': ['skills', 'tech', 'technologies', 'stack', 'languages', 'tools', 'react', 'next', 'typescript', 'tailwind', 'figma', 'node', 'python', 'sql', 'vue', 'redux', 'zustand', 'framer', 'shadcn', 'jest', 'playwright', 'git', 'supabase', 'firebase'],
  'projects': ['project', 'portfolio', 'work', 'shoppadi', 'sunbridge', 'wishs', 'biokeft', 'emcoders', 'hamilton', 'special dishes', 'code realm', 'hotel arex', 'ellabell', 'genis', 'ecommerce', 'real estate', 'food', 'catalogue', 'case study', 'live', 'built', 'freelance project'],
  'pricing': ['price', 'pricing', 'cost', 'charge', 'rate', 'fee', 'quote', 'budget', 'how much', 'affordable', 'expensive', 'payment', 'invoice', 'naira', '₦', 'dollar', '$'],
  'faq': ['faq', 'question', 'frequently', 'international', 'remote', 'available', 'hire', 'wordpress', 'backend', 'mobile', 'hosting', 'maintenance', 'seo', 'deposit'],
  'contact': ['contact', 'reach', 'email', 'whatsapp', 'phone', 'linkedin', 'twitter', 'instagram', 'social', 'message', 'call'],
};

let documentsCache: KnowledgeDocument[] | null = null;

function loadDocuments(): KnowledgeDocument[] {
  if (documentsCache) return documentsCache;

  const docs: KnowledgeDocument[] = [];

  try {
    for (const [name, keywords] of Object.entries(DOCUMENT_KEYWORDS)) {
      const filePath = path.join(KNOWLEDGE_DIR, `${name}.md`);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        docs.push({
          id: name,
          title: name.charAt(0).toUpperCase() + name.slice(1),
          content,
          keywords,
        });
      } catch {
        // Single document not found or unreadable — skip silently
      }
    }
  } catch (err) {
    console.error('[Grace AI] Knowledge retrieval error loading directory:', err instanceof Error ? err.message : String(err));
  }

  documentsCache = docs;
  return docs;
}

function scoreDocument(doc: KnowledgeDocument, query: string): number {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);
  let score = 0;

  for (const keyword of doc.keywords) {
    if (queryLower.includes(keyword)) {
      score += 2;
    }
  }

  for (const word of words) {
    if (word.length > 3 && doc.content.toLowerCase().includes(word)) {
      score += 1;
    }
  }

  return score;
}

/**
 * Retrieve the most relevant knowledge documents for a given query.
 * Returns up to maxDocs documents that scored above the threshold.
 */
export function retrieveRelevantDocs(query: string, maxDocs = 3): RetrievalResult {
  try {
    const documents = loadDocuments();

    const scored = documents
      .map((doc) => ({ doc, score: scoreDocument(doc, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxDocs)
      .map(({ doc }) => doc);

    // If nothing matched, return a fallback set (about + services + contact)
    if (scored.length === 0) {
      const fallback = documents.filter((d) => ['about', 'services', 'contact'].includes(d.id));
      return { documents: fallback, query };
    }

    return { documents: scored, query };
  } catch (err) {
    console.error('[Grace AI] Knowledge retrieval error:', err instanceof Error ? err.message : String(err));
    return { documents: [], query };
  }
}

/**
 * Build a context string from retrieved documents to inject into the system prompt.
 * Retrieves more documents for commercial/lead intent queries.
 */
export function buildKnowledgeContext(query: string): string {
  try {
    // Detect lead/commercial intent to fetch more context
    const queryLower = query.toLowerCase();
    const isLeadIntent = [
      'i need', 'i want', 'hire', 'build me', 'build a', 'build my', 'website',
      'need a website', 'need a developer', 'need a designer', 'need someone',
      'how much', 'price', 'cost', 'quote', 'budget', 'start a project',
    ].some(kw => queryLower.includes(kw));

    const maxDocs = isLeadIntent ? 5 : 3;
    const { documents } = retrieveRelevantDocs(query, maxDocs);

    if (documents.length === 0) {
      return 'No specific knowledge document matched. Use Grace\'s general professional information to respond.';
    }

    return documents
      .map((doc) => `### ${doc.title}\n\n${doc.content}`)
      .join('\n\n---\n\n');
  } catch (err) {
    console.error('[Grace AI] Knowledge retrieval error:', err instanceof Error ? err.message : String(err));
    return 'Grace Isitua is a Frontend Engineer and Digital Creative based in Nigeria specializing in React, Next.js, TypeScript, and UI/UX design.';
  }
}

/**
 * Build a full context from all documents (used for general greetings / welcome).
 */
export function buildFullContext(): string {
  try {
    const documents = loadDocuments();
    return documents
      .map((doc) => `### ${doc.title}\n\n${doc.content}`)
      .join('\n\n---\n\n');
  } catch {
    return 'Grace Isitua is a Frontend Engineer and Digital Creative based in Nigeria.';
  }
}

/** Invalidate the document cache (useful after hot reloads in dev) */
export function clearDocumentCache(): void {
  documentsCache = null;
}
