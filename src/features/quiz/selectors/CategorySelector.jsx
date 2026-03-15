/**
 * Lista de categorías disponibles para filtrar preguntas.
 *
 * Se define fuera del componente para evitar recrear
 * el array en cada render y mantenerlo como una constante
 * reutilizable.
 */
const CATEGORIES = [
  { value: "all", label: "Todas" },
  { value: "html/css", label: "HTML / CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
];

/**
 * Selector de categoría del quiz.
 *
 * Este componente es controlado:
 * - `value` representa la categoría seleccionada.
 * - `onChange` notifica al componente padre cuando cambia.
 *
 * Responsabilidades:
 * - Renderizar el selector de categorías
 * - Delegar el manejo del estado al componente padre
 */
export default function CategorySelector({ value, onChange }) {
  return (
    <fieldset className="mb-6 flex items-center gap-3">
      
      {/* Legend oculto visualmente pero accesible para lectores de pantalla */}
      <legend className="sr-only">Selección de categoría</legend>

      <label
        htmlFor="category" 
        className="text-sm text-gray-700 dark:text-gray-300"
      >
        Categoría:
      </label>

      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-gray-300 hover:cursor-pointer"
      >
        {/**
         * Se renderizan dinámicamente las opciones
         * a partir de la constante CATEGORIES para
         * mantener el componente declarativo y escalable.
         */}
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}