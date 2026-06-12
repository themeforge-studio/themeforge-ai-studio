export default function StatsCards() {
  const stats = [
    {
      title: "Projects",
      value: "12",
    },
    {
      title: "Wallpapers",
      value: "84",
    },
    {
      title: "Icon Packs",
      value: "16",
    },
    {
      title: "Revenue Forecast",
      value: "$2,450",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <p className="text-sm text-slate-400">
            {stat.title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}