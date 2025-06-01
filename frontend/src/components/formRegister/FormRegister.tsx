import { useState } from 'react';
import { ButtonLogin } from '../btn_login/BtnLogin.tsx';
import { useMutation } from '@tanstack/react-query';
import {
  register,
  RegisterUserResponse,
} from '../../services/users/register/iindex.ts';
import React from 'react';
import {
  Container,
  ContainerForm,
  ContainerText,
  TextLink,
  TextLogin,
} from './styles.ts';
import Logo from './img/logoft.png';
import { Input } from '../input/index.tsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  REGEX_VALIDATE_EMAIL,
  REGEX_VALIDATE_PASSWORD_REGISTER,
} from '../../const/index.ts';

interface FormRegisterProps {
  title: string;
  instruction: string;
  login: string;
  linkLogin: string;
  textLink: string;
}

export function FormRegister({
  title,
  instruction,
  login,
  linkLogin = '#',
  textLink,
}: FormRegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [errors, setErrors] = useState<string[]>([]);

  const { mutate: mutateRegisterUser } = useMutation({
    mutationFn: register,
    onSuccess: (data: RegisterUserResponse) => {
      toast.success('User registered successfully!');
      signIn(email, password);
      navigate('/');
    },
    onError: error => {
      if (error.message) {
        toast.error(error.message);
        return;
      }
      toast.error('Bad Request');
    },
  });

  function validateEmail(email: string) {
    return REGEX_VALIDATE_EMAIL.test(email);
  }

  function validatePassword(password: string) {
    return REGEX_VALIDATE_PASSWORD_REGISTER.test(password);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!name.trim()) validationErrors.push('Name is required.');
    else if (name.trim().length < 3)
      validationErrors.push('Name must be at least 3 characters.');

    if (!email.trim()) validationErrors.push('Email is required.');
    else if (!validateEmail(email.trim()))
      validationErrors.push('Email is not valid.');

    if (!password) validationErrors.push('Password is required.');
    else if (!validatePassword(password))
      validationErrors.push(
        'Password must be at least 8 characters and include letters, numbers, and special characters.',
      );

    if (password !== confirmPassword)
      validationErrors.push('Passwords do not match.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    mutateRegisterUser({
      name,
      email,
      password,
    });
  }

  return (
    <Container>
      <ContainerText>
        <img src={Logo} alt="logo" />
        <h1 className={'textTitle'}>{title}</h1>
        <p className={'textP'}>{instruction}</p>
      </ContainerText>

      <ContainerForm onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="Your name"
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          label="Email"
          placeholder="Your email"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Input
          label="Confirm Password"
          placeholder="Repeat your password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        {errors.length > 0 && (
          <div style={{ color: 'red' }}>
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}

        <ButtonLogin type="submit" name="SIGN UP" />
      </ContainerForm>

      <div>
        <TextLogin>
          {login} <TextLink href={linkLogin}>{textLink}</TextLink>
        </TextLogin>
      </div>
    </Container>
  );
}
