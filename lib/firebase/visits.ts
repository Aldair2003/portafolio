/**
 * Funciones para manejar el contador de visitas
 * 
 * Usa Firestore para almacenar y actualizar el contador de visitas
 * de manera eficiente y en tiempo real
 */

import { db } from './config';
import { 
  doc, 
  getDoc, 
  setDoc, 
  increment,
  serverTimestamp 
} from 'firebase/firestore';

const VISITS_DOC_ID = 'stats';

/**
 * Obtiene el contador total de visitas
 */
export async function getTotalVisits(): Promise<number> {
  try {
    const docRef = doc(db, 'visits', VISITS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().total || 0;
    }
    
    // Si no existe, inicializar con 0
    await setDoc(docRef, { total: 0, lastUpdated: serverTimestamp() });
    return 0;
  } catch (error) {
    console.error('Error obteniendo visitas:', error);
    return 0;
  }
}

/**
 * Incrementa el contador de visitas
 * Usa increment() para evitar condiciones de carrera
 */
export async function incrementVisits(): Promise<void> {
  try {
    const docRef = doc(db, 'visits', VISITS_DOC_ID);
    await setDoc(
      docRef,
      {
        total: increment(1),
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error incrementando visitas:', error);
  }
}

