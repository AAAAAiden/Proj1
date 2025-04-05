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
import EditProduct from "./components/pages/EditPro";
import { Provider } from 'react-redux';
import { store } from './store';
import NotFound from './components/pages/Oops/NotFound';



function App() {
  return (
    <Provider store={store}>
      <Router>
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
            <Route
              path="/products/:productId/edit"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Define a route where productId is a URL parameter */}
//         <Route path="/" element={<HardcodedCardCart />} />
//       </Routes>
//     </Router>
//   );
// }


export default App;
