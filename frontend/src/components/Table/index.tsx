import React from 'react';
import { TableContainer } from './styles.ts';
import TableHeader from './TableHeader/index.tsx';
import TableBody from './TableBody/index.tsx';

interface TableProps {
  dataHead: string[];
  dataBody: (string | boolean | null | undefined)[][];
  includeImage?: boolean;
  indexPositionImage?: number;
  hasIconFavorite?: boolean;
  indexPositionFavorite?: number;
  handleViewItem: () => void;
  handleEditItem: () => void;
  handleDeleteItem: () => void;
}

const Table: React.FC<TableProps> = ({
  dataHead,
  dataBody,
  includeImage,
  hasIconFavorite,
  indexPositionFavorite,
  indexPositionImage,
  handleDeleteItem,
  handleEditItem,
  handleViewItem,
}) => {
  return (
    <TableContainer>
      <TableHeader dataHeader={dataHead} />

      <TableBody
        includeImage={includeImage}
        dataBody={dataBody}
        hasIconFavorite={hasIconFavorite}
        indexPositionFavorite={indexPositionFavorite}
        indexPositionImage={indexPositionImage}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        handleViewItem={handleViewItem}
      />
    </TableContainer>
  );
};

export default Table;
