import * as S from '../Modal/Modal.ts';
import React from 'react';

interface ModalDatesProps {
  isOpen: boolean;
}

export const ModalDates = ({ isOpen }: ModalDatesProps) => {
  const [formData, setFormData] = React.useState({
    acquisitionDate: '',
    finishDate: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;
  return (
    <>
      <S.FormGroup>
        <S.Label>
          Acquisition date<S.Required>*</S.Required>
        </S.Label>
        <S.Input
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
