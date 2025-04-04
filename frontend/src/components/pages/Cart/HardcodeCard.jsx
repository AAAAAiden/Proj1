import React, { useState } from 'react';
import { Card, Typography, Input, Button, Row, Col } from 'antd';

const { Title } = Typography;

const HardcodedCardCart = () => {
  const product = {
    _id: '123',
    image: 'https://via.placeholder.com/150',
    title: 'Sample Product',
    name: 'Sample Product Name',
    price: 29.99,
    quantity: 10,
  };

  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

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

  if (!isVisible) return null;

  return (
    <Card style={{ margin: '20px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <img src={product.image} alt={product.title} style={{ width: '100%' }} />
        </Col>
        <Col span={12}>
          <Title level={4}>{product.name}</Title>
          <Row align="middle" style={{ marginTop: '20px' }}>
            <Button onClick={handleDecrement}>-</Button>
            <Input
              value={quantity}
              readOnly
              style={{ textAlign: 'center', width: 60, margin: '0 10px' }}
            />
            <Button onClick={handleIncrement} disabled={quantity >= product.quantity}>+</Button>
          </Row>
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
          <Title level={4}>${product.price}</Title>
          <a href="#" onClick={(e) => { e.preventDefault(); setIsVisible(false); }}>
            Remove
          </a>
        </Col>
      </Row>
    </Card>
  );
};

export default HardcodedCardCart;
