import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { useGetUserStats } from '../../services/users/stats';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card/Card.tsx';
import { Container, ContentItems, Eyebrow, Hero, Subtitle, Title } from './styles';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function Home() {
  const { user } = useAuth();
  const { data } = useGetUserStats(!!user?.id);

  return (
    <ContainerPage>
      <Container>
        <Hero>
          <Eyebrow>Painel</Eyebrow>
          <Title>{getGreeting()}, {user?.name}</Title>
          <Subtitle>Aqui está um resumo rápido da sua biblioteca de jogos.</Subtitle>
        </Hero>

        <ContentItems>
          <Card
            title="Jogos"
            dinamicNumber={data?.games ?? 0}
            buttonRedirect="/games?create=true"
            iconImage="game-controller-outline 1.svg"
            altImage="game-controller-outline 1"
          />
          <Card
            title="Categorias"
            dinamicNumber={data?.categories ?? 0}
            buttonRedirect="/categories?create=true"
            iconImage="categories-outline.svg"
            altImage="categories-outline 1"
          />
          <Card
            title="Plataformas"
            dinamicNumber={data?.plataforms ?? 0}
            buttonRedirect="/plataforms?create=true"
            iconImage="plataforms-outline.svg"
            altImage="plataforms-outline 1"
          />
          <Card
            title="Favoritos"
            dinamicNumber={data?.favorites ?? 0}
            buttonRedirect="/favorites"
            iconImage="star-outline.svg"
            altImage="star-outline 1"
            isButton={false}
          />
        </ContentItems>
      </Container>
    </ContainerPage>
  );
}
