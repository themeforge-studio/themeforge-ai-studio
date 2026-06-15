type MobilePreviewProps = {
  generatedTheme?: any;
  selectedProject?: any;
};

export default function MobilePreview({
  generatedTheme,
  selectedProject,
}: MobilePreviewProps) {

  const theme =
  selectedProject ||
  generatedTheme || {
    name: "Cyber Samurai",
    style: "cyberpunk",
    wallpaper: "Neo Tokyo Rain",
    widget: "Cyber Clock",
    character: "Female Cyber Ninja",
  };
  
  const getThemeColors = () => {
    switch (theme.style) {
      case "anime":
        return {
          background:
            "bg-gradient-to-b from-pink-900 to-purple-900",
          widget: "bg-pink-500/30",
          icon: "bg-pink-400/40",
        };

      case "fantasy":
        return {
          background:
            "bg-gradient-to-b from-green-900 to-yellow-900",
          widget: "bg-green-500/30",
          icon: "bg-yellow-500/30",
        };

      case "gaming":
        return {
          background:
            "bg-gradient-to-b from-green-900 to-black",
          widget: "bg-green-500/30",
          icon: "bg-green-400/40",
        };

      case "amoled":
        return {
          background:
            "bg-gradient-to-b from-black to-slate-950",
          widget: "bg-slate-700/30",
          icon: "bg-slate-600/40",
        };

      default:
        return {
          background:
            "bg-gradient-to-b from-cyan-900 to-blue-950",
          widget: "bg-cyan-500/30",
          icon: "bg-cyan-400/40",
        };
    }
  };

  const colors = getThemeColors();

  const projectType =
  theme.type || "Theme";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Device Preview
      </h2>
      <div className="flex gap-2 mb-6">

  <button className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm">
    Android
  </button>

  <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm">
    iPhone
  </button>

  <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm">
    Tablet
  </button>

</div>

      <div className="flex justify-center">
        <div className="w-[290px] h-[600px] rounded-[40px] border-4 border-slate-700 bg-black p-3">

          <div
            className={`w-full h-full rounded-[32px] p-4 flex flex-col ${colors.background}`}
          >

            {/* Status Bar */}

            <div className="flex justify-between text-xs text-white mb-3">
              <span>10:45</span>
              <span>📶 WiFi 🔋 92%</span>
            </div>

            {/* Theme Name */}

            <div className="text-center mb-3">
              <h3 className="font-bold">
                {theme.name}
              </h3>

              <p className="text-xs opacity-70">
                {theme.style} • {projectType}
              </p>
            </div>

            {/* Wallpaper */}

            {/* Wallpaper */}

<div
  className={`h-40 rounded-xl flex items-center justify-center mb-4 text-center font-bold text-lg
  ${
    theme.style === "anime"
      ? "bg-gradient-to-br from-pink-400 to-purple-600"
      : theme.style === "fantasy"
      ? "bg-gradient-to-br from-green-500 to-yellow-700"
      : theme.style === "gaming"
      ? "bg-gradient-to-br from-green-500 to-black"
      : theme.style === "amoled"
      ? "bg-gradient-to-br from-black to-slate-800"
      : "bg-gradient-to-br from-cyan-500 to-blue-800"
  }`}
>
  <div>
    <div className="text-xl">
      {theme.wallpaper}
    </div>

    <div className="text-xs opacity-80 mt-2">
      AI Wallpaper Preview
    </div>
  </div>
</div>

            {/* Widget */}

            <div
              className={`rounded-xl p-3 text-center mb-4 ${colors.widget}`}
            >
              <div className="text-sm">
                {theme.widget}
              </div>

              <div className="text-xl font-bold">
                12:45
              </div>
            </div>

            {/* Icons */}

            {/* Icons */}

<div className="grid grid-cols-4 gap-3 mb-4">
  {Array.from({ length: 12 }).map(
    (_, index) => (
      <div
        key={index}
        className={`h-12 rounded-xl flex items-center justify-center text-lg font-bold ${colors.icon}`}
      >
        {theme.style === "anime"
          ? "♥"
          : theme.style === "fantasy"
          ? "✦"
          : theme.style === "gaming"
          ? "🎮"
          : theme.style === "amoled"
          ? "⬢"
          : "◉"}
      </div>
    )
  )}
</div>

            {/* Character */}

            {/* Character */}

<div className="mt-auto mb-4">
  <div className="rounded-xl bg-black/20 p-3 text-center">

    <div className="text-4xl mb-2">
      {theme.style === "anime"
        ? "👧"
        : theme.style === "fantasy"
        ? "🧙"
        : theme.style === "gaming"
        ? "🎮"
        : theme.style === "amoled"
        ? "🕶️"
        : "🥷"}
    </div>

    <div className="text-sm">
      {theme.character}
    </div>

  </div>
</div>

 {/* Dock */}

<div className="grid grid-cols-4 gap-2">

  {(
    theme.style === "anime"
      ? ["💖", "🎀", "🌸", "⭐"]
      : theme.style === "fantasy"
      ? ["⚔️", "🛡️", "🏹", "🔮"]
      : theme.style === "gaming"
      ? ["🎮", "🕹️", "🏆", "⚡"]
      : theme.style === "amoled"
      ? ["⬛", "🌑", "🕶️", "⚫"]
      : ["🤖", "⚙️", "💾", "🌐"]
  ).map((icon, index) => (
    <div
      key={index}
      className="rounded-xl bg-white/10 p-2 text-center"
    >
      {icon}
    </div>
  ))}

</div>
</div>
        </div>
      </div>
    </div>
  );
}