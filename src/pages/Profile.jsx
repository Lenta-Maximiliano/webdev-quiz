import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

/**
 * Página de perfil del usuario.
 *
 * Responsabilidades:
 * - Mostrar información básica del usuario autenticado.
 * - Obtener el mejor puntaje almacenado en Firestore.
 * - Listar las últimas rondas jugadas por el usuario.
 * - Permitir refrescar los datos del perfil manualmente.
 *
 * Requiere que el usuario esté autenticado. Si no lo está,
 * se redirige automáticamente a la página de login.
 */
export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Estado de datos del perfil
  const [bestScore, setBestScore] = useState(null);
  const [scores, setScores] = useState([]);

  // Estados de UI
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Obtiene la información del perfil del usuario desde Firestore.
   *
   * - Lee el documento principal del usuario para obtener el `bestScore`.
   * - Consulta la subcolección `scores` ordenada por fecha descendente.
   * - Limita el resultado a las últimas 20 rondas.
   */
  const fetchProfile = useCallback(async () => {
    if (!user) return;

    setFetching(true);
    setError(null);

    try {
      // Referencia al documento del usuario
      const userRef = doc(db, "users", user.uid);

      // Obtiene datos generales del usuario (bestScore)
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();

        // Validamos que bestScore sea un número antes de guardarlo
        setBestScore(typeof data.bestScore === "number" ? data.bestScore : null);
      } else {
        setBestScore(null);
      }

      // Referencia a la subcolección de scores del usuario
      const scoresRef = collection(userRef, "scores");

      // Query: últimas 20 rondas ordenadas por fecha
      const q = query(scoresRef, orderBy("createdAt", "desc"), limit(20));

      const querySnap = await getDocs(q);

      const items = querySnap.docs.map((d) => {
        const raw = d.data() || {};

        // Convierte Timestamp de Firestore a Date si existe
        const createdAt = 
          raw.createdAt && raw.createdAt.toDate
           ? raw.createdAt.toDate() 
           : null;
        
        return {
          id: d.id,
          score: raw.score ?? null,
          total: raw.total ?? null,
          category: raw.category ?? null,
          createdAt,
        };
      });

      setScores(items);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("No se pudieron cargar los datos. Reintentá.");
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    // Espera a que el contexto de autenticación termine de cargar
    if (loading) return;

    // Si no hay usuario autenticado, redirige al login
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [loading, user, fetchProfile, navigate]);

  // Estado de carga inicial
  if (loading || fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-600">Cargando perfil...</div>
      </div>
    );
  }

  // Seguridad adicional en caso de que no exista usuario
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

        {/* Header del perfil */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">

            {/* Inicial del avatar: prioriza displayName, luego email */}
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email?.charAt(0).toUpperCase() ?? "U")}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {user.displayName ?? user.email}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Mi perfil</p>
          </div>
        </div>

        {/* Estadísticas del usuario */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/40">
            <div className="text-xs text-gray-500 dark:text-gray-300">Mejor puntaje</div>
            <div className="text-2xl font-bold mt-2 dark:text-white">{bestScore ?? "—"}</div>
          </div>

          {/* Lista de últimas rondas */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/40 sm:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-300">Últimas rondas</div>
              <div className="flex items-center gap-2">
                {/* Permite refrescar manualmente los datos */}
                <button
                  onClick={fetchProfile}
                  className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Refrescar
                </button>
              </div>
            </div>

            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

            {scores.length === 0 ? (
              <div className="mt-3 text-sm text-gray-600">
                No hay rondas registradas todavía.
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {scores.map((s) => (
                  <li 
                    key={s.id} 
                    className="flex items-center justify-between p-2 rounded-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {s.category 
                          ? s.category.toUpperCase() 
                          : "GENERAL"}
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {s.createdAt 
                          ? s.createdAt.toLocaleString() 
                          : ""}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold dark:text-white">{s.score ?? "-"} / {s.total ?? "-"}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Acciones del usuario */}
        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => navigate("/")} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:cursor-pointer hover:bg-indigo-700">
              Jugar otra ronda
          </button>
          
          <button 
            onClick={() => navigate("/")} 
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700 dark:border-gray-600">
              Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}