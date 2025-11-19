'use client';

/**
 * Sidebar de perfil (columna izquierda)
 * Similar a luisroftl.me
 * Muestra avatar, nombre, título, redes sociales y CV
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiDownload } from 'react-icons/fi';
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

const ProfileSidebar = memo(function ProfileSidebar() {
  const { t, language } = useLanguage();
  
  return (
    <aside className="sm:w-1/4 sm:sticky sm:h-fit sm:top-24 flex flex-col items-center sm:items-start">
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-40 h-40 relative overflow-hidden flex bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"
      >
        {/* Imagen para modo claro */}
        <Image
          src="/fotoblanca.JPEG"
          alt="Aldair Toala"
          fill
          sizes="160px"
          className="object-cover rounded-lg absolute inset-0 dark:opacity-0 dark:pointer-events-none opacity-100"
          style={{
            transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          priority
        />
        {/* Imagen para modo oscuro */}
        <Image
          src="/fotonegra.JPEG"
          alt="Aldair Toala"
          fill
          sizes="160px"
          className="object-cover rounded-lg absolute inset-0 opacity-0 dark:opacity-100 dark:pointer-events-auto pointer-events-none"
          style={{
            transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          priority
        />
      </motion.div>

      {/* Nombre */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-purple-600 dark:text-purple-400 mt-4 font-bold tracking-tight sm:text-xl text-center sm:text-left"
      >
        {t.hero.title}
      </motion.h1>

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-gray-700 dark:text-gray-300 text-center sm:text-left">
          {t.hero.subtitle}
        </p>
      </motion.div>

      {/* Redes Sociales */}
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 flex flex-col items-center sm:items-start gap-2 w-full"
      >
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <li key={social.name} className="w-full">
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
              >
                <Icon className="w-4 h-4" />
                <span>{social.username}</span>
              </Link>
            </li>
          );
        })}
        
        {/* Botón Descargar CV */}
        <li className="mt-3 w-full">
          <a
            href="/CV_Aldair_Toala.pdf"
            download="CV_Aldair_Toala.pdf"
            className="rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-3 py-2 text-sm flex gap-2 items-center justify-center font-medium hover:bg-purple-100 dark:hover:bg-purple-900/20 w-full transition-colors"
            aria-label={language === 'es' ? 'Descargar CV' : 'Download CV'}
          >
            <FiDownload className="w-4 h-4" />
            <span>{language === 'es' ? 'Descargar CV' : 'Download CV'}</span>
          </a>
        </li>
      </motion.ul>
    </aside>
  );
});

export default ProfileSidebar;

