import React from 'react';

import { FormRegister } from '../../components/formRegister/FormRegister.tsx';
import { Container } from './styles.ts';
export function Register() {
  return (
    <Container>
      <FormRegister
        title="Cadastro"
        instruction="Cadastre-se para acessar o sistema"
        login="Já tem uma conta?"
        linkLogin="/"
        textLink="Entrar agora"
      />
    </Container>
  );
}
