"use client";

import Sidebar from "../../components/layout/Sidebar";

const SPECS = {
  wallpapers: {
    title: "Wallpapers",
    emoji: "🖼️",
    color: "violet",
    items: [
      {
        device: "Android (Estándar)",
        resolution: "1080 x 1920px",
        format: "JPG / PNG",
        size: "Max 5MB",
        notes: "Full HD vertical — compatible con la mayoría de Android",
        prompt: "portrait wallpaper 1080x1920, vertical orientation, phone wallpaper",
      },
      {
        device: "Android (4K)",
        resolution: "1440 x 2560px",
        format: "JPG / PNG",
        size: "Max 10MB",
        notes: "Ultra HD — para celulares premium",
        prompt: "4K portrait wallpaper 1440x2560, ultra HD, phone wallpaper",
      },
      {
        device: "iPhone (14/15 Pro)",
        resolution: "1170 x 2532px",
        format: "JPG / PNG",
        size: "Max 5MB",
        notes: "Resolución exacta del iPhone 14/15",
        prompt: "iPhone wallpaper 1170x2532, portrait, vertical",
      },
      {
        device: "Xiaomi 17 Pro (trasera)",
        resolution: "904 x 572px",
        format: "JPG / PNG",
        size: "Max 2MB",
        notes: "Pantalla trasera AMOLED 2.66\"",
        prompt: "small screen wallpaper 904x572, landscape, rear display",
      },
      {
        device: "Xiaomi 17 Pro Max (trasera)",
        resolution: "976 x 596px",
        format: "JPG / PNG",
        size: "Max 2MB",
        notes: "Pantalla trasera AMOLED 2.86\"",
        prompt: "small screen wallpaper 976x596, landscape, rear display",
      },
      {
        device: "Samsung Galaxy S25",
        resolution: "1080 x 2340px",
        format: "JPG / PNG",
        size: "Max 5MB",
        notes: "Resolución nativa Samsung Galaxy S25",
        prompt: "Samsung wallpaper 1080x2340, portrait, vertical phone",
      },
    ],
  },
  icons: {
    title: "Iconos",
    emoji: "📦",
    color: "cyan",
    items: [
      {
        device: "Android (Google Play)",
        resolution: "512 x 512px",
        format: "PNG",
        size: "Max 1MB",
        notes: "Requerido para publicar en Google Play Store",
        prompt: "app icon 512x512, transparent background, Android adaptive icon",
      },
      {
        device: "Android (Launcher)",
        resolution: "108 x 108dp",
        format: "PNG / XML",
        size: "Max 500KB",
        notes: "Zona segura: 72x72dp — el sistema aplica la máscara",
        prompt: "app icon, safe zone 72x72dp, adaptive icon, foreground layer",
      },
      {
        device: "iPhone (App Store)",
        resolution: "1024 x 1024px",
        format: "PNG opaco",
        size: "Max 1MB",
        notes: "Sin transparencia — Apple aplica máscara automáticamente",
        prompt: "iOS app icon 1024x1024, opaque background, no transparency, square",
      },
      {
        device: "iPhone (Home Screen)",
        resolution: "180 x 180px",
        format: "PNG",
        size: "Max 200KB",
        notes: "Para iPhone 14 Pro y superiores (@3x)",
        prompt: "iOS home screen icon 180x180, clean design, simple",
      },
    ],
  },
  characters: {
    title: "Personajes",
    emoji: "🧙",
    color: "pink",
    items: [
      {
        device: "Personaje estático",
        resolution: "512 x 512px",
        format: "PNG transparente",
        size: "Max 2MB",
        notes: "Fondo transparente — se superpone al wallpaper",
        prompt: "character illustration, transparent background, PNG, full body, no background",
      },
      {
        device: "Personaje animado (Lottie)",
        resolution: "512 x 512px",
        format: "JSON (Lottie)",
        size: "Max 500KB",
        notes: "Formato moderno para animaciones — requiere código",
        prompt: "character sprite sheet, transparent background, animation frames",
      },
      {
        device: "Live Wallpaper Android",
        resolution: "1080 x 1920px",
        format: "APK / WebP animado",
        size: "Max 50MB",
        notes: "Requiere desarrollo Android nativo — Fase 3",
        prompt: "animated wallpaper background loop, seamless animation",
      },
    ],
  },
  widgets: {
    title: "Widgets",
    emoji: "⚙️",
    color: "amber",
    items: [
      {
        device: "Widget pequeño (2x2)",
        resolution: "148 x 148px",
        format: "PNG / XML",
        size: "Max 500KB",
        notes: "Widget mínimo en Android",
        prompt: "small widget 148x148, clock widget, minimal design, dark background",
      },
      {
        device: "Widget mediano (4x2)",
        resolution: "296 x 148px",
        format: "PNG / XML",
        size: "Max 1MB",
        notes: "Widget horizontal estándar",
        prompt: "medium widget 296x148, weather widget, horizontal layout",
      },
      {
        device: "Widget grande (4x4)",
        resolution: "296 x 296px",
        format: "PNG / XML",
        size: "Max 2MB",
        notes: "Widget cuadrado grande",
        prompt: "large widget 296x296, calendar widget, square layout",
      },
    ],
  },
};

