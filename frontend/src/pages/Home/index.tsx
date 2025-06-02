import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { useGetUserStats } from '../../services/users/stats';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card/Card.tsx';
import { Container, ContentItems, Subtitle, Title } from './styles';
import Modal from '../../components/Modal/Modal.tsx';

export function Home() {
  const { user } = useAuth();
  const { data } = useGetUserStats(!!user?.id);

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <ContainerPage>
      <Container>
        <Title>Hello, {user?.name}!</Title>
        <Subtitle>Choose one of options below.</Subtitle>
        <Modal isOpen={isOpen} buttonTitle="CREATE" onClose={() => {setIsOpen(false)}}></Modal>

        <ContentItems>
          <Card
            title="Games"
            dinamicNumber={data?.games ?? 0}
            buttonRedirect="/games"
            iconImage="game-controller-outline 1.svg"
            altImage="game-controller-outline 1"
          />
          <Card
            title="Categories"
            dinamicNumber={data?.categories ?? 0}
            buttonRedirect="/categories"
            iconImage="categories-outline.svg"
            altImage="categories-outline 1"
          />
          <Card
            title="Platforms"
            dinamicNumber={data?.plataforms ?? 0}
            buttonRedirect="/plataform"
            iconImage="plataforms-outline.svg"
            altImage="plataforms-outline 1"
          />
          <Card
            title="Favorites"
            dinamicNumber={data?.favorites ?? 0}
            buttonRedirect="/favorites"
            iconImage="star-outline.svg"
            altImage="star-outline 1"
          />
        </ContentItems>
      </Container>
    </ContainerPage>
  );
}
