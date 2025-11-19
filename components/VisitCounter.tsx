'use client';

/**
 * Contador de visitas sincronizado con Google Analytics
 * 
 * Muestra el número total de visitas obtenido desde Google Analytics
 * Se actualiza automáticamente cuando alguien visita el sitio
 */

import { useEffect, useState, memo, useRef, useCallback } from 'react';
import { trackEvent, isGAEnabled } from '@/lib/analytics/gtag';
import { FiEye } from 'react-icons/fi';

const VisitCounter = memo(function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);
  const [hasTracked, setHasTracked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Obtener total de visitas desde Google Analytics API
  const fetchVisitsFromGA = useCallback(async (retries = 3): Promise<void> => {
    try {
      const response = await fetch('/api/analytics/visits');
      const data = await response.json();
      
      if (data.visits !== undefined) {
        setVisits(data.visits);
      } else {
        throw new Error('No se pudo obtener el número de visitas');
      }
    } catch (error) {
      console.error('Error fetching visits from GA:', error);
      
      if (retries > 0) {
        // Reintentar después de 2 segundos
        fetchTimeoutRef.current = setTimeout(() => {
          fetchVisitsFromGA(retries - 1);
        }, 2000);
      } else {
        // Si falla después de varios intentos, usar un valor por defecto
        setVisits(0);
      }
    }
  }, []);

  useEffect(() => {
    // Prevenir problemas de hidratación
    setMounted(true);

    // Trackear visita en Google Analytics solo una vez por sesión
    if (!hasTracked && isGAEnabled) {
      trackEvent('page_view', 'engagement', 'visit-counter');
      setHasTracked(true);
    }

    // Obtener visitas desde Google Analytics
    fetchVisitsFromGA();

    // Actualizar visitas cada 30 segundos
    const intervalId = setInterval(() => {
      fetchVisitsFromGA(1); // Solo 1 reintento para actualizaciones periódicas
    }, 30000);

    // Cleanup
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      clearInterval(intervalId);
    };
  }, [hasTracked, fetchVisitsFromGA]);

  // No renderizar hasta que se monte (evitar problemas de hidratación)
  if (!mounted || visits === null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-dark-bg-light rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 z-40">
      <FiEye className="w-4 h-4" />
      <span className="font-medium">{visits.toLocaleString()}</span>
      <span className="text-gray-500 dark:text-gray-400">visitas</span>
    </div>
  );
});

export default VisitCounter;

