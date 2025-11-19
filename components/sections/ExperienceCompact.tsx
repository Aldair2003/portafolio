'use client';

/**
 * Versión compacta de Experience para el layout de dos columnas
 * Similar a luisroftl.me
 */

import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { experiences } from '@/lib/i18n/experience';

export default function ExperienceCompact() {
  const { t, language } = useLanguage();
  const experienceList = experiences[language];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <h2 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">
        {t.experience.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-prose leading-relaxed text-sm sm:text-base mb-6">
        {t.experience.subtitle}
      </p>
      
      <ol className="relative mt-4 sm:mt-6 border-l border-gray-200 dark:border-gray-700">
        {experienceList.map((exp, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="mb-10 ms-6"
          >
            {/* Icono del timeline */}
            <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900">
              <svg
                className="w-2.5 h-2.5 text-purple-800 dark:text-purple-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"></path>
              </svg>
            </span>

            {/* Contenido */}
            <h3 className="flex items-center justify-between mb-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {exp.title}
              {index === 0 && (
                <span className="text-center bg-purple-100 text-purple-800 text-xs sm:text-sm font-medium px-1 md:px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-200">
                  {language === 'es' ? 'Más Reciente' : 'Most Recent'}
                </span>
              )}
            </h3>
            <time className="block mb-2 text-xs font-normal leading-none text-gray-600 dark:text-gray-400">
              {exp.startDate} - {exp.current ? t.experience.present : exp.endDate}
            </time>

            {/* Resumen */}
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-300 leading-relaxed">
              {exp.organization}
            </p>

            {/* Descripciones */}
            <ul className="mb-3 text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

