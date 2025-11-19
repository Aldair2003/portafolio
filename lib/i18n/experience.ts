/**
 * Traducciones de la sección de Experiencia
 */

import { Language } from './translations';

export interface ExperienceItem {
  type: 'education' | 'work';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export const experiences: Record<Language, ExperienceItem[]> = {
  es: [
    {
      type: 'education',
      title: 'Ingeniería de Software',
      organization: 'Pontificia Universidad Católica del Ecuador Sede Manabí',
      location: 'Portoviejo, Manabí, Ecuador',
      startDate: '2020',
      endDate: '2025',
      current: true,
      description: [
        'Octavo semestre (último semestre) de Ingeniería de Software',
        'Ganador de dos hackathones consecutivas de la universidad',
        'Enfoque en desarrollo web full stack y arquitectura de software',
        'Proyectos destacados en desarrollo de sistemas web y aplicaciones móviles',
      ],
    },
    {
      type: 'work',
      title: 'Pasante de Desarrollo de Software',
      organization: 'Hospital de Especialidades de Portoviejo',
      location: 'Portoviejo, Manabí, Ecuador',
      startDate: '2024',
      endDate: '2024',
      current: false,
      description: [
        'Apoyo en el mantenimiento y desarrollo de módulos web internos',
        'Utilización de tecnologías modernas para optimizar procesos administrativos',
        'Colaboración en mejoras de sistemas existentes',
      ],
    },
    {
      type: 'work',
      title: 'Pasante Académico',
      organization: 'Pontificia Universidad Católica del Ecuador (PUCEM)',
      location: 'Portoviejo, Manabí, Ecuador',
      startDate: '2023',
      endDate: '2024',
      current: false,
      description: [
        'Colaboración en proyectos universitarios de desarrollo web',
        'Aplicación de principios de programación estructurada y metodologías ágiles',
        'Prácticas formativas en el área de TICs',
      ],
    },
    {
      type: 'work',
      title: 'Desarrollador Principal',
      organization: 'Lupio - Plataforma de Cuidado de Mascotas',
      location: 'Ecuador',
      startDate: '2025',
      endDate: 'Presente',
      current: true,
      description: [
        'Proyecto a gran escala enfocado en el sector veterinario',
        'Participación activa en la arquitectura del sistema y diseño de interfaz',
        'Liderazgo en desarrollo colaborativo',
        'Conecta clínicas, dueños de mascotas y comunidades de adopción',
      ],
    },
    {
      type: 'work',
      title: 'Cofundador y Desarrollador Principal',
      organization: 'Parkintia - Sistema Inteligente de Gestión de Parqueaderos',
      location: 'Ecuador',
      startDate: '2024',
      endDate: 'Presente',
      current: true,
      description: [
        'Proyecto de emprendimiento con IA y visión por computadora',
        'Diseño e implementación del backend con Django REST Framework',
        'Desarrollo del frontend con Next.js',
        'Integración de modelos de inteligencia artificial para detección de vehículos',
      ],
    },
  ],
  en: [
    {
      type: 'education',
      title: 'Software Engineering',
      organization: 'Pontificia Universidad Católica del Ecuador Sede Manabí',
      location: 'Portoviejo, Manabí, Ecuador',
      startDate: '2020',
      endDate: '2025',
      current: true,
      description: [
        'Eighth semester (last semester) of Software Engineering',
        'Winner of two consecutive university hackathons',
        'Focus on full stack web development and software architecture',
        'Outstanding projects in web systems development and mobile applications',
      ],
    },
    {
      type: 'work',
      title: 'Software Development Intern',
      organization: 'Hospital de Especialidades de Portoviejo',
      location: 'Portoviejo, Manabí, Ecuador',
      startDate: '2024',
      endDate: '2024',
      current: false,
      description: [
        'Support in maintenance and development of internal web modules',
        'Use of modern technologies to optimize administrative processes',
        'Collaboration on improvements to existing systems',
      ],
    },
    {
      type: 'work',
      title: 'Academic Intern',
      organization: 'Pontificia Universidad Católica del Ecuador (PUCEM)',
      location: 'Portoviejo, Manabí, Ecuador',
      startDate: '2023',
      endDate: '2024',
      current: false,
      description: [
        'Collaboration on university web development projects',
        'Application of structured programming principles and agile methodologies',
        'Formative practices in the ICT area',
      ],
    },
    {
      type: 'work',
      title: 'Lead Developer',
      organization: 'Lupio - Pet Care Platform',
      location: 'Ecuador',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      description: [
        'Large-scale project focused on the veterinary sector',
        'Active participation in system architecture and interface design',
        'Leadership in collaborative development',
        'Connects clinics, pet owners, and adoption communities',
      ],
    },
    {
      type: 'work',
      title: 'Co-founder and Lead Developer',
      organization: 'Parkintia - Intelligent Parking Management System',
      location: 'Ecuador',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      description: [
        'Entrepreneurship project with AI and computer vision',
        'Backend design and implementation with Django REST Framework',
        'Frontend development with Next.js',
        'Integration of artificial intelligence models for vehicle detection',
      ],
    },
  ],
};

