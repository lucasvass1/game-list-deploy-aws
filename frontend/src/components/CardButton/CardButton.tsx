import React from 'react';
import * as S from './CardButton.ts';

interface CardButtonProps {
  linkRedirect: string;
}

const CardButton = ({ linkRedirect }: CardButtonProps) => {
  return (
    <a href={linkRedirect} style={{ textDecoration: 'none' }}>
      <S.CardButton>
        <img src="add-outline 1.svg" alt="button icon" />
        <p>Add New</p>
      </S.CardButton>
    </a>
  );
};
export default CardButton;
