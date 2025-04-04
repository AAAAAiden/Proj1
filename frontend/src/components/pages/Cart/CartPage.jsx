import React, { useState, createContext, useContext } from 'react';
import { Button, Col, Drawer, Form, Row, Input } from 'antd';
import CardCart from './CardInCart';
import { useSelector } from 'react-redux';

const DrawerContext = createContext();

export const CartPage = () => {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const cartItems = useSelector((state) => state.cart?.items || []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ showDrawer, onClose }}>
      {/* <Drawer title={`Cart (${cartItems.length})`} onClose={onClose} open={open} width={400}>
        {cartItems.map((item) => (
          <CardCart key={item._id} id={item._id} />
        ))}

        <Form layout="vertical">
          <div>Apply Discount Code</div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Input placeholder="Discount Code" />
            <Button type="primary">Apply</Button>
          </div>
        </Form>

        <div style={{ marginTop: '24px' }}>
          <Row>
            <Col span={18}>
              <Row><p>Subtotal</p></Row>
              <Row><p>Tax</p></Row>
              <Row><p>Discount</p></Row>
              <Row><p>Estimated Total</p></Row>
            </Col>
            <Col span={6}>
              <Row><p>${total}</p></Row>
              <Row><p>${(total * 0.1).toFixed(2)}</p></Row>
              <Row><p>${-20}</p></Row>
              <Row><p>${(1.1 * total - 20).toFixed(2)}</p></Row>
            </Col>
          </Row>
        </div>
      </Drawer> */}
      <Drawer
  title={`Cart (${cartItems.length})`}
  onClose={onClose}
  open={open}
  width={400}
>
  <p>Cart content here</p>
</Drawer>
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
