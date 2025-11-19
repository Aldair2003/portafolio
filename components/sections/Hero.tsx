'use client';

/**
 * Sección Hero - Primera impresión
 * 
 * Esta es la primera sección que ve el visitante
 * Debe ser impactante y mostrar quién eres
 */

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiTwitter } from 'react-icons/fi';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/Aldair2003',
    username: 'Aldair2003',
    ariaLabel: 'Visita mi perfil de GitHub',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    href: 'https://www.linkedin.com/in/aldair-toala-6059831b8/',
    username: 'aldair-toala',
    ariaLabel: 'Visita mi perfil de LinkedIn',
  },
  {
    name: 'Twitter',
    icon: FiTwitter,
    href: 'https://x.com/alda04x',
    username: '@alda04x',
    ariaLabel: 'Visita mi perfil de Twitter',
  },
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:aldairtoala04@gmail.com',
    username: 'aldairtoala04@gmail.com',
    ariaLabel: 'Envíame un email',
  },
];

export default function Hero() {
  const { t } = useLanguage();
  
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 bg-white dark:bg-dark-bg"
    >
      <div className="container mx-auto max-w-4xl text-center">
        {/* Animación de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Saludo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-purple-600 dark:text-purple-400 font-medium mb-4"
          >
            {t.hero.greeting}
          </motion.p>

          {/* Nombre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            {t.hero.title}
          </motion.h1>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
          >
            {t.hero.subtitle}
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              href="#projects"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              {t.hero.viewProjects}
            </Link>
            <Link
              href="#contact"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors"
            >
              {t.hero.contact}
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{social.username}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FiArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

