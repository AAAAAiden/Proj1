import React, { useEffect, useState } from "react";
import { Typography, Flex, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';

const { Title } = Typography;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("oldest");
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5001/api/products", {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "cheapest") return a.price - b.price;
    if (sortOrder === "valuable") return b.price - a.price;
    return 0;
  });

  const handleSortChange = (e) => {
    setSortOrder(e.key);
  };

  const sortOptions = [
    { key: "newest", label: "Date: new to old" },
    { key: "oldest", label: "Date: old to new" },
    { key: "cheapest", label: "Price: low to high" },
    { key: "valuable", label: "Price: high to low" },
  ];

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          Our Products
        </Title>

        <Flex gap="small">
          <Dropdown menu={{ items: sortOptions, onClick: handleSortChange }} placement="bottomRight">
            <Button>
              {sortOptions.find((opt) => opt.key === sortOrder)?.label} <DownOutlined />
            </Button>
          </Dropdown>

          {role === "admin" && (
            <Button type="primary" onClick={() => navigate("/productupload")}>
              Upload New Product
            </Button>
          )}
          <Button danger onClick={handleClearCart}>
            Delete Cart
          </Button>
        </Flex>
      </Flex>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
        <Flex wrap gap="large" justify="flex-start">
          {sortedProducts.map((product) => (
            <div key={product.id || product._id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default Products;
