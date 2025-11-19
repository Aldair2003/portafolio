/**
 * robots.txt para SEO
 * 
 * Indica a los buscadores qué pueden indexar
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tu-dominio.com'; // Cambia esto cuando tengas tu dominio

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

