import { useMemo, useState } from "react";
import allQuestions from "../../data/questions.json";
import CategorySelector from "./selectors/CategorySelector";
import QuestionAmountSelect from "./selectors/QuestionsAmountSelect";
import TimerSelector from "./selectors/TimerSelector";
import QuizCard from "./QuizCard";

const CATEGORY_MAP = {
  "html/css": ["html", "css", "html/css"],
  javascript: ["javascript"],
  react: ["react"],
};

export default function QuizApp() {
  const [category, setCategory] = useState("all");
  const [sessionSize, setSessionSize] = useState("all");
  const [useTimer, setUseTimer] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (category === "all") return allQuestions;

    const allowedTopics = CATEGORY_MAP[category] ?? [];

    return allQuestions.filter((q) =>
      allowedTopics.includes(String(q.topic).toLowerCase())
    );
  }, [category]);

  return (
    <main className="bg-slate-50 dark:bg-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mr-[20px]">
            WebDev Quiz
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Banco de preguntas: <strong>{filteredQuestions.length}</strong>
          </p>
        </header>

        {/* 🔵 CONFIGURACIÓN */}
        {!sessionStarted && (
          <section aria-labelledby="quiz-config">
            <h2 id="quiz-config" className="sr-only">
              Configuración del quiz
            </h2>

            <CategorySelector
              value={category}
              onChange={setCategory}
            />

            <QuestionAmountSelect
              value={sessionSize}
              onChange={setSessionSize}
              max={filteredQuestions.length}
            />

            <TimerSelector
              value={useTimer}
              onChange={setUseTimer}
            />

            <button
              onClick={() => setSessionStarted(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer"
            >
              Comenzar Quiz
            </button>
          </section>
        )}

        {/* 🟣 SESIÓN */}
        {sessionStarted && (
          <section aria-live="polite">
            <QuizCard
              questions={filteredQuestions}
              category={category}
              sessionSize={sessionSize} 
              useTimer={useTimer}
              onExit={() => setSessionStarted(false)}
            />
          </section>
        )}
      </div>
    </main>
  );
}

