import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Typography } from "antd";
import { signIn } from "./auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const SignIn = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { signIn:setAuthUser, username } = useAuth();

  useEffect(() => {
    setAnimate(true);
    sessionStorage.clear();
    setAuthUser(null, null);
  }, []);

  const onFinish = (values) => {
    signIn(values)
      .then((data) => {
        if (data.token) {
          setAuthUser(data.username, data.token);
          messageApi.success("Sign In successful!");
          form.resetFields();
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.role); 
          sessionStorage.setItem("username", data.username); 
          setTimeout(() => {
            navigate("/products");
          }, 1500);          
        } else {
            if (data.msg === "Invalid credentials") {
                messageApi.error("Incorrect password. Please try again.");
              } else if (data.msg === "No matched user") {
                messageApi.error("No account found with that email or username.");
              } else {
                messageApi.error(data.msg || "Something went wrong.");
              }
        }
      })
      .catch((error) => {
        console.error("Sign in error:", error);
        messageApi.error("Sign in failed. Please try again.");
      });
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
            <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
              Sign in to your account
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                name="usernameOrEmail" 
                rules={[
                    { required: true, message: "Please enter your email or username" }
                ]}
                >
                <Input placeholder="Username or Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign In
                </Button>
              </Form.Item>

              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Text type="secondary">
                    Don’t have an account? <Link to="/signup">Sign Up</Link>
                </Text>
                <br />
                <Link to="/updatepassword">Forgot password?</Link>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
