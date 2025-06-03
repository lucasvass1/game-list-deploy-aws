// src/components/Table/TableBody/index.tsx
import React from "react";
import { TBody, TR, TD } from "../styles";
import { FaEye, FaStar, FaRegStar } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { FiTrash } from "react-icons/fi";
import { COLORS } from "../../../config/colors";

interface TableBodyProps {
  dataBody: string[][];
  includeImage?: boolean;
  indexPositionImage?: number;
  handleViewItem: (index: number) => void;
  handleEditItem: (index: number) => void;
  handleDeleteItem: (index: number) => void;
  handleToggleFavorite: (index: number) => void;
  favorites: boolean[];
}

const TableBody: React.FC<TableBodyProps> = ({
  dataBody,
  includeImage,
  indexPositionImage = 0,
  handleViewItem,
  handleEditItem,
  handleDeleteItem,
  handleToggleFavorite,
  favorites,
}) => {
  return (
    <TBody>
      {dataBody.map((row, rowIndex) => (
        <TR key={rowIndex} backgroundColor={COLORS.white}>
          {row.map((cell, cellIndex) =>
            includeImage && cellIndex === indexPositionImage ? (
              <TD key={cellIndex}>
                <img src={cell} alt="game" />
              </TD>
            ) : (
              <TD key={cellIndex}>{cell}</TD>
            )
          )}
          <TD>
            {favorites[rowIndex] ? (
              <FaStar
                onClick={() => handleToggleFavorite(rowIndex)}
                style={{ cursor: "pointer", color: COLORS.favoriteYellow }}
                title="Remover dos favoritos"
              />
            ) : (
              <FaRegStar
                onClick={() => handleToggleFavorite(rowIndex)}
                style={{ cursor: "pointer", color: COLORS.gray }}
                title="Adicionar aos favoritos"
              />
            )}
          </TD>
          <TD>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <FaEye
                onClick={() => handleViewItem(rowIndex)}
                style={{ cursor: "pointer", color: COLORS.buttonPrimary }}
                title="Visualizar"
              />
              <VscEdit
                onClick={() => handleEditItem(rowIndex)}
                style={{ cursor: "pointer", color: COLORS.buttonPrimary }}
                title="Editar"
              />
              <FiTrash
                onClick={() => handleDeleteItem(rowIndex)}
                style={{ cursor: "pointer", color: COLORS.buttonPrimary }}
                title="Excluir"
              />
            </div>
          </TD>
        </TR>
      ))}
    </TBody>
  );
};

export default TableBody;
