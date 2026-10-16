import React, { memo } from 'react';
import { ArrowUpRight, Check, Clock, Layers } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesProps {
  darkMode: boolean;
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = memo(({ darkMode, onSelectService }) => {
  return (
    <section
      id="services"
      aria-label="Professional Services Section"
      className={`py-20 lg:py-28 transition-colors ${
        darkMode ? 'bg-slate-950/40 border-y border-slate-800/80' : 'bg-slate-50/70 border-y border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span>Engineering Services</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Offerings</span>
          </div>
          <h2 className="text-section font-display font-bold text-balance">
            Production-grade development for startups, agencies, and product teams.
          </h2>
          <p className={`mt-4 text-lead measure ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Clear timelines, modular deliverables, and complete code ownership. Every engagement is built to scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between group ${
                darkMode
                  ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow'
              }`}
            >
              <div>
                {/* Title */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-card font-display font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 font-mono text-micro text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body-sm text-slate-600 dark:text-slate-400 mb-5">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-micro font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Key Deliverables
                  </div>
                  {service.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-body-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech & CTA */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/40">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-micro font-mono text-slate-600 dark:text-slate-400 mb-4">
                  <Layers className="w-3 h-3 text-slate-500" />
                  {service.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < service.techStack.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-1 py-3 px-2 rounded-lg text-cta font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                >
                  <span className="truncate">Inquire for {service.title}</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

Services.displayName = 'Services';
