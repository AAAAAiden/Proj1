import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export const AdminRoute = ({ children }) => {
  const {username} = useAuth();
  const {role} = useAuth();

  //resolve issues when username is set to be null
  if (!username || username === "null") return <Navigate to="/signin" replace />;
  if (role !== "admin") return <Navigate to="/products" replace />;

  return <Outlet />;
};

export const PrivateRoute = ({ children }) => {
    const {token} = useAuth();
    const {username} = useAuth();

    if (!token || username === "null") {
      return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
  };

  

