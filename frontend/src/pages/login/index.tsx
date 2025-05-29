import React from "react";
import { Container } from "./styles.ts";
import { Form } from "../../components/form/Form.tsx";

export function Login() {
  return (
    <Container>
      <Form
        title="Login"
        instruction="Enter your credentials to access your account"
        login="Don’t have an account?"
        linkLogin="/register"
        textLink="Login now"
      />
    </Container>
  );
}
