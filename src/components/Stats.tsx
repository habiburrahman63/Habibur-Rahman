import React, { memo } from 'react';
import { DEVELOPER_STATS } from '../data/portfolioData';

interface StatsProps {
  darkMode: boolean;
}

export const Stats: React.FC<StatsProps> = memo(({ darkMode }) => {
  return (
    <section
      aria-label="Developer Statistics"
      className={`border-y transition-colors py-10 sm:py-12 ${
        darkMode ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200 bg-slate-50/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {DEVELOPER_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between"
            >
              <div className="text-hero sm:text-[2.75rem] font-display font-bold tabular-nums text-emerald-600 dark:text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className={`text-body-sm font-semibold mb-1.5 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {stat.label}
              </div>
              <p className="text-label text-slate-600 dark:text-slate-400">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Stats.displayName = 'Stats';
