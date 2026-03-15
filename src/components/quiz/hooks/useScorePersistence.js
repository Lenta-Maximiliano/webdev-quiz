import { useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { saveScoreToFirestore } from "../../../services/firestoreService";
import { nanoid } from "nanoid";

/**
 * Key utilizada para almacenar temporalmente un puntaje
 * cuando el usuario juega sin estar autenticado.
 *
 * Se incluye una versión (`v1`) para permitir cambios
 * futuros en el formato del payload sin romper datos previos.
 */
const PENDING_KEY = "wq_pending_score_v1";

/**
 * Hook responsable de la persistencia del puntaje del quiz.
 *
 * Soporta tres escenarios:
 * 1. Usuario autenticado → guardado inmediato en Firestore.
 * 2. Usuario anónimo → guardado temporal en localStorage.
 * 3. Usuario se loguea luego de jugar → reintento automático
 *    de persistencia mediante `flushPending`.
 *
 * También gestiona estados de UI asociados al proceso
 * de persistencia (saving, saved, error).
 */
export function useScorePersistence() {
  const { user } = useAuth();

  /**
   * ID único generado por sesión de quiz.
   *
   * Se guarda en un ref para que:
   * - no cambie entre renders
   * - evitar crear múltiples registros del mismo intento
   *   si la función de guardado se ejecuta más de una vez.
   *
   * Esto garantiza idempotencia en la persistencia del score.
   */
  const scoreIdRef = useRef(nanoid());

  // Estados de UI relacionados con el proceso de guardado
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

   /**
   * Persiste el puntaje al finalizar el quiz.
   *
   * Flujo:
   * 1. Construye el payload con la información de la ronda.
   * 2. Si el usuario NO está autenticado:
   *    - guarda el score en localStorage como "pendiente".
   * 3. Si el usuario está autenticado:
   *    - guarda el score directamente en Firestore.
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

      // Usuario no autenticado → guardado temporal.
      // El score se enviará a Firestore cuando el usuario se loguee.
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
   * Intenta subir a Firestore un puntaje pendiente almacenado en localStorage.
   *
   * Este flujo se utiliza cuando:
   * - el usuario jugó sin estar autenticado
   * - luego inicia sesión en la aplicación
   *
   * Si la subida es exitosa, el dato pendiente se elimina
   * definitivamente del localStorage.
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

  /**
   * API pública del hook.
   *
   * - persistScore → guardar puntaje de la sesión
   * - flushPending → subir puntaje pendiente cuando el usuario se autentica
   * - saving → estado de guardado en progreso
   * - saved → indica si el puntaje se guardó correctamente
   * - error → mensaje de error si la operación falla
   */
  return {
    persistScore,
    flushPending,
    saving,
    saved,
    error,
  };
}