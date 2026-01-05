import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      setMobileOpen(false);
      setUserMenuOpen(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  const navLinkClass =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:cursor-pointer dark:text-white dark:hover:bg-slate-700";

  return (
    <header className="border-b bg-white dark:bg-slate-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold hover:bg-indigo-700">
            WQ
          </div>
          <span className="font-semibold text-lg dark:text-gray-300">WebDev Quiz</span>
        </Link>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 hover:cursor-pointer"
            >
              {user.email?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <NavLink to="/login" className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Ingresar
            </NavLink>
          )}

          {/* Menu Hamburguesa */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-gray-800 dark:text-white p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 hover:cursor-pointer"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border rounded-md shadow">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Mi perfil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-md text-sm bg-indigo-600 text-white"
            >
              Ingresar
            </NavLink>
          )}
        </nav>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white dark:bg-slate-800">
          <div className="flex flex-col gap-2 p-4">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className={`${navLinkClass}`}>
              Home
            </NavLink>

            {user ? (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/profile");
                  }}
                  className={navLinkClass + " text-left"}
                >
                  Mi perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium text-rose-600 hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-slate-700"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Ingresar
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}