import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { signUp } from './auth';

const SignUp = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    signUp(values)
      .then((data) => {
        if (data.token) {
          messageApi.success("🎉 Account created successfully!");
          form.resetFields();
        } else {
          messageApi.error(data.msg || "Something went wrong.");
        }
      })
      .catch((err) => {
        messageApi.error("Signup failed. Please try again.");
      });
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 4 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Create account</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SignUp;


