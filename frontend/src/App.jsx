import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import UpdatePassword from './components/Auth/UpdatePass';
import Layout from './components/Layout';
import Products from './components/pages/Products';
import RecoverySent from "./components/Auth/RecoverySent";
import UploadPro from "./components/pages/uploadPro";
import DetailPage from "./components/pages/DetailPage"
import {AdminRoute, PrivateRoute} from "./components/Auth/AdminRoute";
import ProductCard from "./components/pages/ProductCard";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/signin" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path='/updatepassword' element={<UpdatePassword />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <PrivateRoute>
                  <DetailPage />
                </PrivateRoute>
              }
            />
            <Route path="/recovery-sent" element={<RecoverySent />} />          
            <Route
              path="/productupload"
              element={
                <AdminRoute>
                  <UploadPro />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}


export default App;
