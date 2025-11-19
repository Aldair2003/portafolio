/**
 * Tipos TypeScript compartidos en todo el proyecto
 * 
 * TypeScript ayuda a:
 * - Detectar errores antes de ejecutar
 * - Autocompletado inteligente
 * - Mejor documentación del código
 */

export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  icon?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

