import { SyntheticEvent, useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { api } from '../../../../lib/axios';
import { UserContext } from '../../../../contexts/userContext';

import { SignIn, User } from 'phosphor-react';

import { Eye } from '../../../../assets/Eye';
import { LockSimple } from '../../../../assets/LockSimple';
import { Envelope } from '../../../../assets/Envelope';

import {
  RegisterFormContainer,
  RegisterSubtitle,
  RegisterTitle,
  RegisterText,
  InputPassword,
  InputUser,
  InputUserContainer,
  InputPasswordContainer
} from './styled';

const RegisterSchema = z.object({
  username: z.string(),
  // .min(3, 'Usuário deve ter ao menos 3 digitos'),
  password: z.string()
  // .min(8, 'Senha deve ter ao menos 8 digitos')
  // .regex(
  //   /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$]{8,}$/,
  //   'Senha deve ter 1 letra Maiuscula, 1 número e no mínimo 8 digitos'
  // )
});

type NewRegisterFormInputs = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    changeAccountId,
    changeUserId,
    changeUserToken,
    changeUsername,
    token
  } = useContext(UserContext);

  // ICONS
  const [eyeColor, setEyeColor] = useState('#AFB6C2');
  const [lockColor, setLockColor] = useState('#AFB6C2');
  const [envelopeColor, setEnvelopeColor] = useState('#AFB6C2');

  // INPUT VALIDATION ERRORS
  const [usernameToValidate, setUsernameToValidate] = useState('');
  const [passwordToValidate, setPasswordToValidate] = useState('');

  const result = RegisterSchema.safeParse({
    username: usernameToValidate,
    password: passwordToValidate
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<NewRegisterFormInputs>({
    resolver: zodResolver(RegisterSchema)
  });

  // REGISTER NEW USER
  async function handleRegisterNewUser(data: NewRegisterFormInputs) {
    const { password, username } = data;

    let passwordRegex = new RegExp(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$]{8,}$/);

    if (username.length < 3) {
      alert('Usuário deve ter no mínio 3 digitos.');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Senha deve ter 1 letra Maiuscula, 1 número e no mínimo 8 digitos');
      return;
    }

    setUsernameToValidate(username);
    setPasswordToValidate(password);

    try {
      const response = await api.post('users/', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          password,
          username
        }
      });

      const { status, user, message } = await response.data;

      const { token, accountId, username: createdUsername, id } = user;

      if (status) {
        changeAccountId(accountId);
        changeUserId(id);
        changeUserToken(token);
        changeUsername(createdUsername);

        reset();

        alert(message);
        navigate('/');
      } else {
        changeUserToken('');
        return alert('Não foi possível criar a conta');
      }
    } catch (error: any) {
      let requestMessage = error.response.data.message;
      if (requestMessage.length > 1) {
        return alert(requestMessage);
      }
      return;
    }
  }

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

  return (
    <RegisterFormContainer onSubmit={handleSubmit(handleRegisterNewUser)}>
      <RegisterTitle>
        <SignIn color="#FFC632" /> Faça seu cadastro
      </RegisterTitle>
      <RegisterSubtitle>
        Entre com suas informações de cadastro
      </RegisterSubtitle>
      <label htmlFor="username">Usuário</label>
      <InputUserContainer envelopeColor={envelopeColor}>
        <span>
          <User size={20} weight="bold" />
        </span>
        <InputUser
          id="username"
          type="text"
          placeholder="Usuário"
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
          placeholder="Senha"
          {...register('password')}
          onFocus={() => setLockColor('#FFC632')}
          onBlur={() => setLockColor('#AFB6C2')}
        />
        <button type="button" onClick={handleEyeClick}>
          <Eye />
        </button>
      </InputPasswordContainer>
      <button type="submit" disabled={isSubmitting}>
        Cadastrar
      </button>
      <RegisterText>
        Já possui uma conta? <Link to="/login">Login</Link>
      </RegisterText>
    </RegisterFormContainer>
  );
};
