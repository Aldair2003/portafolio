/**
 * Funciones para el formulario de contacto usando Brevo
 * 
 * Brevo (anteriormente Sendinblue) es un servicio de email transaccional
 * más confiable y con mejor plan gratuito (300 emails/día)
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Inicializa el servicio (ya no necesario con Brevo, pero se mantiene para compatibilidad)
 */
export function initEmailJS() {
  // No es necesario con Brevo, pero mantenemos la función para compatibilidad
}

/**
 * Envía el formulario de contacto usando la API route de Next.js
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Error al enviar el mensaje',
      };
    }

    return {
      success: result.success,
      message: result.message || '¡Mensaje enviado exitosamente!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
    };
  }
}

