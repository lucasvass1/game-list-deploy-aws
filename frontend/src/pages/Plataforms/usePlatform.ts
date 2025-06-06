import { useState } from 'react';

type ModalType = 'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE';

type ModalState =
  | { type: 'CREATE' }
  | { type: 'VIEW' | 'UPDATE' | 'DELETE'; id: string }
  | null;

export const usePlatform = () => {
  const [modalState, setModalState] = useState<ModalState>(null);

  const openCreate = () => setModalState({ type: 'CREATE' });
  const openView = (id: string) => setModalState({ type: 'VIEW', id });
  const openUpdate = (id: string) => setModalState({ type: 'UPDATE', id });
  const openDelete = (id: string) => setModalState({ type: 'DELETE', id });
  const close = () => setModalState(null);

  const isOpen = (type: ModalType) => modalState?.type === type;
  const selectedId =
    modalState && 'id' in modalState ? modalState.id : undefined;
  const type = modalState?.type ?? 'CREATE';

  return {
    isCreate: isOpen('CREATE'),
    isView: isOpen('VIEW'),
    isUpdate: isOpen('UPDATE'),
    isDelete: isOpen('DELETE'),
    selectedId,
    type,

    openCreate,
    openView,
    openUpdate,
    openDelete,
    close,
  };
};
