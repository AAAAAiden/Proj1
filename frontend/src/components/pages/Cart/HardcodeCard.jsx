import React, { useState } from 'react';
import { Card, Typography, Input, Button, Row, Col } from 'antd';

const { Title } = Typography;

const HardcodedCardCart = () => {
  // Hard-coded product details
  const product = {
    _id: '123',
    image: 'https://via.placeholder.com/150',
    title: 'Sample Product',
    name: 'Sample Product Name',
    price: 29.99,
    quantity: 10, // Maximum available quantity
  };

  // Local state for quantity and visibility
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  // Handlers for incrementing/decrementing quantity
  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card style={{ margin: '20px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%' }} 
          />
        </Col>
        <Col span={12}>
          <Row>
            <Title level={4}>{product.name}</Title>
          </Row>
          <Row align="middle" style={{ marginTop: '20px' }}>
            <Button 
              onClick={handleDecrement} 
              style={{ width: 64, padding: 0 }}
            >
              -
            </Button>
            <Input
              value={quantity}
              readOnly
              style={{ textAlign: 'center', width: 120, margin: '0 10px' }}
            />
            <Button 
              onClick={handleIncrement} 
              style={{ width: 64, padding: 0 }}
              disabled={quantity >= product.quantity}
            >
              +
            </Button>
          </Row>
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
          <Row>
            <Title level={4}>${product.price}</Title>
          </Row>
          <Row>
            <a
              href="#"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                setIsVisible(false);
              }}
            >
              Remove
            </a>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default HardcodedCardCart;
