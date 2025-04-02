import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Button, message, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const { Title } = Typography;

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { cartItems, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${productId}`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Error loading product:", err);
        messageApi.error("Failed to load product details.");
      });
  }, [productId]);

  useEffect(() => {
    if (product) {
      const match = cartItems.find(item => item._id === product._id);
      if (match && match.quantity > 0) {
        setQuantity(match.quantity);
        setIsEditing(true);
      } else {
        setQuantity(0);
        setIsEditing(false);
      }
    }
  }, [cartItems, product]);

  const handleAddToCartClick = () => {
    setIsEditing(true);
    setQuantity(1);
    addToCart(product, 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value <= 0) {
      setIsEditing(false);
      setQuantity(0);
      updateQuantity(product._id, 0);
    } else if (value > product.quantity) {
      setQuantity(product.quantity);
      updateQuantity(product._id, product.quantity);
    } else {
      setQuantity(value);
      updateQuantity(product._id, value);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      const newVal = quantity + 1;
      setQuantity(newVal);
      updateQuantity(product._id, newVal);
    }
  };

  const handleDecrement = () => {
    const newVal = Math.max(0, quantity - 1);
    setQuantity(newVal);
    updateQuantity(product._id, newVal);
    if (newVal === 0) setIsEditing(false);
  };

  if (!product) return <div>Loading product details...</div>;

  return (
    <div style={{ display: 'grid', gap: '5px', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {contextHolder}
      <Title level={2}>Product Details</Title>
      <Card hoverable style={{ width: '90vw', height: '60vh' }}>
        <Row style={{ height: '100%', width: '90%' }} justify="center">
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1' }}>
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

          <Col span={8} style={{ padding: '10px', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
            <div style={{ textAlign: 'left', marginBottom: 8 }}>
              <div style={{ fontSize: '13px', color: '#888' }}>{product.category}</div>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>{product.name}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>${product.price}</div>
              <div style={{ fontSize: '13px', color: '#888' }}>{product.description}</div>
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 300 }}>
                <Button onClick={handleDecrement} style={{ width: 32, padding: 0 }}>−</Button>
                <Input
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{ textAlign: 'center', width: 60 }}
                />
                <Button
                  onClick={handleIncrement}
                  disabled={quantity >= product.quantity}
                  style={{ width: 32, padding: 0 }}
                >+</Button>
                <Button style={{ flex: 1 }} disabled>Edit</Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, width: 300 }}>
                <Button type="primary" style={{ width: '50%' }} onClick={handleAddToCartClick}>
                  Add
                </Button>
                <Button style={{ width: '50%' }} disabled>Edit</Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DetailPage;
