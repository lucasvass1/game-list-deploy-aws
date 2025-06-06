import React from 'react';
import { GameProps } from '../../../../services/games/list';
import { MessageEmpty } from '../../../../components/MessageEmpty';
import { formatDate } from '../../../../utils/formatDate';
import Table from '../../../../components/Table';
import { useGameTable } from '../../useGameTable';
import Modal from '../../../../components/Modal/Modal.tsx';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal.tsx';

interface ITablePageProps {
  data: GameProps[];
  message?: string;
}

export const TablePage = ({ data, message }: ITablePageProps) => {
  const {
    selectedId,
    isView,
    isUpdate,
    isDelete,
    close,
    handleOpenDelete,
    handleOpenEdit,
    handleOpenView,
    handleDelete,
    handleSave,
    handleSort,
    handleToggleOrder,
    handleToggleFavoriteGame,
  } = useGameTable(data);

  return (
    <>
      <Modal
        isOpen={isUpdate || isView}
        onClose={close}
        title={isView ? 'View Game' : 'Edit Game'}
        buttonTitle="UPDATE"
        onSave={handleSave}
        isFavorite
        isDates
        isCategoryRow
        isStatus
        isUrl
        isGameTitle
        isDescription
        idGameSelected={selectedId}
        isUpdateGame
        isView={isView}
      />
      <DeleteModal
        isOpen={isDelete}
        onClose={close}
        onDelete={handleDelete}
        message="Deleting this game will remove it permanently from the system. This action is not reversible."
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
          data={data.map(game => [
            game.imageUrl ??
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGzoB0iNupD1n4X2hMt8a0abTvs9rszQHLw&s',
            game.title,
            game.description ?? '-',
            game.category.name ?? '-',
            game.endDate ? formatDate(game.endDate?.toString() ?? '') : '-',
            game.isFavorite,
          ])}
          includeImage
          indexPositionImage={0}
          indexPositionFavorite={5}
          hasIconFavorite
          onDelete={handleOpenDelete}
          onEdit={handleOpenEdit}
          onView={handleOpenView}
          onToggleFavorite={handleToggleFavoriteGame}
          sortDirection={handleToggleOrder}
          onSort={handleSort}
        />
      ) : (
        <MessageEmpty message={message ?? 'No games found'} />
      )}
    </>
  );
};
