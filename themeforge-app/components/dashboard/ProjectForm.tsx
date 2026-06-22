"use client";

import { useState } from "react";
import { themeSuggestions } from "./aiData";

type ProjectFormProps = {
  projects?: any[];
  setProjects?: (projects: any[]) => void;
  setSelectedProject?: (project: any) => void;
};

export default function ProjectForm({
  projects = [],
  setProjects,
  setSelectedProject,
}: ProjectFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Theme");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState(false);

  const detectStyle = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("fantasy") || t.includes("dragon") || t.includes("magic")) return "fantasy";
    if (t.includes("anime") || t.includes("kawaii") || t.includes("otaku")) return "anime";
    if (t.includes("gaming") || t.includes("gamer") || t.includes("esports")) return "gaming";
    if (t.includes("amoled") || t.includes("dark") || t.includes("black")) return "amoled";
    return "cyberpunk";
  };

  const handleCreate = () => {
    if (!name.trim()) return;

    const style = detectStyle(name + " " + description);
    const data = themeSuggestions[style as keyof typeof themeSuggestions];

    const newProject = {
      id: Date.now(),
      name,
      type,
      style,
      status: "Draft",
      description,
      wallpaper: data.wallpapers[0],
      iconPack: data.iconPacks[0],
      character: data.characters[0],
      widget: data.widgets[0],
    };

    const updated = [...(projects || []), newProject];
    setProjects?.(updated);
    setSelectedProject?.(newProject);
    setCreated(true);

    setTimeout(() => {
      setName("");
      setDescription("");
      setCreated(false);
    }, 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        Create New Project
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Name (e.g. Dark Samurai Theme)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3 text-white placeholder-slate-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3 text-white"
        >
          <option value="Theme">Theme Pack</option>
          <option value="Wallpaper Pack">Wallpaper Pack</option>
          <option value="Icon Pack">Icon Pack</option>
          <option value="Character Pack">Character Pack</option>
        </select>

        <textarea
          placeholder="Describe your idea... (e.g. dark cyberpunk city with neon lights)"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3 text-white placeholder-slate-500"
        />

        <button
          onClick={handleCreate}
          disabled={!name.trim()}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-3 rounded-lg font-semibold transition"
        >
          {created ? "✅ Project Created!" : "Create Project"}
        </button>
      </div>
    </div>
  );
}