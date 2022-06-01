import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
    </Routes>
  );
}

export default App;
