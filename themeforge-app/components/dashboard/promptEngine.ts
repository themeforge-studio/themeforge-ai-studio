export function generatePrompt(
  style: string,
  assetType: string
) {
  const prompts = {
    cyberpunk: {
      wallpaper:
        "Ultra detailed cyberpunk city, neon lights, futuristic skyline, cinematic lighting, 4K wallpaper, AMOLED background, masterpiece",

      iconPack:
        "Cyberpunk neon icon pack, glass effects, blue and purple glow, Android theme icons, professional design",

      character:
        "Female cyber ninja, futuristic armor, anime style, highly detailed character design",

      widget:
        "Cyberpunk holographic widget, futuristic UI, neon blue interface",
    },

    fantasy: {
      wallpaper:
        "Fantasy kingdom, dragons, magical forest, epic atmosphere, ultra detailed, 4K wallpaper",

      iconPack:
        "Fantasy icon pack, gold ornaments, medieval magic style, Android icons",

      character:
        "Dragon rider, fantasy armor, magical world, detailed concept art",

      widget:
        "Fantasy clock widget, magical runes, medieval UI design",
    },

    anime: {
      wallpaper:
        "Anime city sunset, vibrant colors, beautiful scenery, high quality anime wallpaper",

      iconPack:
        "Anime style icon pack, kawaii design, colorful icons",

      character:
        "Anime hero character, detailed illustration, modern anime style",

      widget:
        "Anime themed widget, colorful interface, modern design",
    },

    gaming: {
      wallpaper:
        "Esports arena, RGB lighting, futuristic gaming setup, 4K wallpaper",

      iconPack:
        "Gaming icon pack, RGB effects, esports theme",

      character:
        "Professional gamer character, cyber gaming outfit",

      widget:
        "Gaming performance widget, FPS monitor, RGB style",
    },

    amoled: {
      wallpaper:
        "Pure black AMOLED wallpaper, minimalist design, dark premium background",

      iconPack:
        "Dark AMOLED icon pack, minimal style, black glass design",

      character:
        "Shadow guardian, dark fantasy character, black aesthetic",

      widget:
        "Minimal AMOLED widget, black interface, elegant design",
    },
  };

  return prompts[
    style as keyof typeof prompts
  ];
}