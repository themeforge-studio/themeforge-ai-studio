"use client";

import Sidebar from "../../components/layout/Sidebar";

const TEMPLATES = [
  {
    id: 1,
    name: "Cyber Samurai",
    style: "cyberpunk",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
    assets: 4,
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 2,
    name: "Anime Dreams",
    style: "anime",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    assets: 4,
    rating: "⭐⭐⭐⭐",
  },
  {
    id: 3,
    name: "Dark AMOLED Pro",
    style: "amoled",
    type: "Wallpaper Pack",
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=400&q=80",
    assets: 3,
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 4,
    name: "Fantasy Kingdom",
    style: "fantasy",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    assets: 4,
    rating: "⭐⭐⭐⭐",
  },
  {
    id: 5,
    name: "Lofi Vibes",
    style: "lofi",
    type: "Wallpaper Pack",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    assets: 3,
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 6,
    name: "Space Explorer",
    style: "space",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    assets: 4,
    rating: "⭐⭐⭐⭐",
  },
];

export default function TemplatesPage() {
  const handleUseTemplate = (template: any) => {
    const projects = JSON.parse(localStorage.getItem("themeforge-projects") || "[]");
    const newProject = {
      id: Date.now(),
      name: template.name,
      type: template.type,
      style: template.style,
      status: "Draft",
      wallpaper: `${template.name} Wallpaper`,
      iconPack: `${template.name} Icons`,
      character: `${template.name} Character`,
      widget: `${template.name} Widget`,
    };
    projects.push(newProject);
    localStorage.setItem("themeforge-projects", JSON.stringify(projects));
    localStorage.setItem("themeforge-selected-project", JSON.stringify(newProject));
    window.location.href = "/projects";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Plantillas
          </h1>
          <p className="mt-2 text-slate-400">
            Empieza rápido con plantillas prediseñadas
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-violet-500/50 transition"
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-violet-600/80 text-white text-xs px-2 py-1 rounded-lg">
                    {template.style}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{template.type}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-400">{template.rating}</span>
                  <span className="text-xs text-slate-400">{template.assets} assets</span>
                </div>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full mt-4 bg-violet-600 hover:bg-violet-700 transition py-2 rounded-xl text-sm font-semibold"
                >
                  Usar Plantilla
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}