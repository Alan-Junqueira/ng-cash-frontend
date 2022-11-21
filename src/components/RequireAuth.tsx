import { ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { validateToken } from '../lib/validation';

interface IRequireAuth {
  children: JSX.Element;
}

const RequireAuth = ({ children }: IRequireAuth) => {
  // const { isTokenValid } = useContext(UserContext);
  const isTokenValid = true;

  // console.log('AUTH_ROUTE', isTokenValid);

  return isTokenValid ? children : <Navigate to={'/login'} />;
};

export { RequireAuth };
