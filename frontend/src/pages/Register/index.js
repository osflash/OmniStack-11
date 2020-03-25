import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Content } from './styles';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const text = 'Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.';

  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);

      console.log(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (error) {
      console.error('Erro no cadastro, tente novamente.');
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

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </Content>
    </Container>
  );
}
