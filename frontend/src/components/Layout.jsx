import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Input, message } from "antd";
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

const Layout = () => {
  const { username, token, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const totalPrice = useSelector((state) => state.cart.total);

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

  return (
    <>
      {contextHolder}
      <div className="layout-container">
        <header className="app-header">
          <div className="header-left">
            <div className="chuwa-title">Management <span>Chuwa</span></div>
            <div className="user-auth">
              {username ? (
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
            <Input
              className="search-input"
              placeholder="Search"
              prefix={<SearchOutlined />}
              disabled={!token}
            />
          </div>

          <div className="header-right">
            <div className="shopping-cart">
              <ShoppingCartOutlined className="icon-left" />
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
      </div>
    </>
  );
};

export default Layout;
