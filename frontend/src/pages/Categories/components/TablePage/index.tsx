import React, { useState } from 'react';
import { CategoryListResponse } from '../../../../services/category/list';
import { MessageEmpty } from '../../../../components/MessageEmpty';
import { formatDate } from '../../../../utils/formatDate';
import Table from '../../../../components/Table';
import {
  PropsSortBy,
  useCategories,
} from '../../../../context/CategoriesContext';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal.tsx';
import Modal from '../../../../components/Modal/Modal.tsx';
import { MAP_SORT_BY_CATEGORIES } from '../../../../const/index.ts';

interface ITablePageProps {
  data: CategoryListResponse['categories'];
  message?: string;
}

export const TablePage = ({ data, message }: ITablePageProps) => {
  const { handleRemoveCategory, handleUpdateCategory, setOrder, setSortBy } =
    useCategories();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<string>();
  const [isView, setIsView] = useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar categoria"
        buttonTitle="ATUALIZAR"
        onSave={formData => {
          handleUpdateCategory({
            id: categorySelected as string,
            description: formData?.description,
            title: formData?.title,
          });
          setIsModalOpen(false);
        }}
        isGameTitle
        isDescription
        idGameSelected={categorySelected}
        isUpdateGame
        isView={isView}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          handleRemoveCategory(categorySelected ?? '');
          setIsDeleteModalOpen(false);
        }}
        message="Excluir esta categoria a removerá permanentemente do sistema. Essa ação não pode ser desfeita."
      />
      {data?.length ? (
        <Table
          headers={['Título', 'Descrição', 'Criado em', 'Atualizado em', ' ']}
          data={
            data?.map(category => [
              category.title,
              category.description ?? '-',
              formatDate(category.createdAt ?? ''),
              formatDate(category.updatedAt ?? ''),
            ]) || []
          }
          onDelete={index => {
            setCategorySelected(data[index]?.id);
            setIsDeleteModalOpen(true);
          }}
          onEdit={index => {
            setCategorySelected(data[index]?.id);
            setIsView(false);
            setIsModalOpen(true);
          }}
          onView={index => {
            setCategorySelected(data[index]?.id);
            setIsView(true);
            setIsModalOpen(true);
          }}
          sortDirection={() =>
            setOrder(oldState => (oldState === 'asc' ? 'desc' : 'asc'))
          }
          onSort={index => {
            const sort = MAP_SORT_BY_CATEGORIES[index];

            setSortBy(sort as PropsSortBy);
          }}
        />
      ) : (
        <MessageEmpty message={message ?? 'Nenhuma categoria encontrada'} />
      )}
    </>
  );
};
