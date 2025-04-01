import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';

const ProductCard = ({ product }) => {
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
        setQuantity((prev) => prev+1);
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
    <Card
      hoverable
      style={{ width: 300, height: 400 }}
      bodyStyle={{ padding: 10 }}
      cover={
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ height: '260px', width: '260px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/260x260.png?text=No+Image';
            }}
          />
        </div>
      }
    >
      <div style={{ textAlign: 'left', marginBottom: 8 }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>${product.price}</div>
        <div style={{ fontSize: '13px', color: '#888' }}>{product.name}</div>
      </div>

      {isEditing ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button onClick={handleDecrement} style={{ width: 32, padding: 0 }}>−</Button>
          <Input
            value={quantity}
            onChange={handleQuantityChange}
            style={{ textAlign: 'center', width: 60 }}
          />
          <Button onClick={handleIncrement} disabled={quantity>=product.quantity} style={{ width: 32, padding: 0 }}>+</Button>
          <Button style={{ flex: 1 }}>Edit</Button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" style={{ width: '50%' }} onClick={handleAddToCartClick}>
            Add
          </Button>
          <Button style={{ width: '50%' }}>Edit</Button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;


