import { createContext, ReactNode, useEffect, useState } from 'react';
import { validateToken } from '../lib/validation';

export interface IUserContext {
  id: number;
  token: string;
  accountId: number;
  username: string;
  changeUserId: (id: number) => void;
  changeUserToken: (token: string) => void;
  changeAccountId: (id: number) => void;
  changeUsername: (username: string) => void;
}

export const UserContext = createContext({} as IUserContext);

interface IUserContextProvider {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: IUserContextProvider) => {
  const [id, setId] = useState(0);
  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState(0);
  const [username, setUsername] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  async function validateTokenLocaly() {
    let localStorageToken = localStorage.getItem('ng-cash-v:1.0.0');

    if (localStorageToken !== null) {
      let isTokenValid = await validateToken(localStorageToken);

      if (isTokenValid) {
        setIsTokenValid(isTokenValid);
        return true;
      } else {
        setIsTokenValid(false);
        return false;
      }
    }
  }

  useEffect(() => {
    validateTokenLocaly();
    console.log(isTokenValid)
  }, [token]);

  function changeUserId(id: number) {
    setId(id);
    return;
  }

  function changeUserToken(token: string) {
    setToken(token);
    return;
  }

  function changeAccountId(id: number) {
    setAccountId(id);
    return;
  }

  function changeUsername(username: string) {
    setUsername(username);
    return;
  }

  return (
    <UserContext.Provider
      value={{
        id,
        token,
        accountId,
        username,
        changeUserId,
        changeUserToken,
        changeAccountId,
        changeUsername
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
