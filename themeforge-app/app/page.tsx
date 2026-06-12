import Sidebar from "../components/layout/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          ThemeForge AI Studio
        </h1>

        <p className="mt-4 text-slate-400">
          Dashboard principal
        </p>
      </section>
    </main>
  );
}