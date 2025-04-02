import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Button, message, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const { Title, Text } = Typography;

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { cartItems, addToCart, updateQuantity } = useCart();
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate(); 

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
    <div style={{ marginTop: '0px' }}>
      {contextHolder}
  
      <div style={{ textAlign: 'left', marginTop: '-100px', marginBottom: '40px' }}>
        <Title level={2}>Product Details</Title>
      </div>
  
      <div>
        <Card
          style={{
            width: '95vw',
            maxWidth: '2000px',
            minHeight: '800px', 
            padding: '20px',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Row gutter={[48, 24]} style={{ alignItems: 'flex-start' }} wrap={false}>
            {/* Fixed Image Section */}
            <Col span={12}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '2000px',
                  height: '700px',
                  background: '#f5f5f5',
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/260x260.png?text=No+Image';
                  }}
                />
              </div>
            </Col>
  
            {/* Product Info Section */}
            <Col span={12}>
              <div>
                <Text type="secondary" style={{margin: '20px 0 0 100px'}}>{product.category}</Text>
                <Title level={2} style={{ fontWeight: 'bold', margin: '30px 0 0px 100px', fontSize: '55px' }}>{product.name}</Title>
                <Title level={4} style={{ fontWeight: 'bold', margin: '10px 0 50px 100px', fontSize: '35px' }}>${Number(product.price).toFixed(2)}</Title>
                <div
                    style={{
                        width: '80%',
                        height: '250px',           
                        overflow: 'hidden',       
                        textOverflow: 'ellipsis',  
                        whiteSpace: 'normal',     
                        border: '1px solid #e0e0e0',
                        padding: '12px',
                        borderRadius: '4px',
                        margin: '0 0 40px 100px',
                        background: '#fafafa',
                    }}
                >
                <Text style={{ display: 'block', overflow: 'hidden', height:'100%', lineHeight:'1.4' }}>{product.description}</Text>
                </div>  
                {isEditing ? (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, width: 300 }}>
                    <Button onClick={handleDecrement} style={{ width: 64, padding: 0, margin: '0 0 0 100px'  }}>−</Button>
                    <Input
                      value={quantity}
                      onChange={handleQuantityChange}
                      style={{ textAlign: 'center', width: 120 }}
                    />
                    <Button
                      onClick={handleIncrement}
                      disabled={quantity >= product.quantity}
                      style={{ width: 64, padding: 0 }}
                    >+</Button>
                    {role === 'admin' && (
                      <Button
                        style={{ flex: 1 }}
                        onClick={() => navigate(`/products/${product._id}/edit`)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8, width: 300 }}>
                    <Button
                      type="primary"
                      style={{ width: role === 'admin' ? '50%' : '100%' , margin: '0 0 0 100px'}}
                      onClick={handleAddToCartClick}
                    >
                      Buy
                    </Button>
                    {role === 'admin' && (
                      <Button
                        style={{ width: '50%' }}
                        onClick={() => navigate(`/products/${product._id}/edit`)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                )}
                  <Button
                    style={{ margin: '50px 0 0 100px' }}
                    onClick={() => navigate('/products')}
                    type='primary'
                >
                    ← Back to Products
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
  
  
};

export default DetailPage;
