import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from '../Games/components/TablePage';
import { Pagination } from '../../components/Pagination';
import { useGames } from '../../context/GamesContext';

export function Plataforms() {
  const { page, setPage, dataGems: data } = useGames();

  return (
    <ContainerPage>
      <TablePage data={data?.games ?? []} message="No plataforms found" />

      {data?.games?.length ? (
        <Pagination
          currentPage={page}
          totalPages={
            data?.total / data?.limit > 1 ? data?.total / data?.limit : 1
          }
          onPageChange={currentPage => setPage(currentPage)}
        />
      ) : null}
    </ContainerPage>
  );
}
