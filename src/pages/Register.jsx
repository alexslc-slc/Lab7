import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth.service";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1. Validaciones en Front-end
    if (!formData.username.trim() || !formData.email.trim() || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (formData.username.length < 3 || formData.username.length > 20) {
      setError("El nombre de usuario debe tener entre 3 y 20 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // 2. Envío al Backend
    try {
      await register(
        formData.username,
        formData.email,
        formData.password
      );
      
      setSuccess("¡Usuario registrado con éxito! Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Ocurrió un error al registrar el usuario."
      );
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-slate-800 border border-slate-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
          Crear una Cuenta
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-3 rounded text-sm mb-4">
            {success}
          </div>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Usuario
          </label>
          <input
            type="text"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder=""
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder=""
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder=""
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder=""
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-semibold transition shadow-md hover:shadow-lg"
        >
          Registrarse
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}