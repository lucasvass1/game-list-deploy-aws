import React, { useState } from 'react';
import { PlataformProps } from '../../../services/plataform/list/index.ts';
import { MessageEmpty } from '../../../components/MessageEmpty';
import Table from '../../../components/Table';
import { usePlataforms } from '../../../context/PlataformsContext';

interface IPlataformTablePageProps {
  data: PlataformProps[];
  message?: string;
}

export const PlataformTablePage = ({ data, message }: IPlataformTablePageProps) => {
  const { handleRemovePlataform } = usePlataforms();
  const [plataformSelected, setPlataformSelected] = useState<string>();

  return (
    <>
      {data?.length ? (
        <Table
          headers={['Name', 'Description', '']}
          data={
            data?.map(plataform => [
              plataform.name,
              plataform.description || '-',
            ]) || []
          }
          onDelete={index => {
            setPlataformSelected(data[index]?.id);
            if (data[index]?.id) handleRemovePlataform(data[index].id);
          }}
          sortDirection={'asc'}
          onSort={() => {}}
        />
      ) : (
        <MessageEmpty message={message ?? 'No plataforms found'} />
      )}
    </>
  );
};
