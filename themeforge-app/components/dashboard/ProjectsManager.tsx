export default function ProjectsManager() {
  const projects = [
    {
      name: "Neon Future",
      type: "Wallpaper Pack",
      status: "Published",
    },
    {
      name: "Cyber Icons",
      type: "Icon Pack",
      status: "Draft",
    },
    {
      name: "Dark AMOLED",
      type: "Theme",
      status: "Published",
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Projects
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
          + New Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
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
        ))}
      </div>
    </div>
  );
}