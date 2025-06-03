import React from 'react';
import * as S from '../Modal/Modal.ts';
import { CompanyFormData } from '../ModalCompanyInputs/ModalCompanyInputs.tsx';

interface ModalCompanyTitleProps {
  isOpen: boolean;
  formData: CompanyFormData;
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
          Company name<S.Required>*</S.Required>
        </S.Label>
        <S.Input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Nintendo"
        />
      </S.FormGroup>
    )
  );
};

export default ModalCompanyTitle;
