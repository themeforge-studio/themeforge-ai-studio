"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

const PRODUCTS = [
  {
    id: 1,
    name: "Cyber Samurai Pro",
    style: "cyberpunk",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
    price: "$4.99",
    sales: 234,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Anime Dreams Pack",
    style: "anime",
    type: "Wallpaper Pack",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    price: "$2.99",
    sales: 189,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Dark AMOLED Elite",
    style: "amoled",
    type: "Icon Pack",
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=400&q=80",
    price: "$3.99",
    sales: 312,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Fantasy Kingdom",
    style: "fantasy",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    price: "$5.99",
    sales: 156,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Space Explorer",
    style: "space",
    type: "Theme Pack",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    price: "$4.99",
    sales: 98,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Lofi Chill Vibes",
    style: "lofi",
    type: "Wallpaper Pack",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    price: "$1.99",
    sales: 421,
    rating: 4.9,
  },
];

export default function MarketplacePage() {
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: "Todos" },
    { key: "Theme Pack", label: "Temas" },
    { key: "Wallpaper Pack", label: "Wallpapers" },
    { key: "Icon Pack", label: "Iconos" },
  ];

  const filtered = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Marketplace
            </h1>
            <p className="mt-2 text-slate-400">
              Vende tus temas y wallpapers al mundo
            </p>
          </div>
          <button
            onClick={() => window.location.href = "/projects"}
            className="bg-violet-600 hover:bg-violet-700 transition px-5 py-3 rounded-xl font-semibold text-sm"
          >
            + Publicar Tema
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Total Ventas</p>
            <h3 className="text-3xl font-bold text-violet-400 mt-2">1,410</h3>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Ingresos</p>
            <h3 className="text-3xl font-bold text-green-400 mt-2">$4,230</h3>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Productos</p>
            <h3 className="text-3xl font-bold text-cyan-400 mt-2">{PRODUCTS.length}</h3>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Rating Promedio</p>
            <h3 className="text-3xl font-bold text-amber-400 mt-2">4.7 ⭐</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                filter === f.key
                  ? "bg-violet-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-violet-500/50 transition"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-lg text-xs">
                  {product.type}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-violet-600/80 text-white text-xs px-2 py-1 rounded-lg">
                    {product.style}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{product.name}</h3>
                  <span className="text-violet-400 font-bold">{product.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>⭐ {product.rating}</span>
                  <span>{product.sales} ventas</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => alert(`Vista previa de ${product.name}`)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-sm py-2 rounded-lg transition"
                  >
                    Vista Previa
                  </button>
                  <button
                    onClick={() => alert(`¡${product.name} publicado en el marketplace!`)}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-sm py-2 rounded-lg transition"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}