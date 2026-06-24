"use client";

import { useState, useEffect } from "react";
import { uploadImage } from "../../lib/supabase";

const STYLE_IMAGES: Record<string, string> = {
  cyberpunk: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=800&q=80",
  anime: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
  fantasy: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
  gaming: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  amoled: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=800&q=80",
  lofi: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  nature: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
  space: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
  horror: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80",
  minimal: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
};

type ThemeOverviewProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProject?: any;
  setSelectedProject?: (project: any) => void;
  setProjects?: any;
  projects?: any[];
};

export default function ThemeOverview({
  activeTab,
  setActiveTab,
  selectedProject,
  setSelectedProject,
}: ThemeOverviewProps) {

  const project = selectedProject || {
    name: "Cyber Samurai Theme",
    style: "cyberpunk",
    status: "Activo",
  };

  const style = (project.style || "cyberpunk").toLowerCase();
  const wallpaperImage = STYLE_IMAGES[style] || STYLE_IMAGES.cyberpunk;
  
  const [customWallpaper, setCustomWallpaper] = useState<string | null>(null);

    useEffect(() => {
      if (selectedProject?.wallpaperImage) {
        setCustomWallpaper(selectedProject.wallpaperImage);
      } else {
        setCustomWallpaper(null);
      }
    }, [selectedProject]);

  const assetsCount =
    project.type === "Wallpaper Pack" ? 1
    : project.type === "Icon Pack" ? 1
    : project.type === "Character Pack" ? 1
    : 4;

  const importTheme = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event: any) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        setSelectedProject?.(data);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const exportTheme = () => {
    const dataStr = JSON.stringify(project, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadWallpaper = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProject) return;

    // Muestra preview inmediato
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomWallpaper(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Sube a Supabase
    const publicUrl = await uploadImage(file, "wallpapers");
    if (publicUrl) {
      const updated = { 
        ...selectedProject, 
        wallpaperImage: publicUrl 
      };
      
      // Actualiza el proyecto seleccionado
      setSelectedProject?.(updated);
      localStorage.setItem(
        "themeforge-selected-project", 
        JSON.stringify(updated)
      );
      
      // Actualiza en la lista de proyectos
      const savedProjects = JSON.parse(
        localStorage.getItem("themeforge-projects") || "[]"
      );
      const updatedProjects = savedProjects.map((p: any) =>
        p.id === selectedProject.id 
          ? { ...p, wallpaperImage: publicUrl } 
          : p
      );
      localStorage.setItem(
        "themeforge-projects", 
        JSON.stringify(updatedProjects)
      );

      setCustomWallpaper(publicUrl);
    }
  };

  const tabs = [
    { key: "overview", label: "Vista General" },
    { key: "assets", label: "Assets" },
    { key: "preview", label: "Vista Previa" },
    { key: "export", label: "Exportar" },
    { key: "settings", label: "Ajustes" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p className="text-slate-400 mt-1 text-sm">
              Vista general del proyecto y sus assets.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={importTheme}
              className="rounded-xl bg-slate-700 px-4 py-2 hover:bg-slate-600 transition text-sm"
            >
              Importar Tema
            </button>
            <button
              onClick={exportTheme}
              className="rounded-xl bg-violet-600 px-4 py-2 hover:bg-violet-500 transition text-sm flex items-center gap-2"
            >
              ⬇️ Exportar Tema
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-slate-800 px-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 text-sm transition ${
                activeTab === tab.key
                  ? "border-b-2 border-violet-500 text-white font-medium"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview content */}
      {activeTab === "overview" && (
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">

            {/* Left - Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Vista General del Tema</h3>
              <p className="text-slate-400 text-sm mb-6">
                Tema {style} generado con IA con estética profesional.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm w-24">Estilo</span>
                  <span className="bg-violet-600/20 text-violet-400 border border-violet-500/30 px-3 py-1 rounded-lg text-sm capitalize">
                    {project.style}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm w-24">Creado</span>
                  <span className="text-white text-sm">
                    {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm w-24">Assets</span>
                  <span className="text-white text-sm">{assetsCount} tipos</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm w-24">Resolución</span>
                  <span className="text-white text-sm">4K / Alta Calidad</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm w-24">Estado</span>
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    project.status === "Published"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                  }`}>
                    {project.status || "Borrador"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Wallpaper Image */}
            <div className="rounded-xl overflow-hidden h-64 relative">
              <img
                src={customWallpaper || wallpaperImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold">{project.wallpaper || project.name}</p>
                <p className="text-slate-300 text-xs mt-1">Vista previa del wallpaper principal</p>
              </div>
              <label className="absolute top-3 right-3 bg-black/60 hover:bg-violet-600/80 transition cursor-pointer px-3 py-2 rounded-xl text-xs text-white flex items-center gap-2">
                📁 Subir wallpaper
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadWallpaper}
                />
              </label>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}