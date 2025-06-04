import * as S from '../Modal/Modal.ts';
import React from 'react';
import { GameFormData } from '../Modal/Modal.tsx';

interface ModalDatesProps {
  isOpen: boolean;
  formData: GameFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isDisabled?: boolean;
}

export const ModalDates = ({
  isOpen,
  formData,
  handleInputChange,
  isDisabled,
}: ModalDatesProps) => {
  if (!isOpen) return null;
  return (
    <>
      <S.FormGroup>
        <S.Label>
          Acquisition date<S.Required>*</S.Required>
        </S.Label>
        <S.Input
          isDisabled={isDisabled}
          disabled={isDisabled}
          type="date"
          name="acquisitionDate"
          value={formData.acquisitionDate}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
        />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>
          Finish date<S.Required>*</S.Required>
        </S.Label>
        <S.Input
          isDisabled={isDisabled}
          disabled={isDisabled}
          type="date"
          name="finishDate"
          value={formData.finishDate}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
        />
      </S.FormGroup>
    </>
  );
};
