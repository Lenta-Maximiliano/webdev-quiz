function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const DEFAULT_SESSION_SIZE = 5;

export function buildSessionQuestions(
  source = [],
  size = DEFAULT_SESSION_SIZE
) {
  if (!Array.isArray(source) || source.length === 0) return [];
  const shuffled = shuffleArray(source);
  return shuffled.slice(0, Math.min(size, shuffled.length));
}