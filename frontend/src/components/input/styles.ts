import styled from "styled-components";
import { COLORS } from "../../config/colors";

export const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  color: #6c6c6c;
  padding-bottom: 0.65rem;
`;

export const InputStyles = styled.input`
  width: 26rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  border: solid 0.0625rem #e5e5e5;

  ::placeholder {
    padding-left: 0.75rem;
  }
  :focus {
    outline: none;
    border: solid 2px ${COLORS.buttonPrimary};
  }
`;
