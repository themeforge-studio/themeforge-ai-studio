type ExportPanelProps = {
  generatedTheme?: any;
};

export default function ExportPanel({
  generatedTheme,
}: ExportPanelProps) {
 const handleExport = (type: string) => {
  const data = {
    theme: "Cyber Samurai",
    exportType: type,
    version: "1.0",
    generatedBy: "ThemeForge AI Studio",
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    type
      .toLowerCase()
      .replaceAll(" ", "-") + ".json";

  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        Export Theme
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <button
          onClick={() => handleExport("APK Package")}
          className="rounded-xl bg-slate-800 p-6 hover:bg-slate-700 transition"
        >
          📦
          <div className="mt-3 font-semibold">
            APK Package
          </div>
        </button>

        <button
          onClick={() => handleExport("Icon Pack ZIP")}
          className="rounded-xl bg-slate-800 p-6 hover:bg-slate-700 transition"
        >
          🎨
          <div className="mt-3 font-semibold">
            Icon Pack ZIP
          </div>
        </button>

        <button
          onClick={() => handleExport("Wallpapers Pack")}
          className="rounded-xl bg-slate-800 p-6 hover:bg-slate-700 transition"
        >
          🖼️
          <div className="mt-3 font-semibold">
            Wallpapers Pack
          </div>
        </button>

        <button
          onClick={() => handleExport("Android Theme")}
          className="rounded-xl bg-slate-800 p-6 hover:bg-slate-700 transition"
        >
          📱
          <div className="mt-3 font-semibold">
            Android Theme
          </div>
        </button>

      </div>
    </div>
  );
}