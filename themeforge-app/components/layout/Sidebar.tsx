import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Wand2,
  Image,
  Smartphone,
  Download,
  Settings,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const mainItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: FolderKanban,
      label: "Projects",
      href: "/projects",
    },
    {
      icon: Sparkles,
      label: "AI Assistant",
      href: "/",
    },
  ];

  const toolItems = [
    {
      icon: Wand2,
      label: "Theme Generator",
      href: "/projects",
    },
    {
      icon: Image,
      label: "Assets",
      href: "/assets",
    },
    {
      icon: Smartphone,
      label: "Device Preview",
      href: "/projects",
    },
  ];

  const manageItems = [
    {
      icon: Download,
      label: "Exports",
      href: "/",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          ThemeForge
        </h1>

        <p className="text-sm text-slate-400">
          AI Studio
        </p>
      </div>

      {/* MAIN */}

      <div className="p-4">
        <p className="text-xs uppercase text-slate-500 mb-3">
          Main
        </p>

        <nav className="space-y-2">
          {mainItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800 transition"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI TOOLS */}

      <div className="px-4">
        <p className="text-xs uppercase text-slate-500 mb-3">
          AI Tools
        </p>

        <nav className="space-y-2">
          {toolItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800 transition"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* MANAGE */}

      <div className="px-4 mt-6">
        <p className="text-xs uppercase text-slate-500 mb-3">
          Manage
        </p>

        <nav className="space-y-2">
          {manageItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800 transition"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PRO PLAN */}

      <div className="mt-auto p-4">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">

          <h3 className="font-semibold mb-2">
            Pro Plan
          </h3>

          <p className="text-sm text-slate-400 mb-4">
            Unlock unlimited themes and AI assets.
          </p>

          <button className="w-full bg-purple-600 hover:bg-purple-700 rounded-lg py-2 transition">
            Upgrade
          </button>

        </div>
      </div>

    </aside>
  );
}