import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedToken = sessionStorage.getItem("token");
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const signIn = (username, token) => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
    setUsername(username);
    setToken(token);
  };

  const signOut = () => {
    sessionStorage.clear();
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ username, token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};