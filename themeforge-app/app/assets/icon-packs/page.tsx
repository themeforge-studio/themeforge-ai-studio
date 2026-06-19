"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

export default function IconPacksPage() {

  const [search, setSearch] = useState("");

  const fileInputRef =
  useRef<HTMLInputElement>(null);

  const [iconPacks, setIconPacks] =
  useState([
    {
      id: 1,
      name: "Cyber Neon",
      image: "",
    },
    {
      id: 2,
      name: "Dark AMOLED",
      image: "",
    },
    {
      id: 3,
      name: "Glass Icons",
      image: "",
    },
    {
      id: 4,
      name: "Minimal Pro",
        image: "",
    },
  ]);

  useEffect(() => {

  const savedIconPacks =
    localStorage.getItem(
      "themeforge-icon-packs"
    );

  if (savedIconPacks) {

    setIconPacks(
      JSON.parse(
        savedIconPacks
      )
    );

  }

}, []);

    useEffect(() => {

    localStorage.setItem(
        "themeforge-icon-packs",
        JSON.stringify(
        iconPacks
        )
    );

    }, [iconPacks]);

  const filteredIcons = iconPacks.filter((pack) =>
    pack.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Icon Packs Library
      </h1>

      <div className="flex justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Buscar icon pack..."
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

                const imageUrl =
                URL.createObjectURL(file);

                setIconPacks((current) => [
                {
                    id: Date.now(),
                    name: file.name,
                    image: imageUrl,
                },
                ...current,
                ]);

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

      <p className="mb-4 text-slate-400">
        Total: {filteredIcons.length}
      </p>

      <div className="grid grid-cols-4 gap-4">

        {filteredIcons.map((pack) => (

          <div
            key={pack.id}
            className="bg-slate-800 rounded-xl overflow-hidden"
          >

            <div className="h-40 bg-slate-700">

                {pack.image ? (

                    <img
                    src={pack.image}
                    alt={pack.name}
                    className="w-full h-full object-cover"
                    />

                ) : (

                    <div className="h-full flex items-center justify-center">
                    Icon Pack Preview
                    </div>

                )}

            </div>

            <div className="p-4">

              <h3 className="font-bold">
                {pack.name}
              </h3>

              <p className="text-slate-400 text-sm">
                120 icons
              </p>

              <button
                onClick={() => {

                    setIconPacks((current) =>
                    current.filter(
                        (item) =>
                        item.id !== pack.id
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