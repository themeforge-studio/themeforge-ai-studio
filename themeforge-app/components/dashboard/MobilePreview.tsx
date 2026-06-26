"use client";

import { useState } from "react";

type MobilePreviewProps = {
  generatedTheme?: any;
  selectedProject?: any;
};

const STYLE_CONFIG: Record<string, {
  background: string;
  wallpaperImage: string;
  widget: string;
  icon: string;
  iconSymbol: string;
  dock: string[];
  character: string;
}> = {
  anime: {
    background: "bg-gradient-to-b from-pink-900 to-purple-900",
    wallpaperImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    widget: "bg-pink-500/30",
    icon: "bg-pink-400/40",
    iconSymbol: "♥",
    dock: ["💖", "🎀", "🌸", "⭐"],
    character: "👧",
  },
  fantasy: {
    background: "bg-gradient-to-b from-green-900 to-yellow-900",
    wallpaperImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    widget: "bg-green-500/30",
    icon: "bg-yellow-500/30",
    iconSymbol: "✦",
    dock: ["⚔️", "🛡️", "🏹", "🔮"],
    character: "🧙",
  },
  gaming: {
    background: "bg-gradient-to-b from-green-900 to-black",
    wallpaperImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    widget: "bg-green-500/30",
    icon: "bg-green-400/40",
    iconSymbol: "🎮",
    dock: ["🎮", "🕹️", "🏆", "⚡"],
    character: "🎮",
  },
  amoled: {
    background: "bg-gradient-to-b from-black to-slate-950",
    wallpaperImage: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=400&q=80",
    widget: "bg-slate-700/30",
    icon: "bg-slate-600/40",
    iconSymbol: "⬢",
    dock: ["⬛", "🌑", "🕶️", "⚫"],
    character: "🕶️",
  },
  cyberpunk: {
    background: "bg-gradient-to-b from-cyan-900 to-blue-950",
    wallpaperImage: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
    widget: "bg-cyan-500/30",
    icon: "bg-cyan-400/40",
    iconSymbol: "◉",
    dock: ["🤖", "⚙️", "💾", "🌐"],
    character: "🥷",
  },
  lofi: {
    background: "bg-gradient-to-b from-amber-900 to-orange-950",
    wallpaperImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    widget: "bg-amber-500/30",
    icon: "bg-amber-400/40",
    iconSymbol: "♪",
    dock: ["🎵", "📚", "☕", "🌧️"],
    character: "👧",
  },
  nature: {
    background: "bg-gradient-to-b from-green-900 to-emerald-950",
    wallpaperImage: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80",
    widget: "bg-green-500/30",
    icon: "bg-emerald-400/40",
    iconSymbol: "🌿",
    dock: ["🌲", "🌊", "🌸", "🍃"],
    character: "🧚",
  },
  space: {
    background: "bg-gradient-to-b from-indigo-950 to-black",
    wallpaperImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    widget: "bg-indigo-500/30",
    icon: "bg-indigo-400/40",
    iconSymbol: "★",
    dock: ["🚀", "🪐", "⭐", "🌌"],
    character: "👩‍🚀",
  },
  horror: {
    background: "bg-gradient-to-b from-red-950 to-black",
    wallpaperImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80",
    widget: "bg-red-900/30",
    icon: "bg-red-800/40",
    iconSymbol: "💀",
    dock: ["🕯️", "🩸", "💀", "🕷️"],
    character: "🧛",
  },
  minimal: {
    background: "bg-gradient-to-b from-slate-200 to-white",
    wallpaperImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    widget: "bg-slate-300/50",
    icon: "bg-slate-200/80",
    iconSymbol: "○",
    dock: ["◻️", "◼️", "▪️", "▫️"],
    character: "🤍",
  },
  comics: {
    background: "bg-gradient-to-b from-yellow-900 to-red-950",
    wallpaperImage: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80",
    widget: "bg-yellow-500/30",
    icon: "bg-yellow-400/40",
    iconSymbol: "⚡",
    dock: ["🦇", "🕷️", "🛡️", "⚡"],
    character: "🦸",
  },
  kpop: {
    background: "bg-gradient-to-b from-pink-800 to-purple-950",
    wallpaperImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    widget: "bg-pink-400/30",
    icon: "bg-pink-300/40",
    iconSymbol: "⭐",
    dock: ["🎤", "💜", "⭐", "🎵"],
    character: "🌟",
  },
  retro: {
    background: "bg-gradient-to-b from-purple-900 to-pink-950",
    wallpaperImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
    widget: "bg-purple-500/30",
    icon: "bg-pink-400/40",
    iconSymbol: "◈",
    dock: ["🕹️", "📼", "💾", "🎮"],
    character: "🤖",
  },
  streetwear: {
    background: "bg-gradient-to-b from-gray-900 to-slate-950",
    wallpaperImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    widget: "bg-gray-500/30",
    icon: "bg-gray-400/40",
    iconSymbol: "✦",
    dock: ["🎨", "🛹", "🎧", "✌️"],
    character: "🎨",
  },
};

