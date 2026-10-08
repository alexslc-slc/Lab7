export default function Dashboard({
  user = {
    name: "",
    role: "",
  },
}) {
  // Limpia el prefijo "ROLE_" si existe (ej. "ROLE_USER" -> "USER")
  const formattedRole = user.role ? user.role.replace("ROLE_", "") : "INVITADO";

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center min-h-[60vh]">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary dark:bg-blue-500/20 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/20 dark:border-blue-500/30">
          {formattedRole}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bienvenido, {user.name || "Usuario"}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
          Has ingresado exitosamente al panel de control.
        </p>
      </div>
    </div>
  );
} 