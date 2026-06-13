import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Palette,
  TrendingUp,
  Download,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
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
      icon: Image,
      label: "Wallpapers",
      href: "/",
    },
    {
      icon: Palette,
      label: "Icon Packs",
      href: "/",
    },
    {
      icon: TrendingUp,
      label: "Trends",
      href: "/",
    },
    {
      icon: Download,
      label: "Export",
      href: "/",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5">
      <h1 className="text-2xl font-bold mb-8">
        ThemeForge AI
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-slate-800 transition"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}