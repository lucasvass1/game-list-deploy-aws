// src/components/Table/index.tsx
import React from 'react';
import { TableContainer } from './styles';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface TableProps {
  headers: string[];
  data: (string | boolean | null | undefined)[][];
  includeImage?: boolean;
  indexPositionImage?: number;
  hasIconFavorite?: boolean;
  indexPositionFavorite?: number;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (index: number) => void;
  onView: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onToggleFavorite?: (index: number) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  includeImage,
  indexPositionImage,
  sortDirection,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  hasIconFavorite,
  indexPositionFavorite,
}) => {
  return (
    <TableContainer>
      <TableHeader
        dataHeader={headers}
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
        hasIconFavorite={hasIconFavorite}
        indexPositionFavorite={indexPositionFavorite}
      />
    </TableContainer>
  );
};

export default Table;
