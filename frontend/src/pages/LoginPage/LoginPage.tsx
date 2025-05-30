import React from "react";
import Card from "../../components/Card/Card.tsx";
import Modal from "../../components/Modal/Modal.tsx";

//TODO: fazer o card receber a quantidade de jogos

const Login = () => {
  const [showModal, setShowModal] = React.useState(true);
  const handleDelete = () => {
    setShowModal(false);
  };
  return (
    <div className="Login">
      <Card title="Games" dinamicNumber={1} buttonRedirect="/games" />
      <Card title="Players" dinamicNumber={1} buttonRedirect="/players" />
      <Modal title="New gae" isOpen={showModal} onClose={handleDelete} />
    </div>
  );
};

export default Login;
