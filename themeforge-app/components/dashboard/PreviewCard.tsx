type PreviewCardProps = {
  title: string;
  name: string;
};

export default function PreviewCard({
  title,
  name,
}: PreviewCardProps) {
  const getPreviewStyle = () => {
    switch (title) {
      case "Wallpaper":
        return {
          bg: "bg-gradient-to-br from-cyan-600 to-blue-900",
          icon: "🌆",
        };

      case "Icon Pack":
        return {
          bg: "bg-gradient-to-br from-purple-600 to-pink-700",
          icon: "🎨",
        };

      case "Character":
        return {
          bg: "bg-gradient-to-br from-violet-700 to-fuchsia-800",
          icon: "🧙",
        };

      case "Widget":
        return {
          bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
          icon: "⏰",
        };

      default:
        return {
          bg: "bg-gradient-to-br from-slate-700 to-slate-900",
          icon: "✨",
        };
    }
  };

  const preview = getPreviewStyle();

  return (
    <div className="rounded-xl bg-slate-800 overflow-hidden border border-slate-700 hover:border-violet-500 transition">

      <div
        className={`h-48 flex flex-col items-center justify-center ${preview.bg}`}
      >
        <div className="text-5xl mb-2">
          {preview.icon}
        </div>

        <div className="text-white font-semibold">
          {name}
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-slate-400">
          {title}
        </p>

        <h3 className="font-semibold text-lg">
          {name}
        </h3>
      </div>

    </div>
  );
}