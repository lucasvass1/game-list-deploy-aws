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

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    max-height: none;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const LogoImg = styled.img`
  width: 120px;
  height: auto;

  @media (max-width: 480px) {
    width: 100px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 193px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    width: auto;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
`;

export const NavItemStyled = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 41px;
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

  @media (max-width: 768px) {
    padding: 6px 10px;
    width: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  span {
    margin-left: 10px;
  }
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 41px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
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
  font-weight: 500;
  line-height: 100%;

  img {
    width: 17px;
    height: 17px;
    margin-left: 20px;
    margin-right: 8px;
  }

  &:hover {
    color: #5c5858;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;

    img {
      width: 18px;
      height: 18px;
      margin-left: 8px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;
