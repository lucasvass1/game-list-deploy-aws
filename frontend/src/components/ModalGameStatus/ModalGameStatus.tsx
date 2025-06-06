import * as S from '../Modal/Modal.ts';
import React from 'react';
import { GameFormData } from '../Modal/Modal.tsx';

interface ModalGameStatusProps {
  isOpen: boolean;
  formData: GameFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isDisabled?: boolean;
}

export const ModalGameStatus = ({
  isOpen,
  formData,
  handleInputChange,
  isDisabled,
}: ModalGameStatusProps) => {
  const statuses = ['PLAYING', 'DONE', 'ABANDONED'];

  if (!isOpen) return null;
  return (
    <S.FormGroup>
      <S.Label>
        Status<S.Required>*</S.Required>
      </S.Label>
      <S.Select
        isDisabled={isDisabled}
        disabled={isDisabled}
        name="status"
        value={formData.status}
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select status
        </option>
        {statuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </S.Select>
    </S.FormGroup>
  );
};
