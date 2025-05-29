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
  width: 750px;
  height: 516px;
  max-width: 90%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const IconContainer = styled.div`
  width: 176px;
  height: 176px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const Title = styled.h2`
  color: black;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

export const Message = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 400;
  max-width: 550px;
  text-align: center;
  margin-bottom: 45px;
  line-height: 1.4;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

export const CancelButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  background-color: transparent;
  color: #575757;
  border: 1px solid black;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DeleteButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  background-color: #ff4757;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #ff3040;
  }
`;
