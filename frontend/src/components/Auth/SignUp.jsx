import { Card, Form, Input, Button, message} from "antd";
import React from "react";
import { signUp } from "./auth";
import { Link } from "react-router-dom";

const SignUp = () => {
    const onFinish = (values) => {
        signUp(values)
            .then((data) => {
                if (data.token) {
                    console.log('success!');
                    message.success({
                        content: 'Sign up successful!',
                        duration: 3,
                      });
                } else {
                    message.error(data.message || "Something went wrong.");
                }
            })
            .catch((error) => {
                console.error("Sign up error:", error);
                message.error("Signup failed. Please try again.");
            });
    };
    const onFinishFailed = (values) => {
        console.log('not able to sign in with ', values)
    }

    return (
        <div>
            <style>{`
                .ant-form-item-explain {
                text-align: right;
                }
            `}</style>
            <Card>
                <Form
                    name="basic"
                    layout="vertical"
                    requiredMark={false}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input a username' },
                        {
                            validator: async (_, value) => {
                              if (!value) return Promise.resolve();
                              const res = await fetch(`http://localhost:5001/api/auth/check-availability?field=username&value=${value}`);
                              const data = await res.json();
                              if (!data.available) return Promise.reject("Username is already taken");
                              return Promise.resolve();
                            }
                        }
                    ]}
                    >
                    <Input />
                    </Form.Item>
                    
                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Invalid Email input!' },
                        { type: "email", message: "Please enter a valid email" },
                        {
                        validator: async (_, value) => {
                            if (!value) return Promise.resolve();
                            const res = await fetch(`http://localhost:5001/api/auth/check-availability?field=email&value=${value}`);
                            const data = await res.json();
                            if (!data.available) return Promise.reject("Email is already registered");
                            return Promise.resolve();
                            }
                        }
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Invalid password input!' },
                        { min: 4, message: 'Password must be at least 4 characters' }
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Create account
                    </Button>
                    </Form.Item>
                    <div style={{ textAlign: "center", marginTop: 16 }}>
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp