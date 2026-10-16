import React from 'react';
import { X, ExternalLink, Github, CheckCircle, AlertTriangle, Layers, Database, Globe, Cpu } from 'lucide-react';
import { Project } from '../types/portfolio';
import { useDialogBehavior } from '../hooks/useDialogBehavior';
import { handleImageError } from '../utils/imageFallback';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  darkMode: boolean;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  darkMode,
}) => {
  const isOpen = project !== null;
  const dialogRef = useDialogBehavior<HTMLDivElement>(isOpen, onClose);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`w-full max-w-4xl my-auto rounded-2xl border overflow-hidden shadow-2xl transition-all outline-none ${
          darkMode ? 'bg-[#0A0E17] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 sticky top-0 bg-inherit z-10">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-micro font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-500">
                Detailed Engineering Case Study
              </span>
              <h2 id="case-study-title" className="text-card font-display font-bold">
                {project.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study dialog"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Hero Banner with Image & Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open live demo of ${project.title}`}
              className="md:col-span-7 group relative block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-body-sm font-semibold shadow-lg shadow-black/40">
                  <span>Open Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </span>
            </a>
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="font-mono text-micro text-emerald-600 dark:text-emerald-400 mb-1.5">{project.category}</div>
                <h3 className="text-card font-display font-bold mb-2">{project.subtitle}</h3>
                <p className="text-body-sm text-slate-600 dark:text-slate-400">
                  {caseStudy.overview}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg text-body-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg text-body-sm font-semibold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              </div>
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-body-sm font-display font-bold text-rose-600 dark:text-rose-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Engineering Problem</span>
              </div>
              <p className="text-body-sm text-slate-700 dark:text-slate-300">
                {caseStudy.problem}
              </p>
            </div>

            <div className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-body-sm font-display font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>The Architectural Solution</span>
              </div>
              <p className="text-body-sm text-slate-700 dark:text-slate-300">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Full-Stack Architecture Breakdown */}
          <div>
            <h4 className="text-sm font-bold font-display font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-3">
              Full-Stack Architecture & Data Flow
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {caseStudy.architecture.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-body-sm ${
                    darkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-mono text-micro text-emerald-600 dark:text-emerald-400 block mb-1.5">Layer 0{idx + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Technology Matrix */}
          <div className={`p-5 rounded-xl border ${
            darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className="text-sm font-bold font-display font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-4">
              Technology Stack Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-body-sm">
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-cyan-600 dark:text-cyan-400 mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frontend</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                  {caseStudy.technologies.frontend.map((t) => (
                    <div key={t}>· {t}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400 mb-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Backend</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                  {caseStudy.technologies.backend.map((t) => (
                    <div key={t}>· {t}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>Database</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                  {caseStudy.technologies.database.map((t) => (
                    <div key={t}>· {t}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-semibold text-indigo-400 mb-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>DevOps & Infra</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                  {caseStudy.technologies.devops.map((t) => (
                    <div key={t}>· {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-sm font-bold font-display font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-3">
              Production Capabilities & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm">
              {caseStudy.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/20 text-body-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Challenges & Solutions */}
          <div>
            <h4 className="text-sm font-bold font-display font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-3">
              Key Technical Challenges Overcome
            </h4>
            <div className="space-y-3">
              {caseStudy.challenges.map((c, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-body-sm ${
                    darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="font-semibold text-amber-600 dark:text-amber-400 mb-1">
                    Challenge: {c.challenge}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Resolution: </span>
                    {c.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Measurable Outcomes */}
          <div className="pt-2">
            <h4 className="text-sm font-bold font-display font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-3">
              Verifiable Engineering Outcomes
            </h4>
            <div className="space-y-2 text-body-sm text-slate-700 dark:text-slate-300">
              {caseStudy.outcomes.map((out, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800/80 bg-inherit flex items-center justify-between text-body-sm">
          <span className="text-slate-600 dark:text-slate-400">Architected by Habibur Rahman</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg font-semibold text-body-sm bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
