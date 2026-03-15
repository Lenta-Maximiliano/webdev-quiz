import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Página de registro de usuario.
 *
 * Responsabilidades:
 * - Renderizar el formulario de creación de cuenta.
 * - Gestionar el estado del formulario (nombre, email y contraseña).
 * - Invocar la función `register` proporcionada por AuthContext.
 * - Mostrar mensajes de error claros según el error recibido.
 * - Redirigir al usuario al home después de registrarse correctamente.
 *
 * Este componente forma parte del flujo de autenticación de la aplicación.
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Estado del formulario
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Maneja el envío del formulario de registro.
   *
   * Pasos:
   * 1. Previene el comportamiento por defecto del formulario.
   * 2. Limpia errores previos.
   * 3. Activa el estado de carga.
   * 4. Intenta crear el usuario mediante AuthContext.
   * 5. Redirige al home si el registro es exitoso.
   * 6. Interpreta errores comunes del servicio de autenticación.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Si el usuario no ingresa nombre se envía null
      await register(email, password, displayName || null);

      // Redirección después del registro exitoso
      navigate("/", { replace: true });

    } catch (err) {
      const code = err?.code || err?.message || "";

      // Manejo de errores comunes de autenticación
      if (code === "auth/weak-password-custom") {
        setError(
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
        );
      } else if (code.includes("email-already-in-use")) {
        setError("El email ya está en uso.");
      } else if (code.includes("invalid-email")) {
        setError("Email inválido.");
      } else {
        setError("Error al registrarse. Reintentá.");
      }
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Campo nombre del usuario (opcional) */}
          <div>
            <label htmlFor="displayName" className="text-sm block mb-1 ">
              Nombre (opcional)
            </label>

            <input 
              id="displayName"
              name="displayName"
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
              className="w-full px-3 py-2 rounded border border-gray-300 hover:border-gray-400" 
              placeholder="Tu nombre" 
            />
          </div>

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
                "Registrando..." : "Crear cuenta"
              }
            </button>

            {/* Link hacia la página de login */}
            <Link to="/login" className="text-sm px-3 py-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:text-black">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}