/**
 * API Route para el formulario de contacto usando Brevo
 * 
 * Esta ruta maneja el envío de emails de forma segura desde el servidor
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Obtener API key de Brevo
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY no está configurada');
      return NextResponse.json(
        { success: false, message: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Debug: verificar que la API key se lea correctamente
    console.log('API Key encontrada:', apiKey ? 'Sí' : 'No');
    console.log('API Key length:', apiKey?.length);
    console.log('API Key preview:', apiKey?.substring(0, 20) + '...');

    // Usar fetch directo a la API de Brevo (más confiable que el SDK)
    return await sendEmailWithFetch(name, email, message, apiKey);
  } catch (error: any) {
    console.error('Error enviando email con Brevo:', error);
    console.error('Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.body?.message || error.message,
      data: error.response?.body,
    });
    
    // Mensajes de error más específicos
    if (error.response?.status === 401) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error de autenticación. Verifica que la API key de Brevo sea correcta.' 
        },
        { status: 401 }
      );
    }

    if (error.response?.body?.message) {
      return NextResponse.json(
        { success: false, message: `Error: ${error.response.body.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: `Error al enviar el mensaje: ${error.message || 'Error desconocido'}` 
      },
      { status: 500 }
    );
  }
}

// Función alternativa usando fetch directo a la API de Brevo
async function sendEmailWithFetch(
  name: string,
  email: string,
  message: string,
  apiKey: string
) {
  const toEmail = process.env.CONTACT_EMAIL || 'aldairtoala04@gmail.com';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'aldairtoala04@gmail.com';

  try {
    // Limpiar la API key (eliminar espacios y caracteres extra)
    const cleanApiKey = apiKey.trim();
    
    console.log('API Key length:', cleanApiKey.length);
    console.log('API Key starts with:', cleanApiKey.substring(0, 10));
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': cleanApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Portafolio Web',
          email: senderEmail,
        },
        to: [
          {
            email: toEmail,
            name: 'Aldair Toala',
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `💼 Nuevo mensaje de contacto - ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                          💼 Nuevo Mensaje de Contacto
                        </h1>
                        <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                          Alguien se ha puesto en contacto contigo desde tu portafolio
                        </p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        
                        <!-- Contact Info Card -->
                        <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #6366f1;">
                          <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                            📋 Información de Contacto
                          </h2>
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre:</strong>
                              </td>
                              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                                <span style="color: #1f2937; font-size: 16px; font-weight: 600;">${name}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                              </td>
                              <td style="padding: 12px 0; text-align: right;">
                                <a href="mailto:${email}" style="color: #6366f1; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!-- Message Card -->
                        <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; border: 2px solid #e5e7eb; border-left: 4px solid #8b5cf6;">
                          <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                            💬 Mensaje:
                          </h2>
                          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #8b5cf6;">
                            <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
                          </div>
                        </div>

                        <!-- Action Button -->
                        <div style="text-align: center; margin-top: 30px;">
                          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(name)} - Contacto desde Portafolio" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);">
                            ✉️ Responder Mensaje
                          </a>
                        </div>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                          Este mensaje fue enviado desde tu portafolio web.<br>
                          <span style="color: #9ca3af;">Fecha: ${new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</span>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
        textContent: `
Nuevo mensaje desde tu portafolio

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

---
Este mensaje fue enviado desde tu portafolio web.
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error de Brevo API:', result);
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Error al enviar el mensaje',
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: '¡Mensaje enviado exitosamente!',
      messageId: result.messageId,
    });
  } catch (error: any) {
    console.error('Error enviando email con fetch:', error);
    return NextResponse.json(
      {
        success: false,
        message: `Error al enviar el mensaje: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

