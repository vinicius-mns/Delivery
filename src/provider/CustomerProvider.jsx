import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomerContext from '../context/CustomerContext';

function CustomerProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [modalCart, setModalCart] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [modalOrderDet, setModalOrderDet] = useState(false);
  const [orders, setOrders] = useState([]);

  const context = {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    modalCart,
    setModalCart,
    modalOrder,
    setModalOrder,
    orders,
    setOrders,
    modalOrderDet,
    setModalOrderDet,
  };

  return (
    <CustomerContext.Provider value={ context }>
      { children }
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerProvider;
