import React, { memo, useCallback } from 'react';
import { ArrowUp, Github, Mail, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  darkMode: boolean;
  openResume: () => void;
}

/** Resolved once at module load instead of on every render. */
const COPYRIGHT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = memo(({ darkMode, openResume }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer
      className={`border-t transition-colors py-12 ${
        darkMode ? 'border-slate-800/80 bg-[#070A12]' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/40">
          
          {/* Identity */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              className="text-card font-display font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {PERSONAL_INFO.name}
            </a>
            <p className="text-label text-slate-600 dark:text-slate-400 mt-1">
              {PERSONAL_INFO.title} · Full-Stack Web Development
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-label text-slate-600 dark:text-slate-400 font-medium"
          >
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Services</a>
            <a href="#process" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Process</a>
            <button
              onClick={openResume}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Resume
            </button>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </nav>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit GitHub"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send email"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit LinkedIn"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright & availability */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-label text-slate-500 text-center sm:text-left">
          <div>
            © {COPYRIGHT_YEAR} Habibur Rahman. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Built with MERN Architecture Principles & Modern React</span>
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
