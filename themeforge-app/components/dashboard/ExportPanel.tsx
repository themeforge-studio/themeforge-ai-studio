"use client";

import { useState } from "react";

type ExportPanelProps = {
  generatedTheme?: any;
  selectedProject?: any;
};

export default function ExportPanel({
  generatedTheme,
  selectedProject,
}: ExportPanelProps) {
  const [exported, setExported] = useState<string | null>(null);

  const theme = selectedProject || generatedTheme || {
    name: "Cyber Samurai",
    style: "cyberpunk",
    wallpaper: "Neo Tokyo Rain",
    iconPack: "Cyber Glass",
    character: "Female Cyber Ninja",
    widget: "Cyber Clock",
  };

  const handleExport = (platform: string, format: string) => {
    const specs: Record<string, any> = {
      android: {
        wallpaper: { width: 1080, height: 1920, format: "JPG/PNG", maxSize: "5MB" },
        icon: { width: 512, height: 512, format: "PNG", maxSize: "1MB", notes: "Google Play Store" },
        iconLauncher: { width: 108, height: 108, format: "PNG", unit: "dp", safeZone: "72x72dp" },
        widget2x2: { width: 148, height: 148, format: "PNG/XML" },
        widget4x2: { width: 296, height: 148, format: "PNG/XML" },
        widget4x4: { width: 296, height: 296, format: "PNG/XML" },
      },
      iphone: {
        wallpaper: { width: 1170, height: 2532, format: "JPG/PNG", maxSize: "5MB", notes: "iPhone 14/15" },
        icon: { width: 1024, height: 1024, format: "PNG opaco", maxSize: "1MB", notes: "App Store — sin transparencia" },
        iconHome: { width: 180, height: 180, format: "PNG", notes: "iPhone 14 Pro @3x" },
      },
      xiaomi: {
        wallpaperPro: { width: 904, height: 572, format: "JPG/PNG", notes: "Xiaomi 17 Pro — pantalla trasera 2.66\"" },
        wallpaperProMax: { width: 976, height: 596, format: "JPG/PNG", notes: "Xiaomi 17 Pro Max — pantalla trasera 2.86\"" },
        wallpaperFront: { width: 1080, height: 2400, format: "JPG/PNG", notes: "Pantalla principal" },
      },
      samsung: {
        wallpaper: { width: 1080, height: 2340, format: "JPG/PNG", notes: "Samsung Galaxy S25" },
        icon: { width: 512, height: 512, format: "PNG", notes: "Galaxy Store" },
      },
    };

    const data = {
      proyecto: theme.name,
      estilo: theme.style,
      plataforma: platform,
      formato: format,
      version: "1.0",
      generadoPor: "ThemeForge AI Studio",
      fecha: new Date().toLocaleDateString("es-ES"),
      assets: {
        wallpaper: theme.wallpaper || "Sin asignar",
        iconPack: theme.iconPack || "Sin asignar",
        personaje: theme.character || "Sin asignar",
        widget: theme.widget || "Sin asignar",
        imagenWallpaper: theme.wallpaperImage || null,
      },
      especificaciones: specs[platform.toLowerCase()] || specs.android,
      instrucciones: platform === "Android"
        ? [
            "1. Exporta el wallpaper en JPG a 1080x1920px desde Leonardo AI",
            "2. Exporta los iconos en PNG a 512x512px con fondo transparente",
            "3. Sube el wallpaper a Google Play como Live Wallpaper o wallpaper estático",
            "4. Para iconos usa Nova Launcher o KLWP para aplicar el pack",
            "5. Empaqueta todo en un ZIP para vender en Etsy/Gumroad",
          ]
        : platform === "iPhone"
        ? [
            "1. Exporta el wallpaper en JPG a 1170x2532px desde Leonardo AI",
            "2. Exporta los iconos en PNG opaco a 1024x1024px sin transparencia",
            "3. Los usuarios aplican wallpapers desde Ajustes → Fondo de pantalla",
            "4. Para iconos en iPhone usa atajos de Siri (Shortcuts)",
            "5. Empaqueta todo en un ZIP para vender en Etsy/Gumroad",
          ]
        : platform === "Xiaomi"
        ? [
            "1. Exporta wallpaper principal a 1080x2400px",
            "2. Exporta wallpaper pantalla trasera Pro a 904x572px",
            "3. Exporta wallpaper pantalla trasera Pro Max a 976x596px",
            "4. Los usuarios aplican desde Ajustes → Pantalla trasera",
            "5. Empaqueta todo indicando compatibilidad con Xiaomi 17 Pro/Pro Max",
          ]
        : [
            "1. Exporta el wallpaper en JPG a 1080x2340px desde Leonardo AI",
            "2. Exporta los iconos en PNG a 512x512px para Galaxy Store",
            "3. Los usuarios aplican desde Good Lock o Samsung Themes",
            "4. Empaqueta todo en un ZIP para vender",
          ],
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${theme.name}-${platform}-export.json`;
    link.click();
    URL.revokeObjectURL(url);

    setExported(platform);
    setTimeout(() => setExported(null), 3000);
  };

  const PLATFORMS = [
    {
      key: "android",
      label: "Android",
      emoji: "🤖",
      color: "from-green-600 to-emerald-700",
      border: "border-green-500/30",
      specs: ["Wallpaper: 1080x1920px", "Icono: 512x512px", "Widget: 148x148px"],
      stores: ["Google Play Store", "Etsy", "Gumroad"],
    },
    {
      key: "iphone",
      label: "iPhone",
      emoji: "🍎",
      color: "from-slate-600 to-slate-700",
      border: "border-slate-500/30",
      specs: ["Wallpaper: 1170x2532px", "Icono: 1024x1024px", "Sin transparencia"],
      stores: ["App Store", "Etsy", "Gumroad"],
    },
    {
      key: "xiaomi",
      label: "Xiaomi 17",
      emoji: "📱",
      color: "from-orange-600 to-red-700",
      border: "border-orange-500/30",
      specs: ["Principal: 1080x2400px", "Trasera Pro: 904x572px", "Trasera Pro Max: 976x596px"],
      stores: ["Etsy", "Gumroad", "Mi Store"],
    },
    {
      key: "samsung",
      label: "Samsung",
      emoji: "💙",
      color: "from-blue-600 to-indigo-700",
      border: "border-blue-500/30",
      specs: ["Wallpaper: 1080x2340px", "Icono: 512x512px", "Galaxy Store"],
      stores: ["Galaxy Store", "Etsy", "Gumroad"],
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Exportar Tema</h2>
        <p className="text-slate-400 text-sm">
          Exporta <span className="text-white font-medium">{theme.name}</span> con las especificaciones correctas para cada plataforma
        </p>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.key}
            className={`rounded-xl border ${platform.border} bg-slate-800/50 p-5`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-2xl`}>
                {platform.emoji}
              </div>
              <div>
                <h3 className="font-bold text-lg">{platform.label}</h3>
                <div className="flex gap-1 flex-wrap mt-1">
                  {platform.stores.map((store, i) => (
                    <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                      {store}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-1 mb-4">
              {platform.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">{spec}</span>
                </div>
              ))}
            </div>

            {/* Export button */}
            <button
              onClick={() => handleExport(platform.label, "JSON")}
              className={`w-full bg-gradient-to-r ${platform.color} hover:opacity-90 transition py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2`}
            >
              {exported === platform.label ? "✅ ¡Exportado!" : `⬇️ Exportar para ${platform.label}`}
            </button>
          </div>
        ))}
      </div>

      {/* Export all */}
      <button
        onClick={() => {
          PLATFORMS.forEach(p => handleExport(p.label, "JSON"));
        }}
        className="w-full bg-violet-600 hover:bg-violet-700 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
      >
        🚀 Exportar para Todas las Plataformas
      </button>

      {/* Info */}
      <div className="mt-4 bg-slate-800/50 rounded-xl p-4">
        <p className="text-xs text-slate-400 text-center">
          💡 El archivo exportado incluye las especificaciones técnicas e instrucciones para cada plataforma.
          Úsalo como guía al crear los assets en Leonardo AI.
        </p>
      </div>

    </div>
  );
}