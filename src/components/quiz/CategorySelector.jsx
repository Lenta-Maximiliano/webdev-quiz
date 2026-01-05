export default function CategorySelector({ value, onChange }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <label className="text-sm text-gray-700 dark:text-gray-300">Categoría:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-gray-300 hover:cursor-pointer"
      >
        <option value="all">Todas</option>
        <option value="html/css">HTML/CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
      </select>
    </div>
  );
}