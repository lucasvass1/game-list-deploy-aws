import React from "react";
import { TBody, TD, TR } from "../styles.ts";
import { FaEye } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { COLORS } from "../../../config/colors/index.ts";
import { FiTrash } from "react-icons/fi";

interface TableBodyProps {
  dataBody: string[][]; 
  includeImage?: boolean;
  indexPositionImage?: number;
  handleViewItem: () => void;
  handleEditItem: () => void;
  handleDeleteItem: () => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  dataBody,
  includeImage,
  indexPositionImage = 0,
  handleViewItem,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <TBody>
      {dataBody?.map((row, rowIndex) => (
        <TR key={rowIndex} backgroundColor={COLORS.white} marginTop="10px">
          {row.map((cell, cellIndex) =>
            includeImage && cellIndex === indexPositionImage ? (
              <TD key={cellIndex}>
                <img
                  src={cell}
                  alt="game image"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </TD>
            ) : (
              <TD key={cellIndex}>{cell}</TD>
            )
          )}

          {}
          <TD>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "5px",
              }}
            >
              <FaEye
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: COLORS.buttonPrimary,
                }}
                onClick={handleViewItem}
              />
              <VscEdit
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: COLORS.buttonPrimary,
                }}
                onClick={handleEditItem}
              />
              <FiTrash
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: COLORS.buttonPrimary,
                }}
                onClick={handleDeleteItem}
              />
            </div>
          </TD>
        </TR>
      ))}
    </TBody>
  );
};

export default TableBody;
