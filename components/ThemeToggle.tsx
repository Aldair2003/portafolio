'use client';

/**
 * Componente para el toggle de tema
 * Con animación radial tipo "sol apareciendo por zonas"
 */

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import ThemeTransition from './ThemeTransition';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const [previousTheme, setPreviousTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Leer tema actual del HTML
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark');
    
    setIsDark(isDarkMode);
    setPreviousTheme(isDarkMode ? 'dark' : 'light');
    setMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window === 'undefined' || isTransitioning) {
      return;
    }

    // Obtener posición del click (aunque ahora usamos fade, lo mantenemos por compatibilidad)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const html = document.documentElement;
    const currentIsDark = html.classList.contains('dark');
    const newIsDark = !currentIsDark;

    // Guardar tema anterior
    const previousTheme = currentIsDark ? 'dark' : 'light';
    setPreviousTheme(previousTheme);
    
    // Configurar origen y activar transición
    setTransitionOrigin({ x, y });
    setIsTransitioning(true);

    // Cambiar tema de forma inmediata pero con fade suave
    requestAnimationFrame(() => {
      if (newIsDark) {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.add('light');
        html.classList.remove('dark');
      }

      // Guardar preferencia
      const themeToSave = newIsDark ? 'dark' : 'light';
      localStorage.setItem('theme', themeToSave);
      
      // Actualizar estado
      setIsDark(newIsDark);
    });
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <FiMoon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      <ThemeTransition
        isTransitioning={isTransitioning}
        originX={transitionOrigin.x}
        originY={transitionOrigin.y}
        onComplete={handleTransitionComplete}
        previousTheme={previousTheme}
      />
      <button
        onClick={handleToggle}
        className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors relative z-10"
        aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        type="button"
        disabled={isTransitioning}
      >
        {isDark ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </button>
    </>
  );
}

