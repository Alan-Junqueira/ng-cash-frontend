import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FadersHorizontal } from 'phosphor-react';

import { IUserTransactions, UserContext } from '../../contexts/userContext';

import {
  DashboardContainer,
  Transactions,
  TransactionsTable,
  TransactionsTableBody,
  TransactionsTableHead,
  TransactionsTitle,
  TransferenceForm,
  TransferenceFormSubtite,
  TransferenceFormTitle
} from './styled';
import { api } from '../../lib/axios';
import { Header } from '../../components/Header';
import { dateFormatter, priceFormatter } from '../../utils/formatter';

const TransactionFormShcema = z.object({
  cashInAccountUsername: z.string(),
  cashIn: z.string()
});

type ITransactionForm = z.infer<typeof TransactionFormShcema>;

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    accountId,
    token,
    username,
    accountBalance,
    transactionsMade,
    transactionsReceived,
    getUserTransactions,
    getAccountBalance
  } = useContext(UserContext);

  const [transactionsArray, setTransactionsArray] = useState<
    IUserTransactions[] | []
  >([]);

  function compareDate(a: any, b: any) {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  }

  function sortTransactionsByDate() {
    let arrayToSortByDate = [];
    let transactionsSortedByDate;

    if (transactionsMade && transactionsReceived) {
      arrayToSortByDate = [...transactionsMade, ...transactionsReceived];
      transactionsSortedByDate = arrayToSortByDate.sort(compareDate);
      setTransactionsArray(transactionsSortedByDate);
    } else if (transactionsMade) {
      arrayToSortByDate = [...transactionsMade];
      transactionsSortedByDate = arrayToSortByDate.sort(compareDate);
      setTransactionsArray(transactionsSortedByDate);
    } else if (transactionsReceived) {
      arrayToSortByDate = [...transactionsReceived];
      transactionsSortedByDate = arrayToSortByDate.sort(compareDate);
      setTransactionsArray(transactionsSortedByDate);
    } else {
      setTransactionsArray([]);
    }
  }

  function sortTransactionsByIncome() {
    let arrayToSortByIncome = [];
    let transactionsSortedByIncome;

    if (transactionsMade && transactionsReceived) {
      // let transactionsReceivedArray = [...transactionsReceived]
      // let transactionsReceivedSorted = transactionsReceivedArray
      arrayToSortByIncome = [
        ...transactionsReceived.sort(compareDate),
        ...transactionsMade.sort(compareDate)
      ];
      transactionsSortedByIncome = arrayToSortByIncome;

      setTransactionsArray(transactionsSortedByIncome);
    } else if (transactionsMade) {
      arrayToSortByIncome = [...transactionsMade.sort(compareDate)];

      setTransactionsArray(arrayToSortByIncome);
    } else if (transactionsReceived) {
      arrayToSortByIncome = [...transactionsReceived.sort(compareDate)];

      setTransactionsArray(arrayToSortByIncome);
    } else {
      setTransactionsArray([]);
    }
  }

  function sortTransactionsByOutcome() {
    let arrayToSortByIncome = [];
    let transactionsSortedByIncome;

    if (transactionsMade && transactionsReceived) {
      // let transactionsReceivedArray = [...transactionsReceived]
      // let transactionsReceivedSorted = transactionsReceivedArray
      arrayToSortByIncome = [
        ...transactionsMade.sort(compareDate),
        ...transactionsReceived.sort(compareDate)
      ];
      transactionsSortedByIncome = arrayToSortByIncome;

      setTransactionsArray(transactionsSortedByIncome);
    } else if (transactionsMade) {
      arrayToSortByIncome = [...transactionsMade.sort(compareDate)];

      setTransactionsArray(arrayToSortByIncome);
    } else if (transactionsReceived) {
      arrayToSortByIncome = [...transactionsReceived.sort(compareDate)];

      setTransactionsArray(arrayToSortByIncome);
    } else {
      setTransactionsArray([]);
    }
  }

  const [sortedByDate, setSortedByDate] = useState(true);
  const [sortedByTransactionsIncome, setSortedByTransactionsIncome] =
    useState(false);
  const [sortedByTransactionsOutcome, setSortedByTransactionsOutcome] =
    useState(false);

  function toggleSortedByDate() {
    setSortedByDate(true);
    setSortedByTransactionsIncome(false);
    setSortedByTransactionsOutcome(false);
    sortTransactionsByDate();
  }

  function toggleSortedByTransactionType() {
    setSortedByDate(false);

    if (
      sortedByTransactionsIncome === false &&
      sortedByTransactionsOutcome === false
    ) {
      setSortedByTransactionsIncome(true);
      setSortedByTransactionsOutcome(false);
      sortTransactionsByIncome();
    } else if (
      sortedByTransactionsIncome === true &&
      sortedByTransactionsOutcome === false
    ) {
      setSortedByTransactionsIncome(false);
      setSortedByTransactionsOutcome(true);
      sortTransactionsByOutcome();
    } else if (
      sortedByTransactionsIncome === false &&
      sortedByTransactionsOutcome === true
    ) {
      setSortedByTransactionsIncome(true);
      setSortedByTransactionsOutcome(false);
      sortTransactionsByIncome();
    }
  }

  useEffect(() => {
    console.log("SETTIMEOUT", transactionsReceived);
      sortTransactionsByDate();
  }, [transactionsMade, transactionsReceived]);

  console.log("Fora do SetTimeOut", transactionsReceived);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<ITransactionForm>({
    resolver: zodResolver(TransactionFormShcema)
  });

  async function handleFormTransactionSubmit(data: ITransactionForm) {
    // const token = localStorage.getItem('ng-cash-v:1.0.0');
    const { cashInAccountUsername, cashIn } = data;

    if (data.cashIn && data.cashInAccountUsername) {
      const transference = await api.put('transactions/transference/', {
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        data: { cashInAccountUsername, cashIn: +cashIn, token }
      });

      if (transference.data.status) {
        reset();
        alert(transference.data.message);
        getUserTransactions(token);
        getAccountBalance(token);
      } else {
        return alert(transference.data.message);
      }
    }
  }

  const [moneyReceived, setMoneyReceived] = useState(0);
  const [moneySpend, setMoneySpend] = useState(0);

  return (
    <>
      <Header />
      <DashboardContainer>
        <TransferenceForm onSubmit={handleSubmit(handleFormTransactionSubmit)}>
          <TransferenceFormTitle>Transferência</TransferenceFormTitle>
          <TransferenceFormSubtite>
            Deseja fazer uma transferência?
          </TransferenceFormSubtite>
          <span>Transfira da conta</span>
          <input type="text" value={username} disabled />
          <label htmlFor="cashInAccountUsername">Para a conta:</label>
          <input
            type="text"
            id="cashInAccountUsername"
            placeholder="Conta de recebimento"
            {...register('cashInAccountUsername')}
          />
          <label htmlFor="cashIn">
            <span>Valor</span>
            <span>Saldo: {accountBalance} </span>
          </label>
          <input id="cashIn" type="number" min={1} {...register('cashIn')} />
          <button type="submit">Transferir</button>
        </TransferenceForm>
        <TransactionsTable>
          <TransactionsTableHead>
            <tr>
              <TransactionsTitle onClick={() => {}}> Valor</TransactionsTitle>
              <TransactionsTitle onClick={toggleSortedByDate}>
                Data <FadersHorizontal />
              </TransactionsTitle>
              <TransactionsTitle onClick={toggleSortedByTransactionType}>
                Tipo <FadersHorizontal />
              </TransactionsTitle>
            </tr>
          </TransactionsTableHead>
          <TransactionsTableBody>
            {transactionsArray.map((transaction, index) => (
              <tr key={index}>
                <Transactions
                  variant={
                    transaction.creditedAccountId === accountId
                      ? 'green'
                      : 'red'
                  }
                >
                  {priceFormatter.format(transaction.value)}
                </Transactions>
                <Transactions
                  variant={
                    transaction.creditedAccountId === accountId
                      ? 'green'
                      : 'red'
                  }
                >
                  {dateFormatter.format(new Date(transaction.createdAt))}
                </Transactions>
                <Transactions
                  variant={
                    transaction.creditedAccountId === accountId
                      ? 'green'
                      : 'red'
                  }
                >
                  {transaction.creditedAccountId === accountId
                    ? 'Entrada'
                    : 'Saída'}
                </Transactions>
              </tr>
            ))}
          </TransactionsTableBody>
        </TransactionsTable>
      </DashboardContainer>
    </>
  );
};

export { Dashboard };
