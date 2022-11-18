import styled from 'styled-components';

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 570px;

  padding: 50px 120px;
  border-radius: 8px;

  background-color: ${(props) => props.theme['gray-900']};
`;

export const ButtonSubmit = styled.button`
  height: 52px;
  text-transform: uppercase;

  background-color: ${(props) => props.theme['yellow-500']};
  border-radius: 4px;
  transition: all ease 0.3s;

  margin-bottom: 14px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    transition: all ease 0.2s;
  }
`;

export const LoginTitle = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 36px;

  margin-bottom: 5px;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LoginSubtitle = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 24px;

  margin-bottom: 28px;
`;

export const RegisterText = styled.span`
  text-align: center;
  color: ${(props) => props.theme['yellow-500']};

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 21px;

  a {
    margin-left: 4px;
    font-weight: 600;
  }
`;

export const DefaultInput = styled.input`
  height: 44px;
  padding: 12px 12px 12px 38px;
  width: 100%;

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
`;

interface IInputUserContainer {
  envelopeColor: string;
}

export const InputUserContainer = styled.div<IInputUserContainer>`
  position: relative;

  span {
    position: absolute;
    left: 12px;
    top: 17px;
    width: 20px;
    height: 20px;
    background-color: transparent;

    svg {
      color: ${(props) => props.envelopeColor};
    }
  }
`;

export const InputUser = styled(DefaultInput)`
  margin-bottom: 20px;
  margin-top: 0.25rem;
`;

interface IInputPasswordContainer {
  eyeColor: string;
  lockColor: string;
}

export const InputPasswordContainer = styled.div<IInputPasswordContainer>`
  position: relative;

  button {
    position: absolute;
    right: 12px;
    top: 17px;
    width: 20px;
    height: 20px;
    background-color: transparent;

    svg {
      color: ${(props) => props.eyeColor};
    }
  }

  span {
    position: absolute;
    left: 12px;
    top: 17px;
    width: 20px;
    height: 20px;
    background-color: transparent;

    svg {
      color: ${(props) => props.lockColor};
    }
  }

  &::before {
    position: absolute;
    content: '';
    background-image: url('/lock-simple.svg');
    width: 20px;
    height: 20px;
    top: 17px;
    left: 12px;
    z-index: 10;
  }
`;

export const EyeContainer = styled.button``;

export const InputPassword = styled(DefaultInput)`
  margin-bottom: 20px;
  margin-top: 0.25rem;
`;
