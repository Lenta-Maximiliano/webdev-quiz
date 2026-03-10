import { NavLink } from "react-router-dom";

export default function MobileNav({
  user,
  mobileOpen,
  setMobileOpen,
  navigate,
}) {
  return (
    <div className="md:hidden"> 
      <div className="flex items-center gap-2">
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
    </div>
  );
}