import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file: File, folder: string = "wallpapers") => {
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("themeforge-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error subiendo imagen:", error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("themeforge-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};