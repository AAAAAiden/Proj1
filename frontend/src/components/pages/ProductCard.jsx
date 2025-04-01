import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
const { Meta } = Card;


const ProductCard = ({product}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleAddToCartClick = () => {
        setIsEditing(true);
        setQuantity(1);
    };

    const handleQuantityChange = (value) => {
        
        setQuantity(value.target.value);
        console.log(value.target.value);
        if (value.target.value <= 0) {
            setIsEditing(false)
            setQuantity(0)
        }
        if (value.target.value < 0) {
            console.log("something wrong")
        }

    };

    const addButton = () => {
        return (
            <button 
            style={{
                height: '20px',
                width: '20px',
                padding: '0'
            }}
            onClick={()=> {
                setQuantity(prev => prev + 1);
            }}>+</button>
        )
    }

    const minusButton = () => {
        return (
            <button 
            onClick={()=>{
                setQuantity(prev => {
                    const returnValue = Math.max(0, prev - 1)
                    if (returnValue === 0) {
                        setIsEditing(false)
                    }
                    if (returnValue < 0) {
                        console.log("something wrong")
                    }
                    return returnValue
                });

            }}>-</button>
        )
    }



    //TODO: set a request to change the qualitiy of the product value in the cart with useEffect
    useEffect(() => {
        console.log('Quantity changed:', quantity);
      }, [quantity]);

    return (
        <>
        <Card
            hoverable
            style={{ width: 330, height:400, padding: 0 }}
            bodyStyle={{ padding: 0, paddingLeft: "10px", paddingRight:"10px" }}
            cover={
                <div style={{ display: 'flex', justifyContent: 'center' ,marginTop:"10px", marginBottom:"0px" }}>
            <img 
                style={{height:'300px', width:'300px'}}
                alt="example" src={product.image} /> </div>}
        >
            <div style={{ textAlign: 'left', marginBottom: '5px', marginTop:'0px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{product.name}</div>
                <div style={{ fontSize: '14px', color: '#888' }}>${product.price}</div>
            </div>

            {isEditing ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                 <Input 
                    className="addToCart" 
                    type="number" 
                    variant="borderless"
                    style={{ textAlign: 'center', width: 'calc(50% - 4px)' , padding:0}}
                    addonBefore={minusButton()} addonAfter={addButton()} value = {quantity}
                    onChange={handleQuantityChange} /> 
                    <Button style={{ width: 'calc(50% - 4px)' }}>Edit</Button>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                    
                <Button type="primary" style={{ width: 'calc(50% - 4px)' }}  onClick={handleAddToCartClick}>
                    Add to Cart
                </Button>
                
                <Button style={{ width: 'calc(50% - 4px)' }}>Edit</Button>
                </div>
            )}


        </Card>
    </>
    )
};
export default ProductCard;