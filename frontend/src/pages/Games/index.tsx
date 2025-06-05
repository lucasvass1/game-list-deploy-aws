import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from './components/TablePage';
import { FiltersTable } from './components/FiltersTable';
import { Pagination } from '../../components/Pagination';
import { useGames } from '../../context/GamesContext';
import { useLocalSearchParams } from 'expo-router';

export function Games() {
  const { page, setPage, dataGems: data } = useGames();
  const { create } = useLocalSearchParams();

  return (
    <>
      <ContainerPage>
        {create === 'true' ? <FiltersTable /> : null}
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
