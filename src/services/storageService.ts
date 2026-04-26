// src/services/storageService.ts
import { supabase } from "../supabaseClient";

export const uploadMedia = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `media/${fileName}`;

  const { error } = await supabase.storage
    .from('media')
    .upload(filePath, file);

  if (error) {
    throw new Error(`Failed to upload media: ${error.message}`);
  }

  const { data } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  return data.publicUrl;
};