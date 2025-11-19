'use client';

/**
 * Componente para la animación de transición de tema
 * Fade suave y sutil casi imperceptible
 */

import { useEffect, useState, useRef } from 'react';

interface ThemeTransitionProps {
  isTransitioning: boolean;
  originX: number;
  originY: number;
  onComplete: () => void;
  previousTheme: 'light' | 'dark';
}

export default function ThemeTransition({
  isTransitioning,
  originX,
  originY,
  onComplete,
  previousTheme,
}: ThemeTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      setIsAnimating(true);
      
      // Resetear opacidad primero
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'none';
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.willChange = 'opacity';
      }

      // Forzar reflow
      if (overlayRef.current) {
        overlayRef.current.offsetHeight;
      }

      // Iniciar fade suave y rápido
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (overlayRef.current) {
            // Fade muy suave y rápido - casi imperceptible
            overlayRef.current.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            overlayRef.current.style.opacity = '0.15';
          }
        });
      });

      // Fade out muy rápido
      const fadeOutTimer = setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          overlayRef.current.style.opacity = '0';
        }
      }, 50);

      // Completar después de la animación
      const timer = setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.willChange = 'auto';
        }
        setIsAnimating(false);
        onComplete();
      }, 300);

      return () => {
        clearTimeout(timer);
        clearTimeout(fadeOutTimer);
      };
    } else {
      // Reset para la próxima animación
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'none';
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.willChange = 'auto';
      }
    }
  }, [isTransitioning, originX, originY, onComplete]);

  if (!isTransitioning && !isAnimating) {
    return null;
  }

  // Color del nuevo tema con opacidad muy baja para efecto sutil
  const newTheme = previousTheme === 'dark' ? 'light' : 'dark';
  const newBgColor = newTheme === 'dark' ? '#232222' : '#ffffff';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        backgroundColor: newBgColor,
        opacity: 0,
        mixBlendMode: 'normal',
      }}
    />
  );
}

