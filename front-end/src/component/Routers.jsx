import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import * as path from '../utils/paths';

import Login from '../pages/Login';
import Products from '../pages/Products';
import Register from '../pages/Register';
import SellerOrders from '../pages/SellerOrders';
import AdminManager from '../pages/AdminManager';
import SellerOrderDetails from '../pages/SellerOrderDetails';

const Routers = () => (
  <Routes>
    <Route path={ path.login } element={ <Login /> } />
    <Route path={ path.register } element={ <Register /> } />
    <Route path={ path.product } element={ <Products /> } />
    <Route path={ path.checkout } element={ <Products /> } />
    <Route path={ path.orderCustomer } element={ <Products /> } />
    <Route path={ path.orderDetails } element={ <Products /> } />
    <Route path={ path.order } element={ <SellerOrders /> } />
    <Route path={ path.admin } element={ <AdminManager /> } />
    <Route path={ path.sellerDetails } element={ <SellerOrderDetails /> } />
    <Route exact path="/" element={ <Navigate to={ path.login } /> } />
  </Routes>
);

export default Routers;
