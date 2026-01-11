import { useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { saveScoreToFirestore } from "../../../services/firestoreService";
import { nanoid } from "nanoid";

const PENDING_KEY = "wq_pending_score_v1";

/**
 * Hook responsable de persistir el puntaje del quiz.
 * Soporta:
 * - usuarios autenticados
 * - usuarios anónimos (guardado temporal)
 * - reintento automático al loguearse
 */
export function useScorePersistence() {
  const { user } = useAuth();

  /**
   * ID único por sesión de quiz.
   * Se mantiene estable durante toda la partida para evitar duplicados
   * (idempotencia).
   */
  const scoreIdRef = useRef(nanoid());

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Persiste el puntaje al finalizar el quiz.
   * - Si el usuario no está logueado, se guarda como pending en localStorage.
   * - Si está logueado, se guarda directamente en Firestore.
   */
  const persistScore = async ({ score, total, category }) => {
    const payload = {
      scoreId: scoreIdRef.current,
      score,
      total,
      category: category ?? "all",
    };

    try {
      setSaving(true);
      setError(null);
      setSaved(false);

      // Usuario no autenticado → persistencia diferida
      if (!user?.uid) {
        localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
        return;
      }

      // Usuario autenticado → persistencia inmediata
      await saveScoreToFirestore(user, payload);
      setSaved(true);
    } catch (err) {
      console.error("Error guardando puntaje:", err);
      setError("No se pudo guardar el puntaje.");
    } finally {
      setSaving(false);
    }
  };

  /**
   * Intenta subir un puntaje pendiente cuando el usuario se autentica.
   * Se ejecuta típicamente en un efecto al detectar cambio de usuario.
   */
  const flushPending = async () => {
    if (!user?.uid) return;

    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return;

    try {
      const payload = JSON.parse(raw);

      setSaving(true);
      setError(null);

      await saveScoreToFirestore(user, payload);

      // Limpieza definitiva del pending
      localStorage.removeItem(PENDING_KEY);
      setSaved(true);
    } catch (err) {
      console.error("Error subiendo puntaje pendiente:", err);
      setError("Error guardando puntaje pendiente.");
    } finally {
      setSaving(false);
    }
  };

  return {
    persistScore,
    flushPending,
    saving,
    saved,
    error,
  };
}