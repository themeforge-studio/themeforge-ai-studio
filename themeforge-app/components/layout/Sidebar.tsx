"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wand2,
  Image,
  Smartphone,
  Download,
  Settings,
  Sparkles,
  Package,
  ShoppingBag,
  Bot,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const mainItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: FolderKanban, label: "Proyectos", href: "/projects" },
    { icon: Bot, label: "Asistente IA", href: "/assistant" },
  ];

  const toolItems = [
    { icon: Wand2, label: "Generador de Temas", href: "/generator" },
    { icon: Image, label: "Estudio de Assets", href: "/assets" },
    { icon: Smartphone, label: "Vista Previa", href: "/preview", badge: "NUEVO" },
  ];

  const manageItems = [
  { icon: Download, label: "Exportaciones", href: "/exports" },
  { icon: Package, label: "Plantillas", href: "/templates" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Settings, label: "Configuración", href: "/settings" },
];

  const NavItem = ({
    icon: Icon,
    label,
    href,
    badge,
  }: {
    icon: any;
    label: string;
    href: string;
    badge?: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition group ${
          isActive
            ? "bg-violet-600/20 text-violet-400 border border-violet-500/30"
            : "hover:bg-slate-800 text-slate-300 hover:text-white"
        }`}
      >
        <Icon size={18} className={isActive ? "text-violet-400" : "text-slate-400 group-hover:text-white"} />
        <span className="flex-1 text-sm font-medium">{label}</span>
        {badge && (
          <span className="text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">ThemeForge</h1>
            <p className="text-xs text-slate-400">AI Studio</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="p-4 space-y-1">
        <p className="text-xs uppercase text-slate-500 px-4 mb-2 tracking-wider">Principal</p>
        {mainItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>

      {/* AI TOOLS */}
      <div className="px-4 space-y-1">
        <p className="text-xs uppercase text-slate-500 px-4 mb-2 tracking-wider">Herramientas</p>
        {toolItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>

      {/* MANAGE */}
      <div className="px-4 mt-4 space-y-1">
        <p className="text-xs uppercase text-slate-500 px-4 mb-2 tracking-wider">Gestionar</p>
        {manageItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>

      {/* PRO PLAN */}
      <div className="mt-auto p-4">
        <div className="rounded-2xl bg-gradient-to-br from-violet-900/50 to-slate-900 border border-violet-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-violet-400" />
            <h3 className="font-semibold text-white text-sm">Plan Pro</h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Desbloquea todas las funciones y genera temas ilimitados.
          </p>
          <button className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-2 text-sm font-semibold transition">
            Mejorar Ahora
          </button>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          © 2025 ThemeForge AI Studio
        </p>
      </div>

    </aside>
  );
}