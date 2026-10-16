import React, { memo, useCallback, useState } from 'react';
import { ArrowDown, Github, Mail, Linkedin, FileText, Layers, Database, Server, Smartphone, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { copyTextToClipboard } from '../utils/clipboard';
import { handleImageError } from '../utils/imageFallback';

interface HeroProps {
  darkMode: boolean;
  openResume: () => void;
}

type MernNodeId = 'mongo' | 'express' | 'react' | 'node';

/**
 * The MERN pillar definitions never change, so they live in module scope rather
 * than being rebuilt on every render of the Hero.
 */
const MERN_NODES: {
  id: MernNodeId;
  letter: string;
  title: string;
  desc: string;
  icon: typeof Database;
  highlight: string;
}[] = [
  {
    id: 'mongo',
    letter: 'M',
    title: 'MongoDB',
    desc: 'NoSQL document store, aggregation pipelines, schema validation, and indexing for high-throughput queries.',
    icon: Database,
    highlight: 'text-emerald-400 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20',
  },
  {
    id: 'express',
    letter: 'E',
    title: 'Express.js',
    desc: 'Robust RESTful API architecture, JWT verification, custom middleware chains, and route controllers.',
    icon: Server,
    highlight: 'text-amber-400 border-amber-500/40 bg-amber-50 dark:bg-amber-950/20',
  },
  {
    id: 'react',
    letter: 'R',
    title: 'React.js',
    desc: 'Modern single-page applications, custom hooks, Redux Toolkit state, and fluid responsive design.',
    icon: Smartphone,
    highlight: 'text-cyan-400 border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/20',
  },
  {
    id: 'node',
    letter: 'N',
    title: 'Node.js',
    desc: 'Event-driven runtime environment, non-blocking I/O, asynchronous microservices, and server orchestration.',
    icon: Layers,
    highlight: 'text-green-400 border-green-500/40 bg-green-50 dark:bg-green-950/20',
  },
];

/** Direct lookup keyed by id — avoids re-scanning the array on each render. */
const MERN_NODE_BY_ID = MERN_NODES.reduce<Record<MernNodeId, (typeof MERN_NODES)[number]>>(
  (accumulator, node) => {
    accumulator[node.id] = node;
    return accumulator;
  },
  {} as Record<MernNodeId, (typeof MERN_NODES)[number]>,
);

export const Hero: React.FC<HeroProps> = memo(({ darkMode, openResume }) => {
  const [activeMernNode, setActiveMernNode] = useState<MernNodeId>('react');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = useCallback(async () => {
    const copied = await copyTextToClipboard(PERSONAL_INFO.email);
    // Only claim success when the clipboard write actually happened
    // (insecure contexts silently rejected the previous implementation).
    setCopiedEmail(copied);
    if (copied) {
      window.setTimeout(() => setCopiedEmail(false), 2000);
    }
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic & Action Presence (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status indicator - clean unboxed editorial text */}
            <div className="flex items-center gap-2.5 text-label font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className={darkMode ? 'text-emerald-400/90' : 'text-emerald-700'}>
                {PERSONAL_INFO.availability}
              </span>
              <span className={darkMode ? 'text-slate-600' : 'text-slate-400'}>·</span>
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-bold text-hero mb-6">
              <span className={darkMode ? 'text-white' : 'text-slate-900'}>
                {PERSONAL_INFO.name}
              </span>
              <br />
              <span className="block text-hero-role whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                {PERSONAL_INFO.title}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className={`text-lead measure mb-8 ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {PERSONAL_INFO.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <a
                href="#projects"
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-body-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-body-sm font-semibold transition-all border whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  darkMode
                    ? 'border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                Let's Work Together
              </a>
              <button
                onClick={openResume}
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-body-sm font-semibold transition-all border whitespace-nowrap ${
                  darkMode
                    ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>

            {/* Links & Direct Contact */}
            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-label font-medium pt-6 border-t ${
              darkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                title="Visit GitHub profile"
              >
                <Github className="w-4 h-4" />
                <span>github.com/habiburrahman63</span>
              </a>

              <span className="hidden sm:inline" aria-hidden="true">·</span>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Mail className="w-4 h-4" />}
                <span>{copiedEmail ? 'Email Copied!' : PERSONAL_INFO.email}</span>
              </button>

              <span className="hidden sm:inline" aria-hidden="true">·</span>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Interactive MERN Architecture Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className={`w-full rounded-2xl border p-5 sm:p-6 transition-all ${
              darkMode
                ? 'bg-slate-900/60 border-slate-800/80 shadow-2xl shadow-black/40'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}>
              {/* Top portrait & identity header */}
              <div className="flex items-center gap-4 pb-5 border-b border-slate-200 dark:border-slate-800/40">
                <div className="relative">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt="Habibur Rahman portrait"
                    width={80}
                    height={80}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onError={handleImageError}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-300 dark:border-slate-700/60 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#090D16]" />
                </div>
                <div>
                  <h2 className="text-card font-display font-bold">{PERSONAL_INFO.name}</h2>
                  <p className="text-body-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    {PERSONAL_INFO.title}
                  </p>
                  <p className="text-label text-slate-600 dark:text-slate-400 mt-1">
                    Engineering scalable web applications
                  </p>
                </div>
              </div>

              {/* Interactive MERN Stack Pipeline Flow */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-micro font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                    MERN Architectural Pipeline
                  </span>
                  <span className="text-micro font-mono text-slate-500">
                    Interactive Stack Nodes
                  </span>
                </div>

                {/* 4 Interactive Nodes */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {MERN_NODES.map((node) => {
                    const isSelected = activeMernNode === node.id;
                    const IconComponent = node.icon;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setActiveMernNode(node.id)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? darkMode
                              ? `${node.highlight} shadow-md`
                              : 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                            : darkMode
                            ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-card font-display font-bold">{node.letter}</div>
                        <IconComponent className="w-3.5 h-3.5 mt-1 opacity-80" />
                        <span className="text-micro mt-1.5 font-medium truncate max-w-full">
                          {node.title.replace('.js', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Details Box */}
                {(() => {
                  const current = MERN_NODE_BY_ID[activeMernNode];
                  return (
                    <div className={`p-4 rounded-xl border text-body-sm transition-all ${
                      darkMode
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <div className="flex items-center justify-between font-semibold mb-1.5">
                        <span className="text-body-sm text-emerald-600 dark:text-emerald-400 font-display font-bold">
                          {current.title} Layer
                        </span>
                        <span className="font-mono text-micro text-slate-500">
                          Production Pillar
                        </span>
                      </div>
                      <p>{current.desc}</p>
                    </div>
                  );
                })()}

                {/* Bottom Quick Code Metric */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/40 flex flex-wrap items-center justify-between gap-2 text-label text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-mono text-micro">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>REST API & SPA Ready</span>
                  </div>
                  <a
                    href="#skills"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold text-micro"
                  >
                    <span>View all technologies</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-12 lg:mt-16">
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className={`p-2 rounded-full border transition-colors ${
              darkMode
                ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
