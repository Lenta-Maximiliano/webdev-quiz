import { useEffect, useState } from "react";
import { buildSessionQuestions } from "../utils/buildSessionQuestions";

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
export function useQuizSession(
  incomingQuestions = [],
  sessionSize = "all"
) {
  
  /**
   * Normaliza el tamaño de la sesión.
   *
   * - "all" → usa todas las preguntas disponibles
   * - número → usa solo esa cantidad
   *
   * Se convierte explícitamente a Number para evitar
   * inconsistencias si el valor proviene de params o inputs.
   */
  const resolvedSize = 
    sessionSize === "all" 
      ? incomingQuestions.length 
      : Number(sessionSize);

  /**
   * Inicializa la sesión seleccionando preguntas aleatorias.
   *
   * Se usa lazy initialization en useState para que
   * `buildSessionQuestions` se ejecute solo en el primer render
   * y no en cada re-render del componente.
   */
  const [questions, setQuestions] = useState(() =>
    buildSessionQuestions(incomingQuestions, resolvedSize)
  );

  /**
   * Estados principales de la sesión
   */
  const [index, setIndex] = useState(0); // índice de la pregunta actual
  const [selected, setSelected] = useState(null); // respuesta elegida por el usuario
  const [answered, setAnswered] = useState(false); // indica si la pregunta ya fue respondida
  const [score, setScore] = useState(0); // puntaje acumulado
  const [finished, setFinished] = useState(false); // indica si el quiz terminó
  const [timedOut, setTimedOut] = useState(false); // indica si la pregunta expiró por tiempo

  /**
   * Cada vez que cambia la pregunta (index),
   * se limpian los estados relacionados a la interacción
   * del usuario en la pregunta anterior.
   */
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setTimedOut(false);
  }, [index]);

  /**
   * Maneja la respuesta del usuario.
   *
   * Flujo:
   * 1. Previene múltiples respuestas para la misma pregunta.
   * 2. Guarda la opción seleccionada.
   * 3. Determina si la respuesta es correcta.
   * 4. Incrementa el puntaje si corresponde.
   */
  function answerQuestion(question, value) {

    // Evita responder más de una vez (clicks múltiples o timeout previo)
    if (answered) return;

    setSelected(value);
    setAnswered(true);

    /**
     * Determina si la respuesta es correcta según el tipo de pregunta.
     *
     * - mcq → comparación directa con la respuesta correcta
     * - boolean → normalización a boolean para evitar inconsistencias
     */
    const isCorrect =
      question.type === "mcq"
        ? value === question.answer
        : Boolean(value) === Boolean(question.answer);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
  }

  /**
   * Maneja el caso en que el tiempo de la pregunta expira.
   *
   * Marca la pregunta como respondida pero sin sumar puntaje.
   */
  function timeoutQuestion() {

    // Si la pregunta ya fue respondida, ignorar el timeout
    if (answered) return;

    setAnswered(true);
    setTimedOut(true);

    // No hay respuesta seleccionada en caso de timeout
    setSelected(null); 
  }

  /**
   * Avanza a la siguiente pregunta.
   *
   * Si no quedan más preguntas,
   * se marca la sesión como finalizada.
   */
  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  }

  /**
   * Reinicia la sesión manteniendo la configuración actual
   * (categoría, tamaño de sesión, modo de juego).
   *
   * Se genera un nuevo orden aleatorio de preguntas
   * para evitar repetir la misma secuencia.
   */
  function restartQuiz() {
    setQuestions(buildSessionQuestions(incomingQuestions, resolvedSize));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
    setTimedOut(false);
  }

   /**
   * API pública del hook.
   *
   * Expone el estado del quiz y las acciones
   * necesarias para controlar la sesión.
   */
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