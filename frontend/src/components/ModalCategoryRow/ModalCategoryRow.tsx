import React from 'react';
import * as S from '../Modal/Modal.ts';

interface ModalCategoryRowProps {
  isOpen: boolean;
}

export const ModalCategoryRow = ({ isOpen }: ModalCategoryRowProps) => {
  const categories = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Sports',
    'Simulation',
    'Puzzle',
  ];
  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'];

  const [formData, setFormData] = React.useState({
    category: '',
    platform: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <>
      <S.FormGroup>
        <S.Label>
          Category<S.Required>*</S.Required>
        </S.Label>
        <S.Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </S.Select>
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Platform</S.Label>
        <S.Select
          name="platform"
          value={formData.platform}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select platform
          </option>
          {platforms.map(platform => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </S.Select>
      </S.FormGroup>
    </>
  );
};
