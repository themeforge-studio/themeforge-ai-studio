"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

const CATEGORIES = [
  { key: "anime", label: "Anime", emoji: "🌸" },
  { key: "peliculas", label: "Películas", emoji: "🎬" },
  { key: "series", label: "Series", emoji: "📺" },
  { key: "videojuegos", label: "Videojuegos", emoji: "🎮" },
  { key: "musica", label: "Música", emoji: "🎵" },
  { key: "temas", label: "Temas Mobile", emoji: "📱" },
  { key: "ciencia_ficcion", label: "Ciencia Ficción", emoji: "🚀" },
  { key: "fantasia", label: "Fantasía", emoji: "🧙" },
  { key: "horror", label: "Horror", emoji: "💀" },
  { key: "comics", label: "Comics", emoji: "⚡" },
];

const COUNTRIES = [
  { key: "global", label: "Global", flag: "🌍" },
  { key: "peru", label: "Perú", flag: "🇵🇪" },
  { key: "latinoamerica", label: "Latinoamérica", flag: "🌎" },
  { key: "usa", label: "USA", flag: "🇺🇸" },
  { key: "japon", label: "Japón", flag: "🇯🇵" },
  { key: "corea", label: "Corea del Sur", flag: "🇰🇷" },
  { key: "china", label: "China", flag: "🇨🇳" },
  { key: "uk", label: "Reino Unido", flag: "🇬🇧" },
  { key: "brasil", label: "Brasil", flag: "🇧🇷" },
  { key: "mexico", label: "México", flag: "🇲🇽" },
  { key: "españa", label: "España", flag: "🇪🇸" },
  { key: "rusia", label: "Rusia", flag: "🇷🇺" },
  { key: "india", label: "India", flag: "🇮🇳" },
  { key: "alemania", label: "Alemania", flag: "🇩🇪" },
  { key: "francia", label: "Francia", flag: "🇫🇷" },
];

export default function TendenciasPage() {
  const [selectedCategory, setSelectedCategory] = useState("anime");
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<any[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const fetchTrends = async () => {
    setLoading(true);
    setTrends([]);
    setAiSuggestion("");

    try {
      const category = CATEGORIES.find(c => c.key === selectedCategory);
      const country = COUNTRIES.find(c => c.key === selectedCountry);

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `Eres un experto en tendencias de cultura pop y diseño mobile. Responde SOLO con JSON válido.`,
            },
            {
              role: "user",
              content: `Dame las 6 tendencias más populares de ${category?.label} en ${country?.label} en 2025-2026.
              Sé muy específico con nombres reales: si es anime menciona "Demon Slayer", "One Piece", etc. Si es películas menciona títulos reales. Si es series menciona nombres reales.
              JSON exacto:
              {
                "tendencias": [
                  {
                    "nombre": "nombre específico real (ej: Demon Slayer, Interstellar, etc)",
                    "descripcion": "por qué está en tendencia ahora, 1 oración",
                    "popularidad": 95,
                    "emoji": "emoji representativo",
                    "potencialVenta": "Alto/Medio/Bajo",
                    "razon": "por qué se vendería bien como tema de celular",
                    "prompt": "prompt detallado en inglés para generar wallpaper en Leonardo AI fiel a este título"
                  }
                ],
                "recomendacion": "cuál crear primero y por qué, 1 oración"
              }`,
            },
          ],
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "{}";
      const clean = text.replace(/```json|```/g, "").trim();

      let parsed = { tendencias: [], recomendacion: "" };
      try {
      parsed = JSON.parse(clean);
      } catch {
        // Si el JSON está incompleto, intenta extraer lo que hay
        const match = clean.match(/\{[\s\S]*"tendencias"\s*:\s*\[[\s\S]*?\]/);
        if (match) {
            try {
            const partial = match[0] + ',"recomendacion":""}';
            parsed = JSON.parse(partial);
            } catch {
            console.error("No se pudo parsear el JSON");
            }
        }
    }

      setTrends(parsed.tendencias || []);
      setAiSuggestion(parsed.recomendacion || "");

    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const potencialColor = (potencial: string) => {
    if (potencial === "Alto") return "bg-green-500/20 text-green-400 border border-green-500/30";
    if (potencial === "Medio") return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border border-red-500/30";
  };

  const selectedCountryData = COUNTRIES.find(c => c.key === selectedCountry);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Tendencias
            </h1>
            <p className="mt-1 text-slate-400 text-sm">
              Descubre qué crear para vender más
            </p>
          </div>
        </div>

        {/* Filtros compactos */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">

            {/* Categorías */}
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition ${
                    selectedCategory === cat.key
                      ? "bg-violet-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            {/* País dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-sm transition"
              >
                <span>{selectedCountryData?.flag}</span>
                <span>{selectedCountryData?.label}</span>
                <span className="text-slate-400">▼</span>
              </button>

              {showCountryDropdown && (
                <div className="absolute right-0 top-12 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 w-52 overflow-hidden">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.key}
                      onClick={() => {
                        setSelectedCountry(country.key);
                        setShowCountryDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-800 transition flex items-center gap-2 ${
                        selectedCountry === country.key ? "bg-slate-800 text-violet-400" : "text-slate-300"
                      }`}
                    >
                      <span>{country.flag}</span>
                      <span>{country.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón buscar */}
            <button
              onClick={fetchTrends}
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 transition px-5 py-2 rounded-xl text-sm font-semibold"
            >
              {loading ? "⏳ Buscando..." : "🔥 Buscar"}
            </button>

          </div>
        </div>

        {/* Recomendación IA compacta */}
        {aiSuggestion && (
          <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <p className="text-slate-300 text-sm">{aiSuggestion}</p>
          </div>
        )}

        {/* Tendencias en grid compacto */}
        {trends.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {trends.map((trend, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-violet-500/50 transition"
              >
                {/* Header de la card */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{trend.emoji}</span>
                    <h3 className="font-bold text-sm">{trend.nombre}</h3>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${potencialColor(trend.potencialVenta)}`}>
                    {trend.potencialVenta}
                  </span>
                </div>

                {/* Barra de popularidad */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-violet-500 h-1.5 rounded-full"
                    style={{ width: `${trend.popularidad}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>{trend.descripcion}</span>
                  <span className="text-violet-400 font-bold ml-2">{trend.popularidad}%</span>
                </div>
                {trend.razon && (
                    <p className="text-xs text-cyan-400/70 mb-2">💡 {trend.razon}</p>
                )}

                {/* Prompt compacto */}
                <div className="bg-slate-800 rounded-lg p-2 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500">Prompt Leonardo</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(trend.prompt)}
                      className="text-xs text-violet-400 hover:text-violet-300"
                    >
                      📋 Copiar
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{trend.prompt}</p>
                </div>

                {/* Botón crear */}
                <button
                  onClick={() => {
                    localStorage.setItem("themeforge-trend", JSON.stringify(trend));
                    window.location.href = "/projects";
                  }}
                  className="w-full bg-violet-600/20 hover:bg-violet-600/40 text-violet-400 border border-violet-500/30 py-1.5 rounded-lg text-xs transition"
                >
                  ✨ Crear este tema
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Estado vacío */}
        {!loading && trends.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <div className="text-6xl mb-4">🔥</div>
            <p className="text-xl mb-2">Descubre qué está en tendencia</p>
            <p className="text-sm">Selecciona categoría y país, luego haz clic en Buscar</p>
          </div>
        )}

      </div>
    </div>
  );
}