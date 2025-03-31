import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import UpdatePassword from './components/Auth/UpdatePass';
import Layout from './components/pages/Home/Home';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/updatepassword' element={<UpdatePassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
