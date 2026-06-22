"use client";

import { useState } from "react";

type MobilePreviewProps = {
  generatedTheme?: any;
  selectedProject?: any;
};

const STYLE_CONFIG: Record<string, {
  background: string;
  wallpaper: string;
  wallpaperImage: string;
  widget: string;
  icon: string;
  iconSymbol: string;
  dock: string[];
  character: string;
}> = {
  anime: {
    background: "bg-gradient-to-b from-pink-900 to-purple-900",
    wallpaper: "bg-gradient-to-br from-pink-400 to-purple-600",
    wallpaperImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    widget: "bg-pink-500/30",
    icon: "bg-pink-400/40",
    iconSymbol: "♥",
    dock: ["💖", "🎀", "🌸", "⭐"],
    character: "👧",
  },
  fantasy: {
    background: "bg-gradient-to-b from-green-900 to-yellow-900",
    wallpaper: "bg-gradient-to-br from-green-500 to-yellow-700",
    wallpaperImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    widget: "bg-green-500/30",
    icon: "bg-yellow-500/30",
    iconSymbol: "✦",
    dock: ["⚔️", "🛡️", "🏹", "🔮"],
    character: "🧙",
  },
  gaming: {
    background: "bg-gradient-to-b from-green-900 to-black",
    wallpaper: "bg-gradient-to-br from-green-500 to-black",
    wallpaperImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    widget: "bg-green-500/30",
    icon: "bg-green-400/40",
    iconSymbol: "🎮",
    dock: ["🎮", "🕹️", "🏆", "⚡"],
    character: "🎮",
  },
  amoled: {
    background: "bg-gradient-to-b from-black to-slate-950",
    wallpaper: "bg-gradient-to-br from-black to-slate-800",
    wallpaperImage: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=400&q=80",
    widget: "bg-slate-700/30",
    icon: "bg-slate-600/40",
    iconSymbol: "⬢",
    dock: ["⬛", "🌑", "🕶️", "⚫"],
    character: "🕶️",
  },
  cyberpunk: {
    background: "bg-gradient-to-b from-cyan-900 to-blue-950",
    wallpaper: "bg-gradient-to-br from-cyan-500 to-blue-800",
    wallpaperImage: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
    widget: "bg-cyan-500/30",
    icon: "bg-cyan-400/40",
    iconSymbol: "◉",
    dock: ["🤖", "⚙️", "💾", "🌐"],
    character: "🥷",
  },
  lofi: {
    background: "bg-gradient-to-b from-amber-900 to-orange-950",
    wallpaper: "bg-gradient-to-br from-amber-400 to-orange-600",
    wallpaperImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    widget: "bg-amber-500/30",
    icon: "bg-amber-400/40",
    iconSymbol: "♪",
    dock: ["🎵", "📚", "☕", "🌧️"],
    character: "👧",
  },
  nature: {
    background: "bg-gradient-to-b from-green-900 to-emerald-950",
    wallpaper: "bg-gradient-to-br from-green-400 to-emerald-700",
    wallpaperImage: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80",
    widget: "bg-green-500/30",
    icon: "bg-emerald-400/40",
    iconSymbol: "🌿",
    dock: ["🌲", "🌊", "🌸", "🍃"],
    character: "🧚",
  },
  space: {
    background: "bg-gradient-to-b from-indigo-950 to-black",
    wallpaper: "bg-gradient-to-br from-indigo-600 to-purple-900",
    wallpaperImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    widget: "bg-indigo-500/30",
    icon: "bg-indigo-400/40",
    iconSymbol: "★",
    dock: ["🚀", "🪐", "⭐", "🌌"],
    character: "👩‍🚀",
  },
  horror: {
    background: "bg-gradient-to-b from-red-950 to-black",
    wallpaper: "bg-gradient-to-br from-red-900 to-black",
    wallpaperImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80",
    widget: "bg-red-900/30",
    icon: "bg-red-800/40",
    iconSymbol: "💀",
    dock: ["🕯️", "🩸", "💀", "🕷️"],
    character: "🧛",
  },
  minimal: {
    background: "bg-gradient-to-b from-slate-200 to-white",
    wallpaper: "bg-gradient-to-br from-slate-100 to-slate-300",
    wallpaperImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    widget: "bg-slate-300/50",
    icon: "bg-slate-200/80",
    iconSymbol: "○",
    dock: ["◻️", "◼️", "▪️", "▫️"],
    character: "🤍",
  },
};

