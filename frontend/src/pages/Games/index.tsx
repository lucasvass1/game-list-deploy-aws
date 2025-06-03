import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { useAuth } from '../../context/AuthContext';
import { useGetGamesList } from '../../services/games/list';
import { TablePage } from './components/TablePage';
import { FiltersTable } from './components/FiltersTable';

export function Games() {
  const { user } = useAuth();
  const { data } = useGetGamesList(!!user?.id);

  console.log('data', data);

  return (
    <ContainerPage>
      <FiltersTable />
      <TablePage data={data ?? []} />
    </ContainerPage>
  );
}
