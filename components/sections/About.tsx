'use client';

/**
 * Sección Sobre Mí
 * 
 * Cuenta tu historia, tus intereses y tu pasión por el desarrollo
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg-light/50"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.paragraph1}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.paragraph2}
            </p>
          </motion.div>

          {/* Imagen - cambia según el tema */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
              {/* Imagen para modo claro */}
              <Image
                src="/fotoblanca.JPEG"
                alt="Aldair Toala"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover dark:hidden"
                priority
              />
              {/* Imagen para modo oscuro */}
              <Image
                src="/fotonegra.JPEG"
                alt="Aldair Toala"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hidden dark:block"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

