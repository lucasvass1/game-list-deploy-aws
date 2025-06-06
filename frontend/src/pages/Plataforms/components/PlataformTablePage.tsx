import React, { useEffect, useState } from 'react';
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
type ModalType = 'CREATE' | 'VIEW' | 'UPDATE';

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
  const [plataformSelected, setPlataformSelected] = useState<string>();
  const [isShowModalAddPlataforms, setIsShowModalAddPlataforms] =
    useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<
    'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE'
  >('CREATE');
  const [isView, setIsView] = useState<boolean>(false);
  const [isShowModalDeletPlatform, setIsShowModalDeletPlatform] =
    useState<boolean>(false);
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
      id: plataformSelected,
      title: formData?.platformName as string,
      acquisitionYear: formData?.acquisitionDate,
      company: formData?.companyName,
      imageUrl: formData?.imageUrl,
    });
  };

  const handleOpenCreateModal = () => {
    setTypeModal('CREATE');
    setIsShowModalAddPlataforms(true);
    setIsView(false);
    setPlataformSelected(undefined);
  };

  useEffect(() => {
    if (create) {
      setTypeModal('CREATE');
      setIsShowModalAddPlataforms(true);
      setIsView(false);
      setPlataformSelected(undefined);
    }
  }, [create, location.pathname]);

  return (
    <>
      <Modal
        isOpen={isShowModalAddPlataforms}
        onClose={() => setIsShowModalAddPlataforms(false)}
        title={PLATFORM_MODAL_CONFIG[typeModal as ModalType].title}
        buttonTitle={PLATFORM_MODAL_CONFIG[typeModal as ModalType].button}
        onSave={(formData: any) => {
          if (typeModal === 'CREATE') handleCreate(formData);
          if (typeModal === 'UPDATE') handleUpdate(formData);
        }}
        isCompany={true}
        isCompanyTitle={true}
        isView={isView}
        idPlatformSelected={plataformSelected}
        isUpdatePlatform={typeModal === 'UPDATE' || typeModal === 'VIEW'}
      />
      <DeleteModal
        isOpen={isShowModalDeletPlatform}
        onClose={() => setIsShowModalDeletPlatform(false)}
        onDelete={() => handleRemovePlataform(plataformSelected ?? '')}
        message="Deleting this game will remove permanently from system. This action is not reversible."
      />
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <AddNewGameButton onClick={handleOpenCreateModal}>
          NEW PLATFORM
        </AddNewGameButton>
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
          onDelete={index => {
            setPlataformSelected(data[index]?.id);
            setIsShowModalDeletPlatform(true);
          }}
          sortDirection={() =>
            setOrder(oldState => (oldState === 'asc' ? 'desc' : 'asc'))
          }
          onSort={index => {
            const sort = MAP_SORT_BY_PLATFORM[index];

            setSortBy(sort as PropsSortBy);
          }}
          includeImage
          onView={index => {
            setPlataformSelected(data[index]?.id);
            setIsView(true);
            setTypeModal('VIEW');
            setIsShowModalAddPlataforms(true);
          }}
          onEdit={index => {
            setPlataformSelected(data[index]?.id);
            setIsView(false);
            setTypeModal('UPDATE');
            setIsShowModalAddPlataforms(true);
          }}
          hasIconFavorite={false}
        />
      ) : (
        <MessageEmpty message={message ?? 'No plataforms found'} />
      )}
    </>
  );
};
