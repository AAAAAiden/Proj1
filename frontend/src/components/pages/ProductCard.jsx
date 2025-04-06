import React from 'react';
import { Card, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item._id === product._id);
  const role = sessionStorage.getItem("role");

  const current = cartItem?.quantity || 0;
  const maxStock = cartItem?.stock || product.quantity || 0;
  const remainingStock = maxStock - current;
  const isEditing = current > 0;

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1, stock: product.quantity }));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (current === 0) {
        messageApi.error("This item is not in cart!");
        return;
    }

    if (isNaN(value) || value <= 0) {
      dispatch(updateQuantity({ _id: product._id, quantity: 0 }));
    } else if (value > maxStock) {
      dispatch(updateQuantity({ _id: product._id, quantity: maxStock }));
    } else {
      dispatch(updateQuantity({ _id: product._id, quantity: value }));
    }
  };

  const handleIncrement = () => {
    if (current === 0) {
        messageApi.error("This item is not in cart!");
        return;
    }
    if (current < maxStock) {
      dispatch(updateQuantity({ _id: product._id, quantity: current + 1 }));
    }
  };

  const handleDecrement = () => {
    if (current === 0) {
        messageApi.error("This item is not in cart!");
        return;
    }
    const newVal = Math.max(0, current - 1);
    dispatch(updateQuantity({ _id: product._id, quantity: newVal }));
  };

  return (
    <Card hoverable style={{ width: 300, height: 400 }}>
    {contextHolder}
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
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
            ${product.price}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', color: 'black' }}>{product.name}</div>

            {remainingStock <= 3 && remainingStock > 0 && (
                <div style={{ fontSize: '12px', color: 'red', marginLeft: 8 }}>
                Only {remainingStock} left!
                </div>
            )}

            {remainingStock === 0 && (
                <div style={{ fontSize: '12px', color: 'gray', marginLeft: 8 }}>
                Out of stock
                </div>
            )}
          </div>
        </div>
      </Link>

      {isEditing ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <Button onClick={handleDecrement} style={{ width: 64, padding: 0 }}>−</Button>
          <Input
            value={current}
            onChange={handleQuantityChange}
            style={{ textAlign: 'center', width: 120 }}
          />
          <Button
            onClick={handleIncrement}
            disabled={current >= maxStock}
            style={{ width: 64, padding: 0 }}
          >
            +
          </Button>
          {role === "admin" && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product._id}/edit`);
              }}
              style={{ flex: 1 }}
            >
              Edit
            </Button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Button
            type="primary"
            style={{ width: role === "admin" ? "50%" : "100%" }}
            onClick={handleAddToCartClick}
          >
            Buy
          </Button>
          {role === "admin" && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product._id}/edit`);
              }}
              style={{ width: "50%" }}
            >
              Edit
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
