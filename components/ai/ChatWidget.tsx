'use client';

// components/ai/ChatWidget.tsx
// Floating AI assistant trigger button + animated chat window container
// Positioned in bottom-left so the WhatsApp button remains on the bottom-right

import { useState, useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Show tooltip after 4 seconds to draw attention
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 6 seconds
        const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
        return () => clearTimeout(hideTimer);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  // Keyboard: Escape closes the chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Trap focus within widget when open
  useEffect(() => {
    if (isOpen) {
      // Small delay to let animation complete before focusing
      const timer = setTimeout(() => {
        const firstFocusable = widgetRef.current?.querySelector<HTMLElement>(
          'textarea, button, [tabindex="0"]'
        );
        firstFocusable?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasGreeted(true);
    setShowTooltip(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[200] bottom-24 left-6 w-[calc(100vw-48px)] max-w-sm h-[540px] max-h-[80vh]"
            aria-label="Grace AI Chat"
            role="region"
          >
            {/* Glow effect behind the window */}
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/20 to-pink-600/10 rounded-[2rem] blur-2xl pointer-events-none" />
            <div className="relative w-full h-full">
              <ChatWindow onClose={handleClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tooltip Notification ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[190] bottom-[92px] left-[76px] max-w-[200px]"
          >
            <div className="bg-black/90 border border-white/10 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-black/50 backdrop-blur-md">
              <p className="text-white text-xs font-medium leading-tight">
                👋 Have questions? I&apos;m here!
              </p>
              <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">
                Ask me about Grace&apos;s work
              </p>
            </div>
            {/* Tooltip arrow pointing left towards icon */}
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black/90 border-l border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button ──────────────────────────────────────────── */}
      {/* Positioned bottom-8 left-6 to keep the right side clear for WhatsApp */}
      <div className="fixed z-[200] bottom-8 left-6">
        <motion.button
          onClick={isOpen ? handleClose : handleOpen}
          aria-label={isOpen ? 'Close Grace AI assistant' : 'Open Grace AI assistant'}
          aria-expanded={isOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {/* Animated glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/30 blur-md group-hover:blur-lg transition-all" />

          {/* Pulse ring when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-ping opacity-25 pointer-events-none" />
          )}

          {/* Online indicator */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black shadow-sm z-10" />
          )}

          {/* Icon */}
          <span className="relative z-10 text-white">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>

        {/* Label below button (visible when closed) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-gray-500 font-medium uppercase tracking-widest"
          >
            Grace AI
          </motion.div>
        )}
      </div>
    </>
  );
}
