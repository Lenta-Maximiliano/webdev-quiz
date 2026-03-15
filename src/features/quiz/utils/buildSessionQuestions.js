/**
 * Mezcla un array utilizando el algoritmo Fisher–Yates.
 *
 * Este algoritmo garantiza una distribución uniforme al
 * reorganizar los elementos del array de forma aleatoria.
 *
 * Se crea una copia del array original para evitar mutarlo.
 */
function shuffleArray(arr) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    // Selecciona un índice aleatorio entre 0 y i
    const j = Math.floor(Math.random() * (i + 1));

    // Selecciona un índice aleatorio entre 0 y i
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

/**
 * Tamaño por defecto de una sesión de preguntas.
 * Se utiliza cuando no se especifica un tamaño al generar la sesión.
 */
export const DEFAULT_SESSION_SIZE = 5;

/**
 * Construye una sesión de preguntas aleatorias a partir
 * de un conjunto de preguntas disponibles.
 *
 * Flujo:
 * 1. Verifica que la fuente sea un array válido.
 * 2. Mezcla las preguntas de forma aleatoria.
 * 3. Devuelve una cantidad limitada de preguntas.
 */
export function buildSessionQuestions(
  source = [],
  size = DEFAULT_SESSION_SIZE
) {
  // Validación básica del input
  if (!Array.isArray(source) || source.length === 0) return [];

  // Mezcla las preguntas para garantizar aleatoriedad
  const shuffled = shuffleArray(source);

  // Devuelve solo la cantidad solicitada de preguntas
  return shuffled.slice(0, Math.min(size, shuffled.length));
}