import styled from 'styled-components';
import { COLORS } from '../../config/colors';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 300px;
  background-color: ${COLORS.background};
  color: white;
  padding: 20px;
  height: 100vh;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 10px;
    order: 2;
  }
`;

export const Content = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin 0.3s ease;
  height: 100vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Header = styled.header`
  height: 60px;
  background-color: ${COLORS.black};
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 1px solid ${COLORS.white};

  button {
    background: transparent;
    border: none;
    color: white;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
      background-color: white;
      color: #202024;
    }
  }

  @media (max-width: 768px) {
    height: 50px;
    padding: 0 12px;
    font-size: 0.9rem;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: ${COLORS.black};
  overflow-y: auto;
  border-left: 1px solid ${COLORS.white};

  @media (max-width: 768px) {
    padding: 12px;
  }
`;