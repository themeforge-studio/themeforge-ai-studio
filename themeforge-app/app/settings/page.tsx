"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [userName, setUserName] = useState("Jhon");
  const [email, setEmail] = useState("jhon@themeforge.com");
  const [language, setLanguage] = useState("es");
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearData = () => {
    if (confirm("¿Estás seguro? Se borrarán todos tus proyectos y configuraciones.")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Configuración
          </h1>
          <p className="mt-2 text-slate-400">
            Personaliza tu experiencia en ThemeForge AI Studio
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Perfil */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-6">👤 Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Nombre</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Idioma</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferencias */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-6">⚙️ Preferencias</h2>
            <div className="space-y-4">

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800">
                <div>
                  <p className="font-medium">Guardado automático</p>
                  <p className="text-sm text-slate-400">Guarda proyectos automáticamente</p>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`w-12 h-6 rounded-full transition ${autoSave ? "bg-violet-600" : "bg-slate-600"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-all mx-0.5 ${autoSave ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800">
                <div>
                  <p className="font-medium">Notificaciones</p>
                  <p className="text-sm text-slate-400">Recibe alertas de actividad</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition ${notifications ? "bg-violet-600" : "bg-slate-600"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-all mx-0.5 ${notifications ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Plan */}
          <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 p-6">
            <h2 className="text-xl font-bold mb-2">⭐ Plan Actual</h2>
            <p className="text-slate-400 text-sm mb-4">Estás en el plan gratuito</p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-slate-300">✅ Hasta 10 proyectos</p>
              <p className="text-sm text-slate-300">✅ Exportación JSON</p>
              <p className="text-sm text-slate-500">❌ Generación de imágenes con IA</p>
              <p className="text-sm text-slate-500">❌ Personajes animados</p>
              <p className="text-sm text-slate-500">❌ Publicación en marketplace</p>
            </div>
            <button className="w-full bg-violet-600 hover:bg-violet-700 transition py-3 rounded-xl font-semibold text-sm">
              🚀 Mejorar a Pro
            </button>
          </div>

          {/* Datos */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-6">🗄️ Datos</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const data = localStorage.getItem("themeforge-projects");
                  const blob = new Blob([data || "[]"], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "themeforge-backup.json";
                  a.click();
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-xl text-sm text-left flex items-center gap-3"
              >
                ⬇️ <span>Descargar backup de datos</span>
              </button>
              <button
                onClick={handleClearData}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition px-4 py-3 rounded-xl text-sm text-left flex items-center gap-3"
              >
                🗑️ <span>Borrar todos los datos</span>
              </button>
            </div>
          </div>

        </div>

        {/* Save button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-700 transition px-8 py-3 rounded-xl font-semibold"
          >
            {saved ? "✅ ¡Guardado!" : "Guardar Cambios"}
          </button>
        </div>

      </div>
    </div>
  );
}