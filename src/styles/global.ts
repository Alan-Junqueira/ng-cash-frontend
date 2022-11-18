import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  body {
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  body, input, text-area, button {
    font: 400 1rem Roboto, sans-serif
  }

  input {
    border: 0;
    outline: 0
  }

  button {
    cursor: pointer;
    border: 0;
    outline: 0;
  }

  a{
    text-decoration: none;
    color: inherit;
  }
`
