import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [animate, setAnimate] = useState(false);
  const [contextHolder] = message.useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    setAnimate(true);
  }, []);

  const onFinish = () => {
    navigate("/recovery-sent")
  };

  return (
    <>
      {contextHolder}
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
            width: 400,
            borderRadius: 8,
            background: "#fff",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ padding: "40px 32px" }}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 12 }}>
              Update Your Password
            </Title>
            <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 24, fontSize: '11px' }}>
              Enter your email and we’ll send you a recovery link.
            </Text>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email address" },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Send Recovery Link
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UpdatePassword;
