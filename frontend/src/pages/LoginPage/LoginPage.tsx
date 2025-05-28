import React from "react";
import Card from "../../components/Card/Card.tsx";


//TODO: fazer o card receber a quantidade de jogos
 
const Login = () => {
    return (
        <div className="Login">
            <Card title="Games" dinamicNumber={1} buttonRedirect="/games"/>
            <Card title="Players" dinamicNumber={1} buttonRedirect="/players"/>
        </div>
    );
};

export default Login;
