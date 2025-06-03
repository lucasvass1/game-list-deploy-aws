
import React from "react";
import { Thead, TR, TH } from "../styles";
import { COLORS } from "../../../config/colors";

interface TableHeaderProps {
  dataHeader: string[];
  sortColumn: number | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (index: number) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  dataHeader,
  sortColumn,
  sortDirection,
  onSort,
}) => {
  return (
    <Thead>
      <TR backgroundColor={COLORS.background}>
        {dataHeader.map((item, index) => (
          <TH
            key={index}
            onClick={() => onSort(index)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
          >
            {item}
            {sortColumn === index && (
              <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
            )}
          </TH>
        ))}
        <TH>Favorito</TH>
        <TH>Ações</TH>
      </TR>
    </Thead>
  );
};

export default TableHeader;
