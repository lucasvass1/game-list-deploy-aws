import React, { useState } from 'react';
import { ButtonLogin } from '../btn_login/BtnLogin.tsx';
import {
  Container,
  ContainerForm,
  ContainerText,
  TextLink,
  TextLogin,
} from './styles.ts';
import { Input } from '../input/index.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { toast } from 'react-toastify';
import { LoginImage } from '../ImageTest/LoginImage.tsx';
interface FormProps {
  title: string;
  instruction: string;
  login: string;
  linkLogin?: string;
  textLink?: string;
}

export function Form({
  title,
  instruction,
  login,
  linkLogin = '#',
  textLink,
}: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email.length || !password.length) {
      toast.error('Fill in all fields');
      return;
    }
    signIn(email, password);
  }

  return (
    <Container>
      <ContainerText>
        <LoginImage />
        <h1 className={'textTitle'}>{title}</h1>
        <p className={'textP'}>{instruction}</p>
      </ContainerText>

      <ContainerForm onSubmit={handleLogin}>
        <Input
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />

        <ButtonLogin type="submit" name="LOGIN" />
      </ContainerForm>
      <div>
        <TextLogin>
          {login} <TextLink href={linkLogin}>{textLink}</TextLink>
        </TextLogin>
      </div>
    </Container>
  );
}
