'use client';

/**
 * Error Boundary para capturar errores de renderizado
 * 
 * Previene que errores en componentes rompan toda la aplicación
 */

import { Component, ReactNode } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg px-4">
          <div className="text-center max-w-md">
            <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Algo salió mal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Hubo un error al cargar esta sección. Por favor, recarga la página.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <FiRefreshCw className="w-5 h-5" />
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

