// src/lib/authServices.ts
import { supabase } from "../supabaseClient"; 
import { User } from "@supabase/supabase-js";


// Get the currently logged-in user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }

  return data.user;
};

// Check if user is logged in
export const isUserLoggedIn = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};

// Sign out the user
export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};