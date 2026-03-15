import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuizSession } from "./hooks/useQuizSession";
import { useScorePersistence } from "./hooks/useScorePersistence";
import QuizResultCard from "./QuizResultCard";
import Question from "./Question";
import QuestionTimer from "./QuestionTimer";

/**
 * Renderiza una sesión activa de quiz.
 *
 * Responsabilidades:
 * - Orquestar el flujo de la sesión (preguntas, puntaje, finalización)
 * - Conectar el estado del quiz con la persistencia del puntaje
 * - Coordinar UI (timer, pregunta, navegación, resultados)
 *
 * Este componente NO contiene lógica de negocio del quiz,
 * esa responsabilidad vive en useQuizSession.
 * 
 * Tampoco implementa la persistencia directamente,
 * delegándola a `useScorePersistence`.
*/
export default function QuizCard({
  questions: incomingQuestions = [],
  category = "all",
  sessionSize = "all",
  useTimer = true,
  onExit,
}) {

  /**
   * Usuario autenticado (si existe).
   * Se utiliza para decidir si se puede persistir el puntaje
   * inmediatamente o si debe almacenarse temporalmente.
   */
  const { user } = useAuth();

  /**
   * Estado y acciones de la sesión de quiz.
   * Toda la lógica de navegación, puntaje y respuestas
   * está encapsulada dentro de este hook.
   */
  const {
    questions,
    currentQuestion,
    index,
    score,
    selected,
    answered,
    finished,
    answerQuestion,
    nextQuestion,
    restartQuiz,
    timeoutQuestion,
  } = useQuizSession(incomingQuestions, sessionSize);

  /**
   * Hook encargado de la persistencia del puntaje.
   *
   * Soporta:
   * - guardado en Firestore
   * - guardado temporal offline
   * - reintento automático cuando el usuario se autentica
   */
  const {
    persistScore,
    flushPending,
    saving,
    saved,
    error,
  } = useScorePersistence();

  /**
   * Cuando la sesión finaliza, se intenta persistir el puntaje.
   *
   * Este efecto se ejecuta únicamente cuando `finished`
   * cambia a true.
   */
  useEffect(() => {
    if (!finished) return;

    persistScore({
      score,
      total: questions.length,
      category,
    });
  }, [finished]);

  /**
   * Si el usuario inicia sesión después de jugar,
   * se intenta subir cualquier puntaje pendiente
   * almacenado previamente en localStorage.
   */
  useEffect(() => {
    flushPending();
  }, [user]);

  /**
   * Estado defensivo: si no hay preguntas disponibles
   * se evita renderizar la sesión completa.
   */
  if (!questions.length) {
    return <p className="p-6">No hay preguntas cargadas para esta categoría.</p>;
  }

  return (
    <section aria-live="polite">

      {/* Header con progreso de la sesión */}
      <header className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p>
            Pregunta <strong>{index + 1}</strong> / {questions.length} — Puntaje:{" "}
            <strong>{score}</strong>
          </p>
        </div>
      </header>

      {!finished ? (
        <>
          {/* Timer por pregunta (si está habilitado) */}
          {useTimer && !answered &&(
            <QuestionTimer
              questionIndex={index}
              onTimeEnd={timeoutQuestion}
              duration={15}
            />
          )}

          {/* Render de la pregunta actual */}
          <Question
            question={currentQuestion}
            onAnswer={(value) =>
              answerQuestion(currentQuestion, value)
            }
            answered={answered}
            selected={selected}
          />

          {/* Navegación entre preguntas */}
          <div className="mt-4 flex gap-3 justify-end">
            {answered ? (
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer"
              >
                {index + 1 < questions.length ? "Siguiente" : "Finalizar"}
              </button>
            ) : (
              <p className="text-sm text-gray-500 self-center">
                Seleccione una respuesta
              </p>
            )}
          </div>
        </>
      ) : (
        /**
         * Pantalla de resultados una vez finalizada la sesión.
         *
         * También muestra el estado del guardado del puntaje
         * (guardando / guardado / error).
         */
        <QuizResultCard
          score={score}
          total={questions.length}
          saving={saving}
          saved={saved}
          error={error}
          onRestart={() => { restartQuiz() }}
          onExit={() => { onExit?.() }}
        />
      )}
    </section>
  );
}