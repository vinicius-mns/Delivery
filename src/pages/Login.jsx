import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost } from '../service/request';
import logo from '../images/logo.png';
import '../styles/login.css';
import * as path from '../utils/paths';
import Item from '../component/Item';
import * as func from '../functions/login';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/customer/products');
  }, []);

  const login = async (event) => {
    event.preventDefault();
    try {
      const { token, user } = await requestPost(path.login, { email, password });
      localStorage.setItem('user', JSON.stringify({ token, ...user }));
      if (user.role === 'customer') navigate('/customer/products');
      if (user.role === 'seller') navigate('/seller/orders');
      if (user.role === 'admin') navigate('/admin/manage');
    } catch (err) {
      setInvalid(true);
      return err;
    }
  };

  const handleEmail = ({ target: { value } }) => setEmail(value);
  const handlePass = ({ target: { value } }) => setPassword(value);
  const err = 'common_login__element-invalid-email';
  const msg = 'Email ou senha incorretos';

  return (
    <div className="container">
      <img src={ logo } alt="logo" className="logo" />
      <div className="box">
        <Item
          title="Login"
          testId="common_login__input-email"
          type="text"
          handleChange={ handleEmail }
        />
        <Item
          title="Senha"
          testId="common_login__input-password"
          type="password"
          handleChange={ handlePass }
          keydown={ (e) => e.key === 'Enter' && login(e) }
        />
        { invalid && <span className="err" data-testid={ err }>{ msg }</span> }

        <div className="buttons">
          <button
            type="button"
            disabled={ func.validateLogin(email, password) }
            onClick={ (e) => login(e) }
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            type="submit"
            onClick={ () => navigate('/register') }
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
