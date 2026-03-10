import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Muestra el resultado final del quiz y el estado de guardado del puntaje.
 * No contiene lógica del quiz: solo presenta información y dispara acciones externas.
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
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section
      role="status"
      aria-live="polite"
      className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6"
    >
      <header>
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          ¡Quiz finalizado!
        </h2>

        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Obtuviste <strong>{score}</strong> de <strong>{total}</strong>.
        </p>
      </header>

      {/*
        Feedback del estado de persistencia del puntaje.
        Estos estados provienen del hook useScorePersistence.
      */}
      <div className="mb-4">
        {saving && (
          <p className="text-sm text-gray-600">
            Guardando tu puntaje...
          </p>
        )}

        {!saving && saved && (
          <p className="text-sm text-green-600">
            Puntaje guardado en tu perfil.
          </p>
        )}

        {!saving && error && (
          <p className="text-sm text-rose-600">
            {error}
          </p>
        )}

        {/*
          Si el usuario no está autenticado, se informa que el puntaje
          no puede persistirse aún.
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

        <button
          onClick={onExit}
          className="text-sm w-full px-2 py-2 border border-gray-300 rounded hover:cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:border-gray-600"
        >
          Cambiar configuracion de partida
        </button>

        {/*
          Redirección a login conservando la ruta actual
          para volver automáticamente luego de autenticarse.
        */}
        {!user && (
          <button
            onClick={() =>
              navigate(
                `/login?from=${encodeURIComponent(
                  window.location.pathname + window.location.search
                )}`
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