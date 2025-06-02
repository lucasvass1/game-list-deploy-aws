import styled, { css } from 'styled-components';

export const Aside = styled.aside`
  width: 270px;
  max-height: 100vh;
  background-color: #18181b;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const LogoImg = styled.img`
  width: 120px;
  height: auto;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 193px;
  width: 100%;
`;

export const NavItemStyled = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: background 0.2s ease;

  ${({ $active }) =>
    $active &&
    css`
      background-color: #42d9c8;
      color: black;

      img {
        filter: brightness(0);
      }
    `}

  &:hover {
    background-color: #2a2a2a;
  }
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 8px;
  }

  &:hover {
    color: #5c5858;
  }
`;
