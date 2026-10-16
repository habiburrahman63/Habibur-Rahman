import React, { memo, useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { WORK_PROCESS } from '../data/portfolioData';

interface ProcessProps {
  darkMode: boolean;
}

export const Process: React.FC<ProcessProps> = memo(({ darkMode }) => {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section
      id="process"
      aria-label="Development Process Section"
      className="py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span>Workflow & Engineering Cycle</span>
            <span aria-hidden="true">·</span>
            <span>How I Work</span>
          </div>
          <h2 className="text-section font-display font-bold text-balance">
            A disciplined, 8-phase methodology from architecture to deployment.
          </h2>
          <p className={`mt-4 text-lead measure ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Every step is designed to eliminate ambiguity, preserve code hygiene, and guarantee on-time delivery.
          </p>
        </div>

        {/* Process Steps Interactive Timeline / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WORK_PROCESS.map((step) => {
            const isSelected = activeStep === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(event) => {
                  // Keyboard parity for the click-only cards.
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveStep(step.step);
                  }
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? darkMode
                      ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                      : 'bg-white border-emerald-500/50 shadow-md shadow-emerald-500/10'
                    : darkMode
                    ? 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Step index & Title */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-micro font-mono font-bold px-2 py-1 rounded ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      Phase {step.step}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'rotate-90 text-emerald-400' : 'text-slate-600'
                    }`} />
                  </div>

                  <h3 className="text-card font-display font-bold mb-2">{step.title}</h3>
                  <p className="text-body-sm text-slate-600 dark:text-slate-400 mb-4">
                    {step.summary}
                  </p>
                </div>

                {/* Details list */}
                <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800/40 space-y-2 text-label text-slate-700 dark:text-slate-300">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

Process.displayName = 'Process';
