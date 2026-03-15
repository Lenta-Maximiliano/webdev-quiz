import { useMemo, useState } from "react";
import allQuestions from "../../../data/questions.json";
import CategorySelector from "../selectors/CategorySelector";
import QuestionAmountSelect from "../selectors/QuestionsAmountSelect";
import TimerSelector from "../selectors/TimerSelector";
import QuizCard from "./QuizCard";

/**
 * Mapeo entre las categorías seleccionables en la UI
 * y los topics reales presentes en el dataset de preguntas.
 *
 * Permite agrupar varios topics dentro de una sola categoría
 * visible para el usuario (por ejemplo "html/css").
 */
const CATEGORY_MAP = {
  "html/css": ["html", "css", "html/css"],
  javascript: ["javascript"],
  react: ["react"],
};

/**
 * Componente principal del quiz.
 *
 * Responsabilidades:
 * - Gestionar la configuración del quiz (categoría, cantidad, timer).
 * - Filtrar las preguntas según la categoría seleccionada.
 * - Controlar el inicio y fin de la sesión.
 * - Renderizar el flujo entre pantalla de configuración y sesión activa.
 */
export default function QuizApp() {

  /**
   * Estados de configuración del quiz
   */
  const [category, setCategory] = useState("all");
  const [sessionSize, setSessionSize] = useState("all");
  const [useTimer, setUseTimer] = useState(true);

  /**
   * Controla si la sesión de preguntas ya comenzó.
   * Mientras sea false se muestra la pantalla de configuración.
   */
  const [sessionStarted, setSessionStarted] = useState(false);

  /**
   * Filtra las preguntas según la categoría seleccionada.
   *
   * useMemo evita recalcular el filtro en cada render,
   * ejecutándose solo cuando cambia la categoría.
   */
  const filteredQuestions = useMemo(() => {
    
    // Si la categoría es "all", no se aplica filtro
    if (category === "all") return allQuestions;

    const allowedTopics = CATEGORY_MAP[category] ?? [];

    return allQuestions.filter((q) =>
      allowedTopics.includes(String(q.topic).toLowerCase())
    );

  }, [category]);

  return (
    <main className="bg-slate-50 dark:bg-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header del quiz */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mr-[20px]">
            WebDev Quiz
          </h1>

          {/* Indica al usuario cuántas preguntas hay disponibles */}
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Banco de preguntas: <strong>{filteredQuestions.length}</strong>
          </p>
        </header>

        {/* CONFIGURACIÓN DEL QUIZ */}
        {!sessionStarted && (
          <section aria-labelledby="quiz-config">

            {/* Heading accesible para lectores de pantalla */}
            <h2 id="quiz-config" className="sr-only">
              Configuración del quiz
            </h2>

            {/* Selector de categoría */}
            <CategorySelector
              value={category}
              onChange={setCategory}
            />

            {/* Selector de cantidad de preguntas */}
            <QuestionAmountSelect
              value={sessionSize}
              onChange={setSessionSize}
              max={filteredQuestions.length}
            />

            {/* Selector de modo de juego (timer o libre) */}
            <TimerSelector
              value={useTimer}
              onChange={setUseTimer}
            />

            {/* Botón para iniciar la sesión */}
            <button
              onClick={() => setSessionStarted(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer"
            >
              Comenzar Quiz
            </button>
          </section>
        )}

        {/* SESIÓN DE PREGUNTAS */}
        {sessionStarted && (
          <section aria-live="polite">

            {/* 
              QuizCard contiene la lógica visual de la sesión:
              navegación entre preguntas, respuestas, puntaje, etc.
            */}
            <QuizCard
              questions={filteredQuestions}
              category={category}
              sessionSize={sessionSize} 
              useTimer={useTimer}

              // Permite volver a la pantalla de configuración
              onExit={() => setSessionStarted(false)}
            />
          </section>
        )}
      </div>
    </main>
  );
}

