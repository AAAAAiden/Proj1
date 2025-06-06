import React, { useState, useEffect } from "react";
import { Card } from "antd";

const AuthCardWrapper = ({ children, width }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className={animate ? "animated-card" : ""}
        style={{
          width,
          borderRadius: 8,
          background: "#fff",
          border: "none",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ padding: "40px 32px" }}>{children}</div>
      </Card>
    </div>
  );
};

export default AuthCardWrapper;
