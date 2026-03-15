import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

/**
 * Tarjeta de resultados del quiz.
 *
 * Responsabilidades:
 * - Mostrar el puntaje final obtenido
 * - Informar el estado de persistencia del puntaje
 * - Ofrecer acciones posteriores (reiniciar, cambiar configuración, login)
 *
 * Este componente NO contiene lógica del quiz ni persistencia.
 * Solo consume los estados generados por hooks externos.
 */
export default function QuizResultCard({
  score,
  total,
  saving,
  saved,
  error,
  onRestart,
  onExit
}) {

  /**
   * Hook de navegación del router.
   * Permite redirigir al usuario a la pantalla de login.
   */
  const navigate = useNavigate();

  // Ubicación actual manejada por React Router
  const location = useLocation();

  /**
   * Ruta actual (pathname + query string).
   * Se utiliza para implementar el patrón "redirect after login",
   * permitiendo volver a esta página luego de autenticarse.
   */
  const currentPath = location.pathname + location.search;

  /**
   * Usuario autenticado (si existe).
   * Se utiliza para decidir si mostrar la opción de login.
   */
  const { user } = useAuth();

  return (
    <section
      role="status"
      aria-live="polite"
      className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6"
    >
      {/* Encabezado del resultado */}
      <header>
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          ¡Quiz finalizado!
        </h2>

        {/* Resumen del puntaje */}
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Obtuviste <strong>{score}</strong> de <strong>{total}</strong>.
        </p>
      </header>

      {/*
        Feedback del estado de persistencia del puntaje.
        Estos estados provienen del hook `useScorePersistence`.
      */}
      <div className="mb-4">

        {/* Guardando puntaje */}
        {saving && (
          <p className="text-sm text-gray-600">
            Guardando tu puntaje...
          </p>
        )}

        {/* Puntaje guardado correctamente */}
        {!saving && saved && (
          <p className="text-sm text-green-600">
            Puntaje guardado en tu perfil.
          </p>
        )}

        {/* Error al guardar */}
        {!saving && error && (
          <p className="text-sm text-rose-600">
            {error}
          </p>
        )}

        {/* 
          Si el usuario no está autenticado, se informa que el puntaje
          no puede persistirse aún pero podrá guardarse si inicia sesión.
        */}
        {!saving && !error && !saved && !user && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Si ingresás ahora, tu puntaje se guardará en tu perfil.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">

        {/*
          Reinicia la sesión del quiz con la misma configuración.
        */}
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer w-full"
        >
          Volver a jugar
        </button>

        {/* Permite volver a la pantalla de configuración */}
        <button
          onClick={onExit}
          className="text-sm w-full px-2 py-2 border border-gray-300 rounded hover:cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:border-gray-600"
        >
          Cambiar configuracion de partida
        </button>

        {/* 
          Si el usuario no está autenticado, se ofrece iniciar sesión.
          Se conserva la URL actual para poder volver automáticamente
          luego de autenticarse.
        */}
        {!user && (
          <button
            onClick={() =>
              (
                navigate(`/login?from=${encodeURIComponent(currentPath)}`)
              )
            }
            className="text-sm w-full px-2 py-2 border border-gray-300 rounded hover:cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:border-gray-600"
          >
            Ingresar para guardar mi puntaje
          </button>
        )}
      </div>
    </section>
  );
}