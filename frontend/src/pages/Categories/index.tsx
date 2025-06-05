import React from 'react';
import Modal from '../../components/Modal/Modal.tsx';
import DeleteModal from '../../components/DeleteModal/DeleteModal.tsx';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from './components/TablePage/index.tsx';
import { Pagination } from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import { useCategories } from '../../context/CategoriesContext';

export const Categories = () => {
  const [modalOpen, setModalOpen] = React.useState(true);
  const location = useLocation();
  const { page, setPage } = useCategories();
  const create = location.search === '?create=true';
  const { dataCategories } = useCategories();

  return (
    
    <>
      <ContainerPage>
        {create ? (
           <Modal
           isOpen={modalOpen}
           onClose={() => setModalOpen(false)}
           title="New Category"
           buttonTitle="Save Category +"
           onSave={() => {

           }}
           isGameTitle={true}
           isDescription={true}
         />
        ) : null}

        <TablePage data={dataCategories?.categories ?? []} />
        {dataCategories?.categories?.length ? (
          <Pagination
            currentPage={page}
            totalPages={
              dataCategories?.categories.length / dataCategories?.categories.length > 1 ? dataCategories?.categories.length / dataCategories?.categories.length : 1
            }
            onPageChange={currentPage => setPage(currentPage)}
          />
        ) : null}
      </ContainerPage>
    </>
  );
};
