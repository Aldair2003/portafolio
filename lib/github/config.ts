/**
 * Configuración de proyectos destacados y categorías
 * 
 * Fácil de modificar: solo agrega o quita nombres de repositorios
 */

// Proyectos destacados (se muestran primero)
export const FEATURED_PROJECTS = [
  'web-kriss-nails',
  'catering-Front',
  'gestion-abogados-sistema',
  'sistema-salud-fronted',
  'parking-front'
];

// Categorías de proyectos (basadas en el nombre o lenguaje)
export const PROJECT_CATEGORIES = {
  'Frontend': ['frontend', 'front', 'web', 'ui', 'client'],
  'Backend': ['backend', 'api', 'server'],
  'Full Stack': ['fullstack', 'full-stack', 'sistema', 'gestion'],
  'Otros': [] // Proyectos que no coincidan con ninguna categoría
};

/**
 * Determina la categoría de un proyecto basándose en su nombre
 */
export function getProjectCategory(repoName: string, language: string | null): string {
  const nameLower = repoName.toLowerCase();
  
  for (const [category, keywords] of Object.entries(PROJECT_CATEGORIES)) {
    if (category === 'Otros') continue;
    
    if (keywords.some(keyword => nameLower.includes(keyword))) {
      return category;
    }
  }
  
  return 'Otros';
}

