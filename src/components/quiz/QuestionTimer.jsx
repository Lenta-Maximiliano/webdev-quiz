import { useEffect, useRef, useState } from "react";

/**
 * Temporizador visual para cada pregunta del quiz.
 *
 * Responsabilidades:
 * - Mostrar el tiempo restante de la pregunta
 * - Ejecutar un countdown cada segundo
 * - Notificar cuando el tiempo se agota
 *
 * Este componente es completamente independiente
 * de la lógica del quiz (puntaje, respuestas, etc.).
 */
export default function QuestionTimer({
  questionIndex,
  onTimeEnd,
  duration = 15
}) {

  /**
   * Tiempo restante de la pregunta.
   * Se inicializa con la duración configurada.
   */
  const [timeLeft, setTimeLeft] = useState(duration);

  /**
   * Referencia al intervalo activo.
   * Se usa useRef para poder limpiar el intervalo
   * sin provocar renders adicionales.
   */
  const intervalRef = useRef(null);


  /**
   * Cuando cambia la pregunta se reinicia el timer.
   */
  useEffect(() => {
    setTimeLeft(duration);
  }, [questionIndex, duration]);

  /**
   * Inicia el intervalo que decrementa el tiempo cada segundo.
   *
   * El intervalo se reinicia cuando cambia la pregunta,
   * asegurando que cada pregunta tenga su propio countdown.
   */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    // Limpieza del intervalo para evitar memory leaks
    return () => clearInterval(intervalRef.current);
  }, [questionIndex]);

  /**
   * Detecta cuando el tiempo se agota.
   *
   * Cuando timeLeft llega a 0:
   * - se detiene el intervalo
   * - se notifica al componente padre
   */
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      onTimeEnd?.();
    }
  }, [timeLeft]);

  /**
   * Porcentaje restante para la barra visual del timer.
   */
  const percentage = (timeLeft / duration) * 100;

  return (
    <aside className="mb-4" aria-label="Temporizador de la pregunta">
      <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
        <span>Tiempo restante</span>

           {/* aria-live permite que lectores de pantalla anuncien el cambio */}
        <span aria-live="polite">{timeLeft}s</span>
      </div>

      {/* Barra de progreso visual */}
      <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded">
        <div
          className="h-2 rounded bg-indigo-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </aside>
  );
}
