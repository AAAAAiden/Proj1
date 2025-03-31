import { Card, Form, Input, Button, message} from "antd";
import React from "react";
import {updatePassword} from "./auth"

const UpdatePassword = () => {
    const onFinish = (values) => {
        updatePassword(values).then(
            (data)=>{
                if (data.success) {
                    if (data.success) {
                        message.success("password update successfully");
                    } else {
                        message.error(data.message || "Something went wrong.");
                    }
                }
            }
        ).catch((error) => {
                    console.error("Sign up error:", error);
                    message.error("Signup failed. Please try again.");
        });
    }

    const onFinishFailed = (values) => {
        console.log('not able to update')
    }



    return (
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
                <div><p>Update Your password</p></div>
                <div><p>Enter your email link, we will send you the recovery link</p></div>
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[{ required: true, message: 'Invalid Email input!' }]}
                    >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Update password
                </Button>
            </Form>
        </Card>
    )
};
export default UpdatePassword