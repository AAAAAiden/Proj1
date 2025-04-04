import React from "react";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");

  if (!username || username === "null") return <Navigate to="/signin" replace />;
  if (role !== "admin") return <Navigate to="/products" replace />;

  return children;
};

export const PrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || username === "null") {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  

