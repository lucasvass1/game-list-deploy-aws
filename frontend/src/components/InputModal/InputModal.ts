import styled from "styled-components";

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
  max-height: 750px;
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
  margin: 0.5rem 0 30px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  width: 100%;
  margin: 0 1.6rem 1rem 0;
`;
export const TitleLabel = styled.label`
  font-size: 14px;
  margin-top: 32px;
  margin-left: 8px;
  span {
    color: red;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 7px;
  &:first-of-type ${TitleLabel} {
    margin-top: 0;
  }
`;

export const TitleInput = styled.input`
  width: 670px;
  padding: 12px;
  color: #c4c4c4;
  border: 1px solid #747474;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    color: black;
  }
`;

export const DescriptionTextarea = styled.textarea`
  width: 670px;
  resize: none;
  padding: 12px;
  color: #c4c4c4;
  border: 1px solid #747474;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    color: black;
  }
`;
