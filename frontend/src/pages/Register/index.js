import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';

import { Container, Content } from './styles';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const text = 'Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.';

  const formRef = useRef(null);

  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O e-mail é obrigatório'),
        whatsapp: Yup.string().required('O whatsapp é obrigatório'),
        city: Yup.string().required('O nome é obrigatório'),
        uf: Yup.string().required('O nome é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('ongs', data);

      localStorage.setItem('ongId', response.data.id);

      console.log(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      } else {
        formRef.current.setErrors({ error: 'Erro no cadastro, tente novamente.' });
      }
    }
  };

  return (
    <Container>
      <Content>
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>{text}</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size="16" color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Nome da ONG"
          />
          <Input
            name="email"
            placeholder="E-mail"
          />
          <Input
            placeholder="WhatsApp"
            name="whatsapp"
          />

          <div className="input-group">
            <Input
              placeholder="Cidade"
              name="city"
            />
            <Input
              placeholder="UF"
              name="uf"
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </Form>
      </Content>
    </Container>
  );
}
