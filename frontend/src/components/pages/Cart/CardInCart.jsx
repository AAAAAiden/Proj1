import React, { useState } from 'react';
import { Card, Input, Button, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../../store/cartSlice';

const CardCart = ({ product_in }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item._id === product_in?._id);

  // Cart quantity and inventory stock
  const quantity = cartItem?.quantity || 0;
  const maxStock = cartItem?.stock || product_in.quantity || 0;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value <= 0) {
      dispatch(updateQuantity({ _id: product_in._id, quantity: 0 }));
    } else if (value > maxStock) {
      dispatch(updateQuantity({ _id: product_in._id, quantity: maxStock }));
    } else {
      dispatch(updateQuantity({ _id: product_in._id, quantity: value }));
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      dispatch(updateQuantity({ _id: product_in._id, quantity: quantity + 1 }));
    }
  };

  const handleDecrement = () => {
    const newVal = Math.max(0, quantity - 1);
    dispatch(updateQuantity({ _id: product_in._id, quantity: newVal }));
  };

  const removeItem = () => {
    dispatch(updateQuantity({ _id: product_in._id, quantity: 0 }));
    dispatch(removeFromCart(product_in._id));
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
            src={product_in.image}
            alt={product_in.name}
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
          />
        </Col>

        <Col span={18} style={{ paddingLeft: '10px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <h1>{product_in.name}</h1>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <h1>${product_in.price}</h1>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <div style={{ display: 'flex' }}>
                <Button
                  onClick={handleDecrement}
                  style={{ width: 24, padding: 0, marginRight: 4, height: 20 }}
                >
                  -
                </Button>
                <Input
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{ textAlign: 'center', width: 50, height: 20 }}
                />
                <Button
                  onClick={handleIncrement}
                  disabled={quantity >= maxStock}
                  style={{ width: 24, padding: 0, marginLeft: 4, height: 20 }}
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
