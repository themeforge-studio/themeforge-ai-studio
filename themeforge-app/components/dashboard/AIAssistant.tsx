import { themeSuggestions } from "./aiData";

export default function AIAssistant() {
  const projectType = "cyberpunk";

  const suggestions = themeSuggestions[projectType];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        AI Creative Assistant
      </h2>

      <p className="text-slate-400 mb-6">
        Suggestions for:{" "}
        <span className="text-white font-semibold">
          {projectType}
        </span>
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Wallpapers */}
        <div>
          <h3 className="font-bold mb-2">Wallpapers</h3>

          {suggestions.wallpapers.map((item: string) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Icon Packs */}
        <div>
          <h3 className="font-bold mb-2">Icon Packs</h3>

          {suggestions.iconPacks.map((item: string) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Characters */}
        <div>
          <h3 className="font-bold mb-2">Characters</h3>

          {suggestions.characters.map((item: string) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-3 mb-2"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Widgets */}
        <div>
          <h3 className="font-bold mb-2">Widgets</h3>

          {suggestions.widgets.map((item: string) => (
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