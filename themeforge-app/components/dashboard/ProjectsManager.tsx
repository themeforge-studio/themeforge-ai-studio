"use client";

import { useEffect, useState } from "react";

type ProjectsManagerProps = {
  generatedTheme?: any;
  selectedProject?: any;
  setSelectedProject?: any;
};

export default function ProjectsManager({
  generatedTheme,
  selectedProject,
  setSelectedProject,
}: ProjectsManagerProps) { 
  const [projects, setProjects] = useState<any[] | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Theme");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editType, setEditType] =
    useState("Theme");
    
  const [editStatus, setEditStatus] =
  useState("Draft");

  useEffect(() => {
    const savedProjects =
      localStorage.getItem(
        "themeforge-projects"
      );

    if (savedProjects) {
      setProjects(
        JSON.parse(savedProjects)
      );
    } else {
      setProjects([
        {
          id: 1,
          name: "Neon Future",
          type: "Wallpaper Pack",
          status: "Published",
        },
        {
          id: 2,
          name: "Cyber Icons",
          type: "Icon Pack",
          status: "Draft",
        },
        {
          id: 3,
          name: "Dark AMOLED",
          type: "Theme",
          status: "Published",
        },
      ]);
    }
  }, []);

 useEffect(() => {
  if (projects === null) return;

  localStorage.setItem(
    "themeforge-projects",
    JSON.stringify(projects)
  );
}, [projects]);

  const createProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
  id: Date.now(),

  name: projectName,

  type: projectType,

  status: "Draft",

  style:
    generatedTheme?.style ||
    null,

  wallpaper:
    generatedTheme?.wallpaper ||
    null,

  iconPack:
    generatedTheme?.iconPack ||
    null,

  character:
    generatedTheme?.character ||
    null,

  widget:
    generatedTheme?.widget ||
    null,
};

    setProjects([
  newProject,
  ...(projects || []),
]);

    setProjectName("");
    setProjectType("Theme");
  };

  const deleteProject = (
    id: number
  ) => {
    setProjects(
      (projects || []).filter(
        (project) =>
          project.id !== id
      )
    );
  };

  const duplicateProject = (
    project: any
  ) => {
    const duplicatedProject = {
      ...project,
      id: Date.now(),
      name:
        project.name + " Copy",
    };

    setProjects([
  duplicatedProject,
  ...(projects || []),
]);
  };

  const startEdit = (
  project: any
) => {
  setEditingId(project.id);
  setEditName(project.name);
  setEditType(project.type);
  setEditStatus(project.status);
};

  const saveEdit = () => {
  setProjects(
  (projects || []).map((project) =>
      project.id === editingId
        ? {
            ...project,
            name: editName,
            type: editType,
            status: editStatus,
          }
        : project
    )
  );

  setEditingId(null);
};

  const totalProjects =
  projects?.length || 0;

const totalThemes =
  (projects || []).filter(
    (project) =>
      project.type === "Theme"
  ).length;

const totalIcons =
  (projects || []).filter(
    (project) =>
      project.type ===
      "Icon Pack"
  ).length;

const totalCharacters =
  (projects || []).filter(
    (project) =>
      project.type ===
      "Character Pack"
  ).length;

  const filteredProjects =
  (projects || [])

    .filter((project) =>
      project.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "az":
          return a.name.localeCompare(
            b.name
          );

        case "za":
          return b.name.localeCompare(
            a.name
          );

        case "oldest":
          return a.id - b.id;

        default:
          return b.id - a.id;
      }
    });

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Projects
        </h2>

  <input
  type="text"
  placeholder="Search projects..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="w-full rounded-lg bg-slate-800 p-3 mb-4"
/>

<select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
  className="w-full rounded-lg bg-slate-800 p-3 mb-4"
>
  <option value="recent">
    Most Recent
  </option>

  <option value="oldest">
    Oldest
  </option>

  <option value="az">
    Name A-Z
  </option>

  <option value="za">
    Name Z-A
  </option>
