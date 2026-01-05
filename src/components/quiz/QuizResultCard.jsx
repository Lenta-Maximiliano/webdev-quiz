import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function QuizResultCard({
  score,
  total,
  saving,
  saved,
  error,
  onRestart,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
        ¡Quiz finalizado!
      </h2>

      <p className="mb-4 text-gray-700 dark:text-gray-200">
        Obtuviste <strong>{score}</strong> de <strong>{total}</strong>.
      </p>

      <div className="mb-4">
        {saving && (
          <div className="text-sm text-gray-600">
            Guardando tu puntaje...
          </div>
        )}

        {!saving && saved && (
          <div className="text-sm text-green-600">
            Puntaje guardado en tu perfil.
          </div>
        )}

        {!saving && error && (
          <div className="text-sm text-rose-600">{error}</div>
        )}

        {!saving && !error && !saved && !user && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Si ingresás ahora, tu puntaje se guardará en tu perfil.
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer w-full"
        >
          Volver a jugar
        </button>

        {!user &&
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
        }
      </div>
    </div>
  );
}