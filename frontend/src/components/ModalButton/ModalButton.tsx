import React from "react";
import * as S from "./ModalButton.ts";

interface ModalButtonProps {
  onClick?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}

const ModalButton: React.FC<ModalButtonProps> = ({ onClick, children }) => {

  return <S.ModalButton onClick={onClick}>{children}</S.ModalButton>;
};

export default ModalButton;
