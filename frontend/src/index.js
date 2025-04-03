import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthProvider>
      <App />
    </AuthProvider> */}
    <App />
  </React.StrictMode>
);

reportWebVitals();
