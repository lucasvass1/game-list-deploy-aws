import styled from 'styled-components';
import { COLORS } from '../../config/colors';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin 0.3s ease;
  padding: 10px;
  max-width: 1400px;
  margin: 10px auto;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  color: ${COLORS?.white};
  font-weight: bold;
  line-height: 5px;
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${COLORS?.ligthGray};
  font-weight: 200;
  margin: 0;
`;

export const ContentItems = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;
