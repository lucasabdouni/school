import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-top: 150px;

  width: 100%;

  h1 {
    font-family: 'Lobster', cursive;
    font-size: 72px;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  strong {
    font-size: 26px;
    margin-top: 25px;
  }

  form {
    margin: 50px 0;
    width: 340px;
    text-align: center;

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Cadastrados = styled.div`
  background: #f6f6f6;
  border-radius: 8px;
  width: 800px;
  height: 50px;
`;
