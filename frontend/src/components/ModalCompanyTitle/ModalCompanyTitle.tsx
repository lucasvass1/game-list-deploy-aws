import React from 'react';
import * as S from '../Modal/Modal.ts';
import { PlatformFormData } from '../Modal/Modal.tsx';

interface ModalCompanyTitleProps {
  isOpen: boolean;
  formData: PlatformFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalCompanyTitle: React.FC<ModalCompanyTitleProps> = ({
  isOpen,
  formData,
  handleInputChange,
}) => {
  return (
    isOpen && (
      <S.FormGroup>
        <S.Label>
          Platform name<S.Required>*</S.Required>
        </S.Label>
        <S.Input
          type="text"
          name="platformName"
          value={formData.platformName}
          onChange={handleInputChange}
          placeholder="Epic games"
        />
      </S.FormGroup>
    )
  );
};

export default ModalCompanyTitle;
