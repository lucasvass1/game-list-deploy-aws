import React from "react";
import Card from "../../components/Card/Card.tsx";
import InputModal from "../../components/InputModal/InputModal.tsx";

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
      <InputModal
        isOpen={showModal}
        onClose={handleDelete}
        onClickButton1={() => alert("b1")}
        title="Custom title"
        buttonText1="b1"
      />
    </div>
  );
};

export default Login;
