import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, displayName || null);
      navigate("/", { replace: true });
    } catch (err) {
      const code = err?.code || err?.message || "";
      if (code.includes("weak-password")) setError("La contraseña es demasiado corta (mín. 6 caracteres).");
      else if (code.includes("email-already-in-use")) setError("El email ya está en uso.");
      else if (code.includes("invalid-email")) setError("Email inválido.");
      else setError("Error al registrarse. Reintentá.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm block mb-1 ">Nombre (opcional)</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 hover:border-gray-400" placeholder="Tu nombre" />
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full px-3 py-2 rounded border border-gray-300 hover:border-gray-400" />
          </div>

          <div>
            <label className="text-sm block mb-1">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="w-full px-3 py-2 rounded border border-gray-300 hover:border-gray-400" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex gap-3 items-center">
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer">
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>

            <Link to="/login" className="text-sm px-3 py-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:text-black">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}