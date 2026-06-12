export default function ProjectsTable() {
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
    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Recent Projects
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-slate-400">
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.name}
              className="border-t border-slate-800"
            >
              <td className="py-3">{project.name}</td>
              <td>{project.type}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}