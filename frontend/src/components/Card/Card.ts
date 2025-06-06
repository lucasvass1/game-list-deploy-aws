import styled, { css } from 'styled-components';

interface CardContainerProps {
  isClickable?: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  justify-content: space-between;
  background-color: #262626;
  width: 360px;
  height: 173px;
  border-radius: 10px;
  border: 1px solid #6c6c6c;

  ${props =>
    props.isClickable &&
    css`
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #333333;
      }
    `}

  h2 {
    margin-top: 8px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div div {
    margin-top: 17px;
    margin-left: 21px;
    align-items: flex-start;
  }

  @media (max-width: 700px) {
    flex: 1;
  }

  @media (max-width: 400px) {
    width: 95%;
    margin: 5px auto;
  }
`;

export const CardImage = styled.img`
  width: 48px;
  height: 48px;
`;

export const CardTitle = styled.h2`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

export const CardNumber = styled.p`
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  margin: 17px 32px 0 0;
`;
