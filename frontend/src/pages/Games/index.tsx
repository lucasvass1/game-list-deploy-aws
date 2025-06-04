import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from './components/TablePage';
import { FiltersTable } from './components/FiltersTable';
import { Pagination } from '../../components/Pagination';
import { useGames } from '../../context/GamesContext';
import Modal from '../../components/Modal/Modal.tsx';
import DeleteModal from '../../components/DeleteModal/DeleteModal.tsx';

export function Games() {
  const { page, setPage, dataGems: data } = useGames();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  return (
    <ContainerPage>
      <FiltersTable />
      <TablePage data={data?.games ?? []} />

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
        title="New Game"
        buttonTitle="CREATE"
        onSave={() => {}}
        isFavorite={true}
        isDates={true}
        isCategoryRow={true}
        isStatus={true}
        isUrl={true}
        isGameTitle={true}
        isDescription={true}
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={() => {}}
      />
    </ContainerPage>
  );
}
