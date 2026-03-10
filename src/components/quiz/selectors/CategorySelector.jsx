const CATEGORIES = [
  { value: "all", label: "Todas" },
  { value: "html/css", label: "HTML / CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
];

export default function CategorySelector({ value, onChange }) {
  return (
    <fieldset className="mb-6 flex items-center gap-3">
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
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}