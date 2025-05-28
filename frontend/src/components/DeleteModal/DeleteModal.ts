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
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  background-color: #ff4757;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

export const Message = styled.p`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
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
  border-radius: 4px;
  background-color: transparent;
  color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DeleteButton = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
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
