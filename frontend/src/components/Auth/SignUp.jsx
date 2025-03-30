import { Card, Form, Input, Button } from "antd";
import React from "react";


const SignIn = () => {
    const onFinish = (values) => {
        console.log('Sign Up data:', values);
    }
    const onFinishFailed = (values) => {
        console.log('not able to sign in')
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
                </Form>
            </Card>
        </div>
    )
}

export default SignIn