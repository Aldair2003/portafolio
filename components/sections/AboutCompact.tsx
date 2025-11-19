'use client';

/**
 * Versión compacta de Sobre Mí para el layout de dos columnas
 */

import { motion } from 'framer-motion';
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutCompact = memo(function AboutCompact() {
  const { t } = useLanguage();
  
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-8 sm:mt-0"
    >
      <h2 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">
        {t.about.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-prose leading-relaxed text-sm sm:text-base">
        {t.about.paragraph1}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-prose leading-relaxed text-sm sm:text-base">
        {t.about.paragraph2}
      </p>
    </motion.div>
  );
});

export default AboutCompact;

