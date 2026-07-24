import React from 'react';
import * as S from './CardButton.ts';

interface CardButtonProps {
  linkRedirect: string;
  buttonTitle?: string;
  isButton?: boolean;
}
const CardButton = ({
  linkRedirect,
  buttonTitle = 'Add new',
  isButton = false,
}: CardButtonProps) => {
  if (!isButton) {
    return;
  }
  return (
    <a
      href={linkRedirect}
      onClick={(e) => e.stopPropagation()}
      style={{ textDecoration: 'none' }}
    >
      <S.CardButton>
        <S.PlusIcon>+</S.PlusIcon>
        <p>{buttonTitle}</p>
      </S.CardButton>
    </a>
  );
};
export default CardButton;
