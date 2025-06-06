import styled from 'styled-components';
import { COLORS } from '../../config/colors';

export const AddNewCategoryButton = styled.button`
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
`;