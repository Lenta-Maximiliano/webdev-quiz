import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function saveScoreToFirestore(
  user,
  { scoreId, score, total, category }
) {
  if (!user?.uid || !scoreId) return;

  const userRef = doc(db, "users", user.uid);
  const scoreRef = doc(db, "users", user.uid, "scores", scoreId);

  await setDoc(
    userRef,
    {
      email: user.email || null,
      displayName: user.displayName || null,
      lastPlayed: serverTimestamp(),
    },
    { merge: true }
  );

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

  const snap = await getDoc(userRef);
  const currentBest =
    snap.exists() && typeof snap.data().bestScore === "number"
      ? snap.data().bestScore
      : -Infinity;

  if (score > currentBest) {
    await setDoc(userRef, { bestScore: score }, { merge: true });
  }
}
