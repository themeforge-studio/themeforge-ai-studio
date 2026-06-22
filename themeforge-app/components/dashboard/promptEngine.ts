export function generatePrompt(
  style: string,
  assetType: string
) {
  const prompts = {
    cyberpunk: {
      wallpaper:
        "Ultra detailed cyberpunk megalopolis at night, towering neon signs in Japanese and English, rain-slicked streets reflecting purple and cyan lights, flying vehicles in foggy sky, cinematic composition, photorealistic, 4K AMOLED wallpaper, inspired by Blade Runner 2049, masterpiece quality",

      iconPack:
        "Minimalist cyberpunk icon pack for Android, frosted glass with neon blue and violet inner glow, sharp geometric shapes, consistent 512x512px design system, dark background, professional UI kit",

      character:
        "Female cyber ninja warrior, sleek black carbon fiber armor with glowing violet circuit patterns, short silver hair, katana with neon blade, rainy neon city background, anime art style, highly detailed character illustration, full body portrait",

      widget:
        "Holographic cyberpunk clock widget, transparent dark background, neon cyan digits, subtle scanline effect, battery and weather info, futuristic HUD interface design",
    },

    fantasy: {
      wallpaper:
        "Epic fantasy kingdom at golden hour, massive dragon soaring over ancient castle towers, magical aurora in sky, enchanted forest in foreground, volumetric god rays, ultra detailed matte painting, 4K wallpaper, Lord of the Rings atmosphere",

      iconPack:
        "Fantasy medieval icon pack for Android, ornate gold filigree borders, jewel-toned colors, magical glowing runes, parchment texture, consistent 512x512px design system, professional icon set",

      character:
        "Elven archer sorceress, flowing silver robes with gold magical symbols, emerald eyes glowing, casting spell with ancient staff, enchanted forest background, detailed fantasy concept art, full body illustration",

      widget:
        "Magical fantasy clock widget, ancient stone texture with glowing runes, mystical orb displaying time, animated sparkle effects, medieval aesthetic UI design",
    },

    anime: {
      wallpaper:
        "Breathtaking anime cityscape at sunset, cherry blossom petals floating in warm golden light, detailed urban architecture mixing traditional and modern Japanese styles, cinematic widescreen composition, vibrant colors, Studio Ghibli inspired, 4K anime wallpaper",

      iconPack:
        "Kawaii anime icon pack for Android, pastel pink and purple color palette, cute rounded shapes, subtle gradient fills, consistent 512x512px design system, clean modern anime aesthetic",

      character:
        "Anime protagonist hero, spiky hair with colorful highlights, dynamic battle pose, detailed school uniform with custom accessories, expressive large eyes, clean modern anime art style, full body character sheet",

      widget:
        "Cute anime clock widget, pastel color scheme, chibi character mascot, heart and star decorations, soft shadow effects, playful modern UI design",
    },

    gaming: {
      wallpaper:
        "Professional esports arena packed with cheering crowd, massive LED displays, competitive gaming stage with RGB lighting, dramatic spotlight beams cutting through smoke, cinematic angle, ultra detailed, 4K gaming wallpaper",

      iconPack:
        "RGB gaming icon pack for Android, dark matte base with vibrant color glow effects, sharp angular design language, consistent 512x512px design system, esports team aesthetic",

      character:
        "Elite pro gamer cyborg character, tactical futuristic gaming gear with RGB lighting, holographic visor displaying game stats, confident stance, detailed sci-fi concept art, full body illustration",

      widget:
        "Gaming performance HUD widget, real-time FPS counter, CPU and battery monitors, RGB color cycling border, dark transparent background, esports dashboard aesthetic",
    },

    amoled: {
      wallpaper:
        "Pure true black AMOLED wallpaper, ultra minimalist abstract design, subtle deep space geometry with barely visible dark purple gradients, premium luxury aesthetic, pixel-perfect 4K resolution, battery saving dark background",

      iconPack:
        "Premium AMOLED icon pack for Android, pure black background, ultra thin white line icons, subtle frosted glass effect, consistent 512x512px design system, luxury minimal aesthetic",

      character:
        "Shadow phantom guardian, flowing dark energy cloak, glowing white eyes emerging from darkness, elegant minimal silhouette, abstract dark art style, mysterious atmosphere, detailed character concept",

      widget:
        "Ultra minimal AMOLED clock widget, pure black background, elegant thin white typography, hairline separator lines, subtle breathing animation, premium luxury UI design",
    },
  };

  return prompts[
    style as keyof typeof prompts
  ];
}