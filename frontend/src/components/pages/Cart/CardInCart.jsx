import React, { useState, useEffect, use } from 'react';
import { Card, Typography, Input, Button, message, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../../../store/cartSlice';

const { Title, Text } = Typography;


const CardCart  = ({product_in}) => {

    // const { productId } = product;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(product_in);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const role = sessionStorage.getItem("role");
  
    const cartItem = cartItems.find((item) => item._id === product?._id);
    const quantity = cartItem?.quantity || 0;
    const isEditing = quantity > 0;
    const [isVisible, setIsVisible] = useState(true);

    




    // useEffect(() => {
    //     fetch(`http://localhost:5001/api/products/${productId}`, {
    //     headers: {
    //         "x-auth-token": sessionStorage.getItem("token"),
    //     },
    //     })
    //     .then((res) => res.json())
    //     .then((data) => setProduct({ ...defaultProduct, ...data }))
    //     .catch((err) => {
    //         console.error("Error loading product:", err);
    //         messageApi.error("Failed to load product details.");
    //     });
    // }, [productId, messageApi]);

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



    const removeItem = () => {
    const newVal = 0;
    dispatch(updateQuantity({ _id: product._id, quantity: newVal }));
    dispatch(removeFromCart(product._id));
    };
    

    if (!isVisible) {
        return null;
    }





    if (!product_in) {
        return <div>No product information available.</div>;
    }

    return (
        <Card>
            <Row>
                <Col span = {6}>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover'
                      }}
                />
                </Col>

                <Col span={18} style={{ paddingLeft: '10px' }}>




            <div>
            {/* First Row: Product Name and Price */}
            <Row gutter={16} style={{ paddingLeft: '8px'}}>
                <Col span={12}>
                <h1>{product.name}</h1>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                <h1>${product.price}</h1>
                </Col>
            </Row>

            {/* Second Row: Quantity Controls and Remove Link */}
            <Row gutter={16} style={{ paddingLeft: '8px'}}>
                <Col span={12}>
                <div style={{ display: 'flex'}}>
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
                    style={{ textDecoration: "underline", cursor: "pointer", color: "gray" }}
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
            </div>
            </Col>
            </Row>
        </Card>
    )
}

export default CardCart