import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/layout/Footer.jsx"

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}