import React, { useState } from 'react';
import { CategoryListResponse } from '../../../../services/category/list';
import { MessageEmpty } from '../../../../components/MessageEmpty';
import { formatDate } from '../../../../utils/formatDate';
import Table from '../../../../components/Table';
import { useCategories } from '../../../../context/CategoriesContext';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal.tsx';
import Modal from '../../../../components/Modal/Modal.tsx';

interface ITablePageProps {
  data: CategoryListResponse['categories'];
  message?: string;
}

export const TablePage = ({ data, message }: ITablePageProps) => {
  const { handleRemoveCategory, handleUpdateCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<string>();
  const [isView, setIsView] = useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Category"
        buttonTitle="UPDATE"
        onSave={formData =>
          handleUpdateCategory({
            id: categorySelected as string,
            description: formData?.description,
            title: formData?.title,
          })
        }
        isFavorite={false}
        isDates={true}
        isCategoryRow={true}
        isUrl={false}
        isGameTitle={false}
        isDescription={true}
        idGameSelected={categorySelected}
        isUpdateGame
        isView={isView}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => handleRemoveCategory(categorySelected ?? '')}
        message="Deleting this category will remove permanently from system. This action is not reversible."
      />
      {data?.length ? (
        <Table
          headers={['Title', 'Description', 'Created at', 'Updated at', ' ']}
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
            setIsModalOpen(true);
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
          sortDirection={'asc'}
          onSort={() => {}}
        />
      ) : (
        <MessageEmpty message={message ?? 'No categories found'} />
      )}
    </>
  );
};
