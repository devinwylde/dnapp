import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = (await supabase.auth.getSession()).data;
      if (session && session.session && session.session.user) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email, password) => {
    if (!checkIfEmail(email)) {
        ({ data, error } = await loginWithUsername(email, password));
    }  else {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
    }

    if (data && data.session) {
        setIsAuthenticated(true);
    }
    if (error) {
        alert(error.message);
    }
  };

  const checkIfEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
  };

  const loginWithUsername = async (username, password) => {
      const { data, error } = await supabase.rpc('login_user', {
          p_username: username,
          p_password: password,
        });
    
        if (error || !data || data.error) {
          return { user: null, error: error || new Error(data.error) };
        }
    
        // Assuming the auth token and user data are returned
        const { token, user } = data;
    
        // Set the auth session manually
        await supabase.auth.setAuth(token);
    
        return { user, error: null };
  };

  const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
        if (data.user) {
            const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: data.user.id, username }]);

            if (profileError) {
              throw profileError;
            }
        } else {
            throw error;
        }
  };

  const verify = async (email, code) => {
    const { user, error } = await supabase.auth.verifyOTP({
      email,
      token: code,
      type: 'signup'
    });
    if (error) throw error;
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, verify, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;