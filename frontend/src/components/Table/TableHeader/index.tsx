import React from 'react';
import { Thead, TR, TH } from '../styles';
import { COLORS } from '../../../config/colors';

interface TableHeaderProps {
  dataHeader: string[];
  sortDirection: 'asc' | 'desc' | null;
  onSort: (index: number) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  dataHeader,
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
            style={{ cursor: 'pointer', gap: '5px' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
            >
              {item}
              {sortDirection && !!item?.trim().length && (
                <img src="order-filters.svg" alt="icon" />
              )}
            </div>
          </TH>
        ))}
      </TR>
    </Thead>
  );
};

export default TableHeader;
