import React from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { signUp } from './auth';
import { Link } from 'react-router-dom';
import AuthCardWrapper from "./AuthCardWrapper";

const { Title, Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    signUp(values)
      .then((data) => {
        if (data.token) {
          messageApi.success("Account created successfully!");
          form.resetFields();
        } else {
            if (data.msg === "Username or email already exists") {
                messageApi.error("Username or email is already taken. Please try again.");
              } else {
                messageApi.error(data.msg || "Something went wrong.");
              }        
            }
      })
      .catch((err) => {
        console.error("Sign up error:", err);
        messageApi.error("Signup failed. Please try again.");
      });
  };

  return (
    <>
      {contextHolder}
      <AuthCardWrapper width={400}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
              Create your account
            </Title>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Email is not valid' },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 4, message: 'Password must be at least 4 characters' },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <Text type="secondary">
                  Already have an account? <Link to="/signin">Sign in</Link>
                </Text>
              </div>
            </Form>
      </AuthCardWrapper>
    </>
  );
};

export default SignUp;
