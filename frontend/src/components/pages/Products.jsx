import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Products = () => {
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();
  return (
    <div style={{ padding: "40px" }}>
      <Title level={2}>Welcome, {username || "User"}!</Title>
      <p>This is your products page.</p>

      {role === "admin" && (
        <Button
          type="primary"
          onClick={() => navigate("/productupload")}
          style={{ marginTop: 16 }}
        >
          Create Product
        </Button>
      )}
    </div>
  );
};

export default Products;