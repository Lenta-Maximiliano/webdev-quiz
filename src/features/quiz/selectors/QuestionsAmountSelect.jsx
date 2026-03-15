/**
 * Opciones predefinidas de cantidad de preguntas.
 *
 * Se define fuera del componente para evitar recrear
 * el array en cada render y mantener una configuración
 * simple y reutilizable.
 */
const OPTIONS = [5, 10, 15, 20];

/**
 * Selector de cantidad de preguntas para la sesión de quiz.
 *
 * Este componente es controlado:
 * - `value` representa la cantidad seleccionada.
 * - `onChange` notifica al componente padre cuando cambia.
 *
 * Props:
 * - value → cantidad actualmente seleccionada
 * - onChange → callback para actualizar la cantidad
 * - max → número total de preguntas disponibles (usado para "Todas")
 */
export default function QuestionAmountSelect({ value, onChange, max }) {
  return (
    <fieldset className="mb-6 flex items-center gap-3">
      <legend className="sr-only">Cantidad de preguntas</legend>

      <label 
        htmlFor="question-amount"
        className="text-sm text-gray-700 dark:text-gray-300"
      >
        Cantidad de preguntas:
      </label>

      <select
        id="question-amount"
        value={value}
        onChange={(e) => onChange(e.target.value === "all" ? "all" : Number(e.target.value))}
        className="px-3 py-2 rounded border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-gray-300 hover:cursor-pointer"
      >
        {/**
         * Opciones numéricas predefinidas.
         * Permiten seleccionar rápidamente tamaños de sesión comunes.
         */}
        {OPTIONS.map((amount) => (
          <option key={amount} value={amount}>
            {amount}
          </option>
        ))}

        {/**
         * Opción especial que permite usar todas las preguntas disponibles.
         * `max` se utiliza solo para mostrar al usuario cuántas preguntas hay.
         */}
        <option value="all">Todas ({max})</option>
      </select>
    </fieldset>
  );
}
