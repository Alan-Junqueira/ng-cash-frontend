import styled, { css } from 'styled-components';

export const DashboardContainer = styled.main`
  max-width: 1200px;
  width: 100%;

  padding: 2rem 1rem;
  margin: 0 auto;

  display: flex;
  gap: 2rem;
  justify-content: space-between;
  flex-direction: column;
`;

export const TransferenceForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 570px;
  max-height: 530px;

  padding: 50px 120px;
  border-radius: 8px;

  background-color: ${(props) => props.theme['gray-900']};

  input {
    height: 44px;
    padding: 12px;
    width: 100%;

    margin-bottom: 20px;
    margin-top: 6px;

    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1rem;
    color: ${(props) => props.theme['gray-300']};

    border-radius: 4px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme['gray-400']};

    &:focus {
      border-color: ${(props) => props.theme['yellow-500']};
    }
  }

  label {
    display: flex;
    justify-content: space-between;
  }

  button {
    height: 52px;
    text-transform: uppercase;

    border-radius: 4px;
    background-color: ${(props) => props.theme['yellow-500']};
    transition: all ease 0.3s;

    margin-bottom: 14px;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;

    &:first-child {
      border-radius: 6px 0 0 6px;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }
`;

export const TransactionsTableHead = styled.thead`
  width: 100%;

  td:nth-child(2) {
    position: relative;

    svg {
      position: absolute;
      top: 22.5px;
      right: 1rem;
    }
  }

  td:nth-child(3) {
    position: relative;

    svg {
      position: absolute;
      top: 22.5px;
      right: 1rem;
    }
  }
`;

export const TransactionsTableBody = styled.tbody``;

export const Transactions = styled.td<ITransaction>`
  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-500']};
    `}

  ${(props) =>
    props.variant === 'red' &&
    css`
      background: ${props.theme['red-500']};
    `}
`;

export const TransactionsTitle = styled.td`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */

  background-color: ${(props) => props.theme['gray-700']};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['gray-600']};
  }
`;

interface ITransaction {
  variant: 'green' | 'red';
}

export const TransferenceFormTitle = styled.h3`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 36px;

  margin-bottom: 5px;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TransferenceFormSubtite = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 24px;

  margin-bottom: 28px;
`;
