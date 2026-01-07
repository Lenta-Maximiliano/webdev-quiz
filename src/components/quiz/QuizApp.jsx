import { useMemo, useState } from "react";
import allQuestions from "../../data/questions.json";
import CategorySelector from "./CategorySelector";
import QuizCard from "./QuizCard";
import QuestionAmountSelect from "./QuestionsAmountSelect";

export default function QuizApp() {
  const [category, setCategory] = useState("all");
  const [sessionSize, setSessionSize] = useState("all"); // 🔴 CAMBIO

  const CATEGORY_MAP = {
    "html/css": ["html", "css", "html/css"],
    javascript: ["javascript"],
    react: ["react"],
  };

  const filtered = useMemo(() => {
    if (category === "all") return allQuestions;

    const allowedTopics = CATEGORY_MAP[category] ?? [];

    return allQuestions.filter((q) =>
      allowedTopics.includes(String(q.topic).toLowerCase())
    );
  }, [category]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mr-[20px]">
            WebDev Quiz
          </h1>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Banco de preguntas: <strong>{filtered.length}</strong>
          </div>
        </div>

        <CategorySelector value={category} onChange={setCategory} />

        {/* 🔴 CAMBIO: selector de cantidad */}
        <QuestionAmountSelect
          value={sessionSize}
          onChange={setSessionSize}
          max={filtered.length}
        />

        <QuizCard
          questions={filtered}
          category={category}
          sessionSize={sessionSize} // 🔴 CAMBIO
        />
      </div>
    </div>
  );
}


// import { useMemo, useState } from "react";
// import allQuestions from "../../data/questions.json"; 
// import CategorySelector from "./CategorySelector";
// import QuizCard from "./QuizCard";

// export default function QuizApp() {
//   const [category, setCategory] = useState("all");
//   const [sessionSize, setSessionSize] = useState("all");

//   const CATEGORY_MAP = {
//     "html/css": ["html", "css", "html/css"],
//     javascript: ["javascript"],
//     react: ["react"],
//   };

//   const filtered = useMemo(() => {
//     if (category === "all") return allQuestions;

//     const allowedTopics = CATEGORY_MAP[category] ?? [];

//     return allQuestions.filter((q) =>
//       allowedTopics.includes(String(q.topic).toLowerCase())
//     );
//   }, [category]);

//   return (
//     <div className="bg-slate-50 dark:bg-slate-900 py-10 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mr-[20px]">
//             WebDev Quiz
//           </h1>
//           <div className="text-sm text-gray-700 dark:text-gray-300">
//             Banco de preguntas: <strong>{filtered.length}</strong>
//           </div>
//         </div>

//         <CategorySelector value={category} onChange={setCategory} />

//         <QuestionAmountSelector
//           value={sessionSize}
//           onChange={setSessionSize}
//           max={filtered.length}
//         />

//         <QuizCard
//           questions={filtered}
//           category={category}
//           sessionSize={sessionSize}
//         />

//       </div>
//     </div>
//   );
// }
