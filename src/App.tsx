import { Suspense, useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollProgressBar } from './hooks/useScrollProgressBar';
import { lazyWithIdlePreload } from './utils/lazyWithIdlePreload';

/**
 * The two global overlays are only ever mounted on an explicit user action, so
 * they are pulled out of the initial bundle. Both are pre-warmed during browser
 * idle time (and again the instant the user commits to opening them), which
 * keeps the split invisible while removing their code from the critical path.
 *
 * Both modules use named exports, so each factory re-publishes the component as
 * `default` to satisfy `React.lazy`.
 */
const { Component: ResumeModal, preload: preloadResumeModal } = lazyWithIdlePreload(() =>
  import('./components/ResumeModal').then((module) => ({ default: module.ResumeModal })),
);

const { Component: CommandPalette, preload: preloadCommandPalette } = lazyWithIdlePreload(() =>
  import('./components/CommandPalette').then((module) => ({ default: module.CommandPalette })),
);

const THEME_STORAGE_KEY = 'portfolio_theme';

/** Reads the stored theme. Storage access can throw in private mode / with cookies blocked. */
function readStoredTheme(): boolean {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved !== null ? saved === 'dark' : true; // Dark mode primary by default
  } catch {
    return true;
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(readStoredTheme);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const scrollBarRef = useScrollProgressBar<HTMLDivElement>();

  // Sync theme changes with DOM
  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
    } catch {
      // Persisting the preference is best-effort only.
    }

    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  /**
   * Stable identities for every handler handed to a child. Without this the
   * inline arrows used previously would be new functions on every `App` render,
   * which defeats the `memo()` wrappers and re-renders every section of the page
   * whenever any overlay state changes.
   */
  const openResume = useCallback(() => {
    preloadResumeModal();
    setIsResumeOpen(true);
  }, []);

  const closeResume = useCallback(() => setIsResumeOpen(false), []);

  const openCommandPalette = useCallback(() => {
    preloadCommandPalette();
    setIsCmdPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => setIsCmdPaletteOpen(false), []);

  const handleSelectService = useCallback((serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-[#090D16] text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* Keyboard skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-500 focus:text-slate-950 focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Scroll Progress Bar — written to the DOM imperatively so scrolling
          never triggers a React re-render of the sections below. */}
      <div
        ref={scrollBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-50 origin-left pointer-events-none"
        style={{ width: '0%' }}
        aria-hidden="true"
      />

      {/* Top 3-Zone Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openResume={openResume}
        openCommandPalette={openCommandPalette}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero darkMode={darkMode} openResume={openResume} />

        {/* Developer Stats Section */}
        <Stats darkMode={darkMode} />

        {/* About Section */}
        <About darkMode={darkMode} openResume={openResume} />

        {/* Advanced Skills Section */}
        <Skills darkMode={darkMode} />

        {/* Featured Projects & Case Studies */}
        <Projects darkMode={darkMode} />

        {/* Professional Services */}
        <Services
          darkMode={darkMode}
          onSelectService={handleSelectService}
        />

        {/* Development Workflow Process */}
        <Process darkMode={darkMode} />

        {/* Attributable Client & Peer Testimonials */}
        <Testimonials darkMode={darkMode} />

        {/* Contact Section */}
        <Contact
          darkMode={darkMode}
          prefilledSubject={prefilledService}
        />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} openResume={openResume} />

      {/*
        Both overlays suspend on their very first render only. Their chunks are
        requested on idle and again on the triggering interaction, so nothing is
        ever shown in place of a dialog while it resolves.
      */}
      <Suspense fallback={null}>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={closeResume} darkMode={darkMode} />
        )}
      </Suspense>

      {/* Quick Command Palette (Cmd+K) */}
      <Suspense fallback={null}>
        {isCmdPaletteOpen && (
          <CommandPalette
            isOpen={isCmdPaletteOpen}
            onClose={closeCommandPalette}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            openResume={openResume}
          />
        )}
      </Suspense>
    </div>
  );
}
