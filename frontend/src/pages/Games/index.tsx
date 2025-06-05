import React from 'react';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from './components/TablePage';
import { FiltersTable } from './components/FiltersTable';
import { Pagination } from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal.tsx';
import { StatusGames } from '../../services/games/create/index.ts';
import { useGames } from '../../context/GamesContext';

export function Games() {
  const { page, setPage, dataGems: data, handleCreateGame } = useGames();
  const location = useLocation();
  const create = location.search === '?create=true';
  const [modalOpen, setModalOpen] = React.useState(true);

  return (
    <>
      <ContainerPage>
        {create ? (
           <Modal
           isOpen={modalOpen}
           onClose={() => setModalOpen(false)}
           title="New Game"
           buttonTitle="CREATE"
           onSave={formData =>
             handleCreateGame({
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
         />
        ) : null}
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
      </ContainerPage>
    </>
  );
}
