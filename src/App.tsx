import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContextProvider } from './contexts/userContext';
import { Router } from './routes';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export { App };
