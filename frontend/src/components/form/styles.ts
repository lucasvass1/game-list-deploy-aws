import styled from 'styled-components';
import { COLORS } from '../../config/colors/index.ts';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  width: 100%;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${COLORS.background};
  border: 0.225rem solid ${COLORS.buttonPrimary};
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 80%;
    gap: 1.5rem;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .img {
    width: 150px;
    height: 68px;
  }

  .textTitle {
    color: white;
    font-size: 2rem;
    text-align: center;
  }

  .textP {
    font-size: 1rem;
    color: #bcbcbc;
    text-align: center;
  }

  @media (max-width: 480px) {
    gap: 0rem;
    .img {
      width: 120px;
      height: auto;
    }

    .textTitle {
      font-size: 1.5rem;
    }

    .textP {
      font-size: 0.9rem;
    }
  }
`;
export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const TextLogin = styled.h2`
  font-size: 1rem;
  color: #6c6c6c;
`;

export const TextLink = styled.a`
  font-size: 1rem;
  color: ${COLORS.buttonPrimary};
`;
