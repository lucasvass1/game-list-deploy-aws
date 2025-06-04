import React from 'react';
import * as S from '../Modal/Modal.ts';
import { GameFormData } from '../Modal/Modal.tsx';

interface ModalGameTitleProps {
  isOpen: boolean;
  formData: GameFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

const ModalGameTitle: React.FC<ModalGameTitleProps> = ({
  isOpen,
  formData,
  handleInputChange,
  isDisabled,
}) => {
  return (
    isOpen && (
      <S.FormGroup>
        <S.Label>
          Title<S.Required>*</S.Required>
        </S.Label>
        <S.Input
          isDisabled={isDisabled}
          disabled={isDisabled}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Mario Kart 8"
        />
      </S.FormGroup>
    )
  );
};

export default ModalGameTitle;
