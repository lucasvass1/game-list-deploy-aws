import React from 'react';
import Modal from '../../components/Modal/Modal.tsx';
import DeleteModal from '../../components/DeleteModal/DeleteModal.tsx';

export const Categories = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  return (
    <>













    
      {/* MODAIS */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Category"
        buttonTitle="Save Category +"
        onSave={() => {}}
        isGameTitle={true}
        isDescription={true}
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={() => {}}
      />
    </>
  );
};
