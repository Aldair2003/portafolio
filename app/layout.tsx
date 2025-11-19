import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import VisitCounter from "@/components/VisitCounter";

/**
 * Optimización de fuentes con next/font
 * 
 * next/font automáticamente:
 * - Optimiza las fuentes
 * - Elimina caracteres no usados
 * - Pre-carga las fuentes
 * - Evita layout shift
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Muestra texto mientras carga la fuente
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Aldair Toala - Desarrollador Full Stack",
    template: "%s | Aldair Toala",
  },
  description:
    "Portafolio de Aldair Toala, desarrollador Full Stack. Estudiante de Ingeniería de Software en último semestre. Especializado en diseño frontend y desarrollo de soluciones tecnológicas innovadoras.",
  keywords: [
    "desarrollador",
    "software",
    "ingeniería de software",
    "portafolio",
    "web development",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Aldair Toala" }],
  creator: "Aldair Toala",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://aldadev.com", // Tu dominio personalizado
    title: "Aldair Toala - Desarrollador Full Stack",
    description:
      "Portafolio de Aldair Toala, desarrollador Full Stack. Estudiante de Ingeniería de Software en último semestre. Especializado en diseño frontend y desarrollo de soluciones innovadoras.",
    siteName: "Aldair Toala Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aldair Toala - Desarrollador Full Stack",
    description:
      "Portafolio de Aldair Toala, desarrollador Full Stack. Estudiante de Ingeniería de Software en último semestre. Especializado en diseño frontend y desarrollo de soluciones innovadoras.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Agrega tu código de verificación de Google Search Console cuando lo tengas
    // google: "tu-codigo-de-verificacion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Configurar tema
                  const savedTheme = localStorage.getItem('theme');
                  let theme = 'light';
                  
                  if (savedTheme === 'dark' || savedTheme === 'light') {
                    theme = savedTheme;
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }
                  
                  const html = document.documentElement;
                  html.classList.remove('light', 'dark');
                  html.classList.add(theme);
                  html.setAttribute('data-theme', theme);
                  
                  // Configurar idioma
                  const savedLanguage = localStorage.getItem('language');
                  if (savedLanguage === 'es' || savedLanguage === 'en') {
                    html.lang = savedLanguage;
                  } else {
                    const browserLang = navigator.language.split('-')[0];
                    html.lang = browserLang === 'en' ? 'en' : 'es';
                  }
                } catch (e) {
                  document.documentElement.classList.add('light');
                  document.documentElement.lang = 'es';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={null}>
              <GoogleAnalytics />
            </Suspense>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <VisitCounter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
