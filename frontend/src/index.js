import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DatePicker, message } from 'antd';
import { createRoot } from 'react-dom/client';
import Signin from './components/Auth/SignIn';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Signin />
  </React.StrictMode>
);

reportWebVitals();
