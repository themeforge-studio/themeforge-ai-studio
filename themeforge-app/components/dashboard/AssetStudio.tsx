"use client";

import { useState } from "react";
import { assetLibrary } from "./assetLibrary";

type AssetStudioProps = {
  generatedTheme?: any;
  selectedProject?: any;
};

const STYLE_IMAGES: Record<string, Record<string, string>> = {
  cyberpunk: {
    wallpaper: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  anime: {
    wallpaper: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80",
    character: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  fantasy: {
    wallpaper: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&q=80",
    character: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  gaming: {
    wallpaper: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  amoled: {
    wallpaper: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  lofi: {
    wallpaper: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  nature: {
    wallpaper: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  space: {
    wallpaper: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  horror: {
    wallpaper: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  minimal: {
    wallpaper: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    iconPack: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    character: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    widget: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
};

const ASSET_LABELS: Record<string, { emoji: string; detail: string }> = {
  wallpaper: { emoji: "🖼️", detail: "4K Resolution" },
  iconPack: { emoji: "📦", detail: "64 Icons" },
  character: { emoji: "🧙", detail: "High Detail" },
  widget: { emoji: "⚙️", detail: "Animated Widget" },
};

export default function AssetStudio({
  generatedTheme,
  selectedProject,
}: AssetStudioProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const style = (
    selectedProject?.style ||
    generatedTheme?.style ||
    "cyberpunk"
  ).toLowerCase();

  const fallbackAssets =
    assetLibrary[style as keyof typeof assetLibrary] ||
    assetLibrary["fantasy"];

  const resolve = (fromProject: any, fromTheme: any, fallback: string) => {
    if (fromProject != null) return fromProject;
    if (fromTheme != null) return fromTheme;
    return fallback;
  };

  const assets = {
    wallpaper: resolve(selectedProject?.wallpaper, generatedTheme?.wallpaper, fallbackAssets.wallpaper),
    iconPack: resolve(selectedProject?.iconPack, generatedTheme?.iconPack, fallbackAssets.iconPack),
    character: resolve(selectedProject?.character, generatedTheme?.character, fallbackAssets.character),
    widget: resolve(selectedProject?.widget, generatedTheme?.widget, fallbackAssets.widget),
  };

  const styleImages = STYLE_IMAGES[style] || STYLE_IMAGES.cyberpunk;

  const allCards = [
    { key: "wallpaper", title: "Wallpaper", name: assets.wallpaper, image: styleImages.wallpaper },
    { key: "iconPack", title: "Icon Pack", name: assets.iconPack, image: styleImages.iconPack },
    { key: "character", title: "Character", name: assets.character, image: styleImages.character },
    { key: "widget", title: "Widget", name: assets.widget, image: styleImages.widget },
  ];

  const filters = [
    { key: "all", label: "Todos" },
    { key: "wallpaper", label: "Wallpapers" },
    { key: "iconPack", label: "Icon Packs" },
    { key: "character", label: "Personajes" },
    { key: "widget", label: "Widgets" },
  ];

  const visibleCards = activeFilter === "all"
    ? allCards
    : allCards.filter((c) => c.key === activeFilter);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">AI Asset Studio</h2>
          <p className="text-slate-400 text-sm mt-1">
            Todos los assets generados por IA para tu tema.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-sm transition">
          🔄 Regenerar Todo
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              activeFilter === f.key
                ? "bg-violet-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-2 gap-4">
        {visibleCards.map((card) => {
          const label = ASSET_LABELS[card.key];
          return (
            <div
              key={card.key}
              className="rounded-xl border border-slate-700 bg-slate-800 overflow-hidden hover:border-violet-500/50 transition"
            >
              {/* Image */}
              <div className="h-36 relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-lg text-xs text-white">
                  {label.emoji} {card.title}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-white mb-1">{card.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{label.detail}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-sm py-2 rounded-lg transition">
                    Vista Previa
                  </button>
                  <button className="flex-1 bg-violet-600/20 hover:bg-violet-600/40 text-violet-400 text-sm py-2 rounded-lg border border-violet-500/30 transition">
                    Regenerar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}