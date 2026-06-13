type PreviewCardProps = {
  title: string;
  name: string;
};

export default function PreviewCard({
  title,
  name,
}: PreviewCardProps) {
  return (
    <div className="rounded-lg bg-slate-800 p-4">
      <div className="h-40 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center mb-4">
        <span className="text-slate-400">
          {title} Preview
        </span>
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="font-semibold text-lg">
        {name}
      </h3>
    </div>
  );
}