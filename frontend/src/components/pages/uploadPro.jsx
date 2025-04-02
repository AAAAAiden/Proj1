import React, { useState, useEffect } from "react";
import {
  Card, Form, Input, Button, message, Typography, InputNumber, Select, Upload, Spin
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const UploadPro = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [animate, setAnimate] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const onFinish = async (values) => {
    const token = sessionStorage.getItem("token");
    const name = values.product.name;
    setLoading(true);

    try {
      const checkRes = await fetch(
        `http://localhost:5001/api/products/check-name?name=${encodeURIComponent(name)}`
      );
      const checkData = await checkRes.json();
      if (checkData.exists) {
        return messageApi.error("A product with this name already exists.");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", values.product.Description || "");
      formData.append("category", values.product.category);
      formData.append("price", values.product.price);
      formData.append("quantity", values.product.quantity);
      formData.append("image", values.product.image[0].originFileObj);

      const res = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw data;

      messageApi.success("Product uploaded successfully!");
      form.resetFields();
      setPreviewUrl("");
    } catch (err) {
      console.error("Upload error:", err);
      messageApi.error(err.msg || "Failed to upload product.");
    } finally {
      setLoading(false);
    }
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
            width: 500,
            borderRadius: 8,
            background: "#fff",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ padding: "40px 32px" }}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
              Add New Product
            </Title>

            <Spin spinning={loading} tip="Uploading...">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                autoComplete="off"
              >
                <Form.Item
                  name={["product", "name"]}
                  label="Product name"
                  rules={[{ required: true, message: "Please enter the product name" }]}
                >
                  <Input disabled={loading} />
                </Form.Item>

                <Form.Item
                  name={["product", "Description"]}
                  label="Product Description"
                  rules={[{ required: true, message: "Please enter the description" }]}
                >
                  <Input.TextArea disabled={loading} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Form.Item
                    name={["product", "category"]}
                    label="Category"
                    rules={[{ required: true, message: "Please enter category" }]}
                    style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  >
                    <Select placeholder="Select Category" disabled={loading}>
                      <Option value="category1">category1</Option>
                      <Option value="category2">category2</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={["product", "price"]}
                    label="Price"
                    rules={[
                      { required: true, message: "Please enter the price" },
                      { type: "number", min: 0, message: "Price must be a non-negative number" }
                    ]}
                    style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }}
                  >
                    <InputNumber style={{ width: "100%" }} disabled={loading} />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  name={["product", "quantity"]}
                  label="In Stock Quantity"
                  rules={[
                    { required: true, message: "Please enter the quantity" },
                    {
                      validator: (_, value) => {
                        if (value === undefined || value === null || value === "") {
                          return Promise.reject("Please enter the quantity");
                        }
                        if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
                          return Promise.reject("Quantity must be a positive integer");
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                  style={{ display: "inline-block", width: "calc(35% - 8px)" }}
                >
                  <InputNumber style={{ width: "100%" }} disabled={loading} />
                </Form.Item>

                <Form.Item
                  name={["product", "image"]}
                  label="Product Image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e && e.fileList}
                  rules={[{ required: true, message: "Please upload an image" }]}
                  style={{ display: "inline-block", width: "calc(65% - 8px)", margin: "0 8px" }}
                >
                  <Upload
                    accept="image/*"
                    beforeUpload={() => false}
                    maxCount={1}
                    disabled={loading}
                    showUploadList={{ showPreviewIcon: false }}
                    onChange={({ fileList }) => {
                      const fileObj = fileList[0]?.originFileObj;
                      if (fileObj) {
                        const reader = new FileReader();
                        reader.onload = (e) => setPreviewUrl(e.target.result);
                        reader.readAsDataURL(fileObj);
                      } else {
                        setPreviewUrl("");
                      }
                    }}
                  >
                    <Button type="primary" icon={<UploadOutlined />} disabled={loading}>
                      Upload Image
                    </Button>
                  </Upload>
                </Form.Item>

                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    border: "1px solid #ccc",
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span>No image preview</span>
                  )}
                </div>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Add Product
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginTop: 8, width: "100%" }}
                    onClick={() => navigate("/products")}
                    disabled={loading}
                  >
                    Back to Products
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UploadPro;
