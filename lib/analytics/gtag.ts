/**
 * Configuración de Google Analytics 4
 * 
 * Para configurar:
 * 1. Crea una propiedad en Google Analytics 4
 * 2. Obtén el Measurement ID (formato: G-XXXXXXXXXX)
 * 3. Agrega NEXT_PUBLIC_GA_ID en .env.local
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Verifica si GA está configurado
 */
export const isGAEnabled = GA_ID !== '';

/**
 * Inicializa Google Analytics
 * Se ejecuta en el cliente (useEffect)
 */
export function initGA() {
  if (!isGAEnabled || typeof window === 'undefined') return;

  // Cargar el script de gtag.js
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
}

/**
 * Trackea un evento personalizado
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (!isGAEnabled || typeof window === 'undefined') return;

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Trackea una página vista
 */
export function trackPageView(url: string) {
  if (!isGAEnabled || typeof window === 'undefined') return;

  window.gtag?.('config', GA_ID, {
    page_path: url,
  });
}

// Extender el tipo Window para incluir gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

