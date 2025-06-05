import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { PlataformTablePage } from './components/PlataformTablePage';
import { Pagination } from '../../components/Pagination';
import { usePlataforms } from '../../context/PlataformsContext';

export function Plataforms() {
  const { page, setPage, dataPlataforms: data } = usePlataforms();

  return (
    <ContainerPage>
      <PlataformTablePage data={data?.plataforms ?? []} />

      {data?.plataforms?.length ? (
        <Pagination
          currentPage={page}
          totalPages={
            data?.total && data?.limit ? Math.ceil(data.total / data.limit) : 1
          }
          onPageChange={setPage}
        />
      ) : null}
    </ContainerPage>
  );
}
