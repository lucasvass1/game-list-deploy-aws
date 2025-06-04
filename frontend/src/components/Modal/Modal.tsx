import React, { useEffect, useRef, useState } from 'react';
import * as S from './Modal.ts';
import ModalButton from '../ModalButton/ModalButton.tsx';
import { ModalFavorite } from '../ModalFavorite/ModalFavorite.tsx';
import { ModalDates } from '../ModalDates/ModalDates.tsx';
import { ModalCategoryRow } from '../ModalCategoryRow/ModalCategoryRow.tsx';
import { ModalGameStatus } from '../ModalGameStatus/ModalGameStatus.tsx';
import { ModalUrl } from '../ModalUrl/ModalUrl.tsx';
import { ModalCompanyInputs } from '../ModalCompanyInputs/ModalCompanyInputs.tsx';
import ModalDescriptionTextarea from '../ModalDescriptionTextarea/ModalDescriptionTextarea.tsx';
import ModalGameTitle from '../ModalGameTitle/ModalGameTitle.tsx';
import ModalCompanyTitle from '../ModalCompanyTitle/ModalCompanyTitle.tsx';

interface ModalSelectInputProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSave?: (formData: GameFormData) => void;
  isFavorite?: boolean;
  isDates?: boolean;
  isCategoryRow?: boolean;
  isStatus?: boolean;
  isUrl?: boolean;
  isCompany?: boolean;
  isCompanyTitle?: boolean;
  isGameTitle?: boolean;
  buttonTitle: string;
  isDescription?: boolean;
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
export interface PlatformFormData {
  platformName: string | number | readonly string[] | undefined;
  companyName?: string;
  acquisitionDate?: string;
  imageUrl?: string;
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
  isCompany = false,
  isCompanyTitle = false,
  isGameTitle = false,
  isDescription = false,
  buttonTitle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [gameFormData, setGameFormData] = useState<GameFormData>({
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
  const [platformFormData, setPlatformFormData] = useState<PlatformFormData>({
    platformName: '',
    companyName: '',
    acquisitionDate: '',
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
    setGameFormData(prev => ({ ...prev, [name]: value }));
    setPlatformFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    if (onSave) {
      onSave(gameFormData || platformFormData);
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
          <ModalGameTitle
            isOpen={isGameTitle}
            formData={gameFormData}
            handleInputChange={handleInputChange}
          />
          <ModalCompanyTitle
            isOpen={isCompanyTitle}
            formData={platformFormData}
            handleInputChange={handleInputChange}
          />

          <ModalCompanyInputs
            formData={platformFormData}
            handleInputChange={handleInputChange}
            isOpen={isCompany}
          />
          <ModalDescriptionTextarea
            formData={gameFormData}
            handleInputChange={handleInputChange}
            isOpen={isDescription}
          />
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
          <ModalButton onClick={handleSubmit} type="submit">
            {buttonTitle}
          </ModalButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
);
};

export default Modal;
