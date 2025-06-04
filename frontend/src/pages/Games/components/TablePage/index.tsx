import React from 'react';
import { GameProps } from '../../../../services/games/list';
import { MessageEmpty } from '../../../../components/MessageEmpty';
import { formatDate } from '../../../../utils/formatDate';
import Table from '../../../../components/Table';
import { useGames } from '../../../../context/GamesContext';

interface ITablePageProps {
  data: GameProps[];
}

export const TablePage = ({ data }: ITablePageProps) => {
  const { handleToggleFavorite } = useGames();

  return data?.length ? (
    <Table
      headers={[
        ' ',
        'Title',
        'Description',
        'Category',
        'Release Date',
        'Favorite',
        ' ',
      ]}
      data={
        data?.map(game => [
          game.imageUrl ??
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGzoB0iNupD1n4X2hMt8a0abTvs9rszQHLw&s',
          game.title,
          game.description ?? '-',
          game.category.title ?? '-',
          game.endDate ? formatDate(game.endDate?.toString() ?? '') : '-',
          game.isFavorite,
        ]) || []
      }
      includeImage
      indexPositionImage={0}
      indexPositionFavorite={5}
      hasIconFavorite
      onDelete={() => {}}
      onEdit={() => {}}
      onView={() => {}}
      onToggleFavorite={id => handleToggleFavorite(data[id]?.id ?? '')}
      sortDirection={'asc'}
      onSort={() => {}}
    />
  ) : (
    <MessageEmpty message="No games found" />
  );
};
