import React, { useEffect } from 'react';
import { PlataformProps } from '../../../services/plataform/list/index.ts';
import { MessageEmpty } from '../../../components/MessageEmpty';
import Table from '../../../components/Table';
import { PropsSortBy, usePlataforms } from '../../../context/PlataformsContext';
import { formatDate } from '../../../utils/formatDate.ts';
import Modal, { PlatformFormData } from '../../../components/Modal/Modal.tsx';
import { AddNewGameButton } from '../../Games/components/FiltersTable/styles.ts';
import DeleteModal from '../../../components/DeleteModal/DeleteModal.tsx';
import { useLocation } from 'react-router-dom';
import {
  MAP_SORT_BY_PLATFORM,
  PLATFORM_MODAL_CONFIG,
  URL_DEFAULT_IMAGE,
} from '../../../const/index.ts';
import { validateCreatePlatformForm } from '../../../utils/validateCreatePlatformForm.ts';
import { usePlatform } from '../usePlatform.ts';
type ModalType = 'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE';

interface IPlataformTablePageProps {
  data: PlataformProps[];
  message?: string;
}

export const PlataformTablePage = ({
  data,
  message,
}: IPlataformTablePageProps) => {
  const {
    handleRemovePlataform,
    handleCreatePlatform,
    handleUpdatePlatform,
    setSortBy,
    setOrder,
  } = usePlataforms();

  const {
    isCreate,
    isView,
    isUpdate,
    isDelete,
    selectedId,
    openCreate,
    openView,
    openUpdate,
    openDelete,
    close,
    type,
  } = usePlatform();

  const location = useLocation();
  const create = location.search === '?create=true';

  const handleCreate = (formData: PlatformFormData) => {
    if (!validateCreatePlatformForm(formData)) return;
    handleCreatePlatform({
      title: formData?.platformName as string,
      acquisitionYear: formData?.acquisitionDate,
      company: formData?.companyName,
      imageUrl: formData?.imageUrl,
    });
  };

  const handleUpdate = (formData: PlatformFormData) => {
    handleUpdatePlatform({
      id: selectedId,
      title: formData?.platformName as string,
      acquisitionYear: formData?.acquisitionDate,
      company: formData?.companyName,
      imageUrl: formData?.imageUrl,
    });
    close();
  };

  const handleDelete = () => {
    if (!selectedId) return;
    handleRemovePlataform(selectedId);
    close();
  };

  useEffect(() => {
    if (create) {
      openCreate();
    }
  }, [create, location.pathname, openCreate]);

  return (
    <>
      <Modal
        isOpen={isCreate || isView || isUpdate}
        onClose={close}
        title={PLATFORM_MODAL_CONFIG[type as ModalType].title}
        buttonTitle={PLATFORM_MODAL_CONFIG[type as ModalType].button}
        onSave={(formData: any) => {
          if (type === 'CREATE') handleCreate(formData);
          if (type === 'UPDATE') handleUpdate(formData);
        }}
        isCompany={true}
        isCompanyTitle={true}
        isView={isView}
        idPlatformSelected={selectedId}
        isUpdatePlatform={type === 'UPDATE' || type === 'VIEW'}
      />
      <DeleteModal
        isOpen={isDelete}
        onClose={close}
        onDelete={handleDelete}
        message="Deleting this game will remove permanently from system. This action is not reversible."
      />
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <AddNewGameButton onClick={openCreate}>NEW PLATFORM</AddNewGameButton>
      </div>
      {data?.length ? (
        <Table
          headers={[
            ' ',
            'Title',
            'Company',
            'Acquisition year',
            'Created at',
            'Update at',
            ' ',
          ]}
          data={
            data?.map(plataform => [
              plataform?.imageUrl ?? URL_DEFAULT_IMAGE,
              plataform?.title,
              plataform?.company || '-',
              plataform?.acquisitionYear
                ? formatDate(plataform.acquisitionYear.toString() ?? '')
                : '-',
              formatDate(plataform?.createdAt ?? ''),
              plataform?.updatedAt
                ? formatDate(plataform?.updatedAt ?? '')
                : '-',
            ]) || []
          }
          onDelete={index => openDelete(data[index]?.id ?? '')}
          sortDirection={() =>
            setOrder(oldState => (oldState === 'asc' ? 'desc' : 'asc'))
          }
          onSort={index => {
            const sort = MAP_SORT_BY_PLATFORM[index];

            setSortBy(sort as PropsSortBy);
          }}
          includeImage
          onView={index => openView(data[index]?.id ?? '')}
          onEdit={index => openUpdate(data[index]?.id ?? '')}
          hasIconFavorite={false}
        />
      ) : (
        <MessageEmpty message={message ?? 'No plataforms found'} />
      )}
    </>
  );
};
