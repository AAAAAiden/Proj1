import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");

  //resolve issues when username is set to be null
  if (!username || username === "null") return <Navigate to="/signin" replace />;
  if (role !== "admin") return <Navigate to="/products" replace />;

  return <Outlet />;
};

export const PrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || username === "null") {
      return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
  };

  

