import { NavLink } from "react-router-dom";

export default function NavBar({
  user,
  userMenuOpen,
  setUserMenuOpen,
  handleLogout,
  navigate,
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
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border rounded-md shadow overflow-hidden">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                Mi perfil
              </button>
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