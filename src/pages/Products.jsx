import React, { useContext, useEffect, useState } from 'react';
import Bar from '../component/Bar';
import Card from '../component/card';
import Loading from '../component/Loading';
import CustomerContext from '../context/CustomerContext';
import logo from '../images/logo.png';
import { requestGet } from '../service/request';
import '../styles/bar.css';

const Products = () => {
  const { cart, setTotalPrice } = useContext(CustomerContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await requestGet('/products');
      setProductList(allProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const result = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    setTotalPrice(result.toFixed(2));
  }, [cart, setTotalPrice]);

  return (
    <div className="products">
      <img src={ logo } alt="logo" className="backgroundImage" />
      <Bar />
      <div className="container2">
        {productList.length === 0 ? <Loading />
          : productList.map(({ urlImage, id, name, price }) => (
            <Card id={ id } name={ name } key={ id } price={ price } img={ urlImage } />
          ))}
      </div>
      <div className="showLogo" />
    </div>
  );
};

export default Products;
