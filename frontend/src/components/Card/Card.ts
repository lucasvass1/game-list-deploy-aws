import styled, { css } from 'styled-components';
import { COLORS } from '../../config/colors';

interface CardContainerProps {
  isClickable?: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  background: linear-gradient(160deg, #232326 0%, #19191b 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 22px;
  min-height: 173px;
  overflow: hidden;
  outline: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top right,
      rgba(66, 217, 200, 0.14),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  ${(props) =>
    props.isClickable &&
    css`
      cursor: pointer;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;

      &:hover,
      &:focus-visible {
        transform: translateY(-4px);
        border-color: rgba(66, 217, 200, 0.4);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
      }

      &:hover::before,
      &:focus-visible::before {
        opacity: 1;
      }
    `}

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const CardTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const IconBadge = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, ${COLORS.buttonPrimary} 0%, #279183 100%);
  box-shadow: 0 6px 16px rgba(66, 217, 200, 0.22);
`;

export const CardImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const CardBody = styled.div`
  position: relative;
  z-index: 1;
`;

export const CardTitle = styled.h2`
  color: ${COLORS.ligthGray};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin: 0 0 6px;
`;

export const CardNumber = styled.p`
  color: ${COLORS.white};
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
`;
