"use client";

import { useState } from "react";
import { themeSuggestions } from "./aiData";
import { generatePrompt } from "./promptEngine";

export default function ThemeGenerator({
  onGenerate,
}: {
  onGenerate?: (theme: any) => void;
}) {
  const [themeName, setThemeName] = useState("");
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const detectStyle = (name: string) => {
    const text = name.toLowerCase();
    if (text.includes("dragon") || text.includes("magic") || text.includes("fantasy") ||
        text.includes("kingdom") || text.includes("elf") || text.includes("wizard") || text.includes("rpg"))
      return "fantasy";
    if (text.includes("anime") || text.includes("otaku") || text.includes("kawaii") ||
        text.includes("naruto") || text.includes("goku") || text.includes("one piece") ||
        text.includes("batman") || text.includes("comic") || text.includes("marvel") ||
        text.includes("superhero") || text.includes("superheroe"))
      return "anime";
    if (text.includes("game") || text.includes("gaming") || text.includes("esports") ||
        text.includes("minecraft") || text.includes("fortnite") || text.includes("valorant"))
      return "gaming";
    if (text.includes("amoled") || text.includes("dark") || text.includes("black") ||
        text.includes("night") || text.includes("shadow"))
      return "amoled";
    if (text.includes("lofi") || text.includes("cozy") || text.includes("chill") ||
        text.includes("aesthetic") || text.includes("cafe"))
      return "lofi";
    if (text.includes("nature") || text.includes("forest") || text.includes("mountain") ||
        text.includes("ocean") || text.includes("earth"))
      return "nature";
    if (text.includes("space") || text.includes("galaxy") || text.includes("cosmos") ||
        text.includes("astronaut") || text.includes("star"))
      return "space";
    if (text.includes("horror") || text.includes("vampire") || text.includes("zombie") ||
        text.includes("ghost") || text.includes("haunted"))
      return "horror";
    if (text.includes("minimal") || text.includes("clean") || text.includes("simple") ||
        text.includes("white") || text.includes("mono"))
      return "minimal";
    return "cyberpunk";
  };

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const generateTheme = async () => {
    if (!themeName.trim()) return;
    setLoading(true);

    const style = detectStyle(themeName);
    const data = themeSuggestions[style as keyof typeof themeSuggestions];
    const prompts = generatePrompt(style, "theme");

    const baseTheme = {
      style,
      name: themeName,
      wallpaper: rand(data.wallpapers),
      iconPack: rand(data.iconPacks),
      character: rand(data.characters),
      widget: rand(data.widgets),
      wallpaperPrompt: prompts.wallpaper,
      iconPrompt: prompts.iconPack,
      characterPrompt: prompts.character,
      widgetPrompt: prompts.widget,
    };

    try {
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
              content: `Eres un experto creativo en diseño de temas para Android. 
              El usuario quiere crear un tema llamado "${themeName}" con estilo ${style}.
              Genera en formato JSON (solo JSON, sin texto extra) con estas claves:
              - nombre: nombre creativo del tema en español
              - descripcion: descripción corta y atractiva del tema (máximo 2 oraciones)
              - historia: historia corta del personaje principal (máximo 2 oraciones)
              Solo responde con el JSON, sin explicaciones.`,
            },
            {
              role: "user",
              content: `Genera el tema para: ${themeName}`,
            },
          ],
          max_tokens: 300,
        }),
      });

      const data2 = await response.json();
      const text = data2.choices?.[0]?.message?.content || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      const aiData = JSON.parse(clean);

      const themeData = {
        ...baseTheme,
        aiNombre: aiData.nombre || themeName,
        aiDescripcion: aiData.descripcion || "",
        aiHistoria: aiData.historia || "",
      };

      setGeneratedTheme(themeData);
      if (onGenerate) onGenerate(themeData);

    } catch (error) {
      setGeneratedTheme(baseTheme);
      if (onGenerate) onGenerate(baseTheme);
    }

    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-2">Generador de Temas</h2>
      <p className="text-slate-400 text-sm mb-6">Escribe una idea y la IA creará el concepto completo</p>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Escribe una idea de tema... (ej. Ninja Cyberpunk, Bosque Mágico)"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateTheme()}
          className="flex-1 bg-slate-800 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-violet-500 border border-slate-700 transition"
        />
        <button
          onClick={generateTheme}
          disabled={!themeName.trim() || loading}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold transition"
        >
          {loading ? "⏳ Generando..." : "✨ Generar"}
        </button>
      </div>

      {generatedTheme && (
        <div className="mt-8 border-t border-slate-700 pt-6">

          {/* AI Generated Info */}
          {generatedTheme.aiNombre && (
            <div className="bg-violet-600/10 border border-violet-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-violet-400">✨</span>
                <h3 className="font-bold text-violet-300">Generado por IA</h3>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{generatedTheme.aiNombre}</h4>
              {generatedTheme.aiDescripcion && (
                <p className="text-slate-300 text-sm mb-2">{generatedTheme.aiDescripcion}</p>
              )}
              {generatedTheme.aiHistoria && (
                <p className="text-slate-400 text-sm italic">{generatedTheme.aiHistoria}</p>
              )}
            </div>
          )}

          {/* Assets */}
          <h3 className="text-lg font-bold mb-4">Assets del Tema</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">🖼️ Wallpaper</p>
              <p className="font-medium text-sm">{generatedTheme.wallpaper}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">📦 Pack de Iconos</p>
              <p className="font-medium text-sm">{generatedTheme.iconPack}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">🧙 Personaje</p>
              <p className="font-medium text-sm">{generatedTheme.character}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">⚙️ Widget</p>
              <p className="font-medium text-sm">{generatedTheme.widget}</p>
            </div>
          </div>

          {/* Prompts para Leonardo */}
          <div className="border-t border-slate-700 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold">Prompts para Leonardo AI</h3>
              <span className="text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Copia y pega en Leonardo
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "🖼️ Prompt Wallpaper", value: generatedTheme.wallpaperPrompt },
                { label: "📦 Prompt Iconos", value: generatedTheme.iconPrompt },
                { label: "🧙 Prompt Personaje", value: generatedTheme.characterPrompt },
                { label: "⚙️ Prompt Widget", value: generatedTheme.widgetPrompt },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{item.label}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(item.value)}
                      className="text-xs text-violet-400 hover:text-violet-300 transition"
                    >
                      📋 Copiar
                    </button>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-xl text-slate-300 text-sm">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}