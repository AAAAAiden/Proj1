import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Typography, Descriptions , InputNumber, Select} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const UploadPro = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { Option } = Select;
  const [previewUrl, setPreviewUrl] = useState('');


  useEffect(() => {
    setAnimate(true);
  }, []);

  const onFinish = (values) => {
    
  };

  const handlePreview = () => {
    
    const imageUrl = form.getFieldValue(['product', 'image']);
    setPreviewUrl(imageUrl);
    console.log('Image URL: ', imageUrl);
    console.log(imageUrl);
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
              Creat your account
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                name={['product', 'name']} 
                label="Product name"
                rules={[
                    { required: true, message: "Please enter the name of the product" }
                ]}
                >
                <Input/>
              </Form.Item>

              <Form.Item
                name={['product', 'Description']} 
                label="Product Description"

              >
                <Input.TextArea />
              </Form.Item>

                




            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    label="Category"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Select placeholder="Select Category">
                        <Option value="category1">category1</Option>
                        <Option value="category2">category2</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Price"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <InputNumber style={{width:'100%'}} controls={false}/>
                </Form.Item>
            </Form.Item>






            <Form.Item  style={{ marginBottom: 0 }}>
                <Form.Item
                    name={['product', 'quantity']} 
                    label="In Stock Quantity"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(35% - 8px)' }}
                >
                    <InputNumber style={{width:'100%'}} controls={false}/>
                </Form.Item>
                <Form.Item
                    name={['product', 'image']} 
                    label = "Add Image Link"
                    
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(65% - 8px)', margin: '0 8px' }}
                >
                    <Input style={{width:'100%'}}

                    addonAfter={<Button style={{backgroundColor: "hsl(260, 95.40%, 42.50%)" ,color:"white", height:"20px", width:"60px"}} onClick={(handlePreview)}>Preview</Button>}
                    />
                </Form.Item>
            </Form.Item>
            <div
        style={{
          width: '300px',
          height: '200px',
          border: '1px solid #ccc',
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <span>No image preview</span>
        )}
      </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add Product
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UploadPro;
