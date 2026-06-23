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

  const detectStyle = (name: string) => {
  const text = name.toLowerCase();

  if (text.includes("dragon") || text.includes("magic") || text.includes("fantasy") ||
      text.includes("kingdom") || text.includes("elf") || text.includes("wizard") || text.includes("rpg"))
    return "fantasy";

  if (text.includes("anime") || text.includes("otaku") || text.includes("kawaii") ||
      text.includes("naruto") || text.includes("goku") || text.includes("one piece"))
    return "anime";

  if (text.includes("game") || text.includes("gaming") || text.includes("esports") ||
      text.includes("minecraft") || text.includes("fortnite") || text.includes("valorant"))
    return "gaming";

  if (text.includes("amoled") || text.includes("dark") || text.includes("black") ||
      text.includes("night") || text.includes("shadow"))
    return "amoled";

  if (text.includes("lofi") || text.includes("cozy") || text.includes("chill") ||
      text.includes("aesthetic") || text.includes("cafe") || text.includes("study"))
    return "lofi";

  if (text.includes("nature") || text.includes("forest") || text.includes("mountain") ||
      text.includes("ocean") || text.includes("plant") || text.includes("earth"))
    return "nature";

  if (text.includes("space") || text.includes("galaxy") || text.includes("nebula") ||
      text.includes("cosmos") || text.includes("astronaut") || text.includes("star"))
    return "space";

  if (text.includes("horror") || text.includes("dark") || text.includes("vampire") ||
      text.includes("zombie") || text.includes("ghost") || text.includes("haunted"))
    return "horror";

  if (text.includes("minimal") || text.includes("clean") || text.includes("simple") ||
      text.includes("white") || text.includes("mono"))
    return "minimal";

  if (text.includes("batman") || text.includes("comic") || text.includes("marvel") ||
    text.includes("dc") || text.includes("superman") || text.includes("spider") ||
    text.includes("superhero") || text.includes("superheroe") || text.includes("heroe"))
  return "comics";

if (text.includes("kpop") || text.includes("k-pop") || text.includes("bts") ||
    text.includes("blackpink") || text.includes("idol") || text.includes("seoul") ||
    text.includes("kdrama") || text.includes("korea"))
  return "kpop";

if (text.includes("retro") || text.includes("80s") || text.includes("synthwave") ||
    text.includes("arcade") || text.includes("pixel") || text.includes("vhs") ||
    text.includes("vintage") || text.includes("cassette"))
  return "retro";

if (text.includes("street") || text.includes("graffiti") || text.includes("urban") ||
    text.includes("hiphop") || text.includes("hip hop") || text.includes("skate") ||
    text.includes("streetwear"))
  return "streetwear";

  return "cyberpunk";
};

  const handleCreate = () => {
  if (!name.trim()) return;

  const style = detectStyle(name + " " + description);
  const data = themeSuggestions[style as keyof typeof themeSuggestions];

  // ✅ Evita duplicados por nombre
  const alreadyExists = (projects || []).some(
    (p: any) => p.name.toLowerCase() === name.trim().toLowerCase()
  );

  if (alreadyExists) {
    alert(`Ya existe un proyecto llamado "${name}". Usa otro nombre.`);
    return;
  }

  const newProject = {
    id: Date.now(),
    name: name.trim(),
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
        Crear Nuevo Proyecto
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del Proyecto (e.g. Tema del Samurái Oscuro)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3 text-white placeholder-slate-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3 text-white"
        >
          <option value="Theme">Pack de Temas</option>
          <option value="Wallpaper Pack"> Pack de Wallpaper</option>
          <option value="Icon Pack">Pack de Iconos</option>
          <option value="Character Pack">Pack de Personajes</option>
        </select>

        <textarea
          placeholder="Describe tu idea... (ej. ciudad cyberpunk oscura con luces de neón)"
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
          {created ? "✅ Proyecto Creado!" : "Crear Proyecto"}
        </button>
      </div>
    </div>
  );
}