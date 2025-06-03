import styled from 'styled-components';
import { COLORS } from '../../config/colors';

export const HeaderContainer = styled.header<{ isBorderBottom?: boolean }>`
  background-color: ${COLORS.black};
  padding: 1.5rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: auto;
  border-left: 1px solid ${COLORS.white};
  border-bottom: ${({ isBorderBottom }) =>
    isBorderBottom ? `1px solid ${COLORS.white}` : 'none'};
`;

export const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Subtitle = styled.div`
  color: #aaa;
  font-size: 0.9rem;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export const TitleFilter = styled.label`
  font-size: 1.2rem;
`;

export const Button = styled.button`
  width: 8rem;
  height: 2.25rem;
  border-radius: 0.25rem;
  color: white;
  background-color: #42d9c8;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 26rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  border: solid 1px #e5e5e5;
  &::placeholder {
    padding-left: 0.75rem;
    color: #c4c4c4;
  }
`;

export const Select = styled.select`
  width: 26rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  border: solid 1px #e5e5e5;
  color: #c4c4c4;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchButton = styled.button`
  background-color: #42d9c8;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  color: white;
  font-weight: 500;
`;

export const ClearButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

export const HeaderButton = styled.button`
  background: transparent;
  /* border: 1px solid white; */
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.3s;
  width: 50px;

  &:hover {
    background-color: white;
    color: #202024;
  }
`;
