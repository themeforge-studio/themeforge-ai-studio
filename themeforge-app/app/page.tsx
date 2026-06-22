"use client";

import Sidebar from "../components/layout/Sidebar";
import StatsCards from "../components/dashboard/StatsCards";
import ProjectsTable from "../components/dashboard/ProjectsTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <section className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              ThemeForge AI Studio
            </h1>
            <p className="mt-2 text-slate-400">
              Tu estudio creativo de temas con IA
            </p>
          </div>
          <button
            onClick={() => window.location.href = "/projects"}
            className="bg-violet-600 hover:bg-violet-700 transition px-5 py-3 rounded-xl font-semibold text-sm"
          >
            + Nuevo Proyecto
          </button>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = "/projects"}
            className="rounded-xl border border-slate-800 bg-slate-900 hover:border-violet-500/50 hover:bg-slate-800 transition p-5 text-left"
          >
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold mb-1">Crear Tema</h3>
            <p className="text-sm text-slate-400">
              Genera un tema completo con wallpaper, iconos y personaje
            </p>
          </button>

          <button
            onClick={() => window.location.href = "/wallpapers"}
            className="rounded-xl border border-slate-800 bg-slate-900 hover:border-cyan-500/50 hover:bg-slate-800 transition p-5 text-left"
          >
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="font-bold mb-1">Wallpapers</h3>
            <p className="text-sm text-slate-400">
              Explora y gestiona tu colección de wallpapers
            </p>
          </button>

          <button
            onClick={() => window.location.href = "/projects"}
            className="rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500/50 hover:bg-slate-800 transition p-5 text-left"
          >
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-bold mb-1">Icon Packs</h3>
            <p className="text-sm text-slate-400">
              Diseña y exporta packs de iconos personalizados
            </p>
          </button>
        </div>

        {/* Recent Projects */}
        <ProjectsTable />

        {/* Footer */}
        <div className="mt-8 text-center text-slate-600 text-sm">
          ThemeForge AI Studio — Fase 1 ✅
        </div>

      </section>
    </main>
  );
}