import { useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  Title,
  Subtitle,
  Flex,
  Row,
  TitleFilter,
  Button,
  Input,
  Select,
  Actions,
  SearchButton,
  ClearButton,
} from './styles.ts';

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/dashboard') {
    return (
      <HeaderContainer>
        <Title>Hello, {userName}!</Title>
        <Subtitle>Choose one of options below.</Subtitle>
      </HeaderContainer>
    );
  }
  if (path === '/') {
    return (
      <HeaderContainer>
        <Title>Hello, {userName}!</Title>
        <Subtitle>Choose one of options below.</Subtitle>
      </HeaderContainer>
    );
  }

  if (path === '/games') {
    return (
      <HeaderContainer>
        <Flex>
          <Title>Games</Title>
          <Button>NEW GAME</Button>
        </Flex>

        <Row>
          <TitleFilter>Filters</TitleFilter>
          <Input placeholder="Search Game" />
          <Select>
            <option>Select Category</option>
          </Select>
          <Select>
            <option>Filter Favorite</option>
          </Select>
          <Actions>
            <ClearButton>Clear</ClearButton>
            <SearchButton>Search 🔍</SearchButton>
          </Actions>
        </Row>
      </HeaderContainer>
    );
  }

  if (path === '/categories') {
    return (
      <HeaderContainer>
        <Flex>
          <Title>Categories</Title>
          <Button>NEW CATEGORY</Button>
        </Flex>
      </HeaderContainer>
    );
  }

  if (path === '/plataforms') {
    return (
      <HeaderContainer>
        <Flex>
          <Title>Plataforms</Title>
          <Button>NEW PLATFORM</Button>
        </Flex>
      </HeaderContainer>
    );
  }

  return null;
}
