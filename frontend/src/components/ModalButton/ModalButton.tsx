import React from "react";
import * as S from "./ModalButton.ts";

interface ModalButtonProps {
  onClick?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
}

const ModalButton: React.FC<ModalButtonProps> = ({ onClick, children, type }) => {

  return <S.ModalButton onClick={onClick} type={type}>{children}</S.ModalButton>;
};

export default ModalButton;
