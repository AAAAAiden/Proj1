import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import UpdatePassword from './components/Auth/UpdatePass';
import Layout from './components/Layout';
import Products from './components/pages/Products';
import RecoverySent from "./components/Auth/RecoverySent";
import UploadPro from "./components/pages/uploadPro";
import ProductCard from "./components/pages/ProductCard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/updatepassword' element={<UpdatePassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/recovery-sent" element={<RecoverySent />} />
          <Route path="/productupload" element={<UploadPro />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

//test productcard
// function App() {
//   const sampleProduct = {
//     name: 'Sample Product',
//     price: 99.99,
//     image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//     description: 'A wonderful product for testing'
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
//       <ProductCard product={sampleProduct} />
//     </div>
//   );
// }
export default App;
