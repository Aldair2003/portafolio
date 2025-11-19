/**
 * Página principal del portafolio
 * 
 * Layout de dos columnas similar a luisroftl.me
 * - Columna izquierda: Perfil (avatar, nombre, redes, CV)
 * - Columna derecha: Contenido (Sobre mí, Tecnologías, Experiencia)
 * - Secciones completas: Proyectos y Contacto
 */

import { Suspense, lazy } from 'react';
import ProfileSidebar from '@/components/sections/ProfileSidebar';
import AboutCompact from '@/components/sections/AboutCompact';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy load de componentes pesados
const Projects = lazy(() => import('@/components/sections/Projects'));
const Contact = lazy(() => import('@/components/sections/Contact'));

// Componente de carga para Suspense
function ProjectsLoading() {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-bg"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Cargando proyectos...
          </p>
        </div>
        </div>
    </section>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
          {/* Layout principal de dos columnas */}
          <main className="px-6 lg:px-0 mx-auto max-w-4xl pt-20 sm:pt-24 pb-20">
        <section className="flex flex-col gap-12 md:gap-20 sm:gap-16 sm:flex-row">
          {/* Columna izquierda - Perfil */}
          <ProfileSidebar />

          {/* Columna derecha - Contenido */}
          <div className="flex-1">
            <AboutCompact />
          </div>
        </section>
      </main>

      {/* Secciones completas */}
      <Skills />
      <Experience />
      <Suspense fallback={<ProjectsLoading />}>
        <Projects />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </ErrorBoundary>
  );
}
