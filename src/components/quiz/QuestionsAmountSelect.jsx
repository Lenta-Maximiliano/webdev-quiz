export default function QuestionAmountSelect({ value, onChange, max }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <label className="text-sm text-gray-700 dark:text-gray-300">
        Cantidad de preguntas
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-gray-300 hover:cursor-pointer"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="all">Todas ({max})</option>
      </select>
    </div>
  );
}
