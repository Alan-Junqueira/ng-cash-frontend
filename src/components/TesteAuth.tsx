import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateToken } from '../lib/validation';
import { AuthorizedRoute } from './AuthorizedRoute';
import { UnauthorizedRoute } from './UnauthorizedRoute';

interface IRequireAuth {
  children: JSX.Element;
}

export const TesteAuth = ({ children }: IRequireAuth) => {
  let isAuth = false;

  if (isAuth) {
    return children;
  } else {
    return <UnauthorizedRoute />;
  }
};
