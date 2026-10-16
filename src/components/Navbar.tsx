import React, { memo, useCallback, useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  openResume: () => void;
  openCommandPalette: () => void;
}

/** Stable id list handed to the scroll spy; never recreated between renders. */
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'services', 'process', 'contact'] as const;

/**
 * Fixed link list in module scope. Declaring it inside the component rebuilt the
 * array on every render, which produced a new `navLinks` identity each time and
 * let it leak into the memo comparisons of the rows below.
 */
const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

export const Navbar: React.FC<NavbarProps> = memo(({
  darkMode,
  setDarkMode,
  openResume,
  openCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS, 'hero');

  // Active-section highlighting is handled by an IntersectionObserver inside
  // `useActiveSection`, so this listener only has to track the sticky state and
  // is throttled to one update per animation frame.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const isScrolled = window.scrollY > 20;
      // Compare before calling setState. The scroll event fires on every frame
      // of a flick gesture, and re-checking the current value inside the
      // updater would enqueue a React render for the vast majority of frames
      // where the boolean has not actually changed.
      setScrolled((previous) => (previous === isScrolled ? previous : isScrolled));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
    };
  }, []);

  // Escape closes the mobile drawer.
  useEscapeKey(() => setMobileMenuOpen(false), mobileMenuOpen);

  // Prevent the page behind the drawer from scrolling while it is open.
  useBodyScrollLock(mobileMenuOpen);

  // Closing the drawer when the viewport grows past the desktop breakpoint
  // prevents it from staying "open" invisibly and reappearing on resize.
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };

    desktopQuery.addEventListener('change', handleBreakpointChange);
    return () => desktopQuery.removeEventListener('change', handleBreakpointChange);
  }, []);

  // Stable handlers keep the memoised nav rows below from re-rendering when the
  // sticky state flips on scroll.
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(!darkMode), [darkMode, setDarkMode]);

  const openResumeFromMenu = useCallback(() => {
    setMobileMenuOpen(false);
    openResume();
  }, [openResume]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            className="text-xl sm:text-2xl font-bold font-display transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:outline-none rounded-sm"
          >
            {PERSONAL_INFO.name}
          </a>

          {/* Zone 2: 4–6 nav links, single-line text with subtle hover underlines.
              Rendered from `lg` upwards: between 768–1023px the full link row
              plus the action buttons do not fit and used to wrap/clip. */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-body-sm font-medium"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? darkMode
                        ? 'text-emerald-400'
                        : 'text-emerald-600'
                      : darkMode
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme switcher, Quick Command Palette, Resume CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={openCommandPalette}
              aria-label="Open command palette"
              title="Quick Search & Actions (Cmd+K)"
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-micro rounded-lg transition-colors border ${
                darkMode
                  ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2 rounded-lg transition-colors border ${
                darkMode
                  ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={openResume}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-body-sm font-semibold rounded-lg transition-all ${
                darkMode
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              Resume
            </button>

            {/* Contact CTA — hidden on the smallest phones where the header row
                cannot fit it; the mobile drawer provides the same action. */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-body-sm font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`lg:hidden p-2 rounded-lg border ${
                darkMode
                  ? 'border-slate-800 bg-slate-900/60 text-slate-300'
                  : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className={`lg:hidden border-b px-4 pt-3 pb-6 transition-all ${
            darkMode
              ? 'bg-[#090D16] border-slate-800 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMobileMenu}
                className={`py-2.5 text-body-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-emerald-500 font-semibold'
                    : darkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/40 space-y-3">
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="w-full py-3 text-body-sm font-semibold rounded-lg bg-emerald-500 text-slate-950 text-center inline-flex items-center justify-center gap-1.5"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={openResumeFromMenu}
                className={`w-full py-3 text-body-sm font-semibold rounded-lg border text-center ${
                  darkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-200'
                    : 'border-slate-300 bg-slate-100 text-slate-800'
                }`}
              >
                View Full Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
