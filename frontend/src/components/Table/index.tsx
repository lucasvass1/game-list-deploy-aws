// src/components/Table/index.tsx
import React from "react";
import { TableContainer } from "./styles";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

interface TableProps {
  headers: string[];
  data: string[][];
  favorites: boolean[];
  includeImage?: boolean;
  indexPositionImage?: number;
  sortColumn: number | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (index: number) => void;
  onView: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onToggleFavorite: (index: number) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  favorites,
  includeImage,
  indexPositionImage,
  sortColumn,
  sortDirection,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <TableContainer>
      <TableHeader
        dataHeader={headers}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <TableBody
        dataBody={data}
        includeImage={includeImage}
        indexPositionImage={indexPositionImage}
        handleViewItem={onView}
        handleEditItem={onEdit}
        handleDeleteItem={onDelete}
        handleToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />
    </TableContainer>
  );
};

export default Table;
