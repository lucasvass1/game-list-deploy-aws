import React from 'react';
import { Form } from '../../components/form/Form.tsx';
import { Container } from './styles.ts';

export function Login() {
  return (
    <Container>
      <Form
        title="Entrar"
        instruction="Digite suas credenciais para acessar sua conta"
        login="Não tem uma conta?"
        linkLogin="/register"
        textLink="Cadastre-se agora"
      />
    </Container>
  );
}
