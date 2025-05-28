import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #262626;
  width: 360px;
  height: 173px;
  border-radius: 10px;
  border: 1px solid #6c6c6c;
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
