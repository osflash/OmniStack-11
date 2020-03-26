import React from 'react';
import { Image, Linking, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MailComposer from 'react-native-mail';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Header,
  Touch,
  Incident,
  IncidentProperty,
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  Action,
  ActionText,
} from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostarioa de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  const navigateBack = () => {
    navigation.goBack();
  };

  const sendMail = () => {
    MailComposer.mail(
      {
        subject: `Herói do caso: ${incident.title}`,
        recipients: [incident.email],
        body: message,
      },
      () => {},
    );
  };

  const sendWhatsApp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`,
    );
  };

  return (
    <Container>
      <Header>
        <Image source={logoImg} />

        <Touch onPress={navigateBack}>
          <Icon name="arrow-left" size={28} color="#e02041" />
        </Touch>
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 48 }}>
        <Incident>
          <IncidentProperty style={{ marginTop: 0 }}>ONG:</IncidentProperty>
          <IncidentValue>
            {incident.name} de {incident.city}/
            {String(incident.uf).toUpperCase()}
          </IncidentValue>

          <IncidentProperty>CASO:</IncidentProperty>
          <IncidentValue>{incident.title}</IncidentValue>

          <IncidentProperty>VALOR:</IncidentProperty>
          <IncidentValue>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(incident.value)}
          </IncidentValue>
        </Incident>

        <ContactBox>
          <HeroTitle>Salve o dia!</HeroTitle>
          <HeroTitle>Seja o herói desse caso.</HeroTitle>

          <HeroDescription>Entre em contato:</HeroDescription>
          <Actions>
            <Action onPress={sendWhatsApp}>
              <ActionText>WhatsApp</ActionText>
            </Action>

            <Action onPress={sendMail}>
              <ActionText>E-mail</ActionText>
            </Action>
          </Actions>
        </ContactBox>
      </ScrollView>
    </Container>
  );
}
