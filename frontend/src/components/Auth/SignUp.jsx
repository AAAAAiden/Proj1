import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { signUp } from './auth';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const onFinish = (values) => {
    signUp(values)
      .then((data) => {
        if (data.token) {
          messageApi.success("🎉 Account created successfully!");
          form.resetFields();
        } else {
          messageApi.error(data.msg || "Something went wrong, no token generated.");
        }
      })
      .catch(() => {
        messageApi.error("Signup failed. Please try again.");
      });
  };
  
  return (
    <>
      {contextHolder}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          className={animate ? 'animated-card' : ''}
          style={{
            width: 400,
            borderRadius: 8,
            background: '#fff',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ padding: '40px 32px' }}>
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
          </div>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
