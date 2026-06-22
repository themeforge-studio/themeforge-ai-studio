"use client";

import { useState } from "react";

type AIAssistantProps = {
  selectedProject?: any;
  generatedTheme?: any;
  onSuggestion?: (suggestion: string) => void;
};

const QUICK_SUGGESTIONS = [
  "Hacerlo más oscuro",
  "Cambiar a estilo anime",
  "Agregar más color rojo",
  "Versión minimalista",
  "Más estilo cyberpunk",
  "Hacerlo más colorido",
];

export default function AIAssistant({
  selectedProject,
  generatedTheme,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    {
      role: "assistant",
      text: "¡Hola! Soy tu asistente creativo con IA. Pídeme que modifique tu tema, sugiera nuevos estilos, o descríbeme lo que quieres crear. 🎨",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const projectName = selectedProject?.name || generatedTheme?.name || "your theme";
  const projectStyle = selectedProject?.style || generatedTheme?.style || "cyberpunk";

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response for now (Phase 2 will connect real AI)
    setTimeout(() => {
      const responses: Record<string, string> = {
        dark: `Great idea! For "${projectName}" I suggest deepening the blacks and adding dark purple accents. The wallpaper could use more shadow depth and the icons could have a darker glass effect. 🌑`,
        anime: `Switching to anime style! I'd recommend cherry blossom wallpapers, kawaii-style icons with pastel colors, and an anime character mascot. The widget could have cute rounded fonts. 🌸`,
        red: `Adding red accents to "${projectName}"! Think crimson neon lights for the wallpaper, red-tinted glass icons, and a dramatic red gradient character backdrop. 🔴`,
        minimal: `Minimalist version of "${projectName}"! Clean white backgrounds, ultra-thin icon strokes, simple sans-serif widgets, and a monochrome color palette. ○`,
        cyberpunk: `More cyberpunk vibes! Neon cyan and purple glows, rain-slicked city wallpaper, holographic UI icons, and a cyber ninja character. ⚡`,
        color: `Making it more colorful! Adding vibrant gradient overlays, rainbow icon pack, multicolor character design, and a dynamic color-shifting widget. 🌈`,
      };

      const key = Object.keys(responses).find((k) => text.toLowerCase().includes(k));
      const reply = key
        ? responses[key]
        : `I understand you want to modify "${projectName}" (${projectStyle} style). I'll apply that creative direction to your theme assets. In Phase 2, I'll be able to regenerate images based on your feedback! 🎨`;

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <h2 className="text-xl font-bold">Asistente IA</h2>
          <p className="text-slate-400 text-sm">Tu compañero creativo. Pide cambios o nuevas ideas.</p>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
              msg.role === "assistant"
                ? "bg-violet-600/20 border border-violet-500/30"
                : "bg-slate-700"
            }`}>
              {msg.role === "assistant" ? "🤖" : "👤"}
            </div>
            <div className={`rounded-xl px-4 py-3 text-sm max-w-xs ${
              msg.role === "assistant"
                ? "bg-slate-800 text-slate-200"
                : "bg-violet-600/20 border border-violet-500/30 text-violet-200"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-sm">
              🤖
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-full transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder={`Pregunta lo que quieras... (ej. "hacer el wallpaper más neón")`}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 transition"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || loading}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 rounded-xl transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}