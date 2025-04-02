import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { addToCart, updateQuantity, cartItems } = useCart();

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); 
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

  // make sure each time when the cart is updated, we match the productcard UI
  useEffect(() => {
    const match = cartItems.find(item => item._id === product._id);
    if (match && match.quantity > 0) {
      setQuantity(match.quantity);
      setIsEditing(true);
    } else {
      setQuantity(0);
      setIsEditing(false);
    }
  }, [cartItems, product._id]);

  return (
    <Card
    hoverable
    style={{ width: 300, height: 400 }}
    bodyStyle={{ padding: 10 }}
    >
    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
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
        <div style={{ textAlign: 'left', marginTop: 8 }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>${product.price}</div>
        <div style={{ fontSize: '13px', color: '#888' }}>{product.name}</div>
        </div>
    </Link>

    {isEditing ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
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
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <Button
            type="primary"
            style={{ width: '50%' }}
            onClick={handleAddToCartClick}
        >
            Add
        </Button>
        <Button style={{ width: '50%' }} disabled>Edit</Button>
        </div>
    )}
    </Card>
  );
};

export default ProductCard;
