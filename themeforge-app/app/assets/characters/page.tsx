"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

export default function CharactersPage() {

  const [search, setSearch] = useState("");

  const fileInputRef =
  useRef<HTMLInputElement>(null);

  const [characters, setCharacters] =
  useState<
    {
      id: number;
      name: string;
      image?: string;
    }[]
  >([
    {
      id: 1,
      name: "Cyber Ninja",
    },
    {
      id: 2,
      name: "Anime Hero",
    },
    {
      id: 3,
      name: "Dark Knight",
    },
    {
      id: 4,
      name: "Neon Girl",
    },
  ]);

  useEffect(() => {

  const savedCharacters =
    localStorage.getItem(
      "themeforge-characters"
    );

  if (savedCharacters) {

    setCharacters(
      JSON.parse(
        savedCharacters
      )
    );

  }

}, []);

useEffect(() => {

  localStorage.setItem(
    "themeforge-characters",
    JSON.stringify(
      characters
    )
  );

}, [characters]);

  const filteredCharacters =
    characters.filter((character) =>
      character.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Characters Library
      </h1>

      <div className="flex justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Buscar personaje..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 bg-slate-800 rounded-xl p-3"
        />

        <>
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
                "CHARACTER IMPORTADO:",
                file.name
            );

            const reader = new FileReader();

            reader.onload = () => {

            const base64Image =
                reader.result as string;

            setCharacters((current) => [
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
        </>

      </div>

      <p className="mb-4 text-slate-400">
        Total: {filteredCharacters.length}
      </p>

      <div className="grid grid-cols-4 gap-4">

        {filteredCharacters.map((character) => (

          <div
            key={character.id}
            className="bg-slate-800 rounded-xl overflow-hidden"
          >

            <div className="h-40 bg-slate-700">

              {character.image ? (

                <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
            />

            ) : (

            <div className="h-full flex items-center justify-center">
              Character Preview
            </div>

              )}

            </div>

            <div className="p-4">

              <h3 className="font-bold">
                {character.name}
              </h3>

              <p className="text-slate-400 text-sm">
                Character Asset
              </p>

              <button
                onClick={() => {

                    setCharacters((current) =>
                    current.filter(
                        (item) =>
                        item.id !== character.id
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