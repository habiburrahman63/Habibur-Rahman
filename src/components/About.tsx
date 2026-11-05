import React, { memo, useState } from 'react';
import { CheckCircle2, Code2, Zap, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { handleImageError } from '../utils/imageFallback';

interface AboutProps {
  darkMode: boolean;
  openResume: () => void;
}

type AboutTabId = 'story' | 'philosophy' | 'highlights';

/** Fixed tab + timeline definitions, kept outside the component so they are
 *  allocated once at module load rather than on every render. */
const TABS: { id: AboutTabId; label: string }[] = [
  { id: 'story', label: 'Story & Specialization' },
  { id: 'philosophy', label: 'Engineering Philosophy' },
  { id: 'highlights', label: 'Career Highlights' },
];

const HIGHLIGHTS = [
  {
    year: '2023 – Present',
    title: 'Full-Stack MERN Engineering',
    desc: 'Developing scalable React applications backed by custom Node/Express APIs and MongoDB schemas for worldwide clients.',
  },
  {
    year: '2022 – 2023',
    title: 'Frontend & API Development',
    desc: 'Building responsive Single Page Applications, integrating REST services, Redux state management, and modern CSS architectures.',
  },
  {
    year: 'Education',
    title: 'Diploma in Computer Science & Engineering',
    desc: 'Sirajganj Institute of Technology (SIT) · Groundwork in data structures, algorithms, software engineering, database systems, and web technologies.',
  },
];

export const About: React.FC<AboutProps> = memo(({ darkMode, openResume }) => {
  const [activeTab, setActiveTab] = useState<AboutTabId>('story');

  return (
    <section
      id="about"
      aria-label="About Me Section"
      className="py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span>About Me</span>
            <span aria-hidden="true">·</span>
            <span>Profile & Mindset</span>
          </div>
          <h2 className="text-section font-display font-bold text-balance">
            Crafting resilient full-stack web applications with clean architectural principles.
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Portrait & Quick Specs Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-lg shadow-slate-100'
            }`}>
              <div className="relative mb-5">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt="Habibur Rahman professional portrait"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="w-full aspect-square object-cover rounded-xl border border-slate-300 dark:border-slate-700/50"
                />
              </div>

              <h3 className="text-card font-display font-bold">{PERSONAL_INFO.name}</h3>
              <p className="text-body-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                {PERSONAL_INFO.title}
              </p>

              <div className={`space-y-3 text-body-sm pt-5 border-t ${
                darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Primary Focus</span>
                  <span className="font-semibold">MERN Architecture</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Frontend Stack</span>
                  <span className="font-semibold">React · Tailwind · Redux</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Backend Stack</span>
                  <span className="font-semibold">Node.js · Express · REST</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Database</span>
                  <span className="font-semibold">MongoDB · Mongoose</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Available For Hire</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/40">
                <button
                  onClick={openResume}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-body-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Narrative Tabs (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Functional Segmented Controls / Tabs */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border mb-6 self-start overflow-x-auto max-w-full ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-body-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                      isActive
                        ? darkMode
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'bg-white text-slate-900 shadow-sm'
                        : darkMode
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Story & Specialization */}
            {activeTab === 'story' && (
              <div className="space-y-5 animate-fadeIn">
                <p className={`whitespace-pre-line text-body measure ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {PERSONAL_INFO.bio}
                </p>

                <p className={`text-body measure ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  My methodology centers around writing software that provides actual value to end-users and commercial stakeholders. I do not rely on bloated templates or disjointed scripts. Every project begins with solid data contract design in MongoDB, secure controller logic in Express, and accessible, responsive component trees in React.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold text-body-sm mb-2">
                      <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Frontend Precision</span>
                    </div>
                    <p className="text-body-sm text-slate-600 dark:text-slate-400">
                      Fluid SPAs, custom React hooks, declarative Tailwind utility styling, and optimistic UI transitions.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold text-body-sm mb-2">
                      <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Backend Reliability</span>
                    </div>
                    <p className="text-body-sm text-slate-600 dark:text-slate-400">
                      Express MVC routes, token security, rate-limiting, and high-efficiency MongoDB aggregation pipelines.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Engineering Philosophy */}
            {activeTab === 'philosophy' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                {PERSONAL_INFO.principles.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 text-body-sm font-semibold mb-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <h4 className="font-display font-bold">{p.title}</h4>
                      </div>
                      <p className="text-body-sm text-slate-600 dark:text-slate-400">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/40 font-mono text-micro text-emerald-500/80">
                      Standard #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Career Highlights */}
            {activeTab === 'highlights' && (
              <div className="space-y-4 animate-fadeIn">
                {HIGHLIGHTS.map((h, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border transition-all ${
                      darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h4 className="text-body-sm font-display font-bold">{h.title}</h4>
                      <span className="font-mono text-micro text-emerald-600 dark:text-emerald-400 shrink-0">
                        {h.year}
                      </span>
                    </div>
                    <p className="text-body-sm text-slate-600 dark:text-slate-400">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
});

About.displayName = 'About';
