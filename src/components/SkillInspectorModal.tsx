import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode2 } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { useDialogBehavior } from '../hooks/useDialogBehavior';
import { copyTextToClipboard } from '../utils/clipboard';

interface SkillInspectorModalProps {
  skill: SkillItem | null;
  onClose: () => void;
  darkMode: boolean;
}

export const SkillInspectorModal: React.FC<SkillInspectorModalProps> = ({
  skill,
  onClose,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);
  const isOpen = skill !== null;
  const dialogRef = useDialogBehavior<HTMLDivElement>(isOpen, onClose);

  if (!skill) return null;

  const copyCode = async () => {
    if (!skill.codeSnippet?.code) return;
    const succeeded = await copyTextToClipboard(skill.codeSnippet.code);
    if (succeeded) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl transition-all outline-none ${
          darkMode ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 id="skill-modal-title" className="text-card font-display font-bold">
                {skill.name} Implementation Pattern
              </h3>
              <div className="flex items-center gap-2 text-label text-slate-600 dark:text-slate-400">
                <span>{skill.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">{skill.level} Proficiency</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close code inspector"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-body-sm text-slate-700 dark:text-slate-300">
            {skill.description}
          </p>

          {skill.codeSnippet ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#06080F] overflow-hidden">
              {/* The code canvas below is intentionally dark in BOTH themes (a code
                  editor reads better that way), so this title bar keeps the dark
                  treatment unconditionally to stay flush with it. */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{skill.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed max-h-[350px]">
                <code>{skill.codeSnippet.code}</code>
              </pre>
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-body-sm text-slate-600 dark:text-slate-400">
              Extensively integrated into full-stack projects and production repositories.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 text-label text-slate-600 dark:text-slate-400">
          <span>Production code snippet from Habibur's repositories</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
