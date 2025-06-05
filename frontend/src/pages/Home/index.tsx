import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { useGetUserStats } from '../../services/users/stats';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card/Card.tsx';
import { Container, ContentItems, Subtitle, Title } from './styles';

export function Home() {
  const { user } = useAuth();
  const { data } = useGetUserStats(!!user?.id);
  return (
    <ContainerPage>
      <Container>
        <Title>Hello, {user?.name}!</Title>
        <Subtitle>Choose one of options below.</Subtitle>

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
