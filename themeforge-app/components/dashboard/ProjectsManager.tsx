"use client";

import { useEffect, useState } from "react";

export default function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Theme");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editType, setEditType] =
    useState("Theme");

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
    };

    setProjects([
      newProject,
      ...projects,
    ]);

    setProjectName("");
    setProjectType("Theme");
  };

  const deleteProject = (
    id: number
  ) => {
    setProjects(
      projects.filter(
        (project) =>
          project.id !== id
      )
    );
  };

  const startEdit = (
    project: any
  ) => {
    setEditingId(project.id);
    setEditName(project.name);
    setEditType(project.type);
  };

  const saveEdit = () => {
    setProjects(
      projects.map((project) =>
        project.id === editingId
          ? {
              ...project,
              name: editName,
              type: editType,
            }
          : project
      )
    );

    setEditingId(null);
  };

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Projects
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Project name..."
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
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
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
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
                  <option>
                    Theme
                  </option>
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

                  <p className="mt-3 text-sm">
                    {project.status}
                  </p>
                </div>

                <div className="flex gap-2">
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