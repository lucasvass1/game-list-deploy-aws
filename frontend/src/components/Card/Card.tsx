import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Card.ts';
import CardButton from '../CardButton/CardButton.tsx';

interface CardProps {
  title: string;
  dinamicNumber: number;
  buttonRedirect: string;
  iconImage: string;
  altImage: string;
  isButton?: boolean;
}

const Card = ({
  title,
  dinamicNumber,
  buttonRedirect,
  iconImage,
  altImage,
  isButton = true,
}: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isButton) navigate(buttonRedirect);
  };

  return (
    <S.CardContainer
  onClick={handleClick}
  role={isButton ? 'button' : undefined}
  tabIndex={isButton ? 0 : -1}
  onKeyDown={(e) => isButton && e.key === 'Enter' && handleClick()}
  isClickable={isButton}
 >

      <div>
        <div>
          <S.CardImage src={iconImage} alt={altImage} />
          <S.CardTitle>{title}</S.CardTitle>
        </div>
        <CardButton linkRedirect={buttonRedirect} isButton={isButton} />
      </div>
      <S.CardNumber>{dinamicNumber}</S.CardNumber>
    </S.CardContainer>
  );
};

export default Card;
