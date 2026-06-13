type MobileEmulatorProps = {
  generatedTheme?: any;
};

export default function MobileEmulator({
  generatedTheme,
}: MobileEmulatorProps) {
  if (!generatedTheme) {
    return null;
  }

  const getThemeColors = () => {
    switch (generatedTheme.style) {
      case "anime":
        return {
          frame: "border-pink-400",
          wallpaper:
            "from-pink-500 via-purple-500 to-pink-700",
          widget: "bg-pink-600",
          icon: "bg-pink-400",
          character: "bg-purple-600",
        };

      case "fantasy":
        return {
          frame: "border-emerald-400",
          wallpaper:
            "from-emerald-600 via-green-700 to-yellow-700",
          widget: "bg-emerald-700",
          icon: "bg-emerald-500",
          character: "bg-yellow-700",
        };

      case "gaming":
        return {
          frame: "border-lime-400",
          wallpaper:
            "from-green-500 via-lime-500 to-green-800",
          widget: "bg-lime-600",
          icon: "bg-green-500",
          character: "bg-lime-700",
        };

      case "amoled":
        return {
          frame: "border-slate-500",
          wallpaper:
            "from-black via-slate-950 to-black",
          widget: "bg-slate-800",
          icon: "bg-slate-700",
          character: "bg-slate-900",
        };

      default:
        return {
          frame: "border-cyan-400",
          wallpaper:
            "from-cyan-500 via-blue-600 to-purple-700",
          widget: "bg-cyan-700",
          icon: "bg-cyan-500",
          character: "bg-blue-700",
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Mobile Theme Preview
      </h2>

      <div className="flex justify-center">

        <div
          className={`w-[320px] h-[650px] bg-black rounded-[40px] border-4 ${colors.frame} overflow-hidden shadow-2xl`}
        >
          <div className="h-8 bg-black flex justify-center items-center">
            <div className="w-24 h-2 bg-slate-700 rounded-full"></div>
          </div>

          <div className="h-full p-4">

            <div className="text-center mb-4">
              <h3 className="font-bold">
                {generatedTheme.name}
              </h3>

              <p className="text-xs text-slate-400">
                {generatedTheme.style}
              </p>
            </div>

            <div
              className={`h-40 rounded-xl bg-gradient-to-br ${colors.wallpaper} flex items-center justify-center mb-4 font-bold`}
            >
              {generatedTheme.wallpaper}
            </div>

            <div
              className={`rounded-xl ${colors.widget} p-3 mb-4 text-center`}
            >
              {generatedTheme.widget}
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">

              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl ${colors.icon}`}
                />
              ))}

            </div>

            <div
              className={`rounded-xl ${colors.character} p-4 text-center`}
            >
              {generatedTheme.character}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}