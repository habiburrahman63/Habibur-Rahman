import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches unexpected render errors so a single failing component can never
 * leave visitors with a blank white page.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Surface the failure in the console/logging pipeline for diagnostics.
    console.error('Unhandled UI error:', error, errorInfo.componentStack);
  }

  private handleReload = (): void => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    // The theme class lives on <html>, so `dark:` variants resolve correctly even
    // though this class component has no access to the `darkMode` prop.
    const themed =
      'bg-white text-slate-900 dark:bg-[#090D16] dark:text-slate-100';

    return (
      <div role="alert" className={`min-h-screen flex items-center justify-center p-6 ${themed}`}>
        <div className="w-full max-w-md p-7 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold font-display">Something went wrong</h1>
          <p className="text-body-sm text-slate-400">
            The page hit an unexpected error. Reloading usually resolves it — if it persists, reach
            out at{' '}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-body-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload page</span>
          </button>
        </div>
      </div>
    );
  }
}
