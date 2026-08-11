// lib/ai/types.ts
// Provider-agnostic interfaces for Grace AI

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProvider {
  /** Generate a chat response from an array of messages */
  chat(request: ChatRequest): Promise<ChatResponse>;

  /** Generate a streaming chat response (returns ReadableStream of text chunks) */
  chatStream(request: ChatRequest): Promise<ReadableStream<Uint8Array>>;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface RetrievalResult {
  documents: KnowledgeDocument[];
  query: string;
}
