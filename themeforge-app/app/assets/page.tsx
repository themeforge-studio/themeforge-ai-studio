import Link from "next/link";

export default function AssetsPage() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Asset Library
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <Link
          href="/assets/wallpapers"
          className="bg-slate-800 p-6 rounded-xl block hover:bg-slate-700 transition"
        >
          <h2 className="text-xl font-bold">
            Wallpapers
          </h2>

          <p className="text-slate-400 mt-2">
            Manage wallpapers
          </p>
        </Link>

        <Link
          href="/assets/icon-packs"
          className="bg-slate-800 p-6 rounded-xl block hover:bg-slate-700 transition"
        >
          <h2 className="text-xl font-bold">
            Icon Packs
          </h2>

          <p className="text-slate-400 mt-2">
            Manage icons
          </p>
        </Link>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            Characters
          </h2>

          <p className="text-slate-400 mt-2">
            Manage characters
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold">
            Widgets
          </h2>

          <p className="text-slate-400 mt-2">
            Manage widgets
          </p>
        </div>

      </div>

    </div>
  );
}