import { useEffect, useState } from "react";
import { buildSessionQuestions } from "../utils/buildSessionQuestions";

export function useQuizSession(incomingQuestions = []) {
  const [questions, setQuestions] = useState(() =>
    buildSessionQuestions(incomingQuestions)
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Reset cuando cambia la categoría
  useEffect(() => {
    setQuestions(buildSessionQuestions(incomingQuestions));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
  }, [incomingQuestions]);

  // Reset estado al avanzar
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [index]);

  function answerQuestion(question, value) {
    if (answered) return;

    setSelected(value);
    setAnswered(true);

    const correct =
      question.type === "mcq"
        ? value === question.answer
        : Boolean(value) === Boolean(question.answer);

    if (correct) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
    setQuestions(buildSessionQuestions(incomingQuestions));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
  }

  return {
    questions,
    currentQuestion: questions[index],
    index,
    score,
    selected,
    answered,
    finished,
    answerQuestion,
    nextQuestion,
    restartQuiz,
  };
}