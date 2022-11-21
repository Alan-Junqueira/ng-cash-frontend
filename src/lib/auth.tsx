import { Navigate } from 'react-router-dom';

const withAuth = (Component: any) => {
  const AuthRoute = () => {
    const token = localStorage.getItem('ng-cash-v:1.0.0')

    const isAuth = true;

    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthRoute;
};

export { withAuth };
