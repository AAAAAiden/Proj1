import React, { useEffect } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { signIn } from "./auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthCardWrapper from "./AuthCardWrapper";

const { Title, Text } = Typography;

const SignIn = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { signIn:setUserIn } = useAuth();

  useEffect(() => {
    sessionStorage.clear();
    // because we want to force log-out once navigated to sign-in page
    setUserIn(null, null, null);
  }, []); 

  const onFinish = (values) => {
    signIn(values)
      .then((data) => {
        if (data.token) {
          setUserIn(data.username, data.token, data.role);
          messageApi.success("Sign In successful!");
          form.resetFields(); 
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
      <AuthCardWrapper width={400}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
              Sign in to your account
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
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
      </AuthCardWrapper>
    </>
  );
};

export default SignIn;
