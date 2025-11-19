'use client';

/**
 * Contador de visitas
 * 
 * Muestra el número total de visitas usando Firestore
 * Se actualiza automáticamente cuando alguien visita el sitio
 */

import { useEffect, useState, memo, useCallback } from 'react';
import { getTotalVisits, incrementVisits } from '@/lib/firebase/visits';
import { FiEye } from 'react-icons/fi';

const VisitCounter = memo(function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Obtener total de visitas con retry
  const fetchVisits = useCallback(async (retries = 3) => {
    try {
      const total = await getTotalVisits();
      setVisits(total);
    } catch (error) {
      if (retries > 0) {
        // Reintentar después de 1 segundo
        setTimeout(() => fetchVisits(retries - 1), 1000);
      } else {
        // Si falla después de varios intentos, no mostrar el contador
        console.error('Error fetching visits:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Prevenir problemas de hidratación
    setMounted(true);
    
    // Incrementar visitas solo una vez por sesión
    if (!hasIncremented) {
      incrementVisits()
        .then(() => {
          setHasIncremented(true);
        })
        .catch((error) => {
          // Silenciar errores de Firebase (puede no estar configurado)
          console.error('Error incrementing visits:', error);
        });
    }

    fetchVisits();
  }, [hasIncremented, fetchVisits]);

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

