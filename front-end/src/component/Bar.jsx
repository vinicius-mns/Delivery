import '../styles/bar.css';
import '../styles/cart.css';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Cart from '../pages/Cart';
import Order from '../pages/Order';
import CustomerContext from '../context/CustomerContext';
import * as path from '../utils/paths';
import { requestGet, setToken } from '../service/request';
import OrderDetails from '../pages/OrderDetails';

const Bar = ({ roles }) => {
  const {
    setOrders,
    totalPrice,
    modalCart,
    setModalCart,
    modalOrder,
    setModalOrder,
    modalOrderDet,
    setModalOrderDet,
  } = useContext(CustomerContext);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const url = location.pathname;
    if (url === path.checkout) setModalCart(true);
    if (url !== path.checkout) setModalCart(false);
    if (url === path.orderCustomer) setModalOrder(true);
    if (url !== path.orderCustomer) setModalOrder(false);
    if (url === `/customer/orders/${id}`) setModalOrderDet(true);
    if (url !== `/customer/orders/${id}`) setModalOrderDet(false);
  });

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')).token);
    const getOrders = async () => {
      const allOrders = await requestGet('/sales');
      setOrders(allOrders);
    };

    getOrders();
  }, [setOrders]);

  const logout = () => {
    localStorage.clear('user');
    setOrders([]);
    navigate(path.login);
  };

  const toCart = () => navigate(path.checkout);
  const toOrder = () => (roles ? navigate(path.sellerDetails)
    : navigate(path.orderCustomer));
  const close = () => navigate(path.product);

  return (
    <div className="segredo">
      <button type="button" className="name">
        <h2 data-testid="customer_products__element-navbar-user-full-name">
          {user.name}
        </h2>
      </button>
      <div className="bar">
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ toOrder }
        >
          Meus pedidos
        </button>
        <button
          data-testid="customer_products__button-cart"
          type="button"
          className={ `${modalCart} carrinho` }
          onClick={ toCart }
        >
          <span>Ver Carrinho: R$:</span>
          <span data-testid="customer_products__checkout-bottom-value">
            {totalPrice.toString().replace('.', ',')}
          </span>
        </button>
      </div>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        className="sair"
        onClick={ logout }
      >
        Sair
      </button>
      {modalCart && <Cart />}
      {modalOrder && <Order />}
      {modalOrderDet && <OrderDetails />}
      {(modalCart || modalOrder || modalOrderDet) && (
        <button onClick={ close } className="blur" type="button">
          {' '}
        </button>
      )}
    </div>
  );
};

Bar.propTypes = {
  roles: PropTypes.bool,
}.isRequired;

export default Bar;
