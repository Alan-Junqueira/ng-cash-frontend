import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  max-width: 1200px;
  width: 100%;

  padding: 2rem 1rem;
  margin: 0 auto;
  
  span{
    flex: 1;
    display: flex;
    justify-content: end;

  }

  button {
    background-color: transparent;
    outline: none;
    color: ${props => props.theme['yellow-500']};

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
`;