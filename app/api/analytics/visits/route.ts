/**
 * API Route para obtener el total de visitas desde Google Analytics
 * 
 * IMPORTANTE: Para obtener datos reales de Google Analytics, necesitas:
 * 1. Habilitar Google Analytics Data API en Google Cloud Console
 * 2. Crear un Service Account y descargar la clave JSON
 * 3. Configurar las variables de entorno:
 *    - GOOGLE_APPLICATION_CREDENTIALS (ruta al archivo JSON)
 *    - NEXT_PUBLIC_GA_PROPERTY_ID (ID de la propiedad GA4, formato: 123456789)
 * 
 * Por ahora, esta API retorna un valor estimado basado en eventos trackeados.
 * Para obtener el total real de visitas, configura la Google Analytics Data API.
 */

import { NextResponse } from 'next/server';

const GA_PROPERTY_ID = process.env.NEXT_PUBLIC_GA_PROPERTY_ID || '';

/**
 * Obtiene el total de visitas desde Google Analytics Data API v1
 * 
 * Requiere:
 * - GOOGLE_APPLICATION_CREDENTIALS: Ruta al archivo JSON de Service Account
 * - NEXT_PUBLIC_GA_PROPERTY_ID: ID de la propiedad GA4
 */
async function getTotalVisitsFromGA(): Promise<number> {
  // Si no hay Property ID configurado, retornar 0 inmediatamente
  // Esto evita que Next.js intente resolver el módulo en tiempo de compilación
  if (!GA_PROPERTY_ID) {
    return 0;
  }

  // Verificar si hay credenciales configuradas
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsPath) {
    return 0;
  }

  // Solo intentar importar el módulo si realmente está configurado
  // Usamos una función dinámica para evitar que Next.js lo analice en tiempo de compilación
  try {
    // Importación dinámica usando una función que Next.js no puede analizar estáticamente
    const dynamicRequire = new Function('id', 'return require(id)');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let analyticsModule: { BetaAnalyticsDataClient?: new (options: { keyFilename: string }) => any } | undefined;
    try {
      analyticsModule = dynamicRequire('@google-analytics/data');
    } catch {
      // El módulo no está instalado, retornar 0 silenciosamente
      return 0;
    }

    if (!analyticsModule || !analyticsModule.BetaAnalyticsDataClient) {
      return 0;
    }

    const BetaAnalyticsDataClient = analyticsModule.BetaAnalyticsDataClient;
    
    // Inicializar el cliente de Analytics Data API
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: credentialsPath,
    });

    // Obtener el total de usuarios únicos (total de visitas)
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2020-01-01', // Desde el inicio de la propiedad
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'totalUsers', // Total de usuarios únicos
        },
      ],
    });

    // Extraer el total de usuarios
    if (response.rows && response.rows.length > 0) {
      const totalUsers = response.rows[0].metricValues?.[0]?.value;
      return totalUsers ? parseInt(totalUsers, 10) : 0;
    }

    return 0;
  } catch (error) {
    // Manejar errores de forma silenciosa
    // No loguear errores de módulo no encontrado para evitar spam en consola
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    const errorCode = (error as { code?: string }).code;
    
    // Solo loguear errores que no sean de módulo no encontrado
    if (errorCode !== 'MODULE_NOT_FOUND' && !errorMessage.includes('Cannot find module')) {
      console.error('Error obteniendo visitas de GA:', errorMessage);
    }
    return 0;
  }
}

/**
 * Obtiene un valor estimado basado en eventos trackeados
 * Esto es un fallback cuando la API de GA no está configurada
 */
function getEstimatedVisits(): number {
  // Por ahora retornamos 0, pero podrías implementar lógica aquí
  // Por ejemplo, leer desde un archivo de estadísticas o base de datos
  return 0;
}

export async function GET() {
  try {
    // Intentar obtener desde Google Analytics Data API
    let totalVisits = await getTotalVisitsFromGA();
    
    // Si no se pudo obtener de GA, usar estimación
    if (totalVisits === 0) {
      totalVisits = getEstimatedVisits();
    }
    
    // Si no hay Property ID configurado, retornar mensaje informativo
    if (!GA_PROPERTY_ID) {
      return NextResponse.json(
        { 
          visits: 0, 
          message: 'Para obtener datos reales de Google Analytics, configura NEXT_PUBLIC_GA_PROPERTY_ID y las credenciales de Google Cloud.',
          source: 'fallback',
          configured: false
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json({
      visits: totalVisits,
      source: totalVisits > 0 ? 'google-analytics-api' : 'fallback',
      propertyId: GA_PROPERTY_ID,
      configured: true,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error en API de visitas:', errorMessage);
    return NextResponse.json(
      { 
        visits: 0, 
        error: errorMessage,
        source: 'error',
        configured: false
      },
      { status: 500 }
    );
  }
}

