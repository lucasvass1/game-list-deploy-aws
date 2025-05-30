import React, { useEffect, useRef } from "react";
import * as S from "./DeleteModal.ts";

// EXEMPLO DE COMO USAR O MODAL

/*
 const [showModal, setShowModal] = React.useState(false);
    const handleDelete = () => {
        setShowModal(false);
    };

<DeleteModal 
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onDelete={handleDelete}
    title="Custom title"
    message="Custom message"
    cancelText="Cancel"
    deleteText="Delete"
/>
*/

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  deleteText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  title = "Are you sure?",
  message = "Deleting this category will remove all game associated. This action is not reversible.",
  cancelText = "No, cancel action",
  deleteText = "Yes, delete this",
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
        <S.IconContainer>
          <img src="modal-alert.svg" alt="modal-alert" />
        </S.IconContainer>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.ButtonContainer>
          <S.CancelButton onClick={onClose}>{cancelText}</S.CancelButton>
          <S.DeleteButton onClick={onDelete}>{deleteText}</S.DeleteButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default DeleteModal;
