export default function AIAssistant() {
  const suggestions = {
    wallpapers: [
      "Neon Tokyo Rain",
      "Cyber Temple",
      "Red Samurai Skyline",
    ],

    icons: [
      "Cyber Glass",
      "Neon Edge",
      "Samurai Red",
    ],

    characters: [
      "Female Cyber Ninja",
      "Samurai Robot",
      "AI Companion Pet",
    ],

    widgets: [
      "Cyber Clock",
      "Battery Widget",
      "Weather Widget",
    ],
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        AI Creative Assistant
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">
            Wallpapers
          </h3>

          {suggestions.wallpapers.map((item) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold mb-2">
            Icon Packs
          </h3>

          {suggestions.icons.map((item) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold mb-2">
            Characters
          </h3>

          {suggestions.characters.map((item) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold mb-2">
            Widgets
          </h3>

          {suggestions.widgets.map((item) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}