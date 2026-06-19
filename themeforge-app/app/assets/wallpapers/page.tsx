"use client";

import { useState, useRef, useEffect, } from "react";

export default function WallpapersPage() {
  const [search, setSearch] = useState("");

  const [previewImage,
  setPreviewImage] =
  useState<string | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [wallpapers, setWallpapers] =
  useState([
    {
      id: 1,
      name: "Neon Tokyo",
       image: "",
    },
    {
      id: 2,
      name: "Cyber City",
       image: "",
    },
    {
      id: 3,
      name: "Dark AMOLED",
       image: "",
    },
    {
      id: 4,
      name: "Purple Future",
       image: "",
    },
  ]);

  useEffect(() => {

  const savedWallpapers =
    localStorage.getItem(
      "themeforge-wallpapers"
    );

  if (savedWallpapers) {

    setWallpapers(
      JSON.parse(savedWallpapers)
    );

  }

}, []);

useEffect(() => {

  localStorage.setItem(
    "themeforge-wallpapers",
    JSON.stringify(
      wallpapers
    )
  );

}, [wallpapers]);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Wallpapers Library (
        {wallpapers.length}
        )
      </h1>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Buscar wallpaper..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 bg-slate-800 rounded-xl p-3"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {

            const file =
              event.target.files?.[0];

            if (!file) return;

            console.log(
              "WALLPAPER IMPORTADO:",
              file.name
            );

            const reader = new FileReader();

            reader.onload = () => {

              const base64Image =
                reader.result as string;

              setPreviewImage(
                base64Image
              );

              setWallpapers((current) => [
                {
                  id: Date.now(),
                  name: file.name,
                  image: base64Image,
                },
                ...current,
              ]);

            };

            reader.readAsDataURL(file);

          }}
        />

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="bg-purple-600 px-4 py-3 rounded-xl"
        >
          Importar
        </button>

      </div>

      {previewImage && (

  <div className="mb-6">

    <h2 className="text-xl font-bold mb-3">
      Último wallpaper importado
    </h2>

    <img
      src={previewImage}
      alt="Wallpaper Preview"
      className="w-64 rounded-xl"
    />

  </div>

)}

      <div className="grid grid-cols-4 gap-4">

        {wallpapers
          .filter((wallpaper) =>
            wallpaper.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((wallpaper) => (

          <div
            key={wallpaper.id}
            className="bg-slate-800 rounded-xl overflow-hidden"
          >

            <div className="h-40 bg-slate-700">

              {wallpaper.image ? (

                <img
                  src={wallpaper.image}
                  alt={wallpaper.name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="h-full flex items-center justify-center">
                  Wallpaper Preview
                </div>

              )}

            </div>

            <div className="p-4">

              <h3 className="font-bold">
                {wallpaper.name}
              </h3>

              <p className="text-slate-400 text-sm">
                1920x1080
              </p>

              <p className="text-slate-400 text-sm">
                Cyberpunk
              </p>

              <button
                onClick={() => {

                  setWallpapers((current) =>
                    current.filter(
                      (item) =>
                        item.id !== wallpaper.id
                    )
                  );

                }}
                className="mt-3 bg-red-600 px-3 py-2 rounded-lg"
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}