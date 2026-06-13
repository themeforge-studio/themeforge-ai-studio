export default function ProjectForm() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        Create New Project
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full rounded-lg bg-slate-800 p-3"
        />

        <select
          className="w-full rounded-lg bg-slate-800 p-3"
        >
          <option>Theme Pack</option>
          <option>Wallpaper Pack</option>
          <option>Icon Pack</option>
          <option>Animated Character</option>
        </select>

        <textarea
          placeholder="Describe your idea..."
          rows={5}
          className="w-full rounded-lg bg-slate-800 p-3"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
        >
          Generate with AI
        </button>
      </div>
    </div>
  );
}