import React, { useEffect, useState } from "react";
import { Typography, Flex, Button } from "antd";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");
  
    useEffect(() => {
      fetch("http://localhost:5001/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }, []);
  
    return (
      <div style={{ padding: "20px" }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
          <Title level={2}>Our Products</Title>
          {role === "admin" && (
            <Button
              type="primary"
              onClick={() => navigate("/productupload")}
            >
              Upload Product
            </Button>
          )}
        </Flex>
  
        <Flex wrap gap="small" justify="center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Flex>
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