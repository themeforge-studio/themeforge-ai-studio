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

  const [selectedIconPack, setSelectedIconPack] =
  useState<any>(null);

  const [selectedCharacter, setSelectedCharacter] =
  useState<any>(null);

  const [selectedWidget, setSelectedWidget] =
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

useEffect(() => {

  if (!selectedProject) return;

  const wallpaper =
    wallpapers.find(
      (item) =>
        item.name ===
        selectedProject.wallpaper
    );

  if (wallpaper) {
    setSelectedWallpaper(
      wallpaper
    );
  }

  const iconPack =
    iconPacks.find(
      (item) =>
        item.name ===
        selectedProject.iconPack
    );

  if (iconPack) {
    setSelectedIconPack(
      iconPack
    );
  }

  const character =
    characters.find(
      (item) =>
        item.name ===
        selectedProject.character
    );

  if (character) {
    setSelectedCharacter(
      character
    );
  }

  const widget =
  widgets.find(
    (item) =>
      item.name ===
      selectedProject.widget
  );

if (widget) {
  setSelectedWidget(
    widget
  );
}

}, [
  selectedProject,
  wallpapers,
  iconPacks,
  characters,
  widgets,
]);

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

    <div className="mt-2 text-xs text-cyan-400">
  Total Widgets:
  {widgets.length}
</div>

<div className="mt-2 text-xs text-green-400">
  Primer Widget:
  {widgets[0]?.name}
</div>

<div className="mt-2 text-xs text-yellow-400">
  Widget tiene imagen:
  {widgets[0]?.image
    ? " SI"
    : " NO"}
</div>

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

      {/* ICON PACK */}

<div className="mb-6">

  <label className="block mb-2 font-semibold">
    Seleccionar Icon Pack
  </label>

  <select
    value={selectedIconPack?.id || ""}
    onChange={(e) => {

      const iconPack =
        iconPacks.find(
          (item) =>
            item.id ===
            Number(e.target.value)
        );

      setSelectedIconPack(
        iconPack || null
      );

      if (
        iconPack &&
        selectedProject &&
        setSelectedProject
      ) {

        setSelectedProject({
          ...selectedProject,
          iconPack: iconPack.name,
          iconPackImage:
            iconPack.image,
        });

      }

    }}
    className="w-full rounded-xl bg-slate-800 p-3"
  >

    <option value="">
      Elegir icon pack...
    </option>

    {iconPacks.map((iconPack) => (

      <option
        key={iconPack.id}
        value={iconPack.id}
      >
        {iconPack.name}
      </option>

    ))}

  </select>

  {selectedIconPack && (

    <div className="mt-4 rounded-xl bg-slate-800 p-4">

      <div className="font-semibold mb-3">
        Icon Pack seleccionado:
        {" "}
        {selectedIconPack.name}
      </div>

      {selectedIconPack.image && (

        <img
          src={selectedIconPack.image}
          alt={selectedIconPack.name}
          className="w-64 rounded-xl border border-slate-700"
        />

      )}

    </div>

  )}

</div>

{/* CHARACTER */}

<div className="mb-6">

  <label className="block mb-2 font-semibold">
    Seleccionar Character
  </label>

  <select
    value={selectedCharacter?.id || ""}
    onChange={(e) => {

      const character =
        characters.find(
          (item) =>
            item.id ===
            Number(e.target.value)
        );

      setSelectedCharacter(
        character || null
      );

      if (
        character &&
        selectedProject &&
        setSelectedProject
      ) {

        setSelectedProject({
          ...selectedProject,
          character: character.name,
          characterImage:
            character.image,
        });

      }

    }}
    className="w-full rounded-xl bg-slate-800 p-3"
  >

    <option value="">
      Elegir character...
    </option>

    {characters.map((character) => (

      <option
        key={character.id}
        value={character.id}
      >
        {character.name}
      </option>

    ))}

  </select>

  {selectedCharacter && (

    <div className="mt-4 rounded-xl bg-slate-800 p-4">

      <div className="font-semibold mb-3">
        Character seleccionado:
        {" "}
        {selectedCharacter.name}
      </div>

      {selectedCharacter.image && (

        <img
          src={selectedCharacter.image}
          alt={selectedCharacter.name}
          className="w-64 rounded-xl border border-slate-700"
        />

      )}

    </div>

  )}

</div>

<div className="mb-6">

  <label className="block mb-2 font-semibold">
    Seleccionar Widget
  </label>

  <select
    value={selectedWidget?.id || ""}
    onChange={(e) => {

      const widget =
        widgets.find(
          (item) =>
            item.id ===
            Number(e.target.value)
        );

      setSelectedWidget(
        widget || null
      );

      if (
        widget &&
        selectedProject &&
        setSelectedProject
      ) {

        setSelectedProject({
          ...selectedProject,
          widget: widget.name,
          widgetImage:
            widget.image,
        });

      }

    }}
    className="w-full rounded-xl bg-slate-800 p-3"
  >

    <option value="">
      Elegir widget...
    </option>

    {widgets.map((widget) => (

      <option
        key={widget.id}
        value={widget.id}
      >
        {widget.name}
      </option>

    ))}

  </select>

  {selectedWidget && (

    <div className="mt-4 rounded-xl bg-slate-800 p-4">

      <div className="font-semibold mb-3">
        Widget seleccionado:
        {" "}
        {selectedWidget.name}
      </div>

      {selectedWidget.image && (

        <img
          src={selectedWidget.image}
          alt={selectedWidget.name}
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