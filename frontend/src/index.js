import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DatePicker, message } from 'antd';
import { createRoot } from 'react-dom/client';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
