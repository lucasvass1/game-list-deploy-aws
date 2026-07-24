import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { useGetUserStats } from '../../services/users/stats';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card/Card.tsx';
import { Container, ContentItems, Eyebrow, Hero, Subtitle, Title } from './styles';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function Home() {
  const { user } = useAuth();
  const { data } = useGetUserStats(!!user?.id);

  return (
    <ContainerPage>
      <Container>
        <Hero>
          <Eyebrow>Dashboard</Eyebrow>
          <Title>{getGreeting()}, {user?.name}</Title>
          <Subtitle>Here&apos;s a quick overview of your game library.</Subtitle>
        </Hero>

        <ContentItems>
          <Card
            title="Games"
            dinamicNumber={data?.games ?? 0}
            buttonRedirect="/games?create=true"
            iconImage="game-controller-outline 1.svg"
            altImage="game-controller-outline 1"
          />
          <Card
            title="Categories"
            dinamicNumber={data?.categories ?? 0}
            buttonRedirect="/categories?create=true"
            iconImage="categories-outline.svg"
            altImage="categories-outline 1"
          />
          <Card
            title="Platforms"
            dinamicNumber={data?.plataforms ?? 0}
            buttonRedirect="/plataforms?create=true"
            iconImage="plataforms-outline.svg"
            altImage="plataforms-outline 1"
          />
          <Card
            title="Favorites"
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
