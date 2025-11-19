# Portafolio de Aldair

Portafolio personal desarrollado con Next.js, TypeScript, Tailwind CSS y Firebase.

## 🚀 Características

- ⚡ **Ultra rápido**: Optimizado con SSG (Static Site Generation) y CDN global
- 🎨 **Diseño moderno**: UI/UX profesional con modo oscuro/claro
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- 🔄 **Proyectos automáticos**: Integración con GitHub API para mostrar repositorios
- 📊 **Analytics**: Google Analytics 4 integrado
- 📧 **Formulario de contacto**: EmailJS para envío de emails sin backend
- 🎯 **SEO optimizado**: Meta tags, Open Graph, sitemap
- 🔥 **Firebase**: Base de datos para contador de visitas y proyectos adicionales

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Backend/Servicios**: Firebase (Firestore)
- **Integraciones**: GitHub API, EmailJS, Google Analytics 4
- **Gestor de paquetes**: pnpm
- **Despliegue**: Vercel (recomendado)

## 📦 Instalación

1. **Clona el repositorio** (o usa este proyecto directamente)

2. **Instala las dependencias**:
```bash
pnpm install
```

3. **Configura las variables de entorno**:
   - Copia `.env.local.example` a `.env.local`
   - Completa todas las variables necesarias (ver sección de configuración)

4. **Ejecuta el servidor de desarrollo**:
```bash
pnpm dev
```

5. **Abre** [http://localhost:3000](http://localhost:3000) en tu navegador

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# GitHub
NEXT_PUBLIC_GITHUB_USERNAME=tu_usuario_github

# EmailJS (para formulario de contacto)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Project Settings > General**
4. En "Your apps", selecciona la web (</>) y copia las credenciales
5. Agrega las credenciales a `.env.local`

### Configurar GitHub

1. Agrega tu username de GitHub en `NEXT_PUBLIC_GITHUB_USERNAME`
2. Los proyectos se cargarán automáticamente desde tu perfil público

### Configurar EmailJS

1. Ve a [EmailJS](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Crea un servicio de email (Gmail, Outlook, etc.)
4. Crea un template de email
5. Obtén Service ID, Template ID y Public Key
6. Agrega las credenciales a `.env.local`

### Configurar Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una propiedad GA4
3. Obtén el Measurement ID (formato: G-XXXXXXXXXX)
4. Agrega el ID a `NEXT_PUBLIC_GA_ID`

## 📝 Personalización

### Actualizar Información Personal

1. **Hero Section** (`components/sections/Hero.tsx`):
   - Actualiza el nombre, título y descripción
   - Agrega tus links sociales

2. **Sobre Mí** (`components/sections/About.tsx`):
   - Personaliza el texto sobre ti
   - Agrega tu foto (reemplaza el placeholder)

3. **Habilidades** (`components/sections/Skills.tsx`):
   - Actualiza el array `skills` con tus habilidades
   - Ajusta los niveles (beginner, intermediate, advanced, expert)

4. **Experiencia** (`components/sections/Experience.tsx`):
   - Actualiza el array `experiences` con tu experiencia y educación

5. **Footer** (`components/Footer.tsx`):
   - Actualiza los links sociales

6. **Metadata** (`app/layout.tsx`):
   - Actualiza el título, descripción y Open Graph
   - Agrega tu dominio cuando lo tengas

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conecta tu repositorio**:
   - Ve a [Vercel](https://vercel.com/)
   - Importa tu repositorio de GitHub

2. **Configura variables de entorno**:
   - Agrega todas las variables de `.env.local` en la configuración de Vercel

3. **Despliega**:
   - Vercel desplegará automáticamente en cada push

4. **Configurar dominio personalizado**:
   - Ve a Project Settings > Domains
   - Agrega tu dominio
   - Configura los DNS según las instrucciones

### Firebase Hosting (Alternativa)

```bash
# Instala Firebase CLI
npm install -g firebase-tools

# Inicia sesión
firebase login

# Inicializa Firebase
firebase init hosting

# Despliega
firebase deploy
```

## 📊 Optimizaciones Incluidas

- ✅ SSG (Static Site Generation) para páginas estáticas
- ✅ ISR (Incremental Static Regeneration) para datos dinámicos
- ✅ Optimización de imágenes con Next.js Image
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Caché con SWR para GitHub API
- ✅ Compresión de assets
- ✅ Headers de seguridad
- ✅ SEO optimizado

## 📚 Estructura del Proyecto

```
portafolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página de inicio
│   └── globals.css       # Estilos globales
├── components/           # Componentes React
│   ├── sections/         # Secciones del portafolio
│   ├── Header.tsx        # Navegación
│   ├── Footer.tsx        # Footer
│   └── ThemeProvider.tsx # Provider de tema
├── lib/                  # Utilidades y configuraciones
│   ├── firebase/         # Configuración Firebase
│   ├── github/           # GitHub API client
│   ├── analytics/        # Google Analytics
│   └── email/            # EmailJS
├── types/                # Tipos TypeScript
└── public/               # Assets estáticos
```

## 🎓 Aprendizaje

Este proyecto está diseñado para que aprendas:

- **Next.js 14**: App Router, Server Components, SSG, ISR
- **TypeScript**: Tipado estático, interfaces, tipos
- **Tailwind CSS**: Utility-first CSS, responsive design
- **Firebase**: Firestore, configuración, queries
- **GitHub API**: Fetching de datos, caché, optimización
- **Performance**: Optimizaciones, métricas, Core Web Vitals
- **SEO**: Meta tags, Open Graph, sitemap

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de hacer un fork y enviar un pull request.

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme.

---

**Desarrollado con ❤️ por Aldair**
