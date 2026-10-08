import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { getCurrentUser } from "./services/auth.service";

export default function App() {
  // Inicialización sincrónica para evitar el parpadeo/redirección de useEffect
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  // Callback para actualizar el estado tras Login o Registro
  const handleAuthSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
  };

  // Callback para cerrar sesión
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Formateo de props para Dashboard
  const dashboardUserData = currentUser
    ? {
        name: currentUser.username || currentUser.name || "Usuario",
        role: Array.isArray(currentUser.roles)
          ? currentUser.roles[0]
          : currentUser.role || "ROLE_USER",
      }
    : { name: "", role: "" };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 dark:bg-[#0b1426]">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />}
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLoginSuccess={handleAuthSuccess} />
              )
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register onRegisterSuccess={handleAuthSuccess} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <Dashboard user={dashboardUserData} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}