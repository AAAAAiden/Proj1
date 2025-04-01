import React, { useEffect, useState } from "react";
import { Typography, Flex, Button, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");
    const [sortOrder, setSortOrder] = useState("oldest");
  
    useEffect(() => {
      fetch("http://localhost:5001/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }, []);
    
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortOrder === "cheapest") return a.price - b.price;
        if (sortOrder === "valuable") return b.price - a.price;
        return 0; // recent - no change
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

    return (
        <div style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
            <Title level={2} style={{ margin: 0 }}>
            Our Products
            </Title>

            <Flex gap="small">
            <Dropdown
                menu={{ items: sortOptions, onClick: handleSortChange }}
                placement="bottomRight"
            >
                <Button>
                {sortOptions.find(opt => opt.key === sortOrder)?.label} <DownOutlined />
                </Button>
            </Dropdown>

            {role === "admin" && (
                <Button
                type="primary"
                onClick={() => navigate("/productupload")}
                >
                Add Product
                </Button>
            )}
            </Flex>
        </Flex>

        <div style={{flex:1, overflowY:"auto", paddingRight: 4 }}>
            <Flex wrap gap="large" justify="flex-start">
                {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
                ))}
            </Flex>
        </div>
        </div>
    );
};

// const products = [
//   {
//     id: 1,
//     name: 'Product 1',
//     price: '10.00',
//     image: 'https://via.placeholder.com/300',
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     price: '20.00',
//     image: 'https://via.placeholder.com/300',
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     price: '30.00',
//     image: 'https://via.placeholder.com/300',
//   },
//   // Add more products as needed
// ];


// const Products = () => {
//   return (
//     <Flex wrap gap="small" style={{ justifyContent: 'center', padding: '20px' }}>
//       {products.map(product => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </Flex>
//   );
// };



export default Products;