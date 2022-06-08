import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubCard from '../component/SubCard';
import { requestGet, setToken } from '../service/request';

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { id } = useParams();
  const prefix = 'customer_order_details__';

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

  return (
    <div>
      <div>
        <span
          data-testid={ `${prefix}element-order-details-label-order-id` }
        >
          {`Pedido 000${order.id}`}
        </span>
        <span
          data-testid={ `${prefix}element-order-details-label-seller-name` }
        >
          P. Vend: Fulana Pereira
        </span>
        <span
          data-testid={ `${prefix}element-order-details-label-order-date` }
        >
          { moment(order.saleDate).format('DD/MM/YYYY') }
        </span>
        <span
          data-testid={ `${prefix}element-order-details-label-delivery-status` }
        >
          { order.status }
        </span>
        <button
          type="button"
          data-testid={ `${prefix}button-delivery-check` }
        >
          MARCAR COMO ENTREGUE
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
            { typeof order.totalPrice === 'string' && order.totalPrice.replace('.', ',') }
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;