"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

export default function WidgetsPage() {

  const [search, setSearch] = useState("");

  const fileInputRef =
  useRef<HTMLInputElement>(null);

  const [widgets, setWidgets] =
    useState<
        {
        id: number;
        name: string;
        image?: string;
        }[]
    >([
    {
      id: 1,
      name: "Clock Widget",
    },
    {
      id: 2,
      name: "Weather Widget",
    },
    {
      id: 3,
      name: "Music Widget",
    },
    {
      id: 4,
      name: "Calendar Widget",
    },
  ]);

  useEffect(() => {

  const savedWidgets =
    localStorage.getItem(
      "themeforge-widgets"
    );

  if (savedWidgets) {

    setWidgets(
      JSON.parse(
        savedWidgets
      )
    );

  }

}, []);

useEffect(() => {

  localStorage.setItem(
    "themeforge-widgets",
    JSON.stringify(
      widgets
    )
  );

}, [widgets]);

  const filteredWidgets =
    widgets.filter((widget) =>
      widget.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Widgets Library
      </h1>

      <div className="flex justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Buscar widget..."
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
                "WIDGET IMPORTADO:",
                file.name
            );

            const reader = new FileReader();

            reader.onload = () => {

            const base64Image =
                reader.result as string;

            setWidgets((current) => [
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
        Total: {filteredWidgets.length}
      </p>

      <div className="grid grid-cols-4 gap-4">

        {filteredWidgets.map((widget) => (

          <div
            key={widget.id}
            className="bg-slate-800 rounded-xl overflow-hidden"
          >

            <div className="h-40 bg-slate-700">

                {widget.image ? (

                    <img
                    src={widget.image}
                    alt={widget.name}
                    className="w-full h-full object-cover"
                    />

                ) : (

                    <div className="h-full flex items-center justify-center">
                    Widget Preview
                    </div>

                )}

                </div>

            <div className="p-4">

              <h3 className="font-bold">
                {widget.name}
              </h3>

              <p className="text-slate-400 text-sm">
                Widget Asset
              </p>

              <button
                onClick={() => {

                    setWidgets((current) =>
                    current.filter(
                        (item) =>
                        item.id !== widget.id
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