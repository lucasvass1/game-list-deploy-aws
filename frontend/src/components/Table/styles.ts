import styled from "styled-components";
import { COLORS } from "../../config/colors/index.ts";

export const TableContainer = styled.table`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 20px;
  border-spacing: 0 8px;
  border-collapse: separate;
`;

export const Thead = styled.thead`
  width: 100%;
  border-top: 1px solid ${COLORS.gray};
  background-color: ${COLORS.background};
`;

export const TR = styled.tr<{ backgroundColor?: string; marginTop?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? "transparent"};
  margin-top: ${({ marginTop }) => marginTop ?? "0"};
`;

export const TH = styled.th`
  text-align: center;
  color: ${COLORS.text};
  font-size: 12px;
  font-weight: 600;
  line-height: 22px;
  padding: 10px;
`;

export const TBody = styled.tbody`
  width: 100%;
`;

export const TD = styled.td`
  text-align: center;
  color: ${COLORS.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  padding: 10px;
  background-color: ${COLORS.white};

  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  img {
    width: 65px;
    height: 55px;
    border-radius: 8px;
    object-fit: cover;
  }
`;
