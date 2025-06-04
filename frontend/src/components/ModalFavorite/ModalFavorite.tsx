import * as S from '../Modal/Modal.ts';
import React from 'react';
import { GameFormData } from '../Modal/Modal.tsx';

interface ModalFavoriteProps {
  isOpen: boolean;
  formData: GameFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isDisabled?: boolean;
}

export const ModalFavorite = ({
  isOpen,
  formData,
  handleInputChange,
  isDisabled,
}: ModalFavoriteProps) => {
  if (!isOpen) return null;
  return (
    <S.FormGroup className="checkbox-group">
      <S.CheckboxContainer>
        <S.Checkbox
          isDisabled={isDisabled}
          disabled={isDisabled}
          type="checkbox"
          name="favorite"
          checked={formData?.favorite}
          onChange={handleInputChange}
          id="favorite-checkbox"
        />
        <S.Label htmlFor="favorite-checkbox">Favorite</S.Label>
      </S.CheckboxContainer>
    </S.FormGroup>
  );
};
