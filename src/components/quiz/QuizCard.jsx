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
*/

export default function QuizCard({
  questions: incomingQuestions = [],
  category = "all",
  sessionSize = "all",
  useTimer = true,
  onExit,
}) {
  const { user } = useAuth();

  // Estado y acciones de la sesión de quiz
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

  // Maneja la persistencia del puntaje (Firebase / offline / retry)
  const {
    persistScore,
    flushPending,
    saving,
    saved,
    error,
  } = useScorePersistence();

  // Guarda el puntaje una vez que la sesión finaliza
  useEffect(() => {
    if (!finished) return;

    persistScore({
      score,
      total: questions.length,
      category,
    });
  }, [finished]);

  // Si el usuario inicia sesión luego de jugar,
  // se intenta guardar cualquier puntaje pendiente
  useEffect(() => {
    flushPending();
  }, [user]);

  // Estado vacío defensivo
  if (!questions.length) {
    return <p className="p-6">No hay preguntas cargadas para esta categoría.</p>;
  }

  return (
    <section aria-live="polite">
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
          {useTimer && !answered &&(
            <QuestionTimer
              questionIndex={index}
              onTimeEnd={timeoutQuestion}
              duration={15}
            />
          )}

          <Question
            question={currentQuestion}
            onAnswer={(value) =>
              answerQuestion(currentQuestion, value)
            }
            answered={answered}
            selected={selected}
          />

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