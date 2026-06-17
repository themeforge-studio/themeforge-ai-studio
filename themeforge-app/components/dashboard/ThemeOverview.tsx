import { useState } from "react";

type ThemeOverviewProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProject?: any;
  setSelectedProject?: (project: any) => void;

  projects?: any[] | null;
  setProjects?: any;
   

};

export default function ThemeOverview({
  activeTab,
  setActiveTab,
  selectedProject,
  setSelectedProject,
  projects,
  setProjects,
}: ThemeOverviewProps) {

const [toast, setToast] =
  useState<string | null>(null);

  const showToast = (
  message: string
) => {
  setToast(message);

  setTimeout(() => {
    setToast(null);
  }, 3000);
};

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

    const importTheme = () => {
  const input =
    document.createElement("input");

  input.type = "file";
  input.accept = ".json";

  input.onchange = (event: any) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

reader.onload = (e) => {
  const text =
    e.target?.result as string;

  const data =
    JSON.parse(text);

  console.log(
    "ARCHIVO IMPORTADO:",
    data
  );

setSelectedProject?.(data);

console.log(
  "LISTA ACTUAL DE PROYECTOS:",
  projects
);

const existingProject =
  (projects || []).find(
    (project) =>
      project.id === data.id
  );

if (existingProject) {
  showToast(
    "⚠ Project already exists"
  );

  setSelectedProject?.(
    existingProject
  );

} else {

  setProjects?.([
    data,
    ...(projects || []),
  ]);

  showToast(
    "✅ Project imported"
  );

}

};

    reader.readAsText(file);
  };

  input.click();
};

const exportTheme = () => {
  const dataStr = JSON.stringify(
    project,
    null,
    2
  );

  const blob = new Blob(
    [dataStr],
    {
      type: "application/json",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${project.name}.json`;

  link.click();

  URL.revokeObjectURL(url);

  showToast(
    "💾 Project exported"
  );
};

const exportAllProjects = () => {
  const blob = new Blob(
    [
      JSON.stringify(
        projects || [],
        null,
        2
      ),
    ],
    {
      type: "application/json",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "themeforge-backup.json";

  link.click();

  URL.revokeObjectURL(url);

  showToast(
    "💾 Backup exported"
  );
};

const importBackup = () => {
  const input =
    document.createElement("input");

  input.type = "file";
  input.accept = ".json";

  input.onchange = (event: any) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (e) => {
      const text =
        e.target?.result as string;

      const data =
        JSON.parse(text);

      console.log(
        "BACKUP IMPORTADO:",
        data
      );

        setProjects?.(data);

        showToast(
        "✅ Backup restored"
      
    );
    
    };

    reader.readAsText(file);
  };

  input.click();
};

  return (
  <>
    {toast && (
      <div
        className="
          fixed
          top-5
          right-5
          z-50
          bg-slate-800
          text-white
          px-4
          py-3
          rounded-xl
          shadow-xl
          border
          border-slate-600
        "
      >
        {toast}
      </div>
    )}
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

          <div className="flex gap-2">

           <button
              onClick={importTheme}
              className="rounded-xl bg-slate-700 px-4 py-2 hover:bg-slate-600 transition"
          >
              Import Theme
            </button>

        <button
           onClick={exportTheme}
          className="rounded-xl bg-violet-600 px-4 py-2 hover:bg-violet-500 transition"
        >
          Export Theme
        </button>


        <button
          onClick={exportAllProjects}
          className="rounded-xl bg-green-600 px-4 py-2 hover:bg-green-500 transition"
      >
          Export All
      </button>

      <button
        onClick={importBackup}
        className="rounded-xl bg-blue-600 px-4 py-2 hover:bg-blue-500 transition"
>
        Import Backup
      </button>

      </div>

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
     </>
  );
}