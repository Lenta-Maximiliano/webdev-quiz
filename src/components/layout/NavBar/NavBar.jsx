import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

/**
 * NavBar principal de la aplicación.
 *
 * Responsabilidades:
 * - Mostrar navegación global
 * - Adaptarse a mobile y desktop
 * - Mostrar estado de autenticación del usuario
 * - Gestionar acciones como logout y navegación al perfil
 *
 * El layout se divide para mantener separación de responsabilidades en:
 * - DesktopNav → navegación en pantallas md+
 * - MobileNav → botón hamburguesa y control del menú móvil
 */
export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  /**
   * Cierra la sesión del usuario y limpia el estado de navegación.
   * Luego redirige a /login reemplazando la entrada del historial
   * para evitar volver atrás a una página protegida.
   */
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

  /**
   * Clases base reutilizadas para los links del navbar.
   * Permiten mantener consistencia visual entre desktop y mobile.
   */
  const navLinkBase = "px-3 py-2 rounded-md text-sm font-medium";

  /**
   * Variante estándar de navegación.
   */
  const navLinkDefault = `${navLinkBase} hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700 cursor-pointer`;

  /**
   * Variante CTA (Call To Action) usada para botones principales como "Ingresar".
   */
  const navLinkCTA = `${navLinkBase} bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer`;

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

        {/* Navegación mobile */}
        <MobileNav
          user={user}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Navegación desktop */}
        <DesktopNav
          user={user}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          handleLogout={handleLogout}
          navLinkDefault={navLinkDefault}
          navLinkCTA={navLinkCTA}
        />
      </div>

      {/* Dropdown */
        /**
         * Menú desplegable para navegación mobile.
         * Solo se renderiza cuando el estado mobileOpen es true.
         */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white dark:bg-slate-800">
          <div className="flex flex-col gap-2 p-4">
            <NavLink 
              to="/" 
              onClick={() => setMobileOpen(false)}
              className={navLinkDefault}
            >
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => {setMobileOpen(false)}}
                  className={`${navLinkDefault} text-left`}
                >
                  Mi perfil
                </NavLink>
                
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
                className={navLinkCTA}
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