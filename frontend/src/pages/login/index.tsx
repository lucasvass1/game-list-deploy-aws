import React from 'react';
import { Form } from '../../components/form/Form.tsx';
import { Container } from './styles.ts';

export function Login() {
  return (
    <Container>
      <Form
        title="Login"
        instruction="Enter your credentials to access your account"
        login="Don’t have an account?"
        linkLogin="/register"
        textLink="Register now"
      />
    </Container>
  );
}
