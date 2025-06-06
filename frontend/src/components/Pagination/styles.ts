import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  margin: 20px auto;
  width: 100%;
  justify-content: center;
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? '#666' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  padding: 4px 8px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    color: ${({ disabled }) => (disabled ? '#666' : '#ccc')};
  }
`;

export const PageButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#333' : 'transparent')};
  border: none;
  border-radius: 6px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#ccc')};
  cursor: pointer;
  padding: 6px 10px;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#444' : '#222')};
    color: #fff;
  }
`;

export const Dots = styled.span`
  color: #999;
  padding: 4px 6px;
  font-size: 14px;
  user-select: none;
`;
