export default function ThemeOverview() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

      {/* Header */}

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Cyber Samurai Theme
            </h2>

            <p className="text-slate-400 mt-1">
              AI-generated cyberpunk theme with neon samurai aesthetics.
            </p>
          </div>

          <button className="rounded-xl bg-violet-600 px-4 py-2 hover:bg-violet-500 transition">
            Export Theme
          </button>

        </div>

      </div>

      {/* Tabs */}

      <div className="border-t border-slate-800 px-6">

        <div className="flex gap-8">

          <button className="border-b-2 border-violet-500 py-4 text-white font-medium">
            Overview
          </button>

          <button className="py-4 text-slate-400 hover:text-white transition">
            Assets
          </button>

          <button className="py-4 text-slate-400 hover:text-white transition">
            Preview
          </button>

          <button className="py-4 text-slate-400 hover:text-white transition">
            Export
          </button>

          <button className="py-4 text-slate-400 hover:text-white transition">
            Settings
          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4 p-6">

        <div>
          <p className="text-slate-500 text-sm">
            Style
          </p>

          <p className="font-semibold">
            Cyberpunk
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Status
          </p>

          <p className="font-semibold text-green-400">
            Active
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Assets
          </p>

          <p className="font-semibold">
            4 Generated
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Resolution
          </p>

          <p className="font-semibold">
            4K
          </p>
        </div>

      </div>

    </div>
  );
}