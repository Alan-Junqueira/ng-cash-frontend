import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignIn } from 'phosphor-react';

import { Eye } from '../../../../assets/Eye';
import { LockSimple } from '../../../../assets/LockSimple';
import { Envelope } from '../../../../assets/Envelope';

import {
  LoginFormContainer,
  LoginSubtitle,
  LoginTitle,
  RegisterText,
  InputPassword,
  InputUser,
  InputUserContainer,
  InputPasswordContainer,
  ButtonSubmit
} from './styled';
import { useForm } from 'react-hook-form';
import { api } from '../../../../lib/axios';

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  //* Icons
  const [eyeColor, setEyeColor] = useState('#AFB6C2');
  const [lockColor, setLockColor] = useState('#AFB6C2');
  const [envelopeColor, setEnvelopeColor] = useState('#AFB6C2');

  //* REQUESTS
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('ng-cash-v:1.0.0'));

    console.log(token);
  }, [token]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  });

  function handleEyeClick(event: SyntheticEvent) {
    event.preventDefault();
    let inputPassword = document.querySelector('#password');

    if (inputPassword === null) {
      return console.log('Não foi possível alterar o campo');
    }

    if (eyeColor === '#AFB6C2') {
      setEyeColor('#FFC632');
    } else {
      setEyeColor('#AFB6C2');
    }

    if (inputPassword.getAttribute('type') == 'password') {
      inputPassword.setAttribute('type', 'text');
    } else {
      inputPassword.setAttribute('type', 'password');
    }
  }

  async function handleLoginSubmit(data: LoginFormInputs) {
    const { password, username } = data;

    try {
      const response = await api.post('users/login/', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          password,
          username
        }
      });

      const {
        user,
        status,
        message
      } = response.data;

      console.log(user)
      const {token, accountId, username: loggedUsername, id} = user

      if (status) {
        localStorage.setItem('ng-cash-v:1.0.0', user.token);
        setToken(response.data.token);

        return alert(message);
      } else {
        return alert('Erro ao fazer login');
      }
    } catch (error: any) {
      let requestMessage = error.response.data.message;
      return alert(requestMessage);
    }
  }

  return (
    <LoginFormContainer onSubmit={handleSubmit(handleLoginSubmit)}>
      <LoginTitle>
        <SignIn color="#FFC632" /> Faça seu login
      </LoginTitle>
      <LoginSubtitle>Entre com suas informações de cadastro</LoginSubtitle>
      <label htmlFor="username">Usuário</label>
      <InputUserContainer envelopeColor={envelopeColor}>
        <span>
          <Envelope />
        </span>
        <InputUser
          id="username"
          type="text"
          placeholder="Digite seu usuário"
          {...register('username')}
          onFocus={() => setEnvelopeColor('#FFC632')}
          onBlur={() => setEnvelopeColor('#AFB6C2')}
        />
      </InputUserContainer>
      <label htmlFor="password">Senha</label>
      <InputPasswordContainer eyeColor={eyeColor} lockColor={lockColor}>
        <span>
          <LockSimple />
        </span>
        <InputPassword
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
          onFocus={() => setLockColor('#FFC632')}
          onBlur={() => setLockColor('#AFB6C2')}
        />
        <button onClick={handleEyeClick}>
          <Eye />
        </button>
      </InputPasswordContainer>
      <ButtonSubmit type="submit" disabled={isSubmitting}>
        Entrar
      </ButtonSubmit>
      <RegisterText>
        Não tem uma conta? <Link to="/register">Registre-se</Link>
      </RegisterText>
    </LoginFormContainer>
  );
};
