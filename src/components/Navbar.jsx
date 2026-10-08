import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onLogout();
    navigate("/login");
  };

  const hasRole = (role) => user?.roles?.includes(role);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide text-indigo-400">
        JWT System
      </Link>

      <div className="flex gap-4 items-center font-medium">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-indigo-300">Inicio</Link>

            {/* Opciones Visibles según Roles */}
            {(hasRole("ROLE_USER") || hasRole("user")) && (
              <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/40">Usuario</span>
            )}
            
            {(hasRole("ROLE_MODERATOR") || hasRole("moderator")) && (
              <span className="bg-amber-600/30 text-amber-300 text-xs px-2 py-1 rounded border border-amber-500/40">Panel Mod</span>
            )}

            {(hasRole("ROLE_ADMIN") || hasRole("admin")) && (
              <span className="bg-rose-600/30 text-rose-300 text-xs px-2 py-1 rounded border border-rose-500/40">Panel Admin</span>
            )}

            <button 
              onClick={handleLogout}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-300">Iniciar Sesión</Link>
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded text-sm transition">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}