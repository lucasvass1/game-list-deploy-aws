import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from './components/TablePage';
import { FiltersTable } from './components/FiltersTable';
import { Pagination } from '../../components/Pagination';
import { useGames } from '../../context/GamesContext';

export function Games() {
  const { page, setPage, dataGems: data } = useGames();
  return (
    <>
      <ContainerPage>
        <FiltersTable />
        <TablePage data={data?.games ?? []} />

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
    </>
  );
}
