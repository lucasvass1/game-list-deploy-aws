import React from 'react';

import { FormRegister } from '../../components/formRegister/FormRegister.tsx';
import { Container } from './styles.ts';
export function Register() {
  return (
    <Container>
      <FormRegister
        title="Sign Up"
        instruction="Register yourself to access the system"
        login="Already have an account?"
        linkLogin="/"
        textLink="Login now"
      />
    </Container>
  );
}