const colorMap: Record<string, string> = {
  violet: "border-violet-500/30 bg-violet-600/10",
  cyan: "border-cyan-500/30 bg-cyan-600/10",
  pink: "border-pink-500/30 bg-pink-600/10",
  amber: "border-amber-500/30 bg-amber-600/10",
};

const badgeMap: Record<string, string> = {
  violet: "bg-violet-500/20 text-violet-400",
  cyan: "bg-cyan-500/20 text-cyan-400",
  pink: "bg-pink-500/20 text-pink-400",
  amber: "bg-amber-500/20 text-amber-400",
};

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Especificaciones Técnicas
          </h1>
          <p className="mt-2 text-slate-400">
            Medidas y formatos oficiales para crear assets profesionales
          </p>
        </div>

        {/* Quick reference */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { emoji: "🖼️", label: "Wallpaper Android", value: "1080x1920px" },
            { emoji: "🍎", label: "Wallpaper iPhone", value: "1170x2532px" },
            { emoji: "📦", label: "Icono Play Store", value: "512x512px" },
            { emoji: "🍎", label: "Icono App Store", value: "1024x1024px" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="text-xs text-slate-400 mb-1">{item.label}</p>
              <p className="font-bold text-violet-400">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Specs sections */}
        {Object.values(SPECS).map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {section.emoji} {section.title}
            </h2>
            <div className="grid gap-3">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${colorMap[section.color]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{item.device}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${badgeMap[section.color]}`}>
                          {item.format}
                        </span>
                        <span className="text-xs text-slate-500">{item.size}</span>
                      </div>
                      <div className="flex items-center gap-6 mb-2">
                        <div>
                          <p className="text-xs text-slate-500">Resolución</p>
                          <p className="font-bold text-white">{item.resolution}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{item.notes}</p>
                      <div className="bg-black/20 rounded-lg p-2 flex items-center justify-between">
                        <p className="text-xs text-slate-400 flex-1">{item.prompt}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(item.prompt)}
                          className="text-xs text-violet-400 hover:text-violet-300 ml-3 flex-shrink-0"
                        >
                          📋 Copiar prompt
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Guía rápida */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🚀 Guía Rápida — Flujo de Creación</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { step: "1", title: "Genera el prompt", desc: "Usa el Generador de Temas con IA", emoji: "✨" },
              { step: "2", title: "Crea en Leonardo", desc: "Pega el prompt con la resolución correcta", emoji: "🎨" },
              { step: "3", title: "Sube a ThemeForge", desc: "Usa el botón 📁 Subir imagen", emoji: "⬆️" },
              { step: "4", title: "Exporta y vende", desc: "Exporta en formato Android o iPhone", emoji: "💰" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 bg-slate-800 rounded-xl">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="w-6 h-6 rounded-full bg-violet-600 text-xs font-bold flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}