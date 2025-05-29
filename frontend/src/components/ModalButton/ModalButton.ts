import styled from "styled-components";
import { modalButtonColor, modalButtonHoverColor } from "../../styles/globals.ts";

export const ModalButton = styled.button`
  width: 138px;
  height: 33px;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: ${modalButtonColor};
  cursor: pointer;
  font-size: 13px;
  color: white;
  transition: all 0.2s;
  border: none;

  &:hover {
    background-color: ${modalButtonHoverColor};
  }
`;
