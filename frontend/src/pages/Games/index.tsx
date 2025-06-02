import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import Table from '../../components/Table';
import { useAuth } from '../../context/AuthContext';
import { useGetGamesList } from '../../services/games/list';
import { formatDate } from '../../utils/formatDate';

export function Games() {
  const { user } = useAuth();
  const { data } = useGetGamesList(!!user?.id);

  console.log('data', data);

  return (
    <ContainerPage>
      <Table
        dataHead={[
          ' ',
          'Title',
          'Description',
          'Category',
          'Release Date',
          'Favorite',
          ' ',
        ]}
        dataBody={
          data?.map(game => [
            game.imageUrl ??
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGzoB0iNupD1n4X2hMt8a0abTvs9rszQHLw&s',
            game.title,
            game.description,
            game.category.title,
            game.endDate ? formatDate(game.endDate?.toString() ?? '') : '-',
            game.isFavorite,
          ]) || []
        }
        includeImage
        indexPositionImage={0}
        hasIconFavorite
        indexPositionFavorite={5}
        handleDeleteItem={() => {}}
        handleEditItem={() => {}}
        handleViewItem={() => {}}
      />
    </ContainerPage>
  );
}
