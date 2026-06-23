"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

export default function ExportsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [exported, setExported] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("themeforge-projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const handleExport = (project: any) => {
    const data = JSON.stringify(project, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(project.id);
    setTimeout(() => setExported(null), 2000);
  };

  const handleExportAll = () => {
    const data = JSON.stringify(projects, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "themeforge-all-projects.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Exportaciones
            </h1>
            <p className="mt-2 text-slate-400">
              Exporta tus proyectos y temas en formato JSON
            </p>
          </div>
          <button
            onClick={handleExportAll}
            className="bg-violet-600 hover:bg-violet-700 transition px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
          >
            ⬇️ Exportar Todo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Total Proyectos</p>
            <h3 className="text-3xl font-bold text-violet-400 mt-2">{projects.length}</h3>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Publicados</p>
            <h3 className="text-3xl font-bold text-green-400 mt-2">
              {projects.filter(p => p.status === "Published").length}
            </h3>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Borradores</p>
            <h3 className="text-3xl font-bold text-slate-400 mt-2">
              {projects.filter(p => p.status === "Draft").length}
            </h3>
          </div>
        </div>

        {/* Projects list */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold mb-6">Tus Proyectos</h2>

          {projects.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-4xl mb-3">📦</p>
              <p>No tienes proyectos aún.</p>
              <button
                onClick={() => window.location.href = "/projects"}
                className="mt-4 text-violet-400 hover:text-violet-300 text-sm"
              >
                Crear tu primer proyecto
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition"
                >
                  <div>
                    <h3 className="font-bold">{project.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-slate-400 text-sm">{project.type}</span>
                      {project.style && (
                        <span className="text-slate-500 text-sm">• {project.style}</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === "Published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleExport(project)}
                    className="bg-violet-600/20 hover:bg-violet-600/40 text-violet-400 border border-violet-500/30 px-4 py-2 rounded-xl text-sm transition"
                  >
                    {exported === project.id ? "✅ Exportado!" : "⬇️ Exportar"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}