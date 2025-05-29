import styled from "styled-components";
import {
  modalButtonColor,
  modalButtonHoverColor,
} from "../../styles/globals.ts";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #ffff;
  border-radius: 8px;
  max-width: 750px;
  /*TODO: ajustar o tamanho do modal*/
  height: 750px;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;
export const Title = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: 700;
  margin: 2.5rem 0 1.25rem 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  width: 100%;
  margin: 0 1.6rem 1rem 0;
`;

export const ModalButton1 = styled.button`
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

export const ModalButton2 = styled.button`
  width: 138px;
  height: 33px;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: ${modalButtonColor};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;

  &:hover {
    background-color: ${modalButtonHoverColor};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 7px;
`;

export const TitleInput = styled.input`
  width: 670px;
  padding: 12px;
  color: #c4c4c4;
  border: 1px solid #747474;
  border-radius: 8px;
  font-size: 16px;
`;
export const TitleLabel = styled.label`
  font-size: 14px;
  margin-left: 8px;
  & span {
    color: red;
  }
`;
