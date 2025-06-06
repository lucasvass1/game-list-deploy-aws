import React from 'react';
import * as S from '../Modal/Modal.ts';
import { GameFormData } from '../Modal/Modal.tsx';
import { useGetCategoryList } from '../../services/category/list/index.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { useGetPlataformList } from '../../services/plataform/list/index.ts';

interface ModalCategoryRowProps {
  isOpen: boolean;
  formData: GameFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isDisabled?: boolean;
}

export const ModalCategoryRow = ({
  isOpen,
  handleInputChange,
  formData,
  isDisabled,
}: ModalCategoryRowProps) => {
  const { user } = useAuth();
  const { data: dataCategoryList } = useGetCategoryList(
    !!user?.id,
    1,
    10000000,
  );
  const { data: dataPlataformList } = useGetPlataformList(
    !!user?.id,
    1,
    10000000,
  );

  if (!isOpen) return null;

  return (
    <>
      <S.FormGroup>
        <S.Label>
          Category<S.Required>*</S.Required>
        </S.Label>
        <S.Select
          isDisabled={isDisabled}
          disabled={isDisabled}
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select category
          </option>
          {dataCategoryList?.categories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </S.Select>
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Platform</S.Label>
        <S.Select
          isDisabled={isDisabled}
          disabled={isDisabled}
          name="platform"
          value={formData.platform}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select platform
          </option>
          {dataPlataformList?.plataforms.map(platform => (
            <option key={platform?.id} value={platform?.id}>
              {platform?.title}
            </option>
          ))}
        </S.Select>
      </S.FormGroup>
    </>
  );
};
