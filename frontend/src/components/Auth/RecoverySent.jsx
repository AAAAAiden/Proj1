import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RecoverySent = () => {
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
          width: 420,
          borderRadius: 8,
          background: "#fff",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          padding: "40px 32px",
        }}
      >
        <MailOutlined style={{ fontSize: 48, color: "#3f51b5", marginBottom: 24 }} />
        <Title level={5}>
          We have sent the update password link to your email, please check that!
        </Title>
      </Card>
    </div>
  );
};

export default RecoverySent;
