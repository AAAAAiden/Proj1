import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" replace />;
  if (role !== "admin") return <Navigate to="/products" replace />;

  return children;
};

export default AdminRoute;
