import React from "react";
import { Typography, Flex } from "antd";
import ProductCard from "./ProductCard"

const { Title } = Typography;

// const Products = () => {
//   const username = localStorage.getItem("username");
//   console.log(username);
//   return (
//     <div style={{ padding: "40px" }}>
//       <Title level={2}>Welcome, {username || "User"}!</Title>
//       <p>This is your products page.</p>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//           gap: 20,
//           marginTop: 40,
//         }}
//       >
//         {[1, 2, 3, 4, 5, 6].map((n) => (
//           <div
//             key={n}
//             style={{
//               height: 200,
//               background: "#f0f2f5",
//               borderRadius: 8,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             Product #{n}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '10.00',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '20.00',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '30.00',
    image: 'https://via.placeholder.com/300',
  },
  // Add more products as needed
];


const Products = () => {
  return (
    <Flex wrap gap="small" style={{ justifyContent: 'center', padding: '20px' }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Flex>
  );
};



// const Products = () => {
//   const username = sessionStorage.getItem("username");
//   const role = sessionStorage.getItem("role");
//   const navigate = useNavigate();
//   return (
//     <div style={{ padding: "40px" }}>
//       <Title level={2}>Welcome, {username || "User"}!</Title>
//       <p>This is your products page.</p>

//       {role === "admin" && (
//         <Button
//           type="primary"
//           onClick={() => navigate("/productupload")}
//           style={{ marginTop: 16 }}
//         >
//           Create Product
//         </Button>
//       )}
//     </div>
//   );
// };
export default Products;