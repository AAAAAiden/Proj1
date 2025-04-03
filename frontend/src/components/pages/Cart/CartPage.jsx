import React, { useState } from 'react';
import { Button, Col, Drawer, Form, Row } from 'antd';
import CardCart from './CardInCart';


const CartPage = () => {
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(0);

    const cartItems = useSelector((state) => state.cart.items);

    
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return(
      <Drawer title={"Cart" + "(" + cartItems.length + ")"} onClose={onClose} open={open}>
      {
        cartItems.map((item) => (
          <CardCart key={item._id} id={item._id} />
        ))
      }
      <Form>
        <div>
          Apply Discount Code
        </div>
        <div>
        <Input>
        </Input>
        <Button>Apply</Button>
        </div>

      </Form>



      <div>
        <Row>
        <Col span={18}>
        <Row><p>Subtotal</p></Row>
        <Row><p>Tax</p></Row>
        <Row><p>Discount</p></Row>
        <Row><p>Estimated Total</p></Row>
        </Col>
        <Col span={6}>
        <Row><p>${total}</p></Row>
        <Row><p>${total*0.1}</p></Row>
        <Row><p>${-20}</p></Row>
        <Row><p>${1.1*total - 20}</p></Row>
        </Col>
        </Row>

      </div>

      </Drawer>
    )

}
export default CartPage