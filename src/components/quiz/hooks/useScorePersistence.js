import { useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { saveScoreToFirestore } from "../../../services/firestoreService";
import { nanoid } from "nanoid";

const PENDING_KEY = "wq_pending_score_v1";

export function useScorePersistence() {
  const { user } = useAuth();

  // 🔑 ID único por partida (vive durante toda la sesión del quiz)
  const scoreIdRef = useRef(nanoid());

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 🔹 Guardar el puntaje
   * Se llama una sola vez cuando el quiz termina
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

      // Usuario NO logueado → guardar pending
      if (!user?.uid) {
        localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
        return;
      }

      // Usuario logueado → guardar directo
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
   * 🔹 Subir el pending cuando el usuario se loguea
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

      // eliminar definitivamente
      localStorage.removeItem(PENDING_KEY);
      setSaved(true);
    } catch (err) {
      console.error("Error subiendo pending:", err);
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
