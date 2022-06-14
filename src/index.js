import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import CustomerProvider from './provider/CustomerProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

