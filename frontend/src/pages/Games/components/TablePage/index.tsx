import React, { useState } from 'react';
import { GameProps } from '../../../../services/games/list';
import { MessageEmpty } from '../../../../components/MessageEmpty';
import { formatDate } from '../../../../utils/formatDate';
import Table from '../../../../components/Table';
import { PropsSortBy, useGames } from '../../../../context/GamesContext';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal.tsx';
import Modal from '../../../../components/Modal/Modal.tsx';
import { StatusGames } from '../../../../services/games/create/index.ts';

interface ITablePageProps {
  data: GameProps[];
  message?: string;
}

export const TablePage = ({ data, message }: ITablePageProps) => {
  const {
    handleToggleFavorite,
    handleRemoveGame,
    handleUpdateGame,
    setSortBy,
    setOrder,
  } = useGames();
  const [isShowModalDeleteGame, setIsShowModalDeleteGame] =
    useState<boolean>(false);
  const [gameSelected, setGameSelected] = useState<string>();
  const [isShowModalUpdateGame, setIsShowModalUpdateGame] =
    useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);

  const MAP_SORT_BY = [
    'image',
    'title',
    'description',
    'category',
    'createdAt',
    'updatedAt',
    'favorite',
  ];

  return (
    <>
      <Modal
        isOpen={isShowModalUpdateGame}
        onClose={() => setIsShowModalUpdateGame(false)}
        title="Edit Game"
        buttonTitle="UPDATE"
        onSave={formData =>
          handleUpdateGame({
            id: gameSelected as string,
            description: formData?.description,
            status: formData?.status as StatusGames,
            title: formData?.title,
            categoryId: formData?.category,
            endDate: formData?.finishDate,
            imageUrl: formData?.imageUrl,
            isFavorite: formData?.favorite,
            plataformId: formData?.platform,
          })
        }
        isFavorite={true}
        isDates={true}
        isCategoryRow={true}
        isStatus={true}
        isUrl={true}
        isGameTitle={true}
        isDescription={true}
        idGameSelected={gameSelected}
        isUpdateGame
        isView={isView}
      />
      <DeleteModal
        isOpen={isShowModalDeleteGame}
        onClose={() => setIsShowModalDeleteGame(false)}
        onDelete={() => handleRemoveGame(gameSelected ?? '')}
        message="Deleting this game will remove permanently from system. This action is not reversible."
      />
      {data?.length ? (
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
          onDelete={index => {
            setGameSelected(data[index]?.id);
            setIsShowModalDeleteGame(true);
          }}
          onEdit={index => {
            setGameSelected(data[index]?.id);
            setIsView(false);
            setIsShowModalUpdateGame(true);
          }}
          onView={index => {
            setGameSelected(data[index]?.id);
            setIsView(true);
            setIsShowModalUpdateGame(true);
          }}
          onToggleFavorite={id => handleToggleFavorite(data[id]?.id ?? '')}
          sortDirection={() =>
            setOrder(oldState => (oldState === 'asc' ? 'desc' : 'asc'))
          }
          onSort={index => {
            const sort = MAP_SORT_BY[index];

            setSortBy(sort as PropsSortBy);
          }}
        />
      ) : (
        <MessageEmpty message={message ?? 'No games found'} />
      )}
    </>
  );
};
