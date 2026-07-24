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
  width: 100%;

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const Hero = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 480px) {
    margin-bottom: 24px;
    padding-bottom: 16px;
  }
`;

export const Eyebrow = styled.span`
  display: inline-block;
  color: ${COLORS.buttonPrimary};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 8px;
  background: linear-gradient(90deg, ${COLORS.white} 0%, ${COLORS.buttonPrimary} 140%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${COLORS?.ligthGray};
  font-weight: 400;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const ContentItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;
