/**
 * AuthContext
 * Provee estado global de autenticación basado en Firebase Auth.
 *
 * Responsabilidades:
 * - Mantener el usuario autenticado actual
 * - Exponer helpers de login / registro / logout
 * - Centralizar loading y errores de autenticación
 */

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthContext = createContext(); 

/**
 * Regla de contraseña:
 * - mínimo 8 caracteres
 * - al menos una mayúscula
 * - una minúscula
 * - un número
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}

export function AuthProvider({ children }) { 
  const [user, setUser] = useState(null); 
  // Usuario autenticado (Firebase User | null)

  const [loading, setLoading] = useState(true); 
  // Indica si Firebase aún no resolvió el estado de autenticación inicial

  const [authError, setAuthError] = useState(null); 
  // Último error de autenticación (login / register / logout)

  useEffect(() => {
    // Suscripción global a cambios de autenticación (login / logout / refresh)
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    // Cleanup: elimina el listener al desmontar el provider
    return () => unsub();
  }, []);

  const login = useCallback(async (email, password) => {
    // Limpia errores previos antes de intentar login
    setAuthError(null);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (err) {
      // Se guarda el error para consumo global (UI)
      setAuthError(err);
      throw err; // Se relanza para manejo local si es necesario
    }
  }, []);

  const register = useCallback(async (email, password, displayName) => {
    setAuthError(null);

    // ✅ Validación previa a Firebase
    if (!isValidPassword(password)) {
      const error = {
        code: "auth/weak-password-custom",
        message:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
      };

      setAuthError(error);
      throw error;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Actualiza el displayName si fue provisto
      if (displayName) {
        await updateProfile(res.user, { displayName });
        // Sincroniza el estado local con el usuario actualizado 
        setUser(auth.currentUser);
      }

      return res;
    } catch (err) {
      setAuthError(err);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setAuthError(err);
      throw err;
    }
  }, []);

  const value = useMemo(() => {
    return {
      user,
      loading,
      authError,
      login,
      register,
      logout,
      isAuthenticated: !!user, // helper boolean para la UI
      uid: user?.uid ?? null,  // shortcut al uid para evitar null checks
    };
    // useMemo evita re-renderizar consumidores innecesariamente
  }, [user, loading, authError, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
