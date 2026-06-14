import { assetLibrary } from "./assetLibrary";
import PreviewCard from "./PreviewCard";

type AssetStudioProps = {
  generatedTheme?: any;
  selectedProject?: any;
};

export default function AssetStudio({
  generatedTheme,
  selectedProject,
}: AssetStudioProps) {

const assets =
  selectedProject ||
  generatedTheme || {
    wallpaper: "Mystic Forest",
    iconPack: "Fantasy Gold",
    character: "Forest Elf",
    widget: "Magic Clock",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        AI Asset Studio
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

       <PreviewCard
  title="Wallpaper"
  name={assets.wallpaper}
/>

<PreviewCard
  title="Icon Pack"
  name={assets.iconPack}
/>

<PreviewCard
  title="Character"
  name={assets.character}
/>

<PreviewCard
  title="Widget"
  name={assets.widget}
/>

      </div>
    </div>
  );
}