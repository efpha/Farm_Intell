// src/lib/authServices.ts
import { supabase } from "../supabaseClient";
import { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

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

// Listen to auth state changes
export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void
) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Login user
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
  startSessionTimer(); // Start session timer on successful login
  return data;
};

// Sign out the user
export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};

//session expire after 1 hour
export const startSessionTimer = () => {
  let timeLeft = 60 * 60; // 1 hour in seconds

  const interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    console.log(`Session expires in: ${minutes}m ${seconds}s`);

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
    }
  }, 1000);

  setTimeout(async () => {
    clearInterval(interval); // stop countdown
    await signOut(); // sign out user after 1 hour
  }, 60 * 60 * 1000);
};