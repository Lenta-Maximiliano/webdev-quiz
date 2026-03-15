/**
 * Renderiza una pregunta del quiz.
 *
 * Soporta dos tipos de preguntas:
 * - MCQ (multiple choice)
 * - True / False
 *
 * Responsabilidades:
 * - Mostrar el enunciado y las opciones
 * - Permitir seleccionar una respuesta
 * - Mostrar estados visuales (correcto / incorrecto)
 * - Mostrar explicación una vez respondida
 *
 * La lógica de validación de respuestas vive en el hook
 * `useQuizSession`. Este componente solo maneja UI.
 */
export default function Question({ question, onAnswer, answered, selected }) {
  
  // Determina si la pregunta es de opción múltiple
  const isMCQ = question.type === "mcq";

  return (
    <section className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-md rounded-lg p-6">

      {/* Tema / categoría de la pregunta */}
      <div className="mb-3 text-sm text-gray-500 dark:text-gray-300">
        {question.topic}
      </div>

      {/* Enunciado de la pregunta */}
      <h2 className="break-words text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {question.id}. {question.question}
      </h2>

      <div className="space-y-3">
        {isMCQ ? (
          <fieldset >

            {/* legend oculto para accesibilidad */}
            <legend className="sr-only">
              Opciones de respuesta
            </legend>

            {question.options.map((opt, i) => {

              // Determina si esta opción está seleccionada
              const isSelected = selected === i;
              
              // Determina si esta opción es la correcta
              const isCorrect = answered && i === question.answer;
              
              // Determina si el usuario seleccionó una opción incorrecta
              const isWrongSelected = answered && isSelected && i !== question.answer;

              return (
                <label
                  key={`${question.id}-${i}`}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer
                    hover:bg-slate-50 
                    ${isCorrect
                      ? "border-green-400 bg-green-50 dark:hover:bg-green-200"
                      : "border-gray-200 dark:border-slate-700"}
                    ${isWrongSelected ? "bg-red-50 border-red-600 dark:bg-red-100 dark:hover:bg-red-800" : ""}
                    ${isCorrect || isWrongSelected
                      ? ""
                      : "dark:hover:bg-slate-700 "}
                  `}
                >
                  {/* Input controlado */}
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={i}
                    checked={isSelected}
                    disabled={answered}
                    onChange={() => onAnswer(i)}
                    className="mr-3 h-4 w-4 text-indigo-600"
                    aria-checked={isSelected}
                  />
                  {/* Texto de la opción */}
                  <span
                    className={`
                      ${isCorrect || isWrongSelected
                        ? ""
                        : "dark:text-white"}
                    `}
                  >
                    {opt}
                  </span>
                </label>
              );
            })}
          </fieldset>
        ) : (
          // Render para preguntas True / False
          <div className="flex gap-3">
            
            {/** Botón True */}
            <button
              onClick={() => onAnswer(true)}
              disabled={answered}
              className={`px-4 py-2 rounded-md border hover:cursor-pointer
                hover:bg-slate-50 dark:hover:text-black

                ${
                  answered && selected === true && question.answer === true
                    ? "bg-green-50 border-green-400"
                    : ""
                }

                ${
                  answered && selected === true && question.answer !== true
                    ? "bg-red-50 border-red-400"
                    : ""
                }

                ${
                  !answered || selected !== true
                    ? "border-gray-200 dark:border-slate-700 dark:text-white"
                    : ""
                }
              `}
            >
              True
            </button>

            {/** Botón False */}
            <button
              onClick={() => onAnswer(false)}
              disabled={answered}
              className={`px-4 py-2 rounded-md border hover:cursor-pointer
                hover:bg-slate-50 dark:hover:text-black

                ${
                  answered && selected === false && question.answer === false
                    ? "bg-green-50 border-green-400"
                    : ""
                }

                ${
                  answered && selected === false && question.answer !== false
                    ? "bg-red-50 border-red-400"
                    : ""
                }

                ${
                  !answered || selected !== false
                    ? "border-gray-200 dark:border-slate-700 dark:text-white"
                    : ""
                }
              `}
            >
              False
            </button>
          </div>
        )}
      </div>

      {/* Explicación que aparece luego de responder */}
      {answered && question.explanation && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200">
          <strong>Explicación:</strong> 
          <span className="block mt-1">
            {question.explanation}
          </span>
        </div>
      )}
    </section>
  );
}