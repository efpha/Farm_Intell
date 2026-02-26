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
    .from("Threads")
    .select("*, Categories(name)") 
    .order("created_at", { ascending: false }); // TODO: Fetch details of the user who created the thread (e.g., username) and display it in the UI

  if (error) throw error;
  return data;
};

// get categories
export const fetchCategories = async () => {
  const { data, error } = await supabase.from("Categories").select("*");
  if (error) throw error;
  console.log("Fetched categories:", data);
  return data;
}