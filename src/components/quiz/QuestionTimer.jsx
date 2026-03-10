import { useEffect, useRef, useState } from "react";

export default function QuestionTimer({
  questionIndex,
  onTimeEnd,
  duration = 15
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  // Reset del timer cuando cambia la pregunta
  useEffect(() => {
    setTimeLeft(duration);
  }, [questionIndex, duration]);

  // Interval estable
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [questionIndex]);

  // Detectar fin del tiempo
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      onTimeEnd?.();
    }
  }, [timeLeft]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <aside className="mb-4" aria-label="Temporizador de la pregunta">
      <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
        <span>Tiempo restante</span>
        <span aria-live="polite">{timeLeft}s</span>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded">
        <div
          className="h-2 rounded bg-indigo-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </aside>
  );
}
