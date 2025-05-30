import React from "react";
import { TH, Thead, TR } from "../styles.ts";

interface TableHeaderProps {
  dataHeader: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ dataHeader }) => {
  return (
    <Thead>
      <TR>
        {dataHeader.map((item, index) => (
          <TH key={index}>{item}</TH>
        ))}
      </TR>
    </Thead>
  );
};

export default TableHeader;
