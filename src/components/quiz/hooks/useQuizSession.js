/**
 * Maneja el estado completo de una sesión de quiz.
 *
 * Responsabilidades:
 * - Seleccionar un subconjunto aleatorio de preguntas
 * - Controlar el flujo de preguntas (índice, finalización)
 * - Gestionar respuestas, puntaje y timeout por pregunta
 *
 * Este hook NO maneja UI ni efectos visuales.
 */

import { useEffect, useState } from "react";
import { buildSessionQuestions } from "../utils/buildSessionQuestions";

export function useQuizSession(
  incomingQuestions = [],
  sessionSize = "all"
) {
  
  // Normaliza el tamaño de la sesión.
  const resolvedSize = 
    sessionSize === "all" 
      ? incomingQuestions.length 
      : Number(sessionSize);

  // Inicializa la sesión seleccionando preguntas aleatorias.
  // Se usa lazy initialization para evitar recalcular en cada render.
  const [questions, setQuestions] = useState(() =>
    buildSessionQuestions(incomingQuestions, resolvedSize)
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  // Reinicia completamente la sesión cuando cambian:
  // - la categoría
  // - la cantidad de preguntas
  // - el banco de preguntas
  useEffect(() => {
    setQuestions(buildSessionQuestions(incomingQuestions, resolvedSize));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
    setTimedOut(false);
  }, [incomingQuestions, resolvedSize]);

  // Al avanzar de pregunta se limpian los estados de interacción
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setTimedOut(false);
  }, [index]);

  function answerQuestion(question, value) {
    // Evita responder más de una vez (clicks múltiples o timeout previo)
    if (answered) return;

    setSelected(value);
    setAnswered(true);

    // Determina si la respuesta es correcta según el tipo de pregunta
    const isCorrect =
      question.type === "mcq"
        ? value === question.answer
        : Boolean(value) === Boolean(question.answer);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
  }

  function timeoutQuestion() {
    // Si la pregunta ya fue respondida, ignorar el timeout
    if (answered) return;

    // El timeout marca la pregunta como respondida,
    // pero no suma puntaje
    setAnswered(true);
    setTimedOut(true);
    setSelected(null); 
  }

  // Avanza a la siguiente pregunta o finaliza la sesión
  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  // Reinicia la sesión manteniendo la configuración actual
  // (categoría, cantidad y modo de juego)
  function restartQuiz() {
    setQuestions(buildSessionQuestions(incomingQuestions, resolvedSize));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
    setTimedOut(false);
  }

  return {
    questions,
    currentQuestion: questions[index] ?? null,
    index,
    score,
    selected,
    answered,
    finished,
    answerQuestion,
    nextQuestion,
    restartQuiz,
    timeoutQuestion,
    timedOut,
  };
}