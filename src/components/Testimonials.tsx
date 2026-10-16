import React, { memo } from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

interface TestimonialsProps {
  darkMode: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = memo(({ darkMode }) => {
  return (
    <section
      aria-label="Client & Peer Recommendations"
      className={`py-20 lg:py-28 transition-colors ${
        darkMode ? 'bg-slate-950/40 border-y border-slate-800/80' : 'bg-slate-50/70 border-y border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span>Collaboration Feedback</span>
            <span aria-hidden="true">·</span>
            <span>Client & Peer Endorsements</span>
          </div>
          <h2 className="text-section font-display font-bold text-balance">
            Trusted by founders, tech leads, and fellow engineers.
          </h2>
          <p className={`mt-4 text-lead measure ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Professional reviews emphasizing reliability, technical depth in the MERN ecosystem, and proactive communication.
          </p>
        </div>

        {/* Testimonials Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between ${
                darkMode
                  ? 'bg-slate-900/40 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <Quote className="w-6 h-6 text-emerald-500/40 mb-4" />
                <p className={`text-body-sm mb-6 italic ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  "{t.content}"
                </p>
              </div>

              {/* Attribution: Unboxed clean text with typographic separator */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-micro text-emerald-600 dark:text-emerald-400 font-mono">
                  {t.avatarInitials}
                </div>
                <div>
                  <div className="text-body-sm font-display font-bold">{t.name}</div>
                  <div className="text-label text-slate-600 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span>{t.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600/90 dark:text-emerald-400/90">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';
