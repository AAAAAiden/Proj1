import { Card, Form, Input, Button, message} from "antd";
import React from "react";
import { signUp } from "./auth";
import { Link } from "react-router-dom";


const SignUp = () => {
    const onFinish = (values) => {
        signUp(values)
            .then((data) => {
                if (data.success) {
                    message.success("Sign up successful!");
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
                    name="Username"
                    rules={[{ required: true, message: 'Invalid Username input!' }]}
                    >
                    <Input />
                    </Form.Item>
                    
                    <Form.Item
                    label="Email"
                    name="Email"
                    rules={[{ required: true, message: 'Invalid Email input!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Invalid password input!' }]}
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