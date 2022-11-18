import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { api } from '../../../../lib/axios';
import { UserContext } from '../../../../contexts/userContext';

import { SignIn } from 'phosphor-react';

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
  // ICONS
  const [eyeColor, setEyeColor] = useState('#AFB6C2');
  const [lockColor, setLockColor] = useState('#AFB6C2');
  const [envelopeColor, setEnvelopeColor] = useState('#AFB6C2');

  // REQUESTS
  const [token, setToken] = useState<string | null>(null);

  // INPUT VALIDATION ERRORS
  const [usernameToValidate, setUsernameToValidate] = useState('');
  const [passwordToValidate, setPasswordToValidate] = useState('');

  const [usernameInputError, setUsernameInputError] = useState('');
  const [passwordInputErrorPartial, setPasswordInputErrorPartial] =
    useState('');
  const [passwordInputErrorComplete, setPasswordInputErrorComplete] =
    useState('');

  const result = RegisterSchema.safeParse({
    username: usernameToValidate,
    password: passwordToValidate
  });

  // function getInputMessageErrors() {
  //   if (!result.success) {
  //     const zodValidationErrors = JSON.parse(result.error as unknown as string);

  //     if (zodValidationErrors.length === 1) {
  //       const field = zodValidationErrors[0].path[0];
  //       const message = zodValidationErrors[0].message;

  //       if (field === 'password') {
  //         if (message) {
  //           setPasswordInputErrorComplete(message);
  //           alert(message);
  //           return;
  //         }
  //       } else if (field === 'username') {
  //         alert(message);
  //         setUsernameInputError(message);
  //         return;
  //       }
  //     } else if (zodValidationErrors.length === 2) {
  //       const usernameOrPasswordField = zodValidationErrors[0].path[0];
  //       const usernameOrPasswordPartialMessage = zodValidationErrors[0].message;

  //       const passwordField = zodValidationErrors[1].path[0];
  //       const passwordMessage = zodValidationErrors[1].message;

  //       if (
  //         usernameOrPasswordField === 'username' &&
  //         passwordField === 'password'
  //       ) {
  //         setUsernameInputError(usernameOrPasswordPartialMessage);
  //         setPasswordInputErrorComplete(passwordMessage);
  //         alert(usernameOrPasswordPartialMessage);
  //         return;
  //       } else if (
  //         usernameOrPasswordField === 'password' &&
  //         passwordField === 'password'
  //       ) {
  //         setPasswordInputErrorPartial(usernameOrPasswordPartialMessage);
  //         setPasswordInputErrorComplete(passwordMessage);
  //         alert(usernameOrPasswordPartialMessage);
  //         return;
  //       }
  //     } else if (zodValidationErrors.length === 3) {
  //       const usernameField = zodValidationErrors[0].path[0];
  //       const usernameMessage = zodValidationErrors[0].message;

  //       const passwordField1 = zodValidationErrors[1].path[0];
  //       const passwordMessage1 = zodValidationErrors[1].message;

  //       const passwordField2 = zodValidationErrors[2].path[0];
  //       const passwordMessage2 = zodValidationErrors[2].message;
  //       if (
  //         usernameField === 'username' &&
  //         passwordField1 === 'password' &&
  //         passwordField2 === 'password'
  //       ) {
  //         alert(usernameMessage);
  //         alert(passwordMessage1);

  //         setUsernameInputError(usernameMessage);
  //         setPasswordInputErrorPartial(passwordMessage1);
  //         setPasswordInputErrorComplete(passwordMessage2);
  //         return;
  //       }
  //     }
  //   } else {
  //   }
  // }

  // GET TOKEN FROM LOCAL STORAGE

  useEffect(() => {
    setToken(localStorage.getItem('ng-cash-v:1.0.0'));
  }, [token]);

  // SHOW AND HIDE PASSWORD
  // function handleEyeClick(event: SyntheticEvent) {
  //   event.preventDefault();
  //   let inputPassword = document.querySelector('#password');

  //   if (inputPassword === null) {
  //   }

  //   if (eyeColor === '#AFB6C2') {
  //     setEyeColor('#FFC632');
  //   } else {
  //     setEyeColor('#AFB6C2');
  //   }

  //   if (inputPassword.getAttribute('type') == 'password') {
  //     inputPassword.setAttribute('type', 'text');
  //   } else {
  //     inputPassword.setAttribute('type', 'password');
  //   }
  // }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<NewRegisterFormInputs>({
    resolver: zodResolver(RegisterSchema)
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
  });

  // useEffect(() => {
  //   getInputMessageErrors();
  // }, []);

  // CONTEXT
  const { changeAccountId, changeUserId, changeUserToken, changeUsername } =
    useContext(UserContext);

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

      changeAccountId(accountId);
      changeUserId(id);
      changeUserToken(token);
      changeUsername(createdUsername);

      if (status) {
        localStorage.setItem('ng-cash-v:1.0.0', token);
        changeUserToken(token);

        reset();

        return alert(message);
      } else {
        changeUserToken('');
        return alert('Não foi possível criar a conta');
      }
    } catch (error: any) {
      let requestMessage = error.response.data.message;
      if (requestMessage.length > 1) {
        return alert(requestMessage);
      }
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
          <Envelope />
        </span>
        <InputUser
          id="username"
          type="text"
          placeholder="Usuário"
          {...register('username')}
          onFocus={() => setEnvelopeColor('#FFC632')}
          onBlur={() => setEnvelopeColor('#AFB6C2')}
          // onChange={() => setUsernameToValidate(event.target.value)}
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
          // onChange={() => setPasswordToValidate(event.target.value)}
        />
        <button /*onClick={handleEyeClick}*/>
          <Eye />
        </button>
      </InputPasswordContainer>
      <button
        type="submit"
        disabled={isSubmitting}
        // onClick={getInputMessageErrors}
      >
        Cadastrar
      </button>
      <RegisterText>
        Já possui uma conta? <Link to="/login">Login</Link>
      </RegisterText>
    </RegisterFormContainer>
  );
};
