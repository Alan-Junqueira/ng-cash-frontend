import { SyntheticEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignIn, User } from 'phosphor-react';

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
import { UserContext } from '../../../../contexts/userContext';

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();

  //* CONTEXT
  const {
    changeAccountId,
    changeUserId,
    changeUserToken,
    changeUsername,
    token
  } = useContext(UserContext);

  //* Icons
  const [eyeColor, setEyeColor] = useState('#AFB6C2');
  const [lockColor, setLockColor] = useState('#AFB6C2');
  const [envelopeColor, setEnvelopeColor] = useState('#AFB6C2');

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

      const { user, status, message } = response.data;

      const { token, accountId, username: loggedUsername, id } = user;

      if (status) {
        changeAccountId(accountId);
        changeUserId(id);
        changeUserToken(token);
        changeUsername(loggedUsername);
        alert(message);

        navigate('/');
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
          <User size={20} weight='bold'/>
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
        <button type="button" onClick={handleEyeClick}>
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
