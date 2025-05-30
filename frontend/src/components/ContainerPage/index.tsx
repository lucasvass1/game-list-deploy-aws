import React, { useState } from 'react';
import { Container, Content, Sidebar, Header, Main } from './styles';
import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDropright } from 'react-icons/io';

interface ContainerPageProps {
  children: React.ReactNode;
}

const ContainerPage = ({ children }: ContainerPageProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      {isSidebarOpen && (
        <Sidebar>
          <p>Menu Item 1</p>
          <p>Menu Item 2</p>
          <p>Menu Item 3</p>
        </Sidebar>
      )}

      <Content isSidebarOpen={isSidebarOpen}>
        <Header>
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <IoIosArrowDropleft size={30} />
            ) : (
              <IoIosArrowDropright size={30} />
            )}
          </button>
        </Header>

        <Main>{children}</Main>
      </Content>
    </Container>
  );
};

export default ContainerPage;
