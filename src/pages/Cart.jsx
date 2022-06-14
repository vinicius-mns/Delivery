import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubCard from '../component/SubCard';
import CustomerContext from '../context/CustomerContext';
import { requestPost, setToken } from '../service/request';

const Cart = () => {
  const [disabled, setDisable] = useState(true);
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [nothing, setNothing] = useState(true);
  const { totalPrice, cart, setCart } = useContext(CustomerContext);
  const navigation = useNavigate();
  const items = cart.map((x) => ({ ...x, sub: (x.price * x.quantity).toFixed(2) }));

  const removeItem = (id) => {
    const newCart = cart.filter((x) => x.id !== id);

    if (newCart.length === 0) setNothing(true);

    setCart(newCart);
  };

  const finish = () => {
    setToken(JSON.parse(localStorage.getItem('user')).token);

    requestPost('/sales', {
      cart,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
      sellerId: 2,
    }).then((id) => {
      navigation(`/customer/orders/${id}`);
    });
    setCart([]);
  };

  const prefix = 'customer_checkout__';

  useEffect(() => {
    if (items.length > 0) setNothing(false);
  }, [items.length]);

  const a = ({ target: { value } }) => {
    setAddress(value);
    setDisable(!(number.length > 0 && address.length > 0));
  };
  const n = ({ target: { value } }) => {
    setNumber(value);
    setDisable(!(number.length > 0 && address.length > 0));
  };

  return (
    <div className="cart">
      {nothing && <div className="nothing"><h1>Carrinho Vazio</h1></div>}
      <h2>Finalizar pedido</h2>
      <div className="containerSubCard">
        <div className="subCard">
          <span className="a">Item</span>
          <span className="b">Descrição</span>
          <span className="c">Quantidade</span>
          <span className="d">Valor Unitario</span>
          <span className="e">Sub-Total</span>
          <span className="f">Remover Item</span>
        </div>
      </div>
      <div className="containerSubCard schroll">
        {items.map(({ id, name, price, quantity, sub }, index) => (
          <SubCard
            key={ id }
            id={ index }
            name={ name }
            quantity={ quantity }
            valueU={ price.toString().replace('.', ',') }
            sub={ sub.toString().replace('.', ',') }
            remove={ () => removeItem(id) }
            pr="checkout"
          />
        ))}
      </div>
      <span className="details">Detalhes da Entrega</span>
      <div className="finishContainer">
        <div>
          <span>Pessoas responsável</span>
          <select
            data-testid={ `${prefix}select-seller` }
          >
            <option value="Tal da Fulana">Tal da Fulana</option>
            <option value="Tal da Fulana">Esse daqui</option>
            <option value="Tal da Fulana">Outra pessoa</option>
          </select>
        </div>
        <div>
          <span>Endereço</span>
          <input
            onChange={ a }
            value={ address }
            type="text"
            placeholder="Rua Sao paulo, Bairro Rio"
            data-testid={ `${prefix}input-address` }
          />
        </div>
        <div>
          <span>Número</span>
          <input
            onChange={ n }
            value={ number }
            type="number"
            placeholder="123"
            data-testid={ `${prefix}input-addressNumber` }
          />
        </div>
      </div>
      <div className="finshB">
        <div className="totalPrice">
          <span>{'Total R$: '}</span>
          <span data-testid={ `${prefix}element-order-total-price` }>
            { totalPrice.toString().replace('.', ',') }
          </span>
        </div>
        <button
          onClick={ finish }
          disabled={ disabled }
          type="submit"
          data-testid={ `${prefix}button-submit-order` }
        >
          <h2>Finalizar Pedido</h2>
        </button>
      </div>
    </div>
  );
};

export default Cart;
