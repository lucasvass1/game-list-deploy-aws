import React, { useEffect } from 'react';
import Modal from '../../components/Modal/Modal.tsx';
import ContainerPage from '../../components/ContainerPage';
import { TablePage } from './components/TablePage/index.tsx';
import { Pagination } from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import { useCategories } from '../../context/CategoriesContext';
import { AddNewGameButton } from '../Games/components/FiltersTable/styles.ts';

export const Categories = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const location = useLocation();
  const { page, setPage } = useCategories();
  const create = location.search === '?create=true';
  const { dataCategories, handleCreateCategory } = useCategories();
  useEffect(() => {
    if (create) {
      setModalOpen(true);
    }
  }, [create, location.pathname]);

  return (
    <>
      <ContainerPage>
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <AddNewGameButton onClick={() => setModalOpen(true)}>
            NEW CATEGORY
          </AddNewGameButton>
        </div>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="New Category"
          buttonTitle="Save Category +"
          onSave={formData => {
            handleCreateCategory({ ...formData });
            setModalOpen(false);
          }}
          isGameTitle={true}
          isDescription={true}
        />

        <TablePage data={dataCategories?.categories ?? []} />
        {dataCategories?.categories?.length ? (
          <Pagination
            currentPage={page}
            totalPages={
              dataCategories?.categories.length /
                dataCategories?.categories.length >
              1
                ? dataCategories?.categories.length /
                  dataCategories?.categories.length
                : 1
            }
            onPageChange={currentPage => setPage(currentPage)}
          />
        ) : null}
      </ContainerPage>
    </>
  );
};
