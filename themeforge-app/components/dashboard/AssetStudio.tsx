import { assetLibrary } from "./assetLibrary";
import PreviewCard from "./PreviewCard";

type AssetStudioProps = {
  generatedTheme?: any;
  selectedProject?: any;
  setSelectedProject?: (project: any) => void;
};

export default function AssetStudio({
  generatedTheme,
  selectedProject,
}: AssetStudioProps) {

  const style = (
    selectedProject?.style ||
    generatedTheme?.style ||
    "fantasy"
  ) as keyof typeof assetLibrary;

  const fallbackAssets =
    assetLibrary[style] ?? assetLibrary["fantasy"];

  const resolve = (
    fromProject: any,
    fromTheme: any,
    fallback: string
  ) => {
    if (fromProject != null) return fromProject;
    if (fromTheme != null) return fromTheme;
    return fallback;
  };

  const assets = {
    wallpaper: resolve(
      selectedProject?.wallpaper,
      generatedTheme?.wallpaper,
      fallbackAssets.wallpaper
    ),
    iconPack: resolve(
      selectedProject?.iconPack,
      generatedTheme?.iconPack,
      fallbackAssets.iconPack
    ),
    character: resolve(
      selectedProject?.character,
      generatedTheme?.character,
      fallbackAssets.character
    ),
    widget: resolve(
      selectedProject?.widget,
      generatedTheme?.widget,
      fallbackAssets.widget
    ),
  };

  const hasAssets =
    selectedProject?.wallpaper ||
    selectedProject?.iconPack ||
    selectedProject?.character ||
    selectedProject?.widget;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-2">
        AI Asset Studio
      </h2>

      {selectedProject && !hasAssets && (
        <p className="text-slate-400 text-sm mb-4">
          Este proyecto no tiene assets asignados aún. Genera un tema con IA para asignarlos automáticamente.
        </p>
      )}

      {!selectedProject && (
        <p className="text-slate-400 text-sm mb-4">
          Selecciona un proyecto para ver sus assets, o genera un tema nuevo.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-4">

        {(!selectedProject || selectedProject.type === "Theme") && (
          <>
            <PreviewCard title="Wallpaper" name={assets.wallpaper} />
            <PreviewCard title="Icon Pack" name={assets.iconPack} />
            <PreviewCard title="Character" name={assets.character} />
            <PreviewCard title="Widget" name={assets.widget} />
          </>
        )}

        {selectedProject?.type === "Wallpaper Pack" && (
          <PreviewCard title="Wallpaper" name={assets.wallpaper} />
        )}

        {selectedProject?.type === "Icon Pack" && (
          <PreviewCard title="Icon Pack" name={assets.iconPack} />
        )}

        {selectedProject?.type === "Character Pack" && (
          <PreviewCard title="Character" name={assets.character} />
        )}

      </div>
    </div>
  );
}