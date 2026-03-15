import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar/NavBar.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Profile from "./pages/Profile.jsx";
import Privacy from "./pages/Privacy.jsx";
import Footer from "./components/layout/Footer.jsx"

/**
 * Componente raíz de la interfaz de la aplicación.
 *
 * Responsabilidades:
 * - Definir las rutas principales mediante React Router.
 * - Mantener el layout global (NavBar + Footer).
 * - Renderizar las páginas dentro del área principal <main>.
 *
 * Estructura:
 * - NavBar: navegación global persistente
 * - main: contenedor donde se renderizan las rutas
 * - Footer: información y enlaces secundarios
 *
 * Este componente funciona como el layout principal de la aplicación.
 */
export default function App() {
  return (
    <div className="min-h-screen min-w-[370px] flex flex-col">
      <NavBar />
      <main className="flex-1 dark:bg-gray-700">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}