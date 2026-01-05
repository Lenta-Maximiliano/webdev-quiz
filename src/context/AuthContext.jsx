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

export function AuthProvider({ children }) { 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = useCallback(async (email, password) => {
    setAuthError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res; 
    } catch (err) {
      setAuthError(err);
      throw err;
    }
  }, []);

  const register = useCallback(async (email, password, displayName) => {
    setAuthError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(res.user, { displayName });
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
      isAuthenticated: !!user, 
      uid: user?.uid ?? null,
    };
  }, [user, loading, authError, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
