"use client";

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <svg 
                className="w-24 h-24 mx-auto text-white/20 mb-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
              <h1 className="font-humane text-4xl md:text-6xl mb-4">
                Oops!
              </h1>
              <h2 className="font-Antonio text-xl md:text-2xl text-white/80 mb-6">
                Something went wrong
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                We encountered an unexpected error. Don&apos;t worry, our team has been notified 
                and we&apos;re working to fix this issue.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white text-black font-Antonio rounded-lg hover:bg-white/90 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-white/20 font-Antonio rounded-lg hover:border-white/40 transition-colors"
              >
                Go Home
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-white/5 rounded-lg p-4">
                <summary className="cursor-pointer font-Antonio text-sm text-white/70 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-white/60 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 