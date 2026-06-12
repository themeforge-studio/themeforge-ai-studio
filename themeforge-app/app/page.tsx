export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex h-screen">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
          <h1 className="mb-8 text-2xl font-bold">
            ThemeForge AI
          </h1>

          <nav className="space-y-4">
            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Dashboard
            </div>

            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Projects
            </div>

            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Wallpapers
            </div>

            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Icon Packs
            </div>

            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Trends
            </div>

            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Marketing
            </div>

            <div className="cursor-pointer rounded-lg p-3 hover:bg-slate-800">
              Export
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-8">
          <h2 className="mb-6 text-3xl font-bold">
            ThemeForge AI Studio
          </h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">
                Projects
              </h3>
              <p className="mt-2 text-slate-400">
                0 Projects
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">
                Wallpapers
              </h3>
              <p className="mt-2 text-slate-400">
                0 Wallpapers
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">
                Icon Packs
              </h3>
              <p className="mt-2 text-slate-400">
                0 Packs
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Welcome to ThemeForge AI Studio
            </h3>

            <p className="text-slate-400">
              Create wallpapers, icon packs, market research,
              and AI-powered mobile experiences from one place.
            </p>
          </div>
        </section>

        {/* Forge AI */}
        <aside className="w-80 border-l border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-bold">
            Forge AI
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">
              Hello Jhon 👋
            </p>

            <p className="mt-3">
              Ready to create your next bestseller theme?
            </p>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 font-semibold">
              Suggested Ideas
            </h3>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>Anime Neon Collection</li>
              <li>Zodiac Premium Icons</li>
              <li>Cyberpunk Wallpapers</li>
              <li>Fantasy Character Packs</li>
            </ul>
          </div>
        </aside>

      </div>
    </main>
  );
}