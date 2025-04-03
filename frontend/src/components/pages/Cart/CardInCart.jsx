import React, { useState, useEffect, use } from 'react';
import { Card, Typography, Input, Button, message, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../../store/cartSlice';

const { Title, Text } = Typography;

const CardCart  = ({id}) => {
    const { productId } = id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const role = sessionStorage.getItem("role");
  
    const cartItem = cartItems.find((item) => item._id === product?._id);
    const quantity = cartItem?.quantity || 0;
    const isEditing = quantity > 0;
    const [isVisible, setIsVisible] = useState(true);






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
    }, [productId, messageApi]);

    const handleAddToCartClick = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

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

    if (!isVisible) {
        return null;
    }


    return (
        <Card>
            <Row>
                <Col span = {6}>
                    <img src={product.image} alt={product.title} style={{ width: "100%" }} />
                </Col>

                <Col span = {12}>
                    <Row span = {12}>
                        <h1>{product.name}</h1>
                    </Row>
                    <Row span = {12}>
                        <Button onClick={handleDecrement} 
                        style={{ width: 64, padding: 0, 
                        margin: '0 0 0 100px' }}
                        >-</Button>
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
                    </Row>
                </Col>

                <Col span={6}>
                    <Row span = {12}>
                            <h1>${product.price}</h1>
                    </Row>
                    <Row span = {12}>
                                <a
                            href="#"
                            style={{ textDecoration: "underline", cursor: "pointer" }}
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
    )
}

export default CardCart