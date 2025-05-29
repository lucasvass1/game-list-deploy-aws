import React, { useEffect, useRef } from "react";
import * as S from "./InputModal.ts";
import { ModalButton } from "../ModalButton/ModalButton.ts";
import { DescriptionTextarea } from "./InputModal.ts";

// EXEMPLO DE COMO USAR O MODAL

/*
 const [showModal, setShowModal] = React.useState(false);
    const handleDelete = () => {
        setShowModal(false);
    };

<InputModal 
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onDelete={handleDelete}
    title="Custom title"
    buttonText1="Cancel"
    buttonText2="Delete"
/>
*/

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickButton1?: () => void;
  onClickButton2?: () => void;
  title?: string;
  buttonText1?: string;
  buttonText2?: string;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  onClickButton1,
  onClickButton2,
  title = "Are you sure?",
  buttonText1,
  buttonText2,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer ref={modalRef}>
        <S.Title>{title}</S.Title>
        <S.InputContainer>
          <S.TitleLabel>
            Title<span>*</span>
          </S.TitleLabel>
          <S.TitleInput placeholder="Mario Kart 8" />
        </S.InputContainer>
        <S.InputContainer>
          <S.TitleLabel>
            Description<span>*</span>
          </S.TitleLabel>   
          <DescriptionTextarea placeholder="Amazing game" />
        </S.InputContainer>
        <S.ButtonContainer>
          <ModalButton onClick={() => onClose()}>Cancel</ModalButton>
          <ModalButton onClick={() => alert("works")}>Save</ModalButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default InputModal;
