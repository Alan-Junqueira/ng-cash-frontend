import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { HeaderContainer, Logo } from './styled';

import { FiLogOut } from 'react-icons/fi';
import { SIgnOut } from '../../assets/SignOut';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn } from 'phosphor-react';

export const Header = () => {
  const navigate = useNavigate();

  const { username, isTokenValid, changeTokenValidationToFalse } =
    useContext(UserContext);

  function handleLogout() {
    changeTokenValidationToFalse();
    navigate('/login');
  }

  function handleLogin() {
    navigate('/login');
  }

  return (
    <HeaderContainer>
      <Logo
        src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg"
        alt="Ng Cash"
      />
      <span>
        {isTokenValid ? `@${username}` : <Link to={'/login'}>Faça Login</Link>}
      </span>
      {isTokenValid ? (
        <button onClick={handleLogout}>
          <SIgnOut />
        </button>
      ) : (
        <button onClick={handleLogin}>
          <SignIn />
        </button>
      )}
    </HeaderContainer>
  );
};
