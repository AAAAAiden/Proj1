import React, { useState } from 'react';
import { Card, Input, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../../store/cartSlice';

const CardCart = ({ product_in }) => {
  const [product] = useState(product_in);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [isVisible, setIsVisible] = useState(true);

  const cartItem = cartItems.find((item) => item._id === product?._id);
  const quantity = cartItem?.quantity || 0;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value <= 0) {
      dispatch(updateQuantity({ _id: product._id, quantity: 0 }));
    } else if (value > product.quantity) {
      dispatch(updateQuantity({ _id: product._id, quantity: product.quantity }));
    } else {
      dispatch(updateQuantity({ _id: product._id, quantity: value }));
    }
  };

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      dispatch(updateQuantity({ _id: product._id, quantity: quantity + 1 }));
    }
  };

  const handleDecrement = () => {
    const newVal = Math.max(0, quantity - 1);
    dispatch(updateQuantity({ _id: product._id, quantity: newVal }));
  };

  const removeItem = () => {
    dispatch(updateQuantity({ _id: product._id, quantity: 0 }));
    dispatch(removeFromCart(product._id));
  };

  if (!isVisible || !product_in) {
    return null;
  }

  return (
    <Card>
      {contextHolder}
      <Row>
        <Col span={6}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
          />
        </Col>

        <Col span={18} style={{ paddingLeft: '10px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <h1>{product.name}</h1>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <h1>${product.price}</h1>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <div style={{ display: 'flex' }}>
                <Button
                  onClick={handleDecrement}
                  style={{ width: 16, padding: 0, marginRight: 4, height: 20 }}
                >
                  -
                </Button>
                <Input
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{ textAlign: 'center', width: 32, height: 20 }}
                />
                <Button
                  onClick={handleIncrement}
                  disabled={quantity >= product.quantity}
                  style={{ width: 16, padding: 0, marginLeft: 4, height: 20 }}
                >
                  +
                </Button>
              </div>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <a
                href="#"
                style={{ textDecoration: 'underline', cursor: 'pointer', color: 'gray' }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsVisible(false);
                  removeItem();
                }}
              >
                Remove
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CardCart;
