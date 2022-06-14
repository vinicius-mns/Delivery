import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubCard from '../component/SubCard';
import { requestGet, requestPut, setToken } from '../service/request';
import Bar from '../component/Bar';

const SellerOrderDetails = () => {
  const [order, setOrder] = useState({});
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { id } = useParams();
  const prefix = 'seller_order_details__';

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await requestGet('/products');
      setProductList(allProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')).token);
    const getOrder = async () => {
      const data = await requestGet(`/sales/${id}`);
      setOrder(data);
    };

    getOrder();
  }, [id]);

  useEffect(() => {
    const filterProducts = () => {
      const { SalesProducts } = order;
      const filteredProductsList = SalesProducts && SalesProducts.map((saleDetails) => {
        const data = productList.find((product) => product.id === saleDetails.productId);
        const { quantity } = saleDetails;
        return ({ quantity, ...data });
      });
      setFilteredProducts(filteredProductsList);
    };
    if (order) filterProducts();
  }, [order, productList]);

  const editStatus = async (status) => {
    setToken(JSON.parse(localStorage.getItem('user')).token);
    const endpoint = `/sales/${id}`;
    await requestPut(endpoint, {
      status,
    });
  };

  return (
    <div>
      <Bar roles />
      <div>
        <span
          data-testid={ `${prefix}element-order-details-label-order-id` }
        >
          {`Pedido 000${order && order.id}`}
        </span>
        <span
          data-testid={ `${prefix}element-order-details-label-order-date` }
        >
          { moment(order && order.saleDate).format('DD/MM/YYYY') }
        </span>
        <span
          data-testid={ `${prefix}element-order-details-label-delivery-status` }
        >
          { order && order.status }
        </span>
        <button
          onClick={ () => editStatus('Preparando') }
          disabled={ order.status !== 'Pendente' }
          type="button"
          data-testid={ `${prefix}button-preparing-check` }
        >
          PREPARAR PEDIDO
        </button>
        <button
          onClick={ () => editStatus('Em Trânsito') }
          type="button"
          disabled={ order.status !== 'Preparando' }
          data-testid={ `${prefix}button-dispatch-check` }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <div>
        <div className="containerSubCard">
          <div className="subCard">
            <span className="a">Item</span>
            <span className="b">Descrição</span>
            <span className="c">Quantidade</span>
            <span className="d">Valor Unitario</span>
            <span className="e">Sub-Total</span>
          </div>
        </div>
        {
          filteredProducts
            && filteredProducts.map(({ id: productId, name, price, quantity }, index) => (
              <SubCard
                key={ productId }
                id={ index }
                name={ name }
                quantity={ quantity }
                valueU={ price.toString().replace('.', ',') }
                sub={ (price * quantity).toFixed(2).replace('.', ',') }
                pr="order_details"
              />
            ))
        }
        <div className="totalPrice">
          <span>{'Total R$: '}</span>
          <span data-testid={ `${prefix}element-order-total-price` }>
            { order && typeof order.totalPrice === 'string'
              && order.totalPrice.replace('.', ',') }
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetails;