type DeviceType = "Android" | "iPhone" | "Tablet" | "Xiaomi Pro" | "Xiaomi Pro Max" | "Samsung";

const DEVICE_SIZE: Record<DeviceType, string> = {
  Android: "w-[290px] h-[600px]",
  iPhone: "w-[270px] h-[580px]",
  Tablet: "w-[380px] h-[520px]",
  "Xiaomi Pro": "w-[290px] h-[600px]",
  "Xiaomi Pro Max": "w-[300px] h-[620px]",
  Samsung: "w-[290px] h-[600px]",
};

const XIAOMI_BACK_SCREEN: Record<string, { width: string; height: string; label: string }> = {
  "Xiaomi Pro": { width: "w-[280px]", height: "h-[150px]", label: "Pantalla Trasera 2.66\" — Xiaomi 17 Pro" },
  "Xiaomi Pro Max": { width: "w-[280px]", height: "h-[165px]", label: "Pantalla Trasera 2.86\" — Xiaomi 17 Pro Max" },
};

export default function MobilePreview({
  generatedTheme,
  selectedProject,
}: MobilePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("Android");
  const [showFullPreview, setShowFullPreview] = useState(false);

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

  // Usa imagen subida por el usuario si existe
  const wallpaperImageUrl = theme.wallpaperImage || config.wallpaperImage;
  const projectType = theme.type || "Theme";

  const icons = [
  { name: "WhatsApp",   file: "whatsapp"   },
  { name: "Instagram",  file: "instagram"  },
  { name: "TikTok",     file: "tiktok"     },
  { name: "Telegram",   file: "telegram"   },
  { name: "Facebook",   file: "facebook"   },
  { name: "X",          file: "X"    },
  { name: "YouTube",    file: "youtube"    },
  { name: "Gmail",      file: "gmail"      },
  { name: "Teléfono",   file: "telefono"   },
  { name: "Cámara",     file: "camara"     },
  { name: "Galería",    file: "galeria"    },
  { name: "Música",     file: "musica"     },
  { name: "Calendario", file: "calendario" },
  { name: "Archivos",   file: "archivos"   },
  { name: "Mapa",       file: "mapa"       },
  { name: "Ajustes",    file: "ajustes"    },
];

const ICON_BASE_URL = "https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/iconPack/ghibli-magical-forest";
  
return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      {/* Modal Vista Completa */}
      {showFullPreview && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowFullPreview(false)}
        >
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-4">Haz clic para cerrar</p>
            <div className="w-[380px] h-[780px] rounded-[50px] border-4 border-slate-600 bg-black p-4 mx-auto overflow-hidden">
              <div
                className="w-full h-full rounded-[40px] p-5 flex flex-col relative overflow-hidden"
                style={{
                  backgroundImage: `url(${wallpaperImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 rounded-[40px] bg-black/40" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between text-xs text-white mb-3">
                    <span>10:45</span>
                    <span>📶 WiFi 🔋 92%</span>
                  </div>
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-white text-lg">{theme.name}</h3>
                    <p className="text-xs opacity-70 text-white">{theme.style} • {projectType}</p>
                  </div>
                  <div className="text-center text-white text-4xl font-bold">12:45</div>
                  <div className="text-center text-white text-sm opacity-70 mt-1 mb-4">
                    {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {icons.map((icon, i) => {
                      const iconUrl = theme.iconPackUrls?.[i] 
                        || (theme.style === "fantasy" ? `${ICON_BASE_URL}/${icon.file}.png` : null);

                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl overflow-hidden ${config.icon}`}>
                            {iconUrl ? (
                              <img
                                src={iconUrl}
                                alt={icon.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              config.iconSymbol
                            )}
                          </div>
                          <span className="text-white text-[9px] opacity-70">{icon.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-auto">
                    <div className="rounded-xl bg-black/20 p-2 text-center">
                      {theme.characterImage ? (
                        <img
                          src={theme.characterImage}
                          alt={theme.character}
                          className="w-40 h-52 object-contain mx-auto"
                        />
                      ) : (
                        <div className="text-3xl">{config.character}</div>
                      )}
                      <div className="text-white text-xs opacity-60">{theme.character}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Vista Previa del Dispositivo</h2>

      {/* Device selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["Android", "iPhone", "Tablet", "Samsung", "Xiaomi Pro", "Xiaomi Pro Max"] as DeviceType[]).map((d) => (
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
        <div className={`${DEVICE_SIZE[device]} rounded-[40px] border-4 border-slate-700 bg-black p-3 transition-all duration-300 overflow-hidden`}>
          <div
            className="w-full h-full rounded-[32px] p-3 flex flex-col relative overflow-hidden"
            style={{
              backgroundImage: `url(${wallpaperImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 rounded-[32px] bg-black/20" />
            <div className="relative z-10 flex flex-col h-full overflow-hidden">

              {/* Status Bar */}
              <div className="flex justify-between text-xs text-white mb-2">
                <span>10:45</span>
                <span>📶 WiFi 🔋 92%</span>
              </div>

              {/* Theme Name */}
              <div className="text-center mb-2">
                <h3 className="font-bold text-white text-sm">{theme.name}</h3>
                <p className="text-xs opacity-70 text-white">{theme.style} • {projectType}</p>
              </div>

              {/* Wallpaper preview */}
              {(projectType === "Theme" || projectType === "Wallpaper Pack") && (
                <div className="h-24 rounded-xl overflow-hidden mb-2 relative flex-shrink-0">
                  <img
                    src={wallpaperImageUrl}
                    alt={theme.wallpaper}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-1 text-center">
                    <div className="text-xs font-bold text-white truncate">{theme.wallpaper}</div>
                    <div className="text-xs opacity-70 text-white">Vista Previa IA</div>
                  </div>
                </div>
              )}

              {/* Widget */}
              {projectType === "Theme" && (
                <div className={`rounded-xl p-1.5 text-center mb-2 flex-shrink-0 ${config.widget}`}>
                  <div className="text-xs text-white opacity-70 truncate">{theme.widget}</div>
                  <div className="text-base font-bold text-white">12:45</div>
                </div>
              )}

              {/* Icons */}
              {(projectType === "Theme" || projectType === "Icon Pack" || projectType === "Wallpaper Pack") && (
                <div className="grid grid-cols-4 gap-1.5 mb-2 flex-shrink-0">
                  {icons.map((icon, i) => {
                    // Si el tema tiene iconos individuales en Supabase, úsalos
                    const iconUrl = theme.iconPackUrls?.[i] 
                      || (theme.style === "fantasy" ? `${ICON_BASE_URL}/${icon.file}.png` : null);
                    
                    return (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm overflow-hidden ${config.icon}`}>
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={icon.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            config.iconSymbol
                          )}
                        </div>
                        <span className="text-white text-[7px] opacity-70 text-center leading-tight">
                          {icon.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Character */}
              {(projectType === "Theme" || projectType === "Character Pack" || projectType === "Wallpaper Pack") && (
                <div className="mt-auto flex-shrink-0">
                  <div className="rounded-xl bg-black/20 p-1.5 text-center">
                    {theme.characterImage ? (
                      <img
                        src={theme.characterImage}
                        alt={theme.character}
                        className="w-40 h-52 object-contain mx-auto"
                      />
                    ) : (
                      <div className="text-xl">{config.character}</div>
                    )}
                    <div className="text-xs text-white truncate">{theme.character}</div>
                  </div>
                </div>
              )}

              {/* Dock */}
              {projectType === "Theme" && (
                <div className="grid grid-cols-4 gap-1.5 mt-1 flex-shrink-0">
                  {config.dock.map((icon, i) => (
                    <div key={i} className="rounded-xl bg-white/10 p-1.5 text-center text-sm">
                      {icon}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Samsung One UI Preview */}
{device === "Samsung" && (
  <div className="mt-6 flex flex-col items-center">
    <p className="text-slate-400 text-sm mb-4">
      📱 Samsung One UI — Galaxy S25
    </p>
    <div
      className="relative w-[290px] h-[600px] rounded-[40px] border-4 border-slate-700 bg-black overflow-hidden"
      style={{
        backgroundImage: `url(${wallpaperImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col h-full p-4">

        {/* Status Bar Samsung */}
        <div className="flex justify-between text-xs text-white mb-4">
          <span className="font-medium">10:45</span>
          <span>▲ 📶 WiFi 🔋</span>
        </div>

        {/* Fecha Samsung style */}
        <div className="mb-4">
          <div className="text-white text-4xl font-light">10:45</div>
          <div className="text-white/70 text-sm mt-1">
            {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </div>

        {/* Widget Samsung */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 mb-4">
          <div className="text-white text-sm opacity-70 mb-1">{theme.widget}</div>
          <div className="text-white text-2xl font-light">24° ☀️</div>
          <div className="text-white/60 text-xs mt-1">Lima, Perú</div>
        </div>

        {/* Iconos Samsung One UI */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { name: "Teléfono", color: "bg-green-500", symbol: "📞" },
            { name: "Mensajes", color: "bg-blue-500", symbol: "💬" },
            { name: "Cámara", color: "bg-gray-700", symbol: "📷" },
            { name: "Internet", color: "bg-blue-600", symbol: "🌐" },
            { name: "Galería", color: "bg-purple-500", symbol: "🖼️" },
            { name: "Ajustes", color: "bg-gray-600", symbol: "⚙️" },
            { name: "Play", color: "bg-white", symbol: "▶️" },
            { name: "Temas", color: `${config.icon}`, symbol: config.iconSymbol },
          ].map((icon, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${icon.color}`}>
                {icon.symbol}
              </div>
              <span className="text-white text-[8px] opacity-80">{icon.name}</span>
            </div>
          ))}
        </div>

        {/* Character */}
        <div className="mt-auto mb-2">
          <div className="text-center">
            <div className="text-3xl">{config.character}</div>
            <div className="text-white text-xs opacity-60">{theme.character}</div>
          </div>
        </div>

        {/* Dock Samsung */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-3">
          <div className="grid grid-cols-4 gap-2">
            {["📞", "💬", "🌐", "📷"].map((icon, i) => (
              <div key={i} className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-lg mx-auto">
                {icon}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    <p className="text-slate-500 text-xs mt-3">Samsung Galaxy S25 — One UI 7</p>
  </div>
)}

      {/* Xiaomi Preview especial */}
      {(device === "Xiaomi Pro" || device === "Xiaomi Pro Max") && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-slate-400 text-sm mb-4">
            📱 {XIAOMI_BACK_SCREEN[device].label}
          </p>
          <div className={`relative ${XIAOMI_BACK_SCREEN[device].width} ${XIAOMI_BACK_SCREEN[device].height} bg-slate-800 rounded-2xl border-4 border-slate-600 overflow-hidden flex items-center justify-center`}
      style={{
        backgroundImage: `url(${wallpaperImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-full" />
      <div className="relative z-10 text-center p-6">
        <div className="text-white text-5xl font-bold mb-1">12:45</div>
        <div className="text-white text-sm opacity-70 mb-4">
          {new Date().toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })}
        </div>
        <div className="text-4xl mb-2">{config.character}</div>
        <div className="text-white text-xs opacity-70">{theme.name}</div>
      </div>
    </div>
    <p className="text-slate-500 text-xs mt-3">
      Pantalla circular trasera de 1.43"
    </p>
  </div>
)}

      {/* Botón Lanzar Vista Completa */}
      <button
        onClick={() => setShowFullPreview(true)}
        className="w-full mt-4 bg-violet-600 hover:bg-violet-700 transition py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
      >
        🚀 Lanzar Vista Completa
      </button>
    </div>
  );
}