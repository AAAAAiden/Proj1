import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Products = () => {
  const username = localStorage.getItem("username");
  console.log(username);
  return (
    <div style={{ padding: "40px" }}>
      <Title level={2}>Welcome, {username || "User"}!</Title>
      <p>This is your products page.</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          marginTop: 40,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            style={{
              height: 200,
              background: "#f0f2f5",
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Product #{n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
