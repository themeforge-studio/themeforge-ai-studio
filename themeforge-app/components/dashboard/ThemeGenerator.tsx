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

  const detectStyle = (name: string) => {
    const text = name.toLowerCase();

    if (
      text.includes("dragon") ||
      text.includes("magic") ||
      text.includes("fantasy") ||
      text.includes("kingdom") ||
      text.includes("elf") ||
      text.includes("wizard") ||
      text.includes("rpg")
    ) {
      return "fantasy";
    }

    if (
      text.includes("anime") ||
      text.includes("otaku") ||
      text.includes("kawaii") ||
      text.includes("naruto")||
      text.includes("goku") ||
      text.includes("dragon ball") ||
      text.includes("one piece") ||
      text.includes("luffy") ||
      text.includes("bleach") ||
      text.includes("attack on titan")
    ) {
      return "anime";
    }

    if (
      text.includes("game") ||
      text.includes("gaming") ||
      text.includes("esports") ||
      text.includes("minecraft") ||
      text.includes("fortnite") ||
      text.includes("valorant") ||
      text.includes("league of legends") ||
      text.includes("call of duty")
    ) {
      return "gaming";
    }

    if (
      text.includes("amoled") ||
      text.includes("dark") ||
      text.includes("black") ||
      text.includes("night") ||
      text.includes("shadow")
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

    const prompts = generatePrompt(
      style,
      "theme"
    );

    const rand = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    const themeData = {
      style,
      name: themeName || "Cyber Samurai Theme",

      wallpaper: rand(data.wallpapers),
      iconPack: rand(data.iconPacks),
      character: rand(data.characters),
      widget: rand(data.widgets),

      wallpaperPrompt: prompts.wallpaper,
      iconPrompt: prompts.iconPack,
      characterPrompt: prompts.character,
      widgetPrompt: prompts.widget,
    };

    setGeneratedTheme(themeData);

    if (onGenerate) {
      onGenerate(themeData);
    }
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
        onChange={(e) =>
          setThemeName(e.target.value)
        }
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

          <div className="space-y-3 mb-8">
            <div>
              <strong>Style:</strong>{" "}
              {generatedTheme.style}
            </div>

            <div>
              <strong>Theme:</strong>{" "}
              {generatedTheme.name}
            </div>

            <div>
              <strong>Wallpaper:</strong>{" "}
              {generatedTheme.wallpaper}
            </div>

            <div>
              <strong>Icon Pack:</strong>{" "}
              {generatedTheme.iconPack}
            </div>

            <div>
              <strong>Character:</strong>{" "}
              {generatedTheme.character}
            </div>

            <div>
              <strong>Widget:</strong>{" "}
              {generatedTheme.widget}
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold mb-6">
              AI Generation Prompts
            </h3>

            <div className="space-y-6">
              <div>
                <div className="font-bold mb-2">
                  Wallpaper Prompt
                </div>

                <div className="bg-slate-800 p-4 rounded-lg text-slate-300">
                  {generatedTheme.wallpaperPrompt}
                </div>
              </div>

              <div>
                <div className="font-bold mb-2">
                  Icon Pack Prompt
                </div>

                <div className="bg-slate-800 p-4 rounded-lg text-slate-300">
                  {generatedTheme.iconPrompt}
                </div>
              </div>

              <div>
                <div className="font-bold mb-2">
                  Character Prompt
                </div>

                <div className="bg-slate-800 p-4 rounded-lg text-slate-300">
                  {generatedTheme.characterPrompt}
                </div>
              </div>

              <div>
                <div className="font-bold mb-2">
                  Widget Prompt
                </div>

                <div className="bg-slate-800 p-4 rounded-lg text-slate-300">
                  {generatedTheme.widgetPrompt}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}