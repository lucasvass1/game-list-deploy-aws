import { useState } from 'react';
import { GameProps } from '../../services/games/list';
import { PropsSortBy, useGames } from '../../context/GamesContext';
import { StatusGames } from '../../services/games/update';
type ModalType = 'VIEW' | 'UPDATE' | 'DELETE';
type ModalState =
  | { type: 'CREATE' }
  | { type: 'VIEW' | 'UPDATE' | 'DELETE'; id: string }
  | null;

export function useGameTable(data: GameProps[]) {
  const {
    handleToggleFavorite,
    handleRemoveGame,
    handleUpdateGame,
    setSortBy,
    setOrder,
  } = useGames();
  const [modalState, setModalState] = useState<ModalState>(null);
  const openUpdate = (id: string) => setModalState({ type: 'UPDATE', id });
  const openDelete = (id: string) => setModalState({ type: 'DELETE', id });
  const openView = (id: string) => setModalState({ type: 'VIEW', id });
  const close = () => setModalState(null);
  const isOpen = (type: ModalType) => modalState?.type === type;
  const selectedId =
    modalState && 'id' in modalState ? modalState.id : undefined;
  const type = modalState?.type ?? 'UPDATE';

  const MAP_SORT_BY = [
    'image',
    'title',
    'description',
    'categoryId',
    'createdAt',
    'isFavorite',
  ];

  const handleOpenDelete = (index: number) => {
    openDelete(data[index]?.id ?? '');
  };

  const handleOpenEdit = (index: number) => {
    openUpdate(data[index]?.id ?? '');
  };

  const handleOpenView = (index: number) => {
    openView(data[index]?.id ?? '');
  };

  const handleDelete = () => {
    handleRemoveGame(selectedId ?? '');
    close();
  };

  const handleSave = (formData: any) => {
    handleUpdateGame({
      id: selectedId as string,
      description: formData?.description,
      status: formData?.status as StatusGames,
      title: formData?.title,
      categoryId: formData?.category,
      endDate: formData?.finishDate,
      imageUrl: formData?.imageUrl,
      isFavorite: formData?.favorite,
      plataformId: formData?.platform,
    });
    close();
  };

  const handleSort = (index: number) => {
    const sort = MAP_SORT_BY[index];
    setSortBy(sort as PropsSortBy);
  };

  const handleToggleOrder = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleToggleFavoriteGame = (index: number) => {
    handleToggleFavorite(data[index]?.id ?? '');
  };

  return {
    isView: isOpen('VIEW'),
    isUpdate: isOpen('UPDATE'),
    isDelete: isOpen('DELETE'),
    selectedId,
    type,
    close,

    handleOpenDelete,
    handleOpenEdit,
    handleOpenView,
    handleDelete,
    handleSave,
    handleSort,
    handleToggleOrder,
    handleToggleFavoriteGame,
  };
}
