'use client';

/**
 * Versión compacta de Skills para el layout de dos columnas
 * Similar a "Tecnologías Favoritas" de luisroftl.me
 */

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { skills } from './Skills';
import { FiMonitor, FiServer, FiDatabase, FiTool } from 'react-icons/fi';

export default function SkillsCompact() {
  const { t, language } = useLanguage();
  
  // Obtener todas las tecnologías de todas las categorías
  const allTechnologies = Object.values(skills).flatMap(category => 
    category.technologies.map(tech => ({
      ...tech,
      categoryName: category.title,
      categoryIcon: category.icon,
    }))
  );

  // Seleccionar tecnologías favoritas (las más importantes)
  const favoriteTechs = [
    'React', 'Next.js', 'Node.js', 'Nest.js', 'TypeScript', 
    'Python', 'PostgreSQL', 'MongoDB', 'Firebase', 'Vue', 'Svelte', 'Astro'
  ];

  let technologies = allTechnologies.filter(tech => 
    favoriteTechs.some(fav => {
      const techName = tech.name.toLowerCase();
      const favName = fav.toLowerCase();
      return techName === favName || techName.includes(favName) || favName.includes(techName);
    })
  );

  // Si no hay suficientes, usar las primeras de cada categoría
  if (technologies.length < 6) {
    technologies = Object.values(skills).flatMap(category => 
      category.technologies.slice(0, 2).map(tech => ({
        ...tech,
        categoryName: category.title,
        categoryIcon: category.icon,
      }))
    ).slice(0, 8);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <h2 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">
        {language === 'es' ? 'Tecnologías Favoritas' : 'Favorite Technologies'}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-prose leading-relaxed text-sm sm:text-base mb-6">
        {language === 'es' 
          ? 'A lo largo de mi carrera he trabajado con diversas tecnologías. Me apasiona la exploración de nuevas librerías, frameworks y lenguajes de programación. Aquí tienes una lista.'
          : 'Throughout my career I have worked with various technologies. I am passionate about exploring new libraries, frameworks and programming languages. Here is a list.'}
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {technologies.map((tech, index) => {
          const CategoryIcon = tech.categoryIcon;
          return (
            <motion.li
              key={tech.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <span className="w-11 h-11 grid place-content-center border border-gray-200 dark:border-gray-700 shadow dark:shadow-none bg-white dark:bg-dark-bg-light rounded-lg text-xl">
                <CategoryIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </span>
              <span className="text-gray-900 dark:text-white font-medium">{tech.name}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

