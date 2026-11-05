import React, { memo } from 'react';
import { Github, ArrowUpRight, Code2 } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/portfolioData';
import { handleImageError } from '../utils/imageFallback';

interface TeamProps {
  darkMode: boolean;
}

export const Team: React.FC<TeamProps> = memo(({ darkMode }) => {
  return (
    <section
      id="team"
      aria-label="Our Team Member Section"
      className={`py-20 lg:py-28 transition-colors relative overflow-hidden ${
        darkMode ? 'bg-slate-950/40 border-y border-slate-800/80' : 'bg-slate-50/70 border-y border-slate-200'
      }`}
    >
      {/* Background ambient lighting accents */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[38rem] h-[22rem] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[28rem] h-[18rem] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Engineering Squad</span>
            <span aria-hidden="true">·</span>
            <span>Core Collaborators</span>
          </div>

          <h2 className="text-section font-display font-bold text-balance">
            Our Team Member
          </h2>

          <p className={`mt-4 text-lead measure ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            A talented cohort of passionate software engineers and MERN stack specialists collaborating to build robust, modern, and high-performance digital solutions.
          </p>
        </div>

        {/* Team Members Grid - Centered & Perfectly Balanced on all viewports */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-7">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] xl:w-[calc(25%-21px)] max-w-sm ${
                darkMode
                  ? 'bg-slate-900/50 border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900/90 hover:shadow-[0_12px_32px_-8px_rgba(16,185,129,0.18)]'
                  : 'bg-white border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10'
              }`}
            >
              {/* Subtle top ambient indicator */}
              <div
                className="h-1 w-full bg-gradient-to-r from-emerald-500/30 via-teal-400/70 to-emerald-500/30 group-hover:from-emerald-400 group-hover:via-teal-300 group-hover:to-emerald-400 transition-all duration-500"
                aria-hidden="true"
              />

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Top row: Avatar & GitHub link button */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                      aria-label={`View ${member.name}'s GitHub profile`}
                    >
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-emerald-500/25 group-hover:ring-emerald-400/80 transition-all duration-300 bg-slate-800 shadow-md">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.dataset.triedFallback !== 'true') {
                              target.dataset.triedFallback = 'true';
                              target.src = member.avatarFallback;
                            } else {
                              handleImageError(e);
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                      </div>
                      
                      {/* Active Status Badge */}
                      <span
                        className="absolute -bottom-1 -right-1 bg-slate-900 dark:bg-slate-950 p-1 rounded-full ring-2 ring-slate-900 dark:ring-slate-950"
                        title="Active GitHub Contributor"
                      >
                        <span className="block w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                      </span>
                    </a>

                    {/* GitHub Quick Icon Link */}
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open @${member.username} on GitHub`}
                      className={`p-2.5 rounded-xl border transition-all duration-200 ${
                        darkMode
                          ? 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800'
                          : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-400 hover:bg-slate-50'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-card tracking-tight">
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
                    >
                      {member.name}
                    </a>
                  </h3>

                  {/* Role badge & Handle */}
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <span className="text-micro font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {member.role}
                    </span>
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label font-mono text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    >
                      @{member.username}
                    </a>
                  </div>

                  {/* Bio Description */}
                  <p className={`mt-3 text-body-sm line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {member.bio}
                  </p>

                  {/* Skills / Technology Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-micro font-mono px-2 py-0.5 rounded-md border ${
                          darkMode
                            ? 'bg-slate-800/70 text-slate-300 border-slate-700/60'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${member.name}'s profile on GitHub`}
                    className={`w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-label font-medium transition-all duration-200 ${
                      darkMode
                        ? 'bg-slate-800/60 hover:bg-emerald-500/15 text-slate-200 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>View GitHub Profile</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-500" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

Team.displayName = 'Team';

