import React, { useState } from 'react';
import { Container, Content, Main } from './styles';

import { Sidebar } from '../Sidebar';
import { Header } from '../Header/Header';

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
      {isSidebarOpen && <Sidebar />}

      <Content isSidebarOpen={isSidebarOpen}>
        <Header toggleSideBar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {/* <Header>
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <IoIosArrowDropleft size={30} />
            ) : (
              <IoIosArrowDropright size={30} />
            )}
          </button>
        </Header> */}

        <Main>{children}</Main>
      </Content>
    </Container>
  );
};

export default ContainerPage;
