import React from "react";
import { TBody, TD, TR } from "../styles.ts";
import { FaEye } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { COLORS } from "../../../config/colors/index.ts";
import { BsFillStarFill } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";

interface TableBodyProps {
  dataBody: string[][];
  includeImage?: boolean;
  indexPositionImage?: number;
  hasIconFavorite?: boolean;
  indexPositionFavorite?: number;
  handleViewItem: () => void;
  handleEditItem: () => void;
  handleDeleteItem: () => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  dataBody,
  includeImage,
  hasIconFavorite,
  indexPositionFavorite,
  indexPositionImage,
  handleViewItem,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <TBody>
      {dataBody?.map((row, index) => (
        <TR key={index} backgroundColor={COLORS?.white} marginTop="10px">
          {row.map((item, index) =>
            includeImage && index === indexPositionImage ? (
              <TD key={index}>
                <img src={item} alt="game image" />
              </TD>
            ) : hasIconFavorite && index === indexPositionFavorite ? (
              <TD>
                <BsFillStarFill />
              </TD>
            ) : (
              <TD key={index}>{item}</TD>
            )
          )}

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
