import React, { useState, useEffect } from 'react';
import { Card, Typography, Form, Input, Button, message, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const DetailPage = ({ product }) => {
    const { productId } = useParams();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [animate, setAnimate] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleAddToCartClick = () => {
    setIsEditing(true);
    setQuantity(1);
    };

    const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value <= 0) {
        setIsEditing(false);
        setQuantity(0);
    } else if (value > product.quantity) {
        setQuantity(product.quantity);
    } else {
        setQuantity(value);
    }
    };

    const handleIncrement = () => {
    if (quantity < product.quantity) {
        setQuantity((prev) => prev + 1);
    }
    };

    const handleDecrement = () => {
    setQuantity((prev) => {
        const newVal = Math.max(0, prev - 1);
        if (newVal === 0) setIsEditing(false);
        return newVal;
    });
    };

    useEffect(() => {
    console.log('Quantity changed:', quantity);
    }, [quantity]);

    return (
    <div style={{ display: 'grid', gap: '5px', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {contextHolder}
        <h1 style={{ marginBottom: 0 }}>Products Detail</h1>
        <Card
        hoverable
        style={{ width: '90vw', height: '60vh' }} // Responsive dimensions relative to the viewport
        >
        <Row style={{ height: '100%', width: '90%'}} justify="center">
            
            <Col span={12} pull={1}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1' }}>
            <img
                src={product.image}
                alt={product.name}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/260x260.png?text=No+Image';
                }}
            />
            </Col>
            
            <Col span={8} push={1} style={{  padding: '10px',
            overflowWrap: 'break-word',
            whiteSpace: 'normal' }}>
            <div style={{ textAlign: 'left', marginBottom: 8 }}>
                <div style={{ fontSize: '13px', color: '#888' }}>{product.category}</div>
                <div style={{ fontSize: '25px', fontWeight: 'bold' }}>{product.name}</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>${product.price}</div>
                <div style={{ fontSize: '13px', color: '#888' }}>{product.description}</div>
            </div>
            {isEditing ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 , width: 300}}>
                <Button onClick={handleDecrement} style={{ width: 32, padding: 0 }}>−</Button>
                <Input
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ textAlign: 'center', width: 60 }}
                />
                <Button onClick={handleIncrement} disabled={quantity >= product.quantity} style={{ width: 32, padding: 0 }}>+</Button>
                <Button style={{ flex: 1 }}>Edit</Button>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: 8, width:300 }}>
                <Button type="primary" style={{ width: '50%' }} onClick={handleAddToCartClick}>
                    Add
                </Button>
                <Button style={{ width: '50%' }}>Edit</Button>
                </div>
            )}
            </Col>
        </Row>
        </Card>
    </div>
    );
};

export default DetailPage;
