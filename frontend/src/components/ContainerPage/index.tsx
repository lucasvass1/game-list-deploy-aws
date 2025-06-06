import React, { useEffect, useState } from 'react';
import { Container, Content, Main } from './styles';

import { Sidebar } from '../Sidebar';
import { Header } from '../Header/Header';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface ContainerPageProps {
  children: React.ReactNode;
}

const ContainerPage = ({ children }: ContainerPageProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 770px)');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <Container>
      {isSidebarOpen && <Sidebar />}

      <Content isSidebarOpen={isSidebarOpen}>
        <Header toggleSideBar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Main>{children}</Main>
      </Content>
    </Container>
  );
};

export default ContainerPage;
