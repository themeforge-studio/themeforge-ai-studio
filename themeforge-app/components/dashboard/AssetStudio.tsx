import { useEffect, useState } from "react";

import { assetLibrary } from "./assetLibrary";
import PreviewCard from "./PreviewCard";

type AssetStudioProps = {
  generatedTheme?: any;
  selectedProject?: any;
  setSelectedProject?: any;
};

export default function AssetStudio({
  generatedTheme,
  selectedProject,
  setSelectedProject,
}: AssetStudioProps) {

  const [wallpapers, setWallpapers] =
  useState<any[]>([]);

const [iconPacks, setIconPacks] =
  useState<any[]>([]);

const [characters, setCharacters] =
  useState<any[]>([]);

const [widgets, setWidgets] =
  useState<any[]>([]);

const [selectedWallpaper, setSelectedWallpaper] =
  useState<any>(null);

  useEffect(() => {

  const savedWallpapers =
    localStorage.getItem(
      "themeforge-wallpapers"
    );

  const savedIconPacks =
    localStorage.getItem(
      "themeforge-icon-packs"
    );

  const savedCharacters =
    localStorage.getItem(
      "themeforge-characters"
    );

  const savedWidgets =
    localStorage.getItem(
      "themeforge-widgets"
    );

  if (savedWallpapers) {
    setWallpapers(
      JSON.parse(savedWallpapers)
    );
  }

  if (savedIconPacks) {
    setIconPacks(
      JSON.parse(savedIconPacks)
    );
  }

  if (savedCharacters) {
    setCharacters(
      JSON.parse(savedCharacters)
    );
  }

  if (savedWidgets) {
    setWidgets(
      JSON.parse(savedWidgets)
    );
  }

}, []);

const fallbackAssets =
  assetLibrary[
    (
      selectedProject?.style ||
      generatedTheme?.style ||
      "fantasy"
    ) as keyof typeof assetLibrary
  ];

const assets = {
  wallpaper:
    selectedProject?.wallpaper ||
    generatedTheme?.wallpaper ||
    fallbackAssets.wallpaper,

  iconPack:
    selectedProject?.iconPack ||
    generatedTheme?.iconPack ||
    fallbackAssets.iconPack,

  character:
    selectedProject?.character ||
    generatedTheme?.character ||
    fallbackAssets.character,

  widget:
    selectedProject?.widget ||
    generatedTheme?.widget ||
    fallbackAssets.widget,
};
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        AI Asset Studio
      </h2>

      <div className="mb-6 text-sm text-slate-400">

        Wallpapers: {wallpapers.length}
        {" • "}
        Icon Packs: {iconPacks.length}
        {" • "}
        Characters: {characters.length}
        {" • "}
        Widgets: {widgets.length}

    </div>

      {wallpapers.length > 0 && (

      <div className="mb-6 rounded-xl bg-slate-800 p-4">

        <div className="mb-3 font-semibold">
          Primer Wallpaper:
          <span className="ml-2">
            {wallpapers[0].name}
          </span>
        </div>

        <div className="mt-2 text-xs text-yellow-400">
          Imagen:
          {wallpapers[0].image
            ? " SI"
            : " NO"}
        </div>

        <div className="mt-2 text-xs text-cyan-400">
          Total Wallpapers:
          {wallpapers.length}
        </div>

        <div className="mt-2 text-xs text-green-400">
          Último Wallpaper:
          {wallpapers[wallpapers.length - 1]?.name}
        </div>

        <div className="mt-2 text-xs text-yellow-400">
          Último tiene imagen:
          {wallpapers[wallpapers.length - 1]?.image
            ? " SI"
            : " NO"}
        </div>

        {wallpapers[0].image && (

          <img
            src={wallpapers[0].image}
            alt={wallpapers[0].name}
            className="w-64 rounded-xl border border-slate-700"
          />

        )}

      </div>

    )}

      <div className="mb-6">

        <label className="block mb-2 font-semibold">
          Seleccionar Wallpaper
        </label>

        <select
          value={selectedWallpaper}
          onChange={(e) => {

            const wallpaper =
              wallpapers.find(
                (item) =>
                  item.id ===
                  Number(e.target.value)
              );

            setSelectedWallpaper(
              wallpaper || null
            );

            if (
              wallpaper &&
              selectedProject &&
              setSelectedProject
            ) {

              setSelectedProject({
                ...selectedProject,
                wallpaper: wallpaper.name,
                wallpaperImage:
                  wallpaper.image,
              });

            }

          }}
          className="w-full rounded-xl bg-slate-800 p-3"
        >

          <option value="">
            Elegir wallpaper...
          </option>

          {wallpapers.map((wallpaper) => (

            <option
              key={wallpaper.id}
              value={wallpaper.id}
            >
              {wallpaper.name}
            </option>

          ))}

        </select>

        {selectedWallpaper && (

          <div className="mt-4 rounded-xl bg-slate-800 p-4">

            <div className="font-semibold mb-3">
              Wallpaper seleccionado:
              {" "}
              {selectedWallpaper.name}
            </div>

            {selectedWallpaper.image && (

              <img
                src={selectedWallpaper.image}
                alt={selectedWallpaper.name}
                className="w-64 rounded-xl border border-slate-700"
              />

            )}

          </div>

        )}

      </div>

      <div className="grid md:grid-cols-2 gap-6">

       {(!selectedProject ||
  selectedProject.type === "Theme") && (
  <>
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
  </>
)}

{selectedProject?.type ===
  "Wallpaper Pack" && (
  <PreviewCard
    title="Wallpaper"
    name={assets.wallpaper}
  />
)}

{selectedProject?.type ===
  "Icon Pack" && (
  <PreviewCard
    title="Icon Pack"
    name={assets.iconPack}
  />
)}

{selectedProject?.type ===
  "Character Pack" && (
  <PreviewCard
    title="Character"
    name={assets.character}
  />
)}

      </div>
    </div>
  );
}