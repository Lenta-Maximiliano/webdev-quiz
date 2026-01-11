import { useEffect, useState } from "react";

export default function QuestionTimer({
  active,
  questionIndex,
  onTimeEnd,
  duration = 15,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset del timer cuando cambia la pregunta
  useEffect(() => {
    if (!active) return;
    setTimeLeft(duration);
  }, [questionIndex, active]);

  // Maneja el countdown del timer mientras esté activo.
  // Al llegar a 0, notifica al componente padre.
  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      onTimeEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, active]);

  if (!active) return null;

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
