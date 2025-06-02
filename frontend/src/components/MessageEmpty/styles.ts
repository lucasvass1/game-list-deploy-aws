import styled from 'styled-components';
import { COLORS } from '../../config/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 1rem 2rem;
  margin: 0 auto;
  border-radius: 0.25rem;
  background-color: ${COLORS.ligthGray};

  p {
    text-align: center;
    color: ${COLORS.black};
    font-size: 22px;
  }
`;
