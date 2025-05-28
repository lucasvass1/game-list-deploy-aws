import React from "react";
import * as S from "./Card.ts";
import CardButton from "../CardButton/CardButton.tsx";

interface CardProps {
  title: string;
  dinamicNumber: number;
  buttonRedirect: string;
}

const Card = ({ title, dinamicNumber, buttonRedirect }: CardProps) => {
  return (
    <S.CardContainer>
      <div>
        <div>
          <S.CardImage
            src="game-controller-outline 1.svg"
            alt="card-game-controller"
          />
          <S.CardTitle>{title}</S.CardTitle>
        </div>
        <CardButton />
      </div>
      <S.CardNumber>{dinamicNumber}</S.CardNumber>
    </S.CardContainer>
  );
};

export default Card;
