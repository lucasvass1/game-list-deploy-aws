import React from 'react';
import * as S from '../Modal/Modal.ts';
import { PlatformFormData } from '../Modal/Modal.tsx';

interface ModalCompanyInputsProps {
  formData: PlatformFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
}

export const ModalCompanyInputs: React.FC<ModalCompanyInputsProps> = ({
  formData,
  handleInputChange,
  isOpen,
}) => {
  return (
    isOpen && (
      <>
        <S.FormGroup>
          <S.Label>Company</S.Label>
          <S.Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Nintendo"
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Acquisition year</S.Label>
          <S.Input
            type="date"
            name="acquisitionDate"
            value={formData.acquisitionDate}
            onChange={handleInputChange}
            placeholder="Mario Kart 8"
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Image (url)</S.Label>
          <S.Input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="http://..."
          />
        </S.FormGroup>
      </>
    )
  );
};
