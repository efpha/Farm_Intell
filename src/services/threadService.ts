import { supabase } from "../supabaseClient";

// Create a thread
export const createThread = async (title: string, content: string, category_id: number) => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  const { data, error } = await supabase.from("Threads").insert([
    {
      title,
      content,
      category_id,
      user_id: userId,
    },
  ]);

  if (error) throw error;
  return data;
};

// Fetch threads
export const fetchThreads = async () => {
  const { data, error } = await supabase
    .from("threads")
    .select("*, categories(name), users:user_id(email)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// get categories
export const fetchCategories = async () => {

  const { data, error } = await supabase.from("Categories").select("*");

  if (error) throw error;
  
  return data;
}