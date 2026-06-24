"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";

const QUICK_QUESTIONS = [
  "¿Qué temas se venden más en Etsy?",
  "¿Cuánto cobrar por un pack de wallpapers?",
  "Dame ideas para un tema cyberpunk",
  "¿Qué resolución necesitan los wallpapers?",
  "¿Cómo promocionar mis temas en redes?",
  "¿Qué colores están de moda en temas de celular?",
  "Dame hashtags para Instagram",
  "¿Cómo hacer iconos consistentes?",
];

const SUGGESTED_TOPICS = [
  { emoji: "💰", label: "Estrategia de ventas", prompt: "Dame una estrategia completa para vender temas de celular en Etsy y Gumroad como creador independiente" },
  { emoji: "🎨", label: "Consejos de diseño", prompt: "Dame los mejores consejos de diseño para crear temas de celular profesionales que se vendan bien" },
  { emoji: "📱", label: "Especificaciones técnicas", prompt: "Dame todas las especificaciones técnicas que necesito para crear wallpapers, iconos y widgets para Android" },
  { emoji: "📈", label: "Tendencias 2026", prompt: "¿Cuáles son las tendencias de diseño mobile más populares en 2026 que debería aprovechar para crear temas?" },
  { emoji: "🌍", label: "Mercados internacionales", prompt: "¿En qué países hay más demanda de temas personalizados para celular y cómo llegar a esos mercados?" },
  { emoji: "🤖", label: "Uso de IA para crear", prompt: "¿Cómo puedo usar IA como Leonardo AI y Groq para crear temas de celular profesionales de forma eficiente?" },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    {
      role: "assistant",
      text: "¡Hola! Soy tu asistente creativo y estratega de ThemeForge. Puedo ayudarte con diseño, estrategia de ventas, especificaciones técnicas, tendencias y todo lo relacionado con crear y vender temas de celular. ¿En qué te ayudo hoy? 🎨",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

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
              content: `Eres un experto consultor creativo y estratega de negocios especializado en:
              - Creación de temas, wallpapers, iconos y widgets para Android e iOS
              - Venta de productos digitales en Etsy, Gumroad, Google Play Store
              - Uso de IA (Leonardo AI, Midjourney, Stable Diffusion) para crear assets
              - Tendencias de diseño mobile y cultura pop
              - Marketing digital para creadores independientes
              
              El usuario es un creador independiente de Perú que usa ThemeForge AI Studio para crear temas de celular con IA y venderlos.
              
              Responde siempre en español, de forma clara, práctica y motivadora.
              Da consejos específicos y accionables, no respuestas genéricas.
              Cuando sea relevante menciona precios en dólares y plataformas específicas.
              Máximo 4 oraciones por respuesta a menos que el usuario pida más detalle.`,
            },
            ...messages.map(m => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.text,
            })),
            { role: "user", content: text },
          ],
          max_tokens: 400,
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No pude generar una respuesta. Intenta de nuevo.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Error al conectar con la IA. Verifica tu conexión." }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h1 className="text-2xl font-bold">Asistente IA</h1>
              <p className="text-slate-400 text-sm">Tu consultor creativo y estratega personal</p>
            </div>
            <button
              onClick={() => setMessages([{
                role: "assistant",
                text: "¡Hola! Soy tu asistente creativo y estratega de ThemeForge. ¿En qué te ayudo hoy? 🎨",
              }])}
              className="ml-auto bg-slate-800 hover:bg-slate-700 transition px-4 py-2 rounded-xl text-sm"
            >
              🗑️ Nueva conversación
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* Panel izquierdo - Temas sugeridos */}
          <div className="w-64 border-r border-slate-800 p-4 overflow-y-auto">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Temas sugeridos</p>
            <div className="space-y-2">
              {SUGGESTED_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(topic.prompt)}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-violet-500/30 transition"
                >
                  <span className="text-lg">{topic.emoji}</span>
                  <p className="text-sm font-medium mt-1">{topic.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat principal */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-violet-600/20 border border-violet-500/30"
                      : "bg-slate-700"
                  }`}>
                    {msg.role === "assistant" ? "🤖" : "👤"}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm max-w-lg ${
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
                  <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-sm">
                    🤖
                  </div>
                  <div className="bg-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-400">
                    Pensando... ⏳
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preguntas rápidas */}
            <div className="px-6 pb-3">
              <div className="flex gap-2 flex-wrap">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-full transition text-slate-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Pregunta sobre diseño, ventas, tendencias..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 transition"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || loading}
                  className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 px-5 py-3 rounded-xl transition"
                >
                  ➤
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}