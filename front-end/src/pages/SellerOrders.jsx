import React, { useEffect, useContext } from 'react';
import CardOrder from '../component/CardOrder';
import CustomerContext from '../context/CustomerContext';
import { requestGet, setToken } from '../service/request';
import Bar from '../component/Bar';

const SellerOrder = () => {
  const { orders, setOrders } = useContext(CustomerContext);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')).token);
    const getOrders = async () => {
      const allOrders = await requestGet('/sales');
      setOrders(allOrders);
    };

    getOrders();
  }, [setOrders]);

  return (
    <div className="order">
      <Bar roles />
      <h2>Meus pedidos</h2>
      <div className="orderContainer">
        {
          orders?.map(({ id, status, saleDate, totalPrice }, i) => (
            <CardOrder
              order={ id }
              status={ status }
              key={ i }
              date={ saleDate }
              price={ totalPrice }
              roles="seller"
            />
          ))
        }
      </div>
    </div>
  );
};

export default SellerOrder;
