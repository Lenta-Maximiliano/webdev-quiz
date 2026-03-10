export default function TimerSelector({ value, onChange }) {
  return (
    <fieldset className="mb-6 flex items-center gap-3">
      <legend className="sr-only">Cantidad de preguntas</legend>
      <label 
        htmlFor="timer-mode"
        className="text-sm text-gray-700 dark:text-gray-300"
      >
        Modo de juego:
      </label>

      <select
        id="timer-mode"
        value={value ? "timer" : "no-timer"}
        onChange={(e) => onChange(e.target.value === "timer")}
        className="px-3 py-2 rounded border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-gray-300 hover:cursor-pointer"
      >
        <option value="no-timer">Sin timer</option>
        <option value="timer">Con timer (15s por pregunta)</option>
      </select>
    </fieldset>
  );
}