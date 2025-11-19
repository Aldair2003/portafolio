/**
 * Traducciones del portafolio
 * Español e Inglés
 */

export type Language = 'es' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    description: string;
    viewProjects: string;
    contact: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
  };
  projects: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    featured: string;
    recent: string;
    noProjects: string;
    code: string;
    demo: string;
    noDescription: string;
  };
  skills: {
    title: string;
    subtitle: string;
    summary: string;
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    success: string;
    error: string;
    orDirect: string;
  };
  footer: {
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, mi nombre es',
      title: 'Aldair Toala',
      subtitle: 'Desarrollador',
      description: 'Desarrollador Full Stack especializado en crear soluciones tecnológicas innovadoras. Apasionado por el diseño frontend y el desarrollo de experiencias de usuario excepcionales.',
      viewProjects: 'Ver Proyectos',
      contact: 'Contactar',
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'Conoce más sobre mi trayectoria y pasión por el desarrollo',
      paragraph1: 'Desarrollador Full Stack en último semestre de Ingeniería de Software en la Pontificia Universidad Católica del Ecuador Sede Manabí. Me especializo en diseño frontend y desarrollo full stack con React, Next.js, Node.js y Python, creando interfaces intuitivas y experiencias de usuario excepcionales.',
      paragraph2: 'Ganador de los dos primeros hackathones de mi universidad (2024 y 2025). Cofundador de "Parkintia" y desarrollador en "Lupio", proyectos innovadores que demuestran mi capacidad para crear soluciones tecnológicas de impacto. Soy uno de los mejores estudiantes de mi promoción y formo parte de la primera promoción de Ingeniería de Software de mi universidad, demostrando compromiso, constancia y pasión por crear soluciones tecnológicas que impacten positivamente.',
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Mis proyectos destacados y más trabajos. Todos están disponibles en GitHub.',
      searchPlaceholder: 'Buscar proyectos...',
      featured: 'Proyectos Destacados',
      recent: 'Proyectos Recientes',
      noProjects: 'No se encontraron proyectos con los filtros seleccionados.',
      code: 'Código',
      demo: 'Demo',
      noDescription: 'Sin descripción',
    },
    skills: {
      title: 'Habilidades Técnicas',
      subtitle: 'Tecnologías y herramientas que utilizo para crear soluciones innovadoras',
      summary: 'Especializado en diseño frontend y desarrollo full stack. En constante aprendizaje y actualización con las últimas tecnologías.',
    },
    experience: {
      title: 'Experiencia',
      subtitle: 'Mi trayectoria académica y profesional',
      present: 'Presente',
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      nameLabel: 'Nombre',
      emailLabel: 'Email',
      messageLabel: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: 'Cuéntame sobre tu proyecto...',
      sendButton: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado exitosamente!',
      error: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
      orDirect: 'O escríbeme directamente a:',
    },
    footer: {
      rights: 'Todos los derechos reservados',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hi, my name is',
      title: 'Aldair Toala',
      subtitle: 'Developer',
      description: 'Full Stack Developer specialized in creating innovative technological solutions. Passionate about frontend design and developing exceptional user experiences.',
      viewProjects: 'View Projects',
      contact: 'Contact',
    },
    about: {
      title: 'About Me',
      subtitle: 'Learn more about my journey and passion for development',
      paragraph1: 'Full Stack Developer in my last semester of Software Engineering at Pontificia Universidad Católica del Ecuador Sede Manabí. I specialize in frontend design and full stack development with React, Next.js, Node.js, and Python, creating intuitive interfaces and exceptional user experiences.',
      paragraph2: 'Winner of the first two hackathons at my university (2024 and 2025). Co-founder of "Parkintia" and developer in "Lupio", innovative projects that demonstrate my ability to create impactful technological solutions. I am one of the top students in my class and part of the first Software Engineering graduating class at my university, demonstrating commitment, consistency, and passion for creating technological solutions that positively impact.',
    },
    projects: {
      title: 'Projects',
      subtitle: 'My featured projects and more work. All are available on GitHub.',
      searchPlaceholder: 'Search projects...',
      featured: 'Featured Projects',
      recent: 'Recent Projects',
      noProjects: 'No projects found with the selected filters.',
      code: 'Code',
      demo: 'Demo',
      noDescription: 'No description',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies and tools I use to create innovative solutions',
      summary: 'Specialized in frontend design and full stack development. Constantly learning and updating with the latest technologies.',
    },
    experience: {
      title: 'Experience',
      subtitle: 'My academic and professional journey',
      present: 'Present',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Have a project in mind? Let\'s talk!',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Tell me about your project...',
      sendButton: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Error sending message. Please try again.',
      orDirect: 'Or write to me directly at:',
    },
    footer: {
      rights: 'All rights reserved',
    },
  },
};
