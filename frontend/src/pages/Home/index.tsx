import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { useGetUserStats } from '../../services/users/stats';
import { useAuth } from '../../context/AuthContext';

export function Home() {
  const { user } = useAuth();
  const { data } = useGetUserStats(!!user?.id);

  console.log(data);

  return (
    <ContainerPage>
      <div></div>
    </ContainerPage>
  );
}
