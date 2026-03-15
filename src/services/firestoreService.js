import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Guarda el resultado de una partida en Firestore.
 *
 * Flujo:
 * 1. Asegura que el documento del usuario exista.
 * 2. Guarda la ronda en la subcolección `scores`.
 * 3. Actualiza el campo `bestScore` si el puntaje actual es mayor.
 *
 * Estructura en Firestore:
 * users/{userId}
 *   - email
 *   - displayName
 *   - bestScore
 *   - lastPlayed
 *
 * users/{userId}/scores/{scoreId}
 *   - score
 *   - total
 *   - category
 *   - createdAt
 */
export async function saveScoreToFirestore(
  user,
  { scoreId, score, total, category }
) {
  // Validación básica: se requiere usuario autenticado y scoreId
  if (!user?.uid || !scoreId) return;

  // Referencia al documento principal del usuario
  const userRef = doc(db, "users", user.uid);

  // Referencia al documento de la ronda dentro de la subcolección "scores"
  const scoreRef = doc(db, "users", user.uid, "scores", scoreId);

  /**
   * Asegura que el documento del usuario exista y actualiza
   * información básica del perfil.
   *
   * merge:true evita sobrescribir datos existentes.
   */
  await setDoc(
    userRef,
    {
      email: user.email || null,
      displayName: user.displayName || null,
      lastPlayed: serverTimestamp(),
    },
    { merge: true }
  );

  /**
   * Guarda el resultado de la ronda.
   * Se usa merge:false porque cada score es un documento nuevo.
   */
  await setDoc(
    scoreRef,
    {
      score,
      total,
      category,
      createdAt: serverTimestamp(),
    },
    { merge: false } 
  );

  /**
   * Obtiene el mejor puntaje actual del usuario
   * para compararlo con el nuevo resultado.
   */
  const snap = await getDoc(userRef);
  const currentBest =
    snap.exists() && typeof snap.data().bestScore === "number"
      ? snap.data().bestScore
      : -Infinity;

  /**
   * Si el nuevo score supera el mejor puntaje registrado,
   * actualiza el campo `bestScore` del usuario.
   */
  if (score > currentBest) {
    await setDoc(userRef, { bestScore: score }, { merge: true });
  }
}
