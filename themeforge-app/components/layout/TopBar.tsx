export default function TopBar() {
  return (
    <div className="flex items-center justify-between mb-8">

      <div className="flex-1 max-w-2xl">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 outline-none focus:border-purple-500"
        />
      </div>

      <div className="flex items-center gap-4 ml-6">

        <button className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3">
          🔔
        </button>

        <button className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-3">
          🌙
        </button>

        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
          J
        </div>

      </div>

    </div>
  );
}