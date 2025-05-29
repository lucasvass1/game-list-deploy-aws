import React from "react";
import Card from "../../components/Card/Card.tsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.tsx";

//TODO: fazer o card receber a quantidade de jogos
 
const Login = () => {
    const [showModal, setShowModal] = React.useState(true);
    const handleDelete = () => {
        setShowModal(false);
    };
    return (
        <div className="Login">
            <Card title="Games" dinamicNumber={1} buttonRedirect="/games"/>
            <Card title="Players" dinamicNumber={1} buttonRedirect="/players"/>
            <DeleteModal isOpen={showModal} onClose={handleDelete} onDelete={handleDelete} title="Are you sure?" message="Deleting this category will remove all game associated This action is not reversible." cancelText="No, cancel action" deleteText="Yes, delete this"/>
        </div>
    );
};

export default Login;
