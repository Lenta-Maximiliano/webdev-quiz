/**
 * Selector de modo de juego del quiz.
 *
 * Permite activar o desactivar el timer por pregunta.
 *
 * Este componente es controlado:
 * - `value` representa si el timer está activo (boolean).
 * - `onChange` notifica al componente padre cuando cambia el modo.
 *
 * Internamente el <select> utiliza strings ("timer" / "no-timer")
 * porque es el formato que manejan los elementos HTML,
 * pero se convierte a boolean antes de enviarlo al padre.
 */
export default function TimerSelector({ value, onChange }) {
  return (
    <fieldset className="mb-6 flex items-center gap-3">

      {/* Legend oculto visualmente pero accesible para lectores de pantalla */}
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
        {/* Modo sin límite de tiempo */}
        <option value="no-timer">Sin timer</option>

        {/* Modo con límite de tiempo por pregunta */}
        <option value="timer">Con timer (15s por pregunta)</option>
      </select>
    </fieldset>
  );
}