import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Input } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const Layout = () => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="header-left">
          Management <span>Chuwa</span>
        </div>
        <Input
          className="search-input"
          placeholder="Search"
          prefix={<SearchOutlined />}
        />
        <div className="header-right">
          <Link to="/signin" className="header-icon-link">
            <UserOutlined className="icon-left"/> 
            Sign In
          </Link>
          <div className="header-icon-link">
            <ShoppingCartOutlined className="icon-left"/> 
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
  );
};

export default Layout;