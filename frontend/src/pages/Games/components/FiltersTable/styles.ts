import styled from 'styled-components';
import { COLORS } from '../../../../config/colors';
import { modalButtonColor } from '../../../../styles/globals';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  padding: 0px 0px 5px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    
  }
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  color: ${COLORS.white};
`;

export const SearchInput = styled.input`
  width: auto;
  min-width: 212px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }
@media (max-width: 768px) {
    width: 100%;
    
  }
`;

export const SelectInput = styled.select`
  width: auto;
  min-width: 212px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: black;
  }

  &::placeholder {
    color: #aaa;
  }
  option {
    padding: 10px;
    color: #333;
  }

  option:checked {
    color: black;
    background-color: ${modalButtonColor};
  }
 @media (max-width: 768px) {
    width: 100%;
  }
     @media (max-width: 488px) {
    width: 100%;
  }
`;
export const CategoryFavoriteWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;

  label {
    color: ${COLORS.white};
    font-size: 12px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    margin-left: 0;
  }
`;


export const CheckFavorite = styled.input`
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background-color: ${modalButtonColor};
  }

    `;
    
export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  label {
    color: ${COLORS.white};
    font-size: 12px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
  }
 @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    aliegn-items: center;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
 @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const SearchButton = styled.button`
  background-color: ${COLORS.buttonPrimary};
  border: none;
  min-width: 90px;
  padding: 5px 10px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const AddNewGameButton = styled.button`
  background-color: ${COLORS.buttonPrimary};
  border: none;
  min-width: 90px;
  padding: 5px 10px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: -20px 0 10px;

   @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin: 20px 0 10px;
  }
`;

export const ClearButton = styled.button`
  background-color: ${COLORS.ligthGray};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  height: 30px;
  min-width: 75px;
`;
