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
  const MAP_SORT_BY = [
    '',
    'title',
    'company',
    'acquisitionYear',
    'createdAt',
    'updatedAt',
  ];

  const MAP_TYPE_MODAL = {
    CREATE: {
      textTitle: 'New Platform',
      textButton: 'Save Platform +',
      onSave: (formData: PlatformFormData) => {
        handleCreatePlatform({
          title: formData?.platformName as string,
          acquisitionYear: formData?.acquisitionDate,
          company: formData?.companyName,
          imageUrl: formData?.imageUrl,
        });
      },
    },
    UPDATE: {
      textTitle: 'Edit Platform',
      textButton: 'Edit Platform +',
      onSave: (formData: PlatformFormData) => {
        handleUpdatePlatform({
          id: plataformSelected,
          title: formData?.platformName as string,
          acquisitionYear: formData?.acquisitionDate,
          company: formData?.companyName,
          imageUrl: formData?.imageUrl,
        });
      },
    },
    VIEW: {
      textTitle: 'Details Platform',
      textButton: '',
      onSave: (formData: PlatformFormData) => {
        console.log('form', formData);
      },
    },
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
        title={
          MAP_TYPE_MODAL[typeModal as 'CREATE' | 'UPDATE' | 'VIEW'].textTitle
        }
        buttonTitle={
          MAP_TYPE_MODAL[typeModal as 'CREATE' | 'UPDATE' | 'VIEW'].textButton
        }
        onSave={(formData: any) =>
          MAP_TYPE_MODAL[typeModal as 'CREATE' | 'UPDATE' | 'VIEW'].onSave(
            formData,
          )
        }
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
        <AddNewGameButton
          onClick={() => {
            setTypeModal('CREATE');
            setIsShowModalAddPlataforms(true);
            setIsView(false);
            setPlataformSelected(undefined);
          }}
        >
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
              plataform?.imageUrl ??
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGzoB0iNupD1n4X2hMt8a0abTvs9rszQHLw&s',
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
            const sort = MAP_SORT_BY[index];

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
