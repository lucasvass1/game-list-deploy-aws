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
import { useGames } from '../../context/GamesContext.tsx';

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
  isUpdateGame?: boolean;
  idGameSelected?: string;
  isView?: boolean;
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
  isUpdateGame,
  idGameSelected,
  isView = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { dataGems } = useGames();
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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >,
  ) => {
    const { name, value, checked } = e.target;
    setGameFormData(prev => ({
      ...prev,
      [name]: name === 'favorite' ? checked : value,
    }));
    setPlatformFormData(prev => ({
      ...prev,
      [name]: name === 'favorite' ? checked : value,
    }));
  };
  const handleSubmit = () => {
    if (onSave) {
      onSave(gameFormData || platformFormData);
    }
    setGameFormData({
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
    setPlatformFormData({
      platformName: '',
      companyName: '',
      acquisitionDate: '',
      imageUrl: '',
    });
    onClose();
  };

  useEffect(() => {
    if (isUpdateGame && dataGems?.games?.length && idGameSelected?.length) {
      const game = dataGems?.games?.find(game => game?.id === idGameSelected);

      setGameFormData({
        title: game?.title ?? '',
        description: game?.description ?? '',
        category: game?.categoryId ?? '',
        platform: game?.plataformId ?? '',
        // acquisitionDate: game?.,
        acquisitionDate: '',
        finishDate: '',
        // finishDate: game?.endDate as string ?? '',
        status: game?.status ?? '',
        favorite: game?.isFavorite ?? false,
        imageUrl: (game?.imageUrl as string) ?? '',
      });
    }
  }, [isUpdateGame, dataGems, idGameSelected]);

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
            isDisabled={isView}
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
            isDisabled={isView}
            formData={gameFormData}
            handleInputChange={handleInputChange}
            isOpen={isDescription}
          />
          <S.FormRow>
            <ModalCategoryRow
              isDisabled={isView}
              isOpen={isCategoryRow}
              handleInputChange={handleInputChange}
              formData={gameFormData}
            />
          </S.FormRow>
          <S.FormRow>
            <ModalDates
              isDisabled={isView}
              handleInputChange={handleInputChange}
              formData={gameFormData}
              isOpen={isDates}
            />
          </S.FormRow>
          <S.FormRow>
            <ModalGameStatus
              isDisabled={isView}
              isOpen={isStatus}
              handleInputChange={handleInputChange}
              formData={gameFormData}
            />
            <ModalFavorite
              isDisabled={isView}
              isOpen={isFavorite}
              handleInputChange={handleInputChange}
              formData={gameFormData}
            />
          </S.FormRow>
          <ModalUrl
            isDisabled={isView}
            isOpen={isUrl}
            handleInputChange={handleInputChange}
            formData={gameFormData}
          />
        </S.FormContainer>

        {!isView ? (
          <S.ButtonContainer>
            <ModalButton onClick={handleSubmit} type="submit">
              {buttonTitle}
            </ModalButton>
          </S.ButtonContainer>
        ) : null}
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
