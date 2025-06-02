import React from 'react';
import * as S from '../Modal/Modal';

interface ModalUrlProps {
  isOpen: boolean;
}

export const ModalUrl = ({ isOpen }: ModalUrlProps) => {
  const [formData, setFormData] = React.useState({
    imageUrl: '',
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
      <S.Label>Image (url)</S.Label>
      <S.Input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
        placeholder="http://..."
      />
    </S.FormGroup>
  );
};
