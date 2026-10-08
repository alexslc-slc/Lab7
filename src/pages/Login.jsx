import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica Front-end
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await login(formData.username, formData.password);
      onLoginSuccess();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 text-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Iniciar Sesión</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-2.5 rounded text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Usuario</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold transition">
          Ingresar
        </button>
      </form>
    </div>
  );
}