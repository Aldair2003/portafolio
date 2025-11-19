/**
 * Configuración de Firebase
 * 
 * Este archivo inicializa Firebase para usar Firestore (base de datos)
 * 
 * Para obtener las credenciales:
 * 1. Ve a https://console.firebase.google.com/
 * 2. Crea un nuevo proyecto o selecciona uno existente
 * 3. Ve a Project Settings > General
 * 4. En "Your apps", selecciona la web (</>) y copia las credenciales
 * 5. Crea un archivo .env.local con las variables (usa .env.local.example como guía)
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase solo si no está ya inicializado (evita errores en desarrollo)
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Inicializar Firestore (base de datos)
export const db: Firestore = getFirestore(app);

export default app;

