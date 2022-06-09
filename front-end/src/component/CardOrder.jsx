import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const prefix = 'customer_orders__element-';
const CardOrder = ({ order, status, date, price }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="cardOrder grey"
      onClick={ () => navigate(`/customer/orders/${order}`) }
    >
      <div>
        <span>Pedido</span>
        <span data-testid={ `${prefix}order-id-${order}` }>{order}</span>
      </div>
      <div className={ `${status} status` }>
        <h2 data-testid={ `${prefix}delivery-status-${order}` }>{status}</h2>
      </div>
      <div>
        <span data-testid={ `${prefix}order-date-${order}` }>
          {moment(date).format('DD/MM/YYYY')}
        </span>
        <span data-testid={ `${prefix}card-price-${order}` }>
          {price.replace('.', ',')}
        </span>
      </div>
    </button>
  );
};

CardOrder.propTypes = {
  order: PropTypes.any,
  status: PropTypes.any,
}.isRequired;

export default CardOrder;
