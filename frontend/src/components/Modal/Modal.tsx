import React, { useEffect, useRef, useState } from 'react';
import * as S from './Modal.ts';
import ModalButton from '../ModalButton/ModalButton.tsx';
import { ModalFavorite } from '../ModalFavorite/ModalFavorite.tsx';
import { ModalDates } from '../../ModalDates/ModalDates.tsx';
import { ModalCategoryRow } from '../ModalCategoryRow/ModalCategoryRow.tsx';
import { ModalGameStatus } from '../ModalGameStatus/ModalGameStatus.tsx';
import { ModalUrl } from '../ModalUrl/ModalUrl.tsx';

interface ModalSelectInputProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSave?: (formData: GameFormData) => void;
  isFavorite?: boolean;
  isDates?: boolean;
  isCategoryRow?: boolean;
  isStatus?: boolean;
  isUrl?: boolean;
  buttonTitle: string;
}

export interface GameFormData {
  title: string;
  description: string;
  category: string;
  platform: string;
  acquisitionDate: string;
  finishDate: string;
  status: string;
  favorite: boolean;
  imageUrl: string;
}

const Modal: React.FC<ModalSelectInputProps> = ({
  isOpen,
  onClose,
  title = 'New game',
  onSave,
  isFavorite = false,
  isDates = false,
  isCategoryRow = false,
  isStatus = false,
  isUrl = false,
  buttonTitle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<GameFormData>({
    title: '',
    description: '',
    category: '',
    platform: '',
    acquisitionDate: '',
    finishDate: '',
    status: '',
    favorite: false,
    imageUrl: '',
  });
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer ref={modalRef}>
        <S.ModalHeader>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer>
          <S.FormGroup>
            <S.Label>
              Title<S.Required>*</S.Required>
            </S.Label>
            <S.Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Mario Kart 8"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Description</S.Label>
            <S.Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Amazing game"
            />
          </S.FormGroup>

          <S.FormRow>
            <ModalCategoryRow isOpen={isCategoryRow} />
          </S.FormRow>
          <S.FormRow>
            <ModalDates isOpen={isDates} />
          </S.FormRow>
          <S.FormRow>
            <ModalGameStatus isOpen={isStatus} />
            <ModalFavorite isOpen={isFavorite} />
          </S.FormRow>
          <ModalUrl isOpen={isUrl} />
        </S.FormContainer>

        <S.ButtonContainer>
          <ModalButton onClick={handleSubmit} type="submit">{buttonTitle}</ModalButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
