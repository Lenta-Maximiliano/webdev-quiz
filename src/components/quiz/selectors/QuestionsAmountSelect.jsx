const OPTIONS = [5, 10, 15, 20];

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
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-gray-300 hover:cursor-pointer"
      >
        {OPTIONS.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
        <option value="all">Todas ({max})</option>
      </select>
    </fieldset>
  );
}
