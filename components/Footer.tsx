'use client';

/**
 * Footer del portafolio
 * 
 * Incluye:
 * - Links sociales
 * - Copyright
 * - Información adicional
 */

import { memo, useMemo } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/Aldair2003',
    username: 'Aldair2003',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    href: 'https://www.linkedin.com/in/aldair-toala-6059831b8/',
    username: 'aldair-toala',
  },
  {
    name: 'Twitter',
    icon: FiTwitter,
    href: 'https://x.com/alda04x',
    username: '@alda04x',
  },
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:aldairtoala04@gmail.com',
    username: 'aldairtoala04@gmail.com',
  },
];

const Footer = memo(function Footer() {
  const { t, language } = useLanguage();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gray-50 dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Aldair. {t.footer.rights}.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{social.username}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            {language === 'es' 
              ? 'Desarrollado con Next.js, TypeScript y Tailwind CSS'
              : 'Built with Next.js, TypeScript and Tailwind CSS'}
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

