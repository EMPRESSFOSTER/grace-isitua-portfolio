'use client';

// components/ai/ChatWindow.tsx
// The main chat interface — handles message display, input, streaming, and lead flow

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Trash2, RotateCcw, Copy, Check, Download, Loader2 } from 'lucide-react';
import { QuickActions } from './QuickActions';
function generateId(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now().toString(36);
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  isError?: boolean;
}

interface ChatWindowProps {
  onClose: () => void;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! 👋 I'm Grace AI, Grace's virtual portfolio assistant.\n\nI can help you learn about Grace's services, experience, projects, and skills. I can also help you request her CV or start a project.\n\nWhat would you like to know?",
  timestamp: new Date(),
};

const MAX_MESSAGE_LENGTH = 2000;

function trackEvent(event: string, conversationId?: string) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, conversationId }),
  }).catch(() => {});
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => generateId());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    trackEvent('chat_started', conversationId);
    inputRef.current?.focus();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getHistory = useCallback(() => {
    return messages
      .filter((m) => m.id !== 'welcome' && !m.isError && m.content.trim().length > 0)
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));
  }, [messages]);

  const handlePotentialLeadSubmission = useCallback(async (content: string) => {
    const match = content.match(/\[SUBMIT_LEAD:\s*(\{[\s\S]*?\})\s*\]/);
    if (!match) return content;

    const jsonStr = match[1];
    const cleanedContent = content.replace(/\[SUBMIT_LEAD:\s*\{[\s\S]*?\}\s*\]/g, '').trim();

    try {
      const leadData = JSON.parse(jsonStr);
      
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          conversationId,
          source: 'ai_assistant',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('[Grace AI] Failed to submit lead:', errData.error || res.statusText);
      } else {
        console.log('[Grace AI] Lead submitted successfully!');
        trackEvent('lead_submitted', conversationId);
      }
    } catch (err) {
      console.error('[Grace AI] Error parsing lead JSON or submitting lead:', err);
    }

    return cleanedContent;
  }, [conversationId]);

  const sendMessage = useCallback(
    async (messageText: string) => {
      const text = messageText.trim();
      if (!text || isLoading) return;

      setShowQuickActions(false);

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      };

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInput('');
      setIsLoading(true);

      trackEvent('message_sent', conversationId);

      // Cancel any in-flight request
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversationId,
            history: getHistory(),
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg =
            errorData?.error ||
            "Sorry, I'm having trouble connecting right now. Please use the contact options below.";

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: errorMsg, isStreaming: false, isError: true }
                : m
            )
          );
          return;
        }

        // Handle JSON response (non-streaming diagnostic mode)
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('application/json')) {
          const jsonData = await response.json();
          const rawContent = jsonData.content || jsonData.message || '';
          const cleanedContent = await handlePotentialLeadSubmission(rawContent);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: cleanedContent, isStreaming: false }
                : m
            )
          );
          return;
        }

        // Stream the response
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          // Strip the tag from display while streaming
          let displayContent = accumulated;
          const tagIndex = displayContent.indexOf('[SUBMIT_LEAD:');
          if (tagIndex !== -1) {
            displayContent = displayContent.substring(0, tagIndex).trim();
          }

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: displayContent, isStreaming: true }
                : m
            )
          );
        }

        // Mark streaming complete
        const cleanedContent = await handlePotentialLeadSubmission(accumulated);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: cleanedContent, isStreaming: false }
              : m
          )
        );

        // Check if this looks like a CV response — offer download
        if (
          accumulated.toLowerCase().includes('cv') &&
          accumulated.toLowerCase().includes('download')
        ) {
          trackEvent('cv_requested', conversationId);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content:
                    "Sorry, I'm having trouble connecting right now. Please use the contact options below and Grace will get back to you.",
                  isStreaming: false,
                  isError: true,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [isLoading, conversationId, getHistory]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleClear = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowQuickActions(true);
    inputRef.current?.focus();
  };

  const handleCvDownload = async () => {
    trackEvent('cv_downloaded', conversationId);
    window.open('/api/cv', '_blank');
  };

  const parseInlineElements = (text: string) => {
    // Regex to match bold, markdown links, or bare urls
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|https?:\/\/[^\s]+)/g;
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline font-medium transition-colors"
          >
            {linkText}
          </a>
        );
      }

      if (part.startsWith('http://') || part.startsWith('https://')) {
        const cleanUrl = part.replace(/[.,;:!]$/, '');
        return (
          <a
            key={index}
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline font-medium transition-colors"
          >
            {cleanUrl}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Unordered list item: starts with "- " or "* "
      const isUnorderedList = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      // Ordered list item: starts with "1. ", "2. ", etc.
      const isOrderedList = /^\d+\.\s/.test(line.trim());

      if (isUnorderedList) {
        const cleanLine = line.trim().slice(2);
        return (
          <div key={i} className="flex items-start gap-2 ml-4 my-1.5">
            <span className="text-purple-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-gray-200 leading-relaxed flex-1">
              {parseInlineElements(cleanLine)}
            </span>
          </div>
        );
      }

      if (isOrderedList) {
        const match = line.trim().match(/^(\d+)\.\s(.*)/);
        if (match) {
          const [, num, cleanLine] = match;
          return (
            <div key={i} className="flex items-start gap-2 ml-4 my-1.5">
              <span className="text-purple-400 font-semibold flex-shrink-0 w-5 text-right">{num}.</span>
              <span className="text-gray-200 leading-relaxed flex-1">
                {parseInlineElements(cleanLine)}
              </span>
            </div>
          );
        }
      }

      return (
        <p key={i} className="text-gray-200 leading-relaxed min-h-[1rem]">
          {parseInlineElements(line)}
        </p>
      );
    });
  };

  return (
    <div
      className="flex flex-col w-full h-full bg-black/95 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
      role="dialog"
      aria-label="Grace AI Chat Assistant"
      aria-modal="true"
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-r from-purple-950/40 to-pink-950/20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
              G
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-black" aria-hidden="true" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">Grace AI</div>
            <div className="text-green-400 text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Online
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Messages ─────────────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
          >
            {message.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs mr-2 flex-shrink-0 mt-1">
                G
              </div>
            )}

            <div className={`max-w-[82%] ${message.role === 'user' ? 'max-w-[75%]' : ''}`}>
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-sm'
                    : message.isError
                    ? 'bg-red-900/20 border border-red-500/20 text-red-200 rounded-bl-sm'
                    : 'bg-white/[0.06] border border-white/[0.08] text-gray-200 rounded-bl-sm'
                }`}
              >
                {message.isStreaming && message.content === '' ? (
                  <div className="flex gap-1 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap break-words">
                    {renderContent(message.content)}
                    {message.isStreaming && (
                      <span className="inline-block w-0.5 h-4 bg-purple-400 animate-pulse ml-0.5 align-middle" />
                    )}
                  </div>
                )}
              </div>

              {/* CV Download CTA */}
              {message.role === 'assistant' &&
                !message.isStreaming &&
                message.content.toLowerCase().includes('download') &&
                message.content.toLowerCase().includes('cv') && (
                  <button
                    onClick={handleCvDownload}
                    className="mt-2 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 transition-all"
                  >
                    <Download className="w-3 h-3" />
                    Download CV
                  </button>
                )}

              {/* Message actions */}
              {message.role === 'assistant' && !message.isStreaming && message.content && (
                <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(message.id, message.content)}
                    className="p-1 rounded text-gray-600 hover:text-gray-400 transition-colors"
                    aria-label="Copy message"
                    title="Copy"
                  >
                    {copiedId === message.id ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Actions ─────────────────────────────────────────────────────── */}
      {showQuickActions && (
        <div className="border-t border-white/5 pt-3 flex-shrink-0">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest px-4 mb-2 font-medium">
            Quick questions
          </p>
          <QuickActions onAction={sendMessage} disabled={isLoading} />
        </div>
      )}

      {/* ── Input Area ───────────────────────────────────────────────────────── */}
      <div className="border-t border-white/5 p-3 flex-shrink-0 bg-black/60">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                  setInput(e.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Grace…"
              disabled={isLoading}
              rows={1}
              maxLength={MAX_MESSAGE_LENGTH}
              aria-label="Chat message"
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 resize-none disabled:opacity-50 transition-all leading-relaxed max-h-32"
              style={{ fieldSizing: 'content' } as React.CSSProperties}
            />
            {input.length > MAX_MESSAGE_LENGTH * 0.8 && (
              <span className="absolute right-2 bottom-2 text-[10px] text-gray-600">
                {input.length}/{MAX_MESSAGE_LENGTH}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex-shrink-0 shadow-lg shadow-purple-500/20"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>

          {isLoading && (
            <button
              type="button"
              onClick={() => abortControllerRef.current?.abort()}
              aria-label="Stop generating"
              title="Stop"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
        <p className="text-[10px] text-gray-700 text-center mt-2">
          Grace AI may make mistakes. Verify important info with Grace directly.
        </p>
      </div>
    </div>
  );
}
