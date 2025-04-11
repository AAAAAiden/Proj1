import React, { useEffect, useState } from "react";
import { Typography, Flex, Button, Dropdown, message } from "antd";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { getAllProducts } from "./productApi";

const { Title } = Typography;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("oldest");
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const sortOptions = [
    { key: "newest", label: "Date: new to old" },
    { key: "oldest", label: "Date: old to new" },
    { key: "cheapest", label: "Price: low to high" },
    { key: "valuable", label: "Price: high to low" },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "cheapest") return a.price - b.price;
    if (sortOrder === "valuable") return b.price - a.price;
    return 0;
  });

  const handleSortChange = (option) => {
    setSortOrder(option.key);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    messageApi.success("Cart cleared!");
    setDeleteDisabled(true);

    setTimeout(() => {
        setDeleteDisabled(false);
    }, 3000);
  };

  return (
    <>
    {contextHolder}
    <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={2}>
          Our Products
        </Title>

        <Flex gap="small">
          <Dropdown menu={{ items: sortOptions, onClick: handleSortChange }} placement="bottomLeft">
            <Button>
              {sortOptions.find((opt) => opt.key === sortOrder)?.label}
            </Button>
          </Dropdown>

          {role === "admin" && (
            <Button type="primary" onClick={() => navigate("/productupload")}>
              Upload New Product
            </Button>
          )}
          <Button danger onClick={handleClearCart} disabled={deleteDisabled}>
            Delete Cart
          </Button>
        </Flex>
      </Flex>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
        <Flex wrap gap="large" justify="flex-start">
          {sortedProducts.map((product) => (
            <div key={product._id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </Flex>
      </div>
    </div>
    </>
  );
};

export default Products;
