import styled from "styled-components";
import { COLORS } from "../../config/colors/index.ts";

export const StyleButton = styled.button`
  box-sizing: border-box;
  width: 26rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  font-size: 1.1rem;
  color: white;
  background-color: ${COLORS.buttonPrimary};
  border: none;
  cursor: pointer;

  
  @media (max-width: 480px) {
    width: 20rem;
  }
`;
