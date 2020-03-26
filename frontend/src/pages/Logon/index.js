import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import * as Yup from 'yup';

import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';

import { Container } from './styles';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const initialData = localStorage.getItem('ongId');

  const formRef = useRef(null);

  const history = useHistory();

  const handleSubmit = async (data, { reset }) => {
    try {
      const { id } = data;

      const schema = Yup.object().shape({
        id: Yup.string().required('O id é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('sessions', data);

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      formRef.current.setErrors({});

      reset();

      history.push('/profile');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      } else {
        formRef.current.setErrors({ id: 'O id não foi encontrado' });
      }
    }
  };

  return (
    <Container>
      <section>
        <img src={logoImg} alt="Be The Hero" />

        <Form ref={formRef} initialData={{ id: initialData } || {}} onSubmit={handleSubmit}>
          <h1> Faça seu Logon</h1>

          <Input
            name="id"
            placeholder="Sua ID"
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size="16" color="#E02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}
