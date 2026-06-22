"use client";

import { useState } from "react";

type TopBarProps = {
  selectedProject?: any;
  generatedTheme?: any;
};

export default function TopBar({
  selectedProject,
  generatedTheme,
}: TopBarProps) {
  const [search, setSearch] = useState("");
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    const theme = selectedProject || generatedTheme;
    if (!theme) {
      alert("Selecciona un proyecto primero.");
      return;
    }

    const data = JSON.stringify(theme, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.name || "theme"}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="flex items-center justify-between mb-8 gap-4">

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm outline-none focus:border-violet-500 transition text-white placeholder-slate-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition px-4 py-3 rounded-xl text-sm font-semibold"
        >
          {exported ? "✅ Exported!" : "⬇️ Export Theme"}
        </button>

        {/* More options */}
        <button className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 hover:bg-slate-800 transition">
          ···
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 hover:bg-slate-800 transition">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* Dark mode */}
        <button className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3 hover:bg-slate-800 transition">
          🌙
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold text-sm">
          J
        </div>

      </div>
    </div>
  );
}