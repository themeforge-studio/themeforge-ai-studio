"use client";

import { useEffect, useState } from "react";

export default function ProjectsTable() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("themeforge-projects");
    if (saved) {
      const all = JSON.parse(saved);
      setProjects(all.slice(-5).reverse());
    }
  }, []);

  const statusColor = (status: string) => {
    if (status === "Published") return "bg-green-500/20 text-green-400 border border-green-500/30";
    if (status === "Draft") return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
    if (status === "Active") return "bg-violet-500/20 text-violet-400 border border-violet-500/30";
    return "bg-slate-500/20 text-slate-400";
  };

  return (
    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Projects</h2>
        <button
          onClick={() => window.location.href = "/projects"}
          className="text-sm text-violet-400 hover:text-violet-300 transition"
        >
          View all
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p className="text-4xl mb-3">🎨</p>
          <p>No projects yet.</p>
          <button
            onClick={() => window.location.href = "/projects"}
            className="text-violet-400 hover:text-violet-300 text-sm mt-2"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-sm">
              <th className="pb-3">Name</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Style</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <tr
                key={i}
                className="border-t border-slate-800 hover:bg-slate-800/50 transition"
              >
                <td className="py-3 font-medium">{project.name}</td>
                <td className="py-3 text-slate-400 text-sm">{project.type}</td>
                <td className="py-3 text-sm">{project.style || "sin estilo"}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-lg text-xs ${statusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}