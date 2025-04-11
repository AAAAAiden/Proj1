import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedToken = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");
    if (storedUsername && storedToken && storedRole) {
      setUsername(storedUsername);
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const signIn = (username, token, role) => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    setUsername(username);
    setToken(token);
    setRole(role);
  };

  const signOut = () => {
    sessionStorage.clear();
    setUsername(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ username, token, role, signIn, signOut/*, loading*/ }}>
      {children}
    </AuthContext.Provider>
  );
};