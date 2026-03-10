import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

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

  const navLinkBase =
  "px-3 py-2 rounded-md text-sm font-medium";

  const navLinkDefault =
  `${navLinkBase} hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700 cursor-pointer`;

  const navLinkCTA =
  `${navLinkBase} bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer`;

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

        <MobileNav
          user={user}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navigate={navigate}
        />

        <DesktopNav
          user={user}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          handleLogout={handleLogout}
          navigate={navigate}
          navLinkDefault={navLinkDefault}
          navLinkCTA={navLinkCTA}
        />
      </div>

      {/* Dropdown */}
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
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/profile");
                  }}
                  className={`${navLinkDefault} text-left`}
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