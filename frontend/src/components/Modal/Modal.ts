import styled from "styled-components";
import { modalButtonColor } from "../../styles/globals.ts";

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
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 750px;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
`;

export const Title = styled.h2`
  color: #000;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;
  padding: 0;
  margin: 0;
  line-height: 1;
  &:hover {
    color: #000;
  }
`;

export const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &.checkbox-group {
    flex-direction: row;
    align-items: end;
    justify-content: flex-start;
    margin-bottom: 8px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  max-width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const Required = styled.span`
  color: #ff0000;
  margin-left: 2px;
`;

export const Input = styled.input`
  width: auto;
  padding: 10px 12px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }

  &[type="date"] {
    appearance: none;

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }
`;

export const Textarea = styled.textarea`
  width: auto;
  padding: 10px 12px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

export const Select = styled.select`
  max-width: auto;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 14px;
  color: black;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: black;
  }

  &::placeholder {
    color: #fff;
  }
  option {
    padding: 10px;
    color: black;
  }

  option:checked {
    color: black;
    background-color: ${modalButtonColor};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6200ee;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
`;
