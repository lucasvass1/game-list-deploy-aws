import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from '../Games/components/TablePage';
import { Pagination } from '../../components/Pagination';
import { useGames } from '../../context/GamesContext';
import Modal from '../../components/Modal/Modal.tsx';
import DeleteModal from '../../components/DeleteModal/DeleteModal.tsx';

export function Plataforms() {
  const { page, setPage, dataGems: data } = useGames();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  return (
    <ContainerPage>
      <TablePage data={data?.games ?? []} message="No plataforms found" />

      {data?.games?.length ? (
        <Pagination
          currentPage={page}
          totalPages={
            data?.total / data?.limit > 1 ? data?.total / data?.limit : 1
          }
          onPageChange={currentPage => setPage(currentPage)}
        />
      ) : null}




      {/* MODAIS */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Platform"
        buttonTitle="Save Platform +"
        onSave={() => {}}
        isCompany={true}
        isCompanyTitle={true}
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={() => {}}
      />
    </ContainerPage>
  );
}
