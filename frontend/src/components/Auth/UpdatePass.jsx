import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import AuthCardWrapper from "./AuthCardWrapper";

const { Title, Text } = Typography;

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/recovery-sent")
  };

  return (
    <>
      <AuthCardWrapper width={400}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 12 }}>
              Update Your Password
            </Title>
            <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 24, fontSize: '11px' }}>
              Enter your email and we will send you a recovery link.
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
      </AuthCardWrapper>
    </>
  );
};

export default UpdatePassword;
