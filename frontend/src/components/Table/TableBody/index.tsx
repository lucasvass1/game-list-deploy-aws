// src/components/Table/TableBody/index.tsx
import React from 'react';
import { TBody, TR, TD } from '../styles';
import { FaEye, FaStar, FaRegStar } from 'react-icons/fa';
import { VscEdit } from 'react-icons/vsc';
import { FiTrash } from 'react-icons/fi';
import { COLORS } from '../../../config/colors';

interface TableBodyProps {
  dataBody: (string | boolean | null | undefined)[][];
  includeImage?: boolean;
  indexPositionImage?: number;
  handleViewItem: (index: number) => void;
  handleEditItem: (index: number) => void;
  handleDeleteItem: (index: number) => void;
  handleToggleFavorite?: (index: number) => void;
  hasIconFavorite?: boolean;
  indexPositionFavorite?: number;
}

const TableBody: React.FC<TableBodyProps> = ({
  dataBody,
  includeImage,
  indexPositionImage = 0,
  handleViewItem,
  handleEditItem,
  handleDeleteItem,
  handleToggleFavorite,
  hasIconFavorite,
  indexPositionFavorite,
}) => {
  return (
    <TBody>
      {dataBody.map((row, rowIndex) => (
        <TR key={rowIndex} backgroundColor={COLORS.white}>
          {row.map((cell, cellIndex) =>
            includeImage && cellIndex === indexPositionImage ? (
              <TD key={cellIndex}>
                <img src={cell as string} alt="game" />
              </TD>
            ) : hasIconFavorite && cellIndex === indexPositionFavorite ? (
              <TD key={cellIndex}>
                {cell ? (
                  <FaStar
                    onClick={() =>
                      handleToggleFavorite ? handleToggleFavorite(rowIndex) : {}
                    }
                    style={{ cursor: 'pointer', color: COLORS.background }}
                    title="Remover dos favoritos"
                  />
                ) : (
                  <FaRegStar
                    onClick={() =>
                      handleToggleFavorite ? handleToggleFavorite(rowIndex) : {}
                    }
                    style={{ cursor: 'pointer', color: COLORS.gray }}
                    title="Adicionar aos favoritos"
                  />
                )}
              </TD>
            ) : (
              <TD key={cellIndex}>{cell}</TD>
            ),
          )}
          <TD>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '10px',
              }}
            >
              <FaEye
                onClick={() => handleViewItem(rowIndex)}
                style={{
                  cursor: 'pointer',
                  color: COLORS.buttonPrimary,
                  fontSize: '20px',
                }}
                title="Visualizar"
              />
              <VscEdit
                onClick={() => handleEditItem(rowIndex)}
                style={{
                  cursor: 'pointer',
                  color: COLORS.buttonPrimary,
                  fontSize: '20px',
                }}
                title="Editar"
              />
              <FiTrash
                onClick={() => handleDeleteItem(rowIndex)}
                style={{
                  cursor: 'pointer',
                  color: COLORS.buttonPrimary,
                  fontSize: '20px',
                }}
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
