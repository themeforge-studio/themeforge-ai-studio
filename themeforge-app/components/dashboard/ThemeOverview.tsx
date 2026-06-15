type ThemeOverviewProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProject?: any;
};

export default function ThemeOverview({
  activeTab,
  setActiveTab,
  selectedProject,
}: ThemeOverviewProps) {

  const project =
  selectedProject || {
    name: "Cyber Samurai Theme",
    style: "Cyberpunk",
    status: "Active",
  };

  const assetsCount =
  project.type === "Wallpaper Pack"
    ? 1
    : project.type === "Icon Pack"
    ? 1
    : project.type === "Character Pack"
    ? 1
    : 4;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

      {/* Header */}

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {project.name}  
            </h2>

            <p className="text-slate-400 mt-1">
              Selected project overview and assets.
            </p>
          </div>

          <button className="rounded-xl bg-violet-600 px-4 py-2 hover:bg-violet-500 transition">
            Export Theme
          </button>

        </div>

      </div>

{/* Tabs */}

<div className="border-t border-slate-800 px-6">

  <div className="flex gap-8">

    {[
      "overview",
      "assets",
      "preview",
      "export",
      "settings",
    ].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`py-4 capitalize transition ${
          activeTab === tab
            ? "border-b-2 border-violet-500 text-white font-medium"
            : "text-slate-400 hover:text-white"
        }`}
      >
        {tab}
      </button>
    ))}

  </div>

</div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4 p-6">

        <div>
          <p className="text-slate-500 text-sm">
            Style
          </p>

          <p className="font-semibold">
            {project.style}
          </p>

        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Status
          </p>

          <p className="font-semibold text-green-400">
            {project.status}
          </p>
        </div>

        <div>
            <p className="text-slate-500 text-sm">
              Assets
            </p>

          <p className="font-semibold">
             {assetsCount} Generated
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Resolution
          </p>

          <p className="font-semibold">
            4K
          </p>
        </div>

      </div>

    </div>
  );
}