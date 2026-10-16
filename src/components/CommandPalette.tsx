import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowRight, Moon, Sun, Download, Mail, Github, PhoneCall } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useDialogBehavior } from '../hooks/useDialogBehavior';
import { copyTextToClipboard } from '../utils/clipboard';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  openResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
  openResume,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Escape, focus management and the focus trap come from the shared hook; this
  // component only adds palette-specific keys (arrows / Enter) below.
  const dialogRef = useDialogBehavior<HTMLDivElement>(isOpen, onClose);

  const actions = useMemo(
    () => [
    {
      id: 'sec-projects',
      label: 'Navigate to Projects',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'sec-skills',
      label: 'Navigate to Skills & Tech Stack',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#skills';
        onClose();
      }
    },
    {
      id: 'sec-services',
      label: 'Navigate to Services & Offerings',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#services';
        onClose();
      }
    },
    {
      id: 'sec-about',
      label: 'Navigate to About & Philosophy',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#about';
        onClose();
      }
    },
    {
      id: 'sec-contact',
      label: 'Navigate to Contact Form',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      }
    },
    {
      id: 'resume',
      label: 'View / Download Curriculum Vitae',
      category: 'Action',
      icon: Download,
      action: () => {
        onClose();
        openResume();
      }
    },
    {
      id: 'theme',
      label: darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      category: 'Preference',
      icon: darkMode ? Sun : Moon,
      action: () => {
        setDarkMode(!darkMode);
        onClose();
      }
    },
    {
      id: 'email',
      label: `Copy Developer Email (${PERSONAL_INFO.email})`,
      category: 'Contact',
      icon: Mail,
      action: () => {
        void copyTextToClipboard(PERSONAL_INFO.email);
        onClose();
      }
    },
    {
      id: 'phone',
      label: `Copy Developer Phone (${PERSONAL_INFO.phone})`,
      category: 'Contact',
      icon: PhoneCall,
      action: () => {
        void copyTextToClipboard(PERSONAL_INFO.phone);
        onClose();
      }
    },
    {
      id: 'github',
      label: 'Open GitHub Profile in new tab',
      category: 'External',
      icon: Github,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ], [darkMode, onClose, openResume, setDarkMode]);

  const filtered = useMemo(
    () =>
      actions.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [actions, query],
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // The palette keeps no state between openings. Focus itself is handled by
  // `useDialogBehavior`, which moves focus to the first focusable element —
  // here the search input.
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick actions and navigation"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-24 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`w-full max-w-xl rounded-2xl border overflow-hidden shadow-2xl transition-all outline-none ${
          darkMode ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800/80 gap-3">
          <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="cmd-palette-title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-body-sm focus:outline-none placeholder:text-slate-500 font-sans"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div role="listbox" aria-label="Available actions" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-body-sm text-slate-600 dark:text-slate-400">
              No matching actions or sections found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-colors text-body-sm ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : darkMode
                      ? 'text-slate-300 hover:bg-slate-900/60'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="font-mono text-micro text-slate-500 uppercase tracking-[0.12em]">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between text-micro text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Habibur Rahman Palette</span>
        </div>
      </div>
    </div>
  );
};
