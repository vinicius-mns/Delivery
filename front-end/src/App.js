import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';
import AdminManager from './pages/AdminManager';

function App() {
  return (
    <div>

      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
        <Route path="/admin/manage" element={ <AdminManager /> } />
        <Route exact path="/" element={ <Navigate to="/login" /> } />
      </Routes>
      <footer>© Ostron company Todos direitos reservados</footer>
    </div>
  );
}

export default App;
