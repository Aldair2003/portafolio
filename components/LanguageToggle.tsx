'use client';

/**
 * Componente para cambiar entre español e inglés
 */

import { useState, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        aria-label="Toggle language"
        disabled
      >
        <FiGlobe className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors flex items-center gap-2"
      aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
      title={language === 'es' ? 'English' : 'Español'}
    >
      <FiGlobe className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-medium">
        {language === 'es' ? 'ES' : 'EN'}
      </span>
    </button>
  );
}
