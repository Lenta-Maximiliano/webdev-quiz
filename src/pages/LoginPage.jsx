import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Página de inicio de sesión.
 *
 * Responsabilidades:
 * - Renderizar el formulario de autenticación (email y contraseña).
 * - Gestionar el estado del formulario y validación básica.
 * - Invocar la función `login` desde el AuthContext.
 * - Mostrar mensajes de error amigables según el error recibido.
 * - Redirigir al usuario a la ruta original solicitada después del login
 *   utilizando el parámetro `from` en la query string.
 *
 * Esta página forma parte del flujo de autenticación de la aplicación.
 * 
 * Flujo:
 * Si un usuario intenta acceder a una ruta protegida, será redirigido
 * a esta página con un parámetro `from` en la URL. Después de autenticarse,
 * se lo redirige nuevamente a esa ruta. 
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  /**
   * Determina la ruta a la que se redirigirá al usuario
   * luego de iniciar sesión correctamente.
   * Si no existe el parámetro `from`, se redirige al home.
   */
  const from = new URLSearchParams(location.search).get("from") || "/";

  // Estado del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Maneja el envío del formulario de login.
   *
   * Pasos:
   * 1. Previene el comportamiento por defecto del formulario.
   * 2. Limpia errores previos.
   * 3. Activa el estado de carga.
   * 4. Intenta autenticar al usuario.
   * 5. Redirige al destino correspondiente si el login es exitoso.
   * 6. Interpreta los errores devueltos por el servicio de autenticación.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);

      // Redirige al destino original o al home
      navigate(from, { replace: true });
    } catch (err) {
      const code = err?.code || err?.message || "";

      // Manejo de errores comunes de autenticación
      if (code.includes("wrong-password")) setError("Contraseña incorrecta.");
      else if (code.includes("user-not-found")) setError("Cuenta no encontrada.");
      else if (code.includes("invalid-email")) setError("Email inválido.");
      else setError("Error al iniciar sesión. Reintentá.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Campo email */}
          <div>
            <label htmlFor="email" className="text-sm block mb-1">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 hover:border-gray-400"
            />
          </div>

          {/* Campo contraseña */}
          <div>
            <label htmlFor="password" className="text-sm block mb-1">
              Contraseña
            </label>
            
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded border border-gray-300 hover:border-gray-400"
            />
          </div>

          {/* Mensaje de error accesible */}
          {error && (
            <div role="alert" className="text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 items-center">
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer">
                {loading ? 
                  "Ingresando..." : "Ingresar"
                }
            </button>

            {/* Link hacia la página de register */}
            <Link to="/register" className="text-sm px-3 py-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:text-black">
              Registrarme
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}