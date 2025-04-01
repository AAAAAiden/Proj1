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

const Layout = () => {
  const { username, token, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Prevent user from being null before session loads
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
            Management <span>Chuwa</span>
          </div>
          <Input
            className="search-input"
            placeholder="Search"
            prefix={<SearchOutlined />}
            disabled={!token}
          />
          <div className="header-right">
            {username ? (
              <span
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={handleSignOut}
              >
                <UserOutlined style={{ marginRight: 4 }} />
                {username} | Sign Out
              </span>
            ) : (
              <Link to="/signin" style={{ color: "#fff" }}>
                <UserOutlined style={{ marginRight: 4 }} />
                Sign In
              </Link>
            )}
            <div className="header-icon-link">
              <ShoppingCartOutlined className="icon-left" />
              $0.00
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
