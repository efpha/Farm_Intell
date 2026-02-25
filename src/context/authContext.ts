// Todo: Has bugs
import { supabase } from "../supabaseClient";
import { createContext, useState, useEffect } from "react";

//create authContext
const AuthContext = createContext();


// provider conponent
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //get initiall session
        const getsession = async () => {
            const { data } = await supabase.auth.getSession();

            setUser(data.session?.user || null);
            setLoading(false);
        }
        getsession();

        // Listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        // Clean up listener on unmount
        return () => listener.subscription.unsubscribe();
    }, []);
    return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming context
export const useAuth = () => useContext(AuthContext);