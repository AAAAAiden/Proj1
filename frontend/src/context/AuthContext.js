import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const signIn = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  const signOut = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
