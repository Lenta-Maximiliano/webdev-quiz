import { Link } from "react-router-dom";
/**
 * Footer global de la aplicación.
 *
 * Responsabilidades:
 * - Mostrar información de copyright del proyecto.
 * - Incluir enlaces secundarios como privacidad y repositorio.
 * - Adaptarse a layout responsive (mobile / desktop).
 *
 * Este componente se renderiza al final del layout principal
 * y permanece visible en todas las páginas.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:border-slate-800 dark:bg-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col text-sm text-gray-600 dark:text-gray-400 text-center sm:flex-row sm:justify-center sm:gap-1">
          <span>© {new Date().getFullYear()} WebDev Quiz —</span>
          <span>
            Hecho por <strong>Lenta, Maximiliano Carlos</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/privacy"
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            Privacy
          </Link>
          <a 
            href="https://github.com/Lenta-Maximiliano/webdev-quiz" 
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}