type DeviceType = "Android" | "iPhone" | "Tablet";

const DEVICE_SIZE: Record<DeviceType, string> = {
  Android: "w-[290px] h-[600px]",
  iPhone: "w-[270px] h-[580px]",
  Tablet: "w-[380px] h-[520px]",
};

export default function MobilePreview({
  generatedTheme,
  selectedProject,
}: MobilePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("Android");

  const theme = selectedProject || generatedTheme || {
    name: "Cyber Samurai",
    style: "cyberpunk",
    wallpaper: "Neo Tokyo Rain",
    widget: "Cyber Clock",
    character: "Female Cyber Ninja",
    type: "Theme",
  };

  const style = (theme.style || "cyberpunk").toLowerCase();
  const config = STYLE_CONFIG[style] || STYLE_CONFIG.cyberpunk;
  const projectType = theme.type || "Theme";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-4">
        Vista Previa del Dispositivo
      </h2>

      {/* Device selector */}
      <div className="flex gap-2 mb-6">
        {(["Android", "iPhone", "Tablet"] as DeviceType[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              device === d
                ? "bg-violet-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="flex justify-center">
        <div className={`${DEVICE_SIZE[device]} rounded-[40px] border-4 border-slate-700 bg-black p-3 transition-all duration-300`}>
          <div
            className="w-full h-full rounded-[32px] p-4 flex flex-col relative overflow-hidden"
            style={{
              backgroundImage: `url(${config.wallpaperImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 rounded-[32px] bg-black/40" />
            <div className="relative z-10 flex flex-col h-full">

            {/* Status Bar */}
            <div className="flex justify-between text-xs text-white mb-3">
              <span>10:45</span>
              <span>📶 WiFi 🔋 92%</span>
            </div>

            {/* Theme Name */}
            <div className="text-center mb-3">
              <h3 className="font-bold text-white">{theme.name}</h3>
              <p className="text-xs opacity-70 text-white">
                {theme.style} • {projectType}
              </p>
            </div>

            {/* Wallpaper */}
            {(projectType === "Theme" || projectType === "Wallpaper Pack") && (
              <div className="h-36 rounded-xl overflow-hidden mb-4 relative">
                <img
                  src={config.wallpaperImage}
                  alt={theme.wallpaper}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2 text-center">
                  <div className="text-xs font-bold text-white">{theme.wallpaper}</div>
                  <div className="text-xs opacity-70 text-white">Vista Previa IA</div>
                </div>
              </div>
            )}

            {/* Widget */}
            {projectType === "Theme" && (
              <div className={`rounded-xl p-3 text-center mb-4 ${config.widget}`}>
                <div className="text-xs text-white opacity-70">{theme.widget}</div>
                <div className="text-xl font-bold text-white">12:45</div>
              </div>
            )}

            {/* Icons */}
            {(projectType === "Theme" || projectType === "Icon Pack") && (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { name: "Galería", symbol: config.iconSymbol },
                  { name: "Cámara", symbol: config.iconSymbol },
                  { name: "Música", symbol: config.iconSymbol },
                  { name: "Temas", symbol: config.iconSymbol },
                  { name: "Ajustes", symbol: config.iconSymbol },
                  { name: "Calendario", symbol: config.iconSymbol },
                  { name: "Archivos", symbol: config.iconSymbol },
                  { name: "Herramientas", symbol: config.iconSymbol },
                ].map((icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${config.icon}`}>
                      {icon.symbol}
                    </div>
                    <span className="text-white text-[8px] opacity-70 text-center leading-tight">
                      {icon.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Character */}
            {(projectType === "Theme" || projectType === "Character Pack") && (
              <div className="mt-auto mb-3">
                <div className="rounded-xl bg-black/20 p-3 text-center">
                  <div className="text-4xl mb-1">{config.character}</div>
                  <div className="text-xs text-white">{theme.character}</div>
                </div>
              </div>
            )}

            {/* Dock */}
            {projectType === "Theme" && (
              <div className="grid grid-cols-4 gap-2">
                {config.dock.map((icon, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/10 p-2 text-center"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
      </div>
      {/* Botón Lanzar Vista Completa */}
      <button className="w-full mt-4 bg-violet-600 hover:bg-violet-700 transition py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
        🚀 Lanzar Vista Completa
      </button>
    </div>
  );
}