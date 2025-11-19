'use client';

/**
 * Contexto para manejar el idioma del portafolio
 * Soporta Español e Inglés
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prevenir problemas de hidratación
    setMounted(true);
    
    // Leer idioma guardado o usar preferencia del navegador
    const savedLanguage = localStorage.getItem('language') as Language | null;
    
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.split('-')[0];
      setLanguageState(browserLang === 'en' ? 'en' : 'es');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Actualizar atributo lang del HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // Actualizar lang del HTML cuando cambia el idioma
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  // Siempre proporcionar el contexto, incluso antes de montar
  // Usar valores por defecto durante el SSR
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
