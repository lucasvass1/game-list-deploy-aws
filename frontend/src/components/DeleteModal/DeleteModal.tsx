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
      // Prevent scrolling when modal is open
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
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 6.5C16.8284 6.5 17.5 7.17157 17.5 8V18C17.5 18.8284 16.8284 19.5 16 19.5C15.1716 19.5 14.5 18.8284 14.5 18V8C14.5 7.17157 15.1716 6.5 16 6.5Z"
              fill="white"
            />
            <path
              d="M16 25.5C17.1046 25.5 18 24.6046 18 23.5C18 22.3954 17.1046 21.5 16 21.5C14.8954 21.5 14 22.3954 14 23.5C14 24.6046 14.8954 25.5 16 25.5Z"
              fill="white"
            />
          </svg>
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
