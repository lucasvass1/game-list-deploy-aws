import * as S from '../Modal/Modal.ts';
import React from 'react';

interface ModalGameStatusProps {
  isOpen: boolean;
}

export const ModalGameStatus = ({ isOpen }: ModalGameStatusProps) => {
  const statuses = ['Not started', 'In progress', 'Completed', 'Abandoned'];
  const [formData, setFormData] = React.useState({
    status: '',
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  if (!isOpen) return null;
  return (
    <S.FormGroup>
      <S.Label>
        Status<S.Required>*</S.Required>
      </S.Label>
      <S.Select
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
