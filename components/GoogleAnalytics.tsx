'use client';

/**
 * Componente para inicializar Google Analytics
 * 
 * Se ejecuta solo en el cliente (useEffect)
 * Carga el script de GA4 de forma asíncrona
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView, isGAEnabled } from '@/lib/analytics/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Inicializar GA solo una vez
    if (isGAEnabled) {
      initGA();
    }
  }, []);

  useEffect(() => {
    // Trackear cada cambio de página
    if (isGAEnabled && pathname) {
      const url = pathname + (searchParams?.toString() || '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return null; // Este componente no renderiza nada
}

