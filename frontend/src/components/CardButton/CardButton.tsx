import React from 'react';
import * as S from './CardButton.ts';

interface CardButtonProps {
  linkRedirect: string;
  buttonTitle?: string;
  isButton?: boolean;
}
const CardButton = ({
  linkRedirect,
  buttonTitle = "Add new",
  isButton = false,
}: CardButtonProps) => {
  if (!isButton) {
    return;
  }
  return (
    <a href={linkRedirect} style={{ textDecoration: 'none' }}>
      <S.CardButton>
        <img src="add-outline 1.svg" alt="button icon" />
        <p>{buttonTitle}</p>
      </S.CardButton>
    </a>
  );
};
export default CardButton;
