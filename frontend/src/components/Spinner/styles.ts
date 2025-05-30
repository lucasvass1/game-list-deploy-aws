import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const SpinnerLoader = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4caf50;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 1s linear infinite;
`;
