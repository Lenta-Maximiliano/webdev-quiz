import { NavLink } from "react-router-dom";

/**
 * Navegación principal para pantallas desktop.
 *
 * Responsabilidades:
 * - Mostrar links de navegación principales
 * - Mostrar menú de usuario autenticado
 * - Permitir acceso al perfil y logout
 *
 * Este componente es usado dentro del NavBar principal y
 * solo se renderiza en pantallas md+.
 */
export default function DesktopNavBar({
  user,
  userMenuOpen,
  setUserMenuOpen,
  handleLogout,
  navLinkDefault,
  navLinkCTA
}) {
  return (
    <nav className="hidden md:flex items-center gap-3">
      <NavLink to="/" className={navLinkDefault}>
        Home
      </NavLink>

      {user ? (
        <div className="relative">
          {/* Botón de avatar que abre/cierra el menú de usuario */}
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              {/* Inicial del email del usuario como avatar */}
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </button>

          {/* Dropdown del menú de usuario */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border rounded-md shadow overflow-hidden">
              <NavLink
                to="/profile"
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                Mi perfil
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to="/login"
          className={navLinkCTA}
        >
          Ingresar
        </NavLink>
      )}
    </nav>
  );
}