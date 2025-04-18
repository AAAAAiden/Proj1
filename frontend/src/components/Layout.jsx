import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Input, message, Drawer, Row, Col, Button, Divider, AutoComplete } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import CardCart  from "./pages/Cart/CardInCart";
import { useMediaQuery } from "react-responsive";

const Layout = () => {
  const { username, token, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const totalPrice = useSelector((state) => state.cart.total);
  const [discount, setDiscount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });




  if (loading) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    messageApi.success("Successfully signed out!");
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  };

  const handleSearch = async (value) => {
    setSearchText(value);
    if (!value) {
      setSearchResults([]);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5001/api/products/search?q=${encodeURIComponent(value)}`);
      console.log("API response status:", response.status);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      console.log("Search results:", data);

      const options = data.map((product) => ({
        value: product.name,
        label: `${product.name} - $${product.price}`,
        productId: product._id
      }));
  
      setSearchResults(options);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };
  
  const handleSelect = (value, option) => {
    const productId = option.productId;
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };
  

  return (
    <>
      {contextHolder}
      <div className="layout-container">
        <header className="app-header">
          <div className="header-left">
            <div className="chuwa-title">Management <span>Chuwa</span></div>
            <div className="user-auth">
              {username && username !== "null" ? (
                <span style={{ color: "#fff", cursor: "pointer" }} onClick={handleSignOut}>
                  <UserOutlined style={{ marginRight: 4 }} />
                  {username} | Sign Out
                </span>
              ) : (
                <Link to="/signin" style={{ color: "#fff" }}>
                  <UserOutlined style={{ marginRight: 4 }} />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="seach-bar">
            <AutoComplete
                className="search-input"
                options={searchResults}
                onSearch={handleSearch}
                onSelect={handleSelect}
                disabled={!token}
                style={{ width: 300 }}
                allowClear
                >
                <Input prefix={<SearchOutlined />} />
            </AutoComplete>
          </div>

          <div className="header-right">
            <div className="shopping-cart">
            <span onClick={openDrawer} style={{ cursor: 'pointer' }}>
              <ShoppingCartOutlined className="icon-left" />
              </span>
              ${totalPrice.toFixed(2)}
            </div>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>

        <footer className="app-footer">
          <div className="footer-left">©2025 All Rights Reserved.</div>
          <div className="footer-center">
            <YoutubeOutlined />
            <TwitterOutlined />
            <FacebookOutlined />
          </div>
          <div className="footer-right">
            <a href="#">Contact us</a>
            <a href="#">Privacy Policies</a>
            <a href="#">Help</a>
          </div>
        </footer>

     <Drawer
        title={`Cart (${cartItems.length})`}
        open={drawerOpen}
        onClose={closeDrawer}
        width={isMobile ? "100%" : 400}
      >
        {console.log(cartItems)}
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => {
            console.log(item)
          return(  <CardCart key={item._id} product_in={item} />)
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
        <p style={{marginTop: "20px"}}>Apply Discount Code</p>
        <Row align="middle" gutter={8} style={{ marginTop: "10px" }}>
          <Col flex='auto'>
            <Input placeholder="20 DOLAR OFF" />
          </Col>
          <Col>
            <Button type="primary" style={{minWidth: 40}} onClick={() => {
              setDiscount(20)
            }}>
              Apply
            </Button>
          </Col>
          <Col span={6}>
            <Button danger style={{ minWidth: 20 }} onClick={() => setDiscount(0)}>
              Remove
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <Row className="total-line">Subtotal</Row>
            <Row className="total-line">Tax</Row>
            <Row className="total-line">Discount</Row>
            <Row className="total-line">Estimated total</Row>
          </Col>
          <Col span={12}>
            <Row> <div className="total-line right-align">${totalPrice.toFixed(2)}</div></Row>
            <Row><div className="total-line right-align">${(totalPrice * 0.1).toFixed(2)}</div></Row>
            <Row><div className="total-line right-align">${discount.toFixed(2)}</div></Row>
            <Row><div className="total-line right-align">${Math.max((totalPrice * 1.1 - discount),0).toFixed(2)}</div></Row>
          </Col>
        </Row>
        <Row>
          <Button
          type="primary"
          style={{width: '100%', marginTop: "10px"}}
          >Continue to checkout</Button>
        </Row>
      </Drawer>
   </div>
    </>
  );

};

export default Layout;
