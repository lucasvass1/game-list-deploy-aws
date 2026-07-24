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
import { ComponentPasswordValidate } from '../ComponentPasswordValidate/index.tsx';
import { IPropsErrosRequest } from '../../interface/errors-request.ts';

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
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: mutateRegisterUser } = useMutation({
    mutationFn: register,
    onSuccess: (data: RegisterUserResponse) => {
      toast.success('Usuário cadastrado com sucesso!');
      signIn(email, password);
      navigate('/');
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return;
      }
      toast.error(error.message || 'Requisição inválida');
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

    const validationErrors: Record<string, string> = {};

    if (!name.trim()) {
      validationErrors.name = 'Nome é obrigatório.';
    } else if (name.trim().length < 3) {
      validationErrors.name = 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (!email.trim()) {
      validationErrors.email = 'E-mail é obrigatório.';
    } else if (!validateEmail(email.trim())) {
      validationErrors.email = 'E-mail inválido.';
    }

    if (!password) {
      validationErrors.password = 'Senha é obrigatória.';
    } else if (!validatePassword(password)) {
      validationErrors.password =
        'A senha deve ter pelo menos 8 caracteres e incluir letras, números e caracteres especiais.';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'As senhas não coincidem.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach(err => toast.error(err));
      return;
    }

    setErrors({});

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
          label="Nome completo"
          placeholder="Seu nome"
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          error={errors.name}
        />

        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          error={errors.password}
        />

        {isPasswordFocused && password.length > 0 && (
          <ComponentPasswordValidate password={password} />
        )}

        <Input
          label="Confirmar senha"
          placeholder="Repita sua senha"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

        <ButtonLogin type="submit" name="CADASTRAR" />
      </ContainerForm>

      <div>
        <TextLogin>
          {login} <TextLink href={linkLogin}>{textLink}</TextLink>
        </TextLogin>
      </div>
    </Container>
  );
}
