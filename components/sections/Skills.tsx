'use client';

/**
 * Sección de Habilidades
 * 
 * Diseño minimalista tipo badge grid
 * Información completa pero presentada de forma más visual y compacta
 */

import { motion } from 'framer-motion';
import { useState, memo, useCallback } from 'react';
import { FiMonitor, FiServer, FiDatabase, FiTool } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

// Define tus habilidades con descripciones
export const skills = {
  frontend: {
    title: 'Frontend',
    icon: FiMonitor,
    technologies: [
      { name: 'React', level: 'intermediate', description: 'Biblioteca para construir interfaces interactivas' },
      { name: 'Next.js', level: 'intermediate', description: 'Framework React con SSR y optimizaciones' },
      { name: 'Vue', level: 'intermediate', description: 'Framework progresivo para interfaces' },
      { name: 'Svelte', level: 'intermediate', description: 'Framework compilado para aplicaciones rápidas' },
      { name: 'Astro', level: 'intermediate', description: 'Framework para sitios estáticos optimizados' },
      { name: 'HTML/CSS', level: 'advanced', description: 'Fundamentos web y diseño responsivo' },
      { name: 'Tailwind CSS', level: 'advanced', description: 'Framework CSS utility-first' },
      { name: 'JavaScript', level: 'intermediate', description: 'Lenguaje de programación web' },
    ],
  },
  backend: {
    title: 'Backend',
    icon: FiServer,
    technologies: [
      { name: 'Node.js', level: 'intermediate', description: 'Runtime de JavaScript para servidores' },
      { name: 'Nest.js', level: 'intermediate', description: 'Framework Node.js escalable' },
      { name: 'Python', level: 'intermediate', description: 'Lenguaje versátil para desarrollo backend' },
      { name: 'Flask', level: 'intermediate', description: 'Framework web ligero de Python' },
      { name: 'REST APIs', level: 'intermediate', description: 'Diseño e implementación de APIs RESTful' },
    ],
  },
  database: {
    title: 'Base de Datos',
    icon: FiDatabase,
    technologies: [
      { name: 'Firebase', level: 'intermediate', description: 'Plataforma backend como servicio' },
      { name: 'PostgreSQL', level: 'intermediate', description: 'Base de datos relacional open source' },
      { name: 'MongoDB', level: 'intermediate', description: 'Base de datos NoSQL orientada a documentos' },
    ],
  },
  tools: {
    title: 'Herramientas',
    icon: FiTool,
    technologies: [
      { name: 'Git', level: 'intermediate', description: 'Control de versiones distribuido' },
      { name: 'VS Code', level: 'advanced', description: 'Editor de código con extensibilidad' },
      { name: 'Docker', level: 'beginner', description: 'Contenedores para despliegue y desarrollo' },
    ],
  },
};

const levelConfig = {
  beginner: {
    label: 'Principiante',
    dot: 'bg-gray-400',
    border: 'border-gray-300 dark:border-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-800/50',
  },
  intermediate: {
    label: 'Intermedio',
    dot: 'bg-blue-500',
    border: 'border-blue-300 dark:border-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  advanced: {
    label: 'Avanzado',
    dot: 'bg-purple-500',
    border: 'border-purple-300 dark:border-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  expert: {
    label: 'Experto',
    dot: 'bg-green-500',
    border: 'border-green-300 dark:border-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
};

// Componente de Skill Badge - Memoizado para evitar re-renders innecesarios
const SkillBadge = memo(function SkillBadge({ 
  tech, 
  delay 
}: { 
  tech: { name: string; level: string; description: string }; 
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const level = levelConfig[tech.level as keyof typeof levelConfig];

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`
          relative px-5 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer
          ${level.border} ${level.bg}
          hover:shadow-lg hover:scale-105
          ${isHovered ? 'shadow-lg scale-105' : ''}
        `}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {tech.name}
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${level.dot}`} />
            <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:inline">
              {level.label}
            </span>
          </div>
        </div>
        
        {/* Tooltip con descripción */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl z-10 pointer-events-none"
          >
            <p className="text-center">{tech.description}</p>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

const Skills = memo(function Skills() {
  const { t } = useLanguage();
  
  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg-light/50"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.skills.title}
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Skills Grid - Diseño más compacto */}
        <div className="space-y-10">
          {Object.entries(skills).map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const IconComponent = category.icon;
                  return (
                    <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  );
                })()}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Technologies Grid - Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.technologies.map((tech, index) => (
                  <SkillBadge
                    key={tech.name}
                    tech={tech}
                    delay={categoryIndex * 0.1 + index * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.skills.summary}
          </p>
        </motion.div>
      </div>
    </section>
  );
});

export default Skills;

