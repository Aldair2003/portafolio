'use client';

/**
 * Sección de Experiencia y Educación
 * 
 * Muestra tu experiencia laboral y educación
 */

import { motion } from 'framer-motion';
import { memo } from 'react';
import { FiBriefcase, FiBook, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { experiences } from '@/lib/i18n/experience';

const Experience = memo(function Experience() {
  const { t, language } = useLanguage();
  const experienceList = experiences[language];
  
  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-bg scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.experience.title}
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.experience.subtitle}
          </p>
        </motion.div>

        <div className="space-y-8">
          {experienceList.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-purple-500 dark:border-purple-400"
            >
              {/* Icono */}
              <div className="absolute -left-4 top-0 w-8 h-8 bg-purple-500 dark:bg-purple-400 rounded-full flex items-center justify-center">
                {exp.type === 'education' ? (
                  <FiBook className="w-4 h-4 text-white" />
                ) : (
                  <FiBriefcase className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Contenido */}
              <div className="bg-white dark:bg-dark-bg-light rounded-lg p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    <FiCalendar className="w-4 h-4" />
                    {exp.startDate} - {exp.current ? t.experience.present : exp.endDate}
                  </span>
                </div>
                <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mb-2">
                  {exp.organization}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {exp.location}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;

