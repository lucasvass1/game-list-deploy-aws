import * as S from '../Modal/Modal.ts'
import React from 'react';

interface ModalFavoriteProps {
  isOpen: boolean;
}

export const ModalFavorite = ({ isOpen }: ModalFavoriteProps) => {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setChecked(checked);
  };

  if (!isOpen) return null;
  return (
    <S.FormGroup className="checkbox-group">
      <S.CheckboxContainer>
        <S.Checkbox
          type="checkbox"
          name="favorite"
          checked={checked}
          onChange={handleCheckboxChange}
          id="favorite-checkbox"
        />
        <S.Label htmlFor="favorite-checkbox">Favorite</S.Label>
      </S.CheckboxContainer>
    </S.FormGroup>
  );
};
