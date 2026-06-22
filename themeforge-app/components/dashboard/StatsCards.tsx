"use client";

import { useEffect, useState } from "react";

export default function StatsCards() {
  const [stats, setStats] = useState({
    projects: 0,
    wallpapers: 0,
    iconPacks: 0,
    characters: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("themeforge-projects");
    const projects = saved ? JSON.parse(saved) : [];

    const wallpapers = projects.filter(
      (p: any) => p.type === "Wallpaper Pack" || p.wallpaper
    ).length;

    const iconPacks = projects.filter(
      (p: any) => p.type === "Icon Pack" || p.iconPack
    ).length;

    const characters = projects.filter(
      (p: any) => p.type === "Character Pack" || p.character
    ).length;

    setStats({
      projects: projects.length,
      wallpapers,
      iconPacks,
      characters,
    });
  }, []);

  const cards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: "🗂️",
      color: "text-violet-400",
    },
    {
      title: "Wallpapers",
      value: stats.wallpapers,
      icon: "🖼️",
      color: "text-cyan-400",
    },
    {
      title: "Icon Packs",
      value: stats.iconPacks,
      icon: "📦",
      color: "text-pink-400",
    },
    {
      title: "Characters",
      value: stats.characters,
      icon: "🧙",
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-600 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-400">{card.title}</p>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <h3 className={`text-3xl font-bold ${card.color}`}>
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}