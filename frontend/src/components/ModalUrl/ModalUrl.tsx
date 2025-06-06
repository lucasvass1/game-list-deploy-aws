import React from 'react';
import * as S from '../Modal/Modal';
import { GameFormData } from '../Modal/Modal.tsx';
import { PlatformFormData } from '../Modal/Modal.tsx';

interface ModalUrlProps {
  isOpen: boolean;
  formData: GameFormData | PlatformFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isDisabled?: boolean;
}

export const ModalUrl = ({
  isOpen,
  formData,
  handleInputChange,
  isDisabled,
}: ModalUrlProps) => {
  if (!isOpen) return null;

  return (
    <S.FormGroup>
      <S.Label>Image (url)</S.Label>
      <S.Input
        isDisabled={isDisabled}
        disabled={isDisabled}
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
        placeholder="http://..."
      />
    </S.FormGroup>
  );
};
