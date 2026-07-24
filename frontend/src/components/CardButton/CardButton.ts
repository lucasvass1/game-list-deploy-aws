import styled from 'styled-components';
import { COLORS } from '../../config/colors';

export const CardButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(66, 217, 200, 0.12);
  border: 1px solid rgba(66, 217, 200, 0.35);
  border-radius: 999px;
  padding: 6px 14px 6px 10px;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: rgba(66, 217, 200, 0.22);
    border-color: rgba(66, 217, 200, 0.6);
  }

  p {
    color: ${COLORS.buttonPrimary};
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    margin: 0;
  }
`;

export const PlusIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${COLORS.buttonPrimary};
  color: #10201d;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;
