import React, { memo, useMemo, useState, Suspense } from 'react';
import { FileCode, CheckCircle2 } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';
import { lazyWithIdlePreload } from '../utils/lazyWithIdlePreload';

/**
 * The code inspector is only reachable from an explicit click on a skill card,
 * so it ships as its own chunk and is warmed during idle time. The module uses a
 * named export, so the factory re-publishes it as `default` for `React.lazy`.
 */
const { Component: SkillInspectorModal } = lazyWithIdlePreload(() =>
  import('./SkillInspectorModal').then((module) => ({ default: module.SkillInspectorModal })),
);

interface SkillsProps {
  darkMode: boolean;
}

type SkillCategory = 'All' | 'Frontend' | 'Backend' | 'Database' | 'Tools & DevOps';

/** Fixed category list — module scope so it is not rebuilt on every render. */
const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'All', label: 'All Stack Technologies' },
  { id: 'Frontend', label: 'Frontend Development' },
  { id: 'Backend', label: 'Backend & APIs' },
  { id: 'Database', label: 'Database & Modeling' },
  { id: 'Tools & DevOps', label: 'Tools & Deployment' },
];

export const Skills: React.FC<SkillsProps> = memo(({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [activeSkillModal, setActiveSkillModal] = useState<SkillItem | null>(null);

  // Recomputed only when the active category actually changes.
  const filteredSkills = useMemo(
    () =>
      selectedCategory === 'All'
        ? SKILLS
        : SKILLS.filter((s) => s.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <section
      id="skills"
      aria-label="Technical Skills Section"
      className={`py-20 lg:py-28 transition-colors ${
        darkMode ? 'bg-slate-950/40 border-y border-slate-800/80' : 'bg-slate-50/70 border-y border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span>Core Competencies</span>
            <span aria-hidden="true">·</span>
            <span>MERN & Modern Ecosystem</span>
          </div>
          <h2 className="text-section font-display font-bold text-balance">
            Engineered with deep specialization across the JavaScript & TypeScript spectrum.
          </h2>
          <p className={`mt-4 text-lead measure ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Practical, production-grade proficiency. Click on skills with code indicators to inspect architectural implementations.
          </p>
        </div>

        {/* Category Filter Buttons (Functional Tabs) */}
        <div className={`flex flex-nowrap items-center gap-1 p-1 rounded-xl border mb-8 self-start overflow-x-auto ${
          darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isActive}
                className={`px-3 py-2 text-label font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? darkMode
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                    : darkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                darkMode
                  ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow'
              }`}
            >
              <div>
                {/* Header: Skill Name & Level */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-card font-display font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {skill.name}
                  </h3>
                  <span className={`font-mono text-micro shrink-0 ${
                    skill.level === 'Advanced'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}>
                    {skill.level}
                  </span>
                </div>

                {/* Category kicker */}
                <div className="text-micro font-medium uppercase tracking-[0.12em] text-slate-500 mb-3">
                  <span>{skill.category}</span>
                </div>

                {/* Practical Description */}
                <p className="text-body-sm text-slate-600 dark:text-slate-400 mb-5">
                  {skill.description}
                </p>
              </div>

              {/* Code Snippet Trigger or Verification footer */}
              <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800/40 flex items-center justify-between gap-3 text-label">
                {skill.codeSnippet ? (
                  <button
                    onClick={() => setActiveSkillModal(skill)}
                    className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Inspect Code Pattern</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-slate-500 text-micro font-medium">
                    <CheckCircle2 className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                    <span>Production Verified</span>
                  </div>
                )}
                <span className="text-micro font-mono text-slate-500">
                  {skill.codeSnippet ? skill.codeSnippet.language : 'Core'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Code Inspector Modal */}
      <Suspense fallback={null}>
        {activeSkillModal && (
          <SkillInspectorModal
            skill={activeSkillModal}
            onClose={() => setActiveSkillModal(null)}
            darkMode={darkMode}
          />
        )}
      </Suspense>
    </section>
  );
});

Skills.displayName = 'Skills';