</select>
<div className="grid grid-cols-4 gap-4 mb-6">

  <div className="rounded-xl bg-slate-800 p-4">
    <p className="text-slate-400 text-sm">
      Projects
    </p>

    <h3 className="text-2xl font-bold">
      {totalProjects}
    </h3>
  </div>

  <div className="rounded-xl bg-slate-800 p-4">
    <p className="text-slate-400 text-sm">
      Themes
    </p>

    <h3 className="text-2xl font-bold">
      {totalThemes}
    </h3>
  </div>

  <div className="rounded-xl bg-slate-800 p-4">
    <p className="text-slate-400 text-sm">
      Icon Packs
    </p>

    <h3 className="text-2xl font-bold">
      {totalIcons}
    </h3>
  </div>

  <div className="rounded-xl bg-slate-800 p-4">
    <p className="text-slate-400 text-sm">
      Characters
    </p>

    <h3 className="text-2xl font-bold">
      {totalCharacters}
    </h3>
  </div>

</div>
        <div className="flex gap-3">
          
          <input
            type="text"
            placeholder="Project name..."
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="flex-1 rounded-lg bg-slate-800 p-3"
          />

          <select
            value={projectType}
            onChange={(e) =>
              setProjectType(
                e.target.value
              )
            }
            className="rounded-lg bg-slate-800 p-3"
          >
            <option>Theme</option>
            <option>
              Wallpaper Pack
            </option>
            <option>
              Icon Pack
            </option>
            <option>
              Character Pack
            </option>
          </select>

          <button
            onClick={createProject}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Create
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProjects.map((project) => (
         <div
  key={project.id}
  onClick={() =>
    setSelectedProject?.(project)
  }
  className={`rounded-xl border p-5 cursor-pointer transition ${
    selectedProject?.id === project.id
      ? "border-violet-500 bg-slate-900"
      : "border-slate-800 bg-slate-900"
  }`}
>
            {editingId ===
            project.id ? (
              <div className="space-y-3">
                <input
                  value={editName}
                  onChange={(e) =>
                    setEditName(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg bg-slate-800 p-3"
                />

                <select
  value={editType}
  onChange={(e) =>
    setEditType(
      e.target.value
    )
  }
  className="w-full rounded-lg bg-slate-800 p-3"
>
  <option>Theme</option>
  <option>Wallpaper Pack</option>
  <option>Icon Pack</option>
  <option>Character Pack</option>
</select>

<select
  value={editStatus}
  onChange={(e) =>
    setEditStatus(
      e.target.value
    )
  }
  className="w-full rounded-lg bg-slate-800 p-3"
>
  <option>Draft</option>
  <option>Published</option>
  <option>Archived</option>
</select>

                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="rounded-lg bg-green-600 px-3 py-2 hover:bg-green-700"
                  >
                    💾 Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingId(
                        null
                      )
                    }
                    className="rounded-lg bg-slate-700 px-3 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {project.name}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    {project.type}
                  </p>

                  <div className="mt-3">

  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      project.status === "Published"
        ? "bg-green-500/20 text-green-400"
        : project.status === "Archived"
        ? "bg-red-500/20 text-red-400"
        : "bg-yellow-500/20 text-yellow-400"
    }`}
  >
    {project.status}
  </span>

</div>
<div className="mt-4 space-y-1 text-sm text-slate-300">

  {project.style && (
    <div>
      🎨 Style: {project.style}
    </div>
  )}

  {project.wallpaper && (
    <div>
      🖼 Wallpaper: {project.wallpaper}
    </div>
  )}

  {project.iconPack && (
    <div>
      📦 Icon Pack: {project.iconPack}
    </div>
  )}

  {project.character && (
    <div>
      👤 Character: {project.character}
    </div>
  )}

  {project.widget && (
    <div>
      ⏰ Widget: {project.widget}
    </div>
  )}

</div>git status
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      duplicateProject(
                        project
                      )
                    }
                    className="rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-700 transition"
                  >
                    📋
                  </button>

                  <button
                    onClick={() =>
                      startEdit(
                        project
                      )
                    }
                    className="rounded-lg bg-yellow-600 px-3 py-2 hover:bg-yellow-700 transition"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() =>
                      deleteProject(
                        project.id
                      )
                    }
                    className="rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}