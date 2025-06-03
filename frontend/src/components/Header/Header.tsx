import { useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  Title,
  Flex,
  Row,
  Button,
  HeaderButton,
} from './styles.ts';
import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDropright } from 'react-icons/io';

interface HeaderProps {
  toggleSideBar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSideBar, isSidebarOpen }: HeaderProps) {
  const location = useLocation();
  const path = location.pathname;

  const handleSideBar = () => (
    <HeaderButton onClick={toggleSideBar}>
      {isSidebarOpen ? (
        <IoIosArrowDropleft size={30} />
      ) : (
        <IoIosArrowDropright size={30} />
      )}
    </HeaderButton>
  );

  if (path === '/' || path === '/dashboard') {
    return (
      <HeaderContainer isBorderBottom={false}>
        {handleSideBar()}
      </HeaderContainer>
    );
  }

  if (path === '/games') {
    return (
      <HeaderContainer isBorderBottom={false}>
        <Flex>
          <Row>
            {handleSideBar()}
            <Title>Games</Title>
          </Row>
          <Button>NEW GAME</Button>
        </Flex>

        {/* <Row>
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
        </Row> */}
      </HeaderContainer>
    );
  }

  if (path === '/categories') {
    return (
      <HeaderContainer isBorderBottom>
        {handleSideBar()}
        <Flex>
          <Title>Categories</Title>
          <Button>NEW CATEGORY</Button>
        </Flex>
      </HeaderContainer>
    );
  }

  if (path === '/plataforms') {
    return (
      <HeaderContainer isBorderBottom>
        {handleSideBar()}
        <Flex>
          <Title>Plataforms</Title>
          <Button>NEW PLATFORM</Button>
        </Flex>
      </HeaderContainer>
    );
  }

  return null;
}
