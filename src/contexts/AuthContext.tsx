import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        return { error };
      }
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Error during sign out:', err);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    getSession();

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
