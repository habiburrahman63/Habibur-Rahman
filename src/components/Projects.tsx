import React, { memo, useMemo, useState, Suspense } from 'react';
import { ExternalLink, Github, BookOpen, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { handleImageError } from '../utils/imageFallback';
import { lazyWithIdlePreload } from '../utils/lazyWithIdlePreload';

/**
 * The case study viewer is a large overlay that is only reachable from an
 * explicit click on a project card, so it ships as its own chunk and is warmed
 * during idle time. The module uses a named export, so the factory re-publishes
 * it as `default` for `React.lazy`.
 */
const { Component: CaseStudyModal } = lazyWithIdlePreload(() =>
  import('./CaseStudyModal').then((module) => ({ default: module.CaseStudyModal })),
);

interface ProjectsProps {
  darkMode: boolean;
}

type ProjectFilter = 'All' | 'Full-Stack MERN' | 'Frontend & UI' | 'APIs & Backend';

/** Fixed filter list — module scope so it is not rebuilt on every render. */
const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: 'All', label: 'All Projects' },
  { id: 'Full-Stack MERN', label: 'Full-Stack MERN' },
  { id: 'Frontend & UI', label: 'Frontend & UI' },
  { id: 'APIs & Backend', label: 'APIs & Backend' },
];

export const Projects: React.FC<ProjectsProps> = memo(({ darkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  // Memoised so switching the active tab re-uses the same array reference and
  // the project cards below are not re-created when unrelated state changes.
  const filteredProjects = useMemo(
    () =>
      selectedFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === selectedFilter),
    [selectedFilter],
  );

  return (
    <section
      id="projects"
      aria-label="Featured Projects Section"
      className="py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>Production Applications</span>
            </div>
            <h2 className="text-section font-display font-bold text-balance">
              Architected for real users, verified performance, and business value.
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional Segmented Buttons) */}
          <div className={`flex flex-nowrap items-center gap-1 p-1 rounded-xl border self-start md:self-auto shrink-0 ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {FILTERS.map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
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
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.length === 0 && (
            <div className="lg:col-span-2 p-10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No projects are published in this category yet.
              </p>
              <button
                onClick={() => setSelectedFilter('All')}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-body-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <span>Show all projects</span>
              </button>
            </div>
          )}

          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                darkMode
                  ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:shadow-2xl hover:shadow-black/40'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'
              }`}
            >
              <div>
                {/* Project Image Frame — clicking the image opens the live demo */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open live demo of ${project.title}`}
                  className="relative block aspect-video overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-inset"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} interface showcase`}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Hover / Focus CTA hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-body-sm font-semibold shadow-lg shadow-black/40">
                      <span>Open Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Category Kicker Overlay */}
                  <div className="absolute bottom-3 left-4 font-mono text-micro text-emerald-300 drop-shadow pointer-events-none">
                    {project.category}
                  </div>
                </a>

                {/* Content Area */}
                <div className="p-6 sm:p-7">
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-card font-display font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-body-sm font-semibold text-emerald-500/90 dark:text-emerald-400/90 mb-3">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className={`text-body-sm mb-5 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech stack - Zero Pill Discipline: Clean unboxed text with separators */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-micro text-slate-600 dark:text-slate-400 mb-6">
                    {project.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {idx < project.tags.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Project Metrics Summary if present */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800/50 bg-slate-100 dark:bg-slate-950/30 text-label mb-6">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-micro text-slate-500 uppercase tracking-[0.12em]">{m.label}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate mt-1">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 sm:p-7 pt-0 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveCaseStudy(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-body-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 py-3 px-4 rounded-lg text-body-sm font-semibold border transition-colors ${
                    darkMode
                      ? 'border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 rounded-lg border transition-colors ${
                    darkMode
                      ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                  aria-label={`View ${project.title} GitHub repository`}
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* GitHub link kicker */}
        <div className="mt-12 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-body-sm font-display font-bold">Interested in browsing more repositories?</h4>
              <p className="text-label text-slate-600 dark:text-slate-400 mt-1">Check out open-source repositories, experiments, and backend utilities on GitHub.</p>
            </div>
          </div>
          <a
            href="https://github.com/habiburrahman63"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-body-sm font-semibold border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Profile</span>
          </a>
        </div>

      </div>

      {/* Case Study Full Modal */}
      <Suspense fallback={null}>
        {activeCaseStudy && (
          <CaseStudyModal
            project={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
            darkMode={darkMode}
          />
        )}
      </Suspense>
    </section>
  );
});

Projects.displayName = 'Projects';
