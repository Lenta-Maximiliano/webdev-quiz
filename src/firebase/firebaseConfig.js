import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase initialization module.
 *
 * Centraliza la configuración e inicialización de Firebase para que toda
 * la aplicación utilice una única instancia de los servicios.
 *
 * Aquí se configuran:
 * - Authentication (manejo de usuarios)
 * - Firestore (base de datos)
 *
 * Las credenciales se cargan desde variables de entorno usando Vite
 * para evitar exponer información sensible directamente en el código.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Inicializa la aplicación de Firebase con la configuración definida.
 */
const app = initializeApp(firebaseConfig);

/**
 * Instancia de Firebase Authentication.
 * Se utiliza en la aplicación para gestionar registro,
 * login y estado de autenticación de los usuarios.
 */
export const auth = getAuth(app);

/**
 * Instancia de Firestore Database.
 * Permite acceder a la base de datos para leer y escribir
 * información relacionada con los usuarios y sus partidas.
 */
export const db = getFirestore(app);
