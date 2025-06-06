import styled from 'styled-components';
import { COLORS } from '../../config/colors/index.ts';

export const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  color: #6c6c6c;
  padding-bottom: 0.65rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const InputStyles = styled.input<{ $hasError?: boolean }>`
  width: 26rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  border: solid 0.0625rem
    ${({ $hasError }) => ($hasError ? '#f44336' : '#e5e5e5')};

  ::placeholder {
    padding-left: 0.75rem;
  }

  :focus {
    outline: none;
    border: solid 2px
      ${({ $hasError }) => ($hasError ? '#f44336' : COLORS.buttonPrimary)};
  }

  @media (max-width: 480px) {
    width: 20rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;
