'use client';

// components/ai/QuickActions.tsx
// Quick action pill buttons shown in the welcome state and as suggestions

interface QuickActionsProps {
  onAction: (message: string) => void;
  disabled?: boolean;
}

const QUICK_ACTIONS = [
  { label: 'Tell me about Grace', message: 'Tell me about Grace Isitua' },
  { label: 'View services', message: "What services does Grace offer?" },
  { label: 'View projects', message: "Show me Grace's portfolio projects" },
  { label: 'Frontend experience', message: "Tell me about Grace's frontend development experience" },
  { label: 'Download CV', message: "I'd like to download Grace's CV" },
  { label: 'I want to hire Grace', message: 'I want to hire Grace for a project' },
  { label: 'Request a quote', message: 'I want to request a project quote' },
  { label: 'Contact Grace', message: 'How can I contact Grace?' },
];

export function QuickActions({ onAction, disabled }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => onAction(action.message)}
          disabled={disabled}
          className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 bg-white/[0.05] text-gray-300 hover:bg-purple-500/15 hover:border-purple-500/40 hover:text-purple-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          aria-label={`Ask: ${action.label}`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
