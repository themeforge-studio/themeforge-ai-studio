"use client";

import { useState } from "react";
import { themeSuggestions } from "./aiData";

export default function ThemeGenerator() {
  const [themeName, setThemeName] = useState("");
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);

  const detectStyle = (name: string) => {
    const text = name.toLowerCase();

    if (
      text.includes("dragon") ||
      text.includes("magic") ||
      text.includes("fantasy") ||
      text.includes("kingdom")
    ) {
      return "fantasy";
    }

    if (
      text.includes("anime") ||
      text.includes("otaku") ||
      text.includes("kawaii")
    ) {
      return "anime";
    }

    if (
      text.includes("game") ||
      text.includes("gaming") ||
      text.includes("esports")
    ) {
      return "gaming";
    }

    if (
      text.includes("amoled") ||
      text.includes("dark") ||
      text.includes("black")
    ) {
      return "amoled";
    }

    return "cyberpunk";
  };

  const generateTheme = () => {
    const style = detectStyle(themeName);

    const data =
      themeSuggestions[
        style as keyof typeof themeSuggestions
      ];

    setGeneratedTheme({
      style,
      name: themeName || "Cyber Samurai Theme",
      wallpaper: data.wallpapers[0],
      iconPack: data.iconPacks[0],
      character: data.characters[0],
      widget: data.widgets[0],
    });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Theme Generator
      </h2>

      <input
        type="text"
        placeholder="Type a theme idea..."
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
        className="w-full bg-slate-800 rounded-lg p-3 mb-4"
      />

      <button
        onClick={generateTheme}
        className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg"
      >
        Generate Theme Concept
      </button>

      {generatedTheme && (
        <div className="mt-8 border-t border-slate-700 pt-6">
          <h3 className="text-xl font-bold mb-4">
            Generated Theme
          </h3>

          <div className="space-y-3">

            <div>
              <span className="font-bold">Style:</span>{" "}
              {generatedTheme.style}
            </div>

            <div>
              <span className="font-bold">Theme:</span>{" "}
              {generatedTheme.name}
            </div>

            <div>
              <span className="font-bold">Wallpaper:</span>{" "}
              {generatedTheme.wallpaper}
            </div>

            <div>
              <span className="font-bold">Icon Pack:</span>{" "}
              {generatedTheme.iconPack}
            </div>

            <div>
              <span className="font-bold">Character:</span>{" "}
              {generatedTheme.character}
            </div>

            <div>
              <span className="font-bold">Widget:</span>{" "}
              {generatedTheme.widget}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}