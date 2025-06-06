import React from 'react';
import * as S from '../Modal/Modal.ts';
import { GameFormData } from '../Modal/Modal.tsx';

interface ModalDescriptionTextareaProps {
  formData: GameFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isOpen: boolean;
  isDisabled?: boolean;
}

const ModalDescriptionTextarea: React.FC<ModalDescriptionTextareaProps> = ({
  formData,
  handleInputChange,
  isOpen,
  isDisabled,
}) => {
  return (
    isOpen && (
      <S.FormGroup>
        <S.Label>Description</S.Label>
        <S.Textarea
          isDisabled={isDisabled}
          disabled={isDisabled}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Amazing game"
        />
      </S.FormGroup>
    )
  );
};
export default ModalDescriptionTextarea;
