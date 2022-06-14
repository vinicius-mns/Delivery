import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../component/Item';
import logo from '../images/logo.png';
import { requestPost } from '../service/request';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const validateRegister = () => {
    const passwordLength = 6;
    const nameLength = 12;

    const N = name.length >= nameLength;

    const P = password.length >= passwordLength;
    const regex = /\S+@\S+\.\S+/;
    const E = regex.test(email);

    return !(P && E && N);
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/register';
      const { token, user } = await requestPost(endpoint, {
        name,
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify({ token, ...user }));
      navigate('/customer/products');
    } catch (err) {
      setInvalid(true);
      console.log(err);
      return err;
    }
  };

  const handleEmail = ({ target: { value } }) => setEmail(value);
  const handlePass = ({ target: { value } }) => setPassword(value);
  const handleName = ({ target: { value } }) => setName(value);
  const err = 'common_register__element-invalid_register';

  return (
    <div className="container">
      <img src={ logo } alt="logo" className="logo" />
      <div className="box">
        <Item
          title="Nome"
          testId="common_register__input-name"
          type="text"
          handleChange={ handleName }
        />
        <Item
          title="Email"
          testId="common_register__input-email"
          type="text"
          handleChange={ handleEmail }
        />
        <Item
          title="Senha"
          testId="common_register__input-password"
          type="password"
          handleChange={ handlePass }
        />
        { invalid && <span data-testid={ err }>Email ou senha incorretos</span> }

        <div className="buttons">
          <button
            type="button"
            disabled={ validateRegister() }
            onClick={ (e) => register(e) }
            data-testid="common_register__button-register"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
