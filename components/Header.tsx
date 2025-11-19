'use client';

/**
 * Header/Navegación del portafolio
 * 
 * Incluye:
 * - Logo/Nombre
 * - Navegación responsive
 * - Toggle de tema oscuro/claro
 */

import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = memo(function Header() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navItems = useMemo(() => [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ], [t.nav]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      // Iniciar animación de cierre
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuClosing(false);
      }, 300); // Duración de la animación de cierre
    } else {
      setIsMenuOpen(true);
      setIsMenuClosing(false);
    }
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuClosing(false);
      }, 300);
    }
  }, [isMenuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = window.innerWidth >= 640 ? 64 : 56; // h-14 (56px) móvil, h-16 (64px) desktop
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 10; // 10px extra de espacio
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    // Prevenir problemas de hidratación
    setMounted(true);
    
    // Verificar scroll inicial
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Evitar problemas de hidratación: usar clase por defecto hasta que se monte
  const headerClass = mounted && isScrolled
    ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm'
    : 'bg-transparent';
  
  // Clase para el header cuando el menú móvil está abierto
  const headerMenuOpenClass = isMenuOpen
    ? 'bg-white dark:bg-dark-bg shadow-lg'
    : headerClass;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerMenuOpenClass}`}
    >
      <nav className="w-full px-4 sm:px-5 md:px-6 lg:container lg:mx-auto lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Aldair Toala
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Toggle, Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {(isMenuOpen || isMenuClosing) && (
          <div 
            className={`md:hidden py-4 border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ${
              isMenuClosing ? 'mobile-menu-closing' : 'mobile-menu-opening'
            }`}
          >
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 px-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-dark-bg-light/50 rounded-lg transition-colors cursor-pointer font-medium"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
});

export default Header;

