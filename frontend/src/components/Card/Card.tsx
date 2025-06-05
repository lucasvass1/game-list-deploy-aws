import React from 'react';
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
  return (
    <S.CardContainer>
      <div>
        <div>
          <S.CardImage src={iconImage} alt={altImage} />
          <S.CardTitle>{title}</S.CardTitle>
        </div>
        <CardButton linkRedirect={buttonRedirect} isButton={isButton}/>
      </div>
      <S.CardNumber>{dinamicNumber}</S.CardNumber>
    </S.CardContainer>
  );
};

export default Card;
