"use client";

import { useState } from "react";

type TopBarProps = {
  selectedProject?: any;
  generatedTheme?: any;
};

export default function TopBar({
  selectedProject,
  generatedTheme,
}: TopBarProps) {
  const [search, setSearch] = useState("");
  const [exported, setExported] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    icon: "🎨",
    title: "Tema generado",
    message: "Tu tema Cyber Samurai fue generado exitosamente.",
    time: "Hace 5 minutos",
    read: false,
  },
  {
    id: 2,
    icon: "✅",
    title: "Proyecto guardado",
    message: "Dark Anime Theme guardado en LocalStorage.",
    time: "Hace 20 minutos",
    read: false,
  },
  {
    id: 3,
    icon: "🚀",
    title: "Bienvenido a ThemeForge",
    message: "Empieza creando tu primer tema con IA.",
    time: "Hace 1 hora",
    read: false,
  },
]);

  const handleExport = () => {
    const theme = selectedProject || generatedTheme;
    if (!theme) {
      alert("Selecciona un proyecto primero.");
      return;
    }

    const data = JSON.stringify(theme, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.name || "theme"}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="flex items-center justify-between mb-8 gap-4">

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm outline-none focus:border-violet-500 transition text-white placeholder-slate-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition px-4 py-3 rounded-xl text-sm font-semibold"
        >
          {exported ? "✅ Exportado!" : "⬇️ Exportar Tema"}
        </button>

        {/* More options */}
        <div className="relative">
  <button
    onClick={() => setShowMenu(!showMenu)}
    className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 hover:bg-slate-800 transition"
  >
    ···
  </button>
  {showMenu && (
    <div className="absolute right-0 top-12 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50 w-48 overflow-hidden">
      <button
        onClick={() => { window.location.href = "/projects"; setShowMenu(false); }}
        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition"
      >
        📁 Mis Proyectos
      </button>
      <button
        onClick={() => { window.location.href = "/"; setShowMenu(false); }}
        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition"
      >
        🏠 Dashboard
      </button>
      <button
        onClick={() => { setShowMenu(false); alert("Configuración próximamente"); }}
        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition"
      >
        ⚙️ Configuración
      </button>
      <button
        onClick={() => { setShowMenu(false); alert("Ayuda próximamente"); }}
        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition border-t border-slate-800"
      >
        ❓ Ayuda
      </button>
    </div>
  )}
</div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 hover:bg-slate-800 transition"
          >
            🔔
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full text-xs flex items-center justify-center">
              {notifications.filter(n => !n.read).length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50 w-72 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <h3 className="font-bold text-sm">Notificaciones</h3>
                <button
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                  className="text-xs text-violet-400 hover:text-violet-300"
                >
                  Marcar todas como leídas
                </button>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition ${n.read ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{n.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-violet-500 mt-1 ml-auto flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode */}
        <button
          onClick={() => document.documentElement.classList.toggle("light")}
          className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 hover:bg-slate-800 transition"
          title="Cambiar tema"
        >
          🌙
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold text-sm">
          J
        </div>

      </div>
    </div>
  );
}