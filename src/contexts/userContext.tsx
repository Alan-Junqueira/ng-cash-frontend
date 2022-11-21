import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { validateToken } from '../lib/validation';

export interface IUserTransactions {
  date: any;
  createdAt: any;
  updatedAt: any;
  creditedAccountId: number;
  debitedAccountId: number;
  id: number;
  value: number;
}
export interface IUserContext {
  id: number;
  token: string;
  accountId: number;
  username: string;
  isTokenValid: boolean;
  accountBalance: number;
  transactionsMade: IUserTransactions[];
  transactionsReceived: IUserTransactions[];
  changeUserId: (id: number) => void;
  changeUserToken: (token: string) => void;
  changeAccountId: (id: number) => void;
  changeUsername: (username: string) => void;
  changeTokenValidationToFalse: () => void;
  getUserTransactions: (token: string) => Promise<void>;
  getAccountBalance: (token: string) => Promise<void>;
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
  const [accountBalance, setAccountBalance] = useState(0);

  // User Transactions
  const [transactionsMade, setTransactionsMade] = useState<IUserTransactions[]>(
    []
  );
  const [transactionsReceived, setTransactionsReceived] = useState<
    IUserTransactions[]
  >([]);

  async function getAccountBalance(token: string) {
    const balance = await api.post('accounts/balance/', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        token
      }
    });

    if (balance && balance.data.status) {
      setAccountBalance(balance.data.balance);
    }
  }

  async function getUserData(token: string) {
    const userData = await api.post(`/users/getByToken/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        token
      }
    });

    if (userData && userData.data.status) {
      const { accountId, id, username } = userData.data.user;
      setId(id);
      setAccountId(accountId);
      setUsername(username);
    }
  }

  async function getUserTransactions(token: string) {
    const transactions = await api.post(
      'transactions/get-all-user-transactions/',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          token
        }
      }
    );

    if (transactions) {
      setTransactionsMade(transactions.data.transactionsMade);
      setTransactionsReceived(transactions.data.transactionsReceived);
    }
  }

  async function getTokenValidationAndUserData(
    localStorageToken: string | null
  ) {
    if (
      localStorageToken !== null &&
      localStorageToken !== undefined &&
      localStorageToken?.length > 0
    ) {
      let tokenValidation = await validateToken(localStorageToken);

      if (tokenValidation) {
        setIsTokenValid(tokenValidation);
        setToken(localStorageToken);

        getAccountBalance(localStorageToken);

        getUserData(localStorageToken);

        getUserTransactions(localStorageToken);
      } else {
        setIsTokenValid(false);
        console.log('token não foi validado');
      }
    } else {
      console.log('Token Inválido');
    }
  }

  function changeUserId(id: number) {
    setId(id);
  }

  function changeUserToken(token: string) {
    localStorage.setItem('ng-cash-v:1.0.0', token);
    setToken(token);
  }

  function changeAccountId(id: number) {
    setAccountId(id);
  }

  function changeUsername(username: string) {
    setUsername(username);
  }

  function changeTokenValidationToFalse() {
    setIsTokenValid(false);
    localStorage.removeItem('ng-cash-v:1.0.0');
  }

  useEffect(() => {
    const localStorageToken = localStorage.getItem('ng-cash-v:1.0.0');
    getTokenValidationAndUserData(localStorageToken);
  }, []);

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
        changeUsername,
        isTokenValid,
        changeTokenValidationToFalse,
        accountBalance,
        transactionsMade,
        transactionsReceived,
        getUserTransactions,
        getAccountBalance
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
