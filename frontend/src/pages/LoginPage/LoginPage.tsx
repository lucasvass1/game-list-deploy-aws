import React from "react";
import Card from "../../components/Card/Card.tsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.tsx";

//TODO: fazer o card receber a quantidade de jogos

/**
 * Exemplo utilização Table
 *  <Table
        dataHead={[
          " ",
          "Title",
          "Description",
          "Category",
          "Release Date",
          "Favorite",
          " ",
        ]}
        dataBody={[
          [
            "https://i.pinimg.com/474x/dd/90/e3/dd90e38991d09221aa86e4983cd10851.jpg",
            "Game 1",
            "Description 1",
            "Category 1",
            "Release Date 1",
            "Favorite 1",
            " ",
          ],
          [
            "https://i.pinimg.com/474x/dd/90/e3/dd90e38991d09221aa86e4983cd10851.jpg",
            "Game 1",
            "Description 1",
            "Category 1",
            "Release Date 1",
            "Favorite 1",
            " ",
          ],
        ]}
        includeImage
        indexPositionImage={0}
        hasIconFavorite
        indexPositionFavorite={5}
        handleDeleteItem={() => {}}
        handleEditItem={() => {}}
        handleViewItem={() => {}}
      /> 
 * 
 * 
 */

const Login = () => {
  const [showModal, setShowModal] = React.useState(true);
  const handleDelete = () => {
    setShowModal(false);
  };
  return (
    <div className="Login">
      <Card title="Games" dinamicNumber={1} buttonRedirect="/games" />
      <Card title="Players" dinamicNumber={1} buttonRedirect="/players" />
      <DeleteModal
        isOpen={showModal}
        onClose={handleDelete}
        onDelete={handleDelete}
        title="Are you sure?"
        message="Deleting this category will remove all game associated This action is not reversible."
        cancelText="No, cancel action"
        deleteText="Yes, delete this"
      />
    </div>
  );
};

export default Login;
