import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuizSession } from "./hooks/useQuizSession";
import { useScorePersistence } from "./hooks/useScorePersistence";
import QuizResultCard from "./QuizResultCard";
import Question from "./Question";

export default function QuizCard({
  questions: incomingQuestions = [],
  category = "all",
  sessionSize = "all", // 🔴 CAMBIO
}) {
  const { user } = useAuth();

  // 🔴 CAMBIO: pasar sessionSize
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
  } = useQuizSession(incomingQuestions, sessionSize);

  const {
    persistScore,
    flushPending,
    saving,
    saved,
    error,
  } = useScorePersistence();

  useEffect(() => {
    if (!finished) return;

    persistScore({
      score,
      total: questions.length,
      category,
    });
  }, [finished]);

  useEffect(() => {
    flushPending();
  }, [user]);

  if (!questions.length) {
    return <div className="p-6">No hay preguntas cargadas para esta categoría.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Pregunta <strong>{index + 1}</strong> / {questions.length} — Puntaje:{" "}
          <strong>{score}</strong>
        </div>
      </div>

      {!finished ? (
        <>
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
              <div className="text-sm text-gray-500 self-center">
                Seleccione una respuesta
              </div>
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
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}


// import { useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useQuizSession } from "./hooks/useQuizSession";
// import { useScorePersistence } from "./hooks/useScorePersistence";
// import QuizResultCard from "./QuizResultCard";
// import Question from "./Question";

// export default function QuizCard({
//   questions: incomingQuestions = [],
//   category = "all",
//   sessionSize= "all"
// }) {
//   const { user } = useAuth();

//   const {
//     questions,
//     currentQuestion,
//     index,
//     score,
//     selected,
//     answered,
//     finished,
//     answerQuestion,
//     nextQuestion,
//     restartQuiz,
//   } = useQuizSession(incomingQuestions);

//   const {
//     persistScore,
//     flushPending,
//     saving,
//     saved,
//     error,
//   } = useScorePersistence();

//   useEffect(() => {
//     if (!finished) return;

//     persistScore({
//       score,
//       total: questions.length,
//       category,
//     });
//   }, [finished]); 

//   useEffect(() => {
//     flushPending();
//   }, [user]);

//   if (!questions.length) {
//     return <div className="p-6">No hay preguntas cargadas para esta categoría.</div>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-sm text-gray-700 dark:text-gray-300">
//           Pregunta <strong>{index + 1}</strong> / {questions.length} — Puntaje:{" "}
//           <strong>{score}</strong>
//         </div>
//       </div>

//       {!finished ? (
//         <>
//           <Question
//             question={currentQuestion}
//             onAnswer={(value) =>
//               answerQuestion(currentQuestion, value)
//             }
//             answered={answered}
//             selected={selected}
//           />

//           <div className="mt-4 flex gap-3 justify-end">
//             {answered ? (
//               <button
//                 onClick={nextQuestion}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer"
//               >
//                 {index + 1 < questions.length ? "Siguiente" : "Finalizar"}
//               </button>
//             ) : (
//               <div className="text-sm text-gray-500 self-center">
//                 Seleccione una respuesta
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <QuizResultCard
//           score={score}
//           total={questions.length}
//           saving={saving}
//           saved={saved}
//           error={error}
//           onRestart={restartQuiz}
//         />
//       )}
//     </div>
//   );
// }
