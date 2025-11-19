'use client';

/**
 * Sección de Proyectos
 * 
 * Muestra tus proyectos de GitHub automáticamente
 * Con proyectos destacados y opción para ver todos por categorías
 */

import { useState, useMemo, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useGitHubRepos } from '@/lib/github/hooks';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';
import { FEATURED_PROJECTS } from '@/lib/github/config';
import type { GitHubRepo } from '@/lib/github/api';
import { useLanguage } from '@/contexts/LanguageContext';

// Función para obtener el nombre de categoría según el idioma
function getCategoryName(category: string, lang: 'es' | 'en'): string {
  const translations: Record<string, { es: string; en: string }> = {
    'Destacados': { es: 'Destacados', en: 'Featured' },
    'Recientes': { es: 'Recientes', en: 'Recent' },
    'Sin lenguaje': { es: 'Sin lenguaje', en: 'No language' },
  };
  
  return translations[category]?.[lang] || category;
}

// Orden específico de categorías
const CATEGORY_ORDER = [
  'Destacados',
  'Recientes',
  'Assembly',
  'CSS',
  'Dockerfile',
  'HTML',
  'Java',
  'JavaScript',
  'Kotlin',
  'Python',
  'Sin lenguaje',
  'Svelte',
  'TypeScript'
];

export default function Projects() {
  const { t, language } = useLanguage();
  const { repos, isLoading, isError } = useGitHubRepos();
  
  // Estado inicial basado en el idioma
  const [selectedCategory, setSelectedCategory] = useState<string>(
    language === 'es' ? 'Destacados' : 'Featured'
  );
  
  // Actualizar categoría cuando cambia el idioma
  useEffect(() => {
    const defaultCategory = language === 'es' ? 'Destacados' : 'Featured';
    // Solo actualizar si la categoría actual es una de las traducibles
    if (selectedCategory === 'Destacados' || selectedCategory === 'Featured') {
      // Usar setTimeout para evitar el warning del linter
      setTimeout(() => {
        setSelectedCategory(defaultCategory);
      }, 0);
    }
  }, [language, selectedCategory]);

  // Separar proyectos destacados y el resto
  const { featuredRepos, categorizedRepos, recentRepos } = useMemo(() => {
    // Si no hay repos, retornar valores vacíos
    if (!repos || repos.length === 0) {
      return {
        featuredRepos: [],
        categorizedRepos: {},
        recentRepos: []
      };
    }
    
    const featured: GitHubRepo[] = [];
    const others: GitHubRepo[] = [];
    
    repos.forEach((repo) => {
      // Comparar nombres sin importar mayúsculas/minúsculas, guiones y espacios
      const normalizeName = (name: string) => 
        name.toLowerCase().trim().replace(/[-_\s]/g, '');
      
      const isFeatured = FEATURED_PROJECTS.some(
        featuredName => normalizeName(featuredName) === normalizeName(repo.name)
      );
      
      if (isFeatured) {
        featured.push(repo);
      } else {
        others.push(repo);
      }
    });
    
    
    // Ordenar destacados según el orden en FEATURED_PROJECTS
    featured.sort((a, b) => {
      const indexA = FEATURED_PROJECTS.findIndex(
        name => name.toLowerCase() === a.name.toLowerCase()
      );
      const indexB = FEATURED_PROJECTS.findIndex(
        name => name.toLowerCase() === b.name.toLowerCase()
      );
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });
    
    // Proyectos recientes (últimos 6 actualizados, excluyendo destacados)
    const recent = [...others]
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6);
    
    // Agrupar TODOS los proyectos por lenguaje (incluyendo destacados para que aparezcan en sus categorías)
    const categorized: Record<string, GitHubRepo[]> = {};
    repos.forEach((repo) => {
      const category = repo.language || 'Sin lenguaje';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(repo);
    });
    
    return {
      featuredRepos: featured,
      categorizedRepos: categorized,
      recentRepos: recent
    };
  }, [repos]);

  // Obtener todas las categorías disponibles en el orden especificado
  const availableCategories = useMemo(() => {
    const featuredKey = language === 'es' ? 'Destacados' : 'Featured';
    const recentKey = language === 'es' ? 'Recientes' : 'Recent';
    const allCategories = new Set<string>([featuredKey, recentKey]);
    
    // Agregar todos los lenguajes encontrados
    Object.keys(categorizedRepos).forEach(lang => {
      allCategories.add(lang);
    });
    
    // Ordenar según el orden especificado
    const ordered: string[] = [];
    CATEGORY_ORDER.forEach(category => {
      const translatedCategory = getCategoryName(category, language);
      if (allCategories.has(translatedCategory) || allCategories.has(category)) {
        ordered.push(translatedCategory);
      }
    });
    
    // Agregar cualquier categoría que no esté en el orden (por si acaso)
    allCategories.forEach(category => {
      if (!ordered.includes(category)) {
        ordered.push(category);
      }
    });
    
    return ordered;
  }, [categorizedRepos, language]);


  // Obtener proyectos de la categoría seleccionada (Destacados, Recientes o lenguajes)
  const categoryRepos = useMemo(() => {
    let reposToShow: GitHubRepo[] = [];
    
    const featuredKey = language === 'es' ? 'Destacados' : 'Featured';
    const recentKey = language === 'es' ? 'Recientes' : 'Recent';
    
    if (selectedCategory === featuredKey || selectedCategory === 'Destacados') {
      reposToShow = featuredRepos;
    } else if (selectedCategory === recentKey || selectedCategory === 'Recientes') {
      reposToShow = recentRepos;
    } else {
      reposToShow = categorizedRepos[selectedCategory] || [];
    }
    
    return reposToShow;
  }, [selectedCategory, featuredRepos, recentRepos, categorizedRepos, language]);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-bg scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.projects.title}
          </h2>
          <div className="w-24 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Botones de categorías */}
        {availableCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 flex flex-wrap gap-3 justify-center"
          >
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Lista de proyectos */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {language === 'es' ? 'Cargando proyectos...' : 'Loading projects...'}
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">
              {language === 'es' 
                ? 'Error al cargar los proyectos. Por favor, recarga la página.'
                : 'Error loading projects. Please reload the page.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              {language === 'es' ? 'Recargar' : 'Reload'}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Proyectos de la categoría seleccionada */}
            {categoryRepos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {selectedCategory === 'Destacados' || selectedCategory === 'Featured' 
                    ? t.projects.featured 
                    : selectedCategory === 'Recientes' || selectedCategory === 'Recent'
                    ? t.projects.recent
                    : selectedCategory}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryRepos.map((repo, index) => (
                    <ProjectCard key={repo.id} repo={repo} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Mensaje si no hay proyectos en la categoría seleccionada */}
            {categoryRepos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {t.projects.noProjects}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Componente de tarjeta de proyecto - Memoizado para evitar re-renders
const ProjectCard = memo(function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-dark-bg-light rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {repo.name}
        </h3>
        {repo.language && (
          <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
            {repo.language}
          </span>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {repo.description || t.projects.noDescription}
      </p>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <FiStar className="w-4 h-4" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch className="w-4 h-4" />
          {repo.forks_count}
        </span>
      </div>

      <div className="flex gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
        >
          <FiGithub className="w-4 h-4" />
          {t.projects.code}
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiExternalLink className="w-4 h-4" />
            {t.projects.demo}
          </a>
        )}
      </div>
    </motion.div>
  );
});

