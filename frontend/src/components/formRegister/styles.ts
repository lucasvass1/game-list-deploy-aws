import styled from "styled-components";
import { COLORS } from "../../config/colors";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  height: auto;
  background-color: #18181be3;
  border: 0.225rem solid #42d9c8;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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
