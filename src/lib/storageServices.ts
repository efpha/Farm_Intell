import { supabase } from "../supabaseClient";

export const uploadMedia = async (file: File): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `threads/${fileName}`;

  const { error } = await supabase.storage
    .from("thread-media")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("thread-media")
    .getPublicUrl(filePath);

  return data.publicUrl;
};