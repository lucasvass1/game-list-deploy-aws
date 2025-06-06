import styled from 'styled-components';
import { COLORS } from '../../config/colors/index.ts';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #18181be3;
  border: 0.225rem solid ${COLORS.buttonPrimary};
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0px !important;
    border: none !important;
    margin: 0;
    padding: 10px;
    max-height: 100%;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  img {
    width: 150px;
    height: 68px;
  }

  .textTitle {
    color: white;
    font-size: 2rem;
  }

  .textP {
    font-size: 1rem;
    color: #bcbcbc;
  }

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .errorMessage {
    color: ${COLORS.red};
  }
`;

export const TextLogin = styled.h2`
  font-size: 1rem;
  color: ${COLORS.gray};
`;

export const TextLink = styled.a`
  font-size: 1rem;
  color: ${COLORS.buttonPrimary};
`;